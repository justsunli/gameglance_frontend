'use client'

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { PiGameControllerFill } from "react-icons/pi";
import classnames from 'classnames';
import SearchBar from './components/SearchBar';


// TODO: implement NavBar with a logo, homepage, search bar and user profile
const NavBar = () => {
  const currentPath = usePathname();
  const links =[
    {name: 'Home', path: '/'},
    {name: 'Profile', path: '/profile'}
  ]
  return(
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
      <Link href="/"><PiGameControllerFill /></Link>
      <ul className='flex space-x-6'>
        {links.map(link => 
        <Link key={link.path} 
        className={classnames({
          'text-zinc-900': currentPath === link.path,
          'text-zinc-500': currentPath !== link.path,
          'hover:text-zinc-800 transition-colors': true
        })}
        href={link.path}>{link.name}
        </Link>)}
      </ul>
      <SearchBar/>
    </nav>

  )
}

export default NavBar