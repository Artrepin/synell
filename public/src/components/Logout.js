export default {
    name: 'Logout',
    created: function () {
        console.log(this.$session.destroy())
        this.$router.push('/')
    },
    data: function () {
        return {

        }
    },
    methods: {

    },
    template: `<main>logout</main>`,
}
