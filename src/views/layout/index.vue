<template>
    <div 
        class="layout"
        :class="{sidebaropened: sidebarOpened}"
    >
        <sidebar class="sidebar-container"></sidebar>
        <div class="main-container showTagsView">
            <div>
                <navbar></navbar>
                <tags-views></tags-views>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
import { AppModule } from "@/store/modules/app"
import Sidebar from "./components/Sidebar.vue"
import Navbar from "./components/Navbar.vue"
import TagsViews from "./components/TagsViews.vue"

@Component({
    components: {
        Sidebar,
        Navbar,
        TagsViews
    }
}) 
export default class Layout extends Vue {
    get sidebarOpened() {
        return AppModule.sidebar.opened
    }
}
</script>

<style lang="scss" scoped>
.layout {

}
</style>