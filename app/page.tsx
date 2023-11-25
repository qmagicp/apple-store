import Header from '@/components/Header'
import Landing from '@/components/Landing'
import Tabs from '@/components/Tabs'
import { getCategories, getProducts } from '@/utils/serverActions'

export default async function Home() {
  const categories = await getCategories()
  const products = await getProducts()

  return (
    <div>
      <header>
        <Header />
      </header>
      <main className="relative h-[200vh] bg-[#E7ECEE]">
        <Landing />
      </main>
      <Tabs categories={categories} products={products} />
    </div>
  )
}

// Backend code
