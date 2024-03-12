'use client'

import React, {useEffect, useState} from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { PiGameControllerFill } from "react-icons/pi";
import classnames from 'classnames';
import SearchBar from './components/SearchBar';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './components/firebase';

// TODO: implement NavBar with a logo, homepage, search bar and user profile
const NavBar = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);;
  const currentPath = usePathname();
  const links =[
    {name: 'Home', path: '/'},
    {name: 'Profile', path: '/profile'},
    {name: 'Signup', path: '/signup'},
    {name: 'ForgotPassword', path: '/forgotpassword'}
  ]
  // Filter the links to just the ones that can be accessed via the nav bar
  // Does not include login, signup, or forgot password pages
  const accessibleLinks = links.filter((link) => link.name != 'Signup' && link.name != 'ForgotPassword')

  // check if the user is signed in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged( auth, (user) => {
      setIsSignedIn(!!user);
      setUserEmail(user ? user.email : null);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("user signed out");
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  return(
    <nav className='flex justify-between items-center border-b mb-5 px-5 h-14'>
      <div className='flex space-x-6'>
        <Link href="/"><PiGameControllerFill /></Link>
        {accessibleLinks.map(link => 
        <Link key={link.path} 
        className={classnames({
          'text-zinc-900': currentPath === link.path,
          'text-zinc-500': currentPath !== link.path,
          'hover:text-zinc-800 transition-colors': true
        })}
        href={link.path}>{link.name}
        </Link>)}
        <SearchBar />
      </div>
      <div className='flex space-x-6'>
        {isSignedIn && <div>{userEmail}</div>}
        {isSignedIn ? <button onClick={handleLogout}>Logout</button> : <Link href="/login">Login</Link>}
      </div>
    </nav>

  )
}

export default NavBar