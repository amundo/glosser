var CURRENT_PAGE_NUM = getCurrentPageNum();

function zeroPad(num, count) {
  var numZeropad = num + '';
  while(numZeropad.length < count) {
    numZeropad = "0" + numZeropad;
  }
  return numZeropad;
}

function getCurrentPageNum(){
  loc = document.location.href;
  page = loc.split('/').pop();
  stringNum = page.replace('page','').replace('.html','');
  return parseFloat(stringNum);
}

function turnToPage(num){
  var destinationPageNum = zeroPad(num, 2);
  var current = zeroPad(CURRENT_PAGE_NUM, 2);
  location.href = location.href.replace(current, destinationPageNum);
}

$(function(){

  $('#nav ul').append( '<li><button id="prevPage">previous</button></li>' );
  $('#nav ul').append( '<li><button id="nextPage">next</button></li>' );

  $('button#prevPage').click( function(){ turnToPage(CURRENT_PAGE_NUM - 1) } );
  $('button#nextPage').click( function(){ turnToPage(CURRENT_PAGE_NUM + 1) } );

  $('#nav ul li a').each(function(){
     var title = $(this).attr('title');
     linkPageNum = title.substring(title.length-2, title.length);

     if (linkPageNum == CURRENT_PAGE_NUM){
        $(this).addClass('current');
     }
  })

  /*$('#lines').load('vocab.html table');*/

  $('#before').keyup(function(){
    var before = $('#before').val();
    var after = transliterate(before);
    $('#after').val(after);

  })

  /*$("table tr:even").css('backgroundColor', 'gray');*/

})
