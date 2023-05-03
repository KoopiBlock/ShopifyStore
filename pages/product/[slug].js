import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Link from 'next/link';
import { motion } from 'framer-motion'


function ProductDisplay({slug, imageSrc, imageAlt, title, description, price }) {

    const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <div className={styles.product}>
      <Link href={`/product/${slug}`}>
        <Image src={imageSrc} alt={imageAlt} width={400} height={400} />
      </Link>
      <h2>{title}</h2>
      <p>{description}</p>
      <p className={styles.price}>{formattedPrice.format(price)}</p>
    </div>
  );
}



export default function ProductPage({ product }) {

   
    console.log(product)

    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });


    // to abstaract it out
      const addToCart = async () => {

        let localCartData = JSON.parse(
          window.localStorage.getItem('koopiBlock:shopify:cart')

        
        );

        if (!localCartData.cartId) {
          console.error('woops there was an error loading zi cart')
          return
        }

        console.log(localCartData.cartId)
        console.log(product.variantId)

         const result = await fetch(`http://localhost:3000/api/add-to-cart?cartId=${localCartData.cartId}&variantId=${product.variantId}`, {
           method: 'POST', 
         })

         console.log(result)

         if (!result.ok) {
           console.error('There was a problem adding the item to the cart');
           return;
         }

         window.localStorage.setItem('koopiBlock:shopify:status', 'dirty')

    }

    
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta name="description"
                    content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title}>Store</h1>

                <div className={styles.products}>

                    <ProductDisplay {...product} />
                    <motion.button className={styles.ctaLink} onClick={addToCart}
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.2 }}                        
                    >
                        הוסף לסלסלה
                    </motion.button>

                </div>
            </main>
        </div>
    )
}

export async function getStaticPaths() {

    const url = new URL(process.env.URL || 'http://localhost:3000');
    url.pathname = '/api/product';


    const res = await fetch(url.toString());
    
    if (!res.ok) {
        console.error(res);
        return { props: {} };
    }

    const data = await res.json();

    return {
        paths: data.products.edges.map(({ node }) => `/product/${node.handle}`),
        fallback: true,

    }
}

export async function getStaticProps({ params }) {
    const url = new URL(process.env.URL || 'http://localhost:3000');
    url.pathname = '/api/product';

    const res = await fetch(url.toString());

    if (!res.ok) {
        console.error(res);
        return { props: {} };
    }

    const data = await res.json();


    const product = data.products.edges

        .map(({ node }) => {

            if (node.totalInvetory <= 0) {
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
            }
        })
        .find(({ slug }) => slug === params.slug)


    return {
        props: { product },
    }
}




