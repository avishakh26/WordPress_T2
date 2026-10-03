#!/usr/bin/env bash
# Installs WordPress + WooCommerce into the docker-compose test site, activates the theme and imports the products.
# Usage (from wordpress-theme/):  docker compose up -d && bash tools/setup-local.sh
set -euo pipefail
cd "$(dirname "$0")/.."
export MSYS_NO_PATHCONV=1
wp() { docker compose --profile cli run --rm -T wpcli wp "$@"; }

until wp db check >/dev/null 2>&1; do echo "waiting for database..."; sleep 3; done
wp core is-installed 2>/dev/null || wp core install --url=http://localhost:8080 --title="Skino Beauty" \
  --admin_user=admin --admin_password=admin --admin_email=admin@example.com --skip-email
wp plugin install woocommerce --activate
wp theme activate skino-theme
wp wc --user=admin tool run install_pages
wp option update woocommerce_coming_soon no
wp rewrite structure '/%postname%/' --hard
wp eval-file /tools/import-products.php /import/skino-products.csv
wp rewrite flush --hard
echo "Done: http://localhost:8080  (admin / admin at /wp-admin)"
