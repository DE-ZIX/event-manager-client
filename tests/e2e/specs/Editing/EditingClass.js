import listMockData from '@tests/e2e/mock/Editing/listClass.json';
import putMockData from '@tests/e2e/mock/Editing/editClass.js';

const apiHost = Cypress.env('event_manager_api_host');
const useMock = Cypress.env('use_mock');

const listRoute = {
	headers: { host: apiHost },
	pathname: '/classes',
};
const getRoute = {
	method: 'GET',
	headers: { host: apiHost },
	pathname: '/classes/*',
};
const putRoute = {
	method: 'PUT',
	headers: { host: apiHost },
	pathname: '/classes',
};

const fields = {
	title: 'Test Class (Edited)',
	description: 'Test class description (Edited)',
};

describe('Test Editing Class', () => {
	it('Tests editing class', () => {
		if (useMock) {
			cy.intercept(listRoute, {
				statusCode: 200,
				body: listMockData,
			}).as('listClass');
			cy.intercept(getRoute, {
				statusCode: 200,
				body: listMockData[0],
			}).as('getClass');
			cy.intercept(putRoute, {
				statusCode: 200,
				body: putMockData,
			}).as('putClass');
		} else {
			cy.intercept(listRoute).as('listClass');
			cy.intercept(getRoute).as('getClass');
			cy.intercept(putRoute).as('putClass');
		}
		cy.visit('/classes');
		cy.wait('@listClass').then((res) => {
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
					cy.get('#edit_btn').click();
				});
		});
		cy.wait('@getClass').then((res) => {
			cy.wrap(res.response.statusCode).should('eq', 200);
			const classItem = res.response.body;
			cy.wrap(classItem)
				.should('have.property', 'id')
				.as('classId')
				.should('be.ok');
			cy.wrap(classItem).should('have.property', 'title').should('be.ok');
			cy.wrap(classItem).should('have.property', 'image');
			cy.wrap(classItem)
				.should('have.property', 'updatedDate')
				.as('previousUpdatedDate')
				.should('be.ok');
			cy.get('@previousUpdatedDate')
				.getDateFromString()
				.checkSameDay()
				.as('sameDay');
		});
		cy.get('#class_title').clear().type(fields.title);
		cy.get('#class_description').clear().type(fields.description);
		cy.get('#class_image').selectFile('tests/e2e/fixtures/logo-test.png');
		cy.get('#save_btn').click();

		cy.wait('@putClass').then((res) => {
			cy.wrap(res.response.statusCode).should('eq', 200);
			const classItem = res.response.body;
			cy.wrap(classItem);
			cy.wrap(classItem).should('have.property', 'id');
			cy.wrap(classItem)
				.should('have.property', 'title')
				.should('eq', fields.title);
			cy.wrap(classItem)
				.should('have.property', 'description')
				.should('eq', fields.description);
			cy.wrap(classItem).should('have.property', 'image');
			cy.wrap(classItem).should('have.property', 'updatedDate').should('be.ok');
			cy.get('@sameDay').then((sameDay) => {
				if (!sameDay) {
					cy.get('@previousUpdatedDate').should(
						'not.eq',
						classItem.updatedDate,
					);
					cy.wrap(classItem.updatedDate)
						.getDateFromString()
						.then((updatedDate) => {
							cy.get('@previousUpdatedDate')
								.getDateFromString()
								.dateShouldGreaterThen(updatedDate);
						});
				}
			});
			cy.wrap(classItem).as('editedClass');
		});

		if (useMock) {
			cy.intercept(getRoute, {
				statusCode: 200,
				body: putMockData,
			}).as('getResource');
		}

		cy.wait('@getClass').then((res) => {
			cy.wrap(res.response.statusCode).should('eq', 200);
			cy.get('@classId').then((classId) => {
				cy.wrap(res.response.body.id).should('eq', classId);
			});
			cy.get('@editedClass').then((editedClass) => {
				cy.get('@classId').should('eq', editedClass.id);
				cy.get('#class_title').should('have.text', editedClass.title);
				cy.get('#class_description').should('contain', editedClass.description);
				cy.get('#class_image').imagesShouldBeEqual(
					'logo-test.png',
					editedClass.image,
				);
			});
		});
	});
});
