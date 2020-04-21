import React from "react";
import BookCard from "./bookCard";

const itemsList = ({ books, onLike }) => {
  return (
    <div>
      {books.map((book) => (
        <BookCard book={book} key={book.id} onLike={onLike} />
      ))}
    </div>
  );
};

export default itemsList;
