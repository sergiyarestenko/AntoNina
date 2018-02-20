this.cutNews = function (el) {
    var maxHeight = el.height(),
        links = el.find('a');

    for (var i = 0; i < links.length; i++) {
        if ($(links[i]).outerHeight(true) < maxHeight) {
            $(links[i]).addClass('gt-ready');
            maxHeight -= $(links[i]).outerHeight(true);
        } else {
            var cuttingLength = Math.floor(($(links[i]).text().length - 30) * maxHeight / $(links[i]).height());
            var cuttning = $(links[i]).text().substring(0, cuttingLength - 5);
            $(links[i]).text(cuttning + '...');
            $(links[i]).addClass('gt-ready');
        }
    }
};


this.cutReadMoreSlider = function () {
    var cuttings = $(".gt-read-more-slider-text-inner");
    cuttings.each(function () {
        self.cutting($(this), 160);
    });
};

this.cutting = function (el, num) {
    var newsText = el.text();
    if (newsText.length > num) {
        newsText = newsText.slice(0, num) + "...";
        el.text(newsText);
    }
};

if ($("div").is(".gt-news-cut")) {
    $(".gt-news-cut").each(function () {
        self.cutNews($(this));
    })
}

if ($("p").is(".gt-read-more-slider-text-inner")) {
    self.cutReadMoreSlider();
}