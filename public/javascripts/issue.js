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

		var issue_id 		= $('#id').val();
		var request_path 	= window.location.origin + "/issues/" + issue_id;
		var issue_title		= $('#titleEdit').val();

		$.ajax({
		  url: request_path,
		  type: "PUT",		  
		  accepts: "application/json",
		  data: {
		      title: issue_title
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

		var issue_id 		= $('#id').val();
		var request_path 	= window.location.origin + "/issues/" + issue_id;
		var issue_content	= $('#contentEdit').val();

		$.ajax({
		  url: request_path,
		  type: "PUT",		  
		  accepts: "application/json",
		  data: {
		      content: issue_content
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

		var issue_id 		= $('#id').val();
		var request_path 	= window.location.origin + '/issues/' + issue_id + '/comments'

		$.ajax({
		  url: request_path,
		  type: "GET",		  
		  accepts: "application/json",
		  data: {
		      issue_id: issue_id
		  },		  
		  cache: false
		}).done(function(data) {
		  comments = data.comments;
		  for (var i = 0; i < comments.length ; i++) {
		  	 var content = comments[i].content;
		  	 var created = comments[i].created;
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

		var issue_id 		= $('#id').val();
		var request_path 	= window.location.origin + '/issues/' + issue_id + '/comments'
		var comment_content	= $('#newCommentContent').val();

		$.ajax({
		  url: request_path,
		  type: "POST",		  
		  accepts: "application/json",
		  data: {
		      content: comment_content
		  },		  
		  cache: false
		}).done(function(msg) {
		  $('#comments').empty();
		  getIssueComments();
		  $('#addComment').show();		  
		});
	}

	getIssueComments();

	$('#status-active').on('click',showStatuses);

	function showStatuses(){		
		var currentWeight = $(this).find('.status-weight').val();
		$('.status').each(function(){
			if ($(this).find('.status-weight').val() != currentWeight)
				$(this).show();
		});
	}

	//$('.statuses').mouseleave(hideStatuses);
	$('*').on('click', hideStatuses);

	function hideStatuses(){
		if ($('#status-active').is(':hover')) {
    	    return;
	    }		
		$('.status').each(function(){
			$(this).hide();
		});
	}

	$('body').on('click', '.status', function(){
		console.log('send ajax post req');

		var weight = $(this).find('.status-weight').val();
		var name = $(this).find('.status-name').val();
		var labelClass = '';
		var elClasses = $(this).attr('class').split(' ');

		for (var i=0;i<elClasses.length;i++){		  	
		  	if (elClasses[i].indexOf('label-') > -1){
		  		labelClass = elClasses[i];
		  	}
		}	

		$.ajax({
		  url: "/changeIssueStatus",
		  type: "POST",		  
		  accepts: "application/json",
		  data: {
		      id: $('#id').val(),
		      name: name,
		      weight: weight		      
		  },		  
		  cache: false
		}).done(function(msg) {
		  console.log('response from serv'+msg);	
		  var classes = $('#status-active').attr('class').split(' ');		  
		  for (var i=0;i<classes.length;i++){		  	
		  	if (classes[i].indexOf('label-') > -1){
		  		$('#status-active').removeClass(classes[i]);
		  	}
		  }		  
		  $('#status-active').text(name);
		  $('#status-active').addClass(labelClass);
		  $('#status-active').find('.status-weight').val(weight);		  
		  $('#status-active').append('<input type="hidden" class="status-weight" value="'+weight+'"/>');
		});
	});

});