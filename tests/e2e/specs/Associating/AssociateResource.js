describe('Test Associating Resource', () => {
	it('Associates an Resource with a class', () => {
		const resourceTest = new cy.Entity('resource');
		cy.fixture('deleting/listResource.json').then((listMock) => {
			resourceTest.associateEntities(
				{ name: 'class', mocks: {} },
				listMock,
				{},
			);
		});
	});
	it('Associates an Resource with a event', () => {
		const resourceTest = new cy.Entity('resource');
		cy.fixture('deleting/listResource.json').then((listMock) => {
			resourceTest.associateEntities(
				{ name: 'event', mocks: {} },
				listMock,
				{},
			);
		});
	});
	it('Disassociates an Resource with a class', () => {
		const resourceTest = new cy.Entity('resource');
		cy.fixture('deleting/listResource.json').then((listMock) => {
			resourceTest.disassociateEntities(
				{ name: 'class', mocks: {} },
				listMock,
				{},
			);
		});
	});
	it('Disassociates an Resource with a event', () => {
		const resourceTest = new cy.Entity('resource');
		cy.fixture('deleting/listResource.json').then((listMock) => {
			resourceTest.disassociateEntities(
				{ name: 'event', mocks: {} },
				listMock,
				{},
			);
		});
	});
});
