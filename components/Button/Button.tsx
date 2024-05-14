'use client'

import React from 'react'
import styles from './Button.module.css'

const Button = ({ children, className, title, onClick }
  : { children: React.ReactNode, className?: string, title: string, onClick?: () => void }) => {
  return (
    <div
      className={`${styles.button} ${className}`}
      title={title}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default Button