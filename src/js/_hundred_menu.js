this.manageGtActiveUlMenu = function (el) {
    if (el.tagName != "li")
        el = $(el).closest("li");

    $(el).closest($("ul")).find("li").removeClass("gt-active");
    $(el).addClass("gt-active");
};


// if ($("*").is(".gt-hundret-menu")) {
//     $(".gt-hundret-menu").on("click", function (event) {
//         event.preventDefault();
//         self.manageGtActiveUlMenu(event.target);
//     });
// }


if ($("*").is(".gt-button-menu")) {
    $(".gt-button-menu").on("click", function (event) {
        event.preventDefault();
        self.manageGtActiveUlMenu(event.target);
    });
}

if ($("*").is(".gt-menu-news_items")) {
    $(".gt-menu-news_items").on("click", function (event) {
        event.preventDefault();
        self.manageGtActiveUlMenu(event.target);
    });
}


