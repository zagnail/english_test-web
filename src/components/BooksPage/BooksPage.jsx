import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/book';
import Pagination from 'react-bootstrap/lib/Pagination';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';

const propTypes = {
  fetchBooks: PropTypes.func,
  books: PropTypes.object
};

class BooksPage extends Component {
  constructor(props) {
    super(props);

    console.log(props);

    this.state = {
      activePage: 1
    };
  }

  componentWillMount() {
    this.props.fetchBooks(this.state.activePage);

    this.token = localStorage.getItem('token');
  }

  handleSelect(eventKey) {
    this.setState({
      activePage: eventKey
    });
  }

  renderBooks() {
    const books = this.props.books;

    if (books) {
      console.log('books', books.books);

      return books.books.map((book, i) => {
        return <ListGroupItem key={i}>{ book.name }</ListGroupItem>;
      });
    }

    return <ListGroupItem key={1}>ничего нету</ListGroupItem>;
  }

  render() {
    const count = this.props.books ? this.props.books.pageCount : 1;

    return (
      <div>
        <div>
          <h1>Books</h1>

          <ListGroup>
            { this.renderBooks() }
          </ListGroup>
        </div>

        <Pagination
          bsSize='medium' items={count}
          activePage={this.state.activePage}
          onSelect={this.handleSelect}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { books: state.book.list };
}

BooksPage.propTypes = propTypes;

export default connect(mapStateToProps, actions)(BooksPage);
