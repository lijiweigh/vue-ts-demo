import {Vue, Component, Watch} from "vue-property-decorator"
import {AppModule, DeviceType} from "@/store/modules/app"

const WIDTH = 992

@Component
export default class ResizeMixin extends Vue {
    get device(): DeviceType {
        return AppModule.device
    }
    get sidebar() {
        return AppModule.sidebar
    }
    @Watch("$route")
    private onRouteChange() {
        if(this.device === DeviceType.Mobile && this.sidebar.opened) {
            AppModule.CloseSideBar(false)
        }
    }
    boforeMount() {
        window.addEventListener("resize", this.resizeHandler)
    }
    mounted() {
        const isMobile = this.isMobile()
        if(isMobile) {
            AppModule.ToggleDevice(DeviceType.Mobile)
            AppModule.CloseSideBar(true)
        }
    }
    boforeDestroy() {
        window.removeEventListener("resize", this.resizeHandler)
    }
    private isMobile() {
        const rect = document.body.getBoundingClientRect()
        return rect.width - 1 < WIDTH
    }
    private resizeHandler() {
        if(!document.hidden) {
            const isMobile = this.isMobile()
            AppModule.ToggleDevice(isMobile ? DeviceType.Mobile : DeviceType.Desktop)
            if(isMobile) {
                AppModule.CloseSideBar(true)
            }
        }
    }
}