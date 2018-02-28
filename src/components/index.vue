<template>
  <v-container fluid>
      <div class="my-overlay">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>

    <div class="my-content">
      <v-flex xs12 sm6 offset-md5 class="mt-5 mb-5">
        <v-btn id="AddBookToLibrary" color="dark" dark @click.stop="dialog = true">Dodaj książkę do biblioteki bnt</v-btn>
        <!--<v-btn color="dark" dark @click.stop="subscribeNotification">Subskrybuj</v-btn>-->
        <!--<v-btn color="dark" dark @click.stop="unsubscribeFromNotifications">Wyłącz Subskrybcje</v-btn>-->
        <!--<v-btn color="dark" dark @click.stop="addNotification">Dodaj Notyfikację</v-btn>-->
      </v-flex>

      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg2 v-if="books" v-for="(book, index) in books" :key="book.id" class="card__wrapper">
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
    </div>
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

import {TweenMax, Power2, TimelineLite, TimelineMax} from "gsap";

export default {
  name: "HelloWorld",
  components: {
    AddBook
  },
  data() {
    return {
      books: [],
      users: [],
      user: {},
      dialog: false,
      show: false
    };
  },
  methods: {
      animate() {
        let button = document.getElementById('myButton');
        let dot = document.querySelectorAll('.dot');
        let overlay = document.querySelector('.my-overlay');
        let tl = new TimelineMax({repeat: 1, onComplete: this.showContent});

        tl.staggerFromTo( dot, 0.4,
            {y: -20, autoAlpha: 0},
            {y: 0, autoAlpha: 1, ease:Back.easeInOut},
            0.05
        )
        .fromTo(overlay, 0.3,
            {autoAlpha: 1, scale: 1.3},
            {autoAlpha: 0, scale: 1, ease:Power2.easeNone},
            0.9
        );
      },
      showContent() {
          let tlLoaderOut = new TimelineLite({onComplete: this.contentIn});
          let dot = document.querySelectorAll('.dot');
          let overlay = document.querySelector('.my-overlay');
          let content = document.querySelector('.my-content');

          tlLoaderOut
            .set(dot, {backgroundColor: '#2096f3'})
            .to(overlay,0.3, {autoAlpha: 1, scale: 1.3, ease:Power2.easeNone})
            .staggerFromTo( dot, 0.3,
                {y: -20, autoAlpha: 0},
                {y: 0, autoAlpha: 1, ease:Back.easeInOut},
                0.05, 0
            )
            .to(overlay,0.3, {y: -250, autoAlpha: 0, ease:Power2.easeInOut})
            .set(content, .5, {autoAlpha: 1});

          overlay.style.height = 0;
      },
      contentIn() {
          let overlay = document.querySelector('.my-overlay');
          let content = document.querySelector('.my-content');
          let card = document.querySelectorAll('.card__wrapper');
          let button = document.getElementById('AddBookToLibrary');
          let tlCardIn = new TimelineLite();
          content.style.opacity = 1;
          overlay.style.height = 0;

          tlCardIn
              .staggerFrom(card, 0.2, {rotation:360, cycle: {
                  x: [150, -150],
                  scale: [1.5, 0.2]
              }, autoAlpha: 0, ease:Power2.easeOut}, 0.1)
      .to(button, 0.2, {autoAlpha: 1, ease:Power2.easeInOut, cycle: {
          scale: [2.5, 0.5]
      }}, 2);

      },
      subscribeNotification() {
          this.$firebase.messaging().requestPermission();
      },
      checkSubscription() {
          let FIREBASE_DATABASE = this.$firebase.database();
          let FIREBASE_AUTH = this.$firebase.auth();

          FIREBASE_DATABASE.ref('/tokens').orderByChild("uid").equalTo(FIREBASE_AUTH.currentUser.uid).once('value').then((snapshot) => {
              if ( snapshot.val() ) {
                  subscribeButton.setAttribute("hidden", "true");
                  unsubscribeButton.removeAttribute("hidden");
              } else {
                  unsubscribeButton.setAttribute("hidden", "true");
                  subscribeButton.removeAttribute("hidden");
              }
          });
      },
      unsubscribeFromNotifications() {
          let FIREBASE_MESSAGING = this.$firebase.messaging();
          let FIREBASE_DATABASE = this.$firebase.database();
          let FIREBASE_AUTH = this.$firebase.auth();

          FIREBASE_MESSAGING.getToken()
              .then((token) => FIREBASE_MESSAGING.deleteToken(token))
              .then(() => FIREBASE_DATABASE.ref('/tokens').orderByChild("uid").equalTo(FIREBASE_AUTH.currentUser.uid).once('value'))
              .then((snapshot) => {
                  const key = Object.keys(snapshot.val())[0];
                  return FIREBASE_DATABASE.ref('/tokens').child(key).remove();
              })
              .then(() => this.checkSubscription())
              .catch((err) => {
                  console.log("error deleting token :(");
              });
      },
      addNotification() {
          let obj = {
              title: "Siema, pierwsze info",
              message: "Pierwsza wiadomość"
          };
          this.$firebase.database().ref('notifications').push(obj);
//          this.notifications.push(obj);
      }
  },
  mounted(){
      this.animate()
  },
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .my-overlay {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .dot {
    margin: 10px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid #2096f3;
  }

  .my-content, #AddBookToLibrary {
    opacity: 0;
  }

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
