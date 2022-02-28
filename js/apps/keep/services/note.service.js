import { utilService } from '../../../../services/util.service.js';
import { storageService } from '../../../../services/storage.service.js';

let gNotes;
let gPinnedNotes;
const createNotes = () => {
  let notes = storageService.loadFromStorage('NotesDB');
  if (!notes || !notes.length) {
    notes = [
      {
        id: 'n100',
        isPinned: true,
        info: {
          img: 'https://www.acouplecooks.com/wp-content/uploads/2020/09/Latte-Art-066s.jpg',
          video: null,
          title: 'The Best Thing In The World - Coffe',
          txt: null,
          todos: [],
        },
        backgroundColor: 'blue',
      },
      {
        id: 'n101',
        info: {
          img: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/eb194a93783231.5e6dba9b4f914.gif',
          video: null,
          title: "I'm Still Standing!!",
          txt: 'Yeah! Yeah! Yeah!',
          todos: [],
        },
        backgroundColor: 'pink',
      },
      {
        id: 'n102',
        info: {
          img: 'https://assets.community.lomography.com/91/cc109732c3fdb70bc0bdbfb0389b5cb374c280/1216x1820x2.jpg?auth=0f22f374ded074d34afb4de990f0bb6968036b1b',
          video: null,
          title: 'Garden',
          txt: 'Take care of the garden',
          todos: [],
        },
        backgroundColor: 'brown',
      },
      {
        id: 'n103',
        info: {
          img: 'https://c.tenor.com/2gIgsZHqfqIAAAAi/milk-and-mocha-cute.gif',
          video: null,
          title: 'Hug???',
          txt: 'Give Me Some Love 😍',
          todos: [],
        },
        backgroundColor: 'yellow',
      },
      {
        id: 'n104',
        info: {
          img: null,
          video: 'https://www.youtube.com/watch?v=astISOttCQ0',
          title: 'Watch This Bear ! ',
          txt: 'He got some move!',
          todos: [],
        },
        backgroundColor: 'brown',
      },
      {
        id: 'n105',
        info: {
          img: 'https://i.gifer.com/OnFv.gif',
          video: null,
          title: 'To Do:',
          txt: null,
          todos: [
            {
              id: utilService.makeId(),
              txt: 'Homeworks',
              doneAt: Date.now(),
            },
            { id: utilService.makeId(), txt: 'Dishes', doneAt: null },
          ],
        },
        backgroundColor: 'red',
      },
    ];
  }
  gNotes = notes.filter((note) => !note.isPinned);
  saveNotesToStorage();
  let pinnedNotes = storageService.loadFromStorage('PinnedNotesDB');
  if (!pinnedNotes || !pinnedNotes.length) {
    gPinnedNotes = notes.filter((note) => note.isPinned);
    savePinnedNotesToStorage();
  }
};

const getPinnedNotes = () => {
  let pinnedNotes = storageService.loadFromStorage('PinnedNotesDB');
  if (!pinnedNotes || !pinnedNotes.length) {
    pinnedNotes = [];
    const pinnedNotesIds = gNotes
      .filter((note) => note.isPinned)
      .map((note) => note.id);
    pinnedNotesIds.forEach((id) => {
      const idx = gNotes.findIndex((note) => note.id === id);
      const currNote = gNotes[idx];
      pinnedNotes.push(currNote);
      gNotes.splice(idx, 1);
    });
  }
  gPinnedNotes = pinnedNotes;
  savePinnedNotesToStorage();
  return Promise.resolve(gPinnedNotes);
};

const query = (filterBy) => {
  if (!filterBy) return Promise.resolve(gNotes);
  if (filterBy.type) {
    const notesToShow = gNotes.filter((note) => {
      if (filterBy.type === 'todos') return note.info.todos.length;
      return note.info[filterBy.type];
    });

    return Promise.resolve(notesToShow);
  } else if (filterBy.txt) {
    const searchStr = filterBy.txt;
    const notesToShow = gNotes.filter((note) => {
      if (note.info.txt) return note.info.txt.toLowerCase().includes(searchStr);
      if (note.info.title)
        return note.info.title.toLowerCase().includes(searchStr);
      if (note.info.todos)
        return note.info.todos.some((todo) => todo.includes(searchStr));
    });
    return Promise.resolve(notesToShow);
  }
  return Promise.resolve(gNotes);
};

const markUnmark = (note, todoId) => {
  if (!note) return;
  let currNote;
  let todo;
  let idx = gNotes.findIndex((n) => note.id === n.id);
  if (idx >= 0) {
    currNote = gNotes[idx];
    todo = currNote.info.todos.find((todo) => todo.id === todoId);
  } else {
    idx = gPinnedNotes.findIndex((n) => note.id === n.id);
    currNote = gPinnedNotes[idx];
    todo = currNote.info.todos.find((todo) => todo.id === todoId);
  }
  if (todo.doneAt) {
    todo.doneAt = null;
  } else {
    todo.doneAt = Date.now();
  }
  saveNotesToStorage();
  savePinnedNotesToStorage();
  return Promise.resolve(currNote);
};

const addNote = (noteInfo) => {
  if (noteInfo) {
    // noteInfo = {
    //   img: null,
    //   video: null,
    //   title: mail.subject,
    //   txt: mail.body,
    //   color: '#ffffff',
    // };
  }
  const newNote = {
    id: utilService.makeId(),
    isPinned: false,
    info: {
      img: noteInfo.img,
      video: noteInfo.video,
      title: noteInfo.title,
      txt: noteInfo.txt,
      todos: [...(noteInfo.todos || [])],
    },
    backgroundColor: noteInfo.color,
  };
  gNotes.unshift(newNote);
  console.log(gNotes,'gNotes:');
  saveNotesToStorage();
  return Promise.resolve();
};

const editNoteContent = (noteInfo, id) => {
  let note = gNotes.find((n) => n.id === id);
  if (!note) note = gPinnedNotes.find((n) => n.id === id);
  note.info = noteInfo;
  saveNotesToStorage();
  savePinnedNotesToStorage();
  return Promise.resolve();
};

const removeNote = (noteId) => {
  let idx = gNotes.findIndex((note) => note.id === noteId);
  if (idx >= 0) {
    gNotes.splice(idx, 1);
    saveNotesToStorage();
    return Promise.resolve(gNotes);
  } else {
    idx = gPinnedNotes.findIndex((note) => note.id === noteId);
    gPinnedNotes.splice(idx, 1);
    savePinnedNotesToStorage();
    return Promise.resolve(gPinnedNotes);
  }
};

const changeColor = (noteId, color) => {
  const note =
    gNotes.find((note) => note.id === noteId) ||
    gPinnedNotes.find((note) => note.id === noteId);
  note.backgroundColor = color;
  saveNotesToStorage();
  savePinnedNotesToStorage();
  return Promise.resolve();
};

const duplicateNote = (noteId) => {
  let note;
  let idx = gNotes.findIndex((note) => note.id === noteId);
  if (idx < 0) {
    idx = gPinnedNotes.findIndex((note) => note.id === noteId);
    note = gPinnedNotes[idx];
    const endOfArr = gPinnedNotes.splice(idx);
    gPinnedNotes.push({ ...note, id: utilService.makeId() });
    gPinnedNotes = [...gPinnedNotes, ...endOfArr];
    savePinnedNotesToStorage();
  } else {
    note = gNotes[idx];
    const endOfArr = gNotes.splice(idx);
    gNotes.push({ ...note, id: utilService.makeId() });
    gNotes = [...gNotes, ...endOfArr];
    saveNotesToStorage();
  }
  return Promise.resolve();
};

const pinUnpinNote = (note) => {
  if (note.isPinned) {
    const idx = gPinnedNotes.findIndex((n) => n.id === note.id);
    const currNote = gPinnedNotes[idx];
    currNote.isPinned = false;
    gPinnedNotes.splice(idx, 1);
    gNotes.unshift(currNote);
  } else {
    const idx = gNotes.findIndex((n) => n.id === note.id);
    const currNote = gNotes[idx];
    currNote.isPinned = true;
    gNotes.splice(idx, 1);
    gPinnedNotes.unshift(currNote);
  }
  saveNotesToStorage();
  savePinnedNotesToStorage();
  return Promise.resolve();
};

const getNoteById = (noteId) => {
  let note = gNotes.find((note) => note.id === noteId);
  if (note) return Promise.resolve(note);
  else {
    note = gPinnedNotes.find((note) => note.id === noteId);
    return Promise.resolve(note);
  }
};

const getId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
};

const addTodo = (noteId, todo) => {
  let note = gNotes.find((note) => note.id === noteId);
  if (!note) note = gPinnedNotes.find((note) => note.id === noteId);
  note.info.todos.push({ id: utilService.makeId(), txt: todo, doneAt: null });
  saveNotesToStorage();
  savePinnedNotesToStorage();
  return Promise.resolve();
};

const addNewNoteTodo = (todo) =>
  Promise.resolve({ id: utilService.makeId(), txt: todo, doneAt: null });

const removeTodo = (noteId, todoId) => {
  let note = gNotes.find((note) => note.id === noteId);
  if (!note) note = gPinnedNotes.find((note) => note.id === noteId);
  const idx = note.info.todos.findIndex((t) => t.id !== todoId);
  note.info.todos.splice(idx, 1);
  saveNotesToStorage();
  savePinnedNotesToStorage();
  return Promise.resolve();
};

const saveNotesToStorage = () => {
  storageService.saveToStorage('NotesDB', gNotes);
};

const savePinnedNotesToStorage = () => {
  storageService.saveToStorage('PinnedNotesDB', gPinnedNotes);
};

export const NoteService = {
  query,
  editNoteContent,
  removeNote,
  changeColor,
  duplicateNote,
  getPinnedNotes,
  pinUnpinNote,
  markUnmark,
  addNote,
  getNoteById,
  getId,
  addTodo,
  addNewNoteTodo,
  removeTodo,
  createNotes,
};
