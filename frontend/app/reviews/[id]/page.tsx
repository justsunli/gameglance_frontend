import React from 'react';
import { Button, Grid } from '@radix-ui/themes';
import Link from 'next/link';
import GameCard from '@/app/reviews/[id]/GameCard';
import ReviewCard from '@/app/components/ReviewCard';
import NewReview from './NewReview';
export async function generateStaticParams() {
  const games = await fetch(`${process.env.BACKEND_URL}/game/getGames`).then((res) => res.json());
  return games.map((game: any) => ({
    id: game.id.toString(),
  }))
}

export default function ReviewDetailPage({ params }: any) {
  const { id } = params;
  return (
    // <Grid columns={{ initial: '1', md: '2' }} gap="3" width="auto" style={{ gridTemplateColumns: '1fr 2fr', gap: '20px', position: 'relative' }}>
    //   <div style={{ position: 'sticky', top: 0 }}>
    //     <GameCard game_id={id} />
    //   </div>
    //   <div  style={{ textAlign: 'right'}}>
    //     <NewReview/>
    //     <ReviewCard game_id={id}/>
    //   </div>
    // </Grid>
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

      <div style={{ flex: 1 }}>

        <GameCard game_id={id} />
      </div>
        
      <div style={{ flex: 2, display:'flex', justifyContent:'center' }}>
        <div style={{width:'80%'}}>
          <NewReview game_id={id} />
          <ReviewCard game_id={id} />

        </div>
      
      </div>
    </div>
  );
};

// export default ReviewDetailPage;