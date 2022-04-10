/** @format */

import type { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { useAddress, useDisconnect, useMetamask, useNFTDrop } from '@thirdweb-dev/react';
import { sanityClient, urlFor } from '../../sanity';
import { Collection } from '../../typings';
import Link from 'next/link';
import { BigNumber } from 'ethers';
import toast, { Toaster } from 'react-hot-toast';

interface Props {
  collection: Collection;
}

const NFTDropPage = ({ collection }: Props) => {
  const [claimedSupply, setClaimedSupply] = useState<number>(0);
  const [totalSupply, setTotalSupply] = useState<BigNumber>();
  const [price, setPrice] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const nftDrop = useNFTDrop(collection?.address);

  const connectWithMetamask = useMetamask();
  const disConnect = useDisconnect();
  const address = useAddress();

  useEffect(() => {
    if (!nftDrop) return;
    const fetchPrice = async () => {
      const claimConditions = await nftDrop.claimConditions.getAll();
      setPrice(claimConditions?.[0].currencyMetadata.displayValue);
    };
    fetchPrice();
  }, [nftDrop]);

  useEffect(() => {
    if (!nftDrop) return;
    const fetchNFTDropData = async () => {
      setLoading(true);
      const claimed = await nftDrop.getAllClaimed();
      const total = await nftDrop.totalSupply();

      setClaimedSupply(claimed.length);
      setTotalSupply(total);

      setLoading(false);
    };
    fetchNFTDropData();
  }, [nftDrop]);

  const mintNFT = () => {
    if (!nftDrop || !address) return;
    const quantity = 1; // how many unique NFTs to mint
    setLoading(true);
    const notification = toast.loading('Minting NFTs...', {
      style: {
        background: 'white',
        color: 'green',
        fontWeight: 'bolder',
        fontSize: '17px',
        padding: '20px',
      },
    });

    nftDrop
      .claimTo(address, quantity)
      .then(async tx => {
        const receipt = tx[0].receipt;
        const claimedTokenId = tx[0].id;
        const claimedNFT = await tx[0].data();

        toast('NFT minted!👍🏻', {
          duration: 8000,
          style: {
            background: 'white',
            color: 'green',
            fontWeight: 'bolder',
            fontSize: '17px',
            padding: '20px',
          },
        });
        console.log('claimedNFT', claimedNFT);
        console.log('claimedTokenId', claimedTokenId);
        console.log('receipt', receipt);
      })
      .catch(err => {
        toast.error('Something went wrong!', {
          style: {
            background: 'red',
            color: 'white',
            fontWeight: 'bolder',
            fontSize: '17px',
            padding: '20px',
          },
        });
        console.log('error', err.message);
      })
      .finally(() => {
        setLoading(false);
        toast.dismiss(notification);
      });
  };

  return (
    <div className='lg:flex h-screen flex-col grid grid-cols-10 '>
      <Toaster position='top-center' />
      {/* Left */}
      <div className='bg-gradient-to-br from-cyan-800 to-rose-500 col-span-4 lg:col-span-full'>
        <div className='flex flex-col items-center justify-center py-2 min-h-screen lg:min-h-fit '>
          <div className=' bg-gradient-to-br from-yellow-400 to-purple-600 p-2 rounded-xl'>
            <div className='relative md:w-44 md:h-52 h-96 w-72'>
              <Image
                src={urlFor(collection.previewImage).url()}
                alt='image'
                className='rounded-xl'
                objectFit='cover'
                layout='fill'
              />
            </div>
          </div>
          <div className='text-center p-5 space-y-2'>
            <h1 className='text-4xl font-bold text-white'>{collection.nftCollectionName}</h1>
            <h2 className='text-xl text-gray-300'>{collection.description}</h2>
          </div>
        </div>
      </div>
      {/* Right */}
      <div className='col-span-6 flex flex-1 flex-col p-12 lg:col-auto lg:p-6'>
        {/* Header */}
        <header className='flex items-center justify-between '>
          <Link href='/' passHref>
            <h1 className='w-fit cursor-pointer text-4xl font-extralight mr-2'>
              THE <span className='font-extrabold decoration-pink-600/50 underline'>HAOHAO</span>{' '}
              NFT Market Place
            </h1>
          </Link>
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
                src={urlFor(collection.mainImage).url()}
                alt='bg-image'
                className='rounded-xl'
                objectFit='contain'
                layout='fill'
              />
            </div>
          </div>
          <h1 className='text-5xl lg:text-3xl font-extrabold lg:font-bold'>{collection.title}</h1>
          {loading ? (
            <p className='pt-4 text-xl text-rose-600 animate-bounce'>Loading Supply Count ...</p>
          ) : (
            <p className='pt-2 text-xl text-green-500'>
              {claimedSupply} / {totalSupply?.toString()} NFT&apos;s claimed
            </p>
          )}
          {loading && (
            <div className='relative w-80 h-40'>
              <Image
                src='https://cdn.hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif'
                alt=''
                layout='fill'
                objectFit='contain'
              />
            </div>
          )}
        </div>
        {/* Mint Button */}
        <button
          className='mt-10 w-full rounded-full bg-red-500 text-white p-4 disabled:bg-gray-500/50'
          disabled={loading || claimedSupply === totalSupply?.toNumber() || !address}
          onClick={mintNFT}>
          {loading ? (
            'Loading'
          ) : claimedSupply === totalSupply?.toNumber() ? (
            'SOLD OUT'
          ) : !address ? (
            'Sign In to Mint'
          ) : (
            <span className='font-bold'>Mint NFT ({price} ETH)</span>
          )}
        </button>
      </div>
    </div>
  );
};
export default NFTDropPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const query = `*[_type == "collection" && slug.current == $id][0] {
  _id,
  title,
  address,
  description,
  nftCollectionName,
  mainImage {
    asset
  },
  previewImage {
    asset
  },
  slug{
    current
  },
  creator-> {
    _id,
    name,
    address,
    slug {
      current
    }
  }
}`;

  const collection = await sanityClient.fetch(query, {
    id: params?.id,
  });

  if (!collection) {
    return {
      notFound: true,
    };
  }
  return {
    props: { collection },
  };
};
