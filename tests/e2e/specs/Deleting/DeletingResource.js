describe('Test Deleting Resource', () => {
	it('Delets an resource without any associations', () => {
		const resourceTest = new cy.Entity('resource');
		cy.fixture('deleting/listResource.json').then((mockData) => {
			resourceTest.runDeleteTest(mockData);
		});
	});
	it('Delets an resource with associations', () => {
		cy.reload();
		const resourceTest = new cy.Entity('resource');
		cy.fixture('deleting/listEvent.json').then((mockData) => {
			resourceTest.runDeleteTest(mockData, {}, true);
		});
	});
});
