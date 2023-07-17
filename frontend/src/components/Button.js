function Button({color, size}) {
    function handleClick(event) {
        const collection = document.getElementsByClassName('check')
        for(let elem of collection) {
            elem.classList.toggle('check')
        }
        const elem = event.target
        if(!elem.classList.contains('check')) {
            elem.classList.add('check')
        } else {
            elem.classList.remove('check')
        }
        
    }

    function handleClickSize(event) {
        const elem = event.target
        const collection = document.getElementsByClassName('border')
        for(let elem of collection) {
            elem.classList.toggle('border')
        }
        if(!elem.classList.contains('border')) {
            elem.classList.add('border')
        } else {
            elem.classList.remove('border')
        }
    }

    if(color) {
        return (
            <>
                <button value={color} type="button" className={`${color} button`} onClick={(event) => handleClick(event)}></button>
            </>
        )
    } else {
       return (
        <>
            <button value={size} type="button" className={`size button`} onClick={(event) => handleClickSize(event)}>{size}</button>
        </>
       )
    }
}

export default Button;