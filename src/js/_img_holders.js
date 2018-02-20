this.setBackground = function () {
    var imgHolders = $(".gt-img-holder");
    imgHolders.each(function () {
        if (!$(this).attr("data-bg")) return;
        var path = $(this).attr("data-bg");
        if (token667.is(":visible")) {
            $(this).css(
                "background-image",
                'url("./img/backgrounds/phone/' + path + '")'
            );
            return;
        }
        if (token1024.is(":visible")) {
            $(this).css(
                "background-image",
                'url("./img/backgrounds/tablet/' + path + '")'
            );
            return;
        }
        $(this).css(
            "background-image",
            'url("./img/backgrounds/desktop/' + path + '")'
        );
    });
};


this.imgHolderFunc = function (el) {
    var holderConst = el.outerHeight() / el.outerWidth(),
        img = el.find('img'),
        imgConst = img.outerHeight() / img.outerWidth();

    if (imgConst > holderConst) {
        $(el).addClass("gt-width");
    }
    else {
        $(el).addClass("gt-height");
    }
    $(el).addClass("gt-visible");
};


if ($("div").is(".gt-img-holder")) {
    self.setBackground();
}