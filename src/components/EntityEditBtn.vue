<template>
	<router-link :to="{ name: `edit${typeName}`, params: { id: modelValue.id } }">
		<q-btn icon="o_edit" flat round color="primary">
			<q-tooltip>
				<span>Edit {{ typeName }}</span>
			</q-tooltip>
		</q-btn>
	</router-link>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Class, Resource, Event } from '@/models';
export default defineComponent({
	props: {
		modelValue: {
			type: Object as PropType<Resource | Class | Event>,
			required: true,
		},
		typeName: String,
	},
});
</script>
