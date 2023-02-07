<script setup>
    import jours from './jours.vue';
    let props = defineProps(['crenau'])
</script>

<template>   
    <tr>
        <td class="heure"> {{crenau.start_time}}</td>
        <jours v-for="jour in crenau.jours" :jour="jour" :crenauId="crenau.id"/>        
    </tr>
</template>