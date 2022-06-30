<template>
	<div v-if="modelValue.id">
		<h5>Edit Event - {{ modelValue.title }}</h5>
		<event-form v-model="modelValue" />
		<q-btn @click="save" class="q-mt-lg" label="Save" color="primary" no-caps />
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import EventForm from '@/views/events/EventForm.vue';
import { Event } from '@/models';
import { EventService } from '@/services/eventManagerAPI';

export default defineComponent({
	name: 'EditEvent',
	components: {
		EventForm,
	},
	setup() {
		const modelValue = ref(new Event());
		const service = new EventService();
		const loading = ref(false);

		return {
			loading,
			modelValue,
			service,
		};
	},
	methods: {
		save() {
			this.loading = true;
			this.service
				.put(this.modelValue as Event)
				.then((data) => {
					this.$showSuccess('Event updated');
					this.modelValue = new Event(data);
				})
				.catch((error) => {
					this.$showError(error, 'Error updating Resource');
				})
				.finally(() => {
					this.loading = false;
					this.$router.push({
						name: 'detailsEvent',
						params: { id: this.modelValue.id },
					});
				});
		},
		fetch() {
			this.loading = true;
			this.service
				.get(Number(this.$route.params.id))
				.then((data) => {
					this.modelValue = new Event(data);
				})
				.catch((error) => {
					this.$showError(error, 'Error fetching Event');
				})
				.finally(() => {
					this.loading = false;
				});
		},
	},
	created() {
		this.fetch();
	},
});
</script>
