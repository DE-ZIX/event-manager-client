<template>
	<entity-list
		id="resource_list"
		ref="list"
		:service="service"
		:type="classType"
		:typeName="typeName"
		:extraParams="extraParams"
		:getResources="getResources"
		:modelValue="modelValue"
		:extraTitle="extraTitle"
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
		getResources: {
			type: Boolean,
			required: false,
		},
		modelValue: {
			type: Object,
			required: false,
		},
		extraTitle: {
			type: String,
			required: false,
			default: '',
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
