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
		  	 $('.projects-list').append('<li><a href="#">'+msg[i].name+'</a></li>');
		  };			  
		});
	}

});
