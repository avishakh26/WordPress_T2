<?php
/**
 * Template for /sale/{slug}/ (ported from SalePage.jsx). Loaded by inc/sale.php.
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
$slug  = get_query_var( 'skino_sale' );
$sales = skino_sales();
$sale  = $sales[ $slug ];

$sorts = array(
	'discount' => __( 'Biggest discount', 'skino' ),
	'low'      => __( 'Price: low to high', 'skino' ),
	'high'     => __( 'Price: high to low', 'skino' ),
	'rating'   => __( 'Top rated', 'skino' ),
);
$sort = isset( $_GET['sort'], $sorts[ $_GET['sort'] ] ) ? sanitize_key( $_GET['sort'] ) : 'discount'; // phpcs:ignore WordPress.Security.NonceVerification

$list = array();
foreach ( wc_get_products( array( 'limit' => -1, 'status' => 'publish', 'return' => 'objects' ) ) as $product ) {
	if ( skino_in_sale( $slug, $product ) ) {
		$list[] = $product;
	}
}
usort( $list, function ( $a, $b ) use ( $sort ) {
	switch ( $sort ) {
		case 'low':
			return (float) $a->get_price() <=> (float) $b->get_price();
		case 'high':
			return (float) $b->get_price() <=> (float) $a->get_price();
		case 'rating':
			return skino_product_rating( $b )[0] <=> skino_product_rating( $a )[0];
		default:
			return skino_discount_percent( $b ) <=> skino_discount_percent( $a );
	}
} );

// Paging: 16 per page, ?pg=2 for the next one (the sale list is filtered in PHP, so it is sliced here).
$total_items = count( $list );
$pages       = max( 1, (int) ceil( $total_items / SKINO_SALE_PER_PAGE ) );
$page        = isset( $_GET['pg'] ) ? min( $pages, max( 1, absint( $_GET['pg'] ) ) ) : 1; // phpcs:ignore WordPress.Security.NonceVerification
$page_items  = array_slice( $list, ( $page - 1 ) * SKINO_SALE_PER_PAGE, SKINO_SALE_PER_PAGE );

get_header();
?>
<div class="bg-gray-50 min-h-screen">
	<div class="bg-white border-b border-gray-200">
		<div class="container mx-auto px-4 py-3 flex items-center gap-2 text-sm text-gray-500">
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="hover:text-primary flex items-center gap-1"><?php skino_icon( 'ArrowLeft', 'w-4 h-4' ); ?> <?php esc_html_e( 'Home', 'skino' ); ?></a>
			<?php skino_icon( 'ChevronRight', 'w-4 h-4' ); ?>
			<span class="text-secondary font-medium"><?php echo esc_html( $sale['title'] ); ?></span>
		</div>
	</div>

	<section class="bg-gradient-to-r <?php echo esc_attr( $sale['gradient'] ); ?> text-white">
		<div class="container mx-auto px-4 py-8 md:py-12">
			<h1 class="text-2xl md:text-4xl font-montserrat font-bold !text-white"><?php echo esc_html( $sale['title'] ); ?></h1>
			<p class="mt-2 text-white/90 max-w-2xl text-sm md:text-lg"><?php echo esc_html( $sale['subtitle'] ); ?></p>
			<div class="mt-5 flex flex-wrap gap-2">
				<?php foreach ( $sales as $key => $s ) : ?>
					<a href="<?php echo esc_url( skino_sale_url( $key ) ); ?>" <?php echo $key === $slug ? 'aria-current="page"' : ''; ?> class="px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold transition-colors <?php echo $key === $slug ? 'bg-white text-secondary' : 'bg-white/20 hover:bg-white/30 text-white'; ?>"><?php echo esc_html( $s['title'] ); ?></a>
				<?php endforeach; ?>
			</div>
		</div>
	</section>

	<div class="container mx-auto px-4 py-6 md:py-8">
		<div class="flex items-center justify-between gap-3 mb-5">
			<p class="text-sm text-gray-500"><?php echo (int) count( $list ); ?> <?php esc_html_e( 'products', 'skino' ); ?></p>
			<form method="get" class="flex items-center gap-2 text-sm text-gray-600">
				<label for="sale-sort" class="hidden sm:inline"><?php esc_html_e( 'Sort by', 'skino' ); ?></label>
				<select id="sale-sort" name="sort" onchange="this.form.submit()" class="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-secondary focus:outline-none focus:border-primary">
					<?php foreach ( $sorts as $k => $label ) : ?>
						<option value="<?php echo esc_attr( $k ); ?>" <?php selected( $sort, $k ); ?>><?php echo esc_html( $label ); ?></option>
					<?php endforeach; ?>
				</select>
			</form>
		</div>

		<?php if ( ! $list ) : ?>
			<div class="text-center py-20 bg-white rounded-xl border border-gray-100">
				<p class="text-gray-400 text-lg mb-4"><?php esc_html_e( 'No products in this sale right now.', 'skino' ); ?></p>
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="text-primary font-medium hover:underline">&larr; <?php esc_html_e( 'Back to Home', 'skino' ); ?></a>
			</div>
		<?php else : ?>
			<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
				<?php foreach ( $page_items as $product ) { skino_product_card( $product ); } ?>
			</div>
			<?php if ( $pages > 1 ) : ?>
				<nav class="mt-8 skino-pagination" aria-label="<?php esc_attr_e( 'Pages', 'skino' ); ?>">
					<?php
					echo wp_kses_post( paginate_links( array(
						'base'      => esc_url_raw( add_query_arg( 'pg', '%#%', skino_sale_url( $slug ) ) ),
						'format'    => '',
						'current'   => $page,
						'total'     => $pages,
						'add_args'  => ( 'discount' !== $sort ) ? array( 'sort' => $sort ) : false,
						'prev_text' => '&larr;',
						'next_text' => '&rarr;',
					) ) );
					?>
				</nav>
			<?php endif; ?>
		<?php endif; ?>
	</div>
</div>
<?php
get_footer();
