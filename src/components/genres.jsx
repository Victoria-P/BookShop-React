import React, { Component } from "react";

function Genres({ onItemSelected, genres, selectedGenre }) {
  return (
    <div>
      <ul className="list-group">
        <li
          key={0}
          className={
            selectedGenre === "allGenres"
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => onItemSelected("allGenres")}
        >
          All Genres
        </li>
        {genres.map((genre) => (
          <li
            key={genre.id}
            className={
              genre.name === selectedGenre
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => onItemSelected(genre.name)}
          >
            {genre.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Genres;
