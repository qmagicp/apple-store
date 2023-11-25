'use client'
import { addToCart } from '@/redux/features/cart/cartSlice'
import { urlForImage } from '@/sanity/lib/image'
import { Product } from '@/types'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { BiShoppingBag } from 'react-icons/bi'
import { useDispatch } from 'react-redux'

interface Props {
  product: Product
}

const Product = ({ product }: Props) => {
  const dispatch = useDispatch()

  const addItemToCart = () => {
    dispatch(addToCart(product))

    toast.success(`${product.title} added to cart`, {
      position: "bottom-center"
    })
  }

  return (
    <div
      className="flex h-fit w-[320px] select-none flex-col space-y-3 rounded-xl
    bg-[#35383C] p-10 md:h-[500px] md:w-[400px] md:p-20"
    >
      <div className="relative w-full h-62 md:h-70">
        <Image
          src={urlForImage(product.image[0].asset).url()}
          alt=""
          width={320}
          height={256}
          style={{ objectFit: 'fill', contain: 'layout' }}
        />
      </div>
      <div className="flex flex-1 items-center justify-between space-x-3">
        <div className="space-y-2 text-xl text-white md:text-2xl">
          <p>{product.title}</p>
          <p>{product.price}</p>
        </div>
        <div
          className="flex flex-shrink-0 h-16 w-16 items-center justify-center cursor-pointer rounded-full bg-gradient-to-r
        from-pink-500 to-violet-500 md:h-[70px] md:w-[70px]"
          onClick={addItemToCart}
        >
          <BiShoppingBag className="h-8 w-8 text-white" />
        </div>
      </div>
    </div>
  )
}

export default Product
