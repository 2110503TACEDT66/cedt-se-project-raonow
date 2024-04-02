import React, { useState, useEffect } from 'react';

const ImageComponent: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
  const [imageData, setImageData] = useState<string | null>(null);

  useEffect(() => {
    const getImageData = async () => {
      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          const imageDataString = reader.result as string;
          setImageData(imageDataString);
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    getImageData();
  }, [imageUrl]);

  return (
    <div>
      {imageData ? (
        <img src={imageData} alt="Google Drive Image" />
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
};

export default ImageComponent;
