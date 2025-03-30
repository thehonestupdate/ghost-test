FROM ghost:5-alpine

# Clear out any existing default theme (like Casper) to avoid symlink issues
RUN rm -rf /var/lib/ghost/content

# Copy over ONLY your custom content (with your DB and your theme)
COPY versions/5.115.1/content /var/lib/ghost/content

# Make sure node owns everything
RUN chown -R node:node /var/lib/ghost/content

USER node
