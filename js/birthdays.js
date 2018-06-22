(function() {

	var
	birthdays = [],
	Birthday = function(date, name) {

		this.date = date;
		this.name = name;
		this.newDate = new Date(date);

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
		out = this.date.split('/').reverse(),
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

	createBirthday('1989/01/08', 'Me');
	createBirthday('1980/12/02', 'Alice');
	createBirthday('2013/03/26', 'Harris');
	createBirthday('2015/04/18', 'Arran');
	createBirthday('1993/11/23', 'Charlotte');
	createBirthday('1999/06/04', 'Thomas');
	createBirthday('1967/12/04', 'Mum');
	createBirthday('1946/06/23', 'Gran');
	createBirthday('1945/09/04', 'Granddad');
	createBirthday('2014/10/20', 'Dollie-Mae');
	createBirthday('1955/07/27', 'Amanda');
	createBirthday('1954/01/10', 'Charles');
	createBirthday('2017/10/10', 'Bliss');
	// createBirthday('', 'Alan');
	// createBirthday('', 'Neil');
	// createBirthday('', 'Ash');

	birthdays.sort(sorters[sorter]);

	console.log('birthdays', birthdays);
	// console.log('today', today);

	render();
	// renderSorterSelect();

})();
