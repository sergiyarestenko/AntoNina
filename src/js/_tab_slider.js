
this.tabSlider = function () {
    var tabSliders = $(".gt-tabs");
    tabSliders.each(function () {
        var currTabs = $(this);
        currTabs.find(".gt-tabs-button").each(function () {
            $(this).on("click", function () {
                self.tabSliderAction(currTabs, $(this).index());
            });
        });
        self.tabSliderActivation(currTabs);
    });
};

this.tabSliderActivation = function (el) {
    $(el.find(".gt-tabs-button")).removeClass("active");
    $(el.find(".gt-tabs-main")).removeClass("active");
    $(el.find(".gt-tabs-main")).hide();
    $(el.find(".gt-tabs-button")[0]).addClass("active");
    $(el.find(".gt-tabs-main")[0]).show();
    $(el.find(".gt-tabs-main")[0]).addClass("active");
};

this.tabSliderAction = function (el, num) {
    $(el.find(".gt-tabs-button")).removeClass("active");
    $(el.find(".gt-tabs-main")).removeClass("active");
    $(el.find(".gt-tabs-main")).hide();
    $(el.find(".gt-tabs-button")[num]).addClass("active");
    $(el.find(".gt-tabs-main")[num]).show();
    $(el.find(".gt-tabs-main")[num]).addClass("active");
};





if ($("div").is(".gt-tabs")) {
    self.tabSlider();
}