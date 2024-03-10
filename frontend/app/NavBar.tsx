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
<<<<<<< HEAD
    {name: 'Search', path: '/search'},
    {name: 'Reviews', path: '/reviews'},
    {name: 'Profile', path: '/profile'},
    {name: 'Login', path: '/login'},
    {name: 'Signup', path: '/signup'},
    {name: 'ForgotPassword', path: '/forgotpassword'}
=======
    {name: 'Profile', path: '/profile'}
>>>>>>> main
  ]
  // Filter the links to just the ones that can be accessed via the nav bar
  // Does not include login, signup, or forgot password pages
  const accessibleLinks = links.filter((link) => link.name != 'Login' && link.name != 'Signup' && link.name != 'ForgotPassword')
  return(
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
      <Link href="/"><PiGameControllerFill /></Link>
      <ul className='flex space-x-6'>
        {accessibleLinks.map(link => 
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