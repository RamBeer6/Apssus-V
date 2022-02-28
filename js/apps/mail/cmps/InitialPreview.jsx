import { mailService } from '../services/mail.service.js';
import { LongTxt } from './LongTxt.jsx';
import { MailDetails } from '../pages/MailDetails.jsx';

export class InitialPreview extends React.Component {
  state = {
    isHover: false,
    isExpand: false,
  };

  render() {
    const { isHover, txtLength, isExpand } = this.state;
    const {
      mail,
      deleteMail,
      toggleMailPreview,
      toggleRead,
      toggleStarred,
      expandMail,
      replyMail,
    } = this.props;

    return (
      <section
        className={`mail-init-preview ${!mail.isRead ? 'read' : ''}`}
        onClick={(ev) => {
          toggleRead(ev, mail, true);
        }}
        onMouseEnter={() => this.setState({ isHover: true })}
        onMouseLeave={() => this.setState({ isHover: false })}>
        <div className='mail-preview-left'>
          <button
            onClick={() => toggleStarred(mail.id, 'isStarred')}
            className='star-btn'>
            <i
              className={`star ${!mail.isStarred ? ' far ' : ' fas '
                } fa-star`}></i>
          </button>

          <p className='from'>{mail.from}</p>

          <div className='mail-info'>
            <p>{mail.subject}</p>
            <p>
              <LongTxt txt={mail.text} txtLength={txtLength} />
            </p>
          </div>
        </div>
        <div className='mail-preview-right'>
          {!isHover && (
            <h1 className='date-in-preview'>
              {/* {mailService.getDate(1641077634125)} */}
              31 Dec
            </h1>
          )}
          {isHover && (
            <div className='buttons'>
              <button
                className='read-btn'
                onClick={(ev) => toggleRead(ev, mail, !mail.isRead)}>
                <i
                  className={`far fa-envelope ${mail.isRead ? '-open' : ''
                    }`}></i>
              </button>
              <button
                className='delete-btn'
                onClick={(ev) => deleteMail(ev, mail)}>
                <i className='far fa-trash-alt'></i>
              </button>
              <button
                onClick={() => {
                  this.setState({ isExpand: !this.state.isExpand });
                }}>
                <i className='fas fa-expand-alt'></i>
              </button>
              <button
                onClick={() => {
                  expandMail(mail.id);
                }}>
                <i className='fas fa-expand'></i>
              </button>
              <button onClick={() => replyMail(mail.id)}>
                <i className='fas fa-reply'></i>
              </button>
            </div>
          )}
        </div>

        {isExpand && <MailDetails mailId={mail.id} />}
      </section>
    );
  }
}
