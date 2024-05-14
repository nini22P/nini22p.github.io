import React from 'react'
import { Metadata } from 'next'
import './globals.css'
import styles from './layout.module.css'
import siteConfig from '../site.config'
import Navigation from '../components/Navigation/Navigation'
import Script from 'next/script'
import Status from '../components/Status/Status'
// import Dock from '../components/Dock/Dock'

export const metadata: Metadata = {
  title: siteConfig.siteTitle,
  description: siteConfig.description,
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <html>

      <Script strategy="lazyOnload" id="clarity-script">
        {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "k0zldg2mow");
        `}
      </Script>

      <body>
        <div className='w-full min-h-screen pb-20 xl:pb-4 px-4 pt-4 xl:pt-8'>
          <div className='max-w-7xl m-auto'>
            {children}
          </div>
        </div>
        <div className={styles.background}></div>
        <div className='fixed bottom-0 inset-x-0 max-w-7xl mx-auto'>
          <Navigation />
          {/* <Dock /> */}
          <Status />
        </div>

      </body>
    </html>
  )
}

export default RootLayout