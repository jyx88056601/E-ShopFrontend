import React, { useState, useEffect } from 'react';

type QuantityControlProps = {
  quantity: string;
  onChange: (newQuantity: string) => void;
};

const QuantityControl = ({ quantity, onChange }: QuantityControlProps) => {
  const [value, setValue] = useState<string>(quantity);

  useEffect(() => {
    setValue(quantity);
  }, [quantity]);

  const handleIncrease = () => {
    const newValue = (parseInt(value) + 1).toString();
    setValue(newValue);
    onChange(newValue);
  };

  const handleDecrease = () => {
    const newValue = Math.max(parseInt(value) - 1, 0).toString();
    setValue(newValue);
    onChange(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <button onClick={handleDecrease}>-</button>
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        style={{ width: '50px', textAlign: 'center' }}
      />
      <button onClick={handleIncrease}>+</button>
    </div>
  );
};

export default QuantityControl;
