<template>
	<div>
		<h5>Resource</h5>
		<div class="row items-center q-gutter-x-md">
			<h6>{{ modelValue.getName() }}</h6>
			<entity-edit-btn
				:modelValue="modelValue"
				v-if="modelValue.id"
				typeName="Resource"
			/>
		</div>
		<div class="q-gutter-y-lg">
			<div>ID: {{ modelValue.id }}</div>
			<div>
				<div>Description:</div>
				<div>{{ modelValue.description }}</div>
			</div>
			<div>Link: {{ modelValue.link }}</div>
			<div class="row q-gutter-x-lg">
				<div>Created At: {{ modelValue.createdDate }}</div>
				<div>Last Updated: {{ modelValue.updatedDate }}</div>
			</div>
			<div v-if="modelValue.responsibleAuthor">
				<div>
					Responsible Author:
					{{
						`${modelValue.responsibleAuthor.name} ${modelValue.responsibleAuthor.surname}`
					}}
					<entity-open-btn
						:modelValue="modelValue.responsibleAuthor"
						typeName="Author"
					/>
				</div>
			</div>
			<div v-if="modelValue.authors && modelValue.authors.length > 0">
				Authors:
				<div v-for="author in modelValue.authors" :key="author.id">
					{{ author.name }} {{ author.surname }}
				</div>
			</div>
			<div v-if="modelValue.image">
				<div>Image:</div>
				<img v-if="imageURL" :src="imageURL" />
			</div>
			<div class="q-gutter-x-sm">
				Keywords:
				<q-badge v-for="keyword in modelValue.keywords" :key="keyword">
					{{ keyword }}
				</q-badge>
			</div>
			<div>
				<class-list
					v-if="modelValue.id"
					ref="classList"
					:extraParams="{ resource: modelValue.id }"
					:addNewLink="{ name: 'addResourceToClass' }"
					:modelValue="modelValue"
					extraTitle="(Classes that belong to this resource)"
					getResources
				/>
			</div>
			<div>
				<event-list
					v-if="modelValue.id"
					ref="eventList"
					:extraParams="{ resource: modelValue.id }"
					:addNewLink="{ name: 'addResourceToEvent' }"
					:modelValue="modelValue"
					extraTitle="(Events that belong to this resource)"
					getResources
				/>
			</div>
			<router-view :modelValue="modelValue" @add="refetchList" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { ResourceService } from '@services/eventManagerAPI';
import { Resource } from '@/models';
import EntityEditBtn from '@/components/EntityEditBtn.vue';
import EntityOpenBtn from '@/components/EntityOpenBtn.vue';
import ClassList from '@/components/tableList/ClassList.vue';
import EventList from '@/components/tableList/EventList.vue';

export default defineComponent({
	components: {
		EntityEditBtn,
		EntityOpenBtn,
		EventList,
		ClassList,
	},
	setup() {
		const service = new ResourceService();
		const modelValue = ref(new Resource());
		const loading = false;

		return {
			service,
			modelValue,
			loading,
		};
	},
	methods: {
		fetch() {
			this.loading = true;
			const id = Number(this.$route.params.id);
			this.service
				.get(id)
				.then((data) => {
					this.modelValue = new Resource(data);
				})
				.catch((error) => {
					this.$showError(error, 'Error fetching Resource');
				})
				.finally(() => {
					this.loading = false;
				});
		},
		refetchList(listType: string) {
			if (listType === 'class') {
				(this.$refs.classList as typeof ClassList).fetch();
			} else if (listType === 'event') {
				(this.$refs.eventList as typeof EventList).fetch();
			} else {
				(this.$refs.classList as typeof ClassList).fetch();
				(this.$refs.eventList as typeof EventList).fetch();
			}
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
