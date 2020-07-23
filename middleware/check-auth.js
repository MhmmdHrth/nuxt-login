export default function(context){
    const request = context.req
    context.store.dispatch('autoLogin', request)
}