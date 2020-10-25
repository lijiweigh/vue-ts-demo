<template>
    <a
        v-if="isExternal(to)"
        :href="to"
        target="_black"
        ref="noopener"
    >
        <slot></slot>
    </a>
    <router-link
        v-else
        :to="to"
    >
        <slot></slot>
    </router-link>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator"
import {isExternal} from "@/utils/validate"
@Component 
export default class SidebarItemLink extends Vue {
    @Prop({required: true}) private to!: string
    private isExternal = isExternal
}
</script>