docWindow.resize(function () {
    self.deskTopMenuScroll();
    self.footerHeight();

    if (gtHeader.hasClass("gt-open")) self.mobileMenuClose();

    if ($("div").is(".gt-img-holder-abs")) {
        $(".gt-img-holder-abs").each(function () {
            $(this).removeClass("gt-width");
            $(this).removeClass("gt-height");
            self.imgHolderFunc($(this));
        });
    }
});