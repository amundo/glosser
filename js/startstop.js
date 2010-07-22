
  /* playback */
  $(document).keypress(function(e){
    var audio = $('audio').get(0);
    if(e.keyCode == 27) {  // ESCAPE
     if (audio.paused) 
       audio.play()
     else
       audio.pause()
    }
  })
