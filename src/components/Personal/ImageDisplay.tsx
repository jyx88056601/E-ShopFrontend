import { Box, Image, Button, IconButton, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import 'react-horizontal-scrolling-menu/dist/styles.css'; // 引入默认样式
import React from 'react';

type ImageDisplayProps = {
  images: string[];
};

const ImageDisplay = ({ images }: ImageDisplayProps) => {
  const [mainImage, setMainImage] = useState(
    images.length > 0 ? images[0] : ''
  );

  useEffect(() => {
    if (images.length > 0) {
      setMainImage(images[0]);
    }
  }, [images]);

  return (
    <VStack pt={'20px'} pl={'5px'}>
      <Box textAlign="center">
        <Image
          src={mainImage}
          alt="Product"
          borderRadius="md"
          boxSize="600px"
          objectFit="cover"
          mb={4}
          mx="auto"
        />

        <Box position="relative" width="60%" mx="auto">
          <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
            {images.map((img, index) => (
              <Box key={index} itemID={String(index)} padding="5px">
                <Button
                  variant="ghost"
                  onClick={() => setMainImage(img)}
                  _focus={{ outline: 'none' }}
                  _hover={{ opacity: 0.7 }}
                  p={1}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${index}`}
                    boxSize="90px"
                    objectFit="cover"
                    borderRadius="md"
                    border={
                      mainImage === img
                        ? '2px solid #3182CE'
                        : '2px solid transparent'
                    }
                  />
                </Button>
              </Box>
            ))}
          </ScrollMenu>
        </Box>
      </Box>
    </VStack>
  );
};

const LeftArrow = () => {
  const { scrollPrev } = React.useContext(VisibilityContext);
  return (
    <IconButton
      aria-label="Scroll Left"
      icon={<ChevronLeftIcon boxSize={6} />}
      onClick={() => scrollPrev()}
      variant="ghost"
      position="absolute"
      left="-80px"
      top="50%"
      transform="translateY(-50%)"
    />
  );
};

const RightArrow = () => {
  const { scrollNext } = React.useContext(VisibilityContext);
  return (
    <IconButton
      aria-label="Scroll Right"
      icon={<ChevronRightIcon boxSize={6} />}
      onClick={() => scrollNext()}
      variant="ghost"
      position="absolute"
      right="-80px"
      top="50%"
      transform="translateY(-50%)"
    />
  );
};

export default ImageDisplay;
