import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  hsn: string;
}

export interface BusinessDetails {
  name: string;
  address: string;
  phone: string;
  email: string;
  logo: string | null;
  gstin: string;
  stateName: string;
  stateCode: string;
}

export interface ClientDetails {
  name: string;
  address: string;
  phone: string;
  email: string;
  gstin: string;
  stateName: string;
  stateCode: string;
  shipToSameAsBilling: boolean;
  shipToName: string;
  shipToAddress: string;
  shipToPhone: string;
  shipToEmail: string;
  shipToGstin: string;
  shipToStateName: string;
  shipToStateCode: string;
}

export interface InvoiceState {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  items: InvoiceItem[];
  businessDetails: BusinessDetails;
  clientDetails: ClientDetails;
  notes: string;
  isIndia: boolean;
  currency: string;
  authorizedSignatory: {
    name: string;
    signature: string | null;
  };
  customization: {
    font: string;
    layout: string;
    pageSize: string;
    margins: string;
    logoSize: string;
    headerStyle: string;
  };
}

const initialState: InvoiceState = {
  invoiceNumber: "",
  invoiceDate: new Date().toISOString().split("T")[0],
  dueDate: "",
  isIndia: false,
  currency: "USD",
  businessDetails: {
    name: "",
    address: "",
    phone: "",
    email: "",
    logo: null,
    gstin: "",
    stateName: "",
    stateCode: "",
  },
  clientDetails: {
    name: "",
    address: "",
    phone: "",
    email: "",
    gstin: "",
    stateName: "",
    stateCode: "",
    shipToSameAsBilling: true,
    shipToName: "",
    shipToAddress: "",
    shipToPhone: "",
    shipToEmail: "",
    shipToGstin: "",
    shipToStateName: "",
    shipToStateCode: "",
  },
  items: [],
  notes: "",
  authorizedSignatory: {
    name: "",
    signature: null,
  },
  customization: {
    font: "sans-serif",
    layout: "spacious",
    pageSize: "A4",
    margins: "normal",
    logoSize: "medium",
    headerStyle: "classic",
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
      action: PayloadAction<{ field: string; value: string | boolean }>
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
        hsn: "",
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
    setIsIndia: (state, action: PayloadAction<boolean>) => {
      state.isIndia = action.payload;
      if (action.payload) {
        state.currency = "INR";
      }
    },
    setCurrency: (state, action: PayloadAction<string>) => {
      state.currency = action.payload;
    },
    updateAuthorizedSignatory: (
      state,
      action: PayloadAction<{ field: string; value: string }>
    ) => {
      const { field, value } = action.payload;
      (state.authorizedSignatory as any)[field] = value;
    },
    setSignature: (state, action: PayloadAction<string | null>) => {
      state.authorizedSignatory.signature = action.payload;
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
  setIsIndia,
  setCurrency,
  updateAuthorizedSignatory,
  setSignature,
  resetInvoice,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;
