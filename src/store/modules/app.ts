import {Module, VuexModule, getModule, Action, Mutation, MutationAction} from "vuex-module-decorators"
import { getSize, setSidebarStatus, setLanguage, setSize } from "@/utils/cookies"
import {getLocale} from "@/lang"
import store from "@/store"

export enum DeviceType {
    Mobile,
    Desktop
}

export interface IAppState {
    device: DeviceType,
    sidebar: {
        opened: boolean,
        withoutAnimation: boolean
    },
    language: string,
    size: string
}

@Module({dynamic: true, store, namespaced: true, name: "app"})
class App extends VuexModule implements IAppState {
    public device = DeviceType.Desktop
    public sidebar = {
        opened: true,
        withoutAnimation: false
    }
    public language = getLocale()
    public size = getSize() || "medium"

    @Mutation
    private TOGGLE_SIDEBAR(withoutAnimation: boolean) {
        this.sidebar.opened = !this.sidebar.opened
        this.sidebar.withoutAnimation = withoutAnimation
        setSidebarStatus(this.sidebar.opened ? "opened" : "closed")
    }

    @Mutation
    private CLOSE_SIDEBAR(withoutAnimation: boolean) {
        this.sidebar.opened = false
        this.sidebar.withoutAnimation = withoutAnimation
        setSidebarStatus("closed")
    }

    @Mutation
    private TOGGLE_DEVICE(device: DeviceType) {
        this.device = device
    }

    @Mutation
    private SET_LANGUAGE(language: string) {
        this.language = language
        setLanguage(this.language)
    }

    @Mutation
    private SET_SIZE(size: string) {
        this.size = size
        setSize(this.size)
    }

    @Action
    public ToggleSideBar(withoutAnimation: boolean) {
        this.context.commit("TOGGLE_SIDEBAR", withoutAnimation)
    }

    @Action 
    public CloseSideBar(withoutAnimation: boolean) {
        this.context.commit("CLOSE_SIDEBAR", withoutAnimation)
    }

    @Action
    public ToggleDevice(device: DeviceType) {
        this.context.commit("TOGGLE_DEVICE", device)
    }

    @Action
    public SetLanguage(language: string) {
        this.context.commit("SET_LANGUAGE", language)
    }

    @Action 
    public SetSize(size: string) {
        this.context.commit("SET_SIZE", size)
    }
}

export const AppModule = getModule(App)