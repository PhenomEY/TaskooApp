export default {
    name: 'TaskooSelect',
    components: {},

    data() {
        return {
            data: this.model
        }
    },

    mounted() {
        this.initOptions();
    },

    watch: {
    },

    props: {
        type: {
            required: true
        },

        model: {
            required: true
        },

        placeholder: String
    },

    computed: {
    },


    methods: {
        initOptions() {
            let me = this;

            this.$slots.default.forEach(option => {

            option.elm.addEventListener("click", function() {
                me.optionSelected(option.elm)
                }
            );
            })
        },

        optionSelected(option) {
            if(this.type === 'single') {
                this.data = option.getAttribute('t-value')
                this.$emit('changed', this.data)
            }

            if(this.type === 'users') {
                const id = option.getAttribute('t-value')
                const firstname = option.getAttribute('t-firstname')
                const lastname = option.getAttribute('t-lastname')

                let check = this.data.findIndex(x =>(x.id == id))

                if(check === -1) {
                    this.data.push({
                        'id': id,
                        'firstname': firstname,
                        'lastname': lastname
                    })

                    this.$emit('userAdded', id)
                }
            }
        },

        removeUser(id) {
            const userId = id;
            let index = this.data.findIndex(x => x.id === userId)
            this.data.splice(index, 1);

            this.$emit('userRemoved',id);
        }
    }
}