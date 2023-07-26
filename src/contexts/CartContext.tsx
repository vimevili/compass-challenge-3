import { useState, ReactNode, createContext } from 'react';
import Swal from 'sweetalert2';

export interface Product {
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
  id: string;
}

export interface cartProduct extends Product {
  quantity: number;
}

export interface CartContextData {
  cartProducts: cartProduct[],
  addOneProduct: (a: string) => void,
  clearCart: (a: cartProduct[]) => Promise<void> | null;
  addToCart: (a: Product) => void;
  handleAddProduct: (a: Product) =>  void;
  confirmRemoval: () =>  Promise<boolean>,
  areYouSure:(a: cartProduct) =>  void,
  removeOneProduct:(a: string) => void,
  handleRemoveFromCart: (a: Product) => void,
  totalPrice: number
}

export const CartContext = createContext<CartContextData>({} as CartContextData);

type Props = {children: ReactNode }
export const CartProvider = ({ children }: Props) => {

  const [cartProducts, setCartProducts] = useState<cartProduct[]>([]);

  function addOneProduct(productId: string): void {
    const updatedCart: cartProduct[] = cartProducts.map((product) => {
      if (product.id === productId) {
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    });
    setCartProducts(updatedCart);
  }

  async function clearCart(cartProducts: cartProduct[]): Promise<void> {
    if (cartProducts) {
      await Swal.fire({
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
  }
  }
  function addToCart(selectedProduct: Product) {
    const updatedProduct: cartProduct = { ...selectedProduct, quantity: 1 };
    setCartProducts([...cartProducts, updatedProduct]);
  }

  const handleAddProduct = (selectedProduct: Product): void => {
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

  function areYouSure(productToRemove: cartProduct) {
    confirmRemoval()
      .then(async (isConfirmed) => {
        if (isConfirmed) {
         await Swal.fire('Removed!', 'The product was successfully removed.', 'success');
          const updatedCartProducts: cartProduct[] = cartProducts.filter(
          (product) => product.id !== productToRemove.id
            );
            setCartProducts(updatedCartProducts);
           await Swal.fire('Removed!', 'The product was successfully removed.', 'success');
          }
        })
      .catch((error) => {
        console.log(error);
      });
  }

  function removeOneProduct(productId: string) {
    const updatedCart: cartProduct[] = cartProducts.map((product) => {
      if (product.id === productId && product.quantity > 0) {
        return { ...product, quantity: product.quantity - 1 };
      }
      return product;
    });

    const productToRemove = updatedCart.find((product) => product.id === productId);

    if (productToRemove && productToRemove.quantity === 0) {
      areYouSure(productToRemove);
    } else {
      setCartProducts(updatedCart);
    }
  }

  const handleRemoveFromCart = (selectedProduct: Product) => {
    confirmRemoval()
      .then(async (isConfirmed) => {
        if (isConfirmed) {
          const updatedCartProducts: cartProduct[] = cartProducts.filter(
            (product) => product.id !== selectedProduct.id
          );
          setCartProducts(updatedCartProducts);
          await Swal.fire('Removed!', 'The product was successfully removed.', 'success');
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

  const totalPrice: number = calculateTotalPrice();

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        addOneProduct,
        clearCart,
        addToCart,
        handleAddProduct,
        confirmRemoval,
        areYouSure,
        removeOneProduct,
        handleRemoveFromCart,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
