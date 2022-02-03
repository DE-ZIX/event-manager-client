<template>
	<div>
		<entity-open-btn :modelValue="modelValue" :typeName="typeName" />
		<entity-edit-btn :modelValue="modelValue" :typeName="typeName" />
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
import EntityEditBtn from '@/components/EntityEditBtn.vue';

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
		EntityEditBtn,
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
