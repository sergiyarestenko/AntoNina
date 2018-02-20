this.pageUp = function () {
    $("body,html").animate({scrollTop: 0},800);
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



