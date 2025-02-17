import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import ProductTable from "@/components/Business/ProductTable";
import ProductUploadingForm from "@/components/Business/ProductUploadingForm";
const BusinessNavBar = () => {
  return (
    <Tabs>
      <TabList>
        <Tab>Product</Tab>
        <Tab>Order</Tab>
        <Tab>Income</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <ProductUploadingForm></ProductUploadingForm>
          <ProductTable></ProductTable>
        </TabPanel>
        <TabPanel>
          <p>Check orders status</p>
        </TabPanel>
        <TabPanel>
          <p>Check transaction data</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default BusinessNavBar;
