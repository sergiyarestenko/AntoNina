this.setPlayers = function () {
    var tag = document.createElement("script");
    tag.type = "text/javascript";
    tag.src = "https://www.youtube.com/player_api";
    var lastScriptTag = $("script")[$("script").length - 1];
    lastScriptTag.parentNode.insertBefore(tag, lastScriptTag);
    var gtVideos = $(".gt-video");
    gtVideos.each(function () {
        var currentPlayer = $(this);
        currentPlayer.find(".gt-video-switch").on("click", function () {
            $(this).addClass("gt-open");
            currentPlayer.addClass("gt-open");
            self.addYouTube(currentPlayer);
        });
    });
};

this.addYouTube = function (el) {
    var player,
        elId = "gt-video-" + el.index();

    el.find(".gt-video-switch").hide('slow');

    el
        .find(".gt-video-inner")
        .attr("id", elId)
        .addClass("gt-video-foreground");

    function onYouTubeIframeAPIReady() {
        player = new YT.Player(elId, {
            width: 600,
            height: 400,
            videoId: el.attr("data-youtube"),
            playerVars: {
                playlist: el.attr("data-youtube"),
                color: "white",
                loop: 1,
                autoplay: 1
                // disablekb: 0,
                // controls: 0
            },
            events: {
                onReady: initialize
            }
        });
    }

    onYouTubeIframeAPIReady();

    function initialize() {
        player.mute();
        player.playVideo();
        el.addClass("gt-video-on");
        el.find(".gt-video-uncover").on('click', playFullScreen);
        el.find(".gt-video-pause").on('click', function () {
            player.pauseVideo();
        });
        el.find(".gt-video-play").on("click", function () {
            player.playVideo();
        });
    }

    function playFullScreen() {
        console.log('playFullScreen');
        var iframe = el.find('iframe')[0];
        var requestFullScreen = iframe.requestFullScreen || iframe.mozRequestFullScreen || iframe.webkitRequestFullScreen;
        if (requestFullScreen) {
            requestFullScreen.bind(iframe)();
        }
    }

};
























if ($("div").is(".gt-video")) {
    self.setPlayers();
}