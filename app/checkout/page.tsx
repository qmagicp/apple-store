'use client'

import Button from '@/components/Button'
import CheckoutProduct from '@/components/CheckoutProduct'
import Header from '@/components/Header'
import { setLoading } from '@/redux/features/cart/cartSlice'
import { RootState } from '@/redux/store'
import { Product } from '@/types'
import getStripe from '@/utils/getStripe'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { BiChevronDown } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import Stripe from 'stripe'

const Checkout = () => {
  const items = useSelector((state: RootState) => state.cart.items)
  const loading = useSelector((state: RootState) => state.cart.loading)
  const dispatch = useDispatch()
  const cartTotal = useSelector((state: RootState) =>
    state.cart.items.reduce(
      (total: number, item: Product) => (total += item.price),
      0
    )
  )
  const router = useRouter()
  const [groupedItemsInCart, setGroupedItemsInCart] = useState(
    {} as { [key: string]: Product[] }
  )

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      ;(results[item._id] = results[item._id] || []).push(item)
      return results
    }, {} as { [key: string]: Product[] })

    setGroupedItemsInCart(groupedItems)
  }, [items])

  async function createCheckoutSession() {
    dispatch(setLoading)

    const checkoutSession: Stripe.Checkout.Session = await fetch(
      '/api/checkout_sessions',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ items: items }),
      }
    )

    //Internal Server Error
    if ((checkoutSession as any).statusCode === 500) {
      console.error((checkoutSession as any).message)
      return
    }

    // redirect to Checkout
    const stripe = await getStripe()
    const { error } = await stripe!.redirectToCheckout({
      sessionId: checkoutSession.id,
    })

    console.warn(error.message)

    dispatch(setLoading)
  }

  return (
    <div className="min-h-screen overflow-hidden bg-[#E7ECEE]">
      <Header />
      <main className="mx-auto max-w-5xl pb-24">
        <div className="px-5">
          <h1 className="my-4 text-3xl font-semibold lg:text-4xl">
            {items.length ? 'Review your cart' : 'Your cart is empty'}
          </h1>
          <p className="my-4">Free delivery and free returns</p>

          {items.length === 0 && (
            <Button
              title="Continue Shopping"
              onClick={() => router.push('/')}
            />
          )}
        </div>
        {items.length > 0 && (
          <div className="mx-5 md:mx-8">
            {Object.entries(groupedItemsInCart).map(([key, items]) => (
              <CheckoutProduct key={key} items={items} id={key} />
            ))}
            <div className="my-12 mt-6 ml-auto max-w-3xl  ">
              <div className="divide-y divide-gray-300  ">
                <div className="pb-4">
                  <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>${cartTotal}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Shipping</p>
                    <p>FREE</p>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex flex-col gap-x-1 lg:flex-row">
                      Estimated tax for:{' '}
                      <p className="flex cursor-pointer items-end text-blue-500 hover:underline">
                        Enter zip code
                        <BiChevronDown className="h-6 w-6" />
                      </p>
                    </div>
                    <p>$ -</p>
                  </div>
                </div>
                <div className="flex justify-between pt-4 text-xl font-semibold">
                  <h4>Total</h4>
                  <h4>${cartTotal}</h4>
                </div>
              </div>
              <div className="my-14 space-y-4">
                <h4 className="text-xl font-semibold">
                  How would you like to check out?
                </h4>
                <div className="flex flex-col gap-4 md:flex-row">
                  <div
                    className="order-2 flex flex-col flex-1  rounded-xl justify-center items-center
                   text-center p-8 py-12 bg-gray-200"
                  >
                    <h4 className="flex flex-col mb-4 text-xl font-semibold">
                      <span>Pay Monthly</span>
                      <span>with Apple Card</span>
                      <span>
                        283.16/mo. at 0% APR{' '}
                        <sup className="-top-1.5 -left-1.5">0</sup>{' '}
                      </span>
                    </h4>
                    <Button title="Check Out with Apple Card Monthly Installments" />
                    <p className="mt-2 max-w-[240px] text-[13px]">
                      $0.00 due today, which includes applicable full-price
                      items, down payments, shipping, and taxes.
                    </p>
                  </div>
                  <div
                    className="md:order-2 flex flex-col flex-1 rounded-xl justify-center items-center
                   text-center p-8 py-12 bg-gray-200 space-y-8"
                  >
                    <h4 className="mb-4 flex flex-col text-xl font-semibold">
                      Pay in full
                      <span>${cartTotal}</span>
                    </h4>
                    <Button
                      noIcon
                      loading={loading}
                      title="Check Out"
                      width="w-full"
                      onClick={createCheckoutSession}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default Checkout
