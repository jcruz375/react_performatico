import { memo } from 'react';

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    title: string;
  };
  onAddToWishlist: (id: number) => void;
};

function ProductItemComponent({ product, onAddToWishlist }: ProductItemProps) {
  console.log('puta merdfa caralho');
  return (
    <div>
      {product.title} -- <strong>{product.price}</strong>
      <button onClick={()=>{onAddToWishlist(product.id)}}>Add to Wishlist</button>
    </div>
  );
};

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.product, nextProps.product);
});