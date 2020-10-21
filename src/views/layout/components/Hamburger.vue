<template>
    <div 
        :class="{'is-active': isActive}"
        @click="toggleClick"
    >
        <svg-icon
            name="hamburger"
            width="20"
            height="20"
        />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator"

@Component 
export default class Hamburger extends Vue {
    @Prop({type: Boolean}) isActive!: boolean
    @Emit()
    public toggleClick() {

    }
}
</script>