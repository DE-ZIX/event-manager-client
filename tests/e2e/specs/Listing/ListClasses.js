const apiHost = Cypress.env('event_manager_api_host');

describe('Classes listing test', () => {
	it('Tests classes listing', () => {
		cy.intercept({ headers: { host: apiHost }, pathname: '/classes' }).as(
			'getClasses',
		);
		cy.visit('/classes');
		cy.wait('@getClasses').then((res) => {
			cy.get('#class_list').should('exist');
			cy.wrap(res.response.statusCode).should('eq', 200);
			cy.wrap(res.response.body).should('have.property', 'items');
			const { items } = res.response.body;
			cy.wrap(items).its('length').should('be.gt', 0);
			cy.get('#class_list tr').first().should('exist');
			const firstItem = items[0];
			cy.wrap(firstItem).should('have.property', 'id');
			cy.get('#class_list tr')
				.eq(1)
				.within(() => {
					cy.get('td').eq(0).should('contain', firstItem.id);
					cy.get('td').eq(1).should('contain', firstItem.title);
					cy.get('td').eq(2).should('contain', firstItem.updatedAt);
				});
		});
	});
});
