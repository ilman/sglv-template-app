<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title><?php echo ucwords($page_title) ?></title>

<link rel="stylesheet" href="<?php echo asset($admin_asset_url.'/vendors/bootstrap/css/bootstrap.min.css') ?>">
<link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
<link rel="stylesheet" href="<?php echo asset($admin_asset_url.'/vendors/admin-lte/css/admin-lte.min.css') ?>">
<link rel="stylesheet" href="<?php echo asset($admin_asset_url.'/vendors/admin-lte/css/skins/_all-skins.min.css') ?>">

<?php Lib\Template::printStyle() ?>

<script type="text/javascript">
	var attach_app = {};
	var site_url = '<?php echo asset('') ?>';
	var offset = <?php echo 0+($offset-1) ?>;
</script>

<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
		<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
		<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
<![endif]-->