<template>
	<div :class="{ 'has-logo': showLogo }">
		<sidebar-logo v-if="showLogo" :collapse="isCollapse"></sidebar-logo>
        <el-scrollbar wrap-class="scrollbar-wraper">
            <el-menu
                :default-active="activeMenu"
                :collapse="isCollapse"
                :background-color="variables.menuBg"
                :text-color="variables.menuText"
                :active-text-color="menuActiveTextColor"
                :unique-opened="fasle"
                :collapse-transition="false"
            >
                <sidebar-item
                    v-for="route in routes" 
                    :key="route.path"
                    :item="route"
                    :base-path="route.path"
                    :is-collapse="isCollapse"
                ></sidebar-item>
            </el-menu>
        </el-scrollbar>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
import { SettingsModule } from "@/store/modules/settings"
import { AppModule } from "@/store/modules/app"
import SidebarLogo from "./SidebarLogo.vue"
import SidebarItem from "./SidebarItem.vue"
import variables from "@/style/_variables.scss"
import { PermissionModule } from '@/store/modules/permission'
@Component({
	components: {
        SidebarLogo,
        SidebarItem
	},
})
export default class Sidebar extends Vue {
	get sidebar() {
		return AppModule.sidebar
	}
	get showLogo() {
		return SettingsModule.showSidebarLogo
	}
	get isCollapse() {
		return !this.sidebar.opened
    }
    get activeMenu() {
        const route = this.$route
        const {path, meta} = route
        if(meta.activeMenu) {
            return meta.activeMenu
        }
        return path
    }
    get menuActiveTextColor() {
        if(SettingsModule.sidebarTextTheme) {
            return SettingsModule.theme
        } else {
            return variables.menuActiveText
        }
    }
    get routes() {
        return PermissionModule.routes
    }
}
</script>
