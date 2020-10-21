<template>
    <el-breadcrumb separator="/">
        <transition-group name="breadcrumb">
            <el-breadcrumb-item
                v-for="(item, index) in breadcrumbs"
                :key="item.path"
            >
                <template 
                    v-if="item.redirect === 'noredirect' || index === breadcrumbs.length - 1"
                >
                    {{ $t("route." + item.meta.title) }}
                </template>
                <a
                    v-else
                    @click.prevent="handleLink(item)"
                >
                    {{ $t("route." + item.meta.title) }}
                </a>
            </el-breadcrumb-item>
        </transition-group>
    </el-breadcrumb>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator"
import { RouteRecord, Route } from "vue-router"

@Component 
export default class Breadcrumb extends Vue {
    private breadcrumbs: RouteRecord[] = []

    @Watch("$route")
    private onRouteChange(route: Route) {
        this.getBreadcrumbs()
    }

    created() {
        this.getBreadcrumbs()
    }

    public getBreadcrumbs() {
        this.breadcrumbs = this.$route.matched
    }

    public handleLink(item: any) {
        const { redirect, path } = item
        if(redirect) {
            this.$router.push(redirect).catch(err => console.log(err))
        } else {
            this.$router.push(path).catch(err => console.log(err))
        }
    }
}
</script>