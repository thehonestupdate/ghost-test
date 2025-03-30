FROM ghost:5-alpine

# Remove any pre-existing Ghost content
RUN rm -rf /var/lib/ghost/content

# Copy over your entire custom content (includes data, themes, images, etc.)
COPY content /var/lib/ghost/content

# Set correct ownership
RUN chown -R node:node /var/lib/ghost/content

USER node

# Explicitly tell Ghost to use your SQLite database
ENV database__client=sqlite3
ENV database__connection__filename=/var/lib/ghost/content/data/ghost-local.db

# Optional: lock in your custom theme (source)
ENV GHOST_ACTIVE_THEME=source
