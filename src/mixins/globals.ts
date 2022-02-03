import { useQuasar } from 'quasar';
import { defineComponent } from 'vue';
export default defineComponent({
	setup() {
		const $q = useQuasar();
		return {
			$q,
		};
	},
	methods: {
		$showSuccess(message = 'Action Completed Successfully') {
			this.$q.notify({
				message: message,
				color: 'positive',
			});
		},
		$showError(error = '', message = 'Something went wrong') {
			if (error) console.log(error);
			this.$q.notify({
				message: message,
				color: 'negative',
			});
		},
	},
});
