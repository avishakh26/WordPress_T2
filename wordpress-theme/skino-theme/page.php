<?php
/**
 * Generic page (also wraps the WooCommerce cart, checkout and My Account shortcodes).
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
get_header();
?>
<div class="bg-gray-50 min-h-[60vh] py-8 md:py-12">
	<div class="container mx-auto px-4 max-w-5xl">
		<?php while ( have_posts() ) : the_post(); ?>
			<article <?php post_class( 'bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-8' ); ?>>
				<h1 class="text-2xl md:text-3xl font-montserrat font-bold text-secondary mb-6"><?php the_title(); ?></h1>
				<div class="skino-prose"><?php the_content(); ?></div>
			</article>
		<?php endwhile; ?>
	</div>
</div>
<?php
get_footer();
