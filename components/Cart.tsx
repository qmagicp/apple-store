'use client'

import { RootState } from '@/redux/store'
import Link from 'next/link'
import { BiShoppingBag, BiSolidShoppingBag } from 'react-icons/bi'
import { useSelector } from 'react-redux'

const Cart = () => {
  const items = useSelector((state: RootState) => state.cart.items)

  if (items.length === 0) {
    return null
  }

  return (
    <Link href={'/checkout'}>
      <div
        className="fixed flex h-16 w-16 bottom-10 right-10 z-50 cursor-pointer
      items-center justify-center rounded-full bg-gray-300"
      >
        {items.length > 0 && (
          <span
            className="absolute flex h-7 w-7 -right-2 -top-2 z-50 items-center justify-center rounded-full
        bg-gradient-to-r from-pink-500 to-violet-500 text-[10px] text-white"
          >
            {items.length}
          </span>
        )}
        <BiSolidShoppingBag className="headerIcon h-8 w-8" />
      </div>
    </Link>
  )
}

export default Cart
