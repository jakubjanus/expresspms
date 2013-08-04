$(document).ready(function() {
	
	$('body').on('click', '.switch-project', function(){
		fillProjectsSwitcher();
	});

	function fillProjectsSwitcher(){
		$('.projects-list').empty();

		//todo ograniczyć tylko do tego co potrzebne (nazwa,id) - nie pobierać całych projektów
		$.ajax({
		  url: "/getProjects",
		  type: "POST",		  
		  accepts: "application/json",		  	 
		  cache: false
		}).done(function(msg) {
		  
		  for (var i = 0; i < msg.length ; i++) {		  	 
		  	 $('.projects-list').append('<li><a href="#" id="'+msg[i]._id+'" class="project-in-menu">'+msg[i].name+'</a></li>');
		  };	

		  //dopasownie aby rozwijał treść na lewo - na razie nie znalazłem innego rozwiązania		  
		  var conentWidth=parseInt(/([0-9]+)px$/.exec($('.projects-list').css('width'))[1]);		 
		  var switcherWidth=parseInt(/([0-9]+)px$/.exec($('.switch-project').css('width'))[1]);

		  var moveAmountPX = conentWidth - switcherWidth;

		  $('.projects-list').css('left','-'+moveAmountPX+'px');

		});
	}	

	$('body').on('click', '.project-in-menu', function(){		
		var pId = $(this).attr('id');
		var pName = $(this).text();
		$('.switch-project').text(pName);
		$('.switch-project').append(' <span class="caret"></span>');

		$.ajax({
		  url: "/changeProject",
		  type: "POST",		  
		  accepts: "application/json",
		  data: {
		      project_id: pId		      
		  },		  
		  cache: false
		}).done(function(msg) {
		  console.log('response from serv'+msg);	
		  document.location.reload(true);		  
		});
	});

	$.ajax({
		  url: "/getProjectNameInSession",
		  type: "POST",		  
		  accepts: "application/json",		 
		  cache: false
		}).done(function(msg) {
		    console.log('response from serv'+msg);			  
		    $('.switch-project').text(msg.name);
		    $('.switch-project').append(' <span class="caret"></span>');
		}).fail(function() { 
			console.log('error while looking for project in session');
		});

});
