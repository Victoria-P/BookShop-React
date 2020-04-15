import React, { Component } from "react";
import BookCard from "./bookCard";
import firebase from "../firebase";

class BooksList extends Component {
  state = {
    books: [],
  };

  componentDidMount() {
    const itemsRef = firebase.database().ref("books");
    const books = { ...this.state.books };
    itemsRef.on("value", (snapshot) => {
      let items = snapshot.val();
      this.setState({ genres: Object.values(items) });
    });
  }

  render() {
    return (
      <div>
        <BookCard books={this.state.books} />
      </div>
    );
  }
}

export default BooksList;
