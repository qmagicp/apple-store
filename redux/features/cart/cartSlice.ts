import { Product } from '@/types'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CartState {
  items: Product[]
}

const initialState: CartState = {
  items: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state: CartState, action: PayloadAction<Product>) => {
      state.items = [...state.items, action.payload]
    },
    removeFromCart: (
      state: CartState,
      action: PayloadAction<{ id: string }>
    ) => {
      let newCart = [...state.items]

      let index = state.items.findIndex(
        (item) => item._id === action.payload.id
      )
      if (index >= 0) {
        newCart.splice(index, 1)
      } else {
        console.log(
          `Can't remove product (id: ${action.payload.id}) as its not in cart`
        )
      }
      state.items = newCart
    },
  },
})

export const { addToCart, removeFromCart } = cartSlice.actions
export default cartSlice.reducer
