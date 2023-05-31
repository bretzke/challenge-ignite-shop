import { ReactNode, createContext, useState } from "react";

interface CartContextType {
  cart: string[];
  addProductToCart: (priceId: string) => void;
  checkIfItemAlreadyExists: (priceId: string) => boolean;
}

export const CartContext = createContext({} as CartContextType);

interface CartContextProviderProps {
  children: ReactNode;
}

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cart, setCart] = useState<string[]>([]);

  function addProductToCart(priceId: string) {
    if (!cart.includes(priceId)) {
      setCart((previousState) => [...previousState, priceId]);
    }
  }

  function checkIfItemAlreadyExists(priceId: string) {
    return cart.includes(priceId);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addProductToCart,
        checkIfItemAlreadyExists,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
