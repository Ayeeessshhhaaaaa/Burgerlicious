$(function(){
    setTimeout(function(){
      $('#preloader').fadeOut('fast', function() {
        $(this).remove();
      });
     }, 150);
});