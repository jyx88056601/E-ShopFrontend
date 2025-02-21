import { ProductGrid } from '@/components/Personal/ProductGrid';
import { Box, Flex, Grid, GridItem } from '@chakra-ui/react';

const PersonalPage = () => {
  return (
    <>
      <Grid
        templateAreas={{
          base: `"main"`,
          lg: `"aside main"`,
        }}
        templateColumns={{
          base: '1fr',
          lg: '200px 1fr',
        }}
      >
        {/* <Show above="lg">
        <GridItem area="aside" padding={5}>
          <GenreList />
        </GridItem>
      </Show> */}

        <GridItem area="main">
          <Flex paddingLeft={2} marginBottom={5}>
            <Box marginRight={5}></Box>
            <Box marginRight={5}></Box>
          </Flex>
          <ProductGrid></ProductGrid>
        </GridItem>
      </Grid>
    </>
  );
};

export default PersonalPage;
