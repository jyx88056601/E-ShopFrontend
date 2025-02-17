import { useState } from 'react';
import {
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Textarea,
  VStack,
  List,
  ListItem,
  Button,
  Spinner,
} from '@chakra-ui/react';
import { ProductDTO } from '@/data/entities';
import BusinessAPIClient from '@/service/BusinessApiClient';
import { useNavigate } from 'react-router-dom';

const ProductUploadingForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState(
    'The first image among all chosen pictures will be the main picture of the product'
  );
  const [selectedImages, setSelectedimages] = useState<File[]>([]);
  const [productDTO, setProductDTO] = useState<ProductDTO>({
    name: '',
    price: 0,
    stock: 0,
    category: '',
    description: '',
    images: [],
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setSelectedimages(filesArray);
      setProductDTO({ ...productDTO, images: filesArray });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setProductDTO((prevProductDTO) => ({
      ...prevProductDTO,
      [name]: value,
    }));
  };

  const handleNumberChange = (
    name: 'price' | 'stock',
    valueAsString: string,
    valueAsNumber: number
  ): void => {
    console.log(valueAsString);
    setProductDTO((prevProductDTO) => ({
      ...prevProductDTO,
      [name]: valueAsNumber,
    }));
  };

  const handleUpload = async () => {
    const formData = new FormData();
    if (productDTO.name === '') {
      setAlertInfo('Product name can not be empty');
      return;
    }
    formData.append('name', productDTO.name);
    formData.append('price', productDTO.price.toString());
    formData.append('stock', productDTO.stock.toString());
    if (productDTO.stock === 0) {
      setAlertInfo('stock must be greater than 0');
      return;
    }
    formData.append('category', productDTO.category);
    formData.append('description', productDTO.description);

    productDTO.images.forEach((image) => {
      formData.append('images', image);
    });
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token === null || username === null) {
      navigate('/login');
      return;
    }
    setIsLoading(true);
    const businessAPIClient = new BusinessAPIClient('/uploadingBy' + id);
    businessAPIClient
      .uploadProduct(username, token, formData)
      .then((res) => {
        setIsLoading(false);
        setAlertInfo(res.status.toString());
      })
      .catch((err) => {
        console.error('Upload failed', err);
        setIsLoading(false);
        setAlertInfo('Product upload failed. Please try again.');
      });
  };

  return (
    <>
      <Heading textAlign="center">Product detail form</Heading>
      <FormControl>
        <VStack>
          <InputGroup>
            <InputLeftAddon>Product name</InputLeftAddon>
            <Input
              type="text"
              name="name"
              value={productDTO.name}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon>Category</InputLeftAddon>
            <Input
              type="text"
              name="category"
              value={productDTO.category}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon>Price</InputLeftAddon>
            <NumberInput
              value={productDTO.price}
              onChange={(valueAsString, valueAsNumber) =>
                handleNumberChange('price', valueAsString, valueAsNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </InputGroup>
          <InputGroup>
            <InputLeftAddon>Stock</InputLeftAddon>
            <NumberInput
              value={productDTO.stock}
              onChange={(valueAsString, valueAsNumber) =>
                handleNumberChange('stock', valueAsString, valueAsNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </InputGroup>
          <InputGroup>
            <FormLabel>Description</FormLabel>
            <Textarea
              name="description"
              placeholder="Description of product"
              size="sm"
              value={productDTO.description}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup>
            <FormLabel>Image</FormLabel>
            <Input
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
          </InputGroup>
          {isLoading ? (
            <Spinner />
          ) : alertInfo === '200' ? (
            <Text color={'green.500'}>Upload product successfully</Text>
          ) : (
            <Text color={'red.500'}>{alertInfo}</Text>
          )}

          {selectedImages.length > 0 && (
            <VStack align="start" spacing={2}>
              <FormLabel>Selected Images:</FormLabel>
              <List>
                {selectedImages.map((file, index) => (
                  <ListItem key={index}>{file.name}</ListItem>
                ))}
              </List>
            </VStack>
          )}
          <Button
            bg={'blackAlpha.500'}
            color={'whiteAlpha.900'}
            mt={4}
            onClick={handleUpload}
          >
            Upload product
          </Button>
        </VStack>
      </FormControl>
    </>
  );
};

export default ProductUploadingForm;
