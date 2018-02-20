this.innerScroll = function (el) {
    if (el.find(".overview").height() > el.height()
    ) {
        el.addClass("isScrolled");
        el.tinyscrollbar({
            thumbSize: 40,
            wheelSpeed: 10
        });
    }

};



    if ($("div").is(".gt-inner-scroll")) {

        $('.gt-inner-scroll').each(function () {
            self.innerScroll($(this));
        })


    }
