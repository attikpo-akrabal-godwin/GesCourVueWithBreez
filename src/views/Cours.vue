<script setup>
    import {useCourStore} from "@/stores/cours.js"
    import Header from "@/components/Header.vue"
    import Tab from "@/components/Tab.vue"
    import {useBreezCours} from "../stores/BreezCours.js"
    const courStore =  useCourStore()
    const BreezCours = useBreezCours()
    
</script>

<template>
    <Header/>
    <Tab/>
</template>

<script setup>
</script>