// https://docs.cypress.io/api/introduction/api.html

describe('Home basic test', () => {
	it('Visits the app root url', () => {
		cy.visit('/');
		cy.get('#resource_list').should('exist');
		cy.get('#event_list').should('exist');
		cy.get('#class_list').should('exist');
	});
});
