<template>
  <v-container>
    <h1 class="mt-5 mb-3 text-xs-center">Biegowa Bilbioteka BNT</h1>
    <p style="font-size: 18px" class="text-xs-center mb-5">
      Książki dla biegaczy od biegaczy.<br><br>
      Biegowa biblioteka BNT to miejsce, w którym możesz za darmo pożyczyć książkę o tematyce,
      która Cię interesuje, a jeśli chcesz się również podzielić innymi pozycjami, to śmiało <b>dodaj swoją książkę</b>
      do biblioteczki BNT.
    </p>
    <v-flex xs12 sm6 offset-md4 class="mt-5 mb-5">
      <v-btn color="dark" dark @click.stop="dialog = true">Dodaj książkę do biblioteki bnt</v-btn>
    </v-flex>

    <v-layout row wrap>
      <v-flex xs12 sm6 md4 lg3 v-if="books" v-for="(book, index) in books" :key="book.id" class="card__wrapper">
        <v-card :class="{card__info : book.holder}">
          <v-card-media
                  :src="book.imageUrl"
                  height="300px"
          >
          </v-card-media>
          <v-card-title primary-title>
            <div class="text-center">
              <h3>{{ book.title }}</h3>
              <p>{{ book.author }}</p>
            </div>
          </v-card-title>
          <v-card-actions center>
            <v-btn flat color="green" :href="`https://www.facebook.com/messages/t/${book.owner.facebookUrl}`" target="_blank">Wypożycz</v-btn>
          </v-card-actions>
          <v-slide-y-transition>
            <v-card-text>
              <span class="grey--text">
              Własność: <a title="Kliknij i zarezerwuj przez Facebooka" :href="`https://www.facebook.com/messages/t/${book.owner.facebookUrl}`" target="_blank">
              {{ book.owner.name }}
            </a></span><br>
              <span v-if="book.holder">Obecnie książkę czyta: {{ book.holder }}</span>
            </v-card-text>
          </v-slide-y-transition>
        </v-card>
      </v-flex>
      <v-flex xs12 class="text-xs-center" v-else>
        <v-progress-circular indeterminate v-bind:size="70" v-bind:width="7" color="purple"></v-progress-circular>
      </v-flex>
    </v-layout>

    <!--DODAJ KSIĄŻKĘ-->
    <v-dialog
            v-model="dialog"
            fullscreen
            transition="dialog-bottom-transition"
            :overlay="true"
            scrollable
    >
      <v-card tile>
        <v-toolbar card dark color="blue">
          <v-spacer>
          </v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="dialog = false">Zamknij</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <add-book></add-book>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import {
  ALL_BOOKS_QUERY,
  ALL_USERS_QUERY,
  USER_QUERY,
  ADD_BOOK_QUERY
} from "../constants/graphql";
import gql from "graphql-tag";
import AddBook from './add-book.vue'

export default {
  name: "HelloWorld",
  components: {
    AddBook
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      books: [],
      users: [],
      user: {},
      dialog: false,
      items: [
        {
          title: "Click Me"
        },
        {
          title: "Click Me"
        },
        {
          title: "Click Me"
        },
        {
          title: "Click Me 2"
        }
      ],
      show: false
    };
  },
  methods: {},
  apollo: {
    books: {
      query: ALL_BOOKS_QUERY,
      result({ data }) {
        this.books = Object.assign({}, data.allBooks);
      }
    },
    users: {
      query: ALL_USERS_QUERY,
      result({ data }) {
        this.users = Object.assign({}, data.allUsers);
      }
    },
    user: {
      query: USER_QUERY,
      result({ data }) {
        this.user = Object.assign({}, data.User);
      }
    }
  }
};
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
  padding-bottom: 15px;
  text-align: center;
}

.card__wrapper {
  padding: 0 15px 15px;
}

.card__image {
  margin-bottom: 15px;
}

.card__content {
  display: grid;
}

.card__info {
  background-color: #e5ffd1;
  box-shadow: 0 0 30px 2px rgba(0, 0, 0, 0.26);
}

.card__text {
  padding: 0 16px;
  width: 100%;
}

h1,
h2 {
  font-weight: normal;
}
img {
  max-width: 150px;
}
a {
  color: #42b983;
}
</style>
