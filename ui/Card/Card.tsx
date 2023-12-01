import React from 'react'
import styles from './Card.module.css'

const Card = ({ children, className, title, onClick }
  : { children: React.ReactNode, className?: string, title?: string, onClick?: () => void }) => {

  const style = `${styles.card} ${className} ${onClick ? styles.clickable : ''}`

  return (
    <div className={style} title={title} onClick={onClick ? () => setTimeout(() => onClick(), 250) : void 0}>
      {children}
    </div>
  )
}

export default Card