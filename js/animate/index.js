$(document).ready(function(){
	$(".op").on('click',function(){
		var elem=$(this).parent();
		if (elem.hasClass('open')){
			elem.removeClass('open');
		}
		else{
			elem.addClass('open');
			
		}
	})

    $(".add-contact").on("click",function() {
    //открыть модальное окно с id="myModal"
    $("#myModalBox").modal('show');
  });
  
});