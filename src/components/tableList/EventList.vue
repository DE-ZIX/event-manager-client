<template>
	<entity-list
		id="event_list"
		ref="list"
		:service="service"
		:type="classType"
		:typeName="typeName"
		:extraParams="extraParams"
		:addNewLink="addNewLink"
		:getResources="getResources"
		:modelValue="modelValue"
		:extraTitle="extraTitle"
	/>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { EventService } from '@services/eventManagerAPI';
import EntityList from '@/components/tableList/EntityList.vue';
import { Event } from '@/models';

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
	},
	components: {
		EntityList,
	},
	setup() {
		const service = new EventService();
		const classType = new Event();

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
