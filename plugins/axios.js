export default function({$axios,redirect,store}){
    $axios.onError(err => {
        console.log(err.response.status)
        if(err.response.status === 401){
            store.dispatch("logout")
            $axios.setHeader("Authorization", null)
        }
    })
}