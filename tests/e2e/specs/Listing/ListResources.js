import mockData from '@tests/e2e/mock/Listing/resources.json';

const apiHost = Cypress.env('event_manager_api_host');
const useMock = Cypress.env('use_mock');
const mock = {
	statusCode: 200,
	body: {
		items: mockData,
	},
};

describe('Resources listing test', () => {
	it('Tests resources listing', () => {
		const route = { headers: { host: apiHost }, pathname: '/resources' };
		if (useMock) {
			cy.intercept(route, mock).as('getResources');
		} else {
			cy.intercept(route).as('getResources');
		}
		cy.visit('/resources');
		cy.wait('@getResources').then((res) => {
			cy.get('#resource_list').should('exist');
			cy.wrap(res.response.statusCode).should('eq', 200);
			cy.wrap(res.response.body).should('have.property', 'items');
			const { items } = res.response.body;
			cy.wrap(items).its('length').should('be.gt', 0);
			cy.get('#resource_list tr').first().should('exist');
			// expect(res.response.body).to.have.property('items');
			// expect(items).to.have.length.greaterThan(0);
			// cy.wrap(items).as('items');
			const firstItem = items[0];
			cy.wrap(firstItem).should('have.property', 'id');
			// expect(firstItem).to.have.property('id');
			cy.wrap(firstItem).as('firstItem');
			// eq(1) because of the header row
			cy.get('#resource_list tr')
				.eq(1)
				.within(() => {
					cy.get('td').eq(0).should('contain', firstItem.id);
					cy.get('td').eq(1).should('contain', firstItem.title);
					cy.get('td').eq(2).should('contain', firstItem.description);
					cy.get('td').eq(3).should('contain', firstItem.link);
					// cy.get('td').eq(4).should('contain', firstItem.id);
					cy.get('td').eq(5).should('contain', firstItem.createdDate);
					cy.get('td').eq(6).should('contain', firstItem.updatedDate);
					cy.get('td')
						.eq(7)
						.should('contain', ...firstItem.keywords);
				});
		});
	});
});
