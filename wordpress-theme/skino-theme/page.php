<?php
/**
 * Generic page (also wraps the WooCommerce cart, checkout and My Account shortcodes).
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
get_header();
$is_account = function_exists( 'is_account_page' ) && is_account_page() && is_user_logged_in();
// Logged-out My Account root = the login/sign-up card, which brings its own heading and card.
$is_login   = function_exists( 'is_account_page' ) && is_account_page() && ! is_user_logged_in() && ! is_wc_endpoint_url();
// Checkout and the order-received page draw their own heading and cards.
$is_checkout = function_exists( 'is_checkout' ) && is_checkout();
?>
<div class="bg-gray-50 min-h-[60vh] py-8 md:py-12">
	<div class="container mx-auto px-4 <?php echo ( $is_account || $is_checkout ) ? 'max-w-6xl' : 'max-w-5xl'; ?>">
		<?php while ( have_posts() ) : the_post(); ?>
			<?php if ( $is_checkout ) : ?>
				<article <?php post_class(); ?>>
					<div class="skino-prose skino-checkout-wrap"><?php the_content(); ?></div>
				</article>
			<?php elseif ( $is_login ) : ?>
				<article <?php post_class( 'py-4 md:py-8' ); ?>>
					<div class="skino-prose"><?php the_content(); ?></div>
				</article>
			<?php elseif ( $is_account ) : ?>
				<article <?php post_class( 'skino-account' ); ?>>
					<h1 class="text-2xl md:text-3xl font-montserrat font-bold text-secondary mb-6"><?php esc_html_e( 'My Account', 'skino' ); ?></h1>
					<div class="skino-prose"><?php the_content(); ?></div>
				</article>
			<?php else : ?>
				<article <?php post_class( 'bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-8' ); ?>>
					<h1 class="text-2xl md:text-3xl font-montserrat font-bold text-secondary mb-6"><?php the_title(); ?></h1>
					<div class="skino-prose"><?php the_content(); ?></div>
				</article>
			<?php endif; ?>
		<?php endwhile; ?>
	</div>
</div>
<?php
get_footer();
