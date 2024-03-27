<template>
	<div class="app">

		
		
		<!-- Sidebar -->
		<!-- Conditionally render the sidebar based on meta property -->
		<!-- <Sidebar v-if="!$route.meta.hideSidebar" /> -->
		
		<!-- Content -->
		<router-view />
		
		<div >
			<BAlert
				class="alerts"
				v-model="dismissCountDown"
				dismissible
				v-if="errorStorage.error"
				variant="danger"
				@close-countdown="countdown = $event"
			>
				<p>{{ errorStorage.error }} {{ countdown / 1000 }} seconds...</p>
				<BProgress
					variant="danger"
					:max="dismissCountDown"
					:value="countdown"
					height="4px"
				/>
			</BAlert>
		</div>
		
	</div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useErrorStorage } from "./stores/error";
import { useRouter } from "vue-router";

import Sidebar from './components/Sidebar.vue'

const router = useRouter();
const dismissCountDown = ref(5000);
let countdown = ref(0);
const errorStorage = useErrorStorage();

onBeforeMount(() => {
    if (!localStorage.getItem("token")) {
        router.push({ path: "/login" });
    }
});
</script>

<style lang="scss">
:root {
	--primary: #4ade80;
	--primary-alt: #22c55e;
	--grey: #64748b;
	--dark: #1e293b;
	--dark-alt: #334155;
	--light: #f1f5f9;
	--sidebar-width: 300px;
}

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'Fira sans', sans-serif;
}

body {
	background: var(--light);
}

button {
	cursor: pointer;
	appearance: none;
	border: none;
	outline: none;
	background: none;
}

.app {
	display: flex;

	main {
		flex: 1 1 0;
		padding: 2rem;

		@media (max-width: 1024px) {
			padding-left: 6rem;
		}
	}
}
</style>