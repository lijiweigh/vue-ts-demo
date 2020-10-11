<template>
    <div class="project">
        <div class="title" @click="clickTitle">{{title}}</div>
        <div class="desc">{{desc}}</div>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Prop, Emit} from "vue-property-decorator"

@Component({
    name: "customSetNameProject"
})
export default class Project extends Vue {
    private title: string = "test private data"

    @Prop({
        default: "desc"
    })
    readonly desc!: string

    @Emit("click-title")
    public clickTitle(): void {
        this.title = "you click title at" + new Date().toLocaleString()
    }
}
</script>

<style lang="scss" scoped>
.title {
    font-size: 20px;
    user-select: none;
}
.desc {
    font-size: 16px;
}
</style>