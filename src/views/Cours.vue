<script setup>
    import {useCourStore} from "@/stores/cours.js"
    import Header from "@/components/Header.vue"
    import Tab from "@/components/Tab.vue"
    const courStore =  useCourStore()
    courStore.callCoursApi()
   
</script>

<template>
    <Header/>
   
    <Tab/>
</template>

<script setup>
</script>