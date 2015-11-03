jQuery(document).ready(function($){

    var $window = $(window);
    var mobile_breakpoint = 768;

    /*----even height-----*/

    $window.load(function(){
        if($window.width()<mobile_breakpoint){
            return;
        }

        var $even_height = $('.even-height');
        var temp_height = {};

        $even_height.each(function(idx){
            var $this = $(this);
            var this_rel = $this.attr('rel');
            var this_height = $this.height();

            if(typeof temp_height[this_rel] == 'undefined'){
                temp_height[this_rel] = 0;
            }

            if(this_height>temp_height[this_rel]){
                temp_height[this_rel] = this_height;
            }
        });

        $even_height.each(function(idx){
            var $this = $(this);
            var this_rel = $this.attr('rel');

            $this.height(temp_height[this_rel]);
        });
    });

    /*----bootstrap starter----*/

    $('.bs-tooltip').tooltip();
    $('.bs-popover').popover();
    $('.cs-modal').on('click', '.close', function(event){
        var $this = $(this);

        $this.closest('.modal').hide();
    });

    /*----responsive custom input group----*/

    /*----replace not found image----*/

    $(window).load(function() {
        
        $('.block-thumb img').add('.img-safe-load img').each(function() {

            // console.log(this.src, this.complete, this.naturalWidth);

            // if (!this.complete || typeof this.naturalWidth == 'undefined' || this.naturalWidth == 0) {
            if (this.naturalWidth === 0) {
                var suffix = getFileNameSuffix(this.src);
                if(!suffix){ suffix = 'thumb'; }
                this.src = site_url+'assets/images/default/default_product_'+suffix+'.gif';
            }
        });
    });

    /*----navbar member-----*/

    (function(){
        if($window.width()>mobile_breakpoint){
            return;
        }

        var $navbar_member = $('#navbar-member');
        var $collapse = $navbar_member.find('.navbar-collapse');
        var $placeholder = $('<ul class="nav navbar-nav navbar-placeholder"></ul>');
        var $active = $collapse.find('.active').first().clone().removeClass('active');

        if($active.length < 1){
            $active = $('<li class="menu-member"><a>Member Menu</a></li>');
        }

        $collapse.before($placeholder.addClass('display-block').html($active));

        $('#navbar-member .navbar-toggle').click(function(event){
            var $this = $(this);

            if($collapse.hasClass('in')){
                $collapse.removeClass('in');
                $placeholder.show();
            }
            else{
                $collapse.addClass('in');
                $placeholder.hide();
            }
        });

    })();

    /*----nav admin control----*/

    (function(){

        $('.nav-control-toggle').click(function(event){
             var $this = $(this);
             var $container = $this.closest('.nav-control-container');

             $container.toggleClass('nav-on');
        });

    })();

    /*----table ajax----*/

    $('.table-list').on('click', '.action-detail', function(event){
        event.preventDefault();

        var $this      = $(this);
        var $this_row  = $this.closest('tr');
        var $next_row  = $this_row.next();
        var colspan    = $this_row.find('td').length;
        var this_rel   = $this.attr('rel');
        var this_row_rel   = $this_row.attr('rel');

        if($next_row.hasClass(this_rel) && $next_row.hasClass(this_row_rel)){
            $next_row.toggle();
            return;
        }
        else if($next_row.next().hasClass(this_rel) && $next_row.next().hasClass(this_row_rel)){
            $next_row.next().toggle();
            return;
        }

        $.ajax({
            url: $this.attr('href'),
            success: function(response) {
                
                var html_response = $(response).filter('#ajax-content').html();
                
                $this_row.after('<tr class="ajax-row '+this_rel+' '+this_row_rel+'"><td colspan="'+colspan+'">'+html_response+'</td></tr>');
            }
        });
    })
    .on('click', '.action-confirm-page', function(event){
        event.preventDefault();

        var $this = $(this);
    });

    /*----select all checkbox----*/

    $('#js-select-all').click(function($event){
        var $this = $(this);
        var $parent = $this.closest('.table-list');

        if($this.prop('checked')){
            $parent.find('input[type=checkbox]').attr('checked','checked').prop('checked', true);
            $this.attr('checked','checked');
        }
        else{
            $parent.find('input[type=checkbox]').removeAttr('checked').prop('checked', false);
            $this.removeAttr('checked');
        }
    });

    /*----bulk submit----*/

    $('#js-bulk-form').submit(function($event){
       $event.preventDefault();
        var $this = $(this);
        var $input = $this.find('input[type=hidden]');
        var ref = $this.data('ref');
        var data = $(ref).find('input[type=checkbox]').serialize();

        if($input.length){
            $input.val(data);
        }
        else{
            $this.append('<input type="hidden" name="ids" value="'+data+'" />');
        }

        $this.off('submit').submit();
    });


    /*----sort table row----*/

    (function(){
        if(typeof $.fn.sortable == 'undefined'){ return; }

        $('.table-list').find('tbody').sortable({
            opacity: 0.4,
            cursor: 'move',
            handle: '.js-handle-move',
            update: function(){
                var $this = $(this);
                var $parent = $this.closest('.table-list');

                var order = $this.sortable("serialize");
                var url = $parent.data('sort-url')+'/';

                $.post(site_url+url+offset, order);        
            }
        });
    })();

    /*----sort table row----*/

    $('.js-input-sort').keyup(function(){
        var $this = $(this);
        var $parent = $this.closest('.table-list');

        var product_id = $this.attr('rel');
        var order = $this.val();
        var url = $parent.data('update-url');
        
        delay(function(){
            $.ajax({
                type: 'POST',
                url: site_url + url,
                data: {
                    order: order,
                    product_id: product_id
                }
            });
        }, 300 );
    });

    /*----menu tree----*/

    $('.menu-tree').on('click', 'span', function(event){
        event.preventDefault();

        var $this = $(this);
        var $this_li = $this.closest('li');

        $this_li.find('ul').slideToggle();
        $this_li.toggleClass('active');
    });

    /*----modal iframe----*/

    var $bs_modal = $('#bs-modal');

    $bs_modal.modal({
        show: false
    });

    $('.js-modal-iframe').click(function($event){
        $event.preventDefault();
        var $this = $(this);
        var this_title = $this.attr('title');
        var this_href = $this.attr('href');
        
        if(!this_title){
            this_title = $this.data('title');
        }

        var content = '<iframe class="iframe" src="'+this_href+'"></iframe>';

        if(this_title){
            $bs_modal.find('.modal-title').html(this_title);
        }
        $bs_modal.find('.modal-body').html(content);
        $bs_modal.modal('show');
    });

    /*----window open----*/

    $('.js-window-open').click(function($event){
        $event.preventDefault();
        var $this = $(this);
        var this_title = $this.attr('title');
        var this_href = $this.attr('href');
        
        if(!this_title){
            this_title = $this.data('title');
        }

        if(!this_title){
            this_title = 'Modal Box';
        }

        window.open(this_href, this_title, config='height=300, width=400, toolbar=no, menubar=no, location=no, directories=no, status=no');
    });

    /*----add new select value----*/

    $('.js-add-select-value').change(function($event){
        var $this = $(this);
        var this_rel = $this.attr('rel');
        var this_value = $this.val();
        var $this_rel = $this.siblings(this_rel);
        
        if(this_value == '+'){
            $this_rel.show();
        }
        else{
            $this_rel.hide();
        }
    });
    $('.js-add-select-value').change();

    /*----plugins enabler----*/
    
    (function(){
        if(typeof $.fn.datetimepicker == 'undefined'){ return false; }
        $('.input-date').datetimepicker({
            pickTime: false,
            format: 'YYYY-MM-DD'
        });
    })();

    (function(){
        if(typeof $.fn.sortable == 'undefined'){ return false; }
        $(".list-sortable" ).sortable().disableSelection();
    })();

    (function(){
        if(typeof $.fn.select2 == 'undefined'){ return false; }
        $('.input-select2').select2();

        $('.input-select2-ajax').select2({
            minimumInputLength: 3,
        });

        $('.input-select2-tags').each(function(idx){
            var $this = $(this);
            var min_length = $this.data('min_length');
            var max_item = $this.data('max_item');

            var config = {
                tags: [],
                tokenSeparators: [',']
            };

            if(typeof min_length == 'undefined'){
                min_length = 3;
            }
            config.minimumInputLength = parseInt(min_length);

            if(typeof max_item != 'undefined'){
                config.maximumSelectionSize = parseInt(max_item);
            }

            $this.select2(config);
        });


        $('.input-select2-post-add').each(function(idx){
            var $this = $(this);
            var min_length = $this.data('min_length');
            var max_item = $this.data('max_item');
            var ajax_url = $this.data('ajax_url');
            var ajax_data = $this.data('ajax_data');
            var term_prefix = $this.data('term_prefix');
            var term_suffix = $this.data('term_suffix');

            if(typeof ajax_data != 'undefined'){
                ajax_data = window[ajax_data];
            }

            if(typeof min_length == 'undefined'){
                min_length = 3;
            }

            if(typeof term_prefix == 'undefined'){
                term_prefix = '';
            }

            if(typeof term_suffix == 'undefined'){
                term_suffix = '';
            }

            var config = {
                minimumInputLength: parseInt(min_length),
                createSearchChoice: function(term){
                    return {id:term, text:term};
                },
                ajax: {
                    type: 'POST',
                    dataType: 'json',
                    url: ajax_url,
                    data: function(term, page){
                        ajax_data.val = term_prefix + term + term_suffix;
                        return ajax_data;
                    },
                    results: function(response, page, query){
                        return {results: response};
                    }
                },
                formatResult: function(response){
                    return response.label;
                },
                formatSelection: function(response){
                    if(typeof response.label != 'undefined'){
                        return response.label;
                    }
                    else{
                        return response.text;
                    }
                },
                initSelection: function(element, callback){
                    var value = $(element).val();

                    callback({id:value, text:value});
                },
                id: function(response){
                    return response.label;
                }
            };

            if(typeof max_item != 'undefined'){
                config.maximumSelectionSize = parseInt(max_item);
            }

            $this.select2(config);
        });
    })();

    (function(){
        if(typeof tinymce == 'undefined'){ return false; }
        tinymce.init({
            selector:'.input-tinymce',
            menubar: false,
            plugins: "link, image, media, table, codemirror, visualblocks, nesia_filemanager, paste",
            toolbar: "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link media table | nesia_filemanager code visualblocks",
            toolbar1: "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link media table | nesia_filemanager code visualblocks",
            content_css: [site_url+'packages/scienceguard/nesia/assets/css/style.css', site_url+'packages/scienceguard/nesia/assets/css/editor.css'],

            paste_auto_cleanup_on_paste : true,
            paste_remove_styles: true,
            paste_remove_styles_if_webkit: true,
            paste_strip_class_attributes: true,

            codemirror: {
                indentOnInit: true,
                path: site_url+'packages/scienceguard/nesia/assets/vendors/codemirror',
                config: { 
                    lineNumbers: true,
                    lineWrapping: true,
                    mode: "text/html",
                    indentUnit: 3,
                    indentWithTabs: true,
                    tabSize: 3
                }
            }
        });
    })();

});