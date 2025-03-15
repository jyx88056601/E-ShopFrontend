import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import ProductTable from '@/components/Business/ProductTable';
import ProductUploadingForm from '@/components/Business/ProductUploadingForm';
import BusinessOrderTable from './BusinessOrderTable';

const BusinessNavBar = () => {
  return (
    <Tabs>
      <TabList>
        <Tab>Order Management</Tab>
        <Tab>Product Management</Tab>
        <Tab>Transaction Review</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <BusinessOrderTable></BusinessOrderTable>
        </TabPanel>
        <TabPanel>
          <ProductUploadingForm></ProductUploadingForm>
          <ProductTable></ProductTable>
        </TabPanel>
        <TabPanel>
          <p>Check transaction data</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default BusinessNavBar;
