$(()=>{


let $grid = $('.grid').imagesLoaded(()=>{
	$grid.masonry({
	  itemSelector: '.grid-item',
	  columnWidth: '.grid-sizer',
	  percentPosition: true
	});
});








});