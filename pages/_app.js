import { useState } from 'react'
import '@/styles/globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function App({ Component, pageProps }) {
  const [cartTrace, setCarttrace] = useState(0)
  const [keywords, setKeywords] = useState('')
  
  return (
    <>
      <Component {...pageProps} cartTrace={cartTrace} setCarttrace={setCarttrace} keywords={keywords} setKeywords={setKeywords}  /> 
    </>
  )
}
