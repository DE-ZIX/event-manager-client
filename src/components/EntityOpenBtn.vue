<template>
	<router-link
		:to="{ name: `details${typeName}`, params: { id: modelValue.id } }"
		target="_blank"
	>
		<q-btn icon="open_in_new" flat round color="primary">
			<q-tooltip>
				<span>Open in New Tab</span>
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
