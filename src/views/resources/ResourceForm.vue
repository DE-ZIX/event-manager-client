<template>
	<div class="row">
		<div class="col-8 q-gutter-y-lg">
			<q-input
				v-model="model.title"
				for="resource_title"
				filled
				label="Title"
			/>
			<q-input
				v-model="model.description"
				for="resource_description"
				label="Description"
				filled
				type="textarea"
			/>
			<q-input v-model="model.link" for="resource_link" label="Link" filled />
			<q-file v-model="model.image" for="resource_image" label="Image" filled>
				<template v-slot:prepend>
					<q-icon name="attach_file" />
				</template>
			</q-file>
			<q-select
				v-model="model.keywords"
				multiple
				for="resource_keywords"
				use-chips
				filled
				use-input
				new-value-mode="add-unique"
				label="Keywords"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { Resource } from '@/models';
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		modelValue: {
			type: Resource,
			required: true,
		},
	},
	computed: {
		model: {
			get() {
				return this.modelValue;
			},
			set(val: Resource) {
				this.$emit('update:modelValue', val);
			},
		},
	},
});
</script>
