'use client'
import { urlForImage } from '@/sanity/lib/image'
import { Product } from '@/types'
import Image from 'next/image'

interface Props {
  product: Product
}

const Product = ({ product }: Props) => {
  return (
    <div
      className="flex h-fit w-[320px] select-none flex-col space-y-3 rounded-xl
    bg-[#35383C] p-8 md:h-[500px] md:w-[400px] md:p-10"
    >
      <div className="relative w-full h-64 md:h-72 p-8">
        <Image
          src={urlForImage(product.image[0].asset).url()}
          alt=""
          width={320}
          height={256}
          style={{ objectFit: 'fill', contain: 'layout' }}
        />
      </div>
    </div>
  )
}

export default Product
