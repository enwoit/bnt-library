<template>
  <v-app>
      <v-flex xs12 md6 offset-md3>
        <v-card class="mt-5 pa-3">
          <v-card-title>
            <h1>Dodajesz nową książkę do Biblioteki BNT</h1>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>

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

                  <v-btn flat @click.native="dialogAddUser = true">lub dodaj nowego</v-btn>
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

                  <v-btn flat @click.native="dialogAddUser = true">Nie ma na liście? Dodaj nowego!</v-btn>
                </v-flex>

              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" flat @click="addBook">Dodaj książkę</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

    <!--DODAJ Usera-->
    <v-dialog
            v-model="dialogAddUser"
            transition="dialog-bottom-transition"
            :overlay="true"
            :scrollable="false"
            max-width="1200px"
    >
      <v-card tile>
        <v-toolbar card dark color="blue">
          <v-spacer>
          </v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="dialogAddUser = false">Zamknij</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <add-user></add-user>
        </v-card-text>
      </v-card>
    </v-dialog>

  </v-app>
</template>

<script>
    import { ADD_BOOK_QUERY, ALL_USERS_QUERY } from '../constants/graphql'
    import gql from 'graphql-tag'
    import AddUser from './add-user.vue'

    export default {
        components: {
            AddUser
        },
        data () {
            return {
                dialogAddUser: false,
                title: '',
                author: '',
                owner: '',
                holder: '',
                imageUrl: '',
                ownerID: null,
                row: null,
                users:[],
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
        },
        computed: {
          filteredUsers() {
              return Object.entries(this.users).map(item => {
                  return {text: item[1].name, value: item[1].id}
              });
//              return this.users.map(arr => { return { value: arr[0], text: arr[1] } })
          }
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