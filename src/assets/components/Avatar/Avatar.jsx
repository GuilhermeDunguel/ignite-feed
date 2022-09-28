import React from 'react'
import styles from './Avatar.module.css'

export function Avatar(props) {
  return (
    <div>
      <img 
        className={props.hasBorder === true ? styles.avatarWithBorder : styles.avatar} 
        src={props.src} 
        alt="" 
      />
    </div>
  )
}
