const resourceUtils = {
	checkResourceResponse: (resource, all_fields) => {
		cy.wrap(resource).should('have.property', 'id').should('be.ok');
		cy.wrap(resource).should('have.property', 'title').should('be.ok');
		cy.wrap(resource).should('have.property', 'description');
		cy.wrap(resource).should('have.property', 'link');
		cy.wrap(resource).should('have.property', 'createdDate').should('be.ok');
		cy.wrap(resource).should('have.property', 'updatedDate').should('be.ok');
		cy.wrap(resource).should('have.property', 'keywords');
		if (all_fields) {
			cy.wrap(resource).its('description').should('be.ok');
			cy.wrap(resource).its('link').should('be.ok');
			cy.wrap(resource).its('keywords').should('be.ok');
		}
	},

	checkResourceView: (resource) => {
		cy.get('#resource_id').should('contain', resource.id);
		cy.get('#resource_title').should('contain', resource.title);
		cy.get('#resource_description').should('contain', resource.description);
		if (resource.image) {
			cy.get('#resource_image').imagesShouldBeEqual();
		}
		if (resource.link) {
			cy.get('#resource_link').should('contain', resource.link);
		}
		cy.get('#resource_created_date').should('contain', resource.createdDate);
		cy.get('#resource_updated_date').should('contain', resource.updatedDate);
		if (resource.keywords && resource.keywords.length > 0) {
			cy.get('#resource_keywords').should('contain', ...resource.keywords);
		}
	},
};

cy.resourceUtils = resourceUtils;
