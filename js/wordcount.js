function depunctuate(text){
  return text;
}

function tokenize(text){
  var text = $.trim(text);
  return text.split(' ');
}

function count_words(words){
  var count = {};

  for(var i=0;i<words.length;i++){
    if(words[i] in count){
      count[words[i]] += 1;
    } else {
      count[words[i]] = 1;
    }
  }
  return count;
}

function render_count_table(table, targetSelector){
  $(targetSelector).html('');
  $('<thead><tr><th>count</th><th>word</th></tr></thead>').appendTo($(targetSelector))
  $.each(table, function(wd,fq){
    $('<tr><td>' + fq + '</td><td>' + wd + '</td></tr>').appendTo($(targetSelector))
  })
}

$(function(){


})
