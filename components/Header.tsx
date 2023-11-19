import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ImSearch } from 'react-icons/im'
import { BiShoppingBag, BiSolidShoppingBag } from 'react-icons/bi'
import { BiSolidUser } from 'react-icons/bi'

function Header() {
  const session = false

  return (
    <nav className="sticky flex top-0 z-30 w-full justify-between items-center p-4 bg-[#E7ECEE]">
      <div className="flex justify-center items-center md:w-1/5">
        <Link href={'/'}>
          <div className="relative h-10 w-5 cursor-pointer opacity-75 transition hover:opacity-100 ">
            <Image src="https://rb.gy/vsvv2o" alt="image-header" />
          </div>
        </Link>
      </div>
      <div className="hidden md:flex flex-1 items-center justify-center space-x-8">
        <a className="headerLink">Product</a>
        <a className="headerLink">Explore</a>
        <a className="headerLink">Support</a>
        <a className="headerLink">Business</a>
      </div>
      <div className="flex justify-center items-center gap-x-4 md:w-1/5">
        <ImSearch className="headerIcon" />
        <Link href={'/checkout'}>
          <div className="relative cursor-pointer">
            <span
              className="absolute text-white text-[10px] -right-1 -top-1 z-50 flex h-4 w-4 items-center justify-center
          bg-gradient-to-r from-pink-500 to-violet-500 rounded-full "
            >
              5
            </span>
            <BiSolidShoppingBag className="headerIcon" />
          </div>
        </Link>

        {session ? (
          <Image
            src={session.user?.image || ''}
            alt=""
            className="cursor-pointer rounded-full"
            width={34}
            height={34}
            // onClick={()=>signOut()}
          />
        ) : (
          <BiSolidUser
            className="headerIcon"
            //  onClick={() => signIn()}
          />
        )}
      </div>
    </nav>
  )
}

export default Header
