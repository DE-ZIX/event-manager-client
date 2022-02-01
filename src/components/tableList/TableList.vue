<template>
	<div>
		<q-table
			v-model:pagination="pageInformation"
			:rows="itemsComp"
			:columns="columns"
		>
			<template v-slot:body-cell-actions="data">
				<q-td>
					<resource-list-actions :data="data" v-if="isResource" />
					<class-list-actions :data="data" v-if="isClass" />
					<event-list-actions :data="data" v-if="isEvent" />
					<!-- <author-list-actions :data="data" v-if="isAuthor" /> -->
				</q-td>
			</template>
		</q-table>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { ConsultList } from '@/models';
import EventListActions from '@/components/tableList/EventListActions.vue';
import ResourceListActions from '@/components/tableList/ResourceListActions.vue';
import ClassListActions from '@/components/tableList/ClassListActions.vue';
import { columns as columnsConfig } from '@/composables/views/tableList/index';
import { Resource } from '@/models/';

export default defineComponent({
	props: {
		items: ConsultList,
		type: { type: String, required: true },
	},
	components: {
		EventListActions,
		ResourceListActions,
		ClassListActions,
	},
	setup() {
		const { resourceColumns } = columnsConfig();
		const columns = ref(resourceColumns);

		return {
			columns,
			pageInformation: ref({
				page: 1,
				descending: true,
				sortBy: 'id',
				rowsPerPage: 5,
				rowsNumber: 0,
			}),
		};
	},
	computed: {
		isResource() {
			return this.type === 'resource';
		},
		isClass() {
			return this.type === 'class';
		},
		isEvent() {
			return this.type === 'event';
		},
		itemsComp() {
			return this.items ? this.items.items : [];
		},
	},
	methods: {
		updatePagination(data: ConsultList<Resource>) {
			this.pageInformation.page = 1;
			this.pageInformation.rowsNumber =
				data && data.metadata ? data.metadata.total : 0;
		},
	},
});
</script>
