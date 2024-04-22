<template>
	<div class="d-flex">
		<aside :class="`${is_expanded ? 'is-expanded' : ''}`">
			<div class="logo">
				<img :src="logoURL" alt="Vue" /> 
			</div>

			<div class="menu-toggle-wrap">
				<button class="menu-toggle" @click="ToggleMenu">
					<span class="material-icons">keyboard_double_arrow_right</span>
				</button>
			</div>

			<h3>Menu</h3>
			<div class="menu">
				<router-link to="/" class="button">
					<span class="material-icons">home</span>
					<span class="text">Home</span>
				</router-link>

				<!-- vagon-nazorat -->
				<router-link to="/vagon-nazorat"  class="button" @click="toggleVagonDropdown">
					<span class="material-icons">train</span>
					<span class="text">Вагон назорат</span>
					<span class="material-icons dropdown-icon" :class="{ 'rotate': vagonDropdownOpen }">expand_more</span>
				</router-link>

				<!-- vagon-nazorat-Dropdown -->
				<div v-show="vagonDropdownOpen">
					<router-link to="/vagon-nazorat/remain" class="button sub-button" >
						<span class="material-icons">star</span>
						<span class="text">Қолдиқ вагонлар</span>
					</router-link>
					<router-link to="/vagon-nazorat/repairing" class="button sub-button">
						<span class="material-icons">star</span>
						<span class="text">Тамирга олинган вагонлар</span>
					</router-link>
					<router-link to="/vagon-nazorat/repaired" class="button sub-button">
						<span class="material-icons">star</span>
						<span class="text">Тамирланган вагонлар</span>
					</router-link>
					<router-link to="/vagon-nazorat/owner" class="button sub-button">
						<span class="material-icons">star</span>
						<span class="text">Вагон эгаси</span>
					</router-link>
					<router-link to="/vagon-nazorat/owner-company" class="button sub-button">
						<span class="material-icons">star</span>
						<span class="text">Вагон фирма эгаси </span>
					</router-link>
				</div>
				<!-- /vagon-nazorat -->

				<!-- Ғилдирак сехи -->
				<router-link to="/gildirak-sexi"  class="button" @click="toggleAboutDropdown">
					<span class="material-icons">description</span>
					<span class="text">Ғилдирак сехи</span>
					<span class="material-icons dropdown-icon" :class="{ 'rotate': aboutDropdownOpen }">expand_more</span>
				</router-link>

				<!-- Ғилдирак сехи-Dropdown -->
				<div v-show="aboutDropdownOpen">
					<!-- <router-link to="/gildirak-sexi/vu-51" class="button sub-button" >
						<i class="bi bi-5-circle"></i><i class="bi bi-1-circle"></i>
						<span class="text m-2">ВУ-51</span>
					</router-link> -->
					<router-link to="/gildirak-sexi/vu-53" class="button sub-button" >
						<i class="bi bi-5-circle"></i><i class="bi bi-3-circle"></i>
						<span class="text m-2">ВУ-53</span>
					</router-link>
					<router-link to="/gildirak-sexi/vu-90" class="button sub-button">
						<!-- <span class="material-icons">star</span> -->
						<i class="bi bi-9-circle"></i><i class="bi bi-0-circle"></i>
						<span class="text">ВУ-90</span>
					</router-link>
					<router-link to="/gildirak-sexi/vu-91" class="button sub-button">
						<i class="bi bi-9-circle"></i><i class="bi bi-1-circle"></i>
						<span class="text m-2">ВУ-91</span>
					</router-link>
					<router-link to="/gildirak-sexi/vu-92" class="button sub-button">
						<i class="bi bi-9-circle"></i><i class="bi bi-2-circle"></i>
						<span class="text m-2">ВУ-92</span>
					</router-link>
					<router-link to="/gildirak-sexi/vu-93" class="button sub-button">
						<i class="bi bi-9-circle"></i><i class="bi bi-3-circle"></i>
						<span class="text m-2">ВУ-93</span>
					</router-link>
					<router-link to="/gildirak-sexi/naplavka" class="button sub-button">
						<span class="material-icons">star</span>
						<span class="text">Наплавка</span>
					</router-link>
					<!-- <router-link to="/gildirak-sexi/employee" class="button sub-button">
						<span class="material-icons">badge</span>
						<span class="text">Ишчилар</span>
					</router-link> -->
				</div>
				<!-- /Ғилдирак сехи -->


				<!-- Telejka сехи -->
				<router-link to="/telejka-sexi"  class="button" @click="toggleTelejkaDropdown">
					<span class="material-icons">description</span>
					<span class="text">Тележка сехи</span>
					<span class="material-icons dropdown-icon" :class="{ 'rotate': telejkaDropdownOpen }">expand_more</span>
				</router-link>
				<!-- / Telejka сехи -->

					<!-- Telejka сехи-Dropdown -->
				<div v-show="telejkaDropdownOpen">
					<router-link to="/telejka-sexi/telejka-prujinalarini-sinovdan-otkazishni-hisobga-olish" class="button sub-button" >
						<span class="material-icons">star</span>
						<span class="text m-2">Пружиналар синови</span>
					</router-link>
					<router-link to="/telejka-sexi/по-учёта-ремонта-и-испитанию-распорных-тяга-тележек-грузовых-вагонов" class="button sub-button" >
						<span class="material-icons">star</span>
						<span class="text m-2">Распорных тяга</span>
					</router-link>
					<router-link to="/telejka-sexi/триангелларни-таьмирлаш-ва-синовдан-ўтказиш" class="button sub-button" >
						<span class="material-icons">star</span>
						<span class="text m-2">Триангеллар</span>
					</router-link>
					
					<!-- <router-link to="/telejka-sexi/employee" class="button sub-button">
						<span class="material-icons">badge</span>
						<span class="text">Ишчилар</span>
					</router-link> -->
				</div>
				<!-- /Telejka сехи-Dropdown -->


				<router-link to="/users" class="button">
					<span class="material-icons">group</span>
					<span class="text">Foydalanuvchilar</span>
				</router-link>

			</div>

			<div class="flex"></div>
			
			<div class="menu">
				<router-link to="/settings" class="button">
					<span class="material-icons">settings</span>
					<span class="text">Settings</span>
				</router-link>
			</div>
		</aside>
		<router-view/>
</div>
</template>

<script setup>
import { ref } from 'vue'
import logoURL from '../assets/logo.jpg'
import { watch } from 'vue'
// import { useRoute } from 'vue-router'

// const route = useRoute()

const currentUser = ref({})
const is_expanded = ref(localStorage.getItem("is_expanded") === "true")
const vagonDropdownOpen = ref(false)
const aboutDropdownOpen = ref(false)
const telejkaDropdownOpen = ref(false)

const toggleVagonDropdown = () => {
	vagonDropdownOpen.value = !vagonDropdownOpen.value
}

const toggleAboutDropdown = () => {
  aboutDropdownOpen.value = !aboutDropdownOpen.value
}

const toggleTelejkaDropdown = () => {
	telejkaDropdownOpen.value = !telejkaDropdownOpen.value
}

const ToggleMenu = () => {
	is_expanded.value = !is_expanded.value
	localStorage.setItem("is_expanded", is_expanded.value)
}


watch(() => {

	currentUser.value =JSON.parse( localStorage.getItem("userData"));
            // if (res.data.user.role  ===  "g'ildirakSexi") {
            //     router.push({ path: "/gildirak-sexi" });
            // } else if (res.data.user.role  ===  "telejkaSexi") {
            //     router.push({ path: "/telejka-sexi" });
                
            // }
})
</script>

<style lang="scss" scoped>
aside {
	display: flex;
	flex-direction: column;

	background-color: var(--dark);
	color: var(--light);

	width: calc(2rem + 32px);
	overflow: hidden;
	min-height: 100vh;
	padding: 1rem;

	transition: 0.2s ease-in-out;

	.flex {
		flex: 1 1 0%;
	}

	.logo {
		margin-bottom: 1rem;

		img {
			width: 2rem;
		}
	}

	.menu-toggle-wrap {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 1rem;

		position: relative;
		top: 0;
		transition: 0.2s ease-in-out;

		.menu-toggle {
			transition: 0.2s ease-in-out;
			.material-icons {
				font-size: 2rem;
				color: var(--light);
				transition: 0.2s ease-out;
			}
			
			&:hover {
				.material-icons {
					color: var(--primary);
					transform: translateX(0.5rem);
				}
			}
		}
	}

	h3, .button .text {
		opacity: 0;
		transition: opacity 0.3s ease-in-out;
	}

	h3 {
		color: var(--grey);
		font-size: 0.875rem;
		margin-bottom: 0.5rem;
		text-transform: uppercase;
	}

	.menu {
		margin: 0 -1rem;

		.button {
			display: flex;
			align-items: center;
			text-decoration: none;

			transition: 0.2s ease-in-out;
			padding: 0.5rem 1rem;

			.material-icons {
				font-size: 2rem;
				color: var(--light);
				transition: 0.2s ease-in-out;
			}
			.text {
				color: var(--light);
				transition: 0.2s ease-in-out;
			}

			&:hover {
				background-color: var(--dark-alt);

				.material-icons, .text {
					color: var(--primary);
				}
			}

			&.router-link-exact-active {
				background-color: var(--dark-alt);
				border-right: 5px solid var(--primary);

				.material-icons, .text {
					color: var(--primary);
				}
			}
		}
	}

	.footer {
		opacity: 0;
		transition: opacity 0.3s ease-in-out;

		p {
			font-size: 0.875rem;
			color: var(--grey);
		}
	}

	&.is-expanded {
		width: var(--sidebar-width);

		.menu-toggle-wrap {
			top: -3rem;
			
			.menu-toggle {
				transform: rotate(-180deg);
			}
		}

		h3, .button .text {
			opacity: 1;
		}

		.button {
			.material-icons {
				margin-right: 1rem;
			}
		}

		.footer {
			opacity: 0;
		}
	}

	@media (max-width: 1024px) {
		position: absolute;
		z-index: 99;
	}
}

.dropdown-icon {
  margin-left: auto;
}

.rotate {
  transform: rotate(180deg);
}

.dropdown-content {
  display: none;
  flex-direction: column;
  padding-left: 1rem;
}

.sub-button {
  padding-left: 2rem; // Indent sub-buttons
}

.menu .button:hover .dropdown-content {
  display: flex;
}


</style>