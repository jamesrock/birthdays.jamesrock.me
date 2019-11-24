(function() {

	var
	Birthday = function(date, name) {

		this.date = date;
		this.name = name;
		this.newDate = new Date(date);

	},
	createBirthday = function(date, name) {

		birthdays.push(new Birthday(date, name));

	},
	createSortedLabel = function(id, label) {

		sortedLabels[id] = `sorted by <span class="view-type">${label}</span>`;
		return sortedLabels[id];

	},
	createSorterLabel = function(id, label) {

		sorterLabels[id] = `sort by <span class="view-type sorter-cycle">${label}</span>`;
		return sorterLabels[id];

	},
	createLabels = function(id, label) {

		createSortedLabel(id, label);
		createSorterLabel(id, label);

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
		nextView = sorterLabels[sorterKeys[getNextInCycle()]],
		currentView = sortedLabels[sorterKeys[sorter]];

		birthdays.forEach(function(birthday) {

			birthdaysMarkup += birthday.render();

		});

		out = `\
			<div class="birthdays">${birthdaysMarkup}</div>\
			<div class="foot">\
				<div class="current-view">${currentView}</div>\
				<div class="next-view"><a href="#" class="sorter-cycle">${nextView}</a></div>\
			</div>`;

		root.innerHTML = out;

		return out;

	},
	delegate = function(selector, event, handler) {

		var
		items,
		loop;

		document.documentElement.addEventListener(event, function(event) {

			items = document.querySelectorAll(selector);
			loop = items.length;

			while(loop--) {

				if(event.target===items[loop]) {
					handler.call(items, event);
				};

			};

		});

		return items;

	},
	birthdays = [],
	sorters = {
		NEXT: ROCK.SORT.NUMBER_ASCENDING(function() {
			return this.getDifference(today);
		}),
		DOB: ROCK.SORT.NUMBER_ASCENDING(function() {
			return this.getTime();
		}),
		AGE: ROCK.SORT.NUMBER_ASCENDING(function() {
			return this.getAge(today);
		})
	},
	sorter = 0,
	sorterKeys = [
		'NEXT',
		'DOB',
		'AGE'
	],
	sorterLabels = {},
	sortedLabels = {},
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
		joiner = ' ';

		if(omitYear) {
			out.pop();
		};

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

		return diff;

	};
	Birthday.prototype.getDisplayAge = function(date, nextAge) {

		return ROCK.TIME.getYears(this.getAge(date, nextAge));

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
	Birthday.prototype.getName = function() {

		return `<span>${this.name}</span>`;

	};
	Birthday.prototype.render = function() {

		var
		omitYear = (sorter===0),
		name = this.getName(),
		diff = this.getDifference(today),
		date = this.getDisplayDate(omitYear, !omitYear),
		age = this.getDisplayAge(today, omitYear),
		out = [name, date, age, diff];

		if(!omitYear) {
			// diff = '';
			out.pop();
		};

		out = out.join(' &#8226; ');

		return `<div class="birthday">${out}</div>`;

	};
	Birthday.prototype.passed = false;
	Birthday.prototype.next = null;

	createLabels('DOB', 'date of birth');
	createLabels('NEXT', 'occurrence');
	createLabels('AGE', 'age');

	createBirthday('1979/02/17', 'Eve');
	createBirthday('1989/01/08', 'Me');
	createBirthday('1980/12/02', 'Alice');
	createBirthday('1999/06/04', 'Thomas');
	createBirthday('1993/11/23', 'Charlotte');
	createBirthday('2013/03/26', 'Harris');
	createBirthday('2015/04/18', 'Arran');
	createBirthday('1967/12/04', 'Mum');
	createBirthday('1946/06/23', 'Gran');
	createBirthday('1945/09/04', 'Granddad');
	createBirthday('2014/10/20', 'Dollie-Mae');
	createBirthday('1955/07/27', 'Amanda');
	createBirthday('1954/01/10', 'Charles');
	createBirthday('2017/10/11', 'Bliss');
	// createBirthday('', 'Laila');
	// createBirthday('', 'Steffie');
	// createBirthday('', 'Neil');
	// createBirthday('', 'Ash');

	birthdays.sort(sorters[sorterKeys[sorter]]);

	// console.log('birthdays', birthdays);
	// console.log('sorterKeys', sorterKeys);
	// console.log('today', today);

	render();

	delegate('.sorter-cycle', 'click', function(event) {

		event.preventDefault();
		cycleSorter();

	});

})();
