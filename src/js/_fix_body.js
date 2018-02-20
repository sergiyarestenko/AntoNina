this.fixBody = function () {
    if (bodyPosition.top || bodyPosition.left) return;
    bodyPosition.top = doc.scrollTop();
    bodyPosition.left = body.offset().left;
    body.css({
        position: "fixed",
        left: bodyPosition.left + "px",
        top: -1 * bodyPosition.top + "px"
    });
};

this.unfixBody = function () {
    body.css({
        position: "",
        left: "",
        top: ""
    });
    doc.scrollTop(bodyPosition.top);
    bodyPosition.top = false;
    bodyPosition.left = false;
};
