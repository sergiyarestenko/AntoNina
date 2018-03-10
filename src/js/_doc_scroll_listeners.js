this.pageUp = function () {
    $('html, body').animate({scrollTop: 0}, 800);
    return false;
};

this.upPageButton = function () {
    if ($(document).scrollTop() > 30) {
        upButton.addClass("gt-visible");
    } else {
        upButton.removeClass("gt-visible");
    }
};


upButton.on("click", self.pageUp);

docWindow.scroll(function () {
    self.upPageButton();//_up_button.js
    if ($(".gt-header-menu").is(":visible")) {
        self.deskTopMenuScroll();//_desctop_header_func.js
    }
});

