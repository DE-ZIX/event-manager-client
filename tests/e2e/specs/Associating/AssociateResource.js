describe('Test Associating Resource', () => {
	it('Associates an Resource with a class', () => {
		const resourceTest = new cy.Entity('resource');
		cy.fixture('deleting/listResource.json').then((listMock) => {
			resourceTest.associateEntities({ name: 'class', mock: {} }, listMock, {});
		});
	});
	it('Associates an Resource with a event', () => {
		const resourceTest = new cy.Entity('resource');
		cy.fixture('deleting/listResource.json').then((listMock) => {
			resourceTest.associateEntities({ name: 'event', mock: {} }, listMock, {});
		});
	});
	it('Disassociates an Resource with a class', () => {
		const resourceTest = new cy.Entity('resource');
		cy.fixture('deleting/listResource.json').then((listMock) => {
			resourceTest.disassociateEntities(
				{ name: 'class', mock: {} },
				listMock,
				{},
			);
		});
	});
	it('Disassociates an Resource with a event', () => {
		const resourceTest = new cy.Entity('resource');
		cy.fixture('deleting/listResource.json').then((listMock) => {
			resourceTest.disassociateEntities(
				{ name: 'event', mock: {} },
				listMock,
				{},
			);
		});
	});
});
