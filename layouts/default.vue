<template>
<div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
        <nuxt-link class="navbar-brand" to="/" v-if="isAuth">Home</nuxt-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item active" v-if="isAuth">
                    <nuxt-link class="nav-link" to="/form">Form</nuxt-link>
                </li>
                <li class="nav-item active" v-if="isAuth">
                    <nuxt-link class="nav-link" to="/details">Detail</nuxt-link>
                </li>
                <li class="nav-item active" v-if="!isAuth">
                    <nuxt-link class="nav-link" to="/signin">Sign In</nuxt-link>
                </li>
            </ul>
        </div>
    </nav>
    <Nuxt />
</div>
</template>

<script>
export default {
    computed: {
        isAuth() {
            return this.$store.getters.isAuthenticated
        }
    },

    beforeCreate() {
        if(this.$store.getters.getToken) {
            this.$axios.setHeader("Authorization", "Bearer " + this.$store.getters.getToken)
        }
    }
}
</script>

<style>
html {
    font-family:
        'Source Sans Pro',
        -apple-system,
        BlinkMacSystemFont,
        'Segoe UI',
        Roboto,
        'Helvetica Neue',
        Arial,
        sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
}

*,
*::before,
*::after {
    box-sizing: border-box;
    margin: 0;
}

.button--green {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #3b8070;
    color: #3b8070;
    text-decoration: none;
    padding: 10px 30px;
}

.button--green:hover {
    color: #fff;
    background-color: #3b8070;
}

.button--grey {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #35495e;
    color: #35495e;
    text-decoration: none;
    padding: 10px 30px;
    margin-left: 15px;
}

.button--grey:hover {
    color: #fff;
    background-color: #35495e;
}

.navbar-brand .nav-link {
    cursor: pointer;

}
</style>
