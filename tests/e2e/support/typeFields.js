export function typeFields() {
	if (this.entity === 'resource') {
		return [
			{
				name: 'title',
				required: true,
			},
			{
				name: 'description',
			},
			{
				name: 'link',
			},
			{
				name: 'image',
				image: true,
			},
			{
				name: 'keywords',
			},
			{
				name: 'createdDate',
				required: true,
			},
			{
				name: 'updatedDate',
				// required: true,
			},
		];
	}
	if (this.entity === 'class') {
		{
			return [
				{
					name: 'title',
					required: true,
				},
				{
					name: 'description',
				},
				{
					name: 'image',
					image: true,
				},
				{
					name: 'updatedDate',
				},
			];
		}
	}
	if (this.entity === 'event') {
		return [
			{
				name: 'id',
				required: true,
			},
			{
				name: 'title',
				required: true,
			},
			{
				name: 'description',
			},
			{
				name: 'image',
				image: true,
			},
			{
				name: 'startDate',
				required: true,
			},
			{
				name: 'endDate',
				required: true,
			},
		];
	}
}

cy.typeFields = typeFields;
