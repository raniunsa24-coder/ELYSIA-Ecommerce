import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext(null);

const CART_STORAGE_KEY = "elysia-cart";

function getStoredCart() {
  try {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);

    if (!storedCart) {
      return [];
    }

    const parsedCart = JSON.parse(storedCart);

    return Array.isArray(parsedCart) ? parsedCart : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(getStoredCart);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(cart)
      );
    } catch {
      // Ignore storage errors.
    }
  }, [cart]);

  function showNotification(message) {
    setNotification(message);

    setTimeout(() => {
      setNotification("");
    }, 2500);
  }

  function addToCart(product) {
    if (!product?._id) return;

    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item._id === product._id
      );

      if (existingProduct) {
        return currentCart.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: (item.quantity || 1) + 1,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });

    showNotification(`${product.name} added to cart`);
  }

  function removeFromCart(productId) {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => item._id !== productId
      )
    );
  }

  function increaseQuantity(productId) {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item._id === productId
          ? {
              ...item,
              quantity: (item.quantity || 1) + 1,
            }
          : item
      )
    );
  }

  function decreaseQuantity(productId) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item._id === productId
            ? {
                ...item,
                quantity: Math.max(
                  0,
                  (item.quantity || 1) - 1
                ),
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function updateQuantity(productId, quantity) {
    const newQuantity = Number(quantity);

    if (!Number.isFinite(newQuantity) || newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((currentCart) =>
      currentCart.map((item) =>
        item._id === productId
          ? {
              ...item,
              quantity: Math.floor(newQuantity),
            }
          : item
      )
    );
  }

  function clearCart() {
    setCart([]);
  }

  const cartCount = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total + Math.max(0, Number(item.quantity) || 0),
      0
    );
  }, [cart]);

  const cartTotal = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total +
        Number(item.price || 0) *
          Math.max(0, Number(item.quantity) || 0),
      0
    );
  }, [cart]);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    updateQuantity,
    clearCart,
    cartCount,
    cartTotal,
    notification,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}

export default CartContext;