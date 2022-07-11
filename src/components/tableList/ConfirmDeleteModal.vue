<template>
	<q-dialog id="delete_modal" v-model="model">
		<q-card>
			<q-card-section class="delete_message">
				Confirm the deletion of this {{ typeCapitalized }} {{ name }} ?
			</q-card-section>
			<q-card-actions>
				<q-btn
					flat
					id="delete_btn"
					v-close-popup
					color="primary"
					@click="confirmDelete"
					label="Yes"
					no-caps
				/>
				<q-btn flat v-close-popup color="negative" label="Cancel" no-caps />
			</q-card-actions>
		</q-card>
	</q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		modelValue: {
			type: Boolean,
			required: true,
		},
		typeName: String,
		typeCapitalized: String,
		name: String,
	},
	emits: ['confirmDelete', 'update:modelValue'],
	computed: {
		model: {
			get() {
				return this.modelValue;
			},
			set(val: boolean) {
				this.$emit('update:modelValue', val);
			},
		},
	},
	methods: {
		confirmDelete() {
			this.$emit('confirmDelete');
		},
	},
});
</script>
