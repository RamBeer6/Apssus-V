import { utilService } from '../../../../services/util.service.js';
import { storageService } from '../../../../services/storage.service.js';

export const mailService = {
  query,
  deleteMail,
  getFolder,
  setFolder,
  getMailsByFolder,
  getMailById,
  getDate,
  getMailBody,
  toggleRead,
  toggleStatus,
  sendMail,
  setFilter,
  setDraft,
  saveDraft,
};
const STORAGE_KEY = 'mailDB';
let gMails = _loadMailsFromStorage() || _createMails();

const email = {
  id: 'e101',
  subject: 'Miss you!',
  body: 'Would love to catch up sometimes',
  isRead: false,
  sentAt: 1551133930594,
  to: 'momo@momo.com',
};

const loggedinUser = {
  email: 'user@appsus.com',
  fullname: 'Mahatma Appsus',
};

let gFilter = {
  folder: 'inbox',
  filterBy: {
    word: '',
    type: 'all',
  },
};

function query() {
  let mailsToShow = getMailsByFolder();
  if (gFilter.filterBy) {
    const { word, type } = gFilter.filterBy;
    const filteredMails = mailsToShow.filter((mail) => {
      const subject = mail.subject.toLowerCase();
      return subject.includes(word);
    });
    if (type === 'all') return Promise.resolve(filteredMails);
    const mailsByType = filteredMails.fiter((mail) => {
      if (type === 'read') return mail.isRead;
      if (type === 'unread') return !mail.isRead;
    });
    return Promise.resolve(mailsByType);
  }
  return Promise.resolve(mailsToShow);
}

function getMailsByFolder() {
  switch (gFilter.folder) {
    case 'inbox':
      return gMails.filter(
        (mail) => !mail.isSent && !mail.isDraft && !mail.isTrash
      );
    case 'draft':
      return gMails.filter((mail) => mail.isDraft && !mail.isTrash);
    case 'sent':
      return gMails.filter((mail) => mail.isSent && !mail.isTrash);
    case 'starred':
      return gMails.filter((mail) => mail.isStarred && !mail.isTrash);
    case 'trash':
      return gMails.filter((mail) => mail.isTrash);
  }
}

function deleteMail(mailDelete) {
  if (!mailDelete.isTrash) {
    mailDelete.isTrash = true;
  } else {
    let mailIdx = gMails.findIndex((mail) => mail.id === mailDelete.id);
    gMails.splice(mailIdx, 1);
  }
  _saveMailsToStorage(gMails);
  return Promise.resolve();
}

function _createMail(
  subject,
  text,
  from,
  to,
  isRead,
  isStarred,
  isSent,
  isDraft
) {
  return {
    id: utilService.makeId(),
    subject,
    text,
    from,
    to,
    isRead,
    isStarred,
    isSent,
    isDraft,
  };
}

function _createMails() {
  const mails = [
    _createMail(
      "Eli, here's why you should watch",
      'Peaky Blinders on Netflix',
      'Netflix',
      false,
      false,
      false,
      false
    ),
    _createMail(
      'say YES to a discount',
      'in WizAir',
      'WizAir',
      false,
      false,
      false,
      false
    ),
    _createMail(
      'We welcome you to join us',
      'at Car R Us',
      'Netflix',
      false,
      false,
      false,
      false
    ),
  ];
  _saveMailsToStorage(mails);
  return mails;
}

function _saveMailsToStorage(mails) {
  storageService.saveToStorage(STORAGE_KEY, mails);
}

function _loadMailsFromStorage() {
  return storageService.loadFromStorage(STORAGE_KEY);
}

function setFolder(folder) {
  return (gFilter.folder = folder);
}

function getFolder(folder) {
  return gFilter.folder;
}

function getDate(date) {
  const newDate = new Date(date);
  const dates = newDate.toDateString().split('');
  return dates[1] + ' ' + dates[2];
}

function getMailBody(text) {
  const txt = text.split('\n');
  return txt;
}

function getMailById(mailId) {
  return Promise.resolve(gMails.find((mail) => mail.id === mailId));
}

function setDraft() {
  if (!gDraft) return;
  gMails.unshift(gDraft);
  _saveMailsToStorage(gMails);
  return Promise.resolve();
}

function saveDraft(mail) {
  gDraft = _createMail(
    mail.subject,
    mail.text,
    mail.to,
    loggedinUser,
    true,
    false,
    false,
    true
  );
  console.log('gDraft', gDraft);
  _saveMailsToStorage(gMails.push(gDraft));
  return gDraft;
}

function setFilter(filterBy) {
  gFilter.filterBy = filterBy;
}

function toggleRead(mailId, isRead) {
  const mail = getMailById(mailId).then((mail) => {
    mail.isRead = isRead;
  });
  _saveMailsToStorage(gMails);
}

function toggleStatus(mailId, field) {
  const mail = gMails.find((mail) => mail.id === mailId);
  const value = mail[field] === true ? false : true;
  mail[field] = value;
  _saveMailsToStorage(gMails);
  return Promise.resolve(mail);
}

function sendMail(mail) {
  const from = loggedinUser.email;
  const newMail = _createMail(mail.subject, mail.to, mail.text);
  newMail.isSent = true;
  gMails.unshift(newMail);
  _saveMailsToStorage(gMails);
  return Promise.resolve();
}
