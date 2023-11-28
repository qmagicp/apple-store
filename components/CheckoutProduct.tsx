import { removeFromCart } from '@/redux/features/cart/cartSlice'
import { urlForImage } from '@/sanity/lib/image'
import { Product } from '@/types'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { BiChevronDown } from 'react-icons/bi'
import { useDispatch } from 'react-redux'

interface Props {
  items: Product[]
  id: string
}

const CheckoutProduct = ({ items, id }: Props) => {
  const dispatch = useDispatch()

  function removeItemFromCart() {
    dispatch(removeFromCart({ id }))

    toast.error(`${items[0].title} removed from cart`, {
      position: 'bottom-center',
    })
  }

  return (
    <div
      className="flex flex-col gap-x-4 border-b border-gray-300 pb-7 pt-7 lg:flex-row
     lg:items-center"
    >
      <div className="relative">
        <Image
          src={urlForImage(items[0].image[0].asset).url()}
          alt="added items"
          width={176}
          height={176}
        />
      </div>
      <div className="flex flex-1 items-end lg:items-center m-8 lg:m-10">
        <div className="flex-1 space-y-4">
          <div className="flex flex-col gap-x-8 text-xl lg:flex-row lg:text-2xl ">
            <h4 className="flex font-semibold lg:w-96 ">{items[0].title}</h4>
            <p className="flex gap-x-1 font-semibold">
              {items.length}
              <BiChevronDown className="h-6 w-6 text-blue-500" />
            </p>
          </div>
          <p className="flex cursor-pointer items-end text-blue-500 hover:underline">
            Show product details
            <BiChevronDown className="h-6 w-6" />
          </p>
        </div>
        <div className="flex flex-col space-y-4 items-end ">
          <h4 className="text-xl font-semibold lg:text-2xl">
            ${items.reduce((total, item) => (total += item.price), 0)}
          </h4>
          <button className="text-blue-500" onClick={removeItemFromCart}>
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}

export default CheckoutProduct
