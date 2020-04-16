import React, { Component } from "react";
import BookCard from "./bookCard";
import firebase from "../firebase";

class BooksList extends Component {
  render() {
    return (
      <div>
        {this.props.books.map((book) => (
          <BookCard book={book} key={book.id} />
        ))}
      </div>
    );
  }
}

export default BooksList;
