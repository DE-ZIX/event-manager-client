import {
	resourceColumnsConfig,
	eventColumnsConfig,
	classColumnsConfig,
	authorColumnsConfig,
} from '@/composables/views/tableList/columns/index';

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

const authorColumns = [
	...commonPreColumns,
	...authorColumnsConfig,
	...commonPostColumns,
];

export { resourceColumns, classColumns, eventColumns, authorColumns };
