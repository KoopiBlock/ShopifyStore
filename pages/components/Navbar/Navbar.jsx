import Link from 'next/link'
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai'
import styles from './Navbar.module.css'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence, delay } from 'framer-motion'
import Cart from '../Cart/Cart'
 
const Navbar = () => {

    const [screenWidth, setScreenWidth] = useState(0)
    const [isMobile, setIsMobile] = useState(false)
    const [open, setOpen] = useState(false)
  
    
    useEffect(() => {
       function watchWidth()  {     
        setScreenWidth(window.innerWidth)
       }

       window.addEventListener("resize", watchWidth)
       watchWidth()
      
    }, [])

    useEffect(() => {

        function mobileScreen() {
            if (screenWidth < 830)  {
                setIsMobile(true)
            } else {
                setIsMobile(false)
                setOpen(false)
            }
        }

        mobileScreen()

    }, [screenWidth])

    const menuOpen = () => {
        setOpen(!open)
    }

    const menuClose = () => {
      setOpen(false)
    }


    const animMenu = {
      exit: {
        opacity: 0,
        height: 0,
        transtion: {
          ease: "easeInOut",
          duration:0.3,
          delay: 1.2,
        }
      }
    }

    


    
    
  return (
    <>
        <header className={styles.navbar}>
        <div className={styles.cartContainer}>
          <Cart />
        </div>        
        <div className={styles.logoContainer}>  
          <h3 className={styles.logo}>
            <Link href="/" className={styles.logoLink} onClick={menuClose} >KOOPI BLOCKS</Link>
          </h3>
        </div>
        { isMobile ? 
        <>

        { open ?
         <>
            <div>
                <AiOutlineClose className={styles.menuIcon} onClick={menuOpen}/>
            </div>
            
         </>
         :
         <>
            <div>
                <AiOutlineMenu className={styles.menuIcon} onClick={menuOpen}/>
            </div>
         </>
         }
        
        </> 
        :   
        <>
        <div className={styles.menuContainer}>
            <ul className={styles.linksList}>
              <motion.li className={styles.linkWrap}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link href="/" className={styles.link}>התקנות</Link>
              </motion.li>
              <motion.li className={styles.linkWrap}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link href="/" className={styles.link}>אודותנו</Link>
              </motion.li>
              <motion.li className={styles.linkWrap}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link href="/" className={styles.link}>מידע מקצועי</Link>
              </motion.li>
              <motion.li className={styles.linkWrap}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link href="/" className={styles.link}>חנות</Link>
              </motion.li>
              <motion.li className={styles.linkWrap} 
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link href="/" className={styles.link} id={styles.cta}>צרו קשר 📞</Link> 
              </motion.li>
            </ul>
          </div>
        </>}
     
       </header>
       <AnimatePresence>
       {open &&
        
        <>
          <motion.div
           className={styles.MobileMenuContainer}
           onClick={menuClose}
           variants={animMenu}
           initial={{height: 0, opacity: 0}}
           animate={{height: "100vh", opacity:1}}
           transition={{duration: .5}}
           exit="exit"
          >
              <ul className={styles.MobileLinksList}>
                  <motion.li className={styles.MobileLinkWrap} onClick={menuClose}
                     initial={{y:80,opacity:0}}
                     animate={{y:0, opacity:1}}
                     transition={{delay:.8}}
                     exit={{
                      opacity:0,
                      y:90,
                        transition:{
                          ease:"easeInOut",
                          delay:1
                        }
                     }}
                  >
                      <Link href="/" className={styles.link}>חנות</Link>
                  </motion.li>
                  <motion.li className={styles.MobileLinkWrap} onClick={menuClose}
                    initial={{y:80,opacity:0}}
                    animate={{y:0, opacity:1}}
                    transition={{delay:.7}}
                    exit={{
                     opacity:0,
                     y:90,
                       transition:{
                         ease:"easeInOut",
                         delay:.8
                       }
                    }}
                  >
                      <Link href="/" className={styles.link}>אודותנו</Link>
                  </motion.li>
                  <motion.li className={styles.MobileLinkWrap} onClick={menuClose}
                    initial={{y:80,opacity:0}}
                    animate={{y:0, opacity:1}}
                    transition={{delay:.6}}
                    exit={{
                     opacity:0,
                     y:90,
                       transition:{
                         ease:"easeInOut",
                         delay:.6
                       }
                    }}
                  >
                      <Link href="/" className={styles.link}>מידע מקצועי</Link>
                  </motion.li>
                  <motion.li className={styles.MobileLinkWrap} onClick={menuClose}
                    initial={{y:80,opacity:0}}
                    animate={{y:0, opacity:1}}
                    transition={{delay:.5}}
                    exit={{
                     opacity:0,
                     y:90,
                       transition:{
                         ease:"easeInOut",
                         delay:.4
                       }
                    }}
                  >
                      <Link href="/" className={styles.link}>התקנות</Link>
                  </motion.li>
                  <motion.li className={styles.MobileLinkWrap} onClick={menuClose}
                    initial={{y:80,opacity:0}}
                    animate={{y:0, opacity:1}}
                    transition={{delay:.4}}
                    exit={{
                     opacity:0,
                     y:90,
                       transition:{
                         ease:"easeInOut",
                         delay:.2
                       }
                    }}
                  >
                      <Link href="/" className={styles.link} id={styles.cta} onClick={menuClose}>צרו קשר 📞</Link> 
                  </motion.li>
              </ul>
          </motion.div>
        </>
       }
       </AnimatePresence>
    </>
  )
}

export default Navbar