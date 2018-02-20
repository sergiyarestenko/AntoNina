this.fixArticleScrollTablePosition = function () {


    var table = $(".gt-article-table-wrapper"),
        tableParent = table.parent(),
        tableParentTop = tableParent.position().top,
        tableParentBottom = tableParentTop + tableParent.outerHeight(),
        tableWidth = table.outerWidth(),
        windowTop = doc.scrollTop(),
        widowHeight = docWindow.outerHeight();


    if (tableParentTop > windowTop) {
        if (table.hasClass("gt-fixed")) {
            table.removeClass("gt-fixed");

            table.css({
                left: "",
                width: ""
            });
        }
    }

    if (tableParentTop < windowTop + 90) {
        if (!table.hasClass("gt-fixed")) {
            table.css({
                left: table.offset().left + "px",
                width: tableWidth
            });
            table.addClass("gt-fixed");


        }
        if (windowTop + widowHeight > tableParentBottom) {
            table.addClass("gt-fixed-bottom");
        } else {
            table.removeClass("gt-fixed-bottom");
        }
    }

    (function () {
        if (table.hasClass("gt-fixed")) {
            table.css({
                height: (widowHeight - 120) + 'px'
            });
        } else {
            table.css({
                height: ''
            });
        }
    })();
};



this.createArticteScrollTable = function () {
    if (!$("div").is(".gt-article")) return;
    var articles = $(".gt-article"),
        html = "";
    articles.each(function () {
        html +=
            '<div class = "gt-article-scroll"><div class = "gt-article-scroll-shadow"></div><p>' +
            $(this)
                .find("h2")
                .text() +
            "</p></div>";
    });
    $("#gt-article-scroll-table").html(html);
};

this.showArtidleShadow = function () {
    $(".gt-article").each(function () {
        // console.log($(this));
        var currPosition = $(this).position().top,
            elHeight = $(this).outerHeight(),
            windowPosition = $(document).scrollTop(),
            x = 0;
        if (currPosition > windowPosition) {
            x = 0;
        } else {
            x = (windowPosition - currPosition) / elHeight;
        }
        if (x > 1) x = 1;
        var currShadow = $(".gt-article-scroll")[$(this).index()];
        $(currShadow)
            .find(".gt-article-scroll-shadow")
            .css("width", x * 100 + "%");
    });
};


if ($('div').is('.gt-article-table-wrapper')) {
    var shadow = false,
        scrollTimeout;

    if ($('div').is(".gt-article-scroll-table")) {
        shadow = true;
        self.createArticteScrollTable();
        self.showArtidleShadow();
    }


    function scrollThrottler() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function () {
                scrollTimeout = null;
                self.fixArticleScrollTablePosition();
                if (shadow) {
                    self.showArtidleShadow();
                }

            }, 66);
        }
    }


    docWindow.scroll(scrollThrottler);
    docWindow.resize(scrollThrottler);


}