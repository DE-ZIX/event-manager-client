<template>
	<div>
		<q-table></q-table>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { ConsultList } from '@/models';

export default defineComponent({
	props: {
		items: {
			type: ConsultList,
		},
	},
	setup() {
		return {
			pageInformation: ref({
				page: 1,
				descending: true,
				sortBy: 'id',
				rowsPerPage: 5,
				rowsNumber: 0,
			}),
		};
	},
});
</script>
