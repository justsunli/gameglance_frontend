import React from 'react';
import { Card, Inset, Text, Strong, Badge } from '@radix-ui/themes'; 
import { type } from 'os';

interface InfoCardProps {
  id: string;
  imageLink: string;
  title: string;
  badgeText: string;
}

const InfoCard = (props: InfoCardProps) => {
  return (
    <Card size="2" style={{ maxWidth: 250, maxHeight: 320 }}>
      <Inset clip="padding-box" side="top" pb="current" style={{ height: 280 }}>
        <img
          src={props.imageLink}
          alt={props.title}
          style={{
            display: 'block',
            objectFit: 'cover',
            width: '100%',
            height: 280
          }}
        />
      </Inset>
      <Text as="p" size="6" style={{ position: 'absolute', top: '10px', left: '10px' }}>
        <Strong style={{color: 'white'}}>{props.title}</Strong>
      </Text>
      <div style={{paddingTop: '5px'}}>
        <Badge>{props.badgeText}</Badge>
      </div>
    </Card>
  );
};

export default InfoCard;