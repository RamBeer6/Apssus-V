import { bookService } from '../services/book.service.js';
import { StarRating } from './StarRating.jsx';

export class ReviewAdd extends React.Component {
  state = {
    review: {
      fullName: 'Books Reader',
      rating: 0,
      date: new Date().toISOString().slice(0, 10),
      txt: '',
    },
  };

  inputRef = React.createRef();

  componentDidMount() {
    this.inputRef.current.focus();
  }

  onSaveReview = (ev) => {
    ev.preventDefault();
    const { review } = this.state;
    const { bookId } = this.props;
    bookService.saveReview(bookId, review).then(this.props.loadBook);
    this.props.onToggleReviewModal();
  };

  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.value;
    this.setState((prevState) => ({
      review: { ...prevState.review, [field]: value },
    }));
  };

  render() {
    const { fullName, date, txt, rating } = this.state.review;

    return (
      <section className="review-add">
        <div className="review-modal">
          <h1>Add review</h1>
          <button
            className="btn-toggle-modal"
            onClick={() => this.props.onToggleReviewModal()}
          >
            ×
          </button>
          <form onSubmit={this.onSaveReview} className="review-form">
            <label htmlFor="by-fullname">Full name:</label>
            <input
              ref={this.inputRef}
              placeholder="Enter full name"
              name="fullName"
              type="text"
              id="by-fullname"
              value={fullName}
              onChange={this.handleChange}
              autoComplete="off"
            />
            <StarRating handleChange={this.handleChange} rating={rating} />
            <label htmlFor="by-date">Date:</label>
            <input
              type="date"
              id="by-date"
              name="date"
              value={date}
              onChange={this.handleChange}
            />
            <textarea
              name="txt"
              cols="30"
              rows="10"
              value={txt}
              onChange={this.handleChange}
            ></textarea>
            <button>Add review</button>
          </form>
        </div>
      </section>
    );
  }
}
