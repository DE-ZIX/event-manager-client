<template>
	<div class="row">
		<div class="col-8 q-gutter-y-lg">
			<q-input for="class_title" v-model="model.title" filled label="Title" />
			<q-input
				v-model="model.description"
				for="class_description"
				label="Description"
				filled
				type="textarea"
			/>
			<q-file for="class_image" v-model="model.image" label="Image" filled>
				<template v-slot:prepend>
					<q-icon name="attach_file" />
				</template>
			</q-file>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Class } from '@/models';
export default defineComponent({
	props: {
		modelValue: {
			type: Class,
			required: true,
		},
	},
	computed: {
		model: {
			get() {
				return this.modelValue;
			},
			set(val: Class) {
				this.$emit('update:modelValue', val);
			},
		},
	},
});
</script>
