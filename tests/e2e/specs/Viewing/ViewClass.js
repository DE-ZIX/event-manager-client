import mockData from '@tests/e2e/mock/Viewing/viewClass.json';

const apiHost = Cypress.env('event_manager_api_host');
const useMock = Cypress.env('use_mock');

const classesRoute = {
	headers: { host: apiHost },
	pathname: '/classes',
};

const getRoute = {
	method: 'GET',
	headers: { host: apiHost },
	pathname: '/classes/*',
};

describe('View Class Test', () => {
	it('Tests viewing class through row', () => {
		cy.visit('/classes');

		if (useMock) {
			cy.intercept(classesRoute, {
				statusCode: 200,
				body: mockData,
			}).as('getClasses');
			cy.intercept(getRoute, {
				statusCode: 200,
				body: mockData.item[0],
			}).as('getClasses');
		} else {
			cy.intercept(classesRoute).as('getClasses');
			cy.intercept(getRoute).as('getClass');
		}

		cy.wait('@getClasses').then((res) => {
			cy.get('#class_list').should('exist');
			cy.wrap(res.response.statusCode).should('eq', 200);
			cy.wrap(res.response.body).should('have.property', 'items');
			const { items } = res.response.body;
			cy.wrap(items).its('length').should('be.gt', 0);
			cy.get('#class_list tr').first().should('exist');
			const firstItem = items[0];
			cy.wrap(firstItem).should('have.property', 'id');
			cy.get('#class_list tr').eq(1).click();
		});

		cy.wait('@getClass').then((res) => {
			cy.wrap(res.response.statusCode).should('eq', 200);
			const classItem = res.response.body;
			cy.wrap(classItem).should('have.property', 'id');
			cy.wrap(classItem).should('have.property', 'title');
			cy.wrap(classItem).should('have.property', 'image');
			cy.wrap(classItem).should('have.property', 'description');
			cy.wrap(classItem).should('have.property', 'updatedDate');
			cy.get('#class_id').should('contain', classItem.id);
			cy.get('#class_title').should('contain', classItem.title);
			cy.get('#class_description').should('contain', classItem.description);
			cy.get('#class_updated_date').should('contain', classItem.updatedDate);
			if (classItem.image) {
				cy.get('#class_image').imagesShouldEqual();
			}
		});
	});
});
