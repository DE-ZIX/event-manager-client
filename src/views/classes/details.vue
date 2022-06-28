<template>
	<div>
		<h5>Class</h5>
		<div class="row items-center q-gutter-x-md">
			<h6>{{ modelValue.getName() }}</h6>
			<entity-edit-btn
				:modelValue="modelValue"
				v-if="modelValue.id"
				typeName="Class"
			/>
		</div>
		<div class="q-gutter-y-lg">
			<div>ID: {{ modelValue.id }}</div>
			<div>
				<div>Description:</div>
				<div>{{ modelValue.description }}</div>
			</div>
			<div>Last Updated: {{ modelValue.updatedDate }}</div>
			<div v-if="modelValue.image">
				<div>Image:</div>
				<img v-if="imageURL" :src="imageURL" />
			</div>
			<div>
				<resource-list
					v-if="modelValue.id"
					ref="resourceList"
					:modelValue="modelValue"
					:addNewLink="{ name: 'detailsClassAddResource' }"
					getResources
					extraTitle="(Resources in which this class belongs to)"
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
import { ClassService } from '@services/eventManagerAPI';
import { Class } from '@/models';
import EntityEditBtn from '@/components/EntityEditBtn.vue';
import ResourceList from '@/components/tableList/ResourceList.vue';

export default defineComponent({
	components: {
		EntityEditBtn,
		ResourceList,
	},
	setup() {
		const service = new ClassService();
		const modelValue = ref(new Class());
		const loading = false;
		const classType = new Class();

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
					this.modelValue = new Class(data);
				})
				.catch((error) => {
					this.$showError(error, 'Error fetching Class');
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
