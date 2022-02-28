import { mailService } from '../services/mail.service.js';
import { eventBusService } from '../../../../services/event-bus.service.js';
import { ComposeMail } from './../pages/ComposeMail.jsx';

const { Link } = ReactRouterDOM;

export class MailNav extends React.Component {
  state = {
    emails: [],
    folder: 'inbox',
  };

  removeEventBus;

  componentDidMount() {
    this.loadMails();
  }

  loadMails = () => {
    const currFolder = mailService.getFolder();
    mailService.query().then((mails) => {
      this.setState({ mails, folder: currFolder });
    });
  };
  componentWillUnmount() {
    this.removeEventBus();
  }

  onSetFolder = (ev, folder) => {
    ev.preventDefault();
    mailService.setFolder(folder);
    this.setState({ folder });
    eventBusService.emit('set-folder', {});
  };

  render() {
    const { folder } = this.state;
    return (
      <section className='folder-nav'>
        <button
          onClick={this.props.onToggleComposeModal}
          className='compose-btn'>
          Compose
        </button>
        <section className='folder-list'>
          <div
            className={`folder-mail inbox ${
              folder === 'inbox' ? 'chosen' : ''
            }`}
            onClick={(ev) => this.onSetFolder(ev, 'inbox')}>
            Inbox
          </div>

          <div
            className={`folder-mail draft ${
              folder === 'draft' ? 'chosen' : ''
            }`}
            onClick={(ev) => this.onSetFolder(ev, 'draft')}>
            Draft
          </div>

          <div
            className={`folder-mail sent ${folder === 'sent' ? 'chosen' : ''}`}
            onClick={(ev) => this.onSetFolder(ev, 'sent')}>
            Sent
          </div>

          <div
            className={`folder-mail ${folder === 'starred' ? 'chosen' : ''}`}
            onClick={(ev) => this.onSetFolder(ev, 'starred')}>
            Starred
          </div>

          <div
            className={`folder-mail trash ${
              folder === 'trash' ? 'chosen' : ''
            }`}
            onClick={(ev) => this.onSetFolder(ev, 'trash')}>
            Trash
          </div>
        </section>
      </section>
    );
  }
}
