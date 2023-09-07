import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

function SnippetQuantity({ number, setNumber}) {
    return (
        <div className='snippet'>
            <button
                onClick={() => {
                let val = ++number
                setNumber(val)
                }}
            ><FontAwesomeIcon icon={faPlus} /></button>
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
            ><FontAwesomeIcon icon={faMinus} /></button>
        </div>
    );
}

export default SnippetQuantity;