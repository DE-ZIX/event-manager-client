<template>
	<h5>Add new Class</h5>
	<class-form v-model="modelValue" />
	<q-btn @click="save" class="q-mt-lg" label="Save" color="primary" no-caps />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ClassForm from '@/views/classes/ClassForm.vue';
import { Class } from '@/models';
import { ClassService } from '@services/eventManagerAPI';

export default defineComponent({
	name: 'AddClass',
	components: {
		ClassForm,
	},
	setup() {
		const modelValue = ref(new Class());
		const service = new ClassService();
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
				.post(this.modelValue as Class)
				.then((data) => {
					this.$showSuccess('Class saved');
					this.modelValue = new Class(data);
				})
				.catch((error) => {
					this.$showError(error, 'Error saving Class');
				})
				.finally(() => {
					this.loading = false;
					this.$router.push({
						name: 'detailsClass',
						params: { id: this.modelValue.id },
					});
				});
		},
	},
});
</script>
