$(window).on('load', function () {
    if ($("div").is(".gt-img-holder-abs")) {
        $(".gt-img-holder-abs").each(function () {
            self.imgHolderFunc($(this));
        });
    }
});