document.addEventListener ("DOMContentLoaded", function(event) {
  
  console.log( "ready!" );

  /* EcmaScript 6 */
  var grid = new Muuri('.grid', {
    layout: {
      rounding: false
    }
  });

  window.addEventListener('load', () => {
    
    grid.refreshItems().layout();
    document.getElementById('grid').classList.add('active-items');
    const links = document.querySelectorAll('#navbar-bar-categories .sidebar-dropdown .sidebar-submenu ul li a');

    links.forEach ( (e) => {

      e.addEventListener('click', (e) => {

        e.preventDefault();

        links.forEach((link) => {

          link.classList.remove('active');

        });
      
        function get_all_categories() {

          var main_link = document.getElementById('all-snip');
          var links_categories = document.getElementsByClassName("list-item");
          
          main_link.addEventListener('click', (e) => {

            e.preventDefault();
            main_link = e.target.innerHTML.toLowerCase();
            main_link === 'all snippets' ? links.forEach((link) => link.classList.remove('active')) : '';
            grid.filter('[data-category]');
      
          });
      
        };    
        get_all_categories();
        
        e.target.classList.add('active');
        let category = e.target.innerHTML.toLowerCase();
        grid.filter(`[data-category='${category}']`);
        
      });

    });
    
    document.querySelector('#search-bar').addEventListener('input', (e) => {

      const search = e.target.value;

      grid.filter( (item) => item.getElement().dataset.label.includes(search) );

    });
    
  });

  if ( window.addEventListener ) window.addEventListener( 'DOMMouseScroll', wheel, false );
  window.onmousewheel = document.onmousewheel = wheel;

  function wheel( event ) {

    var delta = 0;
    if (event.wheelDelta) delta = event.wheelDelta / 120;
    else if (event.detail) delta = -event.detail / 3;

    handle(delta);
    if (event.preventDefault) event.preventDefault();
    event.returnValue = false;
    
  }

  function handle( delta ) {

    var time 	= 1000;
    var distance 	= 400;

    $('html, body').stop().animate({

      scrollTop: $(window).scrollTop() - (distance * delta)
      
    }, time );
    
  }

  jQuery(function ($) {
    
    $(".sidebar-dropdown > a").click(function() {
      
      $(".sidebar-submenu").slideUp(200);
      
      if ( $(this).parent().hasClass("active")) {
        
        $(".sidebar-dropdown").removeClass("active");
        $(this).parent().removeClass("active");
        
      } else {

        $(".sidebar-dropdown").removeClass("active");
        $(this).next(".sidebar-submenu").slideDown(200);
        $(this).parent().addClass("active");
        
      }

    });

    $("#close-sidebar").click(function() {
      
      $(".page-wrapper").removeClass("toggled");

    });

    $("#show-sidebar").click(function() {
      
      $(".page-wrapper").addClass("toggled");
    
    });

  });

  $("img").each(function() {
    
    $(this).attr("data-src",$(this).attr("src"));
    $(this).removeAttr("src");
    console.log($(this)[0].outerHTML);
  });
  function addLazyLoad() {
    var lazyLoad = document.querySelectorAll("img");
    for (var i = 0; i < lazyLoad.length; i++)
      lazyLoad[i].className += " lazyload";
  
  }
  
  addLazyLoad();
  
  $(document).ready(function(){
    columnChart();
    
    function columnChart(){
        var item = $('.chart', '.column-chart').find('.item'),
        itemWidth = 100 / item.length;
        item.css('width', itemWidth + '%');
        
        $('.column-chart').find('.item-progress').each(function(){
            var itemProgress = $(this),
            itemProgressHeight = $(this).parent().height() * ($(this).data('percent') / 100);
            itemProgress.css('height', itemProgressHeight);
        });
    };
  });

});