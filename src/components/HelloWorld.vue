<template>
  <div class="">
    <v-layout style="flex-wrap: wrap !important;">
      <v-flex xs6 sm4 md2 v-for="book in books" :key="book.id" class="pa-2">
        <v-card>
          <v-card-media
                  :data-id="book.id"
                  style="background-size: contain !important"
                  class="white--text"
                  height="200px"
                  :src="book.imageUrl"
          >
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-media>
          <v-card-title>
            <div>
              <b>{{ book.title }}</b><br>
              <p>{{ book.author }}</p>
              <p class="grey--text">
                Własność: <a title="Kliknij i zarezerwuj przez Facebooka" :href="`https://www.facebook.com/messages/t/${book.owner.facebookUrl}`" target="_blank">
                {{ book.owner.name }}
              </a></p>
              <p v-if="book.holder">Obecnie książka u: {{ book.holder }}</p>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
    import {
        ALL_BOOKS_QUERY,
        ALL_USERS_QUERY,
        USER_QUERY,
        ADD_BOOK_QUERY
    } from '../constants/graphql'
    import gql from 'graphql-tag'

    export default {
    name: 'HelloWorld',
    data () {
      return {
          msg: 'Welcome to Your Vue.js App',
          hello: '1',
          loading: 0,
          books: [],
          users: [],
          user: {},
      }
    },
    methods: {
    },
    apollo: {
    books: {
        query: ALL_BOOKS_QUERY,
        result ({ data }) {
            this.books = Object.assign({}, data.allBooks)
        }
    },
    users: {
        query: ALL_USERS_QUERY,
        result ({ data }) {
            this.users = Object.assign({}, data.allUsers)
        }
    },
    user: {
        query: USER_QUERY,
        result ({ data }) {
            this.user = Object.assign({}, data.User)
        }
    }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .card__media__background {
    background-size: contain !important;
  }

  .card {
    background-color: #fff;
  }

h1, h2 {
  font-weight: normal;
}
img {
  max-width: 150px;
}
a {
  color: #42b983;
}
</style>
