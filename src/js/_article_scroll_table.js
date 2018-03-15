this.fixArticleScrollTablePosition = function (currTable) {
    var table =currTable,
        tableParent = table.parent(),
        tableHeight = table.outerHeight(),
        tableParentTop = tableParent.position().top,
        tableParentBottom = tableParentTop + tableParent.outerHeight(),
        tableWidth = table.outerWidth(),
        windowTop = doc.scrollTop();



    if (tableParentTop + 90 > windowTop) {
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
        if (windowTop - tableParentBottom + tableHeight + 90 >= 0) {
            table.addClass("gt-fixed-bottom");
        } else {
            table.removeClass("gt-fixed-bottom");
        }
    }


};


this.createArticteScrollTable = function () {
    if (!$("div").is(".gt-article")) return;

    var articles = $(".gt-article"),
        table = $("#gt-article-scroll-table"),
        html = "";
    articles.each(function () {
        html += '<div class = "gt-article-scroll"   data-href= "' + $(this).attr("id") + '" ><div class = "gt-article-scroll-shadow"></div><p>' +
            $(this).find("h2").text() +
            "</p></div>";

    });
    table.html(html);
    table.find('.gt-article-scroll').each(function () {
        $(this).on('click', function () {

            self.scrollToArticle($(this).attr('data-href'));
        });
    });


};

this.scrollToArticle = function (attr) {
    $('html').animate({scrollTop: $('#' + attr).offset().top - 110}, 1100);

};


this.showArtidleShadow = function () {
    $(".gt-article").each(function () {
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
    $('.gt-article-table-wrapper').each(function () {
        var currTable = $(this);

        var shadow = false,
            scroll = true,
            scrollTimeout;
        if ($('div').is(".gt-article-scroll-table")) {
            shadow = true;
            self.createArticteScrollTable();
            self.showArtidleShadow();
        }


        function scrollThrottler() {

            if (!scroll) return;


            if (!scrollTimeout) {
                scrollTimeout = setTimeout(function () {
                    scrollTimeout = null;
                    self.fixArticleScrollTablePosition(currTable);
                    if (shadow) {
                        self.showArtidleShadow();
                    }

                });
            }
        }

        checkTableHeight();
        docWindow.scroll(scrollThrottler);
        docWindow.resize(function () {
            checkTableHeight();
            scrollThrottler()
        });

        function checkTableHeight() {

            if (currTable.outerHeight() > currTable.parent().outerHeight()) {
                scroll = false;
                currTable.css({'position': 'relative', 'right': '15px'});
            } else {
                scroll = true;
                currTable.css({'position': '', 'right': ''});
            }


        }
    })

}