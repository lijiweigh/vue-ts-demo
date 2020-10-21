<template>
    <div class="sidebar">
        <el-scroll-bar>
            <el-menu 
                :collapse="!sidebarOpened"
                :default-active="activeMenu"
                mode="vertical"
            >
                <SidebarItem 
                    v-for="route in routes" 
                    :key="route.path"
                    :item="route"
                    :is-collapse="!sidebarOpened"
                    :base-path="route.path"
                ></SidebarItem>
            </el-menu>
        </el-scroll-bar>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
import { AppModule } from "@/store/modules/app"
import constantRoutes from '@/router'
import SidebarItem from "./SidebarItem.vue"

@Component({
    components: {
        SidebarItem
    }
})
export default class Sidebar extends Vue {
    get sidebarOpened() {
        return AppModule.sidebar.opened
    }
    get activeMenu() {
        const {path, meta} = this.$route
        if(meta.activeMenu) {
            return meta.activeMenu
        }
        return path
    }
    get routes() {
        return constantRoutes
    }
}
</script>
