if ($("div").is(".gt-inner-scroll")) {
    $('.gt-inner-scroll').each(function () {

        $(this).niceScroll({
            cursoropacitymin: '1',
            cursoropacitymax: '1',
            cursorwidth: '2px',
            cursorborder: 'none',
            mousescrollstep: '60',
            background: "#CECECE",
            railoffset: 'left',
            zindex: "auto",
            cursorcolor: "#CECECE"
        });
    })
}
