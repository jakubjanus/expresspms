$(document).ready(function() {
	
	$('body').on('click', '#title', function(){
		editTile(this);
	}); 

	$('body').on('click', '#titleEditCancel', function(){		
		backFromTitleEdit();
	}); 

	$('body').on('click', '#content', function(){
		editContent(this);
	}); 

	$('body').on('click', '#contentEditCancel', function(){		
		backFromContentEdit();
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
		  backFromTitleEdit($('#titleEdit').val());		  	  	
		});
	});

	function backFromTitleEdit(content){		
		var orgTitle = $('#orgTitle').val();
		$('#titleInEdit').empty();
		$('#titleInEdit').text(content === undefined ? orgTitle : content);
		$('#titleInEdit').attr('id','title');	
	}

	function editTile(el){
		$(el).unbind();
		console.log('title edit');
		var content = $(el).text();
		console.log(content);
		$(el).text('');
		$(el).attr('id','titleInEdit');
		$(el).append('<input id="titleEdit" class="inPlaceEditInput" value="'+content+'" />');
		$(el).append('<input type="button" id="titleEditSave" class="inPlaceEditButton" value="save"/>');
		$(el).append('<input type="button" id="titleEditCancel" class="inPlaceEditButton" value="cancel" />');
		$(el).append('<input type="hidden" id="orgTitle" value="'+content+'"/>');
	}

	$('body').on('click', '#contentEditSave', function(){
		console.log('send ajax post req');

		$.ajax({
		  url: "/editIssueContent",
		  type: "POST",		  
		  accepts: "application/json",
		  data: {
		      id: $('#id').val(),
		      content: $('#contentEdit').val()		      
		  },		  
		  cache: false
		}).done(function(msg) {
		  console.log('response from serv'+msg);	
		  backFromContentEdit($('#contentEdit').val());		  	  	
		});
	});

	function backFromContentEdit(content){		
		var orgContent = $('#orgContent').val();
		$('#contentInEdit').empty();
		$('#contentInEdit').text(content === undefined ? orgContent : content);
		$('#contentInEdit').attr('id','content');	
	}

	function editContent(el){
		$(el).unbind();
		var elHeight = $(el).css('height');
		var height=parseInt(/([0-9]+)px$/.exec(elHeight)[1]) + 15;
		console.log('content edit');
		var content = $(el).text();
		console.log(content);
		$(el).text('');
		$(el).attr('id','contentInEdit');
		$(el).append('<textarea style="height:'+height+'px" rows="10" id="contentEdit" class="inPlaceEditInput">'+content+'</textarea>');
		$(el).append('<input type="button" id="contentEditSave" class="inPlaceEditButton" value="save"/>');
		$(el).append('<input type="button" id="contentEditCancel" class="inPlaceEditButton" value="cancel" />');
		$(el).append('<input type="hidden" id="orgContent" value="'+content+'"/>');
	}

	

});