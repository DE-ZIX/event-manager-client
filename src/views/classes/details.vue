<template>
	<div>
		<div class="row">
			<h5>{{ modelValue.getName() }}</h5>
			<entity-edit-btn :modelValue="modelValue" typeName="Resource" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ResourceService } from '@services/eventManagerAPI';
import { Resource } from '@/models';
import EntityEditBtn from '@/components/EntityEditBtn.vue';

export default defineComponent({
	components: {
		EntityEditBtn,
	},
	setup() {
		const service = new ResourceService();
		const modelValue = new Resource();
		const loading = false;

		return {
			service,
			modelValue,
			loading,
		};
	},
	methods: {
		fetch() {
			this.loading = true;
			const id = Number(this.$route.params.id);
			this.service
				.get(id)
				.then((data) => {
					this.modelValue = data;
				})
				.catch((error) => {
					this.$showError(error, 'Error fetching Resource');
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
