export default {
    name: 'textarea-editable',
    data() {
        return {
            edited: false,
            model: this.value
        }
    },
    props: ['value', 'rows'],
    watch: {
        value: function(val) {
            this.model = val
        }
    },
    computed: {
    },
    methods: {
        editComment(e) {
            e.currentTarget.removeAttribute('readonly');
            e.currentTarget.focus();
            e.currentTarget.setSelectionRange(e.currentTarget.value.length,e.currentTarget.value.length);
            this.edited = true;
            this.$emit('editInput', true);
        },
        saveComment(e) {
            if(this.edited == true) {
                this.$emit('saveInput', e.target.value);
                e.currentTarget.setAttribute('readonly', true);
                this.edited = false;
            }
        },

        noFocus() {
            this.$emit('leftField', true);
        }
    }
}