import React, { useReducer, useContext } from 'react'

// Initialize the context
const CartContext = React.createContext()

// Definte the default state
const initialState = {
  itemsById: {},
  allItems: [],
}

// Define reducer actions
const ADD_ITEM = 'ADD_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'
const UPDATE_ITEM_QUANTITY = 'UPDATE_ITEM_QUANTITY'

// Define the reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_ITEM:
      const newState = {
        ...state,
        itemsById: {
          ...state.itemsById,
          [action.payload._id]: {
            ...action.payload,
            quantity: state.itemsById[action.payload._id]
              ? state.itemsById[action.payload._id].quantity + 1
              : 1,
          },
        },
        allItems: [...state.allItems, action.payload._id],
      }
      return newState
    case REMOVE_ITEM:
      const updatedState = {
        ...state,
        itemsById: Object.entries(state.itemsById)
          .filter(([key, value]) => key !== action.payload._id)
          .reduce((obj, [key, value]) => {
            obj[key] = value
            return obj
          }, {}),
        allItems: state.allItems.filter(
          (itemId) => itemId !== action.payload._id
        ),
      }
      return updatedState
    
    default:
      return state
  }
}

// Define the provider
const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Remove an item from the cart
  const removeFromCart = (product) => {
    dispatch({ type: REMOVE_ITEM, payload: product })
  }

  // Add an item to the cart
  const addToCart = (product) => {
    dispatch({ type: ADD_ITEM, payload: product })
  }

  // todo Update the quantity of an item in the cart
  const updateItemQuantity = (product, quantity) => {
    // todo
  }

  // todo Get the total price of all items in the cart
  const getCartTotal = () => {
    // todo
  }

  return (
    <CartContext.Provider
      value={{
        cartItems: state.allItems.map((itemId) => state.itemsById[itemId]),
        addToCart,
        updateItemQuantity,
        removeFromCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

const useCart = () => useContext(CartContext)

export { CartProvider, useCart }
