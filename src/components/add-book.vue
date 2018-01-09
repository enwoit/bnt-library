<template>
  <v-app>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-title>
            <h1>Dodajesz nową książkę do Biblioteki BNT</h1>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>

                <v-flex xs12>
                  <v-text-field v-model="imageUrl" label="URL okładki książki" required></v-text-field>
                </v-flex>

                <v-flex xs12>
                  <img :src="imageUrl" style="max-width: 250px">
                </v-flex>

                <v-flex xs12>
                  <v-text-field v-model="title" label="Tytuł książki" required></v-text-field>
                </v-flex>

                <v-flex xs12>
                  <v-text-field v-model="author" label="Autor" required></v-text-field>
                </v-flex>

                <v-flex xs12>
                  <label>Wybierz właściciela książki z listy</label>
                  <select v-model="ownerID">
                    <option
                            v-for="user in users"
                            :key="user.id"
                            :value="user.id">{{ user.name }}
                    </option>
                  </select>

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
                  <v-text-field v-model="holder" label="Kto wypożycza obecnie książkę?"></v-text-field>
                </v-flex>

              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" flat @click.native="dialog = false">Zamknij</v-btn>
            <v-btn color="red" flat @click="addBook">Zapisz</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
    import { ADD_BOOK_QUERY, ALL_USERS_QUERY } from '../constants/graphql'
    import gql from 'graphql-tag'

    export default {
        data () {
            return {
                dialog: false,
                title: '',
                author: '',
                owner: '',
                holder: '',
                imageUrl: '',
                select: null,
                ownerID: null,
                row: null,
                users:[],
            }
        },
        apollo: {
            users: {
                query: ALL_USERS_QUERY,
                result ({ data }) {
                    this.users = Object.assign({}, data.allUsers)
                }
            },
        },
        methods: {
            addBook() {
                this.$apollo.mutate({
                    mutation: ADD_BOOK_QUERY,
                    variables: {
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
        },
    }
</script>

<style>
  select {
    padding:7px;
    border:1px solid #000;
  }
</style>