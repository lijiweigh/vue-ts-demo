<template>
    <div class="eleme">
        <Header :status="status"></Header>
        <Detail v-bind="detailData"></Detail>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator"
import Header from "@/components/eleme/header.vue"
import Detail from "@/components/eleme/detail.vue"

@Component({
    components: {
        Header,
        Detail
    }
})
export default class Eleme extends Vue {
    /**
     * data
     */
    public status: string = "已发货"
    public detailData: object = {
        img: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2138550281,2627069661&fm=26&gp=0.jpg",
        title: "陕西高原红富士苹果小苹果4粒共520g",
        desc: "已选：“已时间上课就上课上课选”“75mm(含)-80mm(不含)”",
        price: "121.25",
        count: "2",
        totalPrice: "221.25"
    }
    /**
     * 生命周期
     */
    created() {
        document.documentElement.style.fontSize = "13.3333333333333vw"
        // this.$once("hook:beforeDestroy", () => document.documentElement.style.fontSize = "")
    }
}
</script>

<style lang="scss" scoped>
.eleme {    
    min-height: 100vh;
    background: #F9F9F9;
    overflow-x: hidden;
}
</style>