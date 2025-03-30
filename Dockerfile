FROM ghost:5-alpine

# Clear out default content (like Casper theme symlinks)
RUN rm -rf /var/lib/ghost/content

# Copy your full working Ghost content (themes + DB)
COPY versions/5.115.1/content /var/lib/ghost/content

# Make sure node owns the new content
RUN chown -R node:node /var/lib/ghost/content

# Explicitly tell Ghost to use your SQLite database
ENV database__client=sqlite3
ENV database__connection__filename=/var/lib/ghost/content/data/ghost-local.db

USER node
