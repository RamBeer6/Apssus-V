import { mailService } from '../services/mail.service.js';

const { withRouter } = ReactRouterDOM;

export class _MailDetails extends React.Component {
  state = {
    mail: null,
  };

  componentDidMount() {
    console.log('props of details', this.props);
    this.loadMail();
  }

  loadMail = () => {
    const { mailId } = this.props;
    mailService.getMailById(mailId).then((mail) => this.setState({ mail }));
  };

  goBack = () => {
    this.props.history.push('/mail');
  };

  render() {
    const { mail } = this.state;

    if (!mail) return <React.Fragment></React.Fragment>;

    return (
      <section className='mail-details'>
        <div className='mail-details-btn'>
          <button onClick={this.goBack}>back</button>
          <button>reply</button>
          <button>delete</button>
        </div>
        <div className='mail-details-content'>
          <p>from: {mail.from}</p>
          <p>to: {mail.to}</p>
          <p>Subjetc: {mail.subject} </p>
          <p>{mail.body} </p>
        </div>
      </section>
    );
  }
}

export const MailDetails = withRouter(_MailDetails);
