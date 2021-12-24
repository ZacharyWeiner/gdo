import Run from 'run-sdk' 
import { computed } from 'vue'
import { useStore } from 'vuex'


export function useRun()  {
    let run
    const store = useStore() 

    const isLogin = computed(() => store.state.relayx_handle !== '' )

    const signIn = async () => {
        const token = await window.relayone.authBeta()
        const [payload]=token.split(".")
        const data = JSON.parse(atob(payload))
        console.log('paymail', data.paymail)

        const r = await fetch('https://api.relayx.io/v1/paymail/run/' + data.paymail)
        const res = await r.json()

        // console.log('res', res.data)

        let _handle = data.paymail.split('@')[0]
        let _userAddress = res.data
        store.dispatch('login', { _handle, _userAddress } )
        
        await fetchRun()
        await access()

    }
    const signOut = () => {
        store.dispatch('logout')
    } 


    const fetchRun = async () => {
        run = new Run({trust:"*", owner: store.state.user_address, timeout:100000, networkTimeout:100000}) //, logger: console
        run.activate()
        await run.inventory.sync()
        console.log('Jigs', run.inventory.jigs)
    }

    const access = async () => {
        const keyContractId = "1ba1080086ca6624851e1fbff18d903047f2b75d3a9ffe5cc8bf49ed0fdb36a0_o2" //Gopnick Class
        const keyContract = await run.load(keyContractId)
        const _userJigs =  run.inventory.jigs.filter(jig => jig instanceof keyContract)
        
        console.log('userJigs', _userJigs )

        if (_userJigs.length == 0) {
            alert('You do not own a Gopnick')
            return
        }

        store.commit('setUserJigs', _userJigs)
        
    }

    return {signIn, signOut, isLogin}
 
}

