import React, { Suspense } from 'react';
import { X, Search } from 'lucide-react';
import { Product } from '../types';

const ProductCard = React.lazy(() => import('../components/ProductCard'));

interface AllProductsProps {
  onClose: () => void;
  products: Product[];
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  wishlistItems: Product[];
  t: any;
}

const ProductSkeleton = () => (
  <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden h-full flex flex-col animate-pulse">
    <div className="h-56 bg-gray-100 relative">
       <div className="absolute top-3 right-3 w-8 h-8 bg-gray-200 rounded-full"></div>
    </div>
    <div className="p-5 flex flex-col flex-grow">
      <div className="h-3 bg-gray-200 w-24 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 w-full rounded mb-2"></div>
      <div className="h-4 bg-gray-200 w-2/3 rounded mb-4"></div>
      
      <div className="flex items-center mb-4">
        <div className="h-4 bg-gray-200 w-12 rounded mr-2"></div>
        <div className="h-3 bg-gray-200 w-16 rounded"></div>
      </div>

      <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
        <div className="flex flex-col gap-1">
           <div className="h-6 bg-gray-200 w-20 rounded"></div>
           <div className="h-3 bg-gray-200 w-16 rounded"></div>
        </div>
        <div className="h-10 w-10 bg-gray-200 rounded-xl"></div>
      </div>
    </div>
  </div>
);

const AllProducts: React.FC<AllProductsProps> = ({ onClose, products, onAddToCart, onToggleWishlist, wishlistItems, t }) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-7xl max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {t.allProducts || 'All Products'}
            </h2>
            <p className="text-sm text-gray-600">
              {filteredProducts.length} {t.productsAvailable || 'products available'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors ml-4"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={t.searchProducts || 'Search products...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-agri-green focus:border-transparent"
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-xl font-semibold text-gray-900 mb-2">
                {t.noProductsFound || 'No products found'}
              </p>
              <p className="text-gray-600">
                {t.tryDifferentSearch || 'Try a different search term'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <Suspense fallback={
                <>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <ProductSkeleton key={i} />
                  ))}
                </>
              }>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={() => onAddToCart(product)}
                    t={t}
                  />
                ))}
              </Suspense>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
