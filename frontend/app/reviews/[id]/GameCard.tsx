'use client'

import React, {useState, useEffect} from 'react';
import { Card, Inset, Text, Strong, Box, Flex, Avatar, Badge } from '@radix-ui/themes';
import ProgressBar from '../../components/ProgressBar';
import axios from 'axios';
import styled from 'styled-components';

interface GameID {
  game_id: string | undefined;
}

interface GameDetails {
  name: string;
  description: string;
  creator: string;
  genre: string;
  ai_summary: string;
  image_link: string;
}

interface GameDetail {
  title: string;
  detail: string;
}

const GameDetail = (props: GameDetail) => (
  <div style={{ padding: '10px 0'}}>
    <Text as="div" size="3" weight="bold">{props.title}</Text>
    <Text as="div" size="2" color="gray">{props.detail}</Text>
  </div>
);

const GameCard = (props: GameID) => {
  const [gameDetail, setGameDetail] = useState<GameDetails>();

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await axios.get(`${process.env.BACKEND_URL}/game/${props.game_id}`);
        console.log(response.data);
        setGameDetail(response.data);
      } catch (error) {
        console.error('Error fetching game details: ', error);
      }
    };

    fetchGameDetails();
  }, [props.game_id]);

  if (!gameDetail) {
    return <div>Loading...</div>;
  }

  // const [gameDetail] = gameDetails;
  const gameDetailItems = [
    { title: "Game Description", detail: gameDetail.description },
    { title: "Game Designer", detail: gameDetail.creator },  ];

  const progressBarItems = [
    { ratingText: "Overall Rating", initialValue: 13, finalValue: 10 },
    { ratingText: "Gameplay Rating", initialValue: 13, finalValue: 90 },
    // Add more items as needed
  ];

  return (
    <div style={{ display: 'grid', gap:'20px' }}>
      <Card size="2" style={{ height: '150px' }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'space-around', height: ' 100%'}}>
          <div style={{ flex: 1, position: 'relative' }}> 
            <Inset clip="padding-box" side="left">
              <img
                src={gameDetail.image_link}
                alt={`${gameDetail.name} cover`}
                style={{
                  display: 'block',
                  objectFit: 'contain',
                  maxWidth: '100%',
                  maxHeight: '100%',
                }}
              />
            </Inset>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}> 
            <Text as="p" size="3" style={{paddingBottom:'5px', margin:0, fontSize:'1.2rem'}}>
              <Strong>{gameDetail.name}</Strong>
            </Text>
            <Badge>{gameDetail.genre}</Badge>
          </div>
        </div>
      </Card>
  
      <Card size="2">
        <Box>
          {gameDetailItems.map((item, index) => (
            <GameDetail key={index} title={item.title} detail={item.detail} />
          ))}
        </Box>
      </Card>

      <Card size="2">
        <Box>
          <GameDetail title="AI Summary" detail={gameDetail.ai_summary} />
        </Box>
      </Card>

      {progressBarItems.map((item, index) => (
        <Card size="2" key={index}>
          <div>
            <Text as="div" size="3" weight="bold" style={{ paddingBottom: '5px' }}>
              {item.ratingText}
            </Text>
            <ProgressBar initialValue={item.initialValue} finalValue={item.finalValue}/>
          </div>
        </Card>
      ))}
    </div>
  )
}

export default GameCard;

