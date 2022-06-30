const apiHost = Cypress.env('event_manager_api_host');

describe('Events listing test', () => {
	it('Tests events listing', () => {
		cy.intercept({ headers: { host: apiHost }, pathname: '/events' }).as(
			'getEvents',
		);
		cy.visit('/events');
		cy.wait('@getEvents').then((res) => {
			cy.get('#event_list').should('exist');
			cy.wrap(res.response.statusCode).should('eq', 200);
			cy.wrap(res.response.body).should('have.property', 'items');
			const { items } = res.response.body;
			cy.wrap(items).its('length').should('be.gt', 0);
			cy.get('#event_list tr').first().should('exist');
			// expect(res.response.body).to.have.property('items');
			// expect(items).to.have.length.greaterThan(0);
			// cy.wrap(items).as('items');
			const firstItem = items[0];
			cy.wrap(firstItem).should('have.property', 'id');
			// expect(firstItem).to.have.property('id');
			cy.wrap(firstItem).as('firstItem');
			// eq(1) because of the header row
			cy.get('#event_list tr')
				.eq(1)
				.within(() => {
					cy.get('td').eq(0).should('contain', firstItem.id);
					cy.get('td').eq(1).should('contain', firstItem.title);
					cy.get('td').eq(2).should('contain', firstItem.description);
					cy.get('td').eq(3).should('contain', firstItem.startDate);
					cy.get('td').eq(4).should('contain', firstItem.endDate);
				});
		});
	});
});
