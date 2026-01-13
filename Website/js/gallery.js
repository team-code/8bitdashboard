
class GallerySystem {
    constructor() {
        this.isOpen = false;
        this.currentMode = 'gallery'; // 'gallery' or 'playlist'
        this.selectedArtist = 'all';
        this.searchQuery = '';
        this.showHeartsOnly = false; // Initialize state
        this.playlists = this.loadPlaylists();
        this.hearts = this.loadHearts();
        
        // Bind methods
        this.toggleHeart = this.toggleHeart.bind(this);
        this.setupObserver();

        // Pagination state
        this.itemsPerPage = 20;
        this.currentPage = 1;
        this.allItemsToRender = []; // Cache for current filtered items
    }

    setupObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const video = entry.target;
                if (entry.isIntersecting) {
                    if (!video.src && video.dataset.src) {
                        video.src = video.dataset.src;
                    }
                    video.play().catch(e => {}); // Ignore autoplay blocks
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.1 });
    }

    init() {
        this.injectHTML();
        this.attachEventListeners();
        this.renderSidebar();
        // this.renderGallery(); // MOVED: Only render when opened to prevent mass loading on startup
    }

    injectHTML() {
        const modalHTML = `
            <div id="gallery-modal">
                <div id="gallery-close">&times;</div>
                <div id="gallery-sidebar">
                    <h2 class="text-xl mb-4 font-bold border-b border-gray-700 pb-2">8-bit Gallery</h2>
                    <div class="nav-section">
                        <div class="gallery-nav-item active" data-mode="gallery">
                            <span>🖼️</span> Gallery
                        </div>
                    </div>
                    
                    <h3 class="text-sm text-gray-400 mt-6 mb-2 uppercase tracking-wider">Playlists</h3>
                    <div id="playlist-nav-container" class="flex-grow overflow-y-auto">
                        <!-- Playlists handled by JS -->
                    </div>
                    
                    <button id="create-playlist-btn" class="mt-4 w-full py-2 bg-purple-700 hover:bg-purple-600 rounded text-sm transition-colors">
                        + New Playlist
                    </button>
                    <button id="import-playlist-btn" class="mt-2 w-full py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors">
                         Import JSON
                    </button>
                    <input type="file" id="playlist-import-input" accept=".json" style="display:none">

                </div>
                
                <div id="gallery-content">
                    <div id="gallery-toolbar">
                        <div id="gallery-filters" class="flex gap-2 items-center flex-grow">
                             <!-- Filters injected here based on mode -->
                        </div>
                    </div>
                    
                    <div id="gallery-grid">
                        <!-- Grid items -->
                    </div>
                    <div id="gallery-pagination" class="p-4 flex justify-center">
                        <button id="gallery-load-more" class="px-8 py-3 bg-blue-700 hover:bg-blue-600 rounded-lg font-bold transition-all" style="display:none;">
                            LOAD MORE
                        </button>
                    </div>
                </div>
            </div>
            
            <div id="add-to-playlist-modal" class="modal" style="z-index: 10001;">
                 <div class="modal-content" style="max-width: 400px; background: #222; color: white;">
                    <span class="close" id="close-playlist-modal">&times;</span>
                    <h2 class="text-xl mb-4">Add to Playlist</h2>
                    <div id="playlist-selector-list" class="flex flex-col gap-2"></div>
                    <button id="confirm-add-playlist" class="mt-4 w-full bg-green-600 hover:bg-green-500 py-2 rounded">Done</button>
                 </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Add Gallery Button to footer if not exists
        const footer = document.querySelector('#settings').parentNode; // Assuming relative to settings
        if(footer && !document.getElementById('gallery-opener')) {
             const settingsBtn = document.getElementById('settings');
             const galleryBtn = document.createElement('a');
             galleryBtn.id = 'gallery-opener';
             galleryBtn.innerText = 'Gallery';
             galleryBtn.style.right = '11em'; // Positioned between Settings (5em) and Discord (17em)
             galleryBtn.style.position = 'fixed';
             galleryBtn.style.bottom = '1em';
             galleryBtn.style.color = 'white';
             galleryBtn.style.textDecoration = 'underline';
             galleryBtn.style.cursor = 'pointer';
             galleryBtn.style.fontSize = '1.5em';
             
             document.body.appendChild(galleryBtn);
        }
    }

    attachEventListeners() {
        document.getElementById('gallery-opener').addEventListener('click', () => this.open());
        document.getElementById('gallery-close').addEventListener('click', () => this.close());
        
        // Navigation
        document.getElementById('gallery-sidebar').addEventListener('click', (e) => {
            const navItem = e.target.closest('.gallery-nav-item');
            if(navItem) {
                const mode = navItem.dataset.mode;
                const playlistId = navItem.dataset.playlistId;
                this.switchMode(mode, playlistId);
            }
        });

        // Create Playlist
        document.getElementById('create-playlist-btn').addEventListener('click', () => {
            const name = prompt("Enter playlist name:");
            if(name) this.createPlaylist(name);
        });
        
        // Import Playlist
        document.getElementById('import-playlist-btn').addEventListener('click', () => {
            const jsonStr = prompt("Paste playlist JSON here:");
            if(jsonStr) {
                try {
                     const playlist = JSON.parse(jsonStr);
                     if(playlist.name && Array.isArray(playlist.items)) {
                         this.playlists.push(playlist);
                         this.savePlaylists();
                         this.renderSidebar();
                     } else {
                         alert("Invalid playlist format");
                     }
                } catch(e) {
                    alert("Invalid JSON");
                }
            }
        });

        // Close second modal
        document.getElementById('close-playlist-modal').addEventListener('click', () => {
             document.getElementById('add-to-playlist-modal').style.display = 'none';
        });
        document.getElementById('confirm-add-playlist').addEventListener('click', () => {
             document.getElementById('add-to-playlist-modal').style.display = 'none';
        });

        // Load More button
        document.getElementById('gallery-load-more').addEventListener('click', () => {
             this.currentPage++;
             this.renderBatch();
        });
    }

    open() {
        const modal = document.getElementById('gallery-modal');
        if (!modal) return;
        
        modal.classList.add('active');
        this.isOpen = true;
        
        // Use requestAnimationFrame to ensure modal is painting before we render grid
        requestAnimationFrame(() => {
            this.renderToolbar();
            this.renderGallery();
        });
    }

    close() {
        document.getElementById('gallery-modal').classList.remove('active');
        this.isOpen = false;
        // Optional: clear gallery to free memory/stop videos if needed, 
        // but keeping it might be better for re-open speed. 
        // For now, let's leave it, but we definitely don't want to init it on load.
    }

    switchMode(mode, playlistId = null) {
        this.currentMode = mode;
        this.currentPlaylistId = playlistId; // Index in playlists array
        this.currentPage = 1; // RESET pagination
        
        // Update sidebar UI
        document.querySelectorAll('.gallery-nav-item').forEach(el => el.classList.remove('active'));
        if(mode === 'gallery') {
            document.querySelector('[data-mode="gallery"]').classList.add('active');
        } else {
            document.querySelector(`[data-playlist-id="${playlistId}"]`).classList.add('active');
        }
        
        this.renderToolbar();
        this.renderGallery();
    }

    renderSidebar() {
        const container = document.getElementById('playlist-nav-container');
        container.innerHTML = this.playlists.map((pl, index) => `
            <div class="gallery-nav-item" data-mode="playlist" data-playlist-id="${index}">
                <span>🎵</span> ${pl.name}
                <span class="text-xs text-gray-500 ml-auto">${pl.items.length}</span>
            </div>
        `).join('');
    }

    renderToolbar() {
         const toolbar = document.getElementById('gallery-filters');
         toolbar.innerHTML = ''; // Clear

         if(this.currentMode === 'gallery') {
             // Artist Filter
             const select = document.createElement('select');
             select.innerHTML = `<option value="all">All Artists</option>` + 
                 artists.map((a, i) => `<option value="${i}">${a[0]}</option>`).join('');
             select.value = this.selectedArtist;
             select.addEventListener('change', (e) => {
                 this.selectedArtist = e.target.value;
                 this.currentPage = 1; // RESET pagination
                 this.renderGallery();
             });
             toolbar.appendChild(select);
             
             // Search
             const input = document.createElement('input');
             input.type = 'text';
             input.placeholder = 'Search art...';
             input.addEventListener('input', (e) => {
                 this.searchQuery = e.target.value.toLowerCase();
                 this.currentPage = 1; // RESET pagination
                 this.renderGallery();
             });
             toolbar.appendChild(input);

             // Hearts Only Toggle
             const heartBtn = document.createElement('button');
             heartBtn.className = `px-3 py-1 rounded border border-gray-600 ${this.showHeartsOnly ? 'bg-red-900 text-white' : 'text-gray-400'}`;
             heartBtn.innerHTML = '❤️ Favorites';
             heartBtn.onclick = () => {
                 this.showHeartsOnly = !this.showHeartsOnly;
                 heartBtn.className = `px-3 py-1 rounded border border-gray-600 ${this.showHeartsOnly ? 'bg-red-900 text-white' : 'text-gray-400'}`;
                 this.currentPage = 1; // RESET pagination
                 this.renderGallery();
             };
             toolbar.appendChild(heartBtn);

         } else if (this.currentMode === 'playlist') {
             const playlist = this.playlists[this.currentPlaylistId];
             
             const title = document.createElement('h2');
             title.className = "text-xl font-bold mr-4";
             title.innerText = playlist.name;
             toolbar.appendChild(title);

             // Play Button
             const playBtn = document.createElement('button');
             playBtn.innerText = "▶️ Play";
             playBtn.className = "text-sm bg-green-700 hover:bg-green-600 px-3 py-1 rounded font-bold";
             playBtn.onclick = () => {
                 this.playPlaylist(this.currentPlaylistId);
             };
             toolbar.appendChild(playBtn);

             // Rename
             const renameBtn = document.createElement('button');
             renameBtn.innerText = "✏️ Rename";
             renameBtn.className = "text-sm bg-gray-800 px-2 py-1 rounded";
             renameBtn.onclick = () => {
                 const newName = prompt("New name:", playlist.name);
                 if(newName) {
                     this.playlists[this.currentPlaylistId].name = newName;
                     this.savePlaylists();
                     this.renderSidebar();
                     this.renderToolbar();
                 }
             };
             toolbar.appendChild(renameBtn);
             // Export
             const exportBtn = document.createElement('button');
             exportBtn.innerText = "📤 Share";
             exportBtn.className = "text-sm bg-blue-900 px-2 py-1 rounded ml-2";
             exportBtn.onclick = () => {
                 const str = JSON.stringify(playlist);
                 navigator.clipboard.writeText(str);
                 alert("Playlist JSON copied to clipboard!");
             };
             toolbar.appendChild(exportBtn);
             
              // Delete
             const deleteBtn = document.createElement('button');
             deleteBtn.innerText = "🗑️ Delete";
             deleteBtn.className = "text-sm bg-red-900 px-2 py-1 rounded ml-auto";
             deleteBtn.onclick = () => {
                 if(confirm("Delete this playlist?")) {
                     this.playlists.splice(this.currentPlaylistId, 1);
                     this.savePlaylists();
                     this.renderSidebar();
                     this.switchMode('gallery');
                 }
             };
             toolbar.appendChild(deleteBtn);
         }
    }

    renderGallery() {
        let itemsToRender = [];
        
        if (this.currentMode === 'gallery') {
            images.forEach((imgData, index) => {
                const [url, artistIdx, type] = imgData;
                const artistName = artists[artistIdx][0];
                
                // Filtering
                if (this.selectedArtist !== 'all' && artistIdx != this.selectedArtist) return;
                if (this.showHeartsOnly && !this.hearts.includes(index)) return;
                if (this.searchQuery && !artistName.toLowerCase().includes(this.searchQuery)) return; // Simple search

                // Calculate artist-specific numbering
                let artistCount = 1;
                for(let i=0; i<index; i++) {
                    if (images[i][1] === artistIdx) artistCount++;
                }

                itemsToRender.push({
                    index,
                    url,
                    type,
                    artistName,
                    title: `${artistName} #${artistCount}`
                });
            });
        } else {
            // Playlist mode
            const playlist = this.playlists[this.currentPlaylistId];
            playlist.items.forEach(index => {
                if (index >= images.length) return;
                const [url, artistIdx, type] = images[index];
                const artistName = artists[artistIdx][0];
                itemsToRender.push({
                    index,
                    url,
                    type,
                    artistName,
                    title: `Item #${index}`
                });
            });
        }

        this.allItemsToRender = itemsToRender;
        this.renderBatch();
    }

    renderBatch() {
        const grid = document.getElementById('gallery-grid');
        const paginationContainer = document.getElementById('gallery-pagination');
        
        // Clear grid completely for new page
        grid.innerHTML = '';
        grid.scrollTop = 0;

        const totalItems = this.allItemsToRender.length;
        const totalPages = Math.ceil(totalItems / this.itemsPerPage) || 1;
        
        // Ensure current page is valid
        if (this.currentPage > totalPages) this.currentPage = totalPages;
        if (this.currentPage < 1) this.currentPage = 1;

        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const batch = this.allItemsToRender.slice(startIndex, endIndex);

        // Render Cards
        const fragment = document.createDocumentFragment();
        batch.forEach(item => {
            const card = document.createElement('div');
            card.className = 'gallery-item';
            
            let mediaHtml = '';
            const previewUrl = item.url.replace('../img/', '../img/previews/');
            
            if (item.type === 1) { // Video
               mediaHtml = `<video data-src="${previewUrl}" class="gallery-preview" loop muted playsinline preload="none"></video>`;
            } else {
               mediaHtml = `<img src="${previewUrl}" class="gallery-preview" loading="lazy">`;
            }

            const isHearted = this.hearts.includes(item.index);
            
            card.innerHTML = `
                ${mediaHtml}
                <div class="gallery-info">
                    <div class="gallery-title" title="${item.title}">${item.title}</div>
                    <div class="gallery-artist">${item.artistName}</div>
                    <div class="gallery-actions">
                        <button class="gallery-btn" onclick="gallerySystem.openPlaylistModal(${item.index})" title="Add to Playlist">➕</button>
                        <button class="gallery-btn heart-btn ${isHearted ? 'hearted' : ''}" data-index="${item.index}" title="Favorite">
                            ${isHearted ? '❤️' : '🤍'}
                        </button>
                    </div>
                </div>
            `;
            
            // Interaction: Select background
            card.querySelector('.gallery-preview').addEventListener('click', () => {
                this.setBackground(item.index);
                this.close();
            });
            
            // Heart click
            card.querySelector('.heart-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleHeart(item.index);
                e.currentTarget.classList.toggle('hearted');
                e.currentTarget.textContent = this.hearts.includes(item.index) ? '❤️' : '🤍';
            });

            fragment.appendChild(card);
        });
        
        grid.appendChild(fragment);

        // Update Pagination Controls
        paginationContainer.innerHTML = '';
        if (totalPages > 1) {
            const prevBtn = document.createElement('button');
            prevBtn.innerHTML = '◀ Prev';
            prevBtn.className = `px-4 py-2 rounded ${this.currentPage === 1 ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-600 text-white'}`;
            prevBtn.disabled = this.currentPage === 1;
            prevBtn.onclick = () => {
                if (this.currentPage > 1) {
                    this.currentPage--;
                    this.renderBatch();
                }
            };

            const pageInfo = document.createElement('span');
            pageInfo.className = 'text-white font-bold mx-4 self-center';
            pageInfo.innerText = `Page ${this.currentPage} of ${totalPages}`;

            const nextBtn = document.createElement('button');
            nextBtn.innerHTML = 'Next ▶';
            nextBtn.className = `px-4 py-2 rounded ${this.currentPage === totalPages ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-600 text-white'}`;
            nextBtn.disabled = this.currentPage === totalPages;
            nextBtn.onclick = () => {
                if (this.currentPage < totalPages) {
                    this.currentPage++;
                    this.renderBatch();
                }
            };

            paginationContainer.appendChild(prevBtn);
            paginationContainer.appendChild(pageInfo);
            paginationContainer.appendChild(nextBtn);
        }

        // Start observing new videos
        grid.querySelectorAll('video[data-src]').forEach(vid => {
            this.observer.observe(vid);
        });
    }
    
    setBackground(index) {
        active_playlist = null; // Clear playlist mode
        setImageNum(index);
        this.close();
    }

    playPlaylist(playlistId) {
        const playlist = this.playlists[playlistId];
        if(!playlist || playlist.items.length === 0) {
            alert("Playlist is empty!");
            return;
        }
        
        active_playlist = playlist.items;
        active_playlist_index = 0;
        
        // Turn on auto-change if not already
        if(!auto_change_background_active) {
            autoChangeBackground(true, user_settings.autobackgroundtime || 1);
        }

        if(user_settings.random_seek) {
            setRandomImage();
        } else {
            setImageNum(active_playlist[0]);
        }
        
        this.close();
    }

    toggleHeart(index) {
        if(this.hearts.includes(index)) {
            this.hearts = this.hearts.filter(i => i !== index);
        } else {
            this.hearts.push(index);
        }
        this.saveHearts();
    }
    
    openPlaylistModal(imgIndex) {
        const modal = document.getElementById('add-to-playlist-modal');
        const list = document.getElementById('playlist-selector-list');
        list.innerHTML = '';
        
        this.playlists.forEach((pl, plIndex) => {
            const row = document.createElement('label');
            row.className = "flex items-center gap-2 cursor-pointer hover:bg-gray-800 p-2 rounded";
            const checked = pl.items.includes(imgIndex);
            
            row.innerHTML = `
                <input type="checkbox" ${checked ? 'checked' : ''} class="w-4 h-4 accent-purple-600">
                <span>${pl.name}</span>
            `;
            
            row.querySelector('input').addEventListener('change', (e) => {
                if(e.target.checked) {
                    if(!this.playlists[plIndex].items.includes(imgIndex)) {
                        this.playlists[plIndex].items.push(imgIndex);
                    }
                } else {
                    this.playlists[plIndex].items = this.playlists[plIndex].items.filter(i => i !== imgIndex);
                }
                this.savePlaylists();
                this.renderSidebar(); // Update counts
            });
            
            list.appendChild(row);
        });
        
        modal.style.display = 'block';
    }

    createPlaylist(name) {
        this.playlists.push({name, items: []});
        this.savePlaylists();
        this.renderSidebar();
    }
    
    loadPlaylists() {
        const stored = localStorage.getItem('8bit_playlists');
        return stored ? JSON.parse(stored) : [];
    }
    
    savePlaylists() {
        localStorage.setItem('8bit_playlists', JSON.stringify(this.playlists));
    }
    
    loadHearts() {
        const stored = localStorage.getItem('8bit_hearts');
        return stored ? JSON.parse(stored) : [];
    }
    
    saveHearts() {
        localStorage.setItem('8bit_hearts', JSON.stringify(this.hearts));
    }
}

const gallerySystem = new GallerySystem();
// Init when DOM ready
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit to ensure other things are loaded
    setTimeout(() => gallerySystem.init(), 100);
});
