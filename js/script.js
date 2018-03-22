// $('#navbar-content li a').click(function(){
//     $('#navbar-content li a').removeClass('active');
//    	$(this).addClass('active');
// });

// $(function() {
// 	$('#navbar-content li a').removeClass('active');
// 	alert(location.pathname);
//  $('#navbar-content li a[href^="#' + location.pathname.split("#")[1] + '"]').addClass('active');
// });
function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('#navbar-content li a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        // console.log(refElement);
        if (refElement.position().top <= scrollPos+2 && refElement.position().top + refElement.height() > scrollPos+2) {
            $('#navbar-content li a').removeClass("active");
            currLink.addClass("active");
        }
        else{
            currLink.removeClass("active");
        }
    });
}
$(document).ready(function () {
	$(document).on("scroll", onScroll);
	//smooth scroll
	$('#navbar-content li a[href^="#"]').on('click', function (e) {
	    e.preventDefault();
	    $(document).off("scroll");
	    
	    $('a').each(function () {
	        $(this).removeClass('active');
	    })
	    $(this).addClass('active');
	  
	    var target = this.hash,
	        menu = target;
	    $target = $(target);
	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 1000, function () {
	        window.location.hash = target;
	        $(document).on("scroll", onScroll);
	    });
	});

	// $('#navbar-content li a').click(function(){
	//     $('#navbar-content li a').removeClass('active');
	//     console.log('set '+$(this)+' to active');
	//    	$(this).addClass('active');
	// });
});

