import React from 'react';
import { Search, Plus } from 'lucide-react';
import { Product } from '../../types';

interface ProductSearchProps {
  products: Product[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onAddToCart: (product: Product) => void;
}

const ProductSearch: React.FC<ProductSearchProps> = ({
  products,
  searchTerm,
  onSearchChange,
  onAddToCart,
}) => {
  return (
    <div className="flex h-full flex-col bg-card">
      {/* Search Bar */}
      <div className="border-b border-slate-800 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search products by name or scan barcode..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-md border border-slate-700 bg-background py-2 pl-10 pr-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Product List */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => onAddToCart(product)}
              className="group relative cursor-pointer overflow-hidden rounded-lg border border-slate-800 bg-background shadow-sm transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="p-3">
                <h3 className="truncate text-sm font-semibold text-foreground">{product.name}</h3>
                <p className="text-xs text-muted">{product.category}</p>
                <p className="mt-2 font-bold text-primary">₹{product.price.toFixed(2)}</p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-primary/80 opacity-0 transition-opacity group-hover:opacity-100">
                <Plus className="h-8 w-8 text-white" />
              </div>
            </div>
          ))}
        </div>
        {products.length === 0 && searchTerm && (
            <div className="flex flex-col items-center justify-center p-10 text-center text-muted">
                <Search className="h-12 w-12" />
                <p className="mt-4 text-lg">No products found for "{searchTerm}"</p>
                <p className="text-sm">Try a different search term or add the product to your inventory.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default ProductSearch;
