/* eslint-disable react/prop-types */

import './input.css'

interface InputProps {
    label : any,
    type: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ label , type = 'text', ...rest } : InputProps) => {
    return (
        <div className="form-group space-y-2 font-bold">
            <label>{label}</label>
            <input type={type} {...rest} />
        </div>
    );
}