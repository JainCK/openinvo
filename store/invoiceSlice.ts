import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
}

export interface BusinessDetails {
  name: string;
  address: string;
  phone: string;
  email: string;
  logo: string | null;
}

export interface ClientDetails {
  name: string;
  address: string;
  email: string;
}

export interface InvoiceState {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  items: InvoiceItem[];
  businessDetails: BusinessDetails;
  clientDetails: ClientDetails;
  notes: string;
  customization: {
    colorScheme: string;
    font: string;
    layout: string;
  };
}

const initialState: InvoiceState = {
  invoiceNumber: "",
  invoiceDate: new Date().toISOString().split("T")[0],
  dueDate: "",
  businessDetails: {
    name: "",
    address: "",
    phone: "",
    email: "",
    logo: null,
  },
  clientDetails: {
    name: "",
    address: "",
    email: "",
  },
  items: [],
  notes: "",
  customization: {
    colorScheme: "#3b82f6",
    font: "sans-serif",
    layout: "spacious",
  },
};

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    updateInvoiceDetails: (
      state,
      action: PayloadAction<{ field: string; value: string }>
    ) => {
      const { field, value } = action.payload;
      (state as any)[field] = value;
    },
    updateBusinessDetails: (
      state,
      action: PayloadAction<{ field: string; value: string }>
    ) => {
      const { field, value } = action.payload;
      (state.businessDetails as any)[field] = value;
    },
    updateClientDetails: (
      state,
      action: PayloadAction<{ field: string; value: string }>
    ) => {
      const { field, value } = action.payload;
      (state.clientDetails as any)[field] = value;
    },
    addItem: (state) => {
      const newItem: InvoiceItem = {
        id: Date.now().toString(),
        description: "",
        quantity: 1,
        unitPrice: 0,
        taxRate: 0,
      };
      state.items.push(newItem);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateItem: (
      state,
      action: PayloadAction<{
        id: string;
        field: string;
        value: string | number;
      }>
    ) => {
      const { id, field, value } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        (item as any)[field] = value;
      }
    },
    updateNotes: (state, action: PayloadAction<string>) => {
      state.notes = action.payload;
    },
    updateCustomization: (
      state,
      action: PayloadAction<{ field: string; value: string }>
    ) => {
      const { field, value } = action.payload;
      (state.customization as any)[field] = value;
    },
    setLogo: (state, action: PayloadAction<string | null>) => {
      state.businessDetails.logo = action.payload;
    },
    resetInvoice: () => initialState,
  },
});

export const {
  updateInvoiceDetails,
  updateBusinessDetails,
  updateClientDetails,
  addItem,
  removeItem,
  updateItem,
  updateNotes,
  updateCustomization,
  setLogo,
  resetInvoice,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;
