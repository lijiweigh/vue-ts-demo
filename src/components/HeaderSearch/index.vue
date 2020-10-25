<template>
    <div 
        id="header-search" 
        class="header-search" 
        :class="{show: show}"
    >
        <svg-icon 
            class="search-icon"
            name="search"
            @click.stop="click"
        />
        <el-select
            ref="headerSearchSelect"
            v-model="search"
            :remote-method="querySearch"
            filterable
            default-first-option
            remote
            placeholder="Search"
            class="header-search-select"
            @change="change"
        >
            <el-option
                v-for="item in options" 
                :key="item.path"
                :value="item"
                :label="item.meta.title.join(' > ')"
            />
        </el-select>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Watch} from "vue-property-decorator"
import path from "path"
import Fuse from "fuse.js"
import { RouteConfig } from "vue-router"
import { AppModule } from "@/store/modules/app"
import { PermissionModule } from "@/store/modules/permission"
import i18n from "@/lang"

@Component 
export default class HeaderSearch extends Vue { 
    private search: string = ""
    private show: boolean = false
    private options: RouteConfig[] = []
    private searchPool: RouteConfig[] = []
    private fuse?: Fuse<RouteConfig>

    get routes() {
        return PermissionModule.routes
    }

    get lang() {
        return AppModule.language
    }

    @Watch("lang")
    private onLangChange() {
        this.searchPool = this.generateRoutes(this.routes)
    }

    @Watch("routes")
    private onRouteChange() {
        this.searchPool = this.generateRoutes(this.routes)
    }

    @Watch("show")
    private onShowChange(value: boolean) {
        if(value) {
            document.body.addEventListener("click", this.close)
        } else {
            document.body.removeEventListener("click", this.close)
        }
    }

    mounted() {
        this.searchPool = this.generateRoutes(this.routes)   
    }

    private click() {
        this.show = !this.show
        if(this.show) {
            this.$refs.headerSearchSelect && (this.$refs.headerSearchSelect as HTMLElement).focus()
        }
    }

    private close() {
        this.$refs.headerSearchSelect && (this.$refs.headerSearchSelect as HTMLElement).blur()
        this.options = []
        this.show = false
    }

    private change(route: RouteConfig) {
        this.$router.push(route.path)
        this.search = ""
        this.options = []
        this.$nextTick(() => {
            this.show = false
        })
    }

    private initFuse(list: RouteConfig[]) {
        this.fuse = new Fuse(list, {
            shouldSort: true,
            threshold: 0.4,
            location: 0,
            distance: 100,
            minMatchCharLength: 1,
            keys: [
                {
                    name: "title",
                    weight: 0.7
                },
                {
                    name: "path",
                    weight: 0.3
                }
            ]
        })
    }

    private generateRoutes(routes: RouteConfig[], basePath = "/", prefixTitle: string[] = []) {
        let res: RouteConfig[] = []

        for (const router of routes) {
        // skip hidden router
        if (router.meta && router.meta.hidden) {
            continue
        }

        const data: RouteConfig = {
            path: path.resolve(basePath, router.path),
            meta: {
            title: [...prefixTitle]
            }
        }

        if (router.meta && router.meta.title) {
            // generate internationalized title
            const i18ntitle = i18n.t(`route.${router.meta.title}`).toString()
            data.meta.title = [...data.meta.title, i18ntitle]
            if (router.redirect !== 'noRedirect') {
            // only push the routes with title
            // special case: need to exclude parent router without redirect
            res.push(data)
            }
        }

        // recursive child routes
        if (router.children) {
            const tempRoutes = this.generateRoutes(router.children, data.path, data.meta.title)
            if (tempRoutes.length >= 1) {
            res = [...res, ...tempRoutes]
            }
        }
        }
        return res
    }

    private querySearch(query: string) {
        if(query !== "") {
            if(this.fuse) {
                this.options = this.fuse.search(query).map(result => result.item)
            } 
        } else {
            this.options = []
        }
    }
}   
</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;

  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }

  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }

  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
