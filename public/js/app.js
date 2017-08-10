$(()=>{



  // show playlist page toggle
$('.song-title').on('click', playlist.toggleSongs);


// show playlist object
var playlist = {
  toggleSongs: function(){
    $(this).siblings().toggle("slow");
}








})