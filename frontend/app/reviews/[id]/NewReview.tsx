'use client'

import React, { useState, useEffect } from 'react';
import { Button, TextArea, Callout } from '@radix-ui/themes';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Ratings } from '../../components/Ratings';
import { RatingSlider } from '@/app/components/RatingSlider';
import { auth } from '../../components/firebase';

interface ReviewForm{
  user_id: number;
  game_id: number;
  review: string;
  rating: number;
}

interface GameID {
  game_id: number | undefined;
}

// interface NewReviewProps extends GameID {
//   onNewReview: () => void;
// }

const NewReview = (props: GameID) => {

  // console.log('gameId:', props.game_id);
  // const router = useRouter();

  // handle the form submission
  const {register, handleSubmit, setValue, reset} = useForm<ReviewForm>();
  const [error, setError] = useState('');
  const [currentRating, setCurrentRating] = useState(0); // keep track of the current rating
  const [key, setKey] = useState(0);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (props.game_id !== undefined) {
      setValue('game_id', props.game_id);
    }

    const fetchUserId = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          console.log('user:', user.email)
          const response = await axios.get(`${process.env.BACKEND_URL}/user/email/${user.email}`);
          console.log('user id:', response.data.id);
          setValue('user_id', response.data.id);
        }
      } catch (error) {
        console.error('Error fetching user ID', error);
      }
    };

    fetchUserId();
  }, [props.game_id, setValue]);

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
          data.game_id = Number(data.game_id);
          console.log(data);
          const response = await axios.post(`${process.env.BACKEND_URL}/review/addReview`, data);
          console.log(response);
          reset();
          setCurrentRating(0);
          setKey(prevKey => prevKey + 1)
          // props.onNewReview(); // trigger a re-fetch of the reviews
          
        } catch (error) {
          setError('An error occurred');
        }
      })}>

          <div className='flex items-center'>
          <RatingSlider key={key} defaultValue={[0]} max={100} step={5} onValueChange={handleRatingChange} />
          <span className='ml-2'>{currentRating}</span> 
        </div>
          <TextArea placeholder='Input your review here' {...register('review')}/>
          
          <Button>Post</Button>
      
      </form>
    </div>
  )
}

export default NewReview