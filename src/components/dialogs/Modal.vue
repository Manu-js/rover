<template>
  <div class="text-center">
    <v-dialog
      v-model="modal"
      width="500"
    >
      <v-card>
        <v-card-title class="headline grey lighten-2">
           <slot name="tittle">
           </slot>
        </v-card-title>

        <v-card-text>
            <slot name="content">
            <v-card-text class="px-6 pt-0 pb-6">
                <slot />
            </v-card-text>
            </slot>        
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
            <slot name="footer">
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            I accept
            
          </v-btn>
           </slot>      
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        modal: false,
      }
    },
    methods:{
    show() {
      this.modal = true
    },
    hide() {
      this.modal = false
    },
    },
  watch: {
    modal(value) {
      this.$emit(value ? 'open' : 'close')
    }
  }
  }
</script>