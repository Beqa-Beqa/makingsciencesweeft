import { CSSProperties } from 'react';
import './button.css';

const Button = (props: {
    text: string,
    action: () => void,
    styles?: CSSProperties,
    isActive?: boolean
}) => {
    return (
        <button 
            style={props.styles}
            type='button'
            onClick={props.action}
            className={`styled-button ${props.isActive && 'active'}`}
        >
            {props.text}
        </button>
    );
}
 
export default Button;