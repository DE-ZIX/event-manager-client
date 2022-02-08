<template>
	<entity-list
		ref="list"
		:service="service"
		:type="classType"
		:typeName="typeName"
		:extraParams="extraParams"
		:getResources="getResources"
		:modelValue="modelValue"
	/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import EntityList from '@/components/tableList/EntityList.vue';
import { ResourceService } from '@services/eventManagerAPI';
import { Resource } from '@/models';

export default defineComponent({
	props: {
		extraParams: {
			type: Object,
			required: false,
		},
		getResources: Boolean,
		modelValue: {
			type: Object,
			required: false,
		},
	},
	components: {
		EntityList,
	},
	setup() {
		const service = new ResourceService();
		const classType = new Resource();

		return {
			service,
			classType,
		};
	},
	computed: {
		typeName(): string {
			return this.classType.constructor.name;
		},
	},
	methods: {
		fetch() {
			(this.$refs.list as typeof EntityList).typedFetch();
		},
	},
});
</script>
