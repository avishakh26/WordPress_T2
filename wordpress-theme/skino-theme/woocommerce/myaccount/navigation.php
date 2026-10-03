<?php
/**
 * My Account sidebar: user card + icon menu.
 * Overrides woocommerce/myaccount/navigation.php.
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
$user  = wp_get_current_user();
$icons = array(
	'dashboard'       => 'LayoutDashboard',
	'orders'          => 'Package',
	'downloads'       => 'Download',
	'edit-address'    => 'MapPin',
	'payment-methods' => 'CreditCard',
	'edit-account'    => 'User',
	'customer-logout' => 'LogOut',
);
do_action( 'woocommerce_before_account_navigation' );
?>
<nav class="woocommerce-MyAccount-navigation skino-account-nav" aria-label="<?php esc_attr_e( 'Account pages', 'skino' ); ?>">
	<div class="skino-account-user">
		<span class="skino-account-avatar"><?php echo esc_html( strtoupper( mb_substr( $user->display_name, 0, 1 ) ) ); ?></span>
		<div class="min-w-0">
			<p class="skino-account-name"><?php echo esc_html( $user->display_name ); ?></p>
			<p class="skino-account-mail"><?php echo esc_html( $user->user_email ); ?></p>
		</div>
	</div>
	<ul>
		<?php foreach ( wc_get_account_menu_items() as $endpoint => $label ) : ?>
			<li class="<?php echo esc_attr( wc_get_account_menu_item_classes( $endpoint ) ); ?>">
				<a href="<?php echo esc_url( wc_get_account_endpoint_url( $endpoint ) ); ?>" <?php echo wc_is_current_account_menu_item( $endpoint ) ? 'aria-current="page"' : ''; ?>>
					<?php skino_icon( isset( $icons[ $endpoint ] ) ? $icons[ $endpoint ] : 'ChevronRight', 'w-5 h-5 shrink-0' ); ?>
					<span><?php echo esc_html( $label ); ?></span>
				</a>
			</li>
		<?php endforeach; ?>
	</ul>
</nav>
<?php do_action( 'woocommerce_after_account_navigation' ); ?>
