import { create } from "zustand";

type CartStore = {
    itemCount: number;
    increaseItemCount: () => void;
    decreaseItemCount: () => void;
    resetItemCount: () => void;
    setItemCount : (count : number) => void;
}

// return default itemCount value
export const useCartStore = create<CartStore>((set) => ({
    itemCount: 0,
    increaseItemCount: () => set((state) => ({ itemCount: state.itemCount + 1 })),
    decreaseItemCount: () => set((state) => ({ itemCount: Math.max(state.itemCount - 1, 0) })),
    resetItemCount: () => set({ itemCount: 0 }),
    setItemCount: (count: number) => set({ itemCount: count })
}));


type OrderRequestStore = {
    merchant_id : string;
    customer_id : string;
    orderItemRequestDTOList : OrderItemRequestDTO[];
    setMerchantId : (merchantId : string) => void;
    setCustomerId : (CostomerId : string) => void;
    setOrderItemRequestDTOList : (orderItemRequestList:  OrderItemRequestDTO[]) => void;
}

export type OrderItemRequestDTO = {
    product_id : string;
    quantity : string
}

export const useOrderRequestStore = create<OrderRequestStore>((set) => ({
  merchant_id: '',
  customer_id: '',
  orderItemRequestDTOList: [],
  setMerchantId: (merchantId: string) => set((state) => ({ ...state, merchant_id: merchantId })),
  setCustomerId: (customerId: string) => set((state) => ({ ...state, customer_id: customerId })),
  setOrderItemRequestDTOList: (orderItemRequestList: OrderItemRequestDTO[]) => set((state) => ({ ...state, orderItemRequestDTOList: orderItemRequestList })),
}));

type PathStore = {
    path: string;
    setCurrentPath: (path: string) => void;
}

export const usePathStore = create<PathStore>((set) => ({
    path: "", 
    setCurrentPath: (path) => set({ path })
}));

interface PaymentState {
    refreshTrigger: boolean;
    triggerRefresh: () => void;
    resetTrigger: () => void;
  }
  
  export const usePaymentStore = create<PaymentState>((set) => ({
    refreshTrigger: false,
    triggerRefresh: () => set({ refreshTrigger: true }),
    resetTrigger: () => set({ refreshTrigger: false }),
  }));