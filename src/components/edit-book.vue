<template>
  <v-app>
    <v-layout row>
      <v-flex xs12 md6 offset-md3>
        <v-card class="mt-5 pa-3">
          <v-card-title>
            <h1>Edytuj książkę</h1>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap v-if="books">

                <v-flex xs12>
                  <v-select
                          label="Wybierz książkę, którą chcesz edytować"
                          v-bind:items="filteredBooks"
                          v-model="bookID"
                          @input="getBookDetails"
                          item-text="text"
                          item-value="value"
                          max-height="auto"
                  ></v-select>
                  {{ book }}
                </v-flex>

                <v-flex xs12>
                  <v-text-field v-model="imageUrl" label="URL okładki książki" required></v-text-field>
                </v-flex>

                <div xs12>
                  <img :src="imageUrl" style="max-width: 250px">
                </div>

                <v-flex xs12>
                  <v-text-field v-model="title" label="Tytuł książki" required></v-text-field>
                </v-flex>

                <v-flex xs12>
                  <v-text-field v-model="author" label="Autor" required></v-text-field>
                </v-flex>

                <v-flex xs12>
                  <v-select
                          label="Wybierz właściciela książki"
                          v-bind:items="filteredUsers"
                          v-model="ownerID"
                          item-text="text"
                          item-value="value"
                          max-height="auto"
                  ></v-select>

                  <p><a href="/#/dodaj-osobe">lub dodaj nowego</a></p>
                </v-flex>

                <v-flex xs12 sm9>
                  <v-radio-group v-model="row" row>
                    <h3 class="mr-3">Czy książka jest wypożyczona?</h3>
                    <v-radio label="Tak" value="true" ></v-radio>
                    <v-radio label="Nie" value="false"></v-radio>
                  </v-radio-group>
                </v-flex>

                <v-flex xs12 v-if="row === 'true'">
                  <v-select
                          label="Kto wypożycza obecnie książkę?"
                          v-bind:items="filteredUsers"
                          v-model="holder"
                          item-text="text"
                          item-value="value"
                          max-height="auto"
                  ></v-select>

                  <p><a href="/#/dodaj-osobe">Nie ma tej osoby na liście? Kliknij tutaj</a></p>
                </v-flex>

              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" flat @click="editBook">Edytuj książkę</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
    import { ALL_BOOKS_QUERY, ALL_USERS_QUERY, GET_BOOK_QUERY, EDIT_BOOK_QUERY } from '../constants/graphql'
    import gql from 'graphql-tag'

    export default {
        data () {
            return {
                bookID: null,
                title: '',
                author: '',
                owner: '',
                holder: '',
                imageUrl: '',
                ownerID: null,
                row: null,
                users:[],
                book:null,
                select: null,
                items: [
                    'Item 1',
                    'Item 2',
                    'Item 3',
                    'Item 4'
                ],
            }
        },
        apollo: {
            users: {
                query: ALL_USERS_QUERY,
                result ({ data }) {
                    this.users = Object.assign({}, data.allUsers)
                }
            },
            books: {
                query: ALL_BOOKS_QUERY,
                result ({ data }) {
                    this.books = Object.assign({}, data.allBooks)
                }
            }
        },
        computed: {
          filteredUsers() {
              return Object.entries(this.users).map(item => {
                  return {text: item[1].name, value: item[1].id}
              });
          },
          filteredBooks() {
              return Object.entries(this.books).map(item => {
                  return {text: item[1].title, value: item[1].id}
              });
          }
        },
        methods: {
            editBook() {
                this.$apollo.mutate({
                    mutation: EDIT_BOOK_QUERY,
                    variables: {
                        id: this.bookID,
                        title: this.title,
                        author: this.author,
                        imageUrl: this.imageUrl,
                        holder: this.holder,
                        ownerID: this.ownerID,
                    },
                }).then((data) => {
                    location.reload();
                    console.log(data)
                }).catch((error) => {
                    console.error(error)
                })
            },
            getBookDetails() {
                this.$apollo.query({
                    query: GET_BOOK_QUERY,
                    variables: {
                        id: this.bookID,
                    },
                }).then((data) => {
                    this.title = data.data.Book.title;
                    this.author = data.data.Book.author;
                    this.imageUrl = data.data.Book.imageUrl;
                    this.ownerID = data.data.Book.owner.id;
                }).catch((error) => {
                    console.error(error)
                })
            },
            },
    }
</script>

<style>
  select {
    padding:7px;
    border:1px solid #000;
  }
</style>