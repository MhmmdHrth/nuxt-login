<template>
<div class="container">
    <div class="row">
        <div class="col-lg-6">
            <form @submit.prevent="onLogin()">
                <div class="form-group">
                    <label>Email address</label>
                    <input type="email" v-model="formData.email" class="form-control">
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" v-model="formData.password" class="form-control">
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            formData: {
                email: "",
                password: ""
            }
        }
    },
    methods: {
        onLogin() {
            this.$store.dispatch("login", this.formData)
                .then(() => {
                    this.$router.push("/")
                })
        }
    },

    middleware:["check-auth","public"]
}
</script>

<style scoped>

</style>
