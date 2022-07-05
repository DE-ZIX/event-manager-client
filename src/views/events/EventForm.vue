<template>
	<div class="row">
		<div class="col-8 q-gutter-y-lg">
			<q-input for="event_title" v-model="model.title" filled label="Title" />
			<q-input
				v-model="model.description"
				for="event_description"
				label="Description"
				filled
				type="textarea"
			/>
			<q-file for="event_image" v-model="model.image" label="Image" filled>
				<template v-slot:prepend>
					<q-icon for="event_image" name="attach_file" />
				</template>
			</q-file>
			<q-input
				filled
				for="event_start_date"
				v-model="model.startDate"
				label="Start Date"
				hint="dd/MM/yyyy"
				mask="##/##/####"
				:rules="dateValidation"
			>
				<template v-slot:append>
					<q-icon name="event" class="cursor-pointer">
						<q-popup-proxy
							ref="qDateProxy"
							cover
							transition-show="scale"
							transition-hide="scale"
						>
							<q-date v-model="model.startDate" mask="DD/MM/YYYY">
								<div class="row items-center justify-end">
									<q-btn v-close-popup label="Close" color="primary" flat />
								</div>
							</q-date>
						</q-popup-proxy>
					</q-icon>
				</template>
			</q-input>
			<q-input
				filled
				v-model="model.endDate"
				label="End Date"
				for="event_end_date"
				mask="##/##/####"
				hint="dd/MM/yyyy"
				:rules="dateValidation"
			>
				<template v-slot:append>
					<q-icon name="event" class="cursor-pointer">
						<q-popup-proxy
							ref="qDateProxy"
							cover
							transition-show="scale"
							transition-hide="scale"
						>
							<q-date v-model="model.endDate" mask="DD/MM/YYYY">
								<div class="row items-center justify-end">
									<q-btn v-close-popup label="Close" color="primary" flat />
								</div>
							</q-date>
						</q-popup-proxy>
					</q-icon>
				</template>
			</q-input>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Event } from '@/models';
export default defineComponent({
	props: {
		modelValue: {
			type: Event,
			required: true,
		},
	},
	computed: {
		model: {
			get() {
				return this.modelValue;
			},
			set(val: Event) {
				this.$emit('update:modelValue', val);
			},
		},
		dateRegex() {
			return /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
		},
		dateValidation() {
			return [(val: string) => this.dateRegex.test(val)];
		},
	},
});
</script>
