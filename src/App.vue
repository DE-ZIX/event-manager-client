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
				<q-item-label header>Essential Links</q-item-label>
				<q-item clickable tag="a" target="_blank" href="https://quasar.dev">
					<q-item-section avatar>
						<q-icon name="school" />
					</q-item-section>
					<q-item-section>
						<q-item-label>Docs</q-item-label>
						<q-item-label caption>quasar.dev</q-item-label>
					</q-item-section>
				</q-item>
				<q-item
					clickable
					tag="a"
					target="_blank"
					href="https://github.com/quasarframework/"
				>
					<q-item-section avatar>
						<q-icon name="code" />
					</q-item-section>
					<q-item-section>
						<q-item-label>Github</q-item-label>
						<q-item-label caption>github.com/quasarframework</q-item-label>
					</q-item-section>
				</q-item>
				<q-item
					clickable
					tag="a"
					target="_blank"
					href="https://chat.quasar.dev"
				>
					<q-item-section avatar>
						<q-icon name="chat" />
					</q-item-section>
					<q-item-section>
						<q-item-label>Discord Chat Channel</q-item-label>
						<q-item-label caption>chat.quasar.dev</q-item-label>
					</q-item-section>
				</q-item>
				<q-item
					clickable
					tag="a"
					target="_blank"
					href="https://forum.quasar.dev"
				>
					<q-item-section avatar>
						<q-icon name="forum" />
					</q-item-section>
					<q-item-section>
						<q-item-label>Forum</q-item-label>
						<q-item-label caption>forum.quasar.dev</q-item-label>
					</q-item-section>
				</q-item>
				<q-item
					clickable
					tag="a"
					target="_blank"
					href="https://twitter.com/quasarframework"
				>
					<q-item-section avatar>
						<q-icon name="rss_feed" />
					</q-item-section>
					<q-item-section>
						<q-item-label>Twitter</q-item-label>
						<q-item-label caption>@quasarframework</q-item-label>
					</q-item-section>
				</q-item>
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
