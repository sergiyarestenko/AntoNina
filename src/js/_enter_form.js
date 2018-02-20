this.openEnterForm = function () {
    enterWrapper.addClass('gt-open');
    setTimeout(show);

    function show() {
        enterForm.addClass('gt-open');
        enterClose.addClass('gt-open');
    }
};

this.closeEnterForm = function () {
    enterClose.removeClass('gt-open');
    enterForm.removeClass('gt-open');
    setTimeout(hide, 750);

    function hide() {
        enterWrapper.removeClass('gt-open');
    }
};

this.changeEnterRegistration = function (event) {
    if (enterForm.hasClass($(event.target).attr("class")))
        return;
    enterForm.removeClass("gt-chosen-enter").removeClass("gt-chosen-registration").addClass($(event.target).attr("class"));
};




enterButton.each(function () {
    $(this).on('click', self.openEnterForm)
});

enterClose.on('click', self.closeEnterForm);

enterChose.on('click', function (event) {
    self.changeEnterRegistration(event);
});
