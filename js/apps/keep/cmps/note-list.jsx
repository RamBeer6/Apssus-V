import { NotePreview } from "./note-preview.jsx";

export const NoteList = ({ notes, pinnedNotes, onRemoveNote, onDuplicateNote, onPinUnpinNote, sendNoteAsEmail }) => {
    return (
        <section className="note-list">
            <h2>Pinned Notes</h2>
            <div className="pinned-notes">
                {pinnedNotes.map(note => <NotePreview key={note.id} note={note} onRemoveNote={onRemoveNote} onDuplicateNote={onDuplicateNote} onPinUnpinNote={onPinUnpinNote} sendNoteAsEmail={sendNoteAsEmail} />)}
            </div>
            <h2>Other Notes</h2>
            <div className="other-notes">
                {notes.map(note => <NotePreview key={note.id} note={note} onRemoveNote={onRemoveNote} onDuplicateNote={onDuplicateNote} onPinUnpinNote={onPinUnpinNote} sendNoteAsEmail={sendNoteAsEmail} />)}
            </div>
        </section>
    )
}