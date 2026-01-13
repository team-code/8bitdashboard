# Build the Docker image
docker build -t 8bitdashboard .

# Run the container
echo "Starting 8-bit Dashboard on http://localhost:8080"
docker run -d -p 8080:80 --name 8bitdashboard 8bitdashboard
