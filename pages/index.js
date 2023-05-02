import Head from 'next/head'

import styles from '../styles/Home.module.css'

import { Navbar, Footer, Product, Header, Cart } from './components';

export async function getStaticProps() {

  // to be changed, we dont want this to be seen in client side
  const res = await fetch('http://localhost:3000/api/product');

  if (!res.ok) {
    console.error(res);
    return { props: {} };
  }

  const data = await res.json();

  const products = data.products.edges
    .map(({ node }) => {
      if (node.totalInventory <= 0) {
        return false;
      }

      return {
        id: node.id,
        title: node.title,
        description: node.description,
        imageSrc: node.images.edges[0].node.src,
        imageAlt: node.title,
        price: node.variants.edges[0].node.priceV2.amount,
        slug: node.handle,
        variantId: node.variants.edges[0].node.id
      };
    })
    .filter(Boolean);

    

  return {
    props: { products },
  }
}

export default function Home({products}) {

  

  return (
    <div className={styles.container}>
        <div>
          <Header />
        </div>
        <div>
          <div className={styles.titleContainer}>
            <h1>Our products:</h1>
          </div>
          <div className={styles.productsSection}>
              {products.map((product) => (
                <Product key={product.id} product={product} />
              ))}
          </div>
        </div>

    </div>
  )
}



