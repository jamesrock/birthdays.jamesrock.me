(function() {

	var
	birthdays = [],
	Birthday = function(date, name) {

		var
		dateString = date.split('/').reverse().join('/');

		this.date = date;
		this.name = name;
		this.newDate = new Date(dateString);

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
	Birthday.prototype.getMonth = function() {

		return this.newDate.getMonth();

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
			out.push(this.getAge(today));
		};

		out[1] = months[this.newDate.getMonth()];

		out = out.join(joiner);

		return out;

	};
	Birthday.prototype.getAge = function(date) {

		// console.log(this.name);

		var
		todayTime = date.getTime(),
		birthdayTime = this.getTime(),
		diff = (todayTime-birthdayTime),
		sameMonth = (this.getMonth()===date.getMonth()),
		passed = this.passed;

		// console.log('sameMonth', sameMonth);
		// console.log('passed', passed);
		// console.log('birthdayTime', birthdayTime);

		diff += ROCK.TIME.getYear();

		if(sameMonth&&!passed) {
			diff -= ROCK.TIME.getYear();
		};

		return ROCK.TIME.getYears(diff);

	};
	Birthday.prototype.getDifference = function(date) {

		// console.group(this.name);

		var
		origYear = this.getFullYear(),
		year = date.getFullYear(),
		todayTime = date.getTime(),
		birthdayTime,
		days = 0,
		diff = 0;

		this.newDate.setYear(year);

		birthdayTime = this.getTime();
		diff = (birthdayTime-todayTime);

		if(diff<0) {
			year ++;
			this.passed = true;
			this.newDate.setYear(year);
		};

		birthdayTime = this.getTime();
		diff = (birthdayTime-todayTime);

		if(!this.passed) {
			diff += ROCK.TIME.getDay();
		};

		days = ROCK.TIME.getDaysInYear(diff);

		this.next = this.getTime();

		this.newDate.setFullYear(origYear);

		// console.groupEnd(this.name);

		return days;

	};
	Birthday.prototype.toHTML = function() {

		var
		omitYear = sorter==='NEXT',
		name = this.name,
		diff = this.getDifference(today),
		date = this.getDisplayDate(omitYear, !omitYear);

		return `<div>${name} ${date} ${diff}</div>`;

	};
	Birthday.prototype.passed = false;
	Birthday.prototype.next = null;

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
