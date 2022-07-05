import mockData from '@tests/e2e/mock/Creating/createEvent.json';

const apiHost = Cypress.env('event_manager_api_host');
const useMock = Cypress.env('use_mock');

const eventTitle = 'Test event';
const eventDescription = 'Test event description';
const eventStartDate = '05/07/2022';
const eventEndDate = '05/08/2022';

describe('Create Event Test', () => {
	it('Tests creating event', () => {
		cy.visit('/events/add');
		const postRoute = {
			method: 'POST',
			headers: { host: apiHost },
			pathname: '/events',
		};
		if (useMock) {
			cy.intercept(postRoute, {
				statusCode: 200,
				body: mockData,
			}).as('postEvent');
		} else {
			cy.intercept(postRoute).as('postEvent');
		}

		cy.get('#event_title').type(eventTitle);
		cy.get('#event_description').type(eventDescription);
		cy.get('#event_image').selectFile('tests/e2e/fixtures/test.jpg');
		cy.get('#event_start_date').type(eventStartDate);
		cy.get('#event_end_date').type(eventEndDate);
		cy.get('#event_submit').click();
		cy.wait('@postEvent').then((res) => {
			cy.wrap(res.response.statusCode).should('eq', 200);
			cy.wrap(res.response.body.id).as('eventId');
			cy.wrap(res.response.body.image).as('postEventImg');
		});

		const getRoute = {
			method: 'GET',
			headers: { host: apiHost },
			pathname: '/events/*',
		};

		if (useMock) {
			cy.intercept(getRoute, {
				statusCode: 200,
				body: mockData,
			}).as('getEvent');
		} else {
			cy.intercept(getRoute).as('getEvent');
		}

		cy.wait('@getEvent').then(() => {
			cy.get('@eventId').then((id) => {
				cy.get('#event_id').should('contain', id);
			});
			cy.get('#event_title').should('contain', eventTitle);
			cy.get('#event_description').should('contain', eventDescription);
			cy.get('#event_start_date').should('contain', eventStartDate);
			cy.get('#event_end_date').should('contain', eventEndDate);
			cy.get('@postEventImg').then((img) => {
				cy.get('#event_image').imagesShouldEqual('test.jpg', img);
			});
		});
	});
});
