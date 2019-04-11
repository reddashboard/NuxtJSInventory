import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
    console.log('In the store createStore')
  return new Vuex.Store({
    state: {
      loadedPosts: []
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts
      },
      addPost(state, post) {
        state.loadedPosts.push(post)
      },
      editPost(state, editedPost) {
        const postIndex = state.loadedPosts.findIndex(
          post => post.id === editedPost.id
        )
        state.loadedPosts[postIndex] = editedPost
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        console.log('nuxtServerInit calling axios.get') //          .get('https://firebasestorage.googleapis.com/v0/b/rjsnuxttest.appspot.com/o/testposts.json?alt=media&token=4629a174-e80b-428d-a609-ac8fded4167f')

        return axios
          .get('http://stelling.org/VueTest/WineList.json')
          .then((res) => {
            const postsArray = []
            console.log('Axios returned ' + res.data)
            for (const key in res.data) {
                console.log('key ' + key + ' data ' + res.data[key].WT.Winery)
              postsArray.push({ ...res.data[key], id: key })
            }
            vuexContext.commit('setPosts', postsArray)
          })
          .catch(e => context.error(e))
      },
      addPost(vuexContext, post) {
        const createdPost = {
          ...post,
          updatedDate: new Date()
        }
        return axios
        .post('https://RJSNuxtTest.firebaseio.com/posts.json', createdPost)
        .then((result) => {
          vuexContext.commit('addPost', { ...createdPost, id: result.data.name })
        })
        .catch(e => console.log(e))
      },
      editPost(vuexContext, editedPost) {
        return axios.put('https://RJSNuxtTest.firebaseio.com/posts/' +
          editedPost.id +
          '.json', editedPost)
          .then((res) => {
            vuexContext.commit('editPost', editedPost)
          })
          .catch(e => console.log(e))
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit('setPosts', posts)
      }
    },
    getters: {
      loadedPosts(state) {
          console.log('Getting loadedPosts ' + state.loadedPosts)
        return state.loadedPosts
      }
    }
  })
}

export default createStore
