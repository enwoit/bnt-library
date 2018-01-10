<template>
  <v-app>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card class="pl-5 pr-5 pb-5 mt-5 pt-1">
      <v-form v-model="valid" class="mt-5" ref="form" lazy-validation>
        <h1 class="mb-4">Dodaj osobę do listy książkożerców</h1>
    <v-text-field
            label="Imię i nazwisko"
            v-model="name"
            :rules="nameRules"
            required
    ></v-text-field>
    <v-text-field
            label="Adres konta na Facebooku (np. jacek.bulyk)"
            v-model="facebookUrl"
            :rules="facebookUrlRules"
    ></v-text-field>
    <v-btn
            @click="submit"
            :disabled="!valid"
    >
      Dodaj użytkownika
    </v-btn>
    <v-btn @click="clear">Wyczyść</v-btn>
  </v-form>
      </v-card>
    </v-flex>
  </v-layout>
  </v-app>
</template>

<script>
    import { ADD_USER_QUERY } from '../constants/graphql'
    import gql from 'graphql-tag'

    export default {
        data: () => ({
            valid: true,
            name: '',
            nameRules: [
                (v) => !!v || 'Musisz podać imię i nazwisko'
            ],
            facebookUrl: '',
            facebookUrlRules: [
                (v) => !!v || 'Podaj adres konta na facebooku'
            ],
            checkbox: false
        }),
        methods: {
            submit () {
                if (this.$refs.form.validate()) {
                    this.$apollo.mutate({
                        mutation: ADD_USER_QUERY,
                        variables: {
                            name: this.name,
                            facebookUrl: this.facebookUrl,
                        },
                    }).then((data) => {
                        console.log(data);
                        this.clear();
                    }).catch((error) => {
                        console.error(error)
                    })

                }
            },
            clear () {
                this.$refs.form.reset()
            }
        }
    }
</script>