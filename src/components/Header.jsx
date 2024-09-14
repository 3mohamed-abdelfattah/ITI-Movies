import React from 'react'
import { Logo, SearchIcon } from '@/utils/icons.util'

export const Header = () => {

  const styles = {
    navText: 'text-lg font-medium hover:scale-110 cursor-pointer hover:underline hover:decoration-3 hover:underline-offset-8 transition-all duration-300'
  }

  return (
    <header>
      <div className='flex justify-between mx-40 my-11 items-center'>

        <div>
          <Logo />
        </div>

        <nav className='flex gap-6 items-center'>
          <ul className='flex gap-16'>
            <li className={styles.navText}>New Movie</li>
            <li className={styles.navText}>Genre</li>
            <li className={styles.navText}>Country</li>
            <li className={styles.navText}>Movie</li>
            <li className={styles.navText}>TV Series</li>
            <p className='text-lg font-medium'>|</p>
          </ul>
          <span className={styles.navText}>
            <SearchIcon />
          </span>
        </nav>

      </div>
    </header>
  )
}
