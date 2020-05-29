$("#baseDiv").click(function(e) {
  $("#popUpDiv").show();
});
$("#popupSelect").change(function(e) {
  $("#baseDiv").html($("#popupSelect").val() + ' clicked. Click again to change.');
  $("#popUpDiv").hide();
});

