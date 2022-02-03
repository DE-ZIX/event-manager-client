<template>
	<div>
		<router-link
			:to="{ name: `edit${typeName}`, params: { id: modelValue.id } }"
		>
			<q-btn icon="o_edit" flat round color="primary">
				<q-tooltip>
					<span>Edit {{ typeCapitalized }}</span>
				</q-tooltip>
			</q-btn>
		</router-link>
		<q-btn
			icon="o_delete"
			flat
			round
			color="negative"
			@click="confirmDelete = true"
		>
			<q-tooltip>
				<span>Delete {{ typeCapitalized }}</span>
			</q-tooltip>
		</q-btn>
		<confirm-delete-modal
			v-model="confirmDelete"
			@confirmDelete="this.delete()"
			:typeName="typeName"
			:typeCapitalized="typeCapitalized"
			:name="modelValue.title"
		/>
	</div>
</template>

<script lang="ts">
import { Class, Resource, Event } from '@/models';
import { defineComponent, PropType, ref } from 'vue';
import ConfirmDeleteModal from '@/components/tableList/ConfirmDeleteModal.vue';

export default defineComponent({
	props: {
		modelValue: {
			type: Object as PropType<Resource | Class | Event>,
			required: true,
		},
		typeName: String,
		typeCapitalized: String,
	},
	components: {
		ConfirmDeleteModal,
	},
	computed: {
		typeNamePlural() {
			if (this.typeName?.toLowerCase() === 'class') {
				return `${this.typeName.toLowerCase()}es`;
			}
			return `${this.typeName?.toLowerCase()}s`;
		},
	},
	setup() {
		const confirmDelete = ref(false);
		return {
			confirmDelete,
		};
	},
	methods: {
		delete() {
			this.$emit('delete', this.modelValue.id);
		},
	},
});
</script>
