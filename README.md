# 8bitdashboard

A retro-themed personal dashboard web application featuring a suite of productivity tools and widgets.

## Features

- **Dashboard**: A central hub for your productivity.
- **Gallery**: Browse your image and video collections/playlists with preview support.
- **Productivity Tools**:
  - **Pomodoro Timer**: Stay focused with a built-in timer.
  - **Notepad**: Quick scratchpad for your thoughts.
  - **Weather**: Check the local weather.
  - **Clock**: Keep track of time.
- **Games**: Includes a 2048 game clone.
- **Customizable**: Settings and theme options.
- **Local Data**: Favorites and playlists are stored locally.

## Getting Started

### Prerequisites

- **Docker**: To containerize and run the application.
- **Python 3**: For running the preview generation utility.
- **FFMPEG**: Required by the preview generation script for processing images and videos.

### Installation & Running

1.  **Clone the repository**
    ```bash
    git clone https://github.com/team-code/8bitdashboard.git
    cd 8bitdashboard
    ```

2.  **Run with Docker (Windows)**
    Execute the PowerShell script to build the image and start the container:
    ```powershell
    .\build_run.ps1
    ```
    
    Once running, the dashboard is accessible at:
    `http://localhost:8080/html/`

## Development

### Generating Previews

The application includes a Python utility to generate optimized previews for the gallery. If you add new assets to `Website/img`, run the generator script:

1.  Ensure you have Python 3 and FFMPEG installed and in your system PATH.
2.  Run the script:
    ```bash
    python generate_previews.py
    ```

This will scan `Website/img` and create optimized previews in `Website/img/previews`.
