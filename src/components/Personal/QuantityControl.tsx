import { useCartStore } from '@/data/store';
import { Box, Button, Input } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';

type QuantityControlProps = {
  quantity: string;
  onChange: (newQuantity: string) => void;
  stock: string;
};

const QuantityControl = ({
  quantity,
  onChange,
  stock,
}: QuantityControlProps) => {
  const cartState = useCartStore();
  const [value, setValue] = useState<string>(quantity);
  useEffect(() => {
    setValue(quantity);
  }, [quantity]);

  const handleIncrease = () => {
    let newValue = (parseInt(value) + 1).toString();
    newValue = Math.min(Number(stock), Number(newValue)).toString();
    setValue(newValue);
    cartState.increaseItemCount();
    onChange(newValue);
  };

  const handleDecrease = () => {
    const newValue = Math.max(parseInt(value) - 1, 0).toString();
    setValue(newValue);
    cartState.decreaseItemCount();
    onChange(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    if (
      isNaN(Number(newValue)) ||
      newValue.length === 0 ||
      newValue[0] === '0'
    ) {
      newValue = '1';
    }
    newValue = Math.min(Number(stock), Number(newValue)).toString();
    const newItemCount = cartState.itemCount - Number(value) + Number(newValue);
    cartState.setItemCount(newItemCount);
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <Box>
      <Button color={'green.500'} onClick={handleDecrease}>
        -
      </Button>
      <Input
        type="text"
        value={value}
        onChange={handleInputChange}
        style={{
          width: '65px',
          textAlign: 'center',
          border: '1px solid white',
        }}
      />
      <Button color={'green.500'} onClick={handleIncrease}>
        +
      </Button>
    </Box>
  );
};

export default QuantityControl;
