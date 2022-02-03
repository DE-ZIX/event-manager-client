<template>
	<div>
		<div class="row justify-between items-end">
			<h5 class="q-mb-md">{{ typeCapitalized }} List</h5>
			<router-link :to="{ name: `add${typeCapitalized}` }">
				<q-btn
					round
					color="primary"
					icon="add"
					size="sm"
					style="height: fit-content"
					class="q-mb-md"
				>
					<q-tooltip>
						<span>Add {{ typeCapitalized }}</span>
					</q-tooltip>
				</q-btn>
			</router-link>
		</div>
		<table-list
			:items="consultList"
			ref="list"
			:type="type"
			:typeName="typeName"
			:loading="loading"
			v-model:pageInformation="pageInformation"
			:typeCapitalized="typeCapitalized"
			@request="request"
			@delete="(id) => this.delete(id)"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';
import TableList from '@/components/tableList/TableList.vue';
import {
	EventService,
	ClassService,
	ResourceService,
} from '@services/eventManagerAPI';
import {
	ConsultList,
	ConsultListMetadata,
	Pagination,
	PageInformation,
	Resource,
	Class,
	Event,
} from '@/models';

export default defineComponent({
	name: 'EntityList',
	props: {
		type: {
			type: Object as PropType<Class | Resource | Event>,
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

		const pageInformation = ref({
			page: 1,
			descending: true,
			sortBy: 'id',
			rowsPerPage: 5,
			rowsNumber: 0,
		});

		return {
			consultList,
			loading,
			pageInformation,
		};
	},
	computed: {
		typeCapitalized(): string {
			return this.typeName.charAt(0).toUpperCase() + this.typeName.slice(1);
		},
	},
	methods: {
		fetch<T extends Class | Resource | Event>() {
			const pag = new PageInformation(this.pageInformation);
			const pagination = new Pagination(new PageInformation(pag));
			this.loading = true;
			(this.service.getMultiple(pagination) as Promise<ConsultList<T>>)
				.then((data: ConsultList<T>) => {
					Object.assign(this.consultList, data);
					this.updatePagination(data.metadata);
				})
				.catch((error) => {
					this.$showError(error, `Error fetching  ${this.typeCapitalized}`);
				})
				.finally(() => {
					this.loading = false;
				});
		},
		updatePagination(metadata?: ConsultListMetadata) {
			this.pageInformation.rowsNumber = metadata ? metadata.total : 0;
		},
		typedFetch() {
			const { type } = this;
			type T = typeof type;
			this.fetch<T>();
		},
		request(props: unknown) {
			const { page, rowsPerPage, sortBy, descending } = new PageInformation(
				props as PageInformation,
			);
			this.pageInformation.page = page;
			this.pageInformation.rowsPerPage = rowsPerPage;
			this.pageInformation.sortBy = sortBy;
			this.pageInformation.descending = descending;
			this.typedFetch();
		},
		delete(id: number) {
			this.loading = true;
			(this.service.delete(id) as Promise<string>)
				.then(() => {
					this.typedFetch();
					this.$q.notify({
						message: `${this.typeCapitalized} deleted`,
						color: 'positive',
					});
				})
				.catch((error) => {
					this.$showError(error, `Error deleting ${this.typeCapitalized}`);
				})
				.finally(() => {
					this.loading = false;
				});
		},
	},
	created() {
		this.typedFetch();
	},
	watch: {
		pageInformation: {
			handler() {
				this.typedFetch();
			},
			deep: true,
		},
	},
});
</script>
