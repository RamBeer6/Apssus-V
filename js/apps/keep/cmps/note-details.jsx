import { NoteService } from "../services/note.service.js";
import { Palette } from "./palette.jsx";

export class NoteDetails extends React.Component {
    state = {
        img: null,
        video: null,
        title: null,
        txt: null,
        todos: [],
        newTodoValue: "",
    };

    imageRef = React.createRef();
    videoRef = React.createRef();
    newTodoRef = React.createRef();

    componentDidMount() {
        if (!this.props.isNew) {
            this.loadNote();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.isNew) return;
        if (prevProps.note !== this.props.note) {
            this.loadNote();
            return;
        }
        const todosProps = prevProps.note.info.todos;
        if (todosProps.length !== prevState.todos.length) {
            this.setState({ todos: [...todosProps] });
        }
    }

    loadNote = () => {
        if (this.props.note) this.setState({ ...this.props.note.info });
    };

    handleChange = ({ target: { name, value } }) => {
        if (name === "video") {
            const videoId = NoteService.getId(value);
            if (!videoId) return;
            const embedVideo = "//www.youtube.com/embed/" + videoId;
            this.imageRef.current.value = "";
            this.setState({ video: embedVideo, img: null });
            return;
        }
        this.setState({ [name]: value });
    };

    handleChangeFile = () => {
        const reader = new FileReader();
        reader.readAsDataURL(this.imageRef.current.files[0]);
        reader.onloadend = () => {
            this.videoRef.current.value = "";
            this.setState({ img: reader.result, video: null });
        };
    };

    handleTodoChange = ({ target: { value } }) => {
        this.setState({ newTodo: value });
    };

    onAddTodo = () => {
        const { newTodo } = this.state;
        if (!newTodo) return;
        if (this.props.isNew) {
            NoteService.addNewNoteTodo(newTodo).then((todo) => {
                this.setState({ todos: [...this.state.todos, todo] });
            });
        } else {
            NoteService.addTodo(this.props.note.id, newTodo);
        }
        this.newTodoRef.current.value = "";
        this.setState({ newTodo: "" });
    };

    handleSubmit = () => {
        const { img, video, title, txt, todos } = this.state;
        const noteInfo = { img, video, title, txt, todos };
        this.props.handleSubmit(noteInfo);
        this.setState({
            img: null,
            video: null,
            title: null,
            txt: null,
            todos: [],
            newTodoValue: "",
        });
    };

    handleRemoveTodo = (todoId) => {
        const { todos } = this.state;
        const newTodos = todos.filter((t) => t.id !== todoId);
        NoteService.removeTodo(this.props.note.id, todoId).then(() => {
            this.setState({ todos: newTodos });
        });
    };

    render() {
        const { img, video, title, txt, todos } = this.state;
        return (
            <div className="note-details-container">
                <div className="note-details-img-container">
                    {img && <img src={img} />}
                </div>
                <div className="note-details-img-icon">
                    <span>Upload Image</span>{" "}
                    <button
                        className="icon-button"
                        onClick={() => this.imageRef.current.click()}
                    >
                        <i className="fas fa-upload"></i>
                    </button>
                </div>
                <input
                    type="file"
                    className="note-details-img-input"
                    id="edit-image"
                    ref={this.imageRef}
                    onChange={this.handleChangeFile}
                />

                <input
                    type="text"
                    ref={this.videoRef}
                    name="video"
                    placeholder="Youtube Url"
                    onChange={this.handleChange}
                />
                {video && <iframe src={video} width="100%" height="200" />}

                <input
                    type="text"
                    name="title"
                    placeholder="Note Title"
                    onChange={this.handleChange}
                    value={title || ""}
                />
                <textarea
                    name="txt"
                    placeholder="Note Content"
                    onChange={this.handleChange}
                    value={txt || ""}
                />
                {todos.map((todo) => (
                    <div key={todo.id} className="note-details-todo-container">
                        <div>{todo.txt}</div>
                        <button
                            className="icon-button"
                            onClick={() => this.handleRemoveTodo(todo.id)}
                        >
                            <i className="far fa-times-circle"></i>
                        </button>
                    </div>
                ))}
                <div className="note-details-todo-container">
                    <input
                        ref={this.newTodoRef}
                        type="text"
                        name="todo"
                        placeholder="Add Todo"
                        onChange={this.handleTodoChange}
                    />
                    <button className="icon-button" onClick={this.onAddTodo}>
                        <i className="fas fa-plus-circle"></i>
                    </button>
                </div>

                {this.props.isNew && (
                    <Palette handleColorChange={this.props.handleColorChange} />
                )}
                <button className="main-button" onClick={this.handleSubmit}>
                    Submit
                </button>
            </div>
        );
    }
}
