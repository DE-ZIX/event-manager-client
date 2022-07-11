// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add(
	'imagesShouldBeEqual',
	{
		prevSubject: true,
	},
	(subject, fixtureImage, base64) => {
		cy.wrap(subject)
			.should(([img]) => {
				expect(img.complete).to.be.true;
			})
			.should('be.visible')
			.should(([img]) => {
				expect(img.naturalWidth).to.be.greaterThan(0);
				expect(img.naturalHeight).to.be.greaterThan(0);
			})
			.then(([img]) => {
				if (fixtureImage) {
					cy.fixture(fixtureImage).then((fixture) => {
						if (base64) {
							expect(base64).to.equal(fixture);
						}
						const fixtureImg = new Image();
						fixtureImg.src = `data:image/jpeg;base64,${fixture}`;
						return new Promise((resolve) => {
							fixtureImg.onload = () => {
								cy.wrap(img.naturalHeight).should(
									'equal',
									fixtureImg.naturalHeight,
								);
								cy.wrap(img.naturalWidth).should(
									'equal',
									fixtureImg.naturalWidth,
								);
								resolve();
							};
						});
					});
				}
			});
	},
);

Cypress.Commands.add(
	'checkSameDay',
	{ prevSubject: 'optional' },
	(subject1, subject2 = new Date()) => {
		cy.wrap(
			subject1.getFullYear() === subject2.getFullYear() &&
				subject1.getMonth() === subject2.getMonth() &&
				subject1.getDate() === subject2.getDate(),
		);
	},
);

Cypress.Commands.add(
	'getDateFromString',
	{ prevSubject: 'optional' },
	(subject) => {
		const dateParts = subject.split('/');
		// month is 0-based, that's why we need dataParts[1] - 1
		const date = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
		cy.wrap(date);
	},
);

Cypress.Commands.add('addOneDay', { prevSubject: 'optional' }, (subject) => {
	cy.wrap(subject)
		.getDateFromString()
		.then((date) => {
			date.setDate(date.getDate() + 1);
			const yyyy = date.getFullYear();
			let mm = date.getMonth() + 1;
			let dd = date.getDate();
			if (dd < 10) dd = '0' + dd;
			if (mm < 10) mm = '0' + mm;
			cy.wrap(dd + '/' + mm + '/' + yyyy);
		});
});

Cypress.Commands.add(
	'dateShouldGreaterThen',
	{ prevSubject: 'optional' },
	(subject, date) => {
		const isNewDateGreater = subject > date;
		cy.wrap(isNewDateGreater).should('be.true');
	},
);

Cypress.Commands.add(
	'buildInterceptRouteConfig',
	{ prevSubject: false },
	(config, mock, name) => {
		const apiHost = Cypress.env('event_manager_api_host');
		const useMock = Cypress.env('use_mock');
		if (typeof config === 'string') {
			config = { pathname: config };
		}
		if (!config.headers) {
			config.headers = {};
		}
		config.headers.host = apiHost;
		config.name = config.name || name;

		const route = {};
		route.headers = config.headers;
		if (config.pathname) route.pathname = config.pathname;
		if (config.method) route.method = config.method;

		let result = {};
		if (useMock) {
			result = {
				route,
				res: {
					statusCode: config.code || 200,
					body: config.mock || mock || {},
				},
				name: config.name,
			};
		} else {
			result = { route, name: config.name };
		}
		cy.wrap(result);
	},
);

Cypress.Commands.add(
	'interceptAPIRoute',
	{
		prevSubject: false,
	},
	(config, mock, name) => {
		cy.buildInterceptRouteConfig(config, mock, name).then((newConfig) => {
			if (newConfig.res) {
				cy.intercept(newConfig.route, newConfig.res).as(newConfig.name);
			} else {
				cy.intercept(newConfig.route).as(newConfig.name);
			}
		});
	},
);
