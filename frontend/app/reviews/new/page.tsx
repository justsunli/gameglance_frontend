'use client'

import React, { useState} from 'react';
import { Button, TextArea, Callout, TextField } from '@radix-ui/themes';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Ratings } from '../../components/Ratings';
import {RatingSlider} from '../../components/RatingSlider';

interface ReviewForm{
  description: string;
  rating: number;
}

const NewReviewPage = () => {

  const router = useRouter();
  // handle the form submission
  const {register, handleSubmit, setValue} = useForm<ReviewForm>();
  const [error, setError] = useState('');
  const [currentRating, setCurrentRating] = useState(0); // keep track of the current rating


  const handleRatingChange = (newRating: number | number []) => {
    if (Array.isArray(newRating)) {
      newRating = newRating[0];
    }
    setValue('rating', newRating);
    setCurrentRating(newRating);
  };

  return(
    <div className='max-w-xl'>
      {error && <Callout.Root color = "red" className='mb-5'>
        <Callout.Text>{error}</Callout.Text>
        </Callout.Root>}
    
      <form className='max-w-xl space-y-3' 
      onSubmit={handleSubmit(async (data) => {
        try {
          const response = await axios.post('/api/reviews', data);
          console.log(response.data);
          router.push('/reviews');
          
        } catch (error) {
          // console.log(error);
          setError('An error occurred');
        }
      })}>

          <div className='flex items-center'>
          <RatingSlider defaultValue={[0]} max={100} step={5} onValueChange={handleRatingChange} />
          <span className='ml-2'>{currentRating}</span> 
        </div>
          <TextArea placeholder='Input your review here' {...register('description')}/>
          
          <Button>Post</Button>
      
      </form>
    </div>
  )
}

export default NewReviewPage