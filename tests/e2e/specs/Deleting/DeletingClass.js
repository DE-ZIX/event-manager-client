describe('Test Deleting Class', () => {
	it('Delets a Class without any associations', () => {
		const classTest = new cy.Entity('class');
		cy.fixture('deleting/listClass.json').then((mockData) => {
			classTest.runDeleteTest(mockData);
		});
	});
	it('Delets an event with association', () => {
		cy.reload();
		const classTest = new cy.Entity('class');
		cy.fixture('deleting/listEvent.json').then((mockData) => {
			classTest.runDeleteTest(mockData, {}, true);
		});
	});
});
