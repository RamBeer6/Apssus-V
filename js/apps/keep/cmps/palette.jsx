const colors = [
    "#e8eaed",
    "#e6c9a8",
    "#fdcfe8",
    "#ffffff",
    "#d7aefb",
    "#aecbfa",
    "#cbf0f8",
    "#a7ffeb",
    "#ccff90",
    "#fff475",
    "#fbbc04",
    "#f28b82",
];

export const Palette = ({ handleColorChange }) => (
    <div className="palette-container ">
        <button className="icon-button">
            <div className="color-palette" id="color-palette-icon">
                <i title="change color" className="fas fa-palette"></i>
            </div>
        </button>
        <div className="palette-colors-container">
            {colors.map((color, i) => (
                <div
                    key={i}
                    id={`color-${i}`}
                    onClick={() => handleColorChange(color)}
                    style={{ backgroundColor: color }}
                ></div>
            ))}
        </div>
    </div>
);
