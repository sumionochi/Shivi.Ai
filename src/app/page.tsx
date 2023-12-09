import { Button } from '@/components/ui/button'
import { Doctor, Health } from '@/resources'
import { ArrowRight, ArrowUpRight, BookText, BotIcon, Github, Key, Linkedin, Lock, Mail, ScrollText, Text } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='flex relative overflow-hidden antialiased min-h-screen flex-col items-center justify-between pt-0'>
        <div className='flex flex-col items-center min-h-screen pt-10 sm:pt-26'>
          <div className='flex text-white p-6 sm:p-10 pb-0 mb-10 rounded-xl gap-8 flex-col max-w-5xl'>
            <h1 className='text-center font-semibold text-3xl md:text-5xl xl:text-6xl'>
              Track your Migraines, Help Doctors Find A Cure.
            </h1>
            <h2 className='text-center text-xl'>              
              Access timely medical assistance by recording major health events seamlessly. Get right level of <span className='text-purple-900 dark:text-purple-300'>medical expertise with the insights of AI.</span>
            </h2>
          </div>
          <div className='flex flex-col md:flex-row items-center'>
            <div className='relative mb-6 sm:mb-0'>
              <Doctor className="text-[20rem] p-0 m-0 sm:text-[30rem]"/>
              <Button className='p-6 hover:bg-gradient-to-r hover:from-indigo-400/90 hover:to-purple-500/90 absolute bottom-4 sm:bottom-11 left-1/2 transform -translate-x-1/2 text-center shadow-md shadow-black border-none bg-gradient-to-r from-indigo-400 to-purple-500 border text-white rounded-xl'>
                <Lock className='mr-2 w-5'/>
                Let's Get The Right Diagnosis
              </Button>
            </div>
            <div className='grid md:py-28 mx-auto text-white max-w-7xl gap-4 place-items-center m-0 lg:grid-cols-2 grid-cols-1'>
              <Button className='p-6 shadow-md shadow-black border-none bg-gradient-to-r from-indigo-400 to-purple-500 text-white rounded-xl'>
                <Text className='mr-2 w-5'/>
                Multi Lingual Translation
              </Button>
              <Button className='p-6 shadow-md shadow-black border-none bg-gradient-to-r from-indigo-400 to-purple-500 border text-white rounded-xl'>
                <Lock className='mr-2 w-5'/>
                Secure Chatroom Authentication
              </Button>
              <Button className='p-6 shadow-md shadow-black border-none bg-gradient-to-r from-indigo-400 to-purple-500 border text-white rounded-xl'>
                <Key className='mr-2 w-5'/>
                User Access Levels
              </Button>
              <Button className='p-6 shadow-md shadow-black border-none bg-gradient-to-r from-indigo-400 to-purple-500 border text-white rounded-xl'>
                <ScrollText className='mr-2 w-5'/>
                AI Summarization
              </Button>
              <Button className='p-6 shadow-md shadow-black border-none bg-gradient-to-r from-indigo-400 to-purple-500 border text-white rounded-xl'>
                <BookText className='mr-2 w-5'/>
                Smart Diary
              </Button>
              <Button className='p-6 shadow-md shadow-black border-none bg-gradient-to-r from-indigo-400 to-purple-500 border text-white rounded-xl'>
                <BotIcon className='mr-2 w-5'/>
                Virtual Physician with memory
              </Button>
            </div>  
          </div>        
          <div className='flex text-center p-4 pb-28 pt-0 items-center flex-col gap-4'>
            <h1 className='text-white px-4 text-xl mt-20'>“Love how the app is so secure, personalized and transparent. Made healthcare more accessible.”</h1>
            <img src="https://avatars.githubusercontent.com/u/89721628?v=4" className='w-14 h-14 rounded-full border-2 border-white' />
            <Link href={'https://www.linkedin.com/in/aaditya-srivastava-b4564821b/'}>
            <h2 className='text-white text-md underline underline-offset-2'>Aaditya Srivastava</h2>
            </Link>
          </div>
        </div>
        <div className='flex px-4 pt-1 bg-white/20 text-white justify-between gap-4 flex-row items-center text-primary h-14 absolute bottom-0 w-full'>
        <h2 className='text-white'>© 2023 Shivi.Ai by Khyal.AI</h2>
        <div className='flex flex-row gap-4 justify-center items-center'>
          <Link href={'https://github.com/sumionochi'}>
            <Github/>
          </Link>
          <Link href={'https://www.linkedin.com/in/aaditya-srivastava-b4564821b/'}>
            <Linkedin/>
          </Link>
          <Link href={'mailto:aaditya.srivastava.connect@gmail.com'}>
            <Mail/>
          </Link>
          <Link href={'https://sumionochi.github.io/Portfolio-landing-page/'}>
            <ArrowUpRight/>
          </Link>
        </div>
        </div>
    </div>
  )
}
