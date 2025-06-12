import React from 'react'
import styles from './Card.module.css'

const Card = ({
  children,
  className,
  style,
  title,
  onClick,
}
  : {
    children: React.ReactNode,
    className?: string,
    style?: React.CSSProperties,
    title?: string,
    onClick?: () => void,
  }) => {

  const newClassName = `${styles.card} ${className} ${onClick ? styles.clickable : ''}`

  return (
    <div className={newClassName} style={style} title={title} onClick={onClick}>
      {children}
    </div>
  )
}

export default Card