<template>
    <div 
        :class="classObj"
        class="app-wraper"
    >
        <div
            v-if="classObj.mobile && sidebar.opened"
            class="drawer-bg"
            @click="handleClickOutside"
        >
        </div>
        <sidebar class="sidebar-container"></sidebar>
        <div
            :class="{hasTagsView: showTagsView}"
            class="main-container"
        >
            <div :class="{'fixed-header': fixedHeader}">
                <navbar />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { AppModule, DeviceType } from '@/store/modules/app'
import {Vue, Component, Mixins} from "vue-property-decorator"
import ResizeMixin from "./mixin/resize"
import Sidebar from "./components/Sidebar.vue"
import Navbar from "./components/Navbar.vue"

@Component({
    components: {
        Sidebar,
        Navbar
    }
})
export default class Layout extends Mixins(ResizeMixin) {
    get classObj() {
        return {
            hideSidebar: !this.sidebar.opened,
            openSidebar: this.sidebar.opened,
            withoutAnimation: this.sidebar.withoutAnimation,
            mobile: this.device === DeviceType.Mobile
        }
    }

    private handleClickOutside() {
        AppModule.CloseSideBar(false)
    }
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.main-container {
  min-height: 100%;
  transition: margin-left .28s;
  margin-left: $sideBarWidth;
  position: relative;
}

.sidebar-container {
  transition: width 0.28s;
  width: $sideBarWidth !important;
  height: 100%;
  position: fixed;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar {
  .main-container {
    margin-left: 54px;
  }

  .sidebar-container {
    width: 54px !important;
  }

  .fixed-header {
    width: calc(100% - 54px)
  }
}

/* for mobile response 适配移动端 */
.mobile {
  .main-container {
    margin-left: 0px;
  }

  .sidebar-container {
    transition: transform .28s;
    width: $sideBarWidth !important;
  }

  &.openSidebar {
    position: fixed;
    top: 0;
  }

  &.hideSidebar {
    .sidebar-container {
      pointer-events: none;
      transition-duration: 0.3s;
      transform: translate3d(-$sideBarWidth, 0, 0);
    }
  }

  .fixed-header {
    width: 100%;
  }
}

.withoutAnimation {
  .main-container,
  .sidebar-container {
    transition: none;
  }
}
</style>
