<template>
	<div>
		<h5 class="q-mb-md">{{ typeCapitalized }} List</h5>
		<table-list
			:items="consultList"
			ref="list"
			:type="type"
			:typeName="typeName"
			:loading="loading"
			v-model:pageInformation="pageInformation"
			@request="request"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, reactive } from 'vue';
import TableList from '@/components/tableList/TableList.vue';
import {
	EventService,
	ClassService,
	ResourceService,
} from '@services/eventManagerAPI';
import { ConsultList, ConsultListMetadata } from '@/models';

export default defineComponent({
	name: 'EntityList',
	props: {
		type: {
			type: Object as PropType<unknown>,
			required: true,
		},
		service: {
			type: [EventService, ClassService, ResourceService] as PropType<
				EventService | ClassService | ResourceService
			>,
			required: true,
		},
		typeName: {
			type: String,
			required: true,
		},
	},
	components: {
		TableList,
	},
	setup(props) {
		type T = typeof props.type;
		const consultList = ref(new ConsultList<T>());
		const loading = ref(false);

		return {
			consultList,
			loading,
			pageInformation: reactive({
				page: 1,
				descending: true,
				sortBy: 'id',
				rowsPerPage: 5,
				rowsNumber: 0,
			}),
		};
	},
	computed: {
		typeCapitalized(): string {
			return this.typeName.charAt(0).toUpperCase() + this.typeName.slice(1);
		},
	},
	methods: {
		fetch<T>() {
			this.loading = true;
			(this.service.getMultiple() as Promise<ConsultList<T>>)
				.then((data: ConsultList<T>) => {
					Object.assign(this.consultList, data);
					this.updatePagination(data.metadata);
				})
				.catch((error) => {
					this.$showError(error, 'Error fetching');
				})
				.finally(() => {
					this.loading = false;
				});
		},
		updatePagination(metadata?: ConsultListMetadata) {
			this.pageInformation.page = 1;
			this.pageInformation.rowsNumber = metadata ? metadata.total : 0;
		},
		typedFetch() {
			const { type } = this;
			type T = typeof type;
			this.fetch<T>();
		},
		request(props: unknown) {
			Object.assign(this.pageInformation, props);
			this.typedFetch();
		},
	},
	created() {
		this.typedFetch();
	},
});
</script>
