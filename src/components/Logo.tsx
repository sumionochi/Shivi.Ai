import Link from 'next/link'
import React from 'react'
import { AspectRatio } from './ui/aspect-ratio'

type Props = {}

const Logo = (props: Props) => {
  return (
    <Link href={'/'} prefetch={false}>
        <div>
            {/* <AspectRatio ratio={16/9} className='flex items-center justify-center'>
                <p className='font-bold text-xl px-2 py-1 flex flex-row gap-2 text-grad'>
                    Tele Health.AI
                </p>
            </AspectRatio> */}
            <p className='font-bold text-2xl text-white px-2 py-1 flex flex-row gap-2 text-grad'>
                Shivi.Ai
            </p>
        </div>
    </Link>
  )
}

export default Logo