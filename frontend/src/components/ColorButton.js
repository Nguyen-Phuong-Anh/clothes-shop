function ColorButton({color, size}) {
    return (
        <>
            <button className={`${color} color_button`}>{size}</button>
        </>
    );
}

export default ColorButton;