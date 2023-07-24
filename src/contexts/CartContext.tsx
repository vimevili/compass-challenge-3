import { useState, createContext } from 'react';
import Swal from 'sweetalert2';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  interface selectedProduct {
    rating: number;
    price: string;
    name: string;
    description: string;
    category: string;
    created_at: Date;
    reviews: {
      user: string;
      description: string;
      rating: number;
      date: Date;
      id: number;
    }[];
    id: number;
  }

  interface cartProduct extends selectedProduct {
    quantity: number;
  }

  const [cartProducts, setCartProducts] = useState<cartProduct[]>([]);

  function addOneProduct(productId: number) {
    const updatedCart: cartProduct[] = cartProducts.map((product) => {
      if (product.id === productId) {
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    });
    setCartProducts(updatedCart);
  }

  function clearCart(cartProducts) {
    if (cartProducts) {
      return Swal.fire({
        customClass : {
          confirmButton: 'swal2-button'
        },
        title: 'Are you sure?',
        text: 'Do you wish to remove all products from your cart?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, remove them!'
      }).then((result) => {
        if(result.isConfirmed) {
          setCartProducts([]);
        }
      });
  } return null
  }
  function addToCart(selectedProduct: selectedProduct) {
    const updatedProduct: cartProduct = { ...selectedProduct, quantity: 1 };
    setCartProducts([...cartProducts, updatedProduct]);
  }

  const handleAddProduct = (selectedProduct: selectedProduct) => {
    const productExists = cartProducts.some((product) => product.id === selectedProduct.id);
    productExists ? addOneProduct(selectedProduct.id) : addToCart(selectedProduct);
  };

  function confirmRemoval() {
    return Swal.fire({
      customClass : {
        confirmButton: 'swal2-button'
      },
      title: 'Are you sure?',
      text: 'Do you wish to remove this product from your cart?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove it!'
    }).then((result) => {
      return result.isConfirmed;
    });
  }

  function areYouSure(productId: number, productToRemove: cartProduct) {
    confirmRemoval(productId, productToRemove)
      .then((isConfirmed) => {
        if (isConfirmed) {
          Swal.fire('Removed!', 'The product was successfully removed.', 'success');
          const updatedCartProducts: cartProduct[] = cartProducts.filter(
          (product) => product.id !== productToRemove.id
            );
            setCartProducts(updatedCartProducts);
            Swal.fire('Removed!', 'The product was successfully removed.', 'success');
          }
        })
      .catch((error) => {
        console.log(error);
      });
  }

  function removeOneProduct(productId: number) {
    const updatedCart: cartProduct[] = cartProducts.map((product) => {
      if (product.id === productId && product.quantity > 0) {
        return { ...product, quantity: product.quantity - 1 };
      }
      return product;
    });

    const productToRemove = updatedCart.find((product) => product.id === productId);

    if (productToRemove && productToRemove.quantity === 0) {
      areYouSure(productId, productToRemove);
    } else {
      setCartProducts(updatedCart);
    }
  }

  const handleRemoveFromCart = (selectedProduct: selectedProduct) => {
    confirmRemoval()
      .then((isConfirmed) => {
        if (isConfirmed) {
          const updatedCartProducts: cartProduct[] = cartProducts.filter(
            (product) => product.id !== selectedProduct.id
          );
          setCartProducts(updatedCartProducts);
          Swal.fire('Removed!', 'The product was successfully removed.', 'success');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function calculateTotalPrice() {
    let count = 0;
    cartProducts.forEach((product) => {
      const productPrice = +product.price.substring(1);
      count += productPrice * product.quantity;
    });
    return count;
  }

  const totalPrice = calculateTotalPrice();

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        clearCart,
        setCartProducts,
        handleAddProduct,
        handleRemoveFromCart,
        removeOneProduct,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
