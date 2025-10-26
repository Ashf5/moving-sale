
import './wideButton.css'

const WideButton: React.FC<{text:string, handler?:(event: React.MouseEvent<HTMLButtonElement>) => void, classes?: string[]}> = ({text, handler, classes}) => {
    let additionalClasses = ' '
    if (classes) {
        additionalClasses = additionalClasses + classes.join(' ')
    }
    return <button className={"wide-button" + additionalClasses} onClick={handler} >{text}</button>
}

export default WideButton;