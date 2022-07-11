describe('Test Associating Resource', () => {
	it('Associates an Resource with a class', () => {
		const resourceTest = new cy.Entity('resource');
		cy.fixture('deleting/listResource.json').then(() => {
			resourceTest.associateEntities({ name: 'class', mocks: {} });
		});
	});
	it('Associates an Resource with a event', () => {
		const resourceTest = new cy.Entity('resource');
		cy.fixture('deleting/listResource.json').then(() => {
			resourceTest.associateEntities({ name: 'event', mocks: {} });
		});
	});
	it('Disassociates an Resource with a class', () => {
		const resourceTest = new cy.Entity('resource');
		cy.fixture('deleting/listResource.json').then(() => {
			resourceTest.disassociateEntities({ name: 'class', mocks: {} });
		});
	});
	it('Disassociates an Resource with a event', () => {
		const resourceTest = new cy.Entity('resource');
		cy.fixture('deleting/listResource.json').then(() => {
			resourceTest.disassociateEntities({ name: 'event', mocks: {} });
		});
	});
});
