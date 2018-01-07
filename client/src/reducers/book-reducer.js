import {SET_BOOKS,SET_BOOKS_ERROR,SET_SEARCH_RESULT,ADD_BOOK_LOCAL} from "../actions";

export default function (state={}, action) {
    console.log("books_reducer:",state,action);
    switch (action.type) {
        case SET_BOOKS:
          return {...state,books:action.payload};
        case SET_SEARCH_RESULT:
          return {...state,searchResult:action.payload};
        case ADD_BOOK_LOCAL:
          const newBooks = state.books?state.books.slice():[];
          newBooks.push(action.payload);
          return {...state,books:newBooks};
        case SET_BOOKS_ERROR:
          return {...state,error:action.payload};
        default:
          return state;
    }
}
