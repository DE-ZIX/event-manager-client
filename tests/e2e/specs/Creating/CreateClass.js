import mockData from '@tests/e2e/mock/Creating/createResource.json';

const apiHost = Cypress.env('event_manager_api_host');
const useMock = Cypress.env('use_mock');

const classTitle = 'Test class';
const classDescription = 'Test class description';

describe('Create Class Test', () => {
	it('Tests creating class', () => {
		cy.visit('/classes/add');
		const postRoute = {
			method: 'POST',
			headers: { host: apiHost },
			pathname: '/classes',
		};

		if (useMock) {
			cy.intercept(postRoute, {
				statusCode: 200,
				body: mockData,
			}).as('postClass');
		} else {
			cy.intercept(postRoute).as('postClass');
		}
		cy.get('#class_title').type(classTitle);
		cy.get('#class_description').type(classDescription);
		cy.get('#class_image').selectFile('tests/e2e/fixtures/test.jpg');
		cy.get('#class_submit').click();
		cy.wait('@postClass').then((res) => {
			cy.wrap(res.response.statusCode).should('eq', 200);
			cy.wrap(res.response.body.id).as('classId');
			cy.wrap(res.response.body.image).as('postClassImg');
			cy.wrap(res.response.body.updatedDate).as('postClassUpdatedDate');
		});
		const getRoute = {
			method: 'GET',
			headers: { host: apiHost },
			pathname: '/classes/*',
		};
		if (useMock) {
			cy.intercept(getRoute, {
				statusCode: 200,
				body: mockData,
			}).as('getClass');
		} else {
			cy.intercept(getRoute).as('getClass');
		}
		cy.wait('@getClass').then(() => {
			cy.get('@classId').then((id) => {
				cy.get('#class_id').should('contain', id);
			});
			cy.get('#class_title').should('contain', classTitle);
			cy.get('#class_description').should('contain', classDescription);
			cy.get('@postClassImg').then((img) => {
				cy.get('#class_image').imagesShouldEqual('test.jpg', img);
			});
			cy.get('@postClassUpdatedDate').then((updatedDate) => {
				cy.get('#class_updated_date').should('contain', updatedDate);
			});
		});
	});
});
