import { numberToRupiah } from "../../utils/number-to-rupiah";


interface ProductItemprops {
    
    name: string,
    price?: number,
    totalItem : number

}

/* eslint-disable react/prop-types */
export const ProductItem = ({ name, price, totalItem } : ProductItemprops) => {
    return (
        <div className="item-product-status">
            <div className="item-content">
                {totalItem && <p className="item">{totalItem}x</p>}
                <p className="name">{name}</p>
            </div>
            <p className="price">{numberToRupiah(price)}</p>
        </div>
    );
}