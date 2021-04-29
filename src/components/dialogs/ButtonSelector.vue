<template>
    <div class="mb-4">
        <v-btn class="mb-4" @click="orders.push('A')">move forward</v-btn>
        <div class="mb-5"> 
            <v-btn class="mr-4" @click="orders.push('R')">Left</v-btn> 
            <v-btn @click="orders.push('L')">Right</v-btn> 
        </div>
        <v-btn @click="doOrders()">GO</v-btn>
        <span class="ml-4"> actual orders: {{orders}} </span>
    </div>
</template>

<script>
export default{
    data() {
        return {
            orders : []
        }
    },
      methods: {
        doOrders() {
             this.$emit('makeActions', this.orders) 
             this.orders = [] 
        }
    }
}
</script>
