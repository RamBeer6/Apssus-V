import { NoteDetails } from "./note-details.jsx";

export class AddNote extends React.Component {
    state = {
        color: "#ffffff",
    };

    modalRef = React.createRef();

    handleWindowClick = (event) => {
        if (this.modalRef.current && event.target === this.modalRef.current) {
            if (this.modalRef.current) this.modalRef.current.style.display = "none";
        }
    };

    // handleChange = ({ target: { name, value } }) => {
    //     this.setState({ [name]: value })
    // }

    handleColorChange = (color) => {
        this.setState({ color });
    };

    handleSubmit = (noteInfo) => {
        const { color } = this.state;
        this.props.onAddNote({ ...noteInfo, color }, () =>
            this.setState({ color: "#ffffff" })
        );
    };

    render() {
        return (
            <section className="add-note">
                <button
                    onClick={() => (this.modalRef.current.style.display = "block")}
                    className="main-button"
                    style={{ width: "100px" }}
                >
                    Add Note
                </button>
                <div
                    id="myModal"
                    className="modal"
                    ref={this.modalRef}
                    onMouseDown={this.handleWindowClick}
                >
                    <div
                        className="modal-content"
                        style={{ backgroundColor: this.state.color }}
                    >
                        <NoteDetails
                            isNew={true}
                            handleSubmit={(noteInfo) => {
                                this.handleSubmit(noteInfo);
                                this.modalRef.current.style.display = "none";
                            }}
                            handleColorChange={this.handleColorChange}
                        />
                    </div>
                </div>
            </section>
        );
    }
}
