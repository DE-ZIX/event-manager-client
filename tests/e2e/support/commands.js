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
	'imagesShouldEqual',
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
			});
	},
);
