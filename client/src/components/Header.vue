<template>
      <nav class="navbar navbar-default navbar-fixed">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navigation-example-2">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" >Dashboard</a>
                </div>
                <div class="collapse navbar-collapse">
                    <ul class="nav navbar-nav navbar-left">
                        <li>
                            <a  class="dropdown-toggle" data-toggle="dropdown">
                                <i class="fa fa-dashboard"></i>
								<p class="hidden-lg hidden-md">Dashboard</p>
                            </a>
                        </li>
                        <li class="dropdown">
                              <a  class="dropdown-toggle" data-toggle="dropdown">
                                    <i class="fa fa-globe"></i>
                                    <b class="caret hidden-lg hidden-md"></b>
									<p class="hidden-lg hidden-md">
										5 Notifications
										<b class="caret"></b>
									</p>
                              </a>
                              <ul class="dropdown-menu">
                                <li><a >Notification 1</a></li>
                                <li><a >Notification 2</a></li>
                                <li><a >Notification 3</a></li>
                                <li><a >Notification 4</a></li>
                                <li><a >Another notification</a></li>
                              </ul>
                        </li>
                        <li>
                           <a>
                                <i class="fa fa-search"></i>
								<p class="hidden-lg hidden-md">Search</p>
                            </a>
                        </li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li>
                           <a>
                               <p>Account</p>
                            </a>
                        </li>
                        <li class="dropdown">
                              <a  class="dropdown-toggle" data-toggle="dropdown">
                                    <p>
										Dropdown
										<b class="caret"></b>
									</p>
                              </a>
                              <ul class="dropdown-menu">
                                <li><a >Action</a></li>
                                <li><a >Another action</a></li>
                                <li><a >Something</a></li>
                                <li><a >Another action</a></li>
                                <li><a >Something</a></li>
                                <li class="divider"></li>
                                <li><a >Separated link</a></li>
                              </ul>
                        </li>
                        <li>
                            <a id="logout">
                                <p @click="logout()">Log Out</p>
                            </a>
                        </li>
						<li class="separator hidden-lg"></li>
                    </ul>
                </div>
            </div>
        </nav>
</template>

<script>
import JQuery from 'jquery'
import PostsService from '@/services/PostsService'
var $ = JQuery
export default {
   methods:{
       async logout(){
            let response =  await PostsService.logout();
            console.log(response)
            if(response.data && response.data.errors){
                alert(response.data.errors.error)
            }else{
                this.$router.push('/login')
            }
        }
    }
}
var searchVisible = 0;
var transparent = true;

var transparentDemo = true;
var fixedTop = false;

var navbar_initialized = false;

$(document).ready(function(){
    var window_width = $(window).width();

    // check if there is an image set for the sidebar's background
    lbd.checkSidebarImage();

    // Init navigation toggle for small screens
    lbd.initRightMenu();

    //  Activate the tooltips
    //$('[rel="tooltip"]').tooltip();

    $('.form-control').on("focus", function(){
        $(this).parent('.input-group').addClass("input-group-focus");
    }).on("blur", function(){
        $(this).parent(".input-group").removeClass("input-group-focus");
    });

    // Fixes sub-nav not working as expected on IOS
$('body').on('touchstart.dropdown', '.dropdown-menu', function (e) { e.stopPropagation(); });
});

$(document).on('click', '.navbar-toggle', function(){
    $toggle = $(this);

    if(lbd.misc.navbar_menu_visible == 1) {
        $('html').removeClass('nav-open');
       lbd.misc.navbar_menu_visible = 0;
        $('#bodyClick').remove();
        setTimeout(function(){
           $toggle.removeClass('toggled');
       }, 550);
    } else {
       setTimeout(function(){
           $toggle.addClass('toggled');
       }, 580);
       div = '<div id="bodyClick"></div>';
       $(div).appendTo('body').click(function() {
           $('html').removeClass('nav-open');
           lbd.misc.navbar_menu_visible = 0;
            setTimeout(function(){
               $toggle.removeClass('toggled');
               $('#bodyClick').remove();
            }, 550);
       });

      $('html').addClass('nav-open');
       lbd.misc.navbar_menu_visible = 1;
    }
});

$(window).on('resize', function(){
    if(navbar_initialized){
        lbd.initRightMenu();
        navbar_initialized = true;
    }
});

var lbd = {
    misc:{
        navbar_menu_visible: 0
    },

    checkSidebarImage: function(){
        var $sidebar = $('.sidebar');
        var image_src = $sidebar.data('image');

        if(image_src !== undefined){
            var sidebar_container = '<div class="sidebar-background" style="background-image: url(' + image_src + ') "/>'
            $sidebar.append(sidebar_container);
        }
    },

    initRightMenu: debounce(function(){
        if(!navbar_initialized){
            var $sidebar_wrapper = $('.sidebar-wrapper');
            var $navbar = $('nav').find('.navbar-collapse').html();

            var mobile_menu_content = '';

            var nav_content = $navbar;

            nav_content = '<ul class="nav nav-mobile-menu">' + nav_content + '</ul>';

            // navbar_form = $('nav').find('.navbar-form').get(0).outerHTML;

            var  $sidebar_nav = $sidebar_wrapper.find(' > .nav');

            // insert the navbar form before the sidebar list
            var  $nav_content = $(nav_content);
            // $navbar_form = $(navbar_form);
            $nav_content.insertBefore($sidebar_nav);
            // $navbar_form.insertBefore($nav_content);

            $(".sidebar-wrapper .dropdown .dropdown-menu > li > a").click(function(event) {
                event.stopPropagation();

            });

            var  mobile_menu_initialized = true;
        } else {
            if($(window).width() > 991){
                // reset all the additions that we made for the sidebar wrapper only if the screen is bigger than 991px
                // $sidebar_wrapper.find('.navbar-form').remove();
                $sidebar_wrapper.find('.nav-mobile-menu').remove();

                var mobile_menu_initialized = false;
            }
        }
    },200)
}

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		}, wait);
		if (immediate && !timeout) func.apply(context, args);
	};
};
</script>

<style scoped>
#logout {
    cursor: pointer !important;
}
</style>


