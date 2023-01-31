<script setup>
import {useCourStore} from "../stores/cours.js"
import Crenau from "./Crenau.vue";
let CourStore = useCourStore()
let props = defineProps(["jour","crenauId"])


 
</script>

<template>
    <td>
        <div @click="CourStore.choseCours(crenauId,cour.id)" :class="{cours:true, select:cour.isSelected}" v-for="cour in jour">{{ cour.nom }}</div>
    </td>
</template>