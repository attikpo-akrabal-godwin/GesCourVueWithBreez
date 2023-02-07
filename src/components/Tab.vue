<script setup>
    import LoadSpine from "./LoadSpine.vue";
    import {useBreezCours} from "../stores/BreezCours.js"
    import Crenau from "./Crenau.vue";
    let BreezCours = useBreezCours()
    BreezCours.selectSession()
    
</script>

<template>
    <main>
            <table class="calendar">
                <thead>
                    <tr>
                        <th>Horaires</th>
                        <th>Lundi</th>
                        <th>Mardi</th>
                        <th>Mercredi</th>
                        <th>Jeudi</th>
                        <th>Vendredi</th>
                        <th>Samedi</th>
                        <th>Dimanche</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="BreezCours.isProgramLoading">
                        <td class="heure">
                            <LoadSpine/>
                        </td>
                        <td>
                            <LoadSpine/>
                        </td>
                        <td>
                            <LoadSpine/>
                        </td>
                        <td>
                            <LoadSpine/>
                        </td>
                        <td>
                            <LoadSpine/>
                        </td>
                        <td>
                            <LoadSpine/>
                        </td>
                        <td>
                            <LoadSpine/>
                        </td>
                        <td>
                            <LoadSpine/>
                        </td>
                    </tr>
                    <Crenau v-else  v-for="program in BreezCours.program" :crenau="program"/>
                </tbody>
            </table>
        </main>
</template>
    