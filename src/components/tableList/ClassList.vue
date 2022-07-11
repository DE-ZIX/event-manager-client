<template>
	<entity-list
		id="class_list"
		ref="list"
		:service="service"
		:type="classType"
		:typeName="typeName"
		:extraParams="extraParams"
		:addNewLink="addNewLink"
		:getResources="getResources"
		:modelValue="modelValue"
		:modelValueType="modelValueType"
		:extraTitle="extraTitle"
	/>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ClassService } from '@/services/eventManagerAPI';
import EntityList from '@/components/tableList/EntityList.vue';
import { Class } from '@/models';

export default defineComponent({
	props: {
		extraParams: {
			type: Object,
			required: false,
		},
		addNewLink: {
			type: [String, Object] as PropType<string | unknown>,
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
		modelValueType: {
			type: String,
			required: false,
		},
	},
	components: {
		EntityList,
	},
	setup() {
		const service = new ClassService();
		const classType = new Class();

		return {
			service,
			classType,
		};
	},
	computed: {
		typeName(): string {
			return 'Class' || this.classType.constructor.name;
		},
	},
	methods: {
		fetch() {
			(this.$refs.list as typeof EntityList).typedFetch();
		},
	},
});
</script>
