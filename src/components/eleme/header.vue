<template>
    <div class="eleme-header">
        订单状态：{{status}}
    </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from "vue-property-decorator"

@Component
export default class ElemeHeader extends Vue {
    /**
     * prop
     */
    @Prop(String)
    status!: string
}
</script>

<style lang="scss" scoped>
.eleme-header {
    padding: .5rem .3rem .3rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-size: .5rem;
    font-weight: bold;
    color: #333333;
    line-height: .7rem;
}
</style>