<template>
    <div style="margin-bottom: 20px">
        <v-btn @click="orders.push('A')">avance</v-btn> 
        <v-btn @click="orders.push('R')">Izquierda</v-btn> 
        <v-btn @click="orders.push('L')">derecha</v-btn> 

        <v-btn @click="doOrders()">GO</v-btn>
    actual orders: {{orders}}
    </div>
</template>

<script>
export default{
    //props:["orders"],
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
