'format cjs';

const wrap = require('word-wrap');

const filter = function (array) {
	return array.filter(function (x) {
		return x;
	});
};

const requiredInput = (value) => Boolean(typeof value === 'string' && value !== '');
const addTicket = (ticket) => (ticket && ticket !== '' ? ` [${ticket.trim()}]` : '');

// This can be any kind of SystemJS compatible module.
// We use Commonjs here, but ES6 or AMD would do just
// fine.
module.exports = function (options) {
	const types = options.types;

	const length = Math.max(...Object.keys(types).map(key => key.length)) + 1;
	const choices = Object.entries(types).map(([key, type]) => {
		return {
			name: (key + ':').padEnd(length, ' ') + ' ' + type.description,
			value: key,
		};
	});

	return {
		// When a user runs `git cz`, prompter will
		// be executed. We pass you cz, which currently
		// is just an instance of inquirer.js. Using
		// this you can ask questions and get answers.
		//
		// The commit callback should be executed when
		// you're ready to send back a commit template
		// to git.
		//
		// By default, we'll de-indent your commit
		// template and will keep empty lines.
		prompter: function (cz, commit) {
			console.log(
				'\nLine 1 will be cropped at 120 characters. All other lines will be wrapped after 120 characters.\n',
			);

			// Let's ask some questions of the user
			// so that we can populate our commit
			// template.
			//
			// See inquirer.js docs for specifics.
			// You can also opt to use another input
			// collection library if you prefer.
			cz.prompt([
				{
					type: 'list',
					name: 'type',
					message: "Select the type of change that you're committing:",
					choices: choices,
				},
				{
					type: 'input',
					name: 'scope',
					message: 'What is the scope of this change (e.g. component or file name)? (press enter to skip)\n',
				},
				{
					type: 'input',
					name: 'ticket',
					message: 'Add ticket number (e.g. "PROJECT-1234".):\n',
				},
				{
					type: 'input',
					name: 'subject',
					message: 'Write a short, imperative tense description of the change:\n',
					validate: requiredInput,
				},
				{
					type: 'input',
					name: 'body',
					message: 'Provide a longer description of the change: (press enter to skip)\n',
				},
				{
					type: 'confirm',
					name: 'isBreaking',
					message: 'Are there any breaking changes?',
					default: false,
				},
				{
					type: 'input',
					name: 'breaking',
					message: 'Describe the breaking changes:\n',
					validate: requiredInput,
					when: function (answers) {
						return answers.isBreaking;
					},
				},
			]).then(function (answers) {
				const maxLineWidth = 120;

				const wrapOptions = {
					trim: true,
					newline: '\n',
					indent: '',
					width: maxLineWidth,
				};

				// parentheses are only needed when a scope is present
				let scope = answers.scope.trim();
				scope = scope ? '(' + answers.scope.trim() + ')' : '';

				// Apply breaking change prefix, removing it if already present
				let breaking = answers.breaking ? answers.breaking.trim() : '';
				breaking = breaking ? 'BREAKING CHANGE: ' + breaking.replace(/^BREAKING CHANGE: /, '') : '';
				breaking = wrap(breaking, wrapOptions);

				const head = `${answers.type}${scope}: ${answers.subject.trim()}${addTicket(answers.ticket)}`.slice(
					0,
					maxLineWidth,
				);
				const body = wrap(answers.body, wrapOptions);
				const footer = filter([breaking]).join('\n\n');

				commit(head + '\n\n' + body + '\n\n' + footer);
			});
		},
	};
};
