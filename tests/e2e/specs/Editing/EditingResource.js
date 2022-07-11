import listMockData from '@tests/e2e/mock/Editing/listResource.json';
import putMockData from '@tests/e2e/mock/Editing/editResource.js';

const apiHost = Cypress.env('event_manager_api_host');
const useMock = Cypress.env('use_mock');

const listRoute = {
	headers: { host: apiHost },
	pathname: '/resources',
};
const getRoute = {
	method: 'GET',
	headers: { host: apiHost },
	pathname: '/resources/*',
};
const putRoute = {
	method: 'PUT',
	headers: { host: apiHost },
	pathname: '/resources',
};

const fields = {
	title: 'Test Resource (Edited)',
	description: 'Test resource description (Edited)',
	link: 'https://nodejs.org/pt/',
	keyword: 'edited',
};

describe('Test Editing Resource', () => {
	it('Tests editing resource', () => {
		if (useMock) {
			cy.intercept(listRoute, {
				statusCode: 200,
				body: listMockData,
			}).as('listResource');
			cy.intercept(putRoute, {
				statusCode: 200,
				body: putMockData,
			}).as('putResource');
			cy.intercept(getRoute, {
				statusCode: 200,
				body: listMockData[0],
			}).as('getResource');
		} else {
			cy.intercept(listRoute).as('listResource');
			cy.intercept(putRoute).as('putResource');
			cy.intercept(getRoute).as('getResource');
		}
		cy.visit('/resources');

		cy.wait('@listResource').then((res) => {
			cy.wrap(res.response.statusCode).should('eq', 200);
			cy.wrap(res.response.body).should('have.property', 'items');
			const { items } = res.response.body;
			cy.wrap(items).its('length').should('be.gt', 0);
			cy.get('#resource_list tr').first().should('exist');
			const firstItem = items[0];
			cy.wrap(firstItem).should('have.property', 'id');
			cy.get('#resource_list tr')
				.eq(1)
				.within(() => {
					cy.get('#edit_btn').click();
				});
		});

		cy.wait('@getResource').then((res) => {
			cy.wrap(res.response.statusCode).should('eq', 200);
			cy.wrap(res.response.body).should('have.property', 'id');
			cy.wrap(res.response.body.id).as('resourceId');
			cy.wrap(res.response.body).should('have.property', 'title');
			cy.wrap(res.response.body)
				.should('have.property', 'createdDate')
				.should('be.ok');
			cy.wrap(res.response.body)
				.should('have.property', 'updatedDate')
				.should('be.ok');
			cy.wrap(res.response.body.updatedDate).as('previousUpdatedDate');
			cy.get('@previousUpdatedDate')
				.getDateFromString()
				.checkSameDay()
				.as('sameDay');
		});

		cy.get('#resource_title').clear().type(fields.title);
		cy.get('#resource_description').clear().type(fields.description);
		cy.get('#resource_link').clear().type(fields.link);
		cy.get('#resource_image').selectFile('tests/e2e/fixtures/logo-test.png');
		cy.get('#resource_keywords').type(fields.keyword).type('{enter}');
		cy.get('#save_btn').click();

		cy.wait('@putResource').then((res) => {
			cy.wrap(res.response.statusCode).should('eq', 200);
			cy.wrap(res.response.body).should('have.property', 'id');
			cy.get('@resourceId').then((resourceId) => {
				cy.wrap(res.response.body.id).should('eq', resourceId);
			});
			cy.wrap(res.response.body.title).should('eq', fields.title);
			cy.wrap(res.response.body.description).should('eq', fields.description);
			cy.wrap(res.response.body.link).should('eq', fields.link);
			cy.wrap(res.response.body.keywords).should('contain', fields.keyword);
			cy.get('@sameDay').then((sameDay) => {
				if (!sameDay) {
					cy.get('@previousUpdatedDate').should(
						'not.eq',
						res.response.body.updatedDate,
					);
					cy.wrap(res.response.body.updatedDate)
						.getDateFromString()
						.then((updatedDate) => {
							cy.get('@previousUpdatedDate')
								.getDateFromString()
								.dateShouldGreaterThen(updatedDate);
						});
				}
			});
			cy.wrap(res.response.body).as('editedResource');
		});

		if (useMock) {
			cy.intercept(getRoute, {
				statusCode: 200,
				body: putMockData,
			}).as('getResource');
		}

		cy.wait('@getResource').then(() => {
			cy.get('@editedResource').then((editedResource) => {
				const {
					title,
					description,
					link,
					image,
					keywords,
					createdDate,
					updatedDate,
				} = editedResource;
				cy.get('#resource_title').should('contain', title);
				cy.get('#resource_description').should('contain', description);
				cy.get('#resource_link').should('contain', link);
				cy.get('#resource_image').imagesShouldBeEqual('logo-test.png', image);
				cy.get('#resource_keywords').should('contain', ...keywords);
				cy.get('#resource_created_date').should('contain', createdDate);
				cy.get('#resource_updated_date').should('contain', updatedDate);
			});
		});
	});
});
