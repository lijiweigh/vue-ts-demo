<template>
    <div 
        :class="[isCollapse ? 'simple-mode' : 'full-mode', {'first-level': isFirstLevel}]"
    >
        <template v-if="oneChild">
            <SidebarItemLink
                :to="resolvePath(item.path)"
            >
                <el-submenu-item
                    :index="resolvePath(item.path)"
                    :class="{'submenu-title-noDropdown': isFirstLevel}"
                >
                    <svg-icon
                        v-if="theOnlyOneChild.meta.icon"
                        :name="theOnlyOneChild.meta.icon"
                    />
                    <span
                        v-if="theOnlyOneChild.meta.title"
                        slot="title"
                    >{{ $t('route.' + theOnlyOneChild.meta.title) }}</span>
                </el-submenu-item>
            </SidebarItemLink>
        </template>
        <el-submenu
            v-else
            :index="resolvePath(item.path)"
            poper-append-to-body
        >
            <template slot="title">
                <svg-icon
                    v-if="item.meta && item.meta.icon"
                    :name="item.meta.icon"
                />
                <span
                    v-if="item.meta && item.meta.title"
                    slot="title"
                >{{ $t('route.' + item.meta.title) }}</span>
            </template>
            <template v-if="item.children">
                <sidebar-item
                    v-for="child in item.children"
                    :key="child.path"
                    :item="child"
                    :is-collapse="isCollapse"
                    :is-first-level="false"
                    :base-path="resolvePath(child.path)"
                    class="nest-menu"
                />
            </template>
        </el-submenu>
    </div>
</template>

<script lang="ts">
import path from "path"
import { Vue, Component, Prop } from "vue-property-decorator"
import { isExternal } from "@/utils/validate"
import { RouteConfig } from "vue-router"
import SidebarItemLink from "./SidebarItemLink.vue"

@Component({
    components: {
        SidebarItemLink
    }
}) 
export default class SidebarItem extends Vue {
    @Prop({required: true}) item!: RouteConfig
    @Prop({default: false}) isCollapse!: boolean
    @Prop({default: ""}) basePath!: string
    @Prop({default: true}) isFirstLevel!: boolean

    get oneChild() {
        if(this.item.children && this.item.children[0]) {
            return this.item.children[0]
        }
        return null
    }
    public resolvePath(to: string) {
        if(isExternal(to)) {
            return to
        }
        if(isExternal(this.basePath)) {
            return this.basePath
        }
        return path.resolve(this.basePath, to)
    }
}
</script>

<style lang="scss">
.el-submenu.is-active > .el-submenu__title {
  color: $subMenuActiveText !important;
}

.full-mode {
  .nest-menu .el-submenu>.el-submenu__title,
  .el-submenu .el-menu-item {
    min-width: $sideBarWidth !important;
    background-color: $subMenuBg !important;

    &:hover {
      background-color: $subMenuHover !important;
    }
  }
}

.simple-mode {
  &.first-level {
    .submenu-title-noDropdown {
      padding: 0 !important;
      position: relative;

      .el-tooltip {
        padding: 0 !important;
      }
    }

    .el-submenu {
      overflow: hidden;

      &>.el-submenu__title {
        padding: 0px !important;

        .el-submenu__icon-arrow {
          display: none;
        }

        &>span {
          visibility: hidden;
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.svg-icon {
  margin-right: 16px;
}

.simple-mode {
  .svg-icon {
    margin-left: 20px;
  }
}
</style>
