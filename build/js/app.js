



var GoToTrip = function () {
	var self = this,
		gtHeader = $('header'),
		mobilemenuSwitch = $('#gt-mobile-menu-switch');



	//listeners

	$(document).ready( function(){
		self.deskTopMenuScroll();
		if($('div').is('.gt-slider')){
			self.createSlider()
		}
		if ($('div').is('.gt-news')){
			self.cutNews()
		}

	});
	$(window).resize(function(){
		self.deskTopMenuScroll();
		self.mobileMenuClose();

		if($('div').is('.gt-slider')){
			$('.gt-slider').each(function () {
				self.setSlidersWidth($(this));
			})
		}
	});
// scroll
	$( window ).scroll(function() {
		if($('.gt-header-menu').is(':visible')){
			self.deskTopMenuScroll();
		}
	});
	//open-close mobile menu
	mobilemenuSwitch.on('click',function () {
		if($(this).hasClass('gt-open')){
		self.mobileMenuClose();
			}else {
		self.mobileMenuOpen();
		}
	});

//functions
	this.deskTopMenuScroll = function () {
		if ($(window).scrollTop() > gtHeader.outerHeight()) {
			gtHeader.addClass('gt-header-scrolled');
		} else {
			gtHeader.removeClass('gt-header-scrolled');
		}
	}
	this.mobileMenuOpen = function(){
		gtHeader.addClass('gt-open');
		mobilemenuSwitch.addClass('gt-open');
	}
	this.mobileMenuClose = function () {
		mobilemenuSwitch.removeClass('gt-open');
		gtHeader.removeClass('gt-open');
	}
	this.createSlider = function () {
		var gtSliders = $('.gt-slider');
		gtSliders.each(function () {
			var currentSlider = $(this),
				sliderContainer = $(currentSlider).find('.gt-slider-container'),
				sliderInner = $(currentSlider).find('.gt-slider-inner'),
				initialPoint = 0,
				finalPoint = 0;
			if( sliderInner.length > 1){
				self.createSladerNav(currentSlider,sliderInner.length);
			//touchListeners
				currentSlider.on('touchstart', function(event) {
				var e = event.originalEvent;
					initialPoint =  Math.abs(e.touches[0].pageX);
				});
				currentSlider.on('touchend', function(event) {
					var e = event.originalEvent;
					finalPoint =  Math.abs(e.changedTouches[0].pageX);

					if(Math.abs(initialPoint-finalPoint) > 50){
						if(initialPoint > finalPoint){
							self.slideTouch(currentSlider,false)
						}else {
							self.slideTouch(currentSlider,true)
						}
					}
			});
			self.createClickListeners(currentSlider);
			self.setSlidersWidth(currentSlider,sliderInner.length);
			}
		})
	}
	this.setSlidersWidth = function (el,num) {
	var sliderWidth = el.outerWidth();
		el.find('.gt-slider-container').outerWidth(sliderWidth*(num+1));
		el.find('.gt-slider-inner').outerWidth(sliderWidth);
	}
	this.createSladerNav = function (el,num) {
		el.append("<div class='gt-slider-nav'></div>");
		var nav = el.find('.gt-slider-nav');
			for (var i = 0; i < num; i++) {
			nav.append('<span data-num = '+i+'></span>');
			}
		nav.find('span').first().addClass('gt-active')
	}
	this.createClickListeners = function (el) {
		el.find('.gt-slider-nav span').off().on('click',function () {
			self.slideClick(el,+$(this).attr('data-num'));
		})
	}
	this.slideClick = function (el, num) {
		el.find('.gt-slider-container').css('margin-left', (el.outerWidth()*-1*num-num/.25)+'px');
		var dots = el.find('.gt-slider-nav span');
		dots.removeClass('gt-active');
			dots.each(function () {
				if($(this).attr('data-num') == num){
				$(this).addClass('gt-active');
				}
			})
	}
	this.slideTouch = function (el,bul) {
		var dots = el.find('.gt-slider-nav span').length,
			currentDot = +el.find('.gt-slider-nav span.gt-active').attr('data-num');
		if(bul){
			if(currentDot>0 ){
				self.slideClick(el,currentDot-1)
			}else{
			console.log('end Of Line')
			}
		}else{
		if(currentDot<dots-1){
			self.slideClick(el,currentDot+1)

			}else{
			console.log('end Of Line')
			}
		}
	}
	this.cutNews = function () {
		var newsContainers = $('.gt-news');
		newsContainers.each(function () {
		var cuttingNews = $(this).find('.gt-news-small .gt-news-text-header .text');
		cuttingNews.each(function () {

		self.cutting($(this),160);



		})

		})


	}
	this.cutting = function (el,num) {
		var newsText = el.text()
		if (newsText.length > num){
			newsText = newsText.slice(0, num) + '...';
			el.text(newsText)
		}
	}







};








var goToTrip = new GoToTrip();