(function($) {

$.fn.annotatevideo = function(options) {

    var opts = $.extend({}, $.fn.annotatevideo.defaults, options);
    return this.each(function() {
        
        if (!opts.elem){   
            opts.elem = opts.$link.attr('href',opts.uri).text(opts.uri).insertAfter(this);
        }

        function f(){

            if (this.currentTime < opts.start) return;

            if (this.currentTime >= opts.stop){
                if (f.stopped) return;
                f.stopped = true;
                f.started = false;
                 $(this).trigger('hide.annotate',{elem: opts.elem});
                return opts.elem.hide();
            }

            $(this).trigger('update.annotate',{time:this.currentTime});
           
            if (f.started) return;
            
            f.started = true;
            opts.elem.show();
            $(this).trigger('show.annotate',{elem: opts.elem, start: opts.start, stop : opts.stop});
        
        } // eo f()

        $(this).filter('audio,video')
            .bind('timeupdate',f)
            .bind('pause stop play',function(){    
                opts.elem.hide(); f.started = false; f.stopped=false;
        });
        
    }); // this.each
}; // $.fn.annotatevideo

  $.fn.annotatevideo.defaults = {
      start : 0,
      stop   : Infinity,
      $link  : $('<a>'),
      uri   : './',
      elem  : undefined
  };

})(jQuery);

  


function showspan(data){
    
    var spans = $('span.word:visible'),
        height= spans.height(),
        stops = spans.map(function(){
            return {left: $(this).position().left + $(this).width()/2, 
              top: $(this).position().top };
         }).get();

}

