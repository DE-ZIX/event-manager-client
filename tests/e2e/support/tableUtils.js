const tableUtils = {
	checkListData: function (entityName) {
		cy.get(`#${entityName}_list`).should('exist');
		cy.get(`#${entityName}_list tr`).first().should('exist');
	},
};

cy.tableUtils = tableUtils;
