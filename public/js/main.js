$(document).ready(function() {

  $('.gameSlider').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    centerMode: true,
    variableWidth: true,
      responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      ]
  });
        

  let $grid = $('.grid').imagesLoaded(function(){
    $grid.masonry({
      itemSelector: '.portfolio-item',
      columnWidth: 300,
      isAnimated: csstransitions,
      easing: 'linear' 
    });
  });


});  