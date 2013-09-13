$(document).ready(function() {
	console.log("listissuejs");
	$('body').on('click', '.issue-list-item button.remove-issue', function(){
		var issueThumbnail = $(this).parents('.issue-list-item');

		deleteIssue(issueThumbnail);			
	});

	function deleteIssue(el){
		var issue_id = el.attr("data-issue-id");
		var request_path = window.location.origin + "/issues/" + issue_id;
		var issue_title = $(el.find(".issue-title")).text();

		if (confirm("Are you sure you want to delete '" + issue_title + "' issue?")){
			$.ajax({
				url: request_path,
				type: "DELETE",
				accepts: "application/json",
				cache: false
			}).done(function(data){
				if (data.status == "deleted"){
					el.remove();
				}else{
					// TODO handle unsuccessful removing
					console.log("Something went wrong...")
				};
			});
		}
	}
});