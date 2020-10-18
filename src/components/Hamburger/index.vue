<template>
    <div
        :class="[{'is-active': isActive}]"
        @click="toggleClick"
    >
        <svg-icon 
            name="hamburger"
            width="20"
            height="20"
        ></svg-icon>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Emit} from "vue-property-decorator"

@Component 
export default class Hamburger extends Vue {
    @Prop({default: false}) private isActive!: boolean
    @Emit()
    private toggleClick() {

    }
}
</script>