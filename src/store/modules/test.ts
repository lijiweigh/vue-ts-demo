import {VuexModule, Module, Mutation, Action} from "vuex-module-decorators"
@Module({
    namespaced: true
})
export default class Test extends VuexModule {
    public vuexName: string = "vuexName"
    public vuexDate: string = "2020-10-11"

    get msg(): string {
        return this.vuexName + this.vuexDate
    }

    @Mutation
    public setName(newV: string): void {
        this.vuexName = newV
    }

    @Action
    public setNameA(newV: string): void {
        this.context.commit("setName", newV)
    }
}