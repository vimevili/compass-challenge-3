import styles from './Menu.module.css';
import { useNavigate } from 'react-router-dom';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useState, useEffect, ReactNode, useContext } from "react";
import { motion, useAnimationControls } from "framer-motion";
import Loading from '../../../components/Loading/Loading';
import { UserContext } from '../../../contexts/UserContext';

const Menu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const controls = useAnimationControls();
  const navigate = useNavigate();

  const {user} = useContext(UserContext)
  const socialUser: string = user && user.displayName
  const userName: string = user && socialUser ? socialUser : 'user'
  
  async function closeMenu() {
    await controls.start("closed");
    setIsOpen(false);
  }
  
  useEffect(() => {
    if (isOpen) {
      controls.start("open");
    }
  }, [controls, isOpen]);

  function logOut() {
    setLoading(true);
    localStorage.removeItem('userLogged');
    setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 1500);
  }
  
  return (
      <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
        {loading && <Loading signout={true}/>}
            <div className={styles.container}>
        <DropdownMenu.Trigger asChild>
              <button className={styles.IconButton} >
                <img src="/src/assets/images/menu.svg" alt="" />
              </button>
        </DropdownMenu.Trigger>
              <div className={styles.photoContainer}><img src={socialUser ? user.photoURL : '/src/assets/images/user-profile.svg'} alt="" className={styles.userPhoto}/></div>
            </div>

        {isOpen && <DropdownMenu.Portal forceMount>
        <motion.div
            initial="closed"
            animate={controls}
            exit="closed"
            variants={{
                open: {
                    opacity: 1,
                    transition: { ease: "easeOut", duration: 0.1 },
                },
                closed: {
                    opacity: 0,
                    transition: { ease: "easeIn", duration: 0.2 },
                },
            }}
            >
            <DropdownMenu.Content className={styles.DropdownMenuContent} sideOffset={4}>
                <MenuItem  
                    closeMenu={closeMenu}
                    onSelect={() => setIsOpen(false)}
                >
                    <img src="/src/assets/images/exit.svg" alt="" />
                </MenuItem>
                <MenuItem  
                    closeMenu={closeMenu}
                    onSelect={() => setIsOpen(false)}
                >
                    <img src="/src/assets/images/home.svg" alt="" />
                    Home
                </MenuItem>

                <MenuItem 
                  closeMenu={closeMenu}
                  onSelect={() => navigate("/products")}
                >
                  <img src="/src/assets/images/headphone-icon.svg" alt="" />
                Products
                </MenuItem>
                <MenuItem 
                closeMenu={closeMenu}
                onSelect={() => navigate("/cart")}>
                <img src="/src/assets/images/shopping-cart.svg" alt="" />Cart
                </MenuItem>
                <MenuItem 
                closeMenu={closeMenu}
                onSelect={() => logOut()}>
                <img src="/src/assets/images/log-out.svg" alt="" />SignOut
                </MenuItem>
            </DropdownMenu.Content>
            </motion.div>
        </DropdownMenu.Portal>}
    </DropdownMenu.Root>
  );
};

export default Menu;

function MenuItem ({
    children,
    onSelect = () => {},
    closeMenu,
  }: {
    children: ReactNode;
    onSelect?: () => void;
    closeMenu: () => void;
  }) {
    const controls = useAnimationControls();

    const sleep = (s: number) =>
  new Promise((resolve) => setTimeout(resolve, s * 1000));
  return (
    <DropdownMenu.Item
    onSelect={async (e) => {
      e.preventDefault();

      await controls.start({
        backgroundColor: "#fcfcfc",
        transition: { duration: 0.04 },
      });
      await controls.start({
        backgroundColor: "#fcfcfc",

        transition: { duration: 0.04 },
      });
      await sleep(0.075);

      await closeMenu();
      onSelect();
    }}
    className={styles.DropdownMenuItem} asChild
  >
    <motion.div animate={controls}>{children}</motion.div>
  </DropdownMenu.Item>
);
}
