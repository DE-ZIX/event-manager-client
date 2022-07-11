describe('Create Class Test', () => {
	it('Tests creating class', () => {
		const classTest = new cy.Entity('class');
		classTest.runCreateTest();
	});
});
