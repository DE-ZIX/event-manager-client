describe('Test Associating Event', () => {
	it('Associates an Event with a resource', () => {
		const eventTest = new cy.Entity('event');
		cy.fixture('deleting/listResource.json').then((listMock) => {
			eventTest.associateEntities({ name: 'resource', mock: {} }, listMock, {});
		});
	});
	it('Disassociates an Event with a resource', () => {
		const eventTest = new cy.Entity('event');
		cy.fixture('deleting/listResource.json').then((listMock) => {
			eventTest.disassociateEntities(
				{ name: 'resource', mock: {} },
				listMock,
				{},
			);
		});
	});
});
