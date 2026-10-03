<?php
/**
 * My Account dashboard: welcome banner, quick links and the latest orders.
 * Overrides woocommerce/myaccount/dashboard.php.
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
$user       = wp_get_current_user();
$orders     = wc_get_orders( array( 'customer' => $user->ID, 'limit' => 3, 'orderby' => 'date', 'order' => 'DESC' ) );
$count      = (int) wc_get_customer_order_count( $user->ID );
$wishlist   = get_page_by_path( 'wishlist' );
$tiles      = array(
	array( 'Package', __( 'My Orders', 'skino' ), __( 'Track and review your orders', 'skino' ), wc_get_account_endpoint_url( 'orders' ) ),
	array( 'MapPin', __( 'Addresses', 'skino' ), __( 'Where we deliver your order', 'skino' ), wc_get_account_endpoint_url( 'edit-address' ) ),
	array( 'User', __( 'Account Details', 'skino' ), __( 'Name, email and password', 'skino' ), wc_get_account_endpoint_url( 'edit-account' ) ),
	array( 'Heart', __( 'Wishlist', 'skino' ), __( 'Products you saved', 'skino' ), $wishlist ? get_permalink( $wishlist ) : home_url( '/wishlist/' ) ),
);
?>
<section class="skino-welcome">
	<div>
		<p class="skino-welcome-hi"><?php esc_html_e( 'Welcome back', 'skino' ); ?></p>
		<h2 class="skino-welcome-name"><?php echo esc_html( $user->display_name ); ?></h2>
		<p class="skino-welcome-sub">
			<?php
			echo $count
				? esc_html( sprintf( _n( 'You have placed %d order with us.', 'You have placed %d orders with us.', $count, 'skino' ), $count ) )
				: esc_html__( 'You have not placed an order yet. Your first one is waiting.', 'skino' );
			?>
		</p>
	</div>
	<a href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>" class="skino-welcome-cta"><?php esc_html_e( 'Continue shopping', 'skino' ); ?> <?php skino_icon( 'ArrowRight', 'w-4 h-4' ); ?></a>
</section>

<div class="skino-tiles">
	<?php foreach ( $tiles as $t ) : ?>
		<a href="<?php echo esc_url( $t[3] ); ?>" class="skino-tile">
			<span class="skino-tile-icon"><?php skino_icon( $t[0], 'w-6 h-6' ); ?></span>
			<span class="skino-tile-title"><?php echo esc_html( $t[1] ); ?></span>
			<span class="skino-tile-text"><?php echo esc_html( $t[2] ); ?></span>
		</a>
	<?php endforeach; ?>
</div>

<section class="skino-recent">
	<div class="skino-recent-head">
		<h3><?php esc_html_e( 'Recent orders', 'skino' ); ?></h3>
		<?php if ( $orders ) : ?><a href="<?php echo esc_url( wc_get_account_endpoint_url( 'orders' ) ); ?>"><?php esc_html_e( 'View all', 'skino' ); ?></a><?php endif; ?>
	</div>
	<?php if ( ! $orders ) : ?>
		<div class="skino-empty">
			<?php skino_icon( 'ShoppingBag', 'w-10 h-10 text-gray-300 mx-auto mb-2' ); ?>
			<p><?php esc_html_e( 'No orders yet.', 'skino' ); ?></p>
		</div>
	<?php else : ?>
		<ul class="skino-order-list">
			<?php foreach ( $orders as $order ) : ?>
				<li>
					<a href="<?php echo esc_url( $order->get_view_order_url() ); ?>">
						<div>
							<p class="skino-order-no">#<?php echo esc_html( $order->get_order_number() ); ?></p>
							<p class="skino-order-date"><?php echo esc_html( wc_format_datetime( $order->get_date_created() ) ); ?> &middot; <?php echo esc_html( sprintf( _n( '%d item', '%d items', $order->get_item_count(), 'skino' ), $order->get_item_count() ) ); ?></p>
						</div>
						<span class="skino-badge skino-badge-<?php echo esc_attr( $order->get_status() ); ?>"><?php echo esc_html( wc_get_order_status_name( $order->get_status() ) ); ?></span>
						<strong class="skino-order-total"><?php echo wp_kses_post( $order->get_formatted_order_total() ); ?></strong>
					</a>
				</li>
			<?php endforeach; ?>
		</ul>
	<?php endif; ?>
</section>
<?php
do_action( 'woocommerce_account_dashboard' );
