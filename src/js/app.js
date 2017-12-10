var GoToTrip = function () {
	var self = this,
		gtHeader = $('header'),
		gtFooter = $('footer'),
		gtWrapper = $('#gt-wrapper'),
		upButton = $('#gt-up'),
		mobilemenuSwitch = $('#gt-mobile-menu-switch');



	//listeners

	$(document).ready( function(){
		self.deskTopMenuScroll();
		self.footerHeight();
		if($('div').is('.gt-slider')){
			self.createSlider()
		}
		if ($('div').is('.gt-news')){
			self.cutNews()
		}
		if ($('div').is('.gt-video')){

			self.setPlayers()
		}

	});
	$(window).resize(function(){
		self.deskTopMenuScroll();
		self.mobileMenuClose();
		self.footerHeight();

		if($('div').is('.gt-slider')){
			$('.gt-slider').each(function () {
				self.setSlidersWidth($(this));
				self.slideClick($(this),0);
			})
		}
	});
// scroll
	$( window ).scroll(function() {
		self.upPageButton();
		if($('.gt-header-menu').is(':visible')){
			self.deskTopMenuScroll();
		}
	});
//click
//open-close mobile menu
	mobilemenuSwitch.on('click',function () {
		if($(this).hasClass('gt-open')){
		self.mobileMenuClose();
			}else {
		self.mobileMenuOpen();
		}
	});
//to_top_button
	upButton.on('click',function () {
		self.pageUp();
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
			console.log('end Of Line');// delete
			}
		}else{
		if(currentDot<dots-1){
			self.slideClick(el,currentDot+1)

			}else{
			console.log('end Of Line')// delete
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
	this.footerHeight = function () {
		var footerHeight = gtFooter.outerHeight();
			if(footerHeight > $(window).height()-50){
				gtFooter.css('position','static');
				gtWrapper.css('margin-bottom','');
				upButton.css('position','static');
			}else {
				gtFooter.css('position','');
				upButton.css('position','');
				gtWrapper.css('margin-bottom',gtFooter.outerHeight()+'px');
			}
	}
	this.upPageButton = function () {
		if ( $(document).scrollTop() > 30 ) {
			upButton.addClass('gt-visible');
			} else {
			upButton.removeClass('gt-visible');
		}
	}
	this.pageUp = function () {
		$('body,html').animate({scrollTop:0},800);
			return false;
	}
	this.setPlayers = function () {
		var tag = document.createElement('script');
			tag.src = 'https://www.youtube.com/player_api';
		var firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		var gtVideos = $('.gt-video');
			gtVideos.each(function () {
				var currentPlayer = $(this);
					currentPlayer.find('.gt-video-switch').on('click',function () {
					self.controlPlayer(currentPlayer,$(this));
				})
			})
	}
	this.controlPlayer = function (el,switcher) {
		if(!switcher.hasClass('gt-open')){
			switcher.addClass('gt-open');
			self.addYouTube(el);
		}
	}
	this.addYouTube = function (el) {
		var player,
			elId = 'gt-video-'+el.index(),
			switcher = el.find('.gt-video-switch');
			switcher.addClass('gt-video-on');
			el.find('.gt-video-text').hide();
			el.find('.gt-video-inner').attr('id',elId).addClass('gt-video-foreground');
		function onYouTubeIframeAPIReady() {
			player = new YT.Player(elId, {
			width: 600,
			height: 400,
			videoId: el.attr('data-youtube'),
			playerVars: {
			playlist: el.attr('data-youtube'),
			color:'white',
			loop: 1,
			// autoplay:1,
			disablekb:0,
			controls:0
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
	};
	switcher.on('click', function () {
		if($(this).hasClass('gt-video-on')){
			player.pauseVideo();
			$(this).removeClass('gt-video-on');
			}else{
				player.playVideo();
				$(this).addClass('gt-video-on');
			}
		});
	}
};








var goToTrip = new GoToTrip();