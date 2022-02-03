<template>
	<q-layout view="lHh Lpr lFf">
		<q-header elevated>
			<q-toolbar>
				<q-btn
					flat
					dense
					round
					@click="leftDrawerOpen = !leftDrawerOpen"
					aria-label="Menu"
					icon="menu"
				/>

				<q-toolbar-title> Quasar App </q-toolbar-title>

				<div>
					<q-toggle
						v-model="dark"
						color="secondary"
						label="Dark Theme"
						@click="setDark(dark)"
					/>
				</div>
			</q-toolbar>
		</q-header>

		<q-drawer v-model="leftDrawerOpen" show-if-above bordered>
			<q-list>
				<router-link to="/">
					<q-item clickable>
						<q-item-section avatar>
							<q-icon name="home" />
						</q-item-section>
						<q-item-section>
							<q-item-label>Home</q-item-label>
						</q-item-section>
					</q-item>
				</router-link>
				<router-link to="/resources">
					<q-item clickable>
						<q-item-section avatar>
							<q-icon name="view_in_ar" />
						</q-item-section>
						<q-item-section>
							<q-item-label>Resources</q-item-label>
						</q-item-section>
					</q-item>
				</router-link>
				<router-link to="/events">
					<q-item clickable>
						<q-item-section avatar>
							<q-icon name="event" />
						</q-item-section>
						<q-item-section>
							<q-item-label>Events</q-item-label>
						</q-item-section>
					</q-item>
				</router-link>
				<router-link to="/classes">
					<q-item clickable>
						<q-item-section avatar>
							<q-icon name="school" />
						</q-item-section>
						<q-item-section>
							<q-item-label>Classes</q-item-label>
						</q-item-section>
					</q-item>
				</router-link>
			</q-list>
		</q-drawer>

		<q-page-container>
			<div class="q-pa-lg">
				<router-view />
			</div>
		</q-page-container>
	</q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Dark, LocalStorage } from 'quasar';

export default defineComponent({
	name: 'LayoutDefault',

	setup() {
		const darkFromStorage = LocalStorage.getItem('dark');
		const followOS = true;
		let dark = false;
		if (darkFromStorage !== null) {
			dark = darkFromStorage as boolean;
		} else {
			dark =
				window.matchMedia &&
				window.matchMedia('(prefers-color-scheme: dark)').matches;
		}

		return {
			leftDrawerOpen: ref(false),
			dark: ref(dark),
			followOS: ref(followOS),
		};
	},
	methods: {
		setDark(value: boolean) {
			this.dark = value;
			Dark.set(value);
			LocalStorage.set('dark', value);
		},
	},
	created() {
		if (this.followOS) {
			window
				.matchMedia('(prefers-color-scheme: dark)')
				.addEventListener('change', (e) => {
					const newColorScheme = e.matches ? true : false;
					this.dark = newColorScheme;
					this.setDark(this.dark);
				});
		}
		this.setDark(this.dark);
	},
});
</script>

<style lang="scss">
@import './styles/eventmanager.scss';
</style>
