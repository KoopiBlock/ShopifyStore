import React from 'react'
import styles from './Product.module.css'
import Image from 'next/image'

import { motion } from 'framer-motion'

const Product = ({ product }) => {

    console.log(product)

    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });

  return (
    <div className={styles.product}>
        <a href={`/product/${product.slug}`}>
        <Image src={product.imageSrc} alt={product.imageAlt} width={400} height={400} />
      </a>
      <h2>{product.title}</h2>
      <p className={styles.price}>{formattedPrice.format(product.price)}</p>
      <div className={styles.ctaContainer}>
        <motion.p className={styles.ctaLink}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          פרטים נוספים
        </motion.p>
        <motion.p className={styles.ctaLink}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.2 }}                        
        >
          הוסף לסלסלה
        </motion.p>
      </div>
    </div>
  );
}

export default Product