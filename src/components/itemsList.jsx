import React, { Component } from "react";
import BookCard from "./bookCard";

const itemsList = ({ books }) => {
  return (
    <div>
      {books.map((book) => (
        <BookCard book={book} key={book.id} />
      ))}
    </div>
  );
};

export default itemsList;
