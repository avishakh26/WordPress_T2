<?php
/**
 * Category / brand filter: sidebar on desktop, slide-in drawer on phones (ported from FilterPanel.jsx).
 *
 * @var array $args { title: string, active_label: string, items: array{label,url,count,active}[] }
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
$title = $args['title'];
$items = $args['items'];

ob_start();
?>
<ul class="divide-y divide-gray-100">
	<?php foreach ( $items as $item ) : ?>
		<li>
			<a href="<?php echo esc_url( $item['url'] ); ?>" <?php echo $item['active'] ? 'aria-current="page"' : ''; ?>
				class="flex items-center justify-between px-4 py-3 text-sm hover:bg-orange-50 hover:text-primary transition-colors <?php echo $item['active'] ? 'bg-orange-50 text-primary font-semibold border-l-4 border-primary' : 'text-secondary'; ?>">
				<span class="capitalize"><?php echo esc_html( $item['label'] ); ?></span>
				<span class="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full"><?php echo (int) $item['count']; ?></span>
			</a>
		</li>
	<?php endforeach; ?>
</ul>
<?php
$list = ob_get_clean();
?>
<aside class="hidden lg:block w-64 shrink-0">
	<div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-4">
		<div class="bg-primary text-white px-4 py-3 font-bold font-montserrat uppercase text-sm tracking-wider"><?php echo esc_html( $title ); ?></div>
		<div class="max-h-[70vh] overflow-y-auto"><?php echo $list; // phpcs:ignore ?></div>
	</div>
</aside>

<div class="lg:hidden flex items-center justify-between gap-3">
	<button type="button" data-filter-open aria-haspopup="dialog" class="inline-flex items-center gap-2 h-10 px-4 rounded-full bg-white border border-gray-200 shadow-sm text-sm font-semibold text-secondary active:bg-gray-50">
		<?php skino_icon( 'SlidersHorizontal', 'w-4 h-4 text-primary' ); ?> <?php esc_html_e( 'Filter', 'skino' ); ?>
	</button>
	<span class="text-sm text-gray-500 truncate capitalize"><?php echo esc_html( $args['active_label'] ); ?></span>
</div>

<div data-filter-drawer class="hidden lg:hidden fixed inset-0 z-[300]" role="dialog" aria-modal="true" aria-label="<?php echo esc_attr( $title ); ?>">
	<div data-filter-close class="absolute inset-0 bg-black/50"></div>
	<div class="absolute left-0 top-0 h-full w-[82%] max-w-xs bg-white shadow-2xl flex flex-col" style="animation: slideInLeft .25s ease-out">
		<div class="bg-primary text-white px-4 py-3.5 flex items-center justify-between">
			<span class="font-bold font-montserrat uppercase text-sm tracking-wider"><?php echo esc_html( $title ); ?></span>
			<button type="button" data-filter-close aria-label="<?php esc_attr_e( 'Close filter', 'skino' ); ?>" class="p-1.5 -mr-1.5 rounded-full hover:bg-white/20"><?php skino_icon( 'X', 'w-5 h-5' ); ?></button>
		</div>
		<div class="flex-1 overflow-y-auto"><?php echo $list; // phpcs:ignore ?></div>
	</div>
</div>
