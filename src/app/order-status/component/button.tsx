/* eslint-disable react/prop-types */
import './button.css';

interface ButtonProps {
    children : any,
    onClick : () => void;
}

export const Button = ({ children, onClick } : ButtonProps) => {
    return (
        <button className="btn" onClick={onClick}>
            {children}
        </button>
    );
}