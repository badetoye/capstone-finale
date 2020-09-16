# hadolint ignore=DL3007
FROM nginx:latest

# Copy source code to working directory
COPY *.html /usr/share/nginx/html

# Expose port 80
EXPOSE 80
