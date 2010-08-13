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

