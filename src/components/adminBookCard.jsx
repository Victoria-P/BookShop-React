import React, { Component } from "react";
import Form from "./common/form";
import Joi from "joi-browser";
// import auth from "../services/authService";
import http from "../services/httpService";

class AdminBookCard extends Form {
  state = {
    data: {
      name: "",
      author: "",
      description: "",
      imageUrl: "",
      genreId: "",
    },
    genres: [],
    errors: {},
  };

  componentDidMount() {
    // if (!this.props.book) return;

    console.log(this.props.book);
    this.setState({ data: this.mapToViewModel(this.props.book) });
  }

  mapToViewModel(book = {}) {
    return {
      id: book.id || new Date().getTime(),
      name: book.name || "",
      author: book.author || "",
      description: book.description || "",
      imageUrl: book.imageUrl || "",
      genreId: book.genreId || "",
      genreName: book.genreName || "",
    };
  }

  schema = {
    name: Joi.string().required().label("Title"),
    author: Joi.string().required().label("Author"),
    description: Joi.string().required().label("Description"),
    genreId: Joi.number().required().label("Genre"),
    imageUrl: Joi.string().required().label("Image URL"),
  };

  doSubmit = async () => {
    // const response = await http.post("books", );
    // console.log(response);
    this.props.onSave(this.state.data);
  };

  render() {
    const { book, genres, onDelete } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="bookCard">
          <div className="card" style={{ maxWidth: "540px" }}>
            <div className="row no-gutters">
              <div className="col-4">
                <img
                  src={
                    this.state.data.imageUrl ||
                    "https://aimint.org/za/wp-content/uploads/sites/16/2016/04/image-placeholder-vertical.jpg"
                  }
                  className="card-img mt-4"
                  alt={this.state.data.name}
                />
                {this.renderInput("imageUrl", "Image URL")}
              </div>
              <div className="col">
                <div className="card-body">
                  <h5 className="card-title">
                    {this.renderInput("name", "Title")}
                    {this.renderInput("author", "Author")}
                    {this.renderInput("description", "Description")}
                    {this.renderSelect("genreId", "Genre", genres)}
                  </h5>
                  <button
                    disabled={this.validate()}
                    className="btn btn-outline-success m-2"
                    type="submit"
                  >
                    Save
                  </button>
                  {onDelete && (
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => onDelete(book)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default AdminBookCard;
