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

var stringDay = function(day, plusDays) {
	var stringDay;
	var current = day + plusDays;
	if (current === 0) {
		stringDay = "Sunday";
	}
	else if (current === 1) {
		stringDay = "Monday";
	}
	else if (current === 2) {
		stringDay = "Tuesday";
	}
	else if (current === 3) {
		stringDay = "Wednesday";
	}
	else if (current === 4) {
		stringDay = "Thursday";
	}
	else if (current === 5) {
		stringDay = "Friday";
	}
	else {
		stringDay = "Saturday";
	}
	return stringDay;
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
	var month = currentMonth();
	var day = currentDay();
	var year = currentYear();
	var currentDate = [month,day,year];

	while (i > 0) {
		currentDate = increment(currentDate);
		i--;
	}
	var stringDate = currentDate[0] + "/" + currentDate[1] + "/" + currentDate[2];
	return stringDate;
};

$(document).on('ready', function() {

	var day = dayOfTheWeek();
	

	for (var i = 0; i < 7; i++) {
		var dayBox = $("<div class='day'></div>");
		// var current = "day" + i;
		// $(".week").append(dayBox.attr("id", current));
		$(".week").append(dayBox);
		var now = stringDay(day, i);
		$("div").last().append("<div class='dayOfTheWeek'>" + now + "</div>").append("<div class='date'>" + completeDate(i) + "</div>").append('<hr>')
						.append("<p class='addNew'>Click To Add New Appointment</p>");
	}

	$(".addNew").hover(function() {
			$(this).css("color", "salmon");
		}, function() {
			$(this).css("color", "#666666");
		});
	
	$(".day").on('click', function() {
		$(this).append($(".newAppointment"));
		$(".newAppointment").slideToggle();
		$(this).find('p').slideToggle();

		$(".newAppointment").on('click', function(e) {
			e.stopPropagation();
		})
	})

	$("button").on('click', function(e) {
		e.preventDefault();
		$(".newAppointment").slideToggle();
		$(this).closest('.day').find('p').slideToggle();

		if($(this).is("#submit")) {
			var location = $(this).closest(".newAppointment");
			var title = location.find("#title").val();
			var location = location.find("#location").val();
			// var start = location.find("#start").val();
			console.log(title);
			console.log(location);
			// console.log(start)
		}
	});

});