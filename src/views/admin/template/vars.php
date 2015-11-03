<?php 

use Scienceguard\SG_Util;

$current_user = CurrentUser::getUser();

$current_user_id = SG_Util::val($current_user, 'id');
$current_user_group = SG_Util::val($current_user, 'groups', array());
$current_username = SG_Util::val($current_user, 'username');

$request_path = Request::path();

$page_title = (isset($page_title)) ? $page_title : $request_path;
$page_title_params = (isset($page_title_params)) ? $page_title_params : array();
$page_icon = (isset($page_icon)) ? $page_icon : 'icon-page';
$page_canonical = (isset($page_canonical)) ? $page_canonical : Request::url();

$default_page_metas = array(	
	'link_canonical' => array(
		'rel' => 'canonical',
		'href' => $page_canonical,
		'tag' => 'link',
	),
	'link_prev' => array(),
	'link_next' => array(),
	'link_publisher' => array(),
	'meta_robots' => array(),
	'meta_description' => array(),
	'og_locale' => array(
		'property' => 'og:locale',
		'content' => 'id_ID',
		'tag' => 'meta',
	),
	'og_type' => array(
		'property' => 'og:type',
		'content' => 'object',
		'tag' => 'meta',
	),
	'og_title' => array(
		'property' => 'og:title',
		'content' => $page_title,
		'tag' => 'meta',
	),
	'og_url' => array(
		'property' => 'og:url',
		'content' => $page_canonical,
		'tag' => 'meta',
	),
	'og_desc' => array(),
	'og_site_name' => array(
		'property' => 'og:site_name',
		'content' => 'QuizApp',
		'tag' => 'meta',
	),
);

if(!isset($page_metas)){
	$page_metas = $default_page_metas;
}
else{
	$page_metas = array_merge($default_page_metas, $page_metas);
}

$subheader = (isset($subheader)) ? $subheader : true;

$offset = (isset($result) && isset($result->from)) ? $result->from : 0;

$admin_asset_url = 'packages/scienceguard/sglv-login';