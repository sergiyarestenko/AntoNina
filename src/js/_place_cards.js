

this.createIconsItemsClick = function () {
    $(".gt-view-cards-icons-item").each(function () {
        if ($(this).hasClass("gt-view-cards-icons-visit")) {
            self.createVisitLink($(this));
            return;
        }
        if ($(this).hasClass("gt-view-cards-icons-bookmarks")) {
            self.createBookmarksLink($(this));
            return;
        }
        if (
            $(this).hasClass("gt-view-cards-icons-pin") ||
            $(this).hasClass("gt-view-cards-icons-share")
        ) {
            self.toggleGtActive($(this));
            return;
        }
        if ($(this).hasClass("gt-view-cards-icons-share")) {
            self.createShareLink($(this));
            return;
        }
    });
};

this.createShareLink = function (el) {
    el.removeClass("gt-active");
    el.on("click", function () {
        el.toggleClass("gt-active");
    });
};

this.toggleGtActive = function (el) {
    var el = $(el);
    el.removeClass("gt-active");
    el.on("click", function () {
        el.toggleClass("gt-active");
    });
};


this.createVisitLink = function (el) {
    if (!el.closest(".gt-view-cards-inner").attr("data-href")) return;
    el.on("click", function () {
        self.addVisitedLink(el);
    });
};


this.addVisitedLink = function (el) {
    alert(
        "послали данные на бек",
        el.closest(".gt-view-cards-inner").attr("data-href")
    );
    el.toggleClass("gt-active");
};


this.addBookmark = function (a, url, title) {
    try {
        window.external.AddFavorite(url, title);
    } catch (e) {
        try {
            window.sidebar.addPanel(title, url, "");
        } catch (e) {
            if (typeof opera == "object") {
                a.title = title;
                a.url = url;
                return true;
            } else {
                alert("Нажмите Ctrl-D чтобы добавить страницу в закладки");
            }
        }
    }
    return false;
};



this.createBookmarksLink = function (el) {
    var el = $(el);
    var parent = el.closest(".gt-view-cards-inner");
    parent = $(parent);
    if (!parent.attr("data-href"))
        parent.attr("data-href", window.location.href);
    if (!parent.attr("data-bookmark")) parent.attr("data-bookmark", "GoToTrip");
    el.attr("href", parent.attr("data-href"));
    el.attr("rel", "sidebar");
    el.on("click", function (e) {
        e.preventDefault();
        self.addBookmark(
            el,
            parent.attr("data-href"),
            parent.attr("data-bookmark")
        );
    });
};





if ($("*").is(".gt-view-cards-icons-bookmarks")) {
    self.createBookmarksLink();
}


if ($("*").is(".gt-view-cards-icons-item")) {
    self.createIconsItemsClick();
}