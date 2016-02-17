var funDb = new Firebase("https://fundex.firebaseio.com");
var funAmounts = {};




function getHeaders(){
  var numWeeks = moment().week(),
    headers = [];
  for(var i=1; i <= numWeeks;i++){
    headers.push(i);
  }
  return headers;
}
funDb.child("funAmounts").on("value", function(snapshot) {
  funAmounts = snapshot.val();


  var headers = getHeaders();
  var rows = [];
  for(var userKey in funAmounts){
    var scores = funAmounts[userKey];;
    var weekScores =  headers.map(function(weekNum){
      if(scores[weekNum]){
        return scores[weekNum];
      }
      return null;
    });

    var obj = {
      name: userKey,
      scores: weekScores
    };
    rows.push(obj);
  }

  console.log(headers);
  console.log(rows);

  var source   = $("#table").html();
  var template = Handlebars.compile(source);
  var templateData = {
    rows: rows,
    headers: headers
  };
  var compiledHtml = template(templateData);
  $('#data').html(compiledHtml);



$('input', '#data').on('blur',function(evt){
  var $input = $(evt.currentTarget);
  var data = $input.data();
  var value = parseInt($input.val());

  if(value > -1 && value < 11){
    updateWeek(data.user, data.week, value);  
  }
});

});


function updateWeek(user, week, value){
  var newObj = {};
  newObj[week] = value;
  funDb.child("funAmounts/" + user).update(newObj);
}

