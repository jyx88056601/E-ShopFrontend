import {
  VStack,
  Box,
  Badge,
  Heading,
  Button,
  Card,
  Flex,
} from '@chakra-ui/react';
type DescriptionDisplayProps = {
  name: string | undefined;
  price: string | undefined;
  stock: string | undefined;
  category: string | undefined;
  id: string | undefined;
  description: string | undefined;
};

const DescriptionDisplay = (
  descriptionDisplayProps: DescriptionDisplayProps
) => {
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
          <Box pt={'15px'}>
            <Badge colorScheme="green">
              {descriptionDisplayProps.stock + ' in stock'}
            </Badge>
          </Box>
          <Box pt={'15px'}>
            <Button color={'whiteAlpha.900'}>Add to cart</Button>
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
