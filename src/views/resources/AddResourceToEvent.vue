<template>
	<q-dialog v-model="showComp">
		<q-card style="width: 500px">
			<q-card-section>
				<div class="row items-center justify-between">
					<h5>Choose Event</h5>
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
					@click="add"
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
import { Resource, Event } from '@/models';
import { EventService } from '@/services/eventManagerAPI';
import { defineComponent, ref } from 'vue';

export default defineComponent({
	props: {
		modelValue: {
			type: Resource,
			required: true,
		},
	},
	setup() {
		const show = ref(true);
		const service = new EventService();
		const options = ref(new Array<Event>());
		const loadingOptions = ref(false);
		const loading = ref(false);
		const value = ref<Event | null>(null);
		return {
			show,
			service,
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
						name: 'detailsResource',
						params: { id: this.modelValue.id },
					});
			},
		},
	},
	methods: {
		fetchOptions() {
			this.loadingOptions = true;
			this.service
				.getMultiple()
				.then((data) => {
					this.options = data.items || [];
				})
				.catch((error) => {
					this.$showError(error, 'Error fetching Resource');
				})
				.finally(() => {
					this.loadingOptions = false;
				});
		},
		add() {
			this.loading = true;
			this.service
				.addResource(this.value?.id || 0, this.modelValue.id || 0)
				.then(() => {
					this.$emit('add', 'event');
					this.$showSuccess('Resource added to Event Succesffully');
				})
				.catch((error: string) => {
					this.$showError(error, 'Error adding Resource to Event');
				})
				.finally(() => {
					this.loading = false;
				});
		},
	},
	created() {
		this.fetchOptions();
	},
});
</script>
