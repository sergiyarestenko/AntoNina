this.footerHeight = function () {
    var footerHeight = gtFooter.outerHeight();
    if (footerHeight > docWindow.height() - 50) {
        gtFooter.css("position", "static");
        gtWrapper.css("margin-bottom", "");
        upButton.css("position", "static");
    } else {
        gtFooter.css("position", "");
        upButton.css("position", "");
        gtWrapper.css("margin-bottom", gtFooter.outerHeight() + "px");
    }
};

