function SnippetQuantity({ number, setNumber}) {
    return (
        <div className='snippet'>
            <button
            onClick={() => {
                let val = ++number
                setNumber(val)
            }}
            >+</button>
            <input 
            value={number} 
            type="text"
            onChange={(event) => {setNumber(event.target.value)}}
            />
            <button
            onClick={() => {
                if(number > 1) {
                    let val = --number
                    setNumber(val)
                }
            }}
            >-</button>
        </div>
    );
}

export default SnippetQuantity;