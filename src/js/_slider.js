this.createSlider = function (currSlider, position) {
    var sliderTimeOut,
        screenConst = 1,
        baseWidth,
        arrowsReady = false,
        inner = currSlider.find(".gt-slider-inner"),
        container = currSlider.find(".gt-slider-container"),
        innerCount = inner.length,
        currPosition = position || 0,
        arrow = currSlider.hasClass("gt-slider-has-arrow"),
        dots = currSlider.hasClass("gt-slider-has-dots"),
        numPanel = currSlider.hasClass("gt-slider-num"),
        tram = currSlider.hasClass("gt-slider-tram"),
        tramAnimation = currSlider.attr('data-duration') || 300,
        fade = currSlider.hasClass("gt-slider-fade"),
        hasClone = currSlider.hasClass("gt-slider-has-clone");
    if (fade) {
        fadeSliderMove(position);
    }
    if (tram) {
        findScreenConst();
        setBaseWidth();
        tramSliderMove();
    }
    if (arrow) {
        currSlider.append('<div class="gt-slider-arrow-holder"></div>');
        createArrows();
    }
    if (dots) {
        createDots();
    }
    if (innerCount > screenConst) {
        createTouch();
    }
    if (hasClone) {
        createCloneListeners();
    }

    function createCloneListeners() {
        currSlider.find('.gt-slider-inner-cover').each(function () {
            $(this).on('click', function () {
                createCloneSlider($(this).parent().index())
            })
        })
    }

    function createArrows() {
        if (innerCount > screenConst) {
            var numInner = '';
            if (numPanel) {
                numInner = '<div class="gt-slider-arrow-num"><i class="gt-slider-num-curr"></i><i>из</i><i class="gt-slider-num-max"></i></div>'
            }
            currSlider.find(".gt-slider-arrow-holder").html(
                '<span class = "gt-slider-arrow left">' +
                "</span>" + numInner +
                '<span class = "gt-slider-arrow right">' +
                "</span>"
            );
            createArrowsListeners();
            showNum();
        }
        arrowsReady = true;
    }

    function destroyArrows(clone) {
        var el = clone || currSlider;
        el.find(".left").off();
        el.find(".right").off();
        el.find(".gt-slider-arrow-holder").html("");
        arrowsReady = false;
    }

    function createArrowsListeners() {
        currSlider.find(".left").on("click", function () {
            oneMoveFunction(false);
        });
        currSlider.find(".right").on("click", function () {
            oneMoveFunction(true);
        });
        if (numPanel) showNum()
    }

    function createDots() {
        currSlider.append('<div class="gt-slider-nav"></div>');
        var nav = currSlider.find(".gt-slider-nav"),
            spans = "";
        for (var i = 0; i < innerCount; i++) {
            spans += "<span data-num = " + i + "></span>";
        }
        nav.html(spans);
        nav.find("span").first().addClass("gt-active");
        currSlider.find(".gt-slider-nav span").on("click", function () {
            oneMoveFunction(true, +$(this).attr("data-num"));
        });
    }

    function oneMoveFunction(bul, num) {
        if (num || num === 0) {
            currPosition = num;
        }

        else if (bul) {
            currPosition++;
        } else {
            currPosition--;
        }


        if (fade) {
            if (currPosition > innerCount - screenConst) {
                currPosition = 0;

            }
            if (currPosition < 0) {
                currPosition = innerCount - screenConst;

            }
            fadeSliderMove();
        }

        if (tram) {
            if (currPosition > innerCount - screenConst) {
                container.css('left', (-(currPosition - 2) * baseWidth) + 'px');
                container.append(container.children().first().clone());
                container.children().first().remove();
                currPosition--;
            }
            if (currPosition < 0) {
                container.css('left', (-(currPosition + 2) * baseWidth) + 'px');
                container.prepend(container.children().last().clone());
                container.children().last().remove();
                currPosition++;
                tramSliderMove();

            } else {
                tramSliderMove();
            }


        }

        if (numPanel) showNum();
        if (dots) {
            var allDots = currSlider.find(".gt-slider-nav span");
            allDots.removeClass("gt-active");
            $(allDots[container.find('.gt-open').attr('data-count')]).addClass("gt-active");
        }
    }

    function tramSliderMove() {
        container.children().removeClass('gt-open');
        container.animate({left: -currPosition * baseWidth}, tramAnimation);
        container.children().eq(currPosition).addClass('gt-open');
    }


    function fadeSliderMove(position) {
        var index = position || currPosition;
        $(inner).removeClass('gt-open');
        $(inner[index]).addClass('gt-open');
    }

    function showNum() {
        currSlider.find('.gt-slider-num-curr').text(+(container.find('.gt-open').attr('data-count')) + 1);
        currSlider.find('.gt-slider-num-max').text(innerCount);
    }

    function createTouch() {
        var initialPoint = 0,
            finalPoint = 0;
        currSlider.on("touchstart", function (event) {
            var e = event.originalEvent;
            initialPoint = Math.abs(e.touches[0].pageX);
            console.log("touchstart");
        });
        currSlider.on("touchend", function (event) {
            var e = event.originalEvent;
            finalPoint = Math.abs(e.changedTouches[0].pageX);
            if (Math.abs(initialPoint - finalPoint) > 50) {
                if (initialPoint > finalPoint) {
                    oneMoveFunction(true);
                } else {
                    oneMoveFunction(false);
                }
            }
        });
    }

    function destroyTouch(clone) {
        var el = clone || currSlider;
        el.off();
    }

    function findScreenConst() {
        if (currSlider.attr("data-count")) {
            screenConst = parseInt(currSlider.attr("data-count"));
            if ($(token768).is(":visible")) screenConst = 3;
            if ($(token667).is(":visible")) screenConst = 2;
            if ($(token360).is(":visible")) screenConst = 1;
        }
    }

    function setBaseWidth() {
        baseWidth = currSlider.outerWidth() / screenConst;
        currSlider.find(".gt-slider-container").outerWidth((innerCount + 1) * baseWidth);
        inner.each(function () {
            $(this).outerWidth(baseWidth);
            $(this).attr('data-count', $(this).index());
        });
    }

    function createCloneSlider(clickPosition) {
        if ($("div").is("#gt-clone")) return;
        self.fixBody();
        var bodyWrapper = $("#gt-body-wrapper");
        bodyWrapper.append('<div id = "gt-clone-wrapper"   class="container"><div id = "gt-clone" class="gt-slider gt-slider-clone gt-slider-fade gt-slider-num  gt-slider-has-arrow"><div id = "gt-clone-close" class = "gt-slider-clone-close"></div><div  id = "gt-clone-container" class="gt-slider-container"></div></div></div>');
        bodyWrapper.show();
        var cloneSlider = $('#gt-clone'),
            inners = currSlider.find(".gt-slider-inner").clone(true);
        inners.each(function () {
            $(this).outerWidth('');
            $('#gt-clone-container').append($(this));
        });
        self.createSlider(cloneSlider, clickPosition);
        $("#gt-clone-close").on("click", function () {
            destroyCloneSlider(cloneSlider);
        });
    }

    function destroyCloneSlider(cloneSlider) {
        destroyArrows(cloneSlider);
        destroyTouch(cloneSlider);
        $("#gt-clone-close").off();
        $("#gt-clone-wrapper").remove();
        $("#gt-body-wrapper").hide();
        self.unfixBody();
    }

    //////////resizeSlider
    function resizeSlider() {
        if (!sliderTimeOut) {
            sliderTimeOut = setTimeout(function () {
                sliderTimeOut = null;
                resizeFunc();
            }, 132);
        }
    }

    docWindow.resize(resizeSlider);

    function resizeFunc() {
        destroyTouch();
        if (tram) {
            findScreenConst();
            setBaseWidth();
            resizeMove();
            tramSliderMove();
        }
        if (arrowsReady) {
            destroyArrows();
            createArrows()
        }
        if (innerCount > screenConst) {
            createTouch();
        }


    }

    function resizeMove() {
        if (currPosition > innerCount - screenConst)
            currPosition = innerCount - screenConst;
        if (innerCount <= screenConst) currPosition = 0;


    }

};
if ($("div").is(".gt-slider")) {
    $(".gt-slider").each(function () {
        self.createSlider($(this));
    })
}