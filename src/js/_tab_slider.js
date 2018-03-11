this.tabSlider = function () {
    var tabSliders = $(".gt-tabs");
    tabSliders.each(function () {
        var currTabs = $(this);
        currTabs.find(".gt-tabs-button").each(function () {
            $(this).on("click", function () {
                self.tabSliderAction(currTabs, $(this).index());
            });
        });
        self.tabSliderAction(currTabs,0,true);
    });
};

this.tabSliderAction = function (el, num ,init) {
    var buttons = $(el.find(".gt-tabs-button")),
        main =  $(el.find(".gt-tabs-main"))
    el.find('.gt-inner-scroll-tab').each(function () {
        $('#' + $(this).attr('data-scroll')).hide();
    });
    buttons.removeClass("active");
    main.removeClass("active");
    $(buttons[num]).addClass("active");
    $(main[num]).addClass("active");

    if($('#' + $(main[num]).find('.gt-inner-scroll-tab').attr('data-scroll')).find('.gt-scroll-cursor').height() != 0 || init){
        $('#' + $(main[num]).find('.gt-inner-scroll-tab').attr('data-scroll')).show();
    }
};

if ($("div").is(".gt-tabs")) {
    self.tabSlider();
}