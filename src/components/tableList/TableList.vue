<template>
	<div>
		<q-table
			v-model:pagination="pageInformationComp"
			:rows="itemsComp"
			:columns="columns"
			:loading="loading"
			color="primary"
			@request="handleRequest"
			@row-click="handleClick"
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
						:getResources="getResources"
						@delete="handleDelete"
						@unlink="handleUnlink(data.row.id)"
						:typeCapitalized="typeCapitalized"
					/>
				</q-td>
			</template>
		</q-table>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ConsultList, Resource } from '@/models';
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
		getResources: Boolean,
	},
	components: {
		EntityListActions,
	},
	emits: ['update:pageInformation', 'request', 'delete', 'unlink'],
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
		isAuthor() {
			return this.typeName === 'Author';
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
			if (this.isAuthor) {
				return columnsConfig().authorColumns;
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
		handleClick(evt: PointerEvent, row: Resource) {
			const fromAction = evt.composedPath().some((el) => {
				if (el instanceof Element) {
					return el.classList.contains('q-btn');
				}
			});
			if (!fromAction) {
				this.$router.push({
					name: `details${this.typeName}`,
					params: { id: row.id },
				});
			}
		},
		handleUnlink(id: number) {
			this.$emit('unlink', id);
		},
	},
});
</script>
