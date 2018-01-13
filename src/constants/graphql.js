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

export const GET_BOOK_QUERY = gql`
    query getBook($id: ID!) {
        Book(id: $id) {
            id
            title
            author
            holder
            imageUrl
            owner {
                id
            }
        }
    }
`

export const ADD_BOOK_QUERY = gql`
    mutation addBook($title: String!, $author: String!, $imageUrl: String!, $holder: String, $ownerID: ID!) {
        createBook(
            title: $title
            author: $author
            imageUrl: $imageUrl
            holder: $holder
            ownerId: $ownerID
        ), {
        title,
        owner {
            id
        }
        }
    }
`

export const EDIT_BOOK_QUERY = gql`
    mutation editBook($id: ID!, $title: String!, $author: String!, $imageUrl: String!, $holder: String, $ownerID: ID!) {
        updateBook(
            id: $id
            title: $title
            author: $author
            imageUrl: $imageUrl
            holder: $holder
            ownerId: $ownerID
        ), {
        title,
        owner {
            id
        }
    }
    }
`

export const ADD_USER_QUERY = gql`
    mutation createUser($name: String!, $facebookUrl: String!) {
        createUser(
            name: $name
            facebookUrl: $facebookUrl
        ), {
        id,
        name,
        facebookUrl
        }
    }
`