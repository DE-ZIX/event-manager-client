import generalUtils from './generalUtils';
import deleteUtils from './deleteUtils';

export default class EntityTest {
	constructor(entity) {
		this.entity = entity;
		this.variablesNames = generalUtils.getEntityVariablesNames(entity);
	}
	typeFields() {
		if (this.entity === 'resource') {
			return [
				{
					name: 'id',
					required: true,
					notInForm: true,
				},
				{
					name: 'title',
					required: true,
					createData: 'Test Resource',
				},
				{
					name: 'description',
					createData: 'Test Resource Description',
				},
				{
					name: 'link',
					createData: 'https://www.test.com',
				},
				{
					name: 'image',
					image: true,
					createData: 'tests/e2e/fixtures/test.jpg',
				},
				{
					name: 'keywords',
					createData: ['tag1', 'tag2', 'tag3'],
					multiple: true,
				},
				{
					name: 'createdDate',
					required: true,
				},
				{
					name: 'updatedDate',
					notInForm: true,
					// required: true,
				},
			];
		}
		if (this.entity === 'class') {
			{
				return [
					{
						name: 'id',
						required: true,
						notInForm: true,
					},
					{
						name: 'title',
						createData: 'Test Class',
						required: true,
					},
					{
						name: 'description',
						createData: 'Test Class Description',
					},
					{
						name: 'image',
						createData: 'tests/e2e/fixtures/test.jpg',
						image: true,
					},
					{
						name: 'updatedDate',
						notInForm: true,
					},
				];
			}
		}
		if (this.entity === 'event') {
			return [
				{
					name: 'id',
					required: true,
					notInForm: true,
				},
				{
					name: 'title',
					createData: 'Test Event',
					required: true,
				},
				{
					name: 'description',
					createData: 'Test Event Description',
				},
				{
					name: 'image',
					createData: 'tests/e2e/fixtures/test.jpg',
					image: true,
				},
				{
					name: 'startDate',
					createData: '05/07/2022',
					required: true,
				},
				{
					name: 'endDate',
					createData: '06/07/2022',
					required: true,
				},
			];
		}
	}
	getFieldId(fieldName) {
		return `#${this.entity}_${cy.generalUtils.toSnakeCase(fieldName)}`;
	}
	runCreateTest() {
		this.visitAdd();
		this.interceptPostRoute();
		this.interceptGetRoute();
		this.typeFields().forEach((field) => {
			if (!field.notInForm) {
				const fieldId = this.getFieldId(field.name);
				if (field.multiple) {
					field.createData.forEach((data) => {
						cy.get(fieldId).type(data).type('{enter}');
					});
				} else if (field.image) {
					cy.get(fieldId).selectFile(field.createData);
				} else {
					cy.get(fieldId).type(field.createData);
				}
			}
		});
		this.submitCreate();
		this.waitForPost().then((res) => {
			this.checkAndSavePostResponse(res, true);
		});
		this.waitForGet().then((res) => {
			this.checkGetResponse(res.response.body, true);
			this.checkView(res.response.body);
		});
	}
	interceptGetRoute(mock) {
		cy.interceptAPIRoute({
			pathname: `${this.mainEndpoint}/*`,
			method: 'GET',
			mock: mock,
			name: this.variablesNames.getRequest,
		});
	}
	get namePlural() {
		if (this.entity === 'class') {
			return this.entity + 'es';
		}
		return this.entity + 's';
	}
	get mainEndpoint() {
		return `/${this.namePlural}`;
	}
	visitList() {
		cy.visit(`/${this.namePlural}`);
	}
	visitAdd() {
		cy.visit(`/${this.namePlural}/add`);
	}
	interceptPostRoute(mock) {
		cy.interceptAPIRoute({
			pathname: this.mainEndpoint,
			method: 'POST',
			mock: mock,
			name: `post${this.variablesNames.capytalized}`,
		});
	}
	interceptDeleteRoute(mock) {
		cy.interceptAPIRoute({
			pathname: `${this.mainEndpoint}/*`,
			method: 'DELETE',
			mock: mock,
			name: `delete${this.variablesNames.capytalized}`,
		});
	}
	interceptListRoute(mock, config) {
		let mainEndpoint = this.mainEndpoint;
		if (config && config.prependEndpoint) {
			mainEndpoint = config.prependEndpoint + mainEndpoint;
		}
		cy.interceptAPIRoute(mainEndpoint, mock, this.variablesNames.listRequest);
	}
	interceptListAssociateRoute(entity, id, mock) {
		const query = {};
		query[`notIn${entity}`] = id;
		cy.interceptAPIRoute({
			pathname: `${this.mainEndpoint}`,
			method: 'GET',
			mock: mock,
			name: this.variablesNames.listAssociateRequest,
			query,
		});
	}
	configAssociateListIntercept(entity, id) {
		if (entity.entity === 'resource') {
			entity.interceptListRoute(
				{},
				{
					prependEndpoint: `${this.mainEndpoint}/${id}`,
				},
			);
		} else {
			entity.interceptListRoute({});
		}
	}
	waitListAssociateRoute() {
		return cy.wait(`@${this.variablesNames.listAssociateRequest}`);
	}
	interceptAssociateRoute(entityId, id, mock, endpoint) {
		cy.interceptAPIRoute({
			pathname: endpoint || `${this.mainEndpoint}/${entityId}/${id}`,
			method: 'GET',
			mock: mock,
			name: this.variablesNames.associateRequest,
		});
	}
	interceptDisassociateRoute(entityId, id, mock, endpoint) {
		cy.interceptAPIRoute({
			pathname: endpoint || `${this.mainEndpoint}/${entityId}/${id}/remove`,
			method: 'DELETE',
			mock: mock,
			name: this.variablesNames.disassociateRequest,
		});
	}
	waitForGet() {
		return cy.wait(`@${this.variablesNames.getRequest}`);
	}
	waitForList() {
		return cy.wait(`@${this.variablesNames.listRequest}`);
	}
	waitForPost() {
		return cy.wait(`@${this.variablesNames.postRequest}`);
	}
	saveFirstItemId(res) {
		cy.wrap(res.response.body.items[0].id).as(this.variablesNames.id);
	}
	saveFirsItemTitle(res) {
		cy.wrap(res.response.body.items[0].title).as(this.variablesNames.title);
	}
	getId() {
		return cy.get(`@${this.variablesNames.id}`);
	}
	goToFirstItem() {
		this.getListRows().eq(1).click();
	}
	goToView(id) {
		if (id) {
			cy.visit(`${this.mainEndpoint}/${id}`);
		} else {
			this.getId().then((id) => {
				cy.visit(`${this.mainEndpoint}/${id}`);
			});
		}
	}
	// fillForm() {}
	// editTest() {}
	submitCreate() {
		cy.get(`#${this.entity}_submit`).click();
	}
	checkGetResponse(entity, checkAll) {
		this.typeFields().forEach((field) => {
			cy.wrap(entity).should('have.property', field.name);
			if (field.required || checkAll) {
				cy.wrap(entity).its(field.name).should('be.ok');
			}
		});
	}
	checkPostResponse(res) {
		cy.wrap(res.response.statusCode).should('eq', 200);
	}
	checkListView() {
		cy.get(`#${this.entity}_list`).should('exist');
		cy.get(`#${this.entity}_list tr`).first().should('exist');
	}
	runDeleteTest(mock1, mock2, withAssociation) {
		this.interceptListRoute(this.mockList);
		this.interceptDeleteRoute(this.mockDelete);
		this.interceptGetRoute({});
		this.visitList();
		this.waitForList().then((res) => {
			this.checkListResponse(res);
			this.saveFirstItemId(res);
			this.saveFirsItemTitle(res);
		});
		this.checkListView();
		const entities = [];
		if (withAssociation) {
			if (this.entity === 'resource') {
				entities.push(new EntityTest('class'));
				entities.push(new EntityTest('event'));
			} else {
				entities.push(new EntityTest('resource'));
			}

			// intercept related lists
			this.getId().then((id) => {
				entities.forEach((entity) => {
					this.configAssociateListIntercept(entity, id); // intercept list for what we deleted
				});
			});

			this.goToFirstItem();
			this.waitForGet().then((res) => {
				this.checkGetResponse(res.response.body);
			});
			entities.forEach((entity) => {
				entity.waitForList().then((res) => {
					entity.checkListView();
					entity.checkListResponse(res, false);
					if (
						!res.response.body.items ||
						res.response.body.items.length === 0
					) {
						this.associateEntities({ name: entity.entity, mock: {} });
					}
				});
			});
			this.visitList();
			this.checkListView();
		}
		cy.wait(1000);
		this.getListRows()
			.eq(1)
			.within(() => {
				cy.get('#delete_btn').click();
			});

		deleteUtils.runDeleteTest(this.entity);

		if (withAssociation) {
			// goes to other entities and checks that the association is removed
			entities.forEach((entity) => {
				this.checkDisassociation(entity);
			});
		}
	}
	getListElement() {
		return cy.get(`#${this.entity}_list`);
	}
	getListRows() {
		return cy.get(`#${this.entity}_list tr`);
	}
	getFixturePath(testType, prepend, entity, useFolder, entityFolder) {
		if (!entity) entity = this.entity;
		const capital = generalUtils.capitalizeFirstLetter(entity);
		let path = `${testType}`;
		if (useFolder) path += `/${entityFolder || entity}`;
		path += `/${prepend}${capital}`;
		return path;
	}
	associateEntities(entity) {
		const Entity = new cy.Entity(entity.name);
		const mocks = entity.mocks || {};
		this.interceptListRoute(mocks.listClass);
		this.interceptGetRoute(mocks.getClass);

		this.visitList();
		this.waitForList().then((res) => {
			this.checkListResponse(res);
			this.saveFirstItemId(res);
		});
		this.checkListView();
		this.getId().then((id) => {
			if (Entity.entity === 'resource') {
				Entity.interceptListRoute(mocks.listEntity, {
					prependEndpoint: `${this.mainEndpoint}/${id}`,
				});
			} else {
				Entity.interceptListRoute(mocks.listEntity);
			}
		});

		cy.wait(100);

		this.getListRows().eq(1).click();
		this.waitForGet().then((res) => {
			cy.wrap(res.response.statusCode).should('eq', 200);
			const thisEntity = res.response.body;
			this.checkGetResponse(thisEntity);
			this.checkView(thisEntity);
		});

		Entity.waitForList().then((res) => {
			Entity.checkListResponse(res, false);
		});
		this.getId().then((id) => {
			Entity.interceptListAssociateRoute(
				this.variablesNames.capytalized,
				id,
				mocks.entityListAssociate,
			);
		});
		Entity.getListElement().within(() => {
			cy.get('#add_btn').click();
		});
		cy.get('#associate_modal').should('exist').should('be.visible');
		Entity.waitListAssociateRoute().then((res) => {
			Entity.checkListResponse(res, false);
			Entity.checkListResponse(res, true);
			Entity.saveFirstItemId(res);
		});
		cy.get('#associate_select').should('exist');
		cy.get('#associate_select').click();
		cy.get('.q-menu').should('exist');
		cy.get('.q-menu').within(() => {
			cy.get('.q-item').its('length').should('be.gt', 0);
			cy.get('.q-item').eq(0).click();
		});
		this.getId().then((id) => {
			Entity.getId().then((entityId) => {
				const endpoint =
					entity.name === 'resource'
						? `${this.mainEndpoint}/${id}/${entityId}`
						: undefined;
				Entity.interceptAssociateRoute(
					entityId,
					id,
					mocks.entityAssociate,
					endpoint,
				);
			});
			Entity.interceptListAssociateRoute(
				this.variablesNames.capytalized,
				id,
				mocks.entityListAssociate2,
			);
			this.getId().then((id) => {
				if (Entity.entity === 'resource') {
					Entity.interceptListRoute(mocks.listEntity2, {
						prependEndpoint: `${this.mainEndpoint}/${id}`,
					});
				} else {
					Entity.interceptListRoute(mocks.listEntity2);
				}
			});
		});
		cy.wait(1000);
		cy.get('#associate_btn').click();
		cy.wait(`@${Entity.variablesNames.associateRequest}`).then((res) => {
			cy.wrap(res.response.statusCode).should('eq', 200);
		});
		cy.wait(`@${Entity.variablesNames.listRequest}`).then((res) => {
			Entity.checkListResponse(res, false);
		});
		cy.get('.q-notification.bg-positive').should('exist');
		cy.wait(1000);
		Entity.checkListView();
		Entity.getListRows()
			.eq(1)
			.within(() => {
				cy.get(`@${Entity.variablesNames.id}`).then((id) => {
					cy.get('td').first().should('have.text', id);
				});
			});
	}
	disassociateEntities(entity, listMock, getMock) {
		const Entity = new cy.Entity(entity.name);
		this.interceptListRoute(listMock);
		this.interceptGetRoute(getMock);

		this.visitList();
		cy.wait(`@${this.variablesNames.listRequest}`).then((res) => {
			this.checkListResponse(res);
			cy.wrap(res.response.body.items[0].id).as(this.variablesNames.id);
		});
		this.checkListView();
		cy.wait(1000);
		cy.get(`@${this.variablesNames.id}`).then((id) => {
			if (entity.name === 'resource') {
				Entity.interceptListRoute(entity.mock, {
					prependEndpoint: `${this.mainEndpoint}/${id}`,
				});
			} else {
				Entity.interceptListRoute(entity.mock);
			}
		});
		this.getListRows().eq(1).click();
		cy.wait(`@${this.variablesNames.getRequest}`).then((res) => {
			cy.wrap(res.response.statusCode).should('eq', 200);
			const thisEntity = res.response.body;
			this.checkGetResponse(thisEntity);
			this.checkView(thisEntity);
		});

		cy.wait(`@${Entity.variablesNames.listRequest}`).then((res) => {
			if (!res.response.body.items || res.response.body.items.length === 0) {
				this.associateEntities(entity, listMock, getMock);
			}
			Entity.checkListResponse(res);
			cy.wrap(res.response.body.items[0].id).as(Entity.variablesNames.id);
		});

		cy.get(`@${this.variablesNames.id}`).then((id) => {
			cy.get(`@${Entity.variablesNames.id}`).then((entityId) => {
				const endpoint =
					entity.name === 'resource'
						? `${this.mainEndpoint}/${id}/${entityId}/remove`
						: undefined;
				Entity.interceptDisassociateRoute(entityId, id, entity.mock, endpoint);
			});
			Entity.interceptListAssociateRoute(
				this.variablesNames.capytalized,
				id,
				entity.mock,
			);
		});
		Entity.getListRows()
			.eq(1)
			.within(() => {
				cy.get('#unlink_btn').click();
			});
		cy.wait(`@${Entity.variablesNames.disassociateRequest}`).then((res) => {
			cy.wrap(res.response.statusCode).should('eq', 200);
		});
		cy.get('.q-notification.bg-positive').should('exist');
		cy.wait(`@${Entity.variablesNames.listRequest}`).then((res) => {
			Entity.checkListResponse(res, false);
		});
		cy.wait(1000);
		Entity.getListRows().its('length').as('remainingItems');
		cy.get('@remainingItems').then((remainingItems) => {
			if (remainingItems > 1) {
				cy.get(`@${Entity.variablesNames.id}`).then((id) => {
					Entity.getListRows()
						.eq(1)
						.within(() => {
							cy.get('td').first().should('not.have.text', id);
						});
				});
			} else {
				Entity.getListRows().its('length').should('eq', 1);
			}
		});
	}
	checkDisassociation(entity) {
		entity.interceptGetRoute({});
		// this.configAssociateListIntercept(entity, id); // intercept list for what we deleted
		entity.goToView(); // go to the related entity view
		entity.waitForGet().then((res) => {
			entity.checkGetResponse(res.response.body);
			this.interceptListRoute({});
		});
		this.waitForList().then((res) => {
			this.checkListResponse(res, false);
		});
		cy.wait(1000);
		this.getListRows().its('length').as('remainingItems');
		cy.get('@remainingItems').then((remainingItems) => {
			if (remainingItems > 1) {
				this.getId().then((id) => {
					this.getListRows()
						.eq(1)
						.within(() => {
							cy.get('td').first().should('not.have.text', id);
						});
				});
			} else {
				this.getListRows().its('length').should('eq', 1);
			}
		});
	}
	checkAssociationBeforeDisassociation(entity) {
		this.getId().then((id) => {
			this.configAssociateListIntercept(entity, id); // intercept list for what we deleted
		});
		this.goToFirstItem();
		cy.wait(`@${entity.variablesNames.listRequest}`).then((res) => {
			entity.checkListResponse(res, false);
			if (res.response.body.items || !res.response.body.items.length > 0) {
				this.associateEntities({ name: entity.entity, mock: {} });
			}
		});
		this.visitList();
	}

	savePostResponse(res) {
		cy.wrap(res.response.body.id).as(this.variablesNames.id);
		this.typeFields().forEach((field) => {
			if (field.image) {
				cy.wrap(res.response.body[field.name]).as(
					this.variablesNames.postImage,
				);
			}
			// else if (field.required) {
			// 	const fieldCapytalized = generalUtils.capitalizeFirstLetter(field.name);
			// 	const typeCapitalized = generalUtils.capitalizeFirstLetter(this.entity);
			// 	cy.wrap(res.response.body[field.name]).as(
			// 		`post${typeCapitalized}${fieldCapytalized}`,
			// 	);
			// }
		});
	}
	checkAndSavePostResponse(res) {
		this.checkPostResponse(res);
		this.savePostResponse(res);
	}
	checkListResponse(res, mustHaveItems) {
		cy.wrap(res.response.statusCode).should('eq', 200);
		if (mustHaveItems) {
			cy.wrap(res.response.body).should('have.property', 'items');
			const { items } = res.response.body;
			cy.wrap(items).its('length').should('be.gt', 0);
			if (!items.length > 0) {
				throw new Error('test fails here');
			} else {
				const firstItem = items[0];
				cy.wrap(firstItem).should('have.property', 'id');
			}
		}
	}
	checkView(entity) {
		this.typeFields().forEach((field) => {
			const value = entity[field.name];
			if (value || field.required) {
				const fieldId = this.getFieldId(field.name);
				if (field.image && value) {
					cy.get(fieldId).imagesShouldBeEqual();
				} else if (Array.isArray(value)) {
					cy.get(fieldId).should('contain', ...value);
				} else {
					cy.get(fieldId).should('contain', value);
				}
			}
		});
	}
}

cy.Entity = EntityTest;
