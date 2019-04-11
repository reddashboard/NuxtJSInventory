<template>
  <v-layout>
    <v-flex text-xs-left>
      The message goes here: {{ message }}

      <p>Now the loaded posts</p>
      <input v-model="searchTerm" placeholder="search">
      <input id="checkbox" v-model="showPics" type="checkbox">
      <label for="checkbox">Show pictures {{ showPics }}</label>

      <div>
        <p>Search field: </p>
        <input id="wname" v-model="searchFields" type="radio" value="wname">
        <label for="wname">Winery/Winename</label>
        <br>
        <input id="color" v-model="searchFields" type="radio" value="Color">
        <label for="color">Color</label>
      </div>

      <input id="checkbox2" v-model="inStock" type="checkbox">
      <label for="checkbox2">In Stock {{ inStock }}</label>
      <p>Results Sorted {{ sortedPosts.length }} </p>
      <ul id="example-2">
        <li v-for="post in sortedPosts" :key="post.id">
          {{ post.WT.Winery }} {{ post.WT.WineName }} {{ post.WT.Color }}
          Purchased: {{ post.MY.Store }} {{ post.MY.Discounted }} {{ post.MY.DateConsumed }}

          <div v-if="showPics">
            <img :src="post.thumbnail">
          </div>
          <div
            v-if="0"
            class="post-thumbnail"
            :style="{backgroundImage: 'url(' + post.thumbnail + ')'}"
          />
        </li>
      </ul>
      <v-spacer />
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
      </p>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      message: 'Hello message',
      products: ['a', 'b', 'c'],
      newTodoText: '',
      searchTerm: '',
      showPics: true,
      inStock: 1,
      searchFields: 'wname',
      todos: [
        {
            id: 1,
            title: 'Do the dishes'
        },
        {
            id: 2,
            title: 'Take out the trash'
        },
        {
            id: 3,
            title: 'Mow the lawn'
        }
    ]
    }
  },
    computed: {
    loadedPosts() {
     // console.log('posts ' + this.$store.getters.loadedPosts)
  //    const searchT = this.searchTerm.toLowerCase()
  //    const inStockNum = this.inStock ? 1.0 : 0.0
      console.log('Searching' + this.searchFields)
      return this.filter()
      /*
      if (this.searchFields === 'wname') {
return this.$store.getters.loadedPosts.filter(c => (c.WT.Winery.toLowerCase().indexOf(searchT) >= 0 ||
          c.WT.WineName.toLowerCase().indexOf(searchT) >= 0) &&
           c.MY.QuantityInStock >= inStockNum)
} else {
 return this.$store.getters.loadedPosts.filter(c => c.WT.Color.toLowerCase().indexOf(searchT) >= 0 &&
           c.MY.QuantityInStock >= inStockNum)
} */
    },
    sortedPosts() {
      return this.filter().sort(this.compareWine)
    }

    },
      methods: {
      filter: function () {
              const searchT = this.searchTerm.toLowerCase()
      const inStockNum = this.inStock ? 1.0 : 0.0
              if (this.searchFields === 'wname') {
return this.$store.getters.loadedPosts.filter(c => (c.WT.Winery.toLowerCase().indexOf(searchT) >= 0 ||
          c.WT.WineName.toLowerCase().indexOf(searchT) >= 0) &&
           c.MY.QuantityInStock >= inStockNum)
} else {
 return this.$store.getters.loadedPosts.filter(c => c.WT.Color.toLowerCase().indexOf(searchT) >= 0 &&
           c.MY.QuantityInStock >= inStockNum)
}
      },
      compareWine: function (a, b) {
        const wineryA = a.WT.Winery.toUpperCase()
        const wineryB = b.WT.Winery.toUpperCase()

        let comparison = 0
        if (wineryA > wineryB) {
          comparison = 1
        } else if (wineryA < wineryB) {
          comparison = -1
        }
        return comparison
      }
      }
}
</script>
<style scoped>
.post-thumbnail {
  width: 100%;
  height: 200px;
  background-position: center;
  background-size: cover;
}

.post-content {
  padding: 10px;
  text-align: center;
}
</style>
