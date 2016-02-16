var funDb = new Firebase("https://fundex.firebaseio.com");
var funAmounts = {};

funDb.child("funAmounts").on("value", function(snapshot) {
  funAmounts = snapshot.val();
});