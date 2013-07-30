$(document).ready(function() {
	
	$('body').on('click', '#title', function(){
		editTile(this);
	}); 


	//bind event to dynamicly added element
	$('body').on('click', '#titleEditSave', function(){
		console.log('send ajax post req');

		$.ajax({
		  url: "/editIssueTitle",
		  type: "POST",		  
		  accepts: "application/json",
		  data: {
		      id: $('#id').val(),
		      title: $('#titleEdit').val()		      
		  },		  
		  cache: false
		}).done(function(msg) {
		  console.log('response from serv'+msg);	
		  var updatedContent = $('#titleEdit').val();
		  $('#titleInEdit').empty();
		  $('#titleInEdit').text(updatedContent);
		  $('#titleInEdit').attr('id','title');		  	
		});
	});

	function editTile(el){
		$(el).unbind();
		console.log('title edit');
		var content = $(el).text();
		console.log(content);
		$(el).text('');
		$(el).attr('id','titleInEdit');
		$(el).append('<input id="titleEdit" value="'+content+'"></input>');
		$(el).append('<input type="button" id="titleEditSave" class="inPlaceEditButton" value="save"></input>');
	}

});