// проверка на наличие - обсудить с беком поведегте



$('#gt-enter-form-facebook').on('click', function () {
    self.socialEnter('facebook')
});
$('#gt-enter-form-twitter').on('click', function () {
    self.socialEnter('twitter')
});
$('#gt-enter-form-google').on('click', function () {
    self.socialEnter('google')
});

$('#gt-reg-form-facebook').on('click', function () {
    self.socialRegistration('facebook')
});
$('#gt-reg-form-twitter').on('click', function () {
    self.socialRegistration('twitter')
});
$('#gt-reg-form-google').on('click', function () {
    self.socialRegistration('google')
});

this.socialRegistration = function (token) {

    alert("Регистрация через " + token)

};
this.socialEnter = function (token) {

    alert("Вход через " + token)

};
