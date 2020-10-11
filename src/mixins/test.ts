import {Component, Vue} from "vue-property-decorator"

@Component 
export default class TestMixins extends Vue {
    public mixinName: string = "mixin name"

    mounted() {
        console.log("mixin mounted")
    }
}