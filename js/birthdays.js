(function() {

	var
	birthdays = [],
	Birthday = function(date, name) {

		this.date = date;
		this.name = name;

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
	getDate = function(omitYear, asNumber) {

		var
		out,
		date = new Date(),
		day = date.getDate(),
		month = date.getMonth(),
		year = date.getFullYear(),
		joiner = '/';

		month ++;

		day = ROCK.NUMBER.toDouble(day);
		month = ROCK.NUMBER.toDouble(month);

		out = [day, month];

		if(!omitYear) {
			out.push(year);
		};

		if(asNumber) {
			joiner = '';
			out = out.reverse();
		};

		out = out.join(joiner);

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
	checkDates = function() {

		return birthdays.forEach(function(birthday) {

			// birthday.setDifference();

		});

	},
	sorters = {
		DOB: ROCK.SORT.NUMBER_ASCENDING(function() {
			return this.getDate(false, true);
		}),
		NEXT: ROCK.SORT.NUMBER_ASCENDING(function() {
			return this.getDate(true, true);
		})
	},
	sorter = 'NEXT',
	today = getDate(true, true);

	Birthday.prototype.getDate = function(omitYear, asNumber) {

		var
		out = this.date.split('/'),
		joiner = '/';

		if(omitYear) {
			out.pop();
		};

		if(asNumber) {
			joiner = '';
			out = out.reverse();
		};

		out = out.join(joiner);

		return out;

	};
	Birthday.prototype.getDifference = function(date) {

		return this.getDate(true, true)-date;

	};
	Birthday.prototype.toHTML = function() {

		var
		name = this.name,
		date = this.getDate(sorter==='NEXT'),
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
	// createBirthday('02/12/1980', 'Alan');
	// createBirthday('02/12/1980', 'Neil');
	// createBirthday('02/12/1980', 'Ash');
	// createBirthday('02/12/1980', 'Bliss');

	console.log('today', today);

	birthdays.sort(sorters[sorter]);

	// checkDates();
	render();
	// renderSorterSelect();

})();
