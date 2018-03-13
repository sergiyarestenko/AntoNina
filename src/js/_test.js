body.on('click', function (event) {
    // console.log(event.target);

});


if ($("*").is(".gt-menu-news")) {
  $('.gt-menu-news').find('a').on('click',function (event) {

      event.preventDefault();
      $('.gt-menu-news').find('li').removeClass('gt-active');
      $(this).parent().addClass('gt-active');
      console.log('temp func')
  })

    // todo temp func
}
