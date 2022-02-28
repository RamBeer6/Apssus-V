const { Route, Switch } = ReactRouterDOM;

import { MailList } from '../cmps/MailList.jsx';
import { MailNav } from '../cmps/MailNav.jsx';
import { ComposeMail } from './ComposeMail.jsx';
import { MailFilter } from '../cmps/MailFilter.jsx';
import { MailDetails } from './MailDetails.jsx';
import { AppHeader } from '../../../cmps/AppHeader.jsx';

export class MailMain extends React.Component {
  state = {
    isComposeModalShown: false,
  };

  onToggleComposeModal = () => {
    console.log('state modal', this.state.isComposeModalShown);
    this.setState({ isComposeModalShown: !this.state.isComposeModalShown });
  };

  expandMail = (mailId) => {
    this.props.history.push(this.props.location.pathname + '/' + mailId);
  };

  replyMail = (mailId) => {
    this.expandMail(mailId);
    this.setState({ isComposeModalShown: true });
  };

  render() {
    const { mailId } = this.props.match.params;

    return (
      <div>
        <AppHeader />
        <section className='mail-main'>
          <MailFilter />
          <MailNav onToggleComposeModal={this.onToggleComposeModal} />
          {this.state.isComposeModalShown && (
            <ComposeMail onToggleComposeModal={this.onToggleComposeModal} />
          )}

          {!mailId ? (
            <MailList
              onToggleComposeModal={this.onToggleComposeModal}
              expandMail={this.expandMail}
              replyMail={this.replyMail}
            />
          ) : (
            <MailDetails mailId={mailId} />
          )}
        </section>
      </div>
    );
  }
}
