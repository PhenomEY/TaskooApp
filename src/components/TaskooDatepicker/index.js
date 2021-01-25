import axios from "axios";
import Datepicker from 'vuejs-datepicker';
import {en, de} from 'vuejs-datepicker/dist/locale'

export default {
    name: 'TaskooDatepicker',
    components: {Datepicker},

    data() {
        return {
          inputModel: this.model,
            de: de,
            en: en,
        }
    },

    props: {
        model: Date,
        label: String,
        required: Boolean
    },

    watch: {
    },


    mounted() {
        this.$material.locale.days = this.$t('taskoo.days');
        this.$material.locale.shortDays = this.$t('taskoo.shortDays');
        this.$material.locale.shorterDays = this.$t('taskoo.shorterDays');
    },

    computed: {

        disabledDates: function() {
            let date = new Date();
            date.setDate(date.getDate()-1);
            return {
                to: date
            }
        }
    },

    methods: {
        dateChanged(date) {
            this.$emit('modelChanged',date)
        },

        customFormatter(date) {
            return this.$moment(date).format('LL');
        },
    }
}