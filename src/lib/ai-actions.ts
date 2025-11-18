import { NavigateFunction } from 'react-router-dom';
import { AiAction, CartItem, Product } from '../types';
import { mockProducts } from './mock-data';

// --- Helper Functions ---

const findProduct = (name: string): Product | undefined => {
  const searchTerm = name.toLowerCase();
  // Prioritize exact match
  let product = mockProducts.find(p => p.name.toLowerCase() === searchTerm);
  if (product) return product;
  
  // Fallback to partial match
  product = mockProducts.find(p => p.name.toLowerCase().includes(searchTerm));
  return product;
};

const getDraftCart = (): CartItem[] => {
    const data = localStorage.getItem('vyaparai_draft_cart');
    return data ? JSON.parse(data) : [];
}

const saveDraftCart = (cart: CartItem[]) => {
    localStorage.setItem('vyaparai_draft_cart', JSON.stringify(cart));
}

// --- Action Handlers ---

const handleAddItem = (itemName: string, quantity: number) => {
  const product = findProduct(itemName);
  if (!product) {
    return { message: `Sorry, I couldn't find the product "${itemName}" in your inventory.` };
  }

  let cart = getDraftCart();
  const existingItemIndex = cart.findIndex(item => item.id === product.id);

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }

  saveDraftCart(cart);
  return {
    message: `Added ${quantity} x ${product.name} to the draft cart.`,
    updatedCart: cart,
  };
};

const handleNavigate = (page: string, navigate: NavigateFunction) => {
    const validPages = ['dashboard', 'products', 'billing', 'customers', 'reports', 'settings'];
    if (validPages.includes(page)) {
        navigate(`/app/${page}`);
        return { message: `Navigating to the ${page} page.` };
    }
    return { message: `Sorry, I can't navigate to a page named "${page}".` };
}

// --- Main Handler ---

export const handleAiAction = async (
  intent: AiAction,
  navigate: NavigateFunction
): Promise<{ message: string; updatedCart?: CartItem[] }> => {
  switch (intent.action) {
    case 'ADD_ITEM':
      return handleAddItem(intent.payload.itemName, intent.payload.quantity);

    case 'NAVIGATE':
        return handleNavigate(intent.payload.page, navigate);

    case 'CLARIFY':
      return { message: intent.payload.message };

    // Placeholder for other actions
    case 'SEARCH':
      return { message: `I've understood you want to search for: "${intent.payload.query}". This feature is coming soon!` };

    default:
      return { message: "I'm not sure how to handle that action yet." };
  }
};
