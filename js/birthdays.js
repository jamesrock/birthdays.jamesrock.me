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
	getDate = function(omitYear) {

		var
		out,
		date = new Date(),
		day = date.getDate(),
		month = date.getMonth(),
		year = date.getFullYear();

		month ++;

		day = ROCK.NUMBER.toDouble(day);
		month = ROCK.NUMBER.toDouble(month);

		out = [day, month];

		if(!omitYear) {
			out.push(year);
		};

		out = out.join('/');

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
			return this.getSortableDate();
		}),
		NEXT: ROCK.SORT.NUMBER_ASCENDING(function() {
			return this.getSortableDate(true);
		})
	},
	sorter = 'NEXT';

	Birthday.prototype.getSortableDate = function(omitYear) {

		var
		out = this.date.split('/');

		if(omitYear) {
			out.pop();
		};

		return out.reverse().join('');

	};
	Birthday.prototype.getDate = function(omitYear) {

		var
		out = this.date.split('/');

		if(omitYear) {
			out.pop();
		};

		return out.join('/');

	};
	Birthday.prototype.toHTML = function() {

		var
		name = this.name,
		date = this.getDate(sorter==='NEXT');

		return `<div>${name} ${date}</div>`;

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

	// console.log('getDate()', getDate());

	birthdays.sort(sorters[sorter]);

	render();
	renderSorterSelect();

})();
