<template>
    <div class="navbar">
        <Hamburger
            id="hamburger-container"
            class="hamburger-container"
            :is-active="sidebar.opened"
            @toggle-click="toggleClick"
        ></Hamburger>
        <Breadcrumb 
            id="breadcrumb-container"
            class="breadcrumb-container"
        ></Breadcrumb>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
import { AppModule } from "@/store/modules/app"
import Hamburger from "./Hamburger.vue"
import Breadcrumb from "./Breadcrumb.vue"

@Component({
    components: {
        Hamburger,
        Breadcrumb
    }
}) 
export default class Navbar extends Vue {
    get sidebar() {
        return AppModule.sidebar
    }

    public toggleClick() {
        AppModule.ToggleSideBar(false)
    }
}
</script>