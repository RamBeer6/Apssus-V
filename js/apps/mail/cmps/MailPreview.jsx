import { InitialPreview } from './InitialPreview.jsx';
import { ExpandedPreview } from './ExpandedPreview.jsx';

export class MailPreview extends React.Component {
  state = {
    isClicked: false,
  };

  toggleMailPreview = () => {
    this.setState({ isClicked: !this.state.isClicked });
  };

  render() {
    const {
      mail,
      deleteMail,
      toggleRead,
      toggleStarred,
      expandMail,
      replyMail,
    } = this.props;
    const { isClicked, toggleMailPreview } = this.state;

    return (
      <React.Fragment>
        {!isClicked && (
          <InitialPreview
            mail={mail}
            deleteMail={deleteMail}
            toggleMailPreview={toggleMailPreview}
            toggleRead={toggleRead}
            toggleStarred={toggleStarred}
            expandMail={expandMail}
            replyMail={replyMail}
          />
        )}
        {/* {isClicked && (
          <ExpandedPreview
            mail={mail}
            deleteMail={deleteMail}
            toggleMailPreview={toggleMailPreview}
            toggleRead={toggleRead}
            toggleStarred={toggleStarred}
          />
        )} */}
      </React.Fragment>
    );
  }
}
