import React from 'react';
import { Button, Grid } from '@radix-ui/themes';
import Link from 'next/link';
import GameCard from '@/app/reviews/[id]/GameCard';
import ReviewCard from '@/app/components/ReviewCard';


export async function generateStaticParams() {
  const games = await fetch(`${process.env.BACKEND_URL}/game/getGames?num_games=400`).then((res) => res.json());
  return games.map((game: any) => ({
    id: game.id.toString(),
  }))
}

export default function ReviewDetailPage({ params }: any) {
  const { id } = params;
  return (
    <Grid columns={{ initial: '1', md: '2' }} gap="3" width="auto" style={{ gridTemplateColumns: '1fr 2fr', gap: '20px', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0 }}>
        <GameCard game_id={id} />
      </div>
      <div  style={{ textAlign: 'right'}}>
        <Link href='/reviews/${game_id}/new'>
            <Button style={{ width: 'auto', marginBottom: '20px' }}>Add Review</Button>
        </Link>
        <ReviewCard gameName={"Among Us"}/>
      </div>
    </Grid>
  );
};

// export default ReviewDetailPage;