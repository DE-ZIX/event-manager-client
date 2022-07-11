const listUtils = {
	checkListResponse: function (res, mustHaveItems = true) {
		cy.wrap(res.response.statusCode).should('eq', 200);
		if (mustHaveItems) {
			cy.wrap(res.response.body).should('have.property', 'items');
			const { items } = res.response.body;
			cy.wrap(items).its('length').should('be.gt', 0);
			if (!items.length > 0) {
				throw new Error('test fails here');
			} else {
				const firstItem = items[0];
				cy.wrap(firstItem).should('have.property', 'id');
			}
		}
	},
};

cy.listUtils = listUtils;
