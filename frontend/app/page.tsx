
'use client'
import React, { useState, useEffect } from 'react'
import SideBarGenre from './components/SideBarGenre'
import { Tabs, Card, Inset, Text, Strong, Box, Flex, Avatar, Badge } from '@radix-ui/themes';
import InfoCard from './components/InfoCard';
import Link from 'next/link';
import axios from 'axios';
import SearchBar from './components/SearchBar';
interface GameDetails {
  id: string;
  name: string;
  description: string;
  creator: string;
  genre: string;
  ai_summary: string;
  image_link: string;

}

const Home = () => {

  // const game_id = 67;

  const [games, setGames] = useState<GameDetails[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  // const [selectedTags, setSelectedTags] = useState([]); // added 
  const [selectionType, setSelectionType] = useState<string>('genre');

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(`${process.env.BACKEND_URL}/game/getGames`);
        setGames(response.data);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchGames();
  }, []);

  // Fetch games based on selected genres and tags
  useEffect(() => {
    const fetchFilteredGames = async () => {
      const endpoint = selectionType === 'genre' ? 'game/genres' : 'game/tags';
      if (selectedGenres.length > 0) {
        try {
          const params = selectionType === 'genre' ? { genres: selectedGenres.join(',') } : { tags: selectedGenres.join(',') };
          const response = await axios.get(`${process.env.BACKEND_URL}/${endpoint}`, {params});
          setGames(response.data);
        } catch (error) {
          console.error(`Error fetching filtered games by ${selectionType}:`, error);
        }
      }
    };

    fetchFilteredGames();
  }, [selectedGenres, selectionType]); 

  return (

    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <Tabs.Root defaultValue="Genres" onValueChange={setSelectionType}>
          <Tabs.List>
            <Tabs.Trigger value="Genres">Genres</Tabs.Trigger>
            <Tabs.Trigger value="Tags">Tags</Tabs.Trigger>
          </Tabs.List>

        <Box px="4" pt="3" pb="2">
          <Tabs.Content value="Genres">
            <SideBarGenre key='genre' onSubmit={setSelectedGenres} selectionType="genre"/>
          </Tabs.Content>

          <Tabs.Content value="Tags">
          <SideBarGenre key='tags' onSubmit={setSelectedGenres} selectionType="tags"/>
          </Tabs.Content>
        </Box>
        </Tabs.Root>
        
      </div>

      <div style={{ flex: 3, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
      {Array.isArray(games) ? games.map(game => (
      <Link key={game.id} href={`/reviews/${game.id}`}>
        <InfoCard 
          id={game.id}
          imageLink={game.image_link} 
          title={game.name} 
          badgeText={game.genre} 
        />
      </Link>
    )) : <p>No games found.</p>}
      </div>
    </div>
  );
};

export default Home;