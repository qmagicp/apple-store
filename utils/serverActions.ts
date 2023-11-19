import { client } from '@/sanity/lib/client'
import { Category, Product } from '@/types'
import { groq } from 'next-sanity'


export async function getCategories() {
    const query = groq`*[_type == "category"]`
    const categories: Category[] = await client.fetch(query)
    return categories

}

export async function getProducts() {
    const query = groq`*[_type == "product"]`
    const products: Product[] = await client.fetch(query)
    return products

}

