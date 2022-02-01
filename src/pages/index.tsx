import { FormEvent, useCallback, useState } from "react";
import { SearchResult } from '../components/SearchResults';

type Results = {
  totalPrice: number
  products: any[]
}

export default function Home() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<Results>({
    totalPrice: 0,
    products: [],
  });

  const addToWishList = useCallback(async (id:number) => {
    console.log(id);
  },[])

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (!search.trim()) {
      return;
    };

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();

    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    const products = data.map((product: any) => {
      return { 
        id: product.id,
        title: product.title,
        price: product.price,
        priceFormatted: formatter.format(product.price),
      };
    });
    const totalPrice = data.reduce(({total, product}: any) => {
      return total + product.price;
    }, 0)
    setResults({totalPrice, products: data})
  }

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      <SearchResult
        totalPrice={results.totalPrice}
        results={results.products} 
        onAddToWishlist={addToWishList}
      />
    </div>
  );
}