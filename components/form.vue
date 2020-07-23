<template>
<div class="container">
    <div class="row">
        <div class="col-lg-6">
            <form @submit.prevent="onSubmit(user)">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fa fa-address-book"></i></span>
                    </div>
                    <input type="text" v-model="user.first_name" class="form-control" placeholder="First Name">
                </div>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fa fa-address-book"></i></span>
                    </div>
                    <input type="text" v-model="user.last_name" class="form-control" placeholder="Last Name">
                </div>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fa fa-envelope icon"></i></span>
                    </div>
                    <input type="text" v-model="user.email" class="form-control" placeholder="Email">
                </div>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fa fa-user-circle"></i></span>
                    </div>
                    <input type="text" v-model="user.avatar" class="form-control" placeholder="Image Url">
                </div>
                <button type="submit" class="btn btn-primary">{{this.id ? "Edit" : "Create"}}</button>
            </form>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        id: {
            type: String,
        },
    },

    data() {
        return {
            user: {
                first_name: "",
                last_name: "",
                email: "",
                avatar: ""
            }
        }
    },
    methods: {
        onSubmit(user) {
            if (this.id) {
                this.$store.dispatch('editUser', user)
            } else {
                this.$store.dispatch("addUser", user)
            }
            this.$router.push("/")
        },

        async getUser() {
            let response = await this.$axios.$get(`/api/users/${this.$route.params.id}`)
            this.user = response.data
            debugger;
        },
    },

    created() {
        if (this.id) {
            this.getUser()
        }
    }
}
</script>
