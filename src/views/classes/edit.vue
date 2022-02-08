<template>
	<div v-if="modelValue.id">
		<class-form v-model="modelValue" />
		<q-btn @click="save" class="q-mt-lg" label="Save" color="primary" no-caps />
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ClassForm from '@/views/classes/ClassForm.vue';
import { Class } from '@/models';
import { ClassService } from '@services/eventManagerAPI';

export default defineComponent({
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
				.put(this.modelValue as Class)
				.then((data) => {
					this.$showSuccess('Class updated');
					this.modelValue = new Class(data);
				})
				.catch((error) => {
					this.$showError(error, 'Error updating Resource');
				})
				.finally(() => {
					this.loading = false;
					this.$router.push({
						name: 'detailsClass',
						params: { id: this.modelValue.id },
					});
				});
		},
		fetch() {
			this.loading = true;
			this.service
				.get(Number(this.$route.params.id))
				.then((data) => {
					this.modelValue = new Class(data);
				})
				.catch((error) => {
					this.$showError(error, 'Error fetching Class');
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
