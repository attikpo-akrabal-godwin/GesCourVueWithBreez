<script setup>
    import dayjs from "dayjs"
    import LoadSpine from "@/components/LoadSpine.vue"
    import {useBreezCours} from "../stores/BreezCours.js"
    let BreezCours = useBreezCours()
</script>

<template>
    <header v-if="BreezCours.sessionIsLoading" >
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
                <li> {{ BreezCours.session.name}} </li>
                <li><span @click="BreezCours.changeSession('before') "  class="span left"> &lt; </span > {{ dayjs(BreezCours.session.start_date).format('MMMM D, YYYY') }} - {{ dayjs(BreezCours.session.end_date).format('MMMM D, YYYY') }} <span @click="BreezCours.changeSession('behind')" class="span rigth"> &gt; </span > </li>
                <li><span >Total:{{ BreezCours.calculPrice }} </span> <button class="btn-a">s'inscrire</button></li>
            </ul>
    </header>
</template>

<style>
    .span{
        color: red;
        border-radius: 50%;
        cursor: pointer;
        height: 15px;
        font-weight: 900px;
    }

    .left{
        margin-right: 14px;
    }
    .rigth{
        margin-left: 14px ;
    }
</style>