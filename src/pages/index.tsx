import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

import { stripe } from "../lib/stripe";
import Stripe from "stripe";

import { HomeContainer, Product } from "../styles/pages/home";
import { Bag } from "phosphor-react";
import { MouseEvent, useContext } from "react";
import { CartContext } from "../contexts/CartContext";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    defaultPriceId: string;
  }[];
}

export default function Home({ products }: HomeProps) {
  const { addProductToCart, checkIfItemAlreadyExists } =
    useContext(CartContext);

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  function handleAddProductToCart(
    e: MouseEvent<HTMLButtonElement>,
    defaultPriceId: string
  ) {
    e.preventDefault();
    addProductToCart(defaultPriceId);
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => (
          <Link
            href={`/product/${product.id}`}
            key={product.id}
            prefetch={false}
          >
            <Product className="keen-slider__slide">
              <Image src={product.imageUrl} width={520} height={480} alt="" />

              <footer>
                <div>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </div>

                <button
                  className="primary"
                  disabled={checkIfItemAlreadyExists(product.defaultPriceId)}
                  onClick={(e) =>
                    handleAddProductToCart(e, product.defaultPriceId)
                  }
                >
                  <Bag />
                </button>
              </footer>
            </Product>
          </Link>
        ))}
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      defaultPriceId: price.id,
      price: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price.unit_amount / 100), // o preço é salvo em centavos no BD do stripe
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // cria um novo cache dessa página a cada 2 horas
  };
};
