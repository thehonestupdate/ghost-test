FROM ghost:5-alpine

# Remove the default Casper symlink/content folder to prevent conflicts
RUN rm -rf /var/lib/ghost/content

# Copy your working theme from versions and the DB from root content
COPY versions/5.115.1/content/themes/source /var/lib/ghost/content/themes/source
COPY content/data/ghost-local.db /var/lib/ghost/content/data/ghost-local.db

# Set correct permissions
RUN chown -R node:node /var/lib/ghost/content

# Set environment variables for SQLite
ENV database__client=sqlite3
ENV database__connection__filename=/var/lib/ghost/content/data/ghost-local.db

USER node
