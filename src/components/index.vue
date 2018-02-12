<template>
  <v-container>
    <h1 class="mt-5 mb-3 text-xs-center">Biegowa Bilbioteka BNT</h1>
    <p style="font-size: 18px" class="text-xs-center mb-5">
      Książki dla biegaczy od biegaczy.<br><br>
      Biegowa biblioteka BNT to miejsce, w którym możesz za darmo pożyczyć książkę o tematyce,
      która Cię interesuje, a jeśli chcesz się również podzielić innymi pozycjami, to śmiało <a href="/#/dodaj-ksiazke">dodaj swoją książkę</a>
      do biblioteczki BNT.
    </p>
    <div class="grid">
      <div v-if="books" v-for="(book, index) in books" :key="book.id" :class="{card__info : book.holder}">
        <img :src="book.imageUrl">
        <div style="display: grid;">
          <div class="text-xs-center">
            <b>{{ book.title }}</b><br>
            <p>{{ book.author }}</p>
            <span class="grey--text">
              Własność: <a title="Kliknij i zarezerwuj przez Facebooka" :href="`https://www.facebook.com/messages/t/${book.owner.facebookUrl}`" target="_blank">
              {{ book.owner.name }}
            </a></span><br>
            <span v-if="book.holder">Obecnie książkę czyta: {{ book.holder }}</span>
          </div>
        </div>
      </div>
      <v-flex xs12 class="text-xs-center" v-else>
        <v-progress-circular indeterminate v-bind:size="70" v-bind:width="7" color="purple"></v-progress-circular>
      </v-flex>
    </div>
  </v-container>
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
  .grid {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  }
  .card__media__background {
    background-size: contain !important;
  }

  .card {
    background-color: #fff;
  }

  .card__info {
    background-color: #e5ffd1;
    box-shadow: 0 0 30px 2px rgba(0,0,0,0.26);
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
