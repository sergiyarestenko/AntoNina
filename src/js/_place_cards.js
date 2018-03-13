this.createViewCardListeners = function (el) {
    el.find('.gt-view-cards-icons-visit').on('click',function (event) {
        self.closeShareViewCard(el);
        event.stopPropagation();
        self.clickVisitViewCard(el);
    });
    el.find('.gt-view-cards-icons-pin-plus').on('click',function (event) {
        self.closeShareViewCard(el);
        event.stopPropagation();
        self.clickSeenViewCard(el);

    });
    el.find('.gt-view-cards-icons-bookmarks').on('click',function (event) {
        self.closeShareViewCard(el);
        event.stopPropagation();
        self.clickMarkViewCard(el);

    });
    el.find('.gt-view-cards-icons-share').on('click',function (eventg) {
        event.stopPropagation();
        self.clickShareViewCard(el);
    });
    el.find('.gt-view-cards-icons-share').find('a').on('click',function (event,el) {
        event.preventDefault();

        self.viewCardSocial(el);
    });
    el.on('click  mouseleave',function () {
        $(el).find('.gt-view-cards-icons-share').parent().removeClass('gt-active');
        self.closeShareViewCard(el);

    })
};

this.destroyViewCardListeners = function (el) {
    el.find('.gt-view-cards-icons-visit').off();
    el.find('.gt-view-cards-icons-pin-plus').off();
    el.find('.gt-view-cards-icons-bookmarks').off();
    el.find('.gt-view-cards-icons-share').off();
    el.find('.gt-view-cards-icons-share').find('a').off();
    el.off();

};


this.viewCardSocial = function (el) {
    console.log('click social');
    self.closeShareViewCard(el);
};



this.openShareViewCard = function (el) {
    $(el).addClass('gt-active');
};
this.closeShareViewCard = function (el) {
    $(el).removeClass('gt-active');

};


this.clickShareViewCard = function (el) {

    var button = el.find('.gt-view-cards-icons-share').parent();
    if(button.hasClass('gt-active')){
        button.removeClass('gt-active');
        self.closeShareViewCard(el);

    }else{
        button.addClass('gt-active');
        self.openShareViewCard(el);
    }
};
this.clickVisitViewCard = function (el) {
    if(el.hasClass('gt-active')) return;
    var button = el.find('.gt-view-cards-icons-visit').parent();
    if(button.hasClass('gt-active')){
        button.removeClass('gt-active');
        console.log('click not visited now');
    }else{
        button.addClass('gt-active');
        console.log('click visit');
    }
};

this.clickSeenViewCard = function (el) {
    if(el.hasClass('gt-active')) return;
    var button = el.find('.gt-view-cards-icons-pin-plus').parent();
    if(button.hasClass('gt-active')){
        button.removeClass('gt-active');
        console.log('click not seen now');
    }else{
        button.addClass('gt-active');
        console.log('click seen');
    }
};
this.clickMarkViewCard = function (el) {
    if(el.hasClass('gt-active')) return;
    var button = el.find('.gt-view-cards-icons-bookmarks').parent();
    if(button.hasClass('gt-active')){
        button.removeClass('gt-active');
        console.log('click delete bookmark');
    }else{
        button.addClass('gt-active');
        console.log('click add bookmark');
    }
};




if ($("*").is(".gt-view-cards-inner")) {

    $('.gt-view-cards-inner').each(function () {
        self.createViewCardListeners($(this));
    })


}

