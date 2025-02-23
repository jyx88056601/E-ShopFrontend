import {
  VStack,
  Box,
  Badge,
  Heading,
  Button,
  Card,
  HStack,
} from '@chakra-ui/react';
import AddToCartButton from './AddToCartButton';
import { useState } from 'react';
type DescriptionDisplayProps = {
  name: string | undefined;
  price: string | undefined;
  stock: string | undefined;
  category: string | undefined;
  id: string;
  description: string | undefined;
};

const DescriptionDisplay = (
  descriptionDisplayProps: DescriptionDisplayProps
) => {
  const [count, setCount] = useState(1);

  return (
    <VStack pt={'20px'} pl={'5px'}>
      <Box textAlign="left">
        <Box>
          <Heading> {descriptionDisplayProps.name}</Heading>
        </Box>
        <Box pt={'15px'}>
          <Heading colorScheme="white" size={'md'}>
            {'Price : $' + descriptionDisplayProps.price}{' '}
          </Heading>
          <HStack pt={'20px'}>
            <Box>
              <Badge colorScheme="green">
                {descriptionDisplayProps.stock + ' in stock'}
              </Badge>
            </Box>
            <Box>
              <Button
                size={'sm'}
                onClick={() => setCount((prev) => Math.max(prev - 1, 1))}
              >
                -
              </Button>
              <Badge fontSize={'xl'} color={'green.500'}>
                {count}
              </Badge>
              <Button
                size={'sm'}
                onClick={() =>
                  setCount((prev) =>
                    Math.min(prev + 1, Number(descriptionDisplayProps.stock))
                  )
                }
              >
                +
              </Button>
            </Box>
          </HStack>
          <Box pt={'15px'}>
            <AddToCartButton
              count={count}
              product_id={descriptionDisplayProps.id}
            ></AddToCartButton>
          </Box>

          <Box pt={'20px'}>
            <Badge color={'whiteAlpha.900'}>Product Detail :</Badge>
          </Box>

          <Card pt={'10px'} width={'400px'}>
            {descriptionDisplayProps.description}
          </Card>
        </Box>
      </Box>
    </VStack>
  );
};

export default DescriptionDisplay;
