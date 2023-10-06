import React,{useState, useEffect} from 'react'
import { Header } from './Header'
import Footer from './Footer'
import Head from 'next/head'


const Layout = ({children, cartTrace, setKeywords, keywords}) => {
  const [cartTotal, setCartTotal] = useState(0)

    const cartRefetch = () => {
        const cart = JSON.parse(localStorage.getItem("cartData"))
        setCartTotal(cart?.length)
      }
    
      useEffect(() => {
        cartRefetch()
      },[cartTrace])
    
  return (
    <>
      <Head>
        <title>Grocery App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" />
      </Head>
        <Header cartTotal={cartTotal} setKeywords={setKeywords} keywords={keywords} />

            {children}

        <Footer />
    </>
  )
}

export default Layout