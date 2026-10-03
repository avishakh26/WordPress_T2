<?php
/**
 * Wishlist page (ported from WishlistPage.jsx). The list lives in the visitor's browser (localStorage);
 * assets/js/app.js fetches the cards for the saved product ids.
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
get_header();
?>
<div class="bg-gray-50 min-h-screen py-10">
	<div class="container mx-auto px-4">
		<h1 class="text-3xl font-montserrat font-bold text-secondary mb-2"><?php esc_html_e( 'My Wishlist', 'skino' ); ?></h1>
		<p class="text-gray-500 mb-8" data-wishlist-summary>&nbsp;</p>

		<div data-wishlist-grid class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"></div>

		<div data-wishlist-empty class="hidden text-center py-24 bg-white rounded-2xl border border-gray-100 shadow-sm">
			<?php skino_icon( 'Heart', 'w-16 h-16 text-gray-200 mx-auto mb-4' ); ?>
			<h2 class="text-xl font-semibold text-gray-500 mb-2"><?php esc_html_e( 'Your wishlist is empty', 'skino' ); ?></h2>
			<p class="text-gray-400 mb-6"><?php esc_html_e( 'Save items you love and come back to them anytime.', 'skino' ); ?></p>
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="inline-block bg-primary hover:bg-primaryDark text-white px-8 py-3 rounded-full font-semibold transition-colors"><?php esc_html_e( 'Start Shopping', 'skino' ); ?></a>
		</div>
	</div>
</div>
<?php
get_footer();
