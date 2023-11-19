import { type SchemaTypeDefinition } from 'sanity'
import product from "@/sanity/product";
import category from "@/sanity/category";
import blockContent from "@/sanity/blockContent";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, category, blockContent],
}
