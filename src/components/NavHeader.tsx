import React from 'react'

import Link from 'next/link'
import { MessageSquareIcon } from 'lucide-react'
import { Button } from './ui/button'
import { Themetoggle } from './ui/Themetoggle'
import Logo from './Logo'
import { UserButton, auth } from '@clerk/nextjs'

type Props = {}

const NavHeader = async (props: Props) => {
  const {userId} = auth();
  console.log()
  return (
    <header className='sticky top-0 z-50 backdrop-blur-sm mx-auto'>
      <nav className='flex max-w-7xl gap-2 flex-col sm:flex-row items-center p-5 pl-2 bg-none mx-auto'>
        <Logo/>
        <div className='flex-1 flex items-center justify-end space-x-4'>
          <div className='flex gap-4 bg-secondary p-2 rounded-lg'>
            {userId &&
              <div className='flex flex-row gap-4'> 
                <UserButton afterSignOutUrl='/' appearance={{elements:{avatarBox:{width:'2.5rem', height:"2.5rem"}}}}/>
                <Button>Add Event</Button>
              </div>
            }
            <Themetoggle/>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default NavHeader