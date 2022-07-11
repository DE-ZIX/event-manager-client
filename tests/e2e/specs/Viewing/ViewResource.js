import mockData from '@tests/e2e/mock/Viewing/viewResource.json';
const apiHost = Cypress.env('event_manager_api_host');
const useMock = Cypress.env('use_mock');

const resourcesRoute = {
	headers: { host: apiHost },
	pathname: '/resources',
};

const getRoute = {
	method: 'GET',
	headers: { host: apiHost },
	pathname: '/resources/*',
};

describe('View Resource Test', () => {
	it('Tests viewing resource through row', () => {
		if (useMock) {
			cy.intercept(resourcesRoute, {
				statusCode: 200,
				body: mockData,
			}).as('getResources');
		} else {
			cy.intercept(resourcesRoute).as('getResources');
		}
		if (useMock) {
			cy.intercept(getRoute, {
				statusCode: 200,
				body: mockData,
			}).as('getResource');
		} else {
			cy.intercept(getRoute).as('getResource');
		}
		cy.visit('/resources');

		cy.wait('@getResources').then((res) => {
			cy.get('#resource_list').should('exist');
			cy.wrap(res.response.statusCode).should('eq', 200);
			cy.wrap(res.response.body).should('have.property', 'items');
			const { items } = res.response.body;
			cy.wrap(items).its('length').should('be.gt', 0);
			cy.get('#resource_list tr').first().should('exist');
			const firstItem = items[0];
			cy.wrap(firstItem).should('have.property', 'id');
			cy.get('#resource_list tr').eq(1).click();
		});

		cy.wait('@getResource').then((res) => {
			cy.wrap(res.response.statusCode).should('eq', 200);
			const resource = res.response.body;
			cy.resourceUtils.checkResourceResponse(resource);
			cy.resourceUtils.checkResourceView(resource);
		});
	});

	it('Tests viewing resource through new tab button', () => {
		if (useMock) {
			cy.intercept(resourcesRoute, {
				statusCode: 200,
				body: mockData,
			}).as('getResources');
		} else {
			cy.intercept(resourcesRoute).as('getResources');
		}
		cy.visit('/resources');
		cy.wait('@getResources').then(() => {
			cy.get('#resource_list tr')
				.eq(1)
				.within(() => {
					cy.get('td')
						.last()
						.within(() => {
							cy.get('#open_in_new_link').should(
								'have.attr',
								'target',
								'_blank',
							);
						});
				});
		});
	});
});
