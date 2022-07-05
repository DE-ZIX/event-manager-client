import mockData from '@tests/e2e/mock/Listing/events.json';
const apiHost = Cypress.env('event_manager_api_host');
const useMock = Cypress.env('use_mock');
const mock = {
	statusCode: 200,
	body: {
		items: mockData,
	},
};

describe('Events listing test', () => {
	it('Tests events listing', () => {
		const route = { headers: { host: apiHost }, pathname: '/events' };
		if (useMock) {
			cy.intercept(route, mock).as('getEvents');
		} else {
			cy.intercept(route).as('getEvents');
		}
		cy.visit('/events');
		cy.wait('@getEvents').then((res) => {
			cy.get('#event_list').should('exist');
			cy.wrap(res.response.statusCode).should('eq', 200);
			cy.wrap(res.response.body).should('have.property', 'items');
			const { items } = res.response.body;
			cy.wrap(items).its('length').should('be.gt', 0);
			cy.get('#event_list tr').first().should('exist');
			const firstItem = items[0];
			cy.wrap(firstItem).should('have.property', 'id');
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
