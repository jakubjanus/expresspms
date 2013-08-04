function repositionEditIcons(){
								 		 
	$('.edit').each(function(){
		if ($(this).find('.edit-icon').length == 0)
			$(this).append('<span class="edit-icon"></span>'); 		
	});
};

$(document).ready(function() {
	repositionEditIcons();
});