import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {makeCustomRequestToDB} from '../lib/api.js'

export const useCourStore = defineStore('cours',()=>{
    const sessionTab = ref([])
    const session = ref({})
    const isLoading = ref(false)
    const isConnect= ref(false)
    const error = ref('')

    const calLocalApi = async ()=>{
        try {
          let response = await  makeCustomRequestToDB({
                "action": "select",
                "table": "session"
            })
        console.log(response.data);
        } catch (error) {

            console.log(error);
        }
    }

    const callCoursApi = async ()=>{
        isLoading.value = true
        try {
            let response = await fetch('https://mocki.io/v1/9050467a-a57e-4d3b-8861-96f0d3c472fc')
            let data = await response.json()
            sessionTab.value = data
            session.value = data[0] 
            isLoading.value = false
        } catch (error) {
            isLoading.value = false
            error.value = error.toString()
        }
    }

    const choseCours = (crenauId,coursIndex)=>{
        let sessionCopy = session.value
        sessionCopy.creneaux.map((crenau)=>{
            if (crenau.id === crenauId) {
                crenau.jours.map(elementJour => {
                    elementJour.map(elementCours=>{
                        if(elementCours?.id===coursIndex){
                            elementJour.map(elementCours=>{
                                if (elementCours.id!== coursIndex) {
                                    elementCours.isSelected=false
                                }
                            })
                            elementCours.isSelected = !elementCours.isSelected
                        }
                    })
                })
            }
        })
        session.value =sessionCopy
    }

    const TotalComput = computed(()=>{
        let total = 0
        session.value.creneaux.map((crenau)=>{
            crenau.jours.map(elementJour => {
                elementJour.map(elementCours=>{
                    if (elementCours.isSelected) {
                      total +=  elementCours.prix
                    }
                })
            })
        })
        return total
    })





    return {callCoursApi,choseCours,calLocalApi,session,isLoading,TotalComput,isConnect}
})