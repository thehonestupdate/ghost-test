FROM ghost:5-alpine

# Set working directory
WORKDIR /var/lib/ghost

# Copy custom theme into the expected theme directory
COPY versions/5.115.1/content/themes/source /var/lib/ghost/content/themes/source

# Set ownership for Ghost to use it
RUN chown -R node:node /var/lib/ghost/content/themes/source

# Use the non-root node user
USER node