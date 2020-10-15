<template>
    <div class="layout"></div>
</template>

<script lang="ts">
import {Vue, Component, Mixins} from "vue-property-decorator"
import ResizeMixin from "./mixin/resize"
@Component
export default class Layout extends Mixins(ResizeMixin) {

}
</script>