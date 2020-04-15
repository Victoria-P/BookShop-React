import React, { Component } from "react";
import BookCard from "./bookCard";
import firebase from "../firebase";

class BooksList extends Component {
  state = {
    books: this.props.books,
  };

  componentDidMount() {
    const itemsRef = firebase.database().ref("books");
    const books = { ...this.state.books };
    itemsRef.on("value", (snapshot) => {
      let items = snapshot.val();
      this.setState({ books: Object.values(items) });
    });
    console.log(this.state.books);
  }

  render() {
    const { books } = this.state;

    return (
      <div>
        {books.map((book) => (
          <BookCard book={book} key={book.id} />
        ))}
      </div>
    );
  }
}

export default BooksList;
