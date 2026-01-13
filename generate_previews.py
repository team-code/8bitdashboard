import os
import subprocess
import shutil

# Configuration
SOURCE_DIR = "Website/img"
OUTPUT_DIR = "Website/img/previews"
PREVIEW_WIDTH = 220
FPS = 15
MAX_DURATION = 5
SKIP_DIRS = ["previews", "icons", "seo"]
SUPPORTED_EXTENSIONS = [".webp", ".gif", ".mp4"]

def ensure_dir(path):
    if not os.path.exists(path):
        os.makedirs(path)

def scale_image(input_path, output_path):
    ext = os.path.splitext(input_path)[1].lower()
    
    if ext == ".webp":
        # Copy WebP files directly as per user request (fixing broken re-encoding)
        try:
            shutil.copy2(input_path, output_path)
            return True
        except Exception as e:
            print(f"Error copying {input_path}: {e}")
            return False

    if ext == ".gif":
        # High-Quality Single-Pass Scaling for GIFs with FPS and Duration limit
        cmd = [
            "ffmpeg", "-y", "-i", input_path,
            "-t", str(MAX_DURATION),
            "-filter_complex", f"[0:v] fps={FPS},scale={PREVIEW_WIDTH}:-1:flags=lanczos,split [a][b]; [a] palettegen [p]; [b][p] paletteuse",
            output_path
        ]
    elif ext == ".mp4":
        # Scaling and Crushing MP4 (ensuring width/height divisible by 2) with FPS, Duration limit, and FastStart
        cmd = [
            "ffmpeg", "-y", "-i", input_path,
            "-t", str(MAX_DURATION),
            "-vf", f"fps={FPS},scale={PREVIEW_WIDTH}:-2",
            "-c:v", "libx264", "-crf", "28", "-preset", "slow", "-an",
            "-movflags", "+faststart",
            output_path
        ]
    else:
        return False

    try:
        subprocess.run(cmd, check=True, capture_output=True)
        return True
    except subprocess.CalledProcessError as e:
        print(f"Error processing {input_path}: {e.stderr.decode()}")
        return False

def main():
    abs_source = os.path.abspath(SOURCE_DIR)
    abs_output = os.path.abspath(OUTPUT_DIR)
    
    ensure_dir(abs_output)
    
    for root, dirs, files in os.walk(abs_source):
        # Skip directories
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        
        # Calculate relative path to maintain structure
        rel_path = os.path.relpath(root, abs_source)
        if rel_path == ".":
            target_root = abs_output
        else:
            target_root = os.path.join(abs_output, rel_path)
            ensure_dir(target_root)
            
        for file in files:
            ext = os.path.splitext(file)[1].lower()
            if ext in SUPPORTED_EXTENSIONS:
                input_file = os.path.join(root, file)
                output_file = os.path.join(target_root, file)
                
                print(f"Processing: {input_file} -> {output_file}")
                if scale_image(input_file, output_file):
                    print(f"Successfully created: {output_file}")
                else:
                    print(f"Failed to create: {output_file}")

if __name__ == "__main__":
    main()
