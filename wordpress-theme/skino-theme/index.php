<?php
/**
 * Fallback template (blog posts, archives).
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
get_header();
?>
<div class="bg-gray-50 min-h-[60vh] py-8 md:py-12">
	<div class="container mx-auto px-4 max-w-4xl">
		<?php if ( have_posts() ) : ?>
			<?php while ( have_posts() ) : the_post(); ?>
				<article <?php post_class( 'bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-8 mb-6' ); ?>>
					<h2 class="text-xl md:text-2xl font-montserrat font-bold text-secondary mb-3"><a href="<?php the_permalink(); ?>" class="hover:text-primary"><?php the_title(); ?></a></h2>
					<div class="skino-prose"><?php the_excerpt(); ?></div>
				</article>
			<?php endwhile; ?>
			<div class="skino-pagination"><?php the_posts_pagination(); ?></div>
		<?php else : ?>
			<p class="text-center text-gray-500 py-20"><?php esc_html_e( 'Nothing found.', 'skino' ); ?></p>
		<?php endif; ?>
	</div>
</div>
<?php
get_footer();
