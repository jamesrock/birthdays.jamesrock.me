(function() {

	var
	birthdays = [],
	Birthday = function(date, name) {

		this.date = date;
		this.name = name;
		this.newDate = new Date(date.split('/').reverse().join('/'));

	},
	createBirthday = function(date, name) {

		birthdays.push(new Birthday(date, name));

	},
	render = function() {

		var
		out = '';

		birthdays.forEach(function(birthday) {

			out += birthday.toHTML();

		});

		root.innerHTML = out;

		return out;

	},
	renderSorterSelect = function() {

		var
		out = document.createElement('select');

		Object.keys(sorters).forEach(function(item) {

			var
			option = document.createElement('option');

			option.value = item;
			option.innerHTML = item;

			out.appendChild(option);

		});

	},
	sorters = {
		DOB: ROCK.SORT.NUMBER_ASCENDING(function() {
			return this.getTime();
		}),
		NEXT: ROCK.SORT.NUMBER_ASCENDING(function() {
			return this.getDifference(today);
		})
	},
	sorter = 'NEXT',
	today = new Date(),
	months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];

	Birthday.prototype.getTime = function() {

		return this.newDate.getTime();

	};
	Birthday.prototype.getFullYear = function() {

		return this.newDate.getFullYear();

	};
	Birthday.prototype.getDisplayDate = function(omitYear, omitAge) {

		var
		out = this.date.split('/'),
		joiner = ' ';

		if(omitYear) {
			out.pop();
		};

		if(!omitAge) {
			out.push(ROCK.TIME.getYears(this.getDiff(today)));
		};

		out[1] = months[this.newDate.getMonth()];

		out = out.join(joiner);

		return out;

	};
	Birthday.prototype.getDiff = function(date) {

		var
		todayTime = date.getTime(),
		birthdayTime = this.getTime();
		return (todayTime-birthdayTime);

	};
	Birthday.prototype.getDifference = function(date) {

		// console.group(this.name);

		var
		origYear = this.getFullYear(),
		year = date.getFullYear(),
		todayTime = date.getTime(),
		birthdayTime,
		passed = false,
		days = 0,
		diff = 0;

		this.newDate.setYear(year);

		birthdayTime = this.getTime();
		diff = (birthdayTime-todayTime);

		if(diff<0) {
			year ++;
			passed = true;
			this.newDate.setYear(year);
		};

		birthdayTime = this.getTime();
		diff = (birthdayTime-todayTime);

		if(!passed) {
			diff += ROCK.TIME.getDay();
		};

		days = ROCK.TIME.getDaysInYear(diff);

		this.newDate.setYear(origYear);

		// console.groupEnd(this.name);

		return days;

	};
	Birthday.prototype.toHTML = function() {

		var
		omitYear = sorter==='NEXT',
		name = this.name,
		date = this.getDisplayDate(omitYear, !omitYear),
		diff = this.getDifference(today);

		return `<div>${name} ${date} ${diff}</div>`;

	};

	createBirthday('08/01/1989', 'Me');
	createBirthday('02/12/1980', 'Alice');
	createBirthday('26/03/2013', 'Harris');
	createBirthday('18/04/2015', 'Arran');
	createBirthday('23/11/1993', 'Charlotte');
	createBirthday('04/06/1999', 'Thomas');
	createBirthday('04/12/1967', 'Mum');
	createBirthday('23/06/1946', 'Gran');
	createBirthday('04/09/1945', 'Granddad');
	createBirthday('20/10/2014', 'Dollie-Mae');
	createBirthday('27/07/1955', 'Amanda');
	createBirthday('10/01/1954', 'Charles');
	createBirthday('10/10/2017', 'Bliss');
	// createBirthday('', 'Alan');
	// createBirthday('', 'Neil');
	// createBirthday('', 'Ash');

	birthdays.sort(sorters[sorter]);

	console.log('birthdays', birthdays);
	// console.log('today', today);

	render();
	// renderSorterSelect();

})();
