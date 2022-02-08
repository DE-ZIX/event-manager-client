<template>
	<q-dialog v-model="showComp">
		<q-card style="width: 500px">
			<q-card-section>
				<div class="row items-center justify-between">
					<h5>Choose Resource</h5>
					<q-btn
						flat
						icon="close"
						style="height: fit-content"
						round
						v-close-popup
						no-caps
					/>
				</div>
			</q-card-section>
			<q-card-section>
				<q-select
					:options="options"
					:loading="loadingOptions"
					v-model="value"
					option-label="title"
					clearable
					option-value="id"
				>
					<template v-slot:option="scope">
						<q-item v-bind="scope.itemProps">
							<q-item-section>
								<q-item-label>{{ scope.opt.title }}</q-item-label>
								<q-item-label caption>ID: {{ scope.opt.id }}</q-item-label>
							</q-item-section>
						</q-item>
					</template>
				</q-select>
			</q-card-section>
			<q-card-section>
				<q-btn
					flat
					v-close-popup
					color="primary"
					@click="addResource"
					:disable="!value || !value.id"
					label="Add"
					no-caps
				/>
				<q-btn flat v-close-popup color="negative" label="Cancel" no-caps />
			</q-card-section>
		</q-card>
	</q-dialog>
</template>

<script lang="ts">
import { Resource, Class, Event } from '@/models';
import {
	ClassService,
	EventService,
	ResourceService,
} from '@/services/eventManagerAPI';
import { defineComponent, ref, PropType } from 'vue';

export default defineComponent({
	props: {
		modelValue: {
			type: Object as PropType<Resource | Class | Event>,
			required: true,
		},
		service: {
			type: [EventService, ClassService] as PropType<
				EventService | ClassService
			>,
			required: true,
		},
		type: {
			type: Object as PropType<Class | Event>,
			required: true,
		},
	},
	setup() {
		const show = ref(true);
		const resourceService = new ResourceService();
		const options = ref(new Array<Resource>());
		const loadingOptions = ref(false);
		const loading = ref(false);
		const value = ref<Resource | null>(null);
		return {
			show,
			resourceService,
			options,
			loadingOptions,
			value,
			loading,
		};
	},
	computed: {
		showComp: {
			get(): boolean {
				return this.show;
			},
			set(value: boolean) {
				this.show = value;
				if (!value)
					this.$router.push({
						name: `details${this.type.constructor.name}`,
						params: { id: this.modelValue.id },
					});
			},
		},
	},
	methods: {
		fetchOptions() {
			this.loadingOptions = true;
			this.resourceService
				.getMultiple(undefined, { notInCollection: this.modelValue.id })
				.then((data) => {
					this.options = data.items || [];
				})
				.catch((error) => {
					this.$showError(error, 'Error fetching Resources');
				})
				.finally(() => {
					this.loadingOptions = false;
				});
		},
		add<T extends Class | Event>() {
			this.loading = true;
			(
				this.service.addResource(
					this.modelValue.id || 0,
					this.value?.id || 0,
				) as Promise<T>
			)
				.then(() => {
					this.$emit('add');
					this.$showSuccess('Resource added Succesffully');
				})
				.catch((error: string) => {
					this.$showError(error, 'Error adding Resource');
				})
				.finally(() => {
					this.loading = false;
				});
		},
		addResource() {
			const { type } = this;
			type T = typeof type;
			this.add<T>();
		},
	},
	created() {
		this.fetchOptions();
	},
});
</script>
