<template>
	<div>
		<h5>Event</h5>
		<div class="row items-center q-gutter-x-md">
			<h6 id="event_title">{{ modelValue.getName() }}</h6>
			<entity-edit-btn
				:modelValue="modelValue"
				v-if="modelValue.id"
				typeName="Event"
			/>
		</div>
		<div class="q-gutter-y-lg">
			<div id="event_id">ID: {{ modelValue.id }}</div>
			<div>
				<div>Description:</div>
				<div id="event_description">{{ modelValue.description }}</div>
			</div>
			<div class="row q-gutter-x-lg">
				<div id="event_start_date">Start Date: {{ modelValue.startDate }}</div>
				<div id="event_end_date">End Date: {{ modelValue.endDate }}</div>
			</div>
			<div v-if="modelValue.image">
				<div>Image:</div>
				<img id="event_image" v-if="imageURL" :src="imageURL" />
			</div>
			<div>
				<resource-list
					v-if="modelValue.id"
					ref="resourceList"
					:addNewLink="{ name: 'detailsEventAddResource' }"
					getResources
					:modelValue="modelValue"
					modelValueType="Event"
					extraTitle="(Resources in which this event belongs to)"
				/>
			</div>
			<router-view
				:modelValue="modelValue"
				@add="refetchList"
				:service="service"
				:type="classType"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { EventService } from '@/services/eventManagerAPI';
import { Event } from '@/models';
import EntityEditBtn from '@/components/EntityEditBtn.vue';
import ResourceList from '@/components/tableList/ResourceList.vue';

export default defineComponent({
	name: 'EventDetails',
	components: {
		EntityEditBtn,
		ResourceList,
	},
	setup() {
		const service = new EventService();
		const modelValue = ref(new Event());
		const loading = false;
		const classType = new Event();

		return {
			service,
			modelValue,
			loading,
			classType,
		};
	},
	methods: {
		fetch() {
			this.loading = true;
			const id = Number(this.$route.params.id);
			this.service
				.get(id)
				.then((data) => {
					this.modelValue = new Event(data);
				})
				.catch((error) => {
					this.$showError(error, 'Error fetching Event');
				})
				.finally(() => {
					this.loading = false;
				});
		},
		refetchList() {
			(this.$refs.resourceList as typeof ResourceList).fetch();
		},
	},
	computed: {
		imageURL(): string | undefined {
			if (this.modelValue.image && this.modelValue.image instanceof File) {
				return URL.createObjectURL(this.modelValue.image);
			}
			return '';
		},
	},
	created() {
		this.fetch();
	},
});
</script>
