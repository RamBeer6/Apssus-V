import { NoteService } from "../services/note.service.js";
import { NoteDetails } from "./note-details.jsx";
import { Palette } from "./palette.jsx";

export const ActionBar = ({
    handleColorChange,
    onRemoveNote,
    note,
    onDuplicateNote,
    onPinUnpinNote,
    handleEdit,
    sendNoteAsEmail,
}) => {
    const modalRef = React.createRef();

    const handleWindowClick = (event) => {
        if (modalRef.current && event.target === modalRef.current) {
            if (modalRef.current) modalRef.current.style.display = "none";
        }
    };

    const handleSubmit = (noteInfo) => {
        NoteService.editNoteContent(noteInfo, note.id).then(() => {
            handleEdit(noteInfo);
        });
    };

    return (
        <div>
            <div className="action-bar-container">
                <Palette
                    className="action-bar-item"
                    handleColorChange={handleColorChange}
                />
                <button
                    className="icon-button"
                    onClick={() => onDuplicateNote(note.id)}
                >
                    <i title="Duplicate" className="far fa-copy"></i>
                </button>
                <button className="icon-button" onClick={() => onRemoveNote(note.id)}>
                    <i title="delete" className="far fa-trash-alt"></i>
                </button>
                <button
                    className="icon-button"
                    onClick={() => (modalRef.current.style.display = "block")}
                >
                    <i title="edit" className="fas fa-pencil-alt"></i>
                </button>
                <button className="icon-button" onClick={() => sendNoteAsEmail(note)}>
                    <i title="send as email" className="fas fa-paper-plane"></i>
                </button>
                <button className="icon-button" onClick={() => onPinUnpinNote(note)}>
                    <i
                        title={note.isPinned ? "unpin" : "pin"}
                        className={`fas fa-thumbtack ${note.isPinned && "pinned"}`}
                    ></i>
                </button>
            </div>
            <div
                id="myModal"
                className="modal"
                ref={modalRef}
                onMouseDown={handleWindowClick}
            >
                <div className="modal-content">
                    <NoteDetails
                        note={note}
                        isNew={false}
                        handleSubmit={(noteInfo) => {
                            handleSubmit(noteInfo);
                            modalRef.current.style.display = "none";
                        }}
                        handleEdit={(infoNote) => {
                            handleEdit(infoNote);
                            modalRef.current.style.display = "none";
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
