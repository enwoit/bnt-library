import gql from 'graphql-tag'

export const ALL_BOOKS_QUERY = gql`
    query getBooks {
        allBooks {
            id
            title
            author
            imageUrl
            holder
            owner {
                name
                facebookUrl
            }
        }
    }
    `

export const ALL_USERS_QUERY = gql`
    query getUsers {
        allUsers {
            id
            name
            facebookUrl
            books {
                title
            }
        }
    }
`
export const USER_QUERY = gql`
    query getUser {
        User(id: "cjc4rkyb60zi40126c7g688f5") {
            name
            facebookUrl
            books {
                title
            }
        }
    }
`

export const ADD_BOOK_QUERY = gql`
    mutation addBook($title: String!, $author: String!, $imageUrl: String!, $holder: String) {
        createBook(
            title: $title
            author: $author
            imageUrl: $imageUrl
            holder: $holder
            ownerId: "cjc4rkyb60zi40126c7g688f5"
        ), {
        title,
        owner {
            id
        }
        }
    }
`