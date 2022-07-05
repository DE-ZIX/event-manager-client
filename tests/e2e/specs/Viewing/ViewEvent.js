import mockData from '@tests/e2e/mock/Viewing/viewEvent.json';

const apiHost = Cypress.env('event_manager_api_host');
const useMock = Cypress.env('use_mock');

const eventsRoute = {
	headers: { host: apiHost },
	pathname: '/events',
};

const getRoute = {
	method: 'GET',
	headers: { host: apiHost },
	pathname: '/events/*',
};

describe('View Event Test', () => {
	it('Tests viewing event through row', () => {
		cy.visit('/events');

		if (useMock) {
			cy.intercept(eventsRoute, {
				statusCode: 200,
				body: mockData,
			}).as('getEvents');
			cy.intercept(getRoute, {
				statusCode: 200,
				body: mockData.items[0],
			}).as('getEvent');
		} else {
			cy.intercept(eventsRoute).as('getEvents');
			cy.intercept(getRoute).as('getEvent');
		}

		cy.wait('@getEvents').then((res) => {
			cy.get('#event_list').should('exist');
			cy.wrap(res.response.statusCode).should('eq', 200);
			cy.wrap(res.response.body).should('have.property', 'items');
			const { items } = res.response.body;
			cy.wrap(items).its('length').should('be.gt', 0);
			cy.get('#event_list tr').first().should('exist');
			const firstItem = items[0];
			cy.wrap(firstItem).should('have.property', 'id');
			cy.get('#event_list tr').eq(1).click();
		});

		cy.wait('@getEvent').then((res) => {
			cy.wrap(res.response.statusCode).should('eq', 200);
			const event = res.response.body;
			cy.wrap(event).should('have.property', 'id');
			cy.wrap(event).should('have.property', 'title');
			cy.wrap(event).should('have.property', 'description');
			cy.wrap(event).should('have.property', 'startDate');
			cy.wrap(event).should('have.property', 'endDate');
			cy.get('#event_id').should('contain', event.id);
			cy.get('#event_title').should('contain', event.title);
			cy.get('#event_description').should('contain', event.description);
			cy.get('#event_start_date').should('contain', event.startDate);
			cy.get('#event_end_date').should('contain', event.endDate);
		});
	});

	it('Tests viewing event through link', () => {
		cy.visit('/events');
		if (useMock) {
			cy.intercept(eventsRoute, {
				statusCode: 200,
				body: mockData,
			}).as('getEvents');
		} else {
			cy.intercept(eventsRoute).as('getEvents');
		}

		cy.wait('@getEvents').then(() => {
			cy.get('#event_list tr')
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
