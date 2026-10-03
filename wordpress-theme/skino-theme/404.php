<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
get_header();
?>
<div class="container mx-auto px-4 py-20 text-center">
	<p class="text-gray-500 text-lg mb-4"><?php esc_html_e( 'We could not find that page.', 'skino' ); ?></p>
	<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="text-primary font-medium hover:underline">&larr; <?php esc_html_e( 'Back to Home', 'skino' ); ?></a>
</div>
<?php
get_footer();
