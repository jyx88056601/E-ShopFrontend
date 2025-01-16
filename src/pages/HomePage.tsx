import { Box, Flex, Grid, GridItem } from '@chakra-ui/react';

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
      <GridItem area="main">
        <Flex paddingLeft={2} marginBottom={5}>
          <Box marginRight={5}></Box>
          <Box marginRight={5}></Box>
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default Homepage;
