import { ProductGrid } from '@/components/Personal/ProductGrid';
import {
  Flex,
  Grid,
  GridItem,
  Heading,
  SimpleGrid,
  Show,
  List,
} from '@chakra-ui/react';

const Homepage = () => {
  return (
    <Grid
      templateAreas={{
        base: `"main"`,
        lg: `"aside main"`, // wider than 1024 px
      }}
      templateColumns={{
        base: '1fr',
        lg: '200px 1fr',
      }}
    >
      <Show above="lg">
        <GridItem area="aside" padding={5}>
          <List />
          {/* <GenreList /> */}
        </GridItem>
      </Show>

      <GridItem area="main">
        <Flex paddingLeft={2} marginBottom={5}>
          {/* <Box marginRight={5}>
            <Select />
          </Box> */}
          {/* <Box marginRight={5}>
            <Select />
          </Box> */}
          <Heading />
        </Flex>
        <SimpleGrid />
        <ProductGrid></ProductGrid>
      </GridItem>
    </Grid>
  );
};

export default Homepage;
