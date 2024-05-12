import React from 'react'
// import { AdvancedImage } from '@cloudinary/react';
import { Image } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen/index';

const CloudinaryImage = ({ publicId }) => {
    const cloudinary = new Cloudinary({
      cloudName: 'dsnn6ciew',
      apiKey: '331937982392823',
      apiSecret: 'rI6NmDorHL8WhxlHVFTJXToTIDs',
    });
  
    return (
      <Image publicId={publicId} cloudinary={cloudinary} />
    );
  };
  
  export default CloudinaryImage;
