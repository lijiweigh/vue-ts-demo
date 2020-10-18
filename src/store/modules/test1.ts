import { VuexModule, Module, Mutation, Action, getModule } from "vuex-module-decorators"
import { getSidebarStatus, getSize, setSidebarStatus, setLanguage, setSize } from '@/utils/cookies'
import { getLocale } from '@/lang'
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

@Module({ dynamic: true, store, name: "app" })
class App extends VuexModule implements IAppState {
    public device = DeviceType.Desktop
    public sidebar = {
        opened: getSidebarStatus() !== "closed",
        withoutAnimation: false
    }
    public language = getLocale()
    public size = getSize() || "medium"

    @Mutation
    private TOGGLE_SIDEBAR(withoutAnimation: boolean) {
        this.sidebar.opened = !this.sidebar.opened
        this.sidebar.withoutAnimation = withoutAnimation
        if(this.sidebar.opened) {
            setSidebarStatus("opened")
        } else {
            setSidebarStatus("closed")
        }
    }

    @Action
    public ToggleSideBar(withoutAnimation: boolean) {
        this.context.commit("TOGGLE_SIDEBAR", withoutAnimation)
    }
}

export const AppModule = getModule(App)