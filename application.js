var funDb = new Firebase("https://fundex.firebaseio.com");
var funAmounts = {};
var $ = jQuery;

var currentWeek = moment().week();

var fbRef = funDb.child("funAmounts");
fbRef.on("value", function(snapshot) {
  funAmounts = snapshot.val();
  console.log(funAmounts)
  window.funAmounts = funAmounts;
  var html = '';
  html += '<thead>';
  html += '<th></th>';
  html += _.map(_.range(1, currentWeek + 1), function(weekNum) {
    return '<th>' + weekNum + '</th>';
  }).join('');
  html += '</thead><tbody>';
  html += _.map(funAmounts, function (record, name) {
    return (
      '<tr id="' + name + '">' +
      '<td>' + name + '</td>' +
      _.map(record, cellTemplate).join('') +
      _.map(_.range(record.length, currentWeek + 1), function(fauxIndex) {
        return fauxIndex < currentWeek
          ? '<td>-</td>'
          : '<td><input type="number" data-faux-index="' + fauxIndex + '" value="" style="width: 5em" /></td>'
      }).join('') +
      '</tr>' + "\n"
    );
  }).join('')
  html += '</tbody>';
  $('#view').html(html);
});

function cellTemplate (score, fauxIndex) {
  return fauxIndex <= 0 ? '' :
    fauxIndex < currentWeek
    ? '<td>' + (score || '-') + '</td>'
    : '<td><input type="number" data-faux-index="' + fauxIndex + '" value="' + (score || '') + '"  style="width: 5em" /></td>';
}

$('form').on('change', 'input', function (e) {
  save();
});

function save() {
  var newAmounts = {};
  jQuery('#view tbody tr').each(function () {
    var id = $(this).attr('id');
    var amounts = {};
    var lastWeek = 1;
    _.map(funAmounts[id], function (score, fauxIndex) {
      score = score ? score : 0;
      if (fauxIndex > 0) {
        amounts[fauxIndex] = score;
      }
      lastWeek = fauxIndex;
    });
    _.map(_.range(lastWeek, currentWeek), function (fauxIndex) {
      amounts[fauxIndex] = 0;
    });
    $('input', this).each(function () {
      var fauxIndex = $(this).data('faux-index') - 0;
      var score = $(this).val() - 0;
      amounts[fauxIndex] = score;
    });
    newAmounts[id] = amounts;
  });
  console.log('old', funAmounts);
  console.log('new', newAmounts);

  fbRef.update(newAmounts, function(error) {
    if (error) {
      console.error(error);
    }
    else {
      console.log('yay')
    }
  });
}


