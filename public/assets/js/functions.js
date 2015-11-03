function numberDelimiter(nStr){
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? ',' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + '.' + '$2');
	}
	return x1 + x2;
}

function formatPrice(num, cur, delimiter){
	return cur+ ' ' + numberDelimiter(num, delimiter);
}

function roundNumber(num, dec) {
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}

var delay = (function(){
	var timer = 0;
	return function(callback, ms){
		clearTimeout (timer);
		timer = setTimeout(callback, ms);
	};
})();

/*---repopulate category---*/

function repopulateProductCat(cat_id){

	ajaxGetValue('product_categories', 'parent_id', 'id', cat_id, function(parent_id){
		
		var $target = $('#subcat-id');

		if(!parent_id){
			parent_id = cat_id;
		}

		$("#cat-id").val(parent_id);

		ajaxGetOption($target,'product_categories','cat_name','parent_id',parent_id, cat_id, null, 'nesia_market');
	}, 'nesia_market');	
}

/*---repopulate category---*/

function repopulateParentCat(cat_type, default_value){
	var $target = $("#cat-id");
	var $result = window.result_product_cats;
	var is_selected = '';
	var opts_html = '';
	var cat_id;

	if(typeof cat_type == 'undefined' || !cat_type){
		cat_type = 'default';
	}

	if(cat_type == 'rent'){
		cat_type = 'default';
	}

	_.each($result, function($row){
		is_selected = ($row.value===default_value) ? ' selected="selected"' : '';	
		cat_id = ($row.value===default_value) ? $row.value : default_value;	
		if($row.cat_type == cat_type){
			opts_html += '<option value="'+$row.value+'"'+is_selected+'>'+$row.label+'</option>';
		}
	});

	$target.html(opts_html);

	if(typeof cat_id == 'undefined' || !cat_id){
		cat_id = default_value;
	}

	return cat_id; 
}


/*---url parameter---*/

function getUrlVar(key){
	var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search); 
	return result && unescape(result[1]) || ""; 
}

/*---ajax helper---*/

function ajaxGetOption(target, table, label, key, val, value, cb, con){
	$data = {
		table: table,
		label: label,
		key: key,
		val: val
	};

	if(typeof(con) != 'undefined'){
		$data.con = con;
	}

	// console.log('con', con);

	$.ajax({
		type: 'POST',
		url: site_url+'ajax/options',
		data: $data,
		success: function($result){
			var opts_html = '';
			var is_selected = '';
			
			_.each($result, function($row){
				is_selected = ($row.value===value) ? ' selected="selected"' : '';	
				opts_html += '<option value="'+$row.value+'"'+is_selected+'>'+$row.label+'</option>';
			});
			
			target.html(opts_html);

			if(opts_html){
				target.removeAttr('readonly');
			}
			else{
				target.attr('readonly', 'readonly');
			}

			if(typeof(cb) == typeof(Function)){
				cb();
			}
		}
	});	
}

function ajaxGetValue(table, field, key, val, cb, con){
	
	$data = {
		table: table,
		field: field,
		key: key,
		val: val
	};

	if(typeof(con) != 'undefined'){
		$data.con = con;
	}

	// console.log('con', con);

	$.ajax({
		type: 'POST',
		url: site_url+'ajax/value',
		data: $data,
		success: function($result){
			return_value = $result;

			if(typeof(cb) == typeof(Function)){
				cb($result);
			}
		}
	});
}

function getFileName(url) {
	//this gets the full url
	//var url = document.location.href;
	//this removes the anchor at the end, if there is one
	url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
	//this removes the query after the file name, if there is one
	url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
	//this removes everything before the last slash in the path
	url = url.substring(url.lastIndexOf("/") + 1, url.length);
	//return
	return url;
}

function getFileNameSuffix(str) {
	var ext_index = str.lastIndexOf('.');
	var del_index = str.lastIndexOf('_', ext_index);
	var suffix = str.substring(del_index+1, ext_index);
	return suffix;
}