this.openEnterForm = function () {
    enterWrapper.addClass('gt-open');
    setTimeout(show);
    function show() {
        $('#gt-header-registered').addClass('gt-open');
        enterForm.addClass('gt-open');
        enterClose.addClass('gt-open');
    }
};

this.closeEnterForm = function () {
    enterClose.removeClass('gt-open');
    enterForm.removeClass('gt-open');
    $('#gt-header-registered').removeClass('gt-open');
    self.closeRestorePass();
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


this.openRestorePass = function () {
    $('#gt-enter-pass-restore-wrapper').addClass('gt-open')

};
this.closeRestorePass = function () {
    $('#gt-enter-pass-restore-wrapper').removeClass('gt-open')
};


enterButton.each(function () {
    $(this).on('click', self.openEnterForm)
});

enterClose.on('click', self.closeEnterForm);

enterChose.on('click', function (event) {
    self.changeEnterRegistration(event);
});

$('#gt-enter-form-restore-pass').on('click',self.openRestorePass);
$('#gt-enter-pass-restore-submit').on('click',self.closeRestorePass);