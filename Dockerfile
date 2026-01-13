FROM nginx:alpine

# Copy the website files to the nginx html directory
COPY Website /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
