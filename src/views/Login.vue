<script setup>
import { ref,computed } from 'vue';
import { useRouter } from 'vue-router';
import {useBreezCours} from "../stores/BreezCours.js"
let BreezCours = useBreezCours()

const nom  = ref()
const password = ref()
const nomError = ref()
const passwordError = ref()
const router = useRouter()

const nomErrorFunc =()=>{
    if (!nom.value) {
        return 'veillez renseigner le nom '
    }
    return ''
}

const passwordErrorfunc = ()=>{
    if (!password.value) {
        return 'veillez renseigner le mot de passe'
    }

    if ((password.value)&&(password.value!=='boncool')) {
        return 'mots de passe incorrecte'
    }
    return ''
}


const onclick = ()=>{
    if ((nom.value)&&(password.value)&&(password.value==="boncool")) {
        nomError.value = undefined
        passwordError.value = undefined
        BreezCours.isConnect = true
        router.push('/cours')
    }else{
        nomError.value = nomErrorFunc()
        passwordError.value = passwordErrorfunc()
    }
    
}

</script>

<template>
    <div class="form">
        <div class="imput-content">
            <label class="imput-label" for="pseudo">
                <input v-model="nom"  name="pseudo" class="input-txt" placeholder="pseudo" type="text">
                <span v-if="nomError" class="hd-red"> {{ nomError }} </span>
            </label>
            <label class="imput-label" for="pseudo">
                <input v-model="password"  name="password" class="input-txt" placeholder="mot de passe" type="password">
                <span v-if="passwordError" class="hd-red"> {{ passwordError  }} </span>
            </label>
            <button class="btn-b" @click="onclick" > se connecter </button>
            </div></div>
</template>

<style>

</style>