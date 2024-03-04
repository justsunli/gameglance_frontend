import React from 'react';
import {Button, Grid} from '@radix-ui/themes';
import Link from 'next/link';
import GameCard from '../components/GameCard';
import ReviewCard from '../components/ReviewCard';

const ReviewPage = () => {

  const game_id = 67;
  return (
    <Grid columns={{ initial: '1', md: '2' }} gap="3" width="auto" style={{ gridTemplateColumns: '1fr 2fr', gap: '20px', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0 }}>
        <GameCard game_id={game_id} />
      </div>
      <div  style={{ textAlign: 'right'}}>
        <Button style={{ width: 'auto', marginBottom: '20px' }}><Link href='/reviews/new'>Add Review</Link></Button>
        <ReviewCard gameName={`Among Us`}/>
      </div>
    </Grid>
  )
}

export default ReviewPage