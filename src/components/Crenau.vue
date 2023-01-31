<script setup>
    import jours from './jours.vue';
    defineProps(['crenau'])
</script>

<template>
    <tr>
        <td class="heure"> {{crenau.horaire}}</td>
        <jours v-for="jour in crenau.jours" :jour="jour" :crenauId="crenau.id"/>        
    </tr>
</template>