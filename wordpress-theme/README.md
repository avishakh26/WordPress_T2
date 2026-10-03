# Skino Beauty Shop: WordPress / WooCommerce theme

The React + Vite storefront in `../src` converted into a WooCommerce theme.

```
wordpress-theme/
  skino-theme/          <- the theme (zip this folder, or use skino-theme.zip)
  import/skino-products.csv   <- 640 products for WooCommerce's importer
  tools/                <- generators + local test setup (not part of the theme)
  docker-compose.yml    <- optional local WordPress for testing
```

## Install on a WordPress site

1. Install and activate the free **WooCommerce** plugin (9.6+ for the Brands taxonomy).
2. *Appearance > Themes > Add New > Upload Theme* and upload `skino-theme.zip`. Activate it.
   Activation sets pretty permalinks, creates the **Home** and **My Wishlist** pages, makes Home the front page, and sets the currency to BDT (৳, no decimals).
3. *WooCommerce > Settings > Site visibility*: choose **Live** (new stores start in "coming soon" mode, which hides the shop, cart and checkout).
4. *WooCommerce > Products > Import*: upload `import/skino-products.csv`. Map nothing manually; the headers are recognised (including **Brands**).
5. *Settings > Permalinks > Save* once if `/sale/...` or brand URLs 404.
6. *WooCommerce > Settings > Payments > bKash (manual)*: replace the placeholder merchant number `01XXXXXXXXX` (the React demo also used a placeholder).
7. Edit phone, email, address and store name in *Appearance > Customize > Skino contact details*.

## What maps to what

| React app | WordPress |
|---|---|
| `HomePage.jsx` | `front-page.php` |
| `CategoryPage.jsx`, `BrandPage.jsx`, search | `woocommerce/archive-product.php` (+ `search.php`); brands use WooCommerce's `product_brand` taxonomy |
| `SalePage.jsx` | `template-sale.php`, URLs `/sale/k-beauty/`, `/sale/clearance/`, `/sale/j-beauty/` (rules in `inc/sale.php`) |
| `ProductDetailsPage.jsx` | `woocommerce/single-product.php` |
| `WishlistPage.jsx` + `WishlistContext` | `page-wishlist.php`; list stored in the visitor's browser (localStorage) like before |
| `CartContext`, `CartSidebar` | WooCommerce cart + slide-out drawer (`inc/ajax.php`, `footer.php`, `assets/js/app.js`) |
| `CheckoutModal.jsx` | Single-page WooCommerce checkout (`inc/checkout.php`): name, phone, email, address, Inside/Outside Dhaka (৳60 / ৳120 fee), Cash on Delivery or bKash (number + TxnID) |
| Header / Footer / mobile nav | `header.php`, `footer.php` |
| Tailwind classes | compiled to `assets/css/app.css` |

## Things that behave differently (please read)

- **Checkout is a page, not a modal**, and orders are now real WooCommerce orders. bKash orders are saved as *On hold* with the sender number and TxnID shown on the order; you confirm payment manually, as the demo implied.
- **Reviews:** the React product page showed a set of written-in-code sample reviews. The theme uses WooCommerce's real review system instead, so new reviews are genuine. Imported star ratings and review counts (`_skino_rating`, `_skino_review_count`) are still shown on product cards until a product gets a real review.
- **Product images:** the app generated SVG packshots in code. Those are saved in `skino-theme/assets/product-art/<id>.svg` and used automatically for imported products (SKU `SKINO-<id>`) that have no photo. Upload a real photo as the product image and it takes over.
- **Home page "Best Selling" / "Latest"** now show real catalogue products (best selling = WooCommerce popularity, latest = newest) instead of the 16 hard-coded demo items.
- **Brands in the CSV** come from the first word of the product name, exactly as in the source data (so you will see brands like "La", "The", "Urban"). Clean these in *Products > Brands* when you replace the demo catalogue.
- Category/brand pages paginate at 24 products.

## Rebuilding after changes

Tailwind generates only the classes it finds in the PHP/JS, so after adding new classes run, from the project root:

```bash
node wordpress-theme/tools/build-css.mjs
```

Regenerate the CSV/packshots from `src/data` with `node wordpress-theme/tools/generate-products.mjs`.

## Local test site (Docker)

```bash
cd wordpress-theme
docker compose up -d
bash tools/setup-local.sh      # installs WP + WooCommerce, activates the theme, imports products
```

Open http://localhost:8080 (admin login: `admin` / `admin` at `/wp-admin`; local testing only).
