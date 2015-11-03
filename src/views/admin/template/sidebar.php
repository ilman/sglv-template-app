<?php 
	use Scienceguard\SG_Util;
?>
<!-- Sidebar user panel -->
<div class="user-panel">
	<div class="pull-left image">
		<img src="<?php echo asset($admin_asset_url.'/assets/images/default-avatar.png') ?>" class="img-circle" alt="User Image" />
	</div>
	<div class="pull-left info">
		<p><?php echo $current_username ?></p>

		<a href="#"><i class="fa fa-circle text-success"></i> Online</a>
	</div>
</div>
<!-- sidebar menu: : style can be found in sidebar.less -->
<ul class="sidebar-menu">
	<li class="header">MAIN NAVIGATION</li>
	<!-- <li class="treeview">
		<a href="#">
			<i class="fa fa-dashboard"></i> <span>Dashboard</span> <i class="fa fa-angle-left pull-right"></i>
		</a>
		<ul class="treeview-menu">
			<li><a href="../../index.html"><i class="fa fa-circle-o"></i> Dashboard v1</a></li>
			<li><a href="../../index2.html"><i class="fa fa-circle-o"></i> Dashboard v2</a></li>
		</ul>
	</li> -->

	<?php 
		$nav_admin = array(
			array(
				'label' => trans('link.question'),
				'url' => 'admin/question',
			),
			array(
				'label' => trans('link.result'),
				'url' => 'admin/result',
			),
			array(
				'label' => trans('link.capture'),
				'url' => 'admin/capture',
			),
			array(
				'label' => trans('link.admin_db'),
				'url' => 'admin/db',
			),
			array(
				'label' => trans('link.admin_cache'),
				'url' => 'admin/cache',
			),
			array(
				'label' => trans('link.admin_message'),
				'url' => 'admin/message',
			),
			array(
				'label' => trans('link.member_message'),
				'url' => 'member/message',
			),
			array(
				'label' => trans('link.admin_support'),
				'url' => 'admin/support',
			),
			array(
				'label' => trans('link.admin_media'),
				'url' => 'admin/media',
			),
			array(
				'label' => trans('link.admin_company'),
				'url' => 'admin/company',
			),
			array(
				'label' => trans('link.member_company'),
				'url' => 'member/company',
			),
			array(
				'label' => trans('link.admin_question'),
				'url' => 'admin/question',
			),
			array(
				'label' => trans('link.admin_result'),
				'url' => 'admin/result',
			),
			array(
				'label' => trans('link.admin_capture'),
				'url' => 'admin/capture',
			),
		);
	?>
	<?php 
		$each_nav_url = 'admin';
		if(Request::url() == url('admin')){
			$li_class = 'active';
		}
		else{
			$li_class = '';
		}
	?>
	<li class="<?php echo $li_class ?>">
		<a href="<?php echo url('admin') ?>">
			<?php 
				echo '<i class="fa fa-dashboard"></i> <span>'.trans('link.dashboard').'</span>';
			?>
		</a>
	</li>
	<?php foreach($nav_admin as $each_nav): ?>
		<?php 
			$each_nav_label = SG_Util::val($each_nav, 'label'); 
			$each_nav_url = SG_Util::val($each_nav, 'url'); 
			$each_nav_icon = SG_Util::val($each_nav, 'icon'); 
			$each_nav_notif = SG_Util::val($each_nav, 'notif'); 
			$li_class = (Lib\SglvCoreUtil::urlCompares('', $each_nav_url, true)) ? 'active' : '';
		?>
		<li class="<?php echo $li_class ?>">
			<a href="<?php echo url($each_nav_url) ?>">
				<?php 
					echo '<i class="fa fa-book"></i> <span>'.$each_nav_label.'</span>';
					if($each_nav_notif){
						echo ' <span class="badge bg-danger">'.$each_nav_notif.'</span>';
					}
				?>
			</a>
		</li>
	<?php endforeach; ?>
	<li class="header">EXTRAS</li>
	<li><a href="<?php echo url('admin/config') ?>"><i class="fa fa-circle-o text-red"></i> <span><?php echo trans('link.config') ?></span></a></li>
	<li><a href="<?php echo url('admin/file') ?>"><i class="fa fa-circle-o text-yellow"></i> <span><?php echo trans('link.file') ?></span></a></li>
</ul>
