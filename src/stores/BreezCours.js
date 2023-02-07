import { defineStore } from "pinia"
import { ref,computed,watch } from "vue"
import { makeCustomRequestToDB } from "../lib/api"

export const useBreezCours = defineStore('BreezCours',()=>{
    const index = ref(0)
    const sessionTab = ref([])
    const sessionIsLoading = ref(false)
    const session = ref({})
    const isProgramLoading = ref(false)
    const program = ref([])
    const isConnect= ref(false)
    const error = ref('')

    const selectSession = async ()=>{
        try {
            sessionIsLoading.value = true
            isProgramLoading.value = true
            const response  = await makeCustomRequestToDB({
                "action": "select",
                "table": "session"
            })
            sessionTab.value = response.data
            session.value = response.data.length?response.data[index.value]:null
            sessionIsLoading.value = false
        } catch (err) {
            error.value = err
            console.log(err);
        }
    }
    const selectProgram = async (session)=>{
        try {
            let programTemp = []
            isProgramLoading.value = true
            const response  = await makeCustomRequestToDB({
                "action": "select",
                "table": "program",
                "conditions": [
                    {
                        "join":["program"]
                    },
                    {
                        "where":["session",session.id]
                    }
                ]
            })
            program.value = response.data.length?response.data:[]
            program.value.map(async (prog)=>{
                    const res  = await makeCustomRequestToDB({
                        "action": "select",
                        "table": "cours",
                        "conditions": [
                            {
                                "where":["program",prog.id]
                            }
                        ]
    
                    })
                    let jours = []
                    for (let i = 1; i < 8; i++) {
                        let coursByDay = res?.data?.filter((cour)=>{
                           return cour.day==(i+1)
                        } )
                        jours.push(coursByDay)
                    }
                    prog.jours = jours
            })
            program.value = program.value
            isProgramLoading.value=false
        } catch (err) {
            error.value = err
        }
    }
    watch(session ,async(newSesion)=>{
        //console.log(newSesion);
        await selectProgram(newSesion)
    })

    const choseCours = async (programId,courId)=>{
        let programsTemp = program.value
        programsTemp.map((program)=>{
            if (program.id ===programId) {
                program.jours.map((cours)=>{
                    cours.map((cour)=>{  
                        if (cour.id===courId) {
                            cours.map((cour)=>{
                                if (cour.id!==courId) {
                                    cour.status=true
                                }
                            })
                            cour.status = !cour.status 
                        }
                    })
                })
            }
        })
        program.value = programsTemp
    }

    const calculPrice = computed(()=>{
        let total = 0
        let programsTemp = program.value
        programsTemp.map((program)=>{
            program?.jours?.map((cours)=>{
                cours?.map((cour)=>{
                    if (!cour.status) {
                        total +=parseInt(cour.normal_price) 
                    }
                })
            })
        })

        return total

    })

    const changeSession = (direction="behind")=>{
        console.log('lancer',direction);
        console.log('sessions',sessionTab.value);
        if (direction==="before") {
            if(index.value>0){
                index.value--
            }
            if (sessionTab.value.length) {
                session.value = sessionTab.value[index.value]
            }

        }

        if (direction==="behind"){
            if(index.value<sessionTab.value.length-1)index.value++

            if (sessionTab.value.length) {
                console.log(index.value);
                session.value =sessionTab.value[index.value]
            }
            
        }
    }
    
    return {selectSession,session,program,isProgramLoading,sessionIsLoading,choseCours,calculPrice,changeSession}
})