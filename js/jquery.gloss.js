(function($){

$.fn.gloss = function(options){
  var opts = $.extend({}, $.fn.gloss.defaults, options);

  return this.each (function(){

    
  })

  function save = function(){
    localStorage.saved = $(opts.lexiconSelector).html()
  }
  

}

})(jQuery)

$.fn.gloss.defaults = {
  lexiconSelector : '#lexicon';
}

