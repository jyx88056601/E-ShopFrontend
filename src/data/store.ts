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
