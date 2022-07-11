describe('Test Associating Event', () => {
	it('Associates an Event with a resource', () => {
		const eventTest = new cy.Entity('event');
		cy.fixture('deleting/listResource.json').then(() => {
			eventTest.associateEntities({ name: 'resource', mocks: {} });
		});
	});
	it('Disassociates an Event with a resource', () => {
		const eventTest = new cy.Entity('event');
		cy.fixture('deleting/listResource.json').then(() => {
			eventTest.disassociateEntities({ name: 'resource', mocks: {} });
		});
	});
});
