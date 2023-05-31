import logoImg from "../../assets/logo.svg";
import Link from "next/link";
import Image from "next/image";
import { useContext, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import { HeaderContainer } from "../../styles/components/Header";
import axios from "axios";
import { useRouter } from "next/router";

export function Header() {
  const { pathname } = useRouter();
  const { cart } = useContext(CartContext);

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true);

      const response = await axios.post("/api/checkout", {
        productsPriceId: cart,
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (err) {
      setIsCreatingCheckoutSession(false);
      alert("Falha ao redirecionar ao checkout");
    }
  }

  return (
    <HeaderContainer>
      <Link href="/">
        <Image src={logoImg} alt="Logo Ignite Shop"></Image>
      </Link>

      {pathname !== "/success" && (
        <button
          disabled={!cart.length || isCreatingCheckoutSession}
          onClick={handleBuyProduct}
        >
          Finalizar compra
          {!!cart.length && <div>{cart.length}</div>}
        </button>
      )}
    </HeaderContainer>
  );
}
