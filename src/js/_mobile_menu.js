this.mobileMenuClose = function () {
    self.unfixBody();
    mobileMenuSwitch.removeClass("gt-open");
    gtHeader.removeClass("gt-open");
};

this.mobileMenuOpen = function () {
    self.fixBody();
    gtHeader.addClass("gt-open");
    mobileMenuSwitch.addClass("gt-open");
};



mobileMenuSwitch.on("click", function () {
    if ($(this).hasClass("gt-open")) {
        self.mobileMenuClose();
    } else {
        self.mobileMenuOpen();
    }
});