import { numberToRupiah } from "../../utils/number-to-rupiah";


interface ProductItemprops {
    
    name: string,
    price?: number,
    totalItem : number,
    style: string

}

/* eslint-disable react/prop-types */
export const ProductItem = ({ name, price, totalItem, style } : ProductItemprops) => {
    return (
        <div className={`${style}`}>
            <div className="item-content">
                {totalItem > 0 && <p className="item">{totalItem}x</p>}
                <p className="name">{name}</p>
            </div>
            <p className="price ">{numberToRupiah(price)}</p>
        </div>
    );
}