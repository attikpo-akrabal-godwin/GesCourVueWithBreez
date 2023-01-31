<script setup>
    import LoadSpine from "@/components/LoadSpine.vue"
    import {useCourStore} from "@/stores/cours.js"
    let CourStore = useCourStore()
</script>

<template>
    <header v-if="CourStore.isLoading" >
            <h1 class="big-title" >CALENDRIER</h1>
            <hr class="separate">
            <ul class="header">
                <LoadSpine/>
            </ul>
    </header>
    <header v-else >
            <h1 class="big-title" >CALENDRIER</h1>
            <hr class="separate">
            <ul class="header">
                <li>SESSION {{ CourStore.session.sessionMois }} {{ CourStore.session.sessionAnnee }}</li>
                <li>{{ CourStore.session.dateDebut }} - {{ CourStore.session.dateFin }}</li>
                <li><span>Total:{{ CourStore.TotalComput }} </span> <button class="btn-a">s'inscrire</button></li>
            </ul>
    </header>
</template>

<style>

</style>