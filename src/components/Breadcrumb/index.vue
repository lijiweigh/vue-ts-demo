<template>
    <el-breadcrumb
        class="app-breadcrumb"
        separator="/"
    >
        <transition-group name="breadcrumb">
            <el-breadcrumb-item
                v-for="(item, index) in breadcrumbs" 
                :key="item.path"
            >
                <span 
                    class="no-redirect"
                    v-if="item.redirect === 'noredirect' || index === breadcrumbs.length - 1"
                >
                    {{$t("route." + item.meta.title)}}
                </span>
                <a
                    v-else
                    @click.prevent="handleLink(item)"
                >
                    {{$t("route." + item.meta.title)}}
                </a>
            </el-breadcrumb-item>
        </transition-group>
    </el-breadcrumb>
</template>

<script lang="ts">
import {Vue, Component, Watch} from "vue-property-decorator"
import {compile} from "path-to-regexp"
import {RouteRecord, Route} from "vue-router"
import { match } from 'assert'
@Component 
export default class Breadcrumb extends Vue {
    private breadcrumbs: RouteRecord[] = []

    @Watch("$route")
    private onRouteChange(route: Route) {
        if(route.path.startsWith("/redirect/")) {
            return
        }
        this.getBreadcrumb()
    }

    created() {
        this.getBreadcrumb()
    }

    private getBreadcrumb() {
        let matched = this.$route.matched.filter(item => item?.meta?.title)
        const first = matched[0]
        if(!this.isDashboard(first)) {
            matched = [{path: "/dashboard", meta: {title: "dashboard"}} as RouteRecord].concat(matched)
        }
        this.breadcrumbs = matched.filter(item => {
            return item?.meta?.title && item.meta.breadcrumb !== false
        })
    }

    private isDashboard(route: RouteRecord) {
        const name = route?.name
        if(!name) {
            return false
        }
        return name.trim().toLocaleLowerCase() === "Dashboard".toLocaleLowerCase()
    }

    private handleLink(item: any) {
        const {redirect, path} = item
        if(redirect) {
            this.$router.push(redirect).catch(err => {
                console.warn(err)
            })
            return
        }
        this.$router.push(this.pathCompile(path)).catch(err => {
            console.warn(err)
        })
    }
    private pathCompile(path: string) {
        const {params} = this.$route
        const toPath = compile(path)
        return toPath(params)
    }
}
</script>

<style lang="scss" scoped>
.el-breadcrumb__inner,
.el-breadcrumb__inner a {
  font-weight: 400 !important;
}

.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
