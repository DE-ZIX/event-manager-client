describe('Create Class Test', () => {
	it('Tests creating class', () => {
		cy.fixture('deleting/listResource.json').then((listMock) => {
			const classTest = new cy.Entity('event');
			classTest.runCreateTest();
		});
	});
});
