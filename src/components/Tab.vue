<script setup>
    import LoadSpine from "./LoadSpine.vue";
    import {useCourStore} from "../stores/cours.js"
    import Crenau from "./Crenau.vue";
    let CourStore = useCourStore()

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
                    <tr v-if="CourStore.isLoading">
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
                    <Crenau v-else v-for="crenau in CourStore.session.creneaux" :crenau="crenau"/>
                </tbody>
            </table>
        </main>
</template>
    