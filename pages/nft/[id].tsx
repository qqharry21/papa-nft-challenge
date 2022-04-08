/** @format */

import type { NextPage } from 'next';
import Image from 'next/image';
import React from 'react';

import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react';

const NFTDropPage: NextPage = () => {
  // get a function to connect to a particular wallet
  // options: useMetamask() - useCoinbase() - useWalletConnect()
  const connectWithMetamask = useMetamask();
  const disConnect = useDisconnect();
  // once connected, you can get the connected wallet information from anywhere (address, signer)
  const address = useAddress();

  return (
    <div className='lg:flex h-screen flex-col grid grid-cols-10 '>
      {/* Left */}
      <div className='bg-gradient-to-br from-cyan-800 to-rose-500 col-span-4 lg:col-span-full'>
        <div className='flex flex-col items-center justify-center py-2 min-h-screen lg:min-h-fit '>
          <div className=' bg-gradient-to-br from-yellow-400 to-purple-600 p-2 rounded-xl'>
            <div className='relative md:w-44 md:h-52 h-96 w-72'>
              <Image
                src='https://links.papareact.com/8sg'
                alt='image'
                className='rounded-xl'
                objectFit='cover'
                layout='fill'
              />
            </div>
          </div>
          <div className='text-center p-5 space-y-2'>
            <h1 className='text-4xl font-bold text-white'>PAPAFAM</h1>
            <h2 className='text-xl text-gray-300'>
              A collection of PAPAFAM APes who live & breathe React!
            </h2>
          </div>
        </div>
      </div>
      {/* Right */}
      <div className='col-span-6 flex flex-1 flex-col p-12 lg:col-auto lg:p-6'>
        {/* Header */}
        <header className='flex items-center justify-between '>
          <h1 className='w-fit cursor-pointer text-4xl font-extralight mr-2'>
            THE <span className='font-extrabold decoration-pink-600/50 underline'>PAPAFAM</span> NFT
            Market Place
          </h1>
          {address ? (
            <button
              className='rounded-full bg-rose-500 text-base lg:text-xs font-bold text-white px-5 py-3 lg:px-4 lg:py-2 min-w-fit'
              onClick={disConnect}>
              Sign Out
            </button>
          ) : (
            <button
              className='rounded-full bg-rose-500 text-base lg:text-xs font-bold text-white px-5 py-3 lg:px-4 lg:py-2 min-w-fit'
              onClick={connectWithMetamask}>
              Sign In
            </button>
          )}
        </header>

        <hr className='my-2 border' />

        {/* Connected Message */}
        {address && (
          <div className='flex justify-center text-rose-500'>
            Connected as {address.substring(0, 5)}...{address.substring(address.length - 5)}
          </div>
        )}

        {/* Content */}
        <div className='mt-10 flex flex-1 flex-col items-center text-center space-y-0 lg:space-y-6 justify-center lg:justify-start'>
          <div className='pb-10 lg:w-full'>
            <div className='relative w-80 h-40 lg:w-full'>
              <Image
                src='https://links.papareact.com/bdy'
                alt='bg-image'
                className='rounded-xl'
                objectFit='cover'
                layout='fill'
              />
            </div>
          </div>
          <h1 className='text-5xl lg:text-3xl font-extrabold lg:font-bold'>
            The PAPAFAM Ape Coding Club | NFT Drop
          </h1>
          <p className='pt-2 text-xl text-green-500'>1 / 100 NFT&apos;s claimed</p>
        </div>
        {/* Mint Button */}
        <button className='mt-10 w-full rounded-full bg-red-500 text-white p-4'>Mint NFT</button>
      </div>
    </div>
  );
};
export default NFTDropPage;
