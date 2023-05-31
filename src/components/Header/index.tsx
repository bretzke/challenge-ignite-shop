import logoImg from "../../assets/logo.svg";
import Link from "next/link";
import Image from "next/image";
import { useContext, useEffect } from "react";
import { CartContext } from "../../contexts/CartContext";
import { HeaderContainer } from "../../styles/components/Header";

export function Header() {
  const { cart } = useContext(CartContext);

  return (
    <HeaderContainer>
      <Link href="/">
        <Image src={logoImg} alt="Logo Ignite Shop"></Image>
      </Link>

      <button disabled={!cart.length}>
        Finalizar compra
        {!!cart.length && <div>{cart.length}</div>}
      </button>
    </HeaderContainer>
  );
}
