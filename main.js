var dayOfTheWeek = function() {
	var date = new Date();
	return date.getDay();
}

var currentMonth = function() {
	var date = new Date();
	return date.getMonth();
}

var currentDay = function() {
	var date = new Date();
	return date.getDate();
}

var currentYear = function() {
	var date = new Date();
	return date.getFullYear ()
}

var weekDay = function(currentDate) {
	var d = new Date(currentDate[0] + " " + currentDate[1] + " " + currentDate[2]);
	var now = d.getDay()
	var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday", "Saturday"];
	return weekday[now];
}

var leapYear = function(year) {
	if (year % 4 === 0) {
		if (year % 100 === 0) {
			if (year % 400 === 0) {
				return true;
			}
			else {
				return false;
			}
		}
		else {
			return true;
		}
	}
	return false;
};

var increment = function(array) {
	var newMonth = parseInt(array[0]);
	var newDay = parseInt(array[1]);
	var newYear = parseInt(array[2]);

	if (newMonth === 2) {
		if (leapYear(newYear) && newDay === 29) {
			newMonth++;
			newDay = 1;
		}
		else if (!(leapYear(newYear)) && (newDay === 28)) {
			newMonth++;
			newDay = 1;
		}
		else {
			newDay++;
		}
	}
	else if (((newMonth === 9) || (newMonth === 4) || (newMonth === 6) || (newMonth === 11)) && (newDay === 30)) {
		newMonth++;
		newDay = 1;
	}
	else if ((newMonth === 12) && (newDay === 31)) {
		newMonth = 1;
		newDay = 1;
		newYear++;
	}
	else {
		if (newDay === 31) {
			newMonth++;
			newDay = 1;
		}
		else {
			newDay++;
		}

	}
	var newDate = [newMonth, newDay, newYear];
	return newDate;
};

var completeDate = function(i) {
	var month = currentMonth() + 1;
	var day = currentDay();
	var year = currentYear();
	var present = month + " " + day + " " + year;
	var currentDate = [month,day,year];

	while (i > 0) {
		currentDate = increment(currentDate);
		i--;
	}
	return currentDate;
};

var stringDate = function(array) {
	return (array[0] + "/" + array[1] + "/" + array[2]);
}

var switchOver = function(place) {
	$(".newAppointment").slideToggle();
	place.closest('.day').find('p').slideToggle();
	formOpen = false;
	place.closest(".day").find('.apps').fadeToggle();
};

var formOpen = false;

$(document).on('ready', function() {

	
	var place = 7;


	for (var i = 0; i < 7; i++) {
		var present = completeDate(i);
		var dayBox = $("<div class='day'></div>");
		$(".week").append(dayBox);
		var now = weekDay(present);
		$("div").last().append("<div class='dayOfTheWeek'>" + now + "</div>").append("<div class='date'>" + stringDate(present) + "</div>").append('<hr>')
						.append("<div class='apps'></div>").append("<p class='addNew'>Click To Add New Appointment</p>");
	}
	
	$(window).scroll(function () {

		if ($(window).scrollTop() + $(window).height() == $(document).height()) {
			var present = completeDate(place);
			var dayBox = $("<div class='day'></div>");
			$(".week").append(dayBox);
			var now = weekDay(present);
			$("div").last().append("<div class='dayOfTheWeek'>" + now + "</div>").append("<div class='date'>" + stringDate(present) + "</div>").append('<hr>')
						.append("<div class='apps'></div>").append("<p class='addNew'>Click To Add New Appointment</p>");
			place++
   		}
	});

	/*$(".addNew").hover(function() {
			$(this).css("color", "salmon");
		}, function() {
			$(this).css("color", "#666666");
	});*/

	$(document).on('mouseenter', '.addNew', function() {
		$(this).css("color", "salmon");
	});
	$(document).on('mouseleave', '.addNew', function() {
		$(this).css("color", "#666666");
	});


	$(document).on('click', '.day', function() {
		
		if (!formOpen) {
			$(this).append($(".newAppointment"));
			$(".newAppointment").slideToggle();
			$(this).find('p').slideToggle();
			$(this).find('.apps').fadeToggle();

			$(this).find("input[type=text], textarea").val("");
			$(this).find("#title").focus();
			formOpen = true;
		}

		/*$(".apps").on('click', function(e) {
			e.stopPropagation();
			console.log("2");
		})*/

		$(".newAppointment").on('click', function(e) {
			e.stopPropagation();
		})
	});

	$(document).on('mouseenter', '#delete', function() {
		$(this).css("background-color", "#e2e2e2");
	});
	$(document).on('mouseleave', '#delete', function() {
		$(this).css("background-color", "white");
	});

	$(document).on('click', '#delete', function(e) {
		e.stopPropagation();
		console.log("delete");
		$(this).closest(".newApp").remove();
	});

	$("form").on('click', "#cancel", function(e) {
		e.preventDefault();
		switchOver($(this));

	});

	$(".newAppointment").submit(function(e) {
		e.preventDefault();
		switchOver($(this));

		var place = $(this).closest(".newAppointment");
		var appointment = {
			title: place.find("#title").val(),
			location: place.find("#location").val(),
			start: place.find("#start").val(),
			end: place.find("#end").val(),
			notes: place.find('#notes').val()
		};
		console.log(appointment);
		localStorage.setItem("appointment", appointment);
		var time = appointment.start;

		var buttons = $("<div class='change-app'><button id='delete'>Delete</button></div>");

		if (appointment.title !== "") {
			$(this).closest(".day").find(".apps").append("<div class='newApp'><p class='app-title'>" + appointment.title 
				+ "</p><p class='app-loc'>Location: " + appointment.location + "</p><div class='app-times'><p><span>From: </span>" 
				+ appointment.start + "<span> To: </span>" + appointment.end + "</p></div></div>");
			$(this).closest(".day").find(".newApp").last().data("order", time);
			$(this).closest(".day").find(".newApp").last().append(buttons);
			if (appointment.notes !== "") {
				$(this).closest(".day").find(".newApp").last().append("<div class='notes'>Notes: " + appointment.notes + "</div>");
			}

		}

		var movingApp = $(".newApp").last();
		while ((movingApp.data("order")) < (movingApp.prev().data("order"))) {
			movingApp.insertBefore(movingApp.prev());
		}
	});


});