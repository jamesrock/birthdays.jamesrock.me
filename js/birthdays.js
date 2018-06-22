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
	cycleSorter = function() {

		sorter = getNextInCycle();

		birthdays.sort(sorters[sorterKeys[sorter]]);

		render();

	},
	getNextInCycle = function() {

		var
		out = sorter;

		if(sorter===maxSorters) {
			out = 0;
		}
		else {
			out ++;
		};

		return out;

	},
	render = function() {

		var
		birthdaysMarkup = '',
		nextView = sorterLabels[sorterKeys[getNextInCycle()]];

		birthdays.forEach(function(birthday) {

			birthdaysMarkup += birthday.toHTML();

		});

		out = `<div><div class="birthdays">${birthdaysMarkup}</div><div class="foot"><button id="sorterCycle">${nextView}</button></div></div>`;

		root.innerHTML = out;

		return out;

	},
	sorters = {
		DOB: ROCK.SORT.NUMBER_ASCENDING(function() {
			return this.getTime();
		}),
		NEXT: ROCK.SORT.NUMBER_ASCENDING(function() {
			return this.getDifference(today);
		})
	},
	sorter = 1,
	sorterKeys = Object.keys(sorters),
	sorterLabels = {
		DOB: 'sort by date of birth',
		NEXT: 'sort by next occurrence'
	},
	maxSorters = (sorterKeys.length-1),
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
	Birthday.prototype.setFullYear = function(year) {

		return this.newDate.setFullYear(year);

	};
	Birthday.prototype.getDisplayDate = function(omitYear, currentAge) {

		var
		out = this.date.split('/').reverse(),
		joiner = ' ',
		age = this.getAge(today, !currentAge);

		if(omitYear) {
			out.pop();
		};

		out.push(age);

		out[1] = months[this.newDate.getMonth()];

		out = out.join(joiner);

		return out;

	};
	Birthday.prototype.getAge = function(date, nextAge) {

		// console.log(this.name, nextAge);

		var
		todayTime = date.getTime(),
		birthdayTime = this.getTime(),
		diff = (todayTime-birthdayTime),
		sameMonth = (this.getMonth()===date.getMonth()),
		passed = this.passed;

		// console.log('sameMonth', sameMonth);
		// console.log('passed', passed);
		// console.log('birthdayTime', birthdayTime);

		if(nextAge) {
			diff += ROCK.TIME.getYear();
		};

		if(sameMonth&&!passed) {
			diff -= ROCK.TIME.getYear();
		};

		return ROCK.TIME.getYears(diff);

	};
	Birthday.prototype.getDifference = function(date) {

		// console.group(this.name);

		var
		birthday = this,
		birthdayTime = 0,
		birthdayYear = birthday.getFullYear(),
		todayTime = date.getTime(),
		todayYear = date.getFullYear(),
		days = 0,
		diff = 0,
		calc = function() {
			birthdayTime = birthday.getTime();
			diff = (birthdayTime-todayTime);
		};

		this.setFullYear(todayYear);

		calc();

		if(diff<0) {
			todayYear ++;
			this.passed = true;
			this.newDate.setFullYear(todayYear);
			calc();
		};

		if(!this.passed) {
			diff += ROCK.TIME.getDay();
		};

		days = ROCK.TIME.getDaysInYear(diff);

		this.next = this.getTime();

		this.setFullYear(birthdayYear);

		// console.groupEnd(this.name);

		return days;

	};
	Birthday.prototype.toHTML = function() {

		var
		omitYear = (sorter===1),
		name = this.name,
		diff = this.getDifference(today),
		date = this.getDisplayDate(omitYear, !omitYear);

		if(!omitYear) {
			diff = '';
		};

		return `<div class="birthday">${name} ${date} ${diff}</div>`;

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

	birthdays.sort(sorters[sorterKeys[sorter]]);

	// console.log('birthdays', birthdays);
	// console.log('sorterKeys', sorterKeys);
	// console.log('today', today);

	root.addEventListener('click', function(event) {

		switch(event.target.id) {
			case 'sorterCycle':

				cycleSorter();

			break;
			default:
			 	// do nothing
		};

	});

	render();

})();
