import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { productsPriceId } = req.body;

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  if (!productsPriceId) {
    return res.status(400).json({ error: "Products price ID not found." });
  }

  const sucessUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.NEXT_URL}/`;

  const line_items = [];

  productsPriceId.forEach((productPriceId) => {
    line_items.push({ price: productPriceId, quantity: 1 });
  });

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: sucessUrl,
    cancel_url: cancelUrl,
    mode: "payment",
    line_items,
  });

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  });
}
