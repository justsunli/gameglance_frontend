"use client"
 
import React, { useState, useEffect }  from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import Link from 'next/link';
import '../../style.css'
import axios from 'axios';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (searchQuery) {
      axios.get(`${process.env.BACKEND_URL}/game/name?name=${searchQuery}`)
        .then(response => {
          const filteredData = response.data.map((item: { id: string, name: string }) => ({
            id: item.id,
            name: item.name
          }));
          setSearchResults(filteredData.slice(0, 5));
          console.log(searchResults);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [searchQuery]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button>Search</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Search for games...</Dialog.Title>
          <fieldset className="Fieldset">
            <input 
              className="Input" 
              id="name" 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </fieldset>
          {searchResults && searchResults.map((result: { id: string, name: string }, index) => (
            <Link href={`/reviews/${result.id}`} key={index} onClick={() => setOpen(false)}>
              <div className="search-result">
                {result.name}
                <Dialog.Close/>
              </div>
            </Link>
          ))}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default SearchBar;
