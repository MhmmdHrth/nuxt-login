<template>
<div>
    <Form :id="$route.params.id"></Form>
</div>
</template>

<script>
import Form from '~/components/form'

export default {

    components: {
        Form,
    },

    middleware:["check-auth","auth"]
}
</script>

<style scoped>

</style>
