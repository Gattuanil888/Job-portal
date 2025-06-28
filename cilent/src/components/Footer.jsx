import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='container px-4 2xl:px mx-auto flex items-center justify-between gap-4 py-3 mt-20'>
      <img width ={160}src={assets.logo} alt="" />
      <p className='flex border border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden'>Copyright @Insider.dev |All Right reserved.</p>
      <div className='flex gap- 3.4'>
        <img width ={40} src={assets.facebook_icon} alt="" />
        <img width ={40} src={assets.twitter_icon} alt="" />
        <img width ={40} src={assets.instagram_icon} alt="" />
      </div>
    </div>
  )

}

export default Footer
