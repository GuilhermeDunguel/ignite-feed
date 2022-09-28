import React from 'react'
import styles from './Header.module.css';
import igniteLogo from '../../img/ignite-logo.svg'

export function Header() {
  return (
    <header className={styles.header}>
      <img className={styles.igniteLogo} src={igniteLogo} alt="Logotipo do ignite" />
      <strong>Ignite Feed</strong>
    </header>
  )
}
