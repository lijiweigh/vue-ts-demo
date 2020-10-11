<template>
    <div class="test">
        <div class="date">{{date}}</div>
        <div>{{mixinName}}</div>
        <div>{{vuexName}}</div>
        <div>{{vuexDate}}</div>
        <div>{{msg}}</div>
        <div>
            <button @click="addDay">add day</button>
        </div>
        <Project @click-title="handleClick" :desc="desc"></Project>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Watch, Mixins} from "vue-property-decorator"
import Project from "../components/project.vue"
import testMixin from "../mixins/test"

import {namespace} from "vuex-class"

const vuexTest = namespace("Test")

@Component({
    name: "customSetNameTest",
    components: {
        Project
    }

})
export default class Test extends Mixins(testMixin) {
    // data
    private year: number = 2020
    private month: number = 10
    private day: number = 10
    private desc: string = "fake desc"
    // vuex
    @vuexTest.State
    public vuexName!: string
    @vuexTest.State
    public vuexDate!: string

    @vuexTest.Getter
    public msg!: string
    
    @vuexTest.Action
    public setNameA!: (newV: string) => void
    // computed
    public get date(): string {
        return `${this.year}-${this.month}-${this.day}`
    }
    public set date(v: string) {
        let [year, month, day] = v.split("-")
        this.year = +year
        this.month = +month
        this.day = +day
    }
    // watch
    @Watch("date", {
        immediate: true
    })
    public dateChange(newV: string, oldV: string): void {
        console.log(`date change, from ${oldV} to ${newV}`)
    }
    // 生命周期
    created() {
        console.log("created")
    }
    mounted() {
        console.log("mounted")
    }
    // methods
    public addDay(): void {
        this.day++
    }
    public handleClick(): void {
        console.log("handleClick")
        this.setNameA(new Date().toLocaleString())
    }
}
</script>

<style lang="scss" scoped>

</style>