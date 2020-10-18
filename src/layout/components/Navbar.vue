<template>
    <div class="navbar">
        <hamburger
            id="hamberger-container"
            :is-active="sidebar.opened"
            class="hamberger-container"
            @toggleClick="toggleSideBar"
        ></hamburger>
        <breadcrumb
            id="breadcrumb-container"
            class="breadcrumb-container"
        ></breadcrumb>
        <div class="right-menu">
            <template v-if="device !== 'mobile'">
                <header-search class="right-memu-item"></header-search>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator"
import Hamburger from "@/components/Hamburger/index.vue"
import Breadcrumb from "@/components/Breadcrumb/index.vue"
import HeaderSearch from "@/components/HeaderSearch/index.vue"
@Component({
    components: {
        Hamburger,
        Breadcrumb,
        HeaderSearch
    }
}) 
export default class Navbar extends Vue {

}
</script>