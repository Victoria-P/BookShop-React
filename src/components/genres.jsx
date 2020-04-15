import React, { Component } from "react";
import firebase from "../firebase";

class Genres extends Component {
  state = {
    genres: this.props.genres,
    selectedGenre: this.props.selectedGenre,
  };

  componentDidMount() {
    const itemsRef = firebase.database().ref("genres");
    const genres = { ...this.props.genres };
    itemsRef.on("value", (snapshot) => {
      let items = snapshot.val();
      this.setState({ genres: Object.values(items) });
    });
    console.log(this.state.genres);
  }

  render() {
    const { genres, selectedGenre } = this.state;
    const { onItemSelected } = this.props;
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
}

export default Genres;
