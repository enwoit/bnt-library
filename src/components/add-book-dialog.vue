<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="550px">
      <v-btn color="blue" slot="activator">Dodaj książkę</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Dodajesz nową książkę do Biblioteki BNT</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>



                <v-flex xs12>
                  <v-text-field v-model="title" label="Tytuł książki" required></v-text-field>
                </v-flex>

                <v-flex xs12>
                  <v-text-field v-model="author" label="Autor" required></v-text-field>
                </v-flex>

                <v-flex xs12>
                  <v-text-field v-model="imageUrl" label="URL okładki książki (weź z Googla)" required></v-text-field>
                </v-flex>

              <v-flex xs12>
                <img :src="imageUrl" style="max-width: 300px">
              </v-flex>

              <!--<v-flex xs12>-->
                <!--<v-select-->
                        <!--v-bind:items="users.name"-->
                        <!--v-model="a1"-->
                        <!--label="Właściciel książki"-->
                        <!--autocomplete-->
                <!--&gt;</v-select>-->
              <!--</v-flex>-->

              <!--<v-flex xs12 sm9>-->
                <!--<v-radio-group v-model="row" row>-->
                  <!--<h3 class="mr-3">Czy książka jest wypożyczona?</h3>-->
                  <!--<v-radio label="Tak" value="true" ></v-radio>-->
                  <!--<v-radio label="Nie" value="false"></v-radio>-->
                <!--</v-radio-group>-->
              <!--</v-flex>-->

              <v-flex xs12>
                <v-text-field v-model="owner" label="Kto jest właścicielem ?" required></v-text-field>
              </v-flex>

              <v-flex xs12>
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
    </v-dialog>
  </v-layout>
</template>

<script>
    import {
        ADD_BOOK_QUERY,
        ALL_USERS_QUERY
    } from '../constants/graphql'
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
                a1: null,
                row: null,
                users:[],
                states: [
                    'Alabama','Alaska','American Samoa','Arizona',
                    'Arkansas','California','Colorado','Connecticut',
                    'Delaware','District of Columbia','Federated States of Micronesia',
                    'Florida','Georgia','Guam','Hawaii','Idaho',
                    'Illinois','Indiana','Iowa','Kansas','Kentucky',
                    'Louisiana','Maine','Marshall Islands','Maryland',
                    'Massachusetts','Michigan','Minnesota','Mississippi',
                    'Missouri','Montana','Nebraska','Nevada',
                    'New Hampshire','New Jersey','New Mexico','New York',
                    'North Carolina','North Dakota','Northern Mariana Islands','Ohio',
                    'Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico',
                    'Rhode Island','South Carolina','South Dakota','Tennessee',
                    'Texas','Utah','Vermont','Virgin Island','Virginia',
                    'Washington','West Virginia','Wisconsin','Wyoming'
                ]
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
                    },
                }).then((data) => {
                    // Result
                    location.reload();
                    console.log(data)
                }).catch((error) => {
                    // Error
                    console.error(error)
                })
                console.log('add book end');
            },
        }    }
</script>