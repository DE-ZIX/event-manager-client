describe('Test Associating an Class', () => {
	it('Associates an Class with a resource', () => {
		const classTest = new cy.Entity('class');
		cy.wrap({}).as('mocks');
		cy.fixture('associating/class/listClass.json').then((listMock) => {
			cy.get('@mocks').then((mocks) => {
				mocks.listClass = listMock;
				cy.wrap(mocks).as('mocks');
			});
		});
		cy.fixture('associating/class/getClass.json').then((getClass) => {
			cy.get('@mocks').then((mocks) => {
				mocks.getClass = getClass;
				cy.wrap(mocks).as('mocks');
			});
		});
		cy.fixture('associating/class/listResource.json').then((listResource) => {
			cy.get('@mocks').then((mocks) => {
				mocks.listEntity = listResource;
				cy.wrap(mocks).as('mocks');
			});
		});
		cy.fixture('associating/class/listResourceAssociate.json').then(
			(listResourceAssociate) => {
				cy.get('@mocks').then((mocks) => {
					mocks.entityListAssociate = listResourceAssociate;
					cy.wrap(mocks).as('mocks');
				});
			},
		);
		cy.fixture('associating/class/resourceAssociate.json').then(
			(entityAssociate) => {
				cy.get('@mocks').then((mocks) => {
					mocks.entityAssociate = entityAssociate;
					cy.wrap(mocks).as('mocks');
				});
			},
		);
		cy.fixture('associating/class/listResourceAssociate2.json').then(
			(entityListAssociate2) => {
				cy.get('@mocks').then((mocks) => {
					mocks.entityListAssociate2 = entityListAssociate2;
					cy.wrap(mocks).as('mocks');
				});
			},
		);
		cy.fixture('associating/class/listResource2.json').then((listEntity2) => {
			cy.get('@mocks').then((mocks) => {
				mocks.listEntity2 = listEntity2;
				cy.wrap(mocks).as('mocks');
			});
		});
		cy.get('@mocks').then((mocks) => {
			classTest.associateEntities({ name: 'resource', mocks });
		});
	});
	it('Disassociates an Class with a resource', () => {
		const classTest = new cy.Entity('class');
		const mocks = {};
		cy.fixture('deleting/listResource.json').then((listMock) => {
			classTest.disassociateEntities({ name: 'resource', mocks }, listMock, {});
		});
	});
});
