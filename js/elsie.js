$(function(){

  $('input#line').focus();
  var media_url = $('audio:first source').attr('src');
  var media_id = media_url.split('/').pop();
  $('#media_id').val(media_id);

  /* prevent form redirect */
  $('form#editor').submit(function(){ return false });

  $.getJSON('all_lines.php', function(data){
    $('#lines').html('');
    $.each(data, function(i, line){
      $('<p><span class="timestamp">'  +  data[i]['stop_time'] + '</span>: ' +  data[i]['line'] + '</p>').prependTo($('#lines'));
    })
  })

/*
  // playback 
  $(document).keypress(function(e){
    var audio = $('audio').get(0);
    if(e.keyCode == 27) {  // ESCAPE
     if (audio.paused) 
       audio.play();
     } else {
       audio.pause();
    }
  })
*/
  
  $('input').keydown(function(e){

 //   var code = (e.keyCode ? e.keyCode : e.which);
  //  console.log(e.which);

    if(e.which == 13) {  // ENTER
      var stopTime = $('audio').get(0).currentTime;
      var startTime = stopTime - 2; // @TODO - fix
      var media_id = $('#media_id').val();
      $("<p/>", { 
        text: $('input#line').val() })
        .attr('data-start', startTime)
        .attr('data-stop', stopTime)
        .prependTo('#lines');

      $.post('save_line.php',
        {
          'line': $('input#line').val(), 
          'gloss': $('input#gloss').val(), 
          'note': $('textarea#note').val(), 
          'media_id': media_id, 
          'start': startTime,
          'stop': stopTime 
        }
      )

      $('input, textarea').val('');
      $('input#line').focus();
    }
  })

/*
  // choosing current audio 
  $('#files p a').click( function(){
    $('audio').replaceWith($('<audio/>', {'src':$(this).attr('href'), 'controls':'controls'}))  
    return false;
  })
  $('#files p a').click(
    function(){
      var href = $(this).attr('href'); 
      $('audio').get(0).load(href)
      return false;
    }
  )
*/

})


/*

(function($){
  $.fn.switchvid = function(options) {
  
    var defaults = {
      newURL: ''
    };
 
    var options = $.extend(defaults, options);

    $(this).pause();
    $(this).src = options.newURL;
    $(this).load();
  };
})(jQuery);


$(document).ready(function(){
  $('#element').switchvid();
});



*/
