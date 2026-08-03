import { ArrowRight, HeartHandshake, Package, ShieldCheck, Star, Truck, UsersRound, Zap } from 'lucide-react'
import React from 'react';
import Footer from './Footer'
import { useNavigate } from 'react-router';

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#0d0d0d] z-0">
      <div className="pt-30 flex flex-col justify-center-safe items-center-safe border-b border-b-gray-500">
        <div className="bg-[#c8f400] p-2 max-w-min rounded-3xl animate-[bounce_3.5s_ease-out_infinite]">
          <Zap size={38} />
        </div>
        <h1 className='text-5xl md:text-6xl my-2 font-semibold text-white'>About <span className='text-[#c8f400]'>SkyMart</span></h1>
        <p className='text-gray-500/70 text-lg text-center'>SkyMart is a next-generation e-commerce platform built to make online</p>
        <p className='text-gray-500/70 text-lg text-center'>shopping fast, fair, and enjoyable — for everyone.</p>
        <div className='grid md:flex items-center-safe md:justify-around w-[80%] gap-4 my-10 text-white'>
          <div className='border border-white w-full px-10 py-5 rounded-xl flex flex-col justify-center-safe items-center-safe'>
            <Package className='text-[#c8f400]' size={20}/>
            <p className='my-1 text-2xl font-bold'>20K+</p>
            <p className='text-gray-300/30 font-semibold text-sm capitalize'>products</p>
          </div>
          <div className='border border-white w-full px-10 py-5 rounded-xl flex flex-col justify-center-safe items-center-safe'>
            <UsersRound className='text-[#c8f400]' size={20}/>
            <p className='my-1 text-2xl font-bold'>50K+</p>
            <p className='text-gray-300/30 font-semibold text-sm capitalize'>happy customers</p>
          </div>
          <div className='border border-white w-full px-10 py-5 rounded-xl flex flex-col justify-center-safe items-center-safe'>
            <Star className='text-[#c8f400]' size={20}/>
            <p className='my-1 text-2xl font-bold'>4.9</p>
            <p className='text-gray-300/30 font-semibold text-sm capitalize'>avg. rating</p>
          </div>
          <div className='border px-10 py-5 border-white w-full rounded-xl flex flex-col justify-center-safe items-center-safe'>
            <Truck className='text-[#c8f400]' size={20}/>
            <p className='my-1 text-2xl font-bold'>99%</p>
            <p className='text-gray-300/30 font-semibold text-sm capitalize'>on-time delivery</p>
          </div>
        </div>
        <div className='border border-white w-[80%] rounded-3xl p-10 text-white'>
          <h1 className='text-3xl mb-2 capitalize'>our story</h1>
          <p className='text-gray-200/30 '>SkyMart started in 2022 as a small side project — two engineers tired of bloated, slow e-commerce experiences. We asked ourselves: what if shopping online was actually enjoyable?</p>
          <p className='text-gray-200/30 my-3'>Three years later, SkyMart serves over 50,000 customers across the country. We stock electronics, fashion, jewelry, and everyday essentials — all at prices that don't require a second mortgage.</p>
          <p className='text-gray-200/30 '>We're still the same team at heart: obsessed with speed, transparency, and making you feel good about every purchase you make here.</p>
        </div>
        <div>
          <h1 className='text-white mt-10 font-semibold text-4xl text-center'>What We Stand For</h1>
          <div className='text-white my-5 grid md:grid-cols-2 gap-5 w-[85%] mx-auto'>
            <div className='border rounded-2xl p-7 flex gap-3 hover:border-[#323b0a]'>
              <div className='bg-[#c8f400]/10 p-2 max-h-min rounded-xl'>
                <ShieldCheck className='text-[#c8f400]' size={18}/>
              </div>
              <div>
                <h1 className='text-xl font-semibold'>Trust</h1>
                <p className='text-gray-300/30 text-md'>Every product is verified for quality and authenticity before listing.</p>
              </div>
            </div>
            <div className='border rounded-2xl p-7 flex gap-3 hover:border-[#323b0a]'>
              <div className='bg-[#c8f400]/10 p-2 max-h-min rounded-xl'>
                <Truck className='text-[#c8f400]' size={18}/>
              </div>
              <div>
                <h1 className='text-xl font-semibold'>Speed</h1>
                <p className='text-gray-300/30 text-md'>We obsess over delivery times so your orders arrive when promised.</p>
              </div>
            </div>
            <div className='border rounded-2xl p-7 flex gap-3 hover:border-[#323b0a]'>
              <div className='bg-[#c8f400]/10 p-2 max-h-min rounded-xl'>
                <HeartHandshake className='text-[#c8f400]' size={18}/>
              </div>
              <div>
                <h1 className='text-xl font-semibold'>Community</h1>
                <p className='text-gray-300/30 text-md'>Built around real customer feedback, not just business metrics.</p>
              </div>
            </div>
            <div className='border rounded-2xl p-7 flex gap-3 hover:border-[#323b0a]'>
              <div className='bg-[#c8f400]/10 p-2 max-h-min rounded-xl'>
                <Star className='text-[#c8f400]' size={18}/>
              </div>
              <div>
                <h1 className='text-xl font-semibold'>Quality</h1>
                <p className='text-gray-300/30 text-md'>We curate the best — no filler, no junk, just great products.</p>
              </div>
            </div>
          </div>
        </div>
        <div className='w-[85%] md:w-[80%]'>
          <h1 className='text-white mt-10 font-semibold text-4xl text-center'>Meet the Team</h1>
          <div className='mt-5 grid md:flex gap-5 text-white md:justify-between'>
            <div className='border p-5 flex flex-col rounded-2xl w-full justify-center-safe items-center-safe'>
              <div className='bg-[#c8f400] text-black py-2 px-4 mb-2 font-semibold rounded-2xl text-2xl'>
                <p>A</p>
              </div>
              <p className='font-semibold text-lg'>Aryan Shah</p>
              <p className='text-gray-200/30 text-sm'>Founder & CEO</p>
            </div>
            <div className='border p-5 flex flex-col rounded-2xl w-full justify-center-safe items-center-safe'>
              <div className='bg-[#3b82f6] py-2 px-4 mb-2 font-semibold rounded-2xl text-2xl'>
                <p>P</p>
              </div>
              <p className='font-semibold text-lg'>Priya Mehta</p>
              <p className='text-gray-200/30 text-sm'>Head of Product</p>
            </div>
            <div className='border p-5 flex flex-col rounded-2xl w-full justify-center-safe items-center-safe'>
              <div className='bg-[#a855f7] py-2 px-4 mb-2 font-semibold rounded-2xl text-2xl'>
                <p>R</p>
              </div>
              <p className='font-semibold text-lg'>Rohan Verma</p>
              <p className='text-gray-200/30 text-sm'>Lead Engineer</p>
            </div>
            <div className='border p-5 flex flex-col rounded-2xl w-full justify-center-safe items-center-safe'>
              <div className='bg-[#f43f5e] py-2 px-4 mb-2 font-semibold rounded-2xl text-2xl'>
                <p>S</p>
              </div>
              <p className='font-semibold text-lg'>Sneha Kapoor</p>
              <p className='text-gray-200/30 text-sm'>Design Director</p>
            </div>
          </div>
        </div>
        <div className='border border-[#323b0a] flex flex-col items-center-safe rounded-3xl my-10 md:w-[80%]'>
          <h1 className='text-white py-5 font-semibold text-4xl text-center'>Ready to shop?</h1>
          <p className='text-gray-200/30'>Explore thousands of products at unbeatable prices.</p>
          <button onClick={()=>navigate("/products")} className='bg-[#c4f800] flex cursor-pointer active:scale-95 justify-center-safe items-center-safe capitalize my-5 px-10 py-4 rounded-2xl font-semibold'>browse products <ArrowRight size={20}/></button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default About
