import { Card, CardBody, Skeleton, SkeletonText } from '@chakra-ui/react';

const ProductSkeleton = () => {
  return (
    <Card>
      <Skeleton height="200px">
        <CardBody>
          <SkeletonText></SkeletonText>
        </CardBody>
      </Skeleton>
    </Card>
  );
};

export default ProductSkeleton;
