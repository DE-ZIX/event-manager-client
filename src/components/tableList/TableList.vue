<template>
	<div>
		<q-table
			v-model:pagination="pageInformationComp"
			:rows="itemsComp"
			:columns="columns"
			:loading="loading"
			color="primary"
			@request="handleRequest"
		>
			<template v-slot:body-cell-keywords="data" v-if="isResource">
				<q-td :props="data">
					<div class="q-gutter-x-sm">
						<q-badge v-for="keyword in data.row.keywords" :key="keyword">
							{{ keyword }}
						</q-badge>
					</div>
				</q-td>
			</template>
			<template v-slot:body-cell-actions="data">
				<q-td :props="data">
					<entity-list-actions
						:modelValue="data.row"
						:typeName="typeName"
						@delete="handleDelete"
						:typeCapitalized="typeCapitalized"
					/>
				</q-td>
			</template>
		</q-table>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ConsultList } from '@/models';
import EntityListActions from '@/components/tableList/EntityListActions.vue';
import { columns as columnsConfig } from '@/composables/views/tableList/index';

export default defineComponent({
	props: {
		type: {
			type: Object as PropType<unknown>,
			required: true,
		},
		items: ConsultList,
		typeName: { typeName: String, required: true },
		typeCapitalized: String,
		loading: Boolean,
		pageInformation: Object as PropType<unknown>,
	},
	components: {
		EntityListActions,
	},
	emits: ['update:pageInformation', 'request', 'delete'],
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
			if ((props as { pagination: unknown }).pagination) {
				this.$emit('request', (props as { pagination: unknown }).pagination);
			}
		},
		handleDelete(id: number) {
			this.$emit('delete', id);
		},
	},
});
</script>
