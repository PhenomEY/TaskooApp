export default {
    name: 'textarea-editable',
    data: () => ({
        edited: false
    }),
    props: ['value', 'rows'],
    watch: {
    },
    computed: {
    },
    methods: {
        editComment(e) {
            e.currentTarget.removeAttribute('readonly');
            e.currentTarget.focus();
            e.currentTarget.setSelectionRange(e.currentTarget.value.length,e.currentTarget.value.length);
            e.currentTarget.scrollTop = e.currentTarget.scrollHeight;
            this.edited = true;
        },
        saveComment(e) {
            if(this.edited == true) {
                this.$emit('saveArea', e.target.value);
                e.currentTarget.setAttribute('readonly', true);
                this.edited = false;
            }
        }
    }
}