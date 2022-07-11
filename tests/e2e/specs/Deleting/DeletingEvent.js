describe('Test Deleting Event', () => {
	it('Delets an event without any associations', () => {
		const eventTest = new cy.Entity('event');
		cy.fixture('deleting/listEvent.json').then((mockData) => {
			eventTest.runDeleteTest(mockData);
		});
	});
	it('Delets an event with association', () => {
		cy.reload();
		const eventTest = new cy.Entity('event');
		cy.fixture('deleting/listEvent.json').then((mockData) => {
			eventTest.runDeleteTest(mockData, {}, true);
		});
	});
});
