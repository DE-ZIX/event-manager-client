import {
	resourceColumnsConfig,
	eventColumnsConfig,
	classColumnsConfig,
} from '@/composables/views/tableList/columns/index';

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

	const classColumns = [
		...commonPreColumns,
		...classColumnsConfig,
		...commonPostColumns,
	];

	const eventColumns = [
		...commonPreColumns,
		...eventColumnsConfig,
		...commonPostColumns,
	];

	return {
		commonPreColumns,
		commonPostColumns,
		resourceColumns,
		classColumns,
		eventColumns,
	};
}
