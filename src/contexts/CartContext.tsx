import { ReactNode, createContext, useState } from "react";

interface CartContextType {
  cart: string[];
  addProductToCart: (id: string) => void;
  removeProductFromCart: (id: string) => void;
  checkIfItemAlreadyExists: (id: string) => boolean;
}

export const CartContext = createContext({} as CartContextType);

interface CartContextProviderProps {
  children: ReactNode;
}

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cart, setCart] = useState<string[]>([]);

  function addProductToCart(id: string) {
    console.log(id);
    if (!cart.includes(id)) {
      setCart((previousState) => [...previousState, id]);
    }

    console.log(cart);
  }

  function removeProductFromCart(id: string) {
    setCart((state) => state.filter((productId) => productId !== id));
  }

  function checkIfItemAlreadyExists(id: string) {
    return cart.includes(id);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addProductToCart,
        removeProductFromCart,
        checkIfItemAlreadyExists,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
