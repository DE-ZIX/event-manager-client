import listMockData from '@tests/e2e/mock/Editing/listResource.json';

const apiHost = Cypress.env('event_manager_api_host');
const useMock = Cypress.env('use_mock');
const listRoute = {
	headers: { host: apiHost },
	pathname: '/events',
};
const getRoute = {
	method: 'GET',
	headers: { host: apiHost },
	pathname: '/events/*',
};
const putRoute = {
	method: 'PUT',
	headers: { host: apiHost },
	pathname: '/events',
};
const fields = {
	title: 'Test Event (Edited)',
	description: 'Test event description (Edited)',
};

describe('Test Editing Event', () => {
	it('Tests editing event', () => {
		if (useMock) {
			cy.intercept(listRoute, {
				statusCode: 200,
				body: listMockData,
			}).as('listEvent');
			cy.intercept(getRoute, {
				statusCode: 200,
				body: listMockData[0],
			}).as('getEvent');
			cy.intercept(putRoute, {
				statusCode: 200,
				body: {},
			}).as('putEvent');
		} else {
			cy.intercept(listRoute).as('listEvent');
			cy.intercept(getRoute).as('getEvent');
			cy.intercept(putRoute).as('putEvent');
		}

		cy.visit('/events');
		cy.wait('@listEvent').then((res) => {
			cy.wrap(res.response.statusCode).should('eq', 200);
			cy.wrap(res.response.body).should('have.property', 'items');
			const { items } = res.response.body;
			cy.wrap(items).its('length').should('be.gt', 0);
			cy.get('#event_list tr').first().should('exist');
			const firstItem = items[0];
			cy.wrap(firstItem).should('have.property', 'id');
		});
		cy.get('#event_list tr')
			.eq(1)
			.within(() => {
				cy.get('#edit_btn').click();
			});

		cy.wait('@getEvent').then((res) => {
			cy.wrap(res.response.statusCode).should('eq', 200);
			cy.wrap(res.response.body).should('have.property', 'id');
			cy.wrap(res.response.body.id).as('eventId');
			cy.wrap(res.response.body).should('have.property', 'title');
			cy.wrap(res.response.body).should('have.property', 'startDate');
			cy.wrap(res.response.body).should('have.property', 'endDate');
			cy.wrap(res.response.body.startDate).as('startDate');
			cy.wrap(res.response.body.endDate).as('endDate');
		});

		cy.get('#event_title').clear().type('Test Event (Edited)');
		cy.get('#event_description')
			.clear()
			.type('Test event description (Edited)');
		cy.get('#event_image').selectFile('tests/e2e/fixtures/logo-test.png');

		cy.get('@startDate')
			.addOneDay()
			.then((newStartDate) => {
				cy.get('#event_start_date').clear().type(newStartDate);
				cy.wrap(newStartDate).as('startDate');
			});
		cy.get('@endDate')
			.addOneDay()
			.then((newEndDate) => {
				cy.get('#event_end_date').clear().type(newEndDate);
				cy.wrap(newEndDate).as('endDate');
			});

		cy.get('#save_btn').click();

		cy.wait('@putEvent').then((res) => {
			cy.wrap(res.response.statusCode).should('eq', 200);
			cy.wrap(res.response.body).should('have.property', 'id');
			cy.get('@eventId').then((eventId) => {
				cy.wrap(res.response.body.id).should('eq', eventId);
			});
			cy.wrap(res.response.body.title).should('eq', fields.title);
			cy.get('@startDate').then((startDate) => {
				cy.wrap(res.response.body.startDate).should('eq', startDate);
			});
			cy.get('@endDate').then((endDate) => {
				cy.wrap(res.response.body.endDate).should('eq', endDate);
			});
			cy.wrap(res.response.body.description).should('eq', fields.description);
			cy.wrap(res.response.body).as('editedEvent');
		});

		if (useMock) {
			cy.intercept(getRoute, {
				statusCode: 200,
				body: {},
			}).as('getEvent');
		} else {
			cy.intercept(getRoute).as('getEvent');
		}

		cy.wait('@getEvent').then((res) => {
			cy.wrap(res.response.statusCode).should('eq', 200);
			cy.wrap(res.response.body).should('have.property', 'image');
			cy.wrap(res.response.body).should('have.property', 'description');
		});

		cy.get('@editedEvent').then((editedEvent) => {
			cy.get('#event_title').should('contain', editedEvent.title);
			cy.get('#event_description').should('contain', editedEvent.description);
			cy.get('#event_start_date').should('contain', editedEvent.startDate);
			cy.get('#event_end_date').should('contain', editedEvent.endDate);
			cy.get('#event_image').imagesShouldBeEqual(
				'logo-test.png',
				editedEvent.image,
			);
		});
	});
});
