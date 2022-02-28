import { mailService } from '../services/mail.service.js';
import { MailNav } from '../cmps/MailNav.jsx';

export class ComposeMail extends React.Component {
  state = {
    mail: {
      subject: '',
      to: '',
      text: '',
    },
  };

  sendMail = (ev) => {
    ev.preventDefault();
    mailService.sendMail(this.state.mail).then(() => {
      this.setState({ mail: { subject: '', to: '', cc: '', text: '' } });
      this.props.onToggleComposeModal();
    });
  };

  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.value;
    this.setState((prevState) => ({
      mail: { ...prevState.mail, [field]: value },
    }));
  };

  goBack = () => {
    this.saveDraft();
    this.props.history.push('/mail');
  };

  saveDraft = () => {
    console.log('saveDraft');
    mailService.saveDraft(this.state.mail);
  };

  render() {
    const { subject, to, cc, text } = this.state.mail;
    console.log('render in compose mail');
    return (
      <section className='compose-mail'>
        <div
          className={`composing ${this.state.isOpen ? 'open' : ''}`}
          onClick={this.goBack}></div>
        <section className='compose-container'>
          <form onSubmit={this.sendMail}>
            <div className='compose-header'>
              New:
              <button onClick={this.goBack} className='back-mail-btn'>
                <i className='fas fa-times'></i>
              </button>
            </div>
            <label htmlFor='by-subject' className='label-subject'></label>
            <input
              type='text'
              placeholder='subject'
              name='subject'
              id='by-subject'
              onChange={this.handleChange}
              placeholder='Subject'
            />
            <label htmlFor='by-to' className='label-to'></label>
            <input
              type='text'
              id='by-to'
              name='to'
              onChange={this.handleChange}
              placeholder='To'
            />

            <label htmlFor='by-text' className='labelbody'></label>
            <textarea
              name='text'
              id='by-txt'
              cols='30'
              rows='10'
              value={text}
              onChange={this.handleChange}
              placeholder='Body'
            />

            <button className='send-mail-btn'>
              <i className='fas fa-paper-plane'></i>
            </button>
          </form>
        </section>
      </section>
    );
  }
}
