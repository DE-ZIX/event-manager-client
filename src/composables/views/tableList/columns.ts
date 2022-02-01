import { resourceColumnsConfig } from '@/composables/views/tableList/columns/index';

export default function () {
	const commonPreColumns = [
		{
			name: 'id',
			label: 'ID',
			sortable: true,
			field: 'id',
		},
	];
	const commonPostColumns = [
		{
			name: 'actions',
			label: 'Actions',
		},
	];

	const resourceColumns = [
		...commonPreColumns,
		...resourceColumnsConfig,
		...commonPostColumns,
	];

	return {
		commonPreColumns,
		commonPostColumns,
		resourceColumns,
	};
}
