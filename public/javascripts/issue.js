$(document).ready(function() {
	
	$('body').on('click', '#title .edit-icon', function(){
		var title = $(this).parent();
		$(this).remove();
		editTile(title);				
	}); 

	$('body').on('click', '#titleEditCancel', function(){				
		backFromTitleEdit();
	}); 

	$('body').on('click', '#content .edit-icon', function(){
		var content = $(this).parent();
		$(this).remove();
		editContent(content);				
	}); 

	$('body').on('click', '#contentEditCancel', function(){		
		backFromContentEdit();
	});

	$('body').on('click', '#addComment', function(){		
		newCommentEl();
	});	

	$('body').on('click', '#newCommentSave', function(){		
		addNewComment();
	});		

	$('body').on('click', '#newCommentCancel', function(){		
		$('#addComment').show();
		$('#newCommentForm').remove();
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
		  $('#title .edit-icon').show();	  	
		  repositionEditIcons();  	
		});
	});

	function backFromTitleEdit(content){		
		var orgTitle = $('#orgTitle').val();
		$('#titleInEdit').empty();
		$('#titleInEdit').text(content === undefined ? orgTitle : content);
		$('#titleInEdit').attr('id','title');	
		$('#title .edit-icon').show();
		repositionEditIcons();
	}

	function editTile(el){
		$(el).unbind();
		console.log('title edit');
		var content = $(el).text();
		console.log(content);
		$(el).text('');
		$(el).attr('id','titleInEdit');
		$(el).append('<input id="titleEdit" class="inPlaceEditInput form-control" value="'+content+'" />');
		$(el).append('<input type="button" id="titleEditSave" class="inPlaceEditButton btn btn-primary" value="save"/>');
		$(el).append('<input type="button" id="titleEditCancel" class="inPlaceEditButton btn btn-default" value="cancel" />');
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
		  $('#content .edit-icon').show();  	  
		  repositionEditIcons();	
		});
	});

	function backFromContentEdit(content){		
		var orgContent = $('#orgContent').val();
		$('#contentInEdit').empty();
		$('#contentInEdit').text(content === undefined ? orgContent : content);
		$('#contentInEdit').attr('id','content');	
		$('#content .edit-icon').show();  
		repositionEditIcons();	  	
	}

	function editContent(el){
		console.log(el);
		$(el).unbind();
		var elHeight = $(el).css('height');
		var height=parseInt(/([0-9]+)px$/.exec(elHeight)[1]) + 45;
		console.log('content edit');
		var content = $(el).text();
		console.log(content);
		$(el).text('');
		$(el).attr('id','contentInEdit');
		$(el).append('<textarea style="height:'+height+'px" rows="10" id="contentEdit" class="inPlaceEditInput form-control">'+content+'</textarea>');
		$(el).append('<input type="button" id="contentEditSave" class="inPlaceEditButton btn btn-primary" value="save"/>');
		$(el).append('<input type="button" id="contentEditCancel" class="inPlaceEditButton btn btn-default" value="cancel" />');
		$(el).append('<input type="hidden" id="orgContent" value="'+content+'"/>');
	}

	function getIssueComments(){
		console.log('send ajax post req');

		$.ajax({
		  url: "/getIssueComments",
		  type: "POST",		  
		  accepts: "application/json",
		  data: {
		      issue_id: $('#id').val()
		  },		  
		  cache: false
		}).done(function(msg) {
		  
		  for (var i = 0; i < msg.length ; i++) {
		  	 var content = msg[i].content;
		  	 var created = msg[i].created;
		  	 $('#comments').append('<p class="commentMeta">'+created+'</p>');
		  	 $('#comments').append('<p class="comment">'+content+'</p>');
		  };			  
		});
	};

	function newCommentEl(){		
		$('#comments').append('<div id="newCommentForm"/>');
		var el=$('#newCommentForm');
		$(el).append('<textarea rows="5" id="newCommentContent" class="inPlaceEditInput form-control"></textarea>');
		$(el).append('<input type="button" id="newCommentSave" class="inPlaceEditButton btn btn-primary" value="save"/>&nbsp;');
		$(el).append('<input type="button" id="newCommentCancel" class="inPlaceEditButton btn btn-default" value="cancel" />');		
		$('#addComment').hide();
	}

	function addNewComment(){
		console.log('send ajax post req');

		$.ajax({
		  url: "/addComment",
		  type: "POST",		  
		  accepts: "application/json",
		  data: {
		      issue_id: $('#id').val(),
		      comment_content: $('#newCommentContent').val()
		  },		  
		  cache: false
		}).done(function(msg) {
		  $('#comments').empty();
		  getIssueComments();
		  $('#addComment').show();		  
		});
	}

	getIssueComments();

});