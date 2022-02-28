import { mailService } from '../services/mail.service.js';
import { eventBusService } from '../../../../services/event-bus.service.js';

export class MailFilter extends React.Component {
  state = {
    filterBy: {
      word: '',
      type: 'all',
    },
  };

  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.value;
    this.setState(
      (prevState) => ({ filterBy: { ...prevState.filterBy, [field]: value } }),
      () => {
        this.filter();
        eventBusService.emit('set-folder', {});
      }
    );
  };

  filter = () => {
    if (ev) ev.preventDefault();
    mailService.setFilter(this.state.filterBy);
  };

  render() {
    const { word, type } = this.state.filterBy;

    return (
      <form className='mail-filter' onSubmit={(event) => this.filter(ev)}>
        <label htmlFor='by-word'>
          <i class='fas fa-search'></i>
          <input
            name='word'
            id='by-word'
            type='text'
            placeholder='Search'
            value={word}
            onChange={this.handleChange}
          />
        </label>
        <select name='type' onChange={this.handleChange}>
          <option value='all'>All</option>
          <option value='read'>Read</option>
          <option value='unread'>Unread</option>
        </select>
      </form>
    );
  }
}
