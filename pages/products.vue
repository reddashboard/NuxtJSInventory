<template>
  <v-layout>
    <div class="text-xs-center">
      <ProductList />
    </div>
  </v-layout>
</template>
<script>
import ProductList from '~/components/ProductList.vue'

export default {
  components: {
    ProductList
  }
}
</script>
