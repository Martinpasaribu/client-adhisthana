/* eslint-disable react/prop-types */

interface ItemProps {
    label: string;
    value: string;
}


export const Item = ({ label, value } : ItemProps) => {
    return (
        <div className="item">
            <p className="label">{label}</p>
            <p className="value">{value}</p>
        </div>
    );
}