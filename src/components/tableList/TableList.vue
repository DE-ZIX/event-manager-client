<template>
	<div>
		<q-table
			v-model:pagination="pageInformationComp"
			:rows="itemsComp"
			:columns="columns"
			:loading="loading"
			@request="handleRequest"
		>
			<template v-slot:body-cell-keywords="data" v-if="isResource">
				<q-td :props="data">
					<div class="q-gutter-x-sm">
						<q-badge v-for="keyword in data.row.keywords" :key="keyword">
							keyword
						</q-badge>
					</div>
				</q-td>
			</template>
			<template v-slot:body-cell-actions="data">
				<q-td :props="data">
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
import { defineComponent, PropType } from 'vue';
import { ConsultList } from '@/models';
import EventListActions from '@/components/tableList/EventListActions.vue';
import ResourceListActions from '@/components/tableList/ResourceListActions.vue';
import ClassListActions from '@/components/tableList/ClassListActions.vue';
import { columns as columnsConfig } from '@/composables/views/tableList/index';

export default defineComponent({
	props: {
		type: {
			type: Object as PropType<unknown>,
			required: true,
		},
		items: ConsultList,
		typeName: { typeName: String, required: true },
		loading: Boolean,
		pageInformation: Object as PropType<unknown>,
	},
	components: {
		EventListActions,
		ResourceListActions,
		ClassListActions,
	},
	emits: ['update:pageInformation', 'request'],
	computed: {
		pageInformationComp: {
			get() {
				return this.pageInformation;
			},
			set(val: unknown) {
				this.$emit('update:pageInformation', val);
			},
		},
		isResource() {
			return this.typeName === 'Resource';
		},
		isClass() {
			return this.typeName === 'Class';
		},
		isEvent() {
			return this.typeName === 'Event';
		},
		itemsComp() {
			return this.items ? this.items.items : [];
		},
		columns(): unknown[] {
			if (this.isResource) {
				return columnsConfig().resourceColumns;
			}
			if (this.isClass) {
				return columnsConfig().classColumns;
			}
			if (this.isEvent) {
				return columnsConfig().eventColumns;
			}
			return [];
		},
	},
	methods: {
		handleRequest(props: unknown) {
			this.$emit('request', props);
		},
	},
});
</script>
