import { NoteService } from "../services/note.service.js"
import { ActionBar } from "./action-bar.jsx"
import { NoteDynamicPreview } from "./note-dynamic-preview.jsx"

export class NotePreview extends React.Component {
    state = {
        note: null,
        noteStyle: {}
    }

    componentDidMount() {
        const note = this.props.note
        this.setState({ note })
    }

    handleColorChange = (color) => {
        const note = this.state.note
        NoteService.changeColor(note.id, color).then(this.setState({ note }))
    }

    handleEdit = (infoNote) => {
        this.setState({ note: { ...this.state.note, info: infoNote } })
    }

    onMarkUnmarkTodo = (todoId) => {
        const { note } = this.state
        NoteService.markUnmark(note, todoId).then((note) => this.setState({ note }))
    }

    render() {
        const { note } = this.state
        if (!note) return <div>Loading...</div>
        return (
            <article className="note-preview" style={{ backgroundColor: note.backgroundColor }}>
                <NoteDynamicPreview
                    note={note}
                    onMarkUnmarkTodo={this.onMarkUnmarkTodo}
                />
                <ActionBar
                    note={note}
                    handleEdit={this.handleEdit}
                    handleColorChange={this.handleColorChange}
                    onRemoveNote={this.props.onRemoveNote}
                    onDuplicateNote={this.props.onDuplicateNote}
                    onPinUnpinNote={this.props.onPinUnpinNote}
                    sendNoteAsEmail={this.props.sendNoteAsEmail} />
            </article>
        )
    }
}