import { ProductItem } from "./ProductItem";

interface SearchResultProps {
  totalPrice: number;
  results: Array<{
    id: number,
    price: number
    priceFormatted: string,
    title: string
  }>;
  onAddToWishlist: (id: number) => void;
};

export function SearchResult({ totalPrice, results, onAddToWishlist }: SearchResultProps) {
  console.log(results);
  return (
    <div>
      <h2>{totalPrice}</h2>
      {results.map(product => {
        return (
          <ProductItem
            key={product.id}
            product={product}
            onAddToWishlist={onAddToWishlist}
          />
        )
      })}
    </div>
  );
}