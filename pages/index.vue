<template>
<div class="container">
    <div class="row">
        <div class="col-lg-4 col-md-6 col-sm-6 mb-5" v-for="(user,index) in users" :key="index">
            <div class="card">
                <img :src="user.avatar" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">{{`${user.first_name} ${user.last_name}`}}</h5>
                    <p class="card-text">Email: {{user.email}}</p>
                    <button class="btn btn-success" @click="onEdit(user.id)" style="width=100px">Edit</button>
                    <button class="btn btn-danger" @click="onDelete(user.id)" style="width=100px">Delete</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {


    computed: {
        users() {
            return this.$store.getters.getUserList
        }
    },

    methods: {
        onDelete(user) {
            this.$store.dispatch("deleteUser",user)
        },

        onEdit(user){
            this.$router.push(`/form/${user}`)
        },

        getUser(){
            this.$axios.$get("https://pos-usc.cloud-connect.asia/tenants")
        }
    },

    mounted () {
        this.getUser();
    },

    middleware:["check-auth","auth"]
}
</script>

<style scoped>

</style>
