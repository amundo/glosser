/* jcaret */
/*
 *
 * Copyright (c) 2010 C. F., Wong (<a href="http://cloudgen.w0ng.hk">Cloudgen Examplet Store</a>)
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
(function($,len,createRange,duplicate){
  $.fn.caret=function(options,opt2){
    var start,end,t=this[0],browser=$.browser.msie;
    if(typeof options==="object" && typeof options.start==="number" && typeof options.end==="number") {
      start=options.start;
      end=options.end;
    } else if(typeof options==="number" && typeof opt2==="number"){
      start=options;
      end=opt2;
    } else if(typeof options==="string"){
      if((start=t.value.indexOf(options))>-1) end=start+options[len];
      else start=null;
    } else if(Object.prototype.toString.call(options)==="[object RegExp]"){
      var re=options.exec(t.value);
      if(re != null) {
        start=re.index;
        end=start+re[0][len];
      }
    }
    if(typeof start!="undefined"){
      if(browser){
        var selRange = this[0].createTextRange();
        selRange.collapse(true);
        selRange.moveStart('character', start);
        selRange.moveEnd('character', end-start);
        selRange.select();
      } else {
        this[0].selectionStart=start;
        this[0].selectionEnd=end;
      }
      this[0].focus();
      return this
    } else {
      // Modification as suggested by Андрей Юткин
           if(browser){
        var selection=document.selection;
                if (this[0].tagName.toLowerCase() != "textarea") {
                    var val = this.val(),
                    range = selection[createRange]()[duplicate]();
                    range.moveEnd("character", val[len]);
                    var s = (range.text == "" ? val[len]:val.lastIndexOf(range.text));
                    range = selection[createRange]()[duplicate]();
                    range.moveStart("character", -val[len]);
                    var e = range.text[len];
                } else {
                    var range = selection[createRange](),
                    stored_range = range[duplicate]();
                    stored_range.moveToElementText(this[0]);
                    stored_range.setEndPoint('EndToEnd', range);
                    var s = stored_range.text[len] - range.text[len],
                    e = s + range.text[len]
                }
      // End of Modification
            } else {
        var s=t.selectionStart,
          e=t.selectionEnd;
      }
      var te=t.value.substring(s,e);
      return {start:s,end:e,text:te,replace:function(st){
        return t.value.substring(0,s)+st+t.value.substring(e,t.value[len])
      }}
    }
  }
})(jQuery,"length","createRange","duplicate");
        
/* my stuff */
function convert(text, table) {
  for (letter in table) {
    letterRE = new RegExp(letter,'g');
    text = text.replace(letterRE, table[letter])
  }
  return text;
}

function transliterate(text, table){
  for (var i=0;i<table.length;i++) {
    var before = table[i][0];
    var after = table[i][1];
    beforeRE = new RegExp(before,'g');
    var text = text.replace(beforeRE, after);
  }
  return text;
}

function viewTable(table){
  var htmltable = ['<table id="rules"><tr><th>type:</th><th>get:</th></tr>'];
  $.each(table, function(i, [before, after]){
    htmltable.push("<tr><td class='inputKey'>"+before+"</td><td class='outputLetter'>"+after+"</td></tr>");
  })
  htmltable.push('</table>');
  return htmltable.join('\n');
}

function editLine(){
  $('#lines dt').live('click', function(){
    var after = $(this).html()
    var gloss = $(this).next().html();
    console.log(after, gloss);
    //$('#before').val($(this).attr('data-source'));
  })//.remove();
}


$(function(){

   $('body').prepend(viewTable(ug_table));
   editLine();

   $('input:first').focus();
   $('input#before').keyup(function(){
     saved = this.value;
     var scrollTop = this.scrollTop;
     converted = transliterate(saved, ug_table);
     $('#after').val(converted);
     this.scrollTop = scrollTop;
   });

});

