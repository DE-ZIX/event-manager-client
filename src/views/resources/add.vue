<template>
	<h5>Add new Resource</h5>
	<resource-form v-model="modelValue" />
	<q-btn @click="save" class="q-mt-lg" label="Save" color="primary" no-caps />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ResourceForm from '@/views/resources/ResourceForm.vue';
import { Resource } from '@/models';
import { ResourceService } from '@services/eventManagerAPI';

export default defineComponent({
	name: 'AddResource',
	components: {
		ResourceForm,
	},
	setup() {
		const modelValue = ref(new Resource());
		const service = new ResourceService();
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
				.post(this.modelValue as Resource)
				.then((data) => {
					this.$showSuccess('Resource saved');
					this.modelValue = new Resource(data);
				})
				.catch((error) => {
					this.$showError(error, 'Error saving Resource');
				})
				.finally(() => {
					this.loading = false;
					this.$router.push({
						name: 'detailsResource',
						params: { id: this.modelValue.id },
					});
				});
		},
	},
});
</script>
