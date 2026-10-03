<?php
/**
 * Category, brand, search and shop archives (ported from CategoryPage.jsx / BrandPage.jsx).
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
get_header();

$is_brand   = is_tax( skino_brand_taxonomy() );
$is_search  = is_search();
$term       = get_queried_object();
$active_id  = ( ( is_tax( 'product_cat' ) || $is_brand ) && $term instanceof WP_Term ) ? $term->term_id : 0;
$heading    = $is_search
	? sprintf( __( 'Search results for "%s"', 'skino' ), get_search_query() )
	: ( $active_id ? $term->name : __( 'All Products', 'skino' ) );

// Sidebar list: all brands on a brand page, otherwise all categories.
$taxonomy = $is_brand ? skino_brand_taxonomy() : 'product_cat';
$terms    = get_terms( array( 'taxonomy' => $taxonomy, 'hide_empty' => true, 'orderby' => $is_brand ? 'name' : 'count', 'order' => $is_brand ? 'ASC' : 'DESC' ) );
$items    = array();
if ( ! is_wp_error( $terms ) ) {
	foreach ( $terms as $t ) {
		if ( 'uncategorized' === $t->slug ) {
			continue;
		}
		$items[] = array( 'label' => $t->name, 'url' => get_term_link( $t ), 'count' => $t->count, 'active' => $t->term_id === $active_id );
	}
}
$total = isset( $GLOBALS['wp_query']->found_posts ) ? (int) $GLOBALS['wp_query']->found_posts : 0;
?>
<div class="bg-gray-50 min-h-screen">
	<div class="bg-white border-b border-gray-200">
		<div class="container mx-auto px-4 py-3 flex items-center gap-2 text-sm text-gray-500">
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="hover:text-primary flex items-center gap-1"><?php skino_icon( 'ArrowLeft', 'w-4 h-4' ); ?> <?php esc_html_e( 'Home', 'skino' ); ?></a>
			<?php skino_icon( 'ChevronRight', 'w-4 h-4' ); ?>
			<span class="text-secondary font-medium"><?php echo esc_html( $heading ); ?></span>
		</div>
	</div>

	<div class="container mx-auto px-4 py-4 md:py-8">
		<div class="flex flex-col lg:flex-row gap-4 lg:gap-8">
			<?php if ( $items ) {
				get_template_part( 'template-parts/filter-panel', null, array(
					'title'        => $is_brand ? __( 'All Brands', 'skino' ) : __( 'All Categories', 'skino' ),
					'active_label' => $heading,
					'items'        => $items,
				) );
			} ?>

			<div class="flex-1">
				<div class="flex flex-wrap items-center justify-between gap-3 mb-6">
					<h1 class="text-2xl font-montserrat font-bold text-secondary">
						<?php echo esc_html( $heading ); ?>
						<span class="text-base font-normal text-gray-400 ml-2">(<?php echo (int) $total; ?> <?php esc_html_e( 'products', 'skino' ); ?>)</span>
					</h1>
					<?php woocommerce_catalog_ordering(); ?>
				</div>

				<?php if ( have_posts() ) : ?>
					<div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
						<?php while ( have_posts() ) : the_post(); skino_product_card( get_the_ID() ); endwhile; ?>
					</div>
					<div class="mt-8 skino-pagination"><?php woocommerce_pagination(); ?></div>
				<?php else : ?>
					<div class="text-center py-20 bg-white rounded-xl border border-gray-100">
						<p class="text-gray-400 text-lg mb-4"><?php echo $is_search ? esc_html__( 'No products matched your search.', 'skino' ) : esc_html__( 'No products found here.', 'skino' ); ?></p>
						<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="text-primary font-medium hover:underline">&larr; <?php esc_html_e( 'Back to Home', 'skino' ); ?></a>
					</div>
				<?php endif; ?>
			</div>
		</div>
	</div>
</div>
<?php
get_footer();
