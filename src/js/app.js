var GoToTrip = function () {
	var self = this,
		body = $(document.body),
		bodyPosition = {
			top:false,
			left:false
		},
		token360 = $('#gt-is-360'),
		token480 = $('#gt-is-480'),
		token667 = $('#gt-is-667'),
		token768 = $('#gt-is-768'),
		token1024 = $('#gt-is-1024'),
		token1231 = $('#gt-is-1231'),
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
			self.createSliders()
		}
		if ($('div').is('.gt-news')){
			self.cutNews()
		}
		if ($('p').is('.gt-read-more-slider-text-inner')){
			self.cutReadMoreSlider()
		}
		if ($('div').is('.gt-video')){
			self.setPlayers()
		}
		if ($('div').is('.gt-inner-scroll')){
			self.innerScroll()
		}
		if($('div').is('.gt-tabs')){
			self.tabSlider()
		}
		if($('div').is('.gt-img-holder')){
			self.setBackground()
		}
		if($('*').is('.gt-view-cards-icons-bookmarks')){
			self.createBookmarksLink()
		}
		if($('*').is('.gt-view-cards-icons-item')){
			self.createIconsItemsClick()
		}

		if($('div').is('.gt-curr-time')){
			self.setCurrTime();

		}
	});

	$(window).resize(function(){
		self.deskTopMenuScroll();
		self.footerHeight();
		if(gtHeader.hasClass('gt-open'))
			self.mobileMenuClose();

	});
// scroll
	$( window ).scroll(function() {

		self.upPageButton();
		if($('.gt-header-menu').is(':visible')){
			self.deskTopMenuScroll();
		}
	});
	$(window).on('wheel',function (e) {
	// console.log(e)
		e = e || window.event;
		self.softScroll(e)
	})



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
	this.fixBody = function () {
		if(bodyPosition.top||bodyPosition.left)
			return;
		bodyPosition.top = $(document).scrollTop();
		bodyPosition.left = body.offset().left;
		body.css({'position':'fixed','left':bodyPosition.left+'px','top':-1*bodyPosition.top+'px' })
	}
	this.unfixBody = function () {
		body.css({'position':'','left':'','top':'' })
		$(document).scrollTop(bodyPosition.top);
		bodyPosition.top = false;
		bodyPosition.left = false;
	}
	this.deskTopMenuScroll = function () {
		if ($(window).scrollTop() > gtHeader.outerHeight()) {
			gtHeader.addClass('gt-header-scrolled');
		} else {
			gtHeader.removeClass('gt-header-scrolled');
		}
	}
	this.mobileMenuOpen = function(){
		self.fixBody();
		gtHeader.addClass('gt-open');
		mobilemenuSwitch.addClass('gt-open');
	}
	this.mobileMenuClose = function () {
		self.unfixBody();
		mobilemenuSwitch.removeClass('gt-open');
		gtHeader.removeClass('gt-open');
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
	this.cutReadMoreSlider = function(){
		var cuttings = $('.gt-read-more-slider-text-inner');
			cuttings.each(function () {
			self.cutting($(this),160);
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
	this.softScroll = function (e) {
		var delta = e.originalEvent.deltaY || e.detail || e.wheelDelta;

	}
	this.pageUp = function () {
		$('body,html').animate({scrollTop:0},800);
			return false;
	}
	this.setPlayers = function () {
		var tag = document.createElement('script');
			tag.type = 'text/javascript';
			tag.src = 'https://www.youtube.com/player_api';
		var lastScriptTag = document.getElementsByTagName('script')[ document.getElementsByTagName('script').length-1];
			lastScriptTag.parentNode.insertBefore(tag, lastScriptTag);
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
	this.innerScroll = function () {
		$('.gt-inner-scroll').each(function () {
			if($(this).find('.overview').height()>$(this).height()){
				$(this).addClass('isScrolled');
				$(this).tinyscrollbar({ thumbSize: 40,wheelSpeed:10  });
			}
		})
	}
	this.tabSlider = function () {
		var tabSliders = $('.gt-tabs');
		tabSliders.each(function () {
			var currTabs = $(this);
			currTabs.find('.gt-tabs-button').each(function () {
				$(this).on('click',function () {
					self.tabSliderAction(currTabs, $(this).index())
				})
			})
		self.tabSliderActivation(currTabs);
		})
	}
	this.tabSliderActivation = function (el) {
		$(el.find('.gt-tabs-button')).removeClass('active');
		$(el.find('.gt-tabs-main')).removeClass('active');
		$(el.find('.gt-tabs-main')).hide();
		$(el.find('.gt-tabs-button')[0]).addClass('active');
		$(el.find('.gt-tabs-main')[0]).show();
		$(el.find('.gt-tabs-main')[0]).addClass('active');
	}
	this.tabSliderAction = function (el,num) {
		$(el.find('.gt-tabs-button')).removeClass('active');
		$(el.find('.gt-tabs-main')).removeClass('active');
		$(el.find('.gt-tabs-main')).hide();
		$(el.find('.gt-tabs-button')[num]).addClass('active');
		$(el.find('.gt-tabs-main')[num]).show();
		$(el.find('.gt-tabs-main')[num]).addClass('active');
	}
	this.setBackground = function () {
		var imgHolders = $('.gt-img-holder');
		imgHolders.each(function () {
			if(!$(this).attr('data-bg'))
				return;
			var path = $(this).attr('data-bg');
			if(token667.is(':visible')){
				$(this).css('background-image','url("./img/backgrounds/phone/'+path+'")')
				return
			}
			if(token1024.is(':visible')){
			$(this).css('background-image','url("./img/backgrounds/tablet/'+path+'")')
				return
			}
			$(this).css('background-image','url("./img/backgrounds/desktop/'+path+'")')
		})
	}
	this.createIconsItemsClick = function () {
		$('.gt-view-cards-icons-item').each(function () {
			if($(this).hasClass('gt-view-cards-icons-visit')){
				self.createVisitLink($(this))
				return
			}
			if($(this).hasClass('gt-view-cards-icons-bookmarks')){
				self.createBookmarksLink($(this))
				return
			}
			if($(this).hasClass('gt-view-cards-icons-pin')|| $(this).hasClass('gt-view-cards-icons-share')){
				self.toggleGtActive($(this))
				return
			}
			if($(this).hasClass('gt-view-cards-icons-share')){
				self.createShareLink($(this))
				return
			}
		})
	}
	this.createShareLink = function (el) {
		el.removeClass('gt-active');
		el.on('click',function () {
			el.toggleClass('gt-active')
		})
	}
	this.toggleGtActive = function (el) {
		var el = $(el);
		el.removeClass('gt-active');
		el.on('click',function () {
			el.toggleClass('gt-active')
		})
	}
	this.createBookmarksLink = function (el) {
			var el = $(el);
			var parent = el.closest('.gt-view-cards-inner');
				parent = $(parent);
			if(!parent.attr('data-href'))
				parent.attr('data-href',window.location.href);
			if(!parent.attr('data-bookmark'))
				parent.attr('data-bookmark','GoToTrip');
			el.attr('href',parent.attr('data-href'));
			el.attr('rel','sidebar')
			el.on('click',function (e) {
				e.preventDefault();
				self.addBookmark(el,parent.attr('data-href'),parent.attr('data-bookmark'))
			})
	}
	this.addBookmark = function (a,url,title) {
		try {
			window.external.AddFavorite(url, title);
		}
		catch (e) {
			try {
				window.sidebar.addPanel(title, url, "");
			}
			catch (e) {
				if (typeof(opera)=="object") {
					a.title=title;
					a.url=url;
					return true;
				} else {
					alert('Нажмите Ctrl-D чтобы добавить страницу в закладки');
				}
			}
		}
		return false;
	}
	this.createVisitLink = function (el) {
		if(!el.closest('.gt-view-cards-inner').attr('data-href'))
			return;
		el.on('click',function () {
			self.addVisitedLink(el)
		})
	}
	this.addVisitedLink = function (el) {
		alert('послали данные на бек',el.closest('.gt-view-cards-inner').attr('data-href'))
		el.toggleClass('gt-active')
	}
	this.createSliders = function () {
	/*
	*all sliders create funs
	* params
	* count (num)  from 1 to 4 - how mach img on slider screen
	* arrow (bull) arrow left and right
	* dots (bull) dots link
	* */


		var gtSliders = $('.gt-slider');
		gtSliders.each(function () {
		var currSlider = $(this),
				currPosition = 0,
				arrow = false,
				dots = false,
				screenConst,
				inner = currSlider.find('.gt-slider-inner'),
				innerCount = inner.length,
				baseWidth;
			if(currSlider.hasClass('gt-slider-has-arrow')){
				arrow = true;
				currSlider.append('<div class="gt-slider-arrow-holder"></div>')
			}
			if(currSlider.hasClass('gt-slider-has-dots')){
				dots = true;
				currSlider.append('<div class="gt-slider-nav"></div>')

			}
		     function findScreenConst() {
		        screenConst = 1;
				if(currSlider.attr('data-count')){
					screenConst = parseInt(currSlider.attr('data-count'));
				if($(token768).is(':visible'))
					screenConst = 3;
				if($(token667).is(':visible'))
					screenConst = 2;
				if($(token360).is(':visible'))
					screenConst = 1;
				}
			}
			function setBaseWidth() {
				if(arrow)
					destroyArrow();
				baseWidth = currSlider.outerWidth()/screenConst;
				currSlider.find('.gt-slider-container').outerWidth((innerCount+1)*baseWidth)
				inner.each(function () {
					$(this).outerWidth(baseWidth)
				})
				if(innerCount > screenConst){
					if(arrow)
						createArrows();
					if(dots)
						createDots();
				}
			}
			findScreenConst();
			setBaseWidth();
			createTouch();
			function createArrows() {
				currSlider.find('.gt-slider-arrow-holder').html(
					'<span class = "gt-slider-arrow left">' +
					'<i class="fa fa-angle-left fa-2x"></i>' +
					'</span>' +'<span class = "gt-slider-arrow right">' +
					'<i class="fa fa-angle-right fa-2x"></i>' +
					'</span>');
				currSlider.find('.left').off().on('click',function () {
					oneMoveFunction(true)
				})
				currSlider.find('.right').off().on('click',function () {
					oneMoveFunction(false)
				})
				checkPosition()
			}
			function destroyArrow() {
				currSlider.find('.gt-slider-arrow-holder').html('')
			}
			function createDots() {
				var nav = currSlider.find('.gt-slider-nav'),
					spans = '';
					for (var i = 0; i < innerCount; i++) {
						spans +='<span data-num = '+i+'></span>';
					}
					nav.html(spans);

					nav.find('span').first().addClass('gt-active')
					currSlider.find('.gt-slider-nav span').off().on('click',function () {
						oneMoveFunction(true,+$(this).attr('data-num'));
					})
			}
			function createTouch() {
				var initialPoint = 0,
					finalPoint = 0;
				currSlider.on('touchstart', function(event) {
					var e = event.originalEvent;
					initialPoint =  Math.abs(e.touches[0].pageX);
				});
				currSlider.on('touchend', function(event) {
					var e = event.originalEvent;
					finalPoint =  Math.abs(e.changedTouches[0].pageX);
					if(Math.abs(initialPoint-finalPoint) > 50){
						if(initialPoint > finalPoint){
							oneMoveFunction(true)
						}else {
							oneMoveFunction(false)
						}
					}
				});
			}
			if(currSlider.find('.gt-slider-open-clone'))
				createCloneListeners();
			function createCloneListeners() {
				var cloneListeners = currSlider.find('.gt-slider-open-clone');
					cloneListeners.each(function () {
						$(this).on('click',function () {
							// console.log('cloneListeners', $(this).parent().index())
						self.createCloneSlider(currSlider,$(this).parent().index())
						})
					})
			}

			function checkPosition() {
				var left = currSlider.find('.left'),
					right = currSlider.find('.right');
					left.removeClass('not-active');
					right.removeClass('not-active');
				if(currPosition == 0)
					right.addClass('not-active');
				if (currPosition == innerCount-1||currPosition == innerCount-screenConst)
					left.addClass('not-active');
			}
			function oneMoveFunction(bul,num) {
				if(num||num===0) {
					currPosition = num;

				}else if(bul){
					currPosition +=1
					}else{
						currPosition -=1
				}
				if(currPosition > innerCount-screenConst){
					currPosition = innerCount-screenConst;
					self.sliderEndLeft(currSlider);
					return;
				}
				if(currPosition <0){
					currPosition = 0;
					self.sliderEndRight(currSlider);
					return;
				}
				self.sliderMove(currSlider,baseWidth,currPosition);

				if(currSlider.find('.gt-slider-arrow'))
					checkPosition();
			}
			$(window).resize(function(){
				findScreenConst();
				setBaseWidth();
				if(currPosition > innerCount-screenConst)
					currPosition = innerCount-screenConst;
				if(innerCount<=screenConst)
					currPosition = 0
				self.sliderMove(currSlider,baseWidth,currPosition);
			})

		})
	}
	this.createCloneSlider = function (el,num) {
		if($('div').is('#gt-clone-close'))
			return;
		self.fixBody();
		var currPosition = num;
		$('#gt-body-wrapper').show().append('' +
			'<div id = "gt-clone" class="gt-slider-clone">' +
			'<div id = "gt-clone-close" class = "gt-slider-clone-close">' +
			'<i class="fa fa-times fa-2x"></i>' +
			'</div>' +
			'<div class="container">' +
			'<div id = "gt-clone-inner" class = "gt-slider-clone-inner">'+
			'<div id = "gt-clone-container" class = "gt-slider-container gt-slider-clone-container"></div>' +
			'</div>'+
			'</div>' +
			'</div>'
		);
		var currSlider = $('#gt-clone-inner'),
			inners = el.find('.gt-slider-inner').clone(true),
			innersLenght = inners.length;
			inners.each(function () {
				$(this).removeClass('gt-slider-inner').addClass('gt-clone-slider-inner');
				$(this).find('.gt-slider-inner-cover').remove();
				$('#gt-clone-container').append($(this));
			})
		if(innersLenght > 1){
			$('#gt-clone .container').append(
				'<span class = "gt-slider-arrow left" id = "gt-clone-arrow-left">' +
				'<i class="fa fa-angle-left fa-2x"></i>' +
				'</span>' +
				'<span class = "gt-slider-arrow right" id = "gt-clone-arrow-right">' +
				'<i class="fa fa-angle-right fa-2x"></i>' +
				'</span>')
			$('#gt-clone-arrow-left').on('click',moveCloneSliderLeft);
			$('#gt-clone-arrow-right').on('click',moveCloneSliderRight);

		}

		var container = currSlider.find('#gt-clone-container'),
			inners = container.find('.gt-clone-slider-inner'),
			innerLength = inners.length,
			baseWidth = currSlider.outerWidth();

		inners.each(function () {
			$(this).outerWidth(baseWidth);
		})
		container.outerWidth(baseWidth*(innerLength+1))
		container.css('margin-left', (baseWidth*-1*currPosition)+'px');
		setTimeout(addAnimation);
		function addAnimation() {
			container.addClass('gt-animated')
		}
		checkPosition();

	var initialPoint = 0,
			finalPoint = 0;
		currSlider.on('touchstart', function(event) {
		var e = event.originalEvent;
		initialPoint =  Math.abs(e.touches[0].pageX);
		});
		currSlider.on('touchend', function(event) {
		var e = event.originalEvent;
		finalPoint =  Math.abs(e.changedTouches[0].pageX);
		if(Math.abs(initialPoint-finalPoint) > 50){
			if(initialPoint > finalPoint){
				moveCloneSliderLeft()
			}else {
				moveCloneSliderRight()
				}
			}
		});


		$('#gt-clone-close').on('click',function () {
			self.destroyCloneSlider();
		})

		function moveCloneSliderLeft() {
			currPosition +=1;
			if(currPosition>innerLength-1){
				currPosition=innerLength-1;
				self.sliderEndLeft(currSlider);
			return
				}
			self.sliderMove(currSlider,baseWidth,currPosition);
			checkPosition();
		}
		function moveCloneSliderRight() {
			currPosition-=1;
				if(currPosition <0){
				currPosition = 0;
				self.sliderEndRight(currSlider);
			return;
			}
			self.sliderMove(currSlider,baseWidth,currPosition);
			checkPosition();

		}
		function checkPosition() {
			if(!$('#gt-clone-arrow-left'))
				return
			var left = $('#gt-clone-arrow-left'),
				right =  $('#gt-clone-arrow-right');
			left.removeClass('not-active');
			right.removeClass('not-active');
			if(currPosition == 0)
				right.addClass('not-active');
			if (currPosition == innerLength-1)
				left.addClass('not-active');
			}
		}
	this.destroyCloneSlider = function () {
		$('#gt-clone-arrow-right').off();
		$('#gt-clone-arrow-left').off();
		$('#gt-clone-close').off();
		$('#gt-clone-inner').off();
		$('#gt-clone').remove();
		$('#gt-body-wrapper').hide();
		self.unfixBody();
	}
	this.sliderEndLeft = function (el) {
		console.log('left_end')
	}
	this.sliderEndRight = function (el) {
		console.log('right_end')
	}
	this.sliderMove = function(el,width,position){
		if(el.find('.gt-slider-nav')){
			var dots = el.find('.gt-slider-nav span');
			dots.removeClass('gt-active');
			$(dots[position]).addClass('gt-active');
		}
		el.find('.gt-slider-container').css('margin-left', (width*-1*position)+'px');
	}
	this.setCurrTime = function () {
		self.currTime()
		var t = setInterval(self.currTime, 30000);
	}
	this.currTime = function () {
		$('.gt-curr-time').each(function () {
			var date = new Date();
			if($(this).attr('data-gmt'))
				date.setUTCHours(+$(this).attr('data-gmt'))
			var	hours = date.getHours(),
				minutes = date.getMinutes(),
				weekday = date.getDay(),
				day = date.getDate(),
				month = date.getMonth(),
				year = date.getFullYear(),
				weekdays = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'],
				monthes = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря']
			if (hours < 10) hours = "0" + hours;
			if (minutes < 10) minutes = "0" + minutes;
			weekday = weekdays[weekday];
			month = monthes[month];
			if($('.gt-curr-time-time'))
				$('.gt-curr-time-time').html(hours+':'+minutes);
			if($('.gt-curr-time-date'))
				$('.gt-curr-time-date').html(weekday+', '+day+' '+ month+' '+year);
		})
	}
};

var goToTrip = new GoToTrip();



