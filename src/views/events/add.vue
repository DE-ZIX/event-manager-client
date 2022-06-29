<template>
	<h5>Add new Event</h5>
	<event-form v-model="modelValue" />
	<q-btn @click="save" class="q-mt-lg" label="Save" color="primary" no-caps />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import EventForm from '@/views/events/EventForm.vue';
import { Event } from '@/models';
import { EventService } from '@services/eventManagerAPI';

export default defineComponent({
	name: 'AddEvent',
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
				.post(this.modelValue as Event)
				.then((data) => {
					this.$showSuccess('Event saved');
					this.modelValue = new Event(data);
				})
				.catch((error) => {
					this.$showError(error, 'Error saving Event');
				})
				.finally(() => {
					this.loading = false;
					this.$router.push({
						name: 'detailsEvent',
						params: { id: this.modelValue.id },
					});
				});
		},
	},
});
</script>
