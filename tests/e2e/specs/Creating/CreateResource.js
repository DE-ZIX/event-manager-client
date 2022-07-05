const apiHost = Cypress.env('event_manager_api_host');
const useMock = Cypress.env('use_mock');

import mockData from '@tests/e2e/mock/Creating/createResource.json';

describe('Creating resource test', () => {
	it('Tests creating resource', () => {
		cy.visit('/resources/add');
		const postRoute = {
			method: 'POST',
			headers: { host: apiHost },
			pathname: '/resources',
		};

		if (useMock) {
			cy.intercept(postRoute, {
				statusCode: 200,
				body: mockData,
			}).as('postResource');
		} else {
			cy.intercept(postRoute).as('postResource');
		}
		cy.get('#resource_title').type('Test resource');
		cy.get('#resource_description').type('An resource description');
		cy.get('#resource_link').type('https://nodejs.org/en/');
		cy.get('#resource_image').selectFile('tests/e2e/fixtures/test.jpg');
		cy.get('#resource_keywords')
			.type('tag1')
			.type('{enter}')
			.type('tag2')
			.type('{enter}')
			.type('tag3')
			.type('{enter}');
		cy.get('#resource_submit').click();
		cy.wait('@postResource').then((res) => {
			cy.wrap(res.response.statusCode).should('eq', 200);
			cy.wrap(res.response.body).as('postResource');
			cy.wrap(res.response.body.id).as('postResourceId');
			cy.wrap(res.response.body.image).as('postResourceImg');
			cy.wrap(res.response.body.createdDate).as('postResourceCreatedDate');
			cy.wrap(res.response.body.updatedDate).as('postResourceUpdatedDate');
		});
		const getRoute = {
			method: 'GET',
			headers: { host: apiHost },
			pathname: '/resources/*',
		};
		if (useMock) {
			cy.intercept(getRoute, {
				statusCode: 200,
				body: mockData,
			}).as('getResource');
		} else {
			cy.intercept(getRoute).as('getResource');
		}
		cy.wait('@getResource').then(() => {
			cy.get('#resource_title').should('contain', 'Test resource');
			cy.get('#resource_description').should(
				'contain',
				'An resource description',
			);
			cy.get('#resource_link').should('contain', 'https://nodejs.org/en/');
			cy.get('@postResourceCreatedDate').then((createdDate) => {
				cy.get('#resource_created_date').should('contain', createdDate);
			});
			// cy.get('@postResourceUpdatedDate').then((updatedDate) => {
			// 	cy.get('#resource_updated_date').should('contain', updatedDate);
			// });
			cy.get('#resource_image')
				.should(([img]) => {
					expect(img.complete).to.be.true;
				})
				.should('be.visible')
				.should(([img]) => {
					expect(img.naturalWidth).to.be.greaterThan(0);
					expect(img.naturalHeight).to.be.greaterThan(0);
				})
				.then(([img]) => {
					cy.fixture('test.jpg').then((fixture) => {
						cy.get('@postResourceImg').then((postResourceImg) => {
							expect(postResourceImg).to.equal(fixture);
						});
						const fixtureImg = new Image();
						fixtureImg.src = `data:image/jpeg;base64,${fixture}`;
						return new Promise((resolve) => {
							fixtureImg.onload = () => {
								expect(img.naturalWidth).to.equal(fixtureImg.naturalWidth);
								expect(img.naturalHeight).to.equal(fixtureImg.naturalHeight);
								resolve();
							};
						});
					});
				});
			cy.get('#resource_keywords').should('contain', 'tag1');
			cy.get('#resource_keywords').should('contain', 'tag2');
			cy.get('#resource_keywords').should('contain', 'tag3');
		});
	});
});
