const deleteUtils = {
	checkDeleteModal(title) {
		cy.get('#delete_modal').should('exist');
		cy.get(`@${title}`).then((title) => {
			cy.get('#delete_modal').within(() => {
				cy.get('.delete_message').should('exist');
				cy.get('.delete_message').should('contain', title);
			});
		});
	},
	delete() {
		cy.get('#delete_modal').within(() => {
			cy.get('#delete_btn').click();
		});
	},
	checkDeleteResponse(requestName) {
		cy.wait(`@${requestName}`).then((res) => {
			cy.wrap(res.response.statusCode).should('eq', 200);
		});
	},
	checkDeleteNotification(text) {
		cy.get('.q-notification.bg-positive').should('exist');
		cy.get('.q-notification.bg-positive').should('contain', text);
	},
	checkEntityDeleted(requestName, idVariable, tableId) {
		cy.wait(`@${requestName}`).then((res) => {
			if (res.response.body.items.length > 0) {
				cy.get(`@${idVariable}`).then((id) => {
					cy.get(`#${tableId} tr`)
						.eq(1)
						.within(() => {
							cy.get('td').first().should('not.have.text', id);
						});
				});
			} else {
				cy.wrap(res.response.body.items).should('be.empty');
				cy.get(`#${tableId} tr`).should('have.length', 1);
			}
		});
	},
	runDeleteTest(className, successText) {
		const vars = cy.generalUtils.getEntityVariablesNames(className);
		if (!successText) successText = `${vars.capytalized} deleted`;
		this.checkDeleteModal(vars.title);
		this.delete();
		this.checkDeleteResponse(vars.deleteRequest);
		this.checkDeleteNotification(successText);
		cy.wait(1000);
		this.checkEntityDeleted(vars.listRequest, vars.id, vars.tableId);
	},
};

export default deleteUtils;
