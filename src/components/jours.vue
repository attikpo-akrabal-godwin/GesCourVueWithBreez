<script setup>
import {useCourStore} from "../stores/cours.js"
import {useBreezCours} from "../stores/BreezCours.js"
let BreezCours = useBreezCours()
let CourStore = useCourStore()
let props = defineProps(["jour","crenauId"])

</script>

<template>
    <td>
        <div @click="BreezCours.choseCours(crenauId,cour.id)" :class="{cours:true, select:!cour.status}" v-for="cour in jour">{{ cour.name }}</div>
    </td>
</template>