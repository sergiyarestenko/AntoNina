this.setCurrTime = function () {
    self.currTime();
    var t = setInterval(self.currTime, 30000);
};



this.currTime = function () {
    $(".gt-curr-time").each(function () {
        var date = new Date();
        if ($(this).attr("data-gmt")) date.setUTCHours(+$(this).attr("data-gmt"));
        var hours = date.getHours(),
            minutes = date.getMinutes(),
            weekday = date.getDay(),
            day = date.getDate(),
            month = date.getMonth(),
            year = date.getFullYear(),
            weekdays = [
                "Воскресенье",
                "Понедельник",
                "Вторник",
                "Среда",
                "Четверг",
                "Пятница",
                "Суббота"
            ],
            monthes = [
                "января",
                "февраля",
                "марта",
                "апреля",
                "мая",
                "июня",
                "июля",
                "августа",
                "сентября",
                "октября",
                "ноября",
                "декабря"
            ];
        if (hours < 10) hours = "0" + hours;
        if (minutes < 10) minutes = "0" + minutes;
        weekday = weekdays[weekday];
        month = monthes[month];
        if ($(".gt-curr-time-time"))
            $(".gt-curr-time-time").html(hours + ":" + minutes);
        if ($(".gt-curr-time-date"))
            $(".gt-curr-time-date").html(
                weekday + ", " + day + " " + month + " " + year
            );
    });
};


if ($("div").is(".gt-curr-time")) {
    self.setCurrTime();
}