import React, { Component } from "react";
import ItemsList from "./itemsList";
import Search from "./common/search";
import http from "../services/httpService";
import { paginate } from "../services/pagination";
import Pagination from "./common/pagination";
import AdminBookCard from "./adminBookCard";
import FormModal from "./formModal";

class AdminPage extends Component {
  state = {
    books: [],
    genres: [],
    search: "",
    currentPage: 1,
    pageSize: 3,
    modalBookOpen: false,
  };

  componentDidMount() {
    this.getData();
  }

  async getData() {
    const genres = await http.get("genres");
    var books = await http.get("books");
    books = Object.values(books);
    books.forEach((book) => {
      book.genreName = genres[book.genreId].name;
    });
    this.setState({
      genres: Object.values(genres),
      books,
    });
  }

  handleSearch = (query) => {
    this.setState({ search: query, selectedGenre: "allGenres" });
    console.log(this.state.search);
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSave = (book) => {
    const books = [...this.state.books];
    const index = books.indexOf(book);
    books[index] = { ...book };
    this.setState({ books, modalBookOpen: false });
    const bookToSave = { ...book };
    delete bookToSave.genreName;
    http.post("books", book.id, bookToSave);
  };

  handleDelete = (book) => {
    const books = [...this.state.books];
    const index = books.indexOf(book);
    books.splice(index, 1);
    this.setState({ books });
    http.deleteNode("books", book.id);
  };

  getPageData = () => {
    const { search, books, currentPage, pageSize } = this.state;

    let filtered = books;
    if (search) {
      filtered = books.filter((b) =>
        b.name.toLowerCase().startsWith(search.toLowerCase())
      );
    } else {
      filtered = books;
    }

    const allBooks = paginate(filtered, currentPage, pageSize);

    return { totalCount: filtered.length, allBooks };
  };

  createNewBookForm = () => {
    return (
      <AdminBookCard genres={this.state.genres} onSave={this.handleSave} />
    );
  };

  render() {
    const { search, currentPage, pageSize, genres, modalBookOpen } = this.state;
    const { totalCount, allBooks } = this.getPageData();

    return (
      <div>
        <div className="container col-9">
          <FormModal
            modalOpen={modalBookOpen}
            content={this.createNewBookForm()}
            title="New Book"
            buttonText="New Book"
          />

          <Search value={search} onChange={this.handleSearch} />

          {allBooks.map((book) => (
            <AdminBookCard
              book={book}
              genres={genres}
              key={book.id}
              onSave={this.handleSave}
              onDelete={this.handleDelete}
            />
          ))}

          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default AdminPage;
