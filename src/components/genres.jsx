import React, { Component } from "react";
import firebase from "../firebase";

class Genres extends Component {
  state = {
    genres: [],
    selectedGenre: "allGenres",
  };

  componentDidMount() {
    const itemsRef = firebase.database().ref("genres");
    const genres = { ...this.state.genres };
    itemsRef.on("value", (snapshot) => {
      let items = snapshot.val();
      this.setState({ genres: Object.values(items) });
    });
  }

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre });
    console.log(this.state.selectedGenre);
  };

  render() {
    const { genres, selectedGenre } = this.state;
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
            onClick={() => this.handleGenreSelect("allGenres")}
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
              onClick={() => this.handleGenreSelect(genre.name)}
            >
              {genre.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Genres;