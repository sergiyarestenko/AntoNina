/*
   *all sliders create funs
   * params
   * count (num)  from 1 to 4 - how mach img on slider screen
   * arrow (bull) arrow left and right
   * dots (bull) dots link
   * */
this.createSliders = function () {
    var gtSliders = $(".gt-slider");
    gtSliders.each(function () {
        var currSlider = $(this),
            currPosition = 0,
            arrow = false,
            dots = false,
            numPanel = false,
            screenConst,
            inner = currSlider.find(".gt-slider-inner"),
            innerCount = inner.length,
            baseWidth,
            baseHeight;
        if (currSlider.hasClass("gt-slider-has-arrow")) {
            arrow = true;
            if (currSlider.hasClass("gt-slider-num")) {
                numPanel = true;
            }
            currSlider.append('<div class="gt-slider-arrow-holder"></div>');
        }
        if (currSlider.hasClass("gt-slider-has-dots")) {
            dots = true;
            currSlider.append('<div class="gt-slider-nav"></div>');
        }


        function findScreenConst() {
            screenConst = 1;
            if (currSlider.attr("data-count")) {
                screenConst = parseInt(currSlider.attr("data-count"));
                if ($(token768).is(":visible")) screenConst = 3;
                if ($(token667).is(":visible")) screenConst = 2;
                if ($(token360).is(":visible")) screenConst = 1;
            }
        }

        function setBaseWidth() {
            if (arrow) destroyArrow();
            baseWidth = currSlider.outerWidth() / screenConst;
            currSlider
                .find(".gt-slider-container")
                .outerWidth((innerCount + 1) * baseWidth);
            inner.each(function () {
                $(this).outerWidth(baseWidth);
            });

            if (innerCount > screenConst) {
                if (arrow) createArrows();
                if (dots) createDots();
            }
            setBaseHeigth();
        }

        function setBaseHeigth() {
            baseHeight = currSlider.outerHeight();
            currSlider.find('.gt-img-holder').outerHeight(baseHeight);
            // currSlider.find('.gt-img-holder-abs').outerHeight(baseHeight);??????????????????????????

        }

        findScreenConst();
        setBaseWidth();
        createTouch();

        function createArrows() {
            var numInner = '';
            if (numPanel) {
                numInner = '<div class="gt-slider-arrow-num"><i class="gt-slider-num-curr">1</i> <i>из</i> <i class="gt-slider-num-max">10</i> </div>'
            }

            currSlider
                .find(".gt-slider-arrow-holder")
                .html(
                    '<span class = "gt-slider-arrow left">' +
                    '<i class="fa fa-angle-left fa-2x"></i>' +
                    "</span>" +
                    numInner +
                    '<span class = "gt-slider-arrow right">' +
                    '<i class="fa fa-angle-right fa-2x"></i>' +
                    "</span>"
                );
            currSlider
                .find(".left")
                .off()
                .on("click", function () {
                    oneMoveFunction(false);
                });
            currSlider
                .find(".right")
                .off()
                .on("click", function () {
                    oneMoveFunction(true);
                });
            checkPosition();
            if (numPanel) showNum()
        }

        function destroyArrow() {
            currSlider.find(".gt-slider-arrow-holder").html("");
        }

        function createDots() {
            var nav = currSlider.find(".gt-slider-nav"),
                spans = "";
            for (var i = 0; i < innerCount; i++) {
                spans += "<span data-num = " + i + "></span>";
            }
            nav.html(spans);

            nav
                .find("span")
                .first()
                .addClass("gt-active");
            currSlider
                .find(".gt-slider-nav span")
                .off()
                .on("click", function () {
                    oneMoveFunction(true, +$(this).attr("data-num"));
                });
        }

        function createTouch() {
            var initialPoint = 0,
                finalPoint = 0;
            currSlider.on("touchstart", function (event) {
                var e = event.originalEvent;
                initialPoint = Math.abs(e.touches[0].pageX);
            });
            currSlider.on("touchend", function (event) {
                var e = event.originalEvent;
                finalPoint = Math.abs(e.changedTouches[0].pageX);
                if (Math.abs(initialPoint - finalPoint) > 50) {
                    if (initialPoint > finalPoint) {
                        oneMoveFunction(false);
                    } else {
                        oneMoveFunction(true);
                    }
                }
            });
        }

        if (currSlider.find(".gt-slider-open-clone")) createCloneListeners();

        function createCloneListeners() {
            var cloneListeners = currSlider.find(".gt-slider-open-clone");
            cloneListeners.each(function () {
                $(this).on("click", function () {
                    // console.log('cloneListeners', $(this).parent().index())
                    self.createCloneSlider(
                        currSlider,
                        $(this)
                            .parent()
                            .index()
                    );
                });
            });
        }

        function checkPosition() {
            var left = currSlider.find(".left"),
                right = currSlider.find(".right");
            right.removeClass("not-active");
            left.removeClass("not-active");
            if (currPosition == 0) left.addClass("not-active");
            if (
                currPosition == innerCount - 1 ||
                currPosition == innerCount - screenConst
            )
                right.addClass("not-active");
        }

        function oneMoveFunction(bul, num) {
            // console.log(arrow);
            if (num || num === 0) {
                currPosition = num;
            } else if (bul) {
                currPosition += 1;
            } else {
                currPosition -= 1;
            }
            if (currPosition > innerCount - screenConst) {
                currPosition = innerCount - screenConst;
                self.sliderEndLeft(currSlider);
                return;
            }
            if (currPosition < 0) {
                currPosition = 0;
                self.sliderEndRight(currSlider);
                return;
            }
            self.sliderMove(currSlider, baseWidth, currPosition);


            if (arrow) checkPosition();
            if (numPanel) showNum();
        }

        function showNum() {
            currSlider.find('.gt-slider-num-curr').text(currPosition + 1);
            currSlider.find('.gt-slider-num-max').text(innerCount);
        }


        $(window).resize(function () {
            findScreenConst();
            setBaseWidth();
            if (currPosition > innerCount - screenConst)
                currPosition = innerCount - screenConst;
            if (innerCount <= screenConst) currPosition = 0;
            self.sliderMove(currSlider, baseWidth, currPosition);
        });
    });
};

this.createCloneSlider = function (el, num) {
    if ($("div").is("#gt-clone-close")) return;
    self.fixBody();
    var currPosition = num;
    $("#gt-body-wrapper")
        .show()
        .append(
            "" +
            '<div id = "gt-clone" class="gt-slider-clone">' +
            '<div id = "gt-clone-close" class = "gt-slider-clone-close">' +
            "</div>" +
            '<div class="container">' +
            '<div id = "gt-clone-inner" class = "gt-slider-clone-inner">' +
            '<div id = "gt-clone-container" class = "gt-slider-container gt-slider-clone-container"></div>' +
            "</div>" +
            "</div>" +
            "</div>"
        );
    var currSlider = $("#gt-clone-inner"),
        inners = el.find(".gt-slider-inner").clone(true),
        innersLenght = inners.length;
    inners.each(function () {
        $(this)
            .removeClass("gt-slider-inner")
            .addClass("gt-clone-slider-inner");
        $(this)
            .find(".gt-slider-inner-cover")
            .remove();
        $("#gt-clone-container").append($(this));
    });
    if (innersLenght > 1) {
        $("#gt-clone .container").append(
            '<span class = "gt-slider-arrow left" id = "gt-clone-arrow-left">' +
            '<i class="fa fa-angle-left fa-2x"></i>' +
            "</span>" +
            '<span class = "gt-slider-arrow right" id = "gt-clone-arrow-right">' +
            '<i class="fa fa-angle-right fa-2x"></i>' +
            "</span>"
        );
        $("#gt-clone-arrow-left").on("click", moveCloneSliderLeft);
        $("#gt-clone-arrow-right").on("click", moveCloneSliderRight);
    }

    var container = currSlider.find("#gt-clone-container"),
        // inners = container.find('.gt-clone-slider-inner'),
        innerLength = inners.length,
        baseWidth = currSlider.outerWidth();

    inners.each(function () {
        $(this).outerWidth(baseWidth);
    });
    container.outerWidth(baseWidth * (innerLength + 1));
    container.css("margin-left", baseWidth * -1 * currPosition + "px");
    setTimeout(addAnimation);

    function addAnimation() {
        container.addClass("gt-animated");
    }

    checkPosition();
    var initialPoint = 0,
        finalPoint = 0;
    currSlider.on("touchstart", function (event) {
        var e = event.originalEvent;
        initialPoint = Math.abs(e.touches[0].pageX);
    });
    currSlider.on("touchend", function (event) {
        var e = event.originalEvent;
        finalPoint = Math.abs(e.changedTouches[0].pageX);
        if (Math.abs(initialPoint - finalPoint) > 50) {
            if (initialPoint > finalPoint) {
                moveCloneSliderLeft();
            } else {
                moveCloneSliderRight();
            }
        }
    });

    $("#gt-clone-close").on("click", function () {
        self.destroyCloneSlider();
    });

    function moveCloneSliderRight() {
        currPosition += 1;
        if (currPosition > innerLength - 1) {
            currPosition = innerLength - 1;
            self.sliderEndRight(currSlider);
            return;
        }
        self.sliderMove(currSlider, baseWidth, currPosition);
        checkPosition();
    }

    function moveCloneSliderLeft() {
        currPosition -= 1;
        if (currPosition < 0) {
            currPosition = 0;
            self.sliderEndLeft(currSlider);
            return;
        }
        self.sliderMove(currSlider, baseWidth, currPosition);
        checkPosition();
    }

    function checkPosition() {
        if (!$("#gt-clone-arrow-left")) return;
        var left = $("#gt-clone-arrow-left"),
            right = $("#gt-clone-arrow-right");
        right.removeClass("not-active");
        left.removeClass("not-active");
        if (currPosition == 0) left.addClass("not-active");
        if (currPosition == innerLength - 1) right.addClass("not-active");
    }
};

this.destroyCloneSlider = function () {
    $("#gt-clone-arrow-right").off();
    $("#gt-clone-arrow-left").off();
    $("#gt-clone-close").off();
    $("#gt-clone-inner").off();
    $("#gt-clone").remove();
    $("#gt-body-wrapper").hide();
    self.unfixBody();
};


this.sliderEndLeft = function (el) {
    console.log("left_end");
};

this.sliderEndRight = function (el) {
    console.log("right_end");
};

this.sliderMove = function (el, width, position) {
    if (el.find(".gt-slider-nav")) {
        var dots = el.find(".gt-slider-nav span");
        dots.removeClass("gt-active");
        $(dots[position]).addClass("gt-active");
    }
    el
        .find(".gt-slider-container")
        .css("margin-left", width * -1 * position + "px");
};




this.numberCollectionArticle = function (el) {
    el.find(".gt-collection-link-wrapper").each(function () {
        $(this).find('.gt-collection-link-slider-wrapper').after('<div class = "gt-collection-link-number"><span>' + ($(this).index() + 1) + '</span></div>')
        // console.log($(this));
    });
};



if ($("div").is(".gt-collection-wrapper-num")) {
    $(".gt-collection-wrapper-num").each(function () {
        self.numberCollectionArticle($(this));
    });
}

if ($("div").is(".gt-slider")) {
    self.createSliders();
}
