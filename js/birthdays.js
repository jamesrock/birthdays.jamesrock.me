(function() {

	var
	root = document.getElementById('root'),
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

	};

	Birthday.prototype.getSortableDate = function() {

		return this.date.split('/').reverse().join('');

	};
	Birthday.prototype.toHTML = function() {

		return `<div>${this.name}</div>`;

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

	birthdays.sort(ROCK.SORT.NUMBER_ASCENDING(function() {
		return this.getSortableDate();
	}));

	render();

})();
