const generalUtils = {
	capitalizeFirstLetter: (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	},
	toSnakeCase(str) {
		return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
	},
	getEntityVariablesNames: (entity) => {
		const capytalizedEntity = generalUtils.capitalizeFirstLetter(entity);
		return {
			id: `${entity}Id`,
			title: `${entity}Title`,
			listRequest: `list${capytalizedEntity}`,
			listAssociateRequest: `listAssociate${capytalizedEntity}`,
			disassociateRequest: `disassociate${capytalizedEntity}`,
			associateRequest: `associate${capytalizedEntity}`,
			deleteRequest: `delete${capytalizedEntity}`,
			getRequest: `get${capytalizedEntity}`,
			postRequest: `post${capytalizedEntity}`,
			putRequest: `put${capytalizedEntity}`,
			tableId: `${entity}_list`,
			className: entity,
			capytalized: capytalizedEntity,
			postImage: `post${capytalizedEntity}Image`,
		};
	},
};
export default generalUtils;
cy.generalUtils = generalUtils;
