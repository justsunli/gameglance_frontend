'use client'

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { PiGameControllerFill } from "react-icons/pi";
import classnames from 'classnames';

// TODO: implement NavBar with a logo, homepage, search bar and user profile
const NavBar = () => {
  const currentPath = usePathname();
  console.log(currentPath);
  const links =[
    {name: 'Home', path: '/'},
    {name: 'Search', path: '/search'},
    {name: 'Reviews', path: '/reviews'},
    {name: 'Profile', path: '/profile'},
    {name: 'Login', path: '/login'},
    {name: 'Signup', path: '/signup'},
    {name: 'ForgotPassword', path: '/forgotpassword'}
  ]
  // Filter the links to just the ones that can be accessed via the nav bar
  // Does not include login, signup, or forgot password pages
  //const accessibleLinks = links.filter(())
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
  
    </nav>

  )
}

export default NavBar