<template>
	<div>
		<div class="row justify-between items-end">
			<h5 class="q-mb-md">{{ typeCapitalized }} List</h5>
			<router-link :to="addNewLinkComp">
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
			:getResources="getResources"
			@request="request"
			@delete="(id) => this.delete(id)"
			@unlink="(id) => this.unlink(id)"
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
	AuthorService,
} from '@services/eventManagerAPI';
import {
	ConsultList,
	ConsultListMetadata,
	Pagination,
	PageInformation,
	Resource,
	Class,
	Event,
	Author,
} from '@/models';

export default defineComponent({
	name: 'EntityList',
	props: {
		type: {
			type: Object as PropType<Class | Resource | Event>,
			required: true,
		},
		service: {
			type: [
				EventService,
				ClassService,
				ResourceService,
				AuthorService,
			] as PropType<EventService | ClassService | ResourceService>,
			required: true,
		},
		typeName: {
			type: String,
			required: true,
		},
		extraParams: {
			type: Object,
			required: false,
		},
		addNewLink: {
			type: [String, Object] as PropType<string | unknown>,
			required: false,
		},
		getResources: Boolean,
		modelValue: {
			type: Object,
			required: false,
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
		addNewLinkComp(): string | unknown {
			if (this.addNewLink) {
				return this.addNewLink;
			}
			return { name: `add${this.typeCapitalized}` };
		},
		modelTypeNamePlural(): string {
			const name = (this.modelValue?.constructor.name + '').toLowerCase();
			if (name === 'event') {
				return 'events';
			}
			if (name === 'class') {
				return 'classes';
			}
			return name + 's';
		},
	},
	methods: {
		fetch<T extends Class | Resource | Event | Author>() {
			const pag = new PageInformation(this.pageInformation);
			const pagination = new Pagination(new PageInformation(pag));
			this.loading = true;
			const extraParams = this.extraParams || {};
			if (this.typeName !== 'Resource' || !this.getResources) {
				(
					this.service.getMultiple(pagination, extraParams) as Promise<
						ConsultList<T>
					>
				)
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
			} else {
				let service: EventService | ClassService;
				if (this.modelValue instanceof Event) service = new EventService();
				if (this.modelValue instanceof Class) service = new ClassService();
				else service = new EventService();
				(
					service.getResources(this.modelValue?.id, pagination) as Promise<
						ConsultList<T>
					>
				)
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
			}
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
		unlink(id: number) {
			this.loading = true;
			if (this.type instanceof Resource) {
				(
					(this.service as ResourceService).unlink(
						this.modelValue?.id,
						id,
						this.modelTypeNamePlural,
					) as Promise<string>
				)
					.then(() => {
						this.typedFetch();
						this.$q.notify({
							message: `${this.typeCapitalized} unlinked`,
							color: 'positive',
						});
					})
					.catch((error) => {
						this.$showError(error, `Error unlinking ${this.typeCapitalized}`);
					})
					.finally(() => {
						this.loading = false;
					});
			} else {
				(
					(this.service as EventService | ClassService).unlink(
						id,
						this.modelValue?.id,
					) as Promise<string>
				)
					.then(() => {
						this.typedFetch();
						this.$q.notify({
							message: `${this.typeCapitalized} unlinked`,
							color: 'positive',
						});
					})
					.catch((error) => {
						this.$showError(error, `Error unlinking ${this.typeCapitalized}`);
					})
					.finally(() => {
						this.loading = false;
					});
			}
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
