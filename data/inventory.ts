export type InventoryStatus =
  | "In Stock"
  | "Low Stock"
  | "Reorder"
  | "Expired"
  | "Out of Stock";

export type Chemical = {
  id: string;
  name: string;
  formula: string;
  cas: string;
  grade: string;
  supplier: string;
  catalog: string;
  quantity: number;
  unit: string;
  minimumStock: number;
  location: string;
  received: string;
  opened?: string;
  expiry: string;
  hazard: string;
  project: string;
  status: InventoryStatus;
};

export type Consumable = {
  id: string;
  name: string;
  category: string;
  supplier: string;
  catalog: string;
  quantity: number;
  unit: string;
  minimumStock: number;
  reorderQuantity: number;
  location: string;
  project: string;
  lastPurchased: string;
  status: InventoryStatus;
};

export type ComponentItem = {
  id: string;
  name: string;
  category: string;
  manufacturer: string;
  model: string;
  quantity: number;
  minimumStock: number;
  location: string;
  project: string;
  status: InventoryStatus;
};

export type PurchaseRequest = {
  id: string;
  item: string;
  category: string;
  requester: string;
  supplier: string;
  quantity: string;
  estimatedCost: string;
  requestedDate: string;
  status: "Requested" | "Approved" | "Ordered" | "Delivered";
};

export const chemicals: Chemical[] = [
  {
    id: "potassium-hydroxide",
    name: "Potassium Hydroxide",
    formula: "KOH",
    cas: "1310-58-3",
    grade: "Analytical Grade",
    supplier: "Sigma-Aldrich",
    catalog: "Prototype",
    quantity: 1250,
    unit: "g",
    minimumStock: 500,
    location: "Wet Lab · Cabinet B2",
    received: "Jan 08, 2027",
    opened: "Jan 12, 2027",
    expiry: "Nov 30, 2028",
    hazard: "Corrosive",
    project: "Shared Lab Stock",
    status: "In Stock",
  },
  {
    id: "sodium-borohydride",
    name: "Sodium Borohydride",
    formula: "NaBH₄",
    cas: "16940-66-2",
    grade: "≥98%",
    supplier: "SRL",
    catalog: "Prototype",
    quantity: 120,
    unit: "g",
    minimumStock: 100,
    location: "Chemical Store · Shelf C1",
    received: "Jan 05, 2027",
    opened: "Jan 10, 2027",
    expiry: "Jul 15, 2027",
    hazard: "Flammable · Water Reactive",
    project: "Energy Systems",
    status: "Low Stock",
  },
  {
    id: "silver-silver-chloride-paste",
    name: "Ag/AgCl Paste",
    formula: "Ag/AgCl",
    cas: "—",
    grade: "Electrode Grade",
    supplier: "Commercial",
    catalog: "Prototype",
    quantity: 1,
    unit: "unit",
    minimumStock: 2,
    location: "Electrochemistry Lab · Drawer E3",
    received: "Dec 18, 2026",
    opened: "Jan 06, 2027",
    expiry: "Sep 30, 2027",
    hazard: "Refer SDS",
    project: "Wearable Sensors",
    status: "Reorder",
  },
  {
    id: "pdms-base",
    name: "PDMS Base",
    formula: "PDMS",
    cas: "63148-62-9",
    grade: "Sylgard-type",
    supplier: "Dow",
    catalog: "Prototype",
    quantity: 850,
    unit: "g",
    minimumStock: 300,
    location: "Microfluidics Lab · Shelf M2",
    received: "Jan 03, 2027",
    opened: "Jan 04, 2027",
    expiry: "Oct 31, 2027",
    hazard: "Refer SDS",
    project: "Microfluidics",
    status: "In Stock",
  },
  {
    id: "expired-demo-chemical",
    name: "Prototype Expired Reagent",
    formula: "—",
    cas: "—",
    grade: "Research Grade",
    supplier: "Demo Supplier",
    catalog: "DEMO-001",
    quantity: 20,
    unit: "mL",
    minimumStock: 0,
    location: "Quarantine Shelf",
    received: "Mar 10, 2025",
    opened: "Apr 01, 2025",
    expiry: "Dec 31, 2026",
    hazard: "Refer SDS",
    project: "Prototype",
    status: "Expired",
  },
];

export const consumables: Consumable[] = [
  {
    id: "pipette-tips-200",
    name: "200 µL Pipette Tips",
    category: "Liquid Handling",
    supplier: "Eppendorf",
    catalog: "Prototype",
    quantity: 14,
    unit: "boxes",
    minimumStock: 5,
    reorderQuantity: 10,
    location: "Wet Lab · Shelf C",
    project: "Shared Lab Stock",
    lastPurchased: "Jan 09, 2027",
    status: "In Stock",
  },
  {
    id: "pipette-tips-1000",
    name: "1000 µL Pipette Tips",
    category: "Liquid Handling",
    supplier: "Thermo Fisher",
    catalog: "Prototype",
    quantity: 3,
    unit: "boxes",
    minimumStock: 5,
    reorderQuantity: 10,
    location: "Wet Lab · Shelf C",
    project: "Shared Lab Stock",
    lastPurchased: "Dec 20, 2026",
    status: "Reorder",
  },
  {
    id: "nitrile-gloves",
    name: "Nitrile Gloves",
    category: "PPE",
    supplier: "VWR",
    catalog: "Prototype",
    quantity: 4,
    unit: "boxes",
    minimumStock: 6,
    reorderQuantity: 12,
    location: "Safety Store · Rack S1",
    project: "Shared Lab Stock",
    lastPurchased: "Jan 02, 2027",
    status: "Low Stock",
  },
  {
    id: "syringes-5ml",
    name: "5 mL Syringes",
    category: "Sample Handling",
    supplier: "BD",
    catalog: "Prototype",
    quantity: 42,
    unit: "units",
    minimumStock: 20,
    reorderQuantity: 50,
    location: "Wet Lab · Drawer D4",
    project: "Microfluidics",
    lastPurchased: "Jan 11, 2027",
    status: "In Stock",
  },
  {
    id: "carbon-cloth",
    name: "Carbon Cloth",
    category: "Electrode Substrate",
    supplier: "Commercial",
    catalog: "Prototype",
    quantity: 6,
    unit: "sheets",
    minimumStock: 5,
    reorderQuantity: 10,
    location: "Materials Lab · Cabinet M4",
    project: "Energy Systems",
    lastPurchased: "Dec 29, 2026",
    status: "Low Stock",
  },
];

export const components: ComponentItem[] = [
  {
    id: "raspberry-pi-pico",
    name: "Raspberry Pi Pico W",
    category: "Embedded Systems",
    manufacturer: "Raspberry Pi",
    model: "Pico W",
    quantity: 8,
    minimumStock: 3,
    location: "Electronics Lab · Drawer E1",
    project: "Portable Instrumentation",
    status: "In Stock",
  },
  {
    id: "photodiode",
    name: "Silicon Photodiode",
    category: "Optoelectronics",
    manufacturer: "Commercial",
    model: "Prototype",
    quantity: 3,
    minimumStock: 5,
    location: "Optics Lab · Drawer O2",
    project: "Optical Diagnostics",
    status: "Low Stock",
  },
  {
    id: "micro-pump",
    name: "Miniature Fluid Pump",
    category: "Microfluidics",
    manufacturer: "Commercial",
    model: "Prototype",
    quantity: 2,
    minimumStock: 2,
    location: "Microfluidics Lab · Cabinet M1",
    project: "Integrated Microsystems",
    status: "In Stock",
  },
  {
    id: "temperature-sensor",
    name: "Digital Temperature Sensor",
    category: "Sensors",
    manufacturer: "Commercial",
    model: "Prototype",
    quantity: 1,
    minimumStock: 3,
    location: "Electronics Lab · Drawer E2",
    project: "Portable Instrumentation",
    status: "Reorder",
  },
];

export const purchaseRequests: PurchaseRequest[] = [
  {
    id: "PR-001",
    item: "1000 µL Pipette Tips",
    category: "Consumables",
    requester: "Lab Operations",
    supplier: "Thermo Fisher",
    quantity: "10 boxes",
    estimatedCost: "CAD 320",
    requestedDate: "Jan 14, 2027",
    status: "Requested",
  },
  {
    id: "PR-002",
    item: "Ag/AgCl Paste",
    category: "Chemical / Electrode Material",
    requester: "Wearable Sensors Team",
    supplier: "Commercial",
    quantity: "3 units",
    estimatedCost: "CAD 480",
    requestedDate: "Jan 13, 2027",
    status: "Approved",
  },
  {
    id: "PR-003",
    item: "Silicon Photodiodes",
    category: "Components",
    requester: "Optical Diagnostics Team",
    supplier: "Commercial",
    quantity: "10 units",
    estimatedCost: "CAD 250",
    requestedDate: "Jan 10, 2027",
    status: "Ordered",
  },
  {
    id: "PR-004",
    item: "Nitrile Gloves",
    category: "Consumables",
    requester: "Lab Operations",
    supplier: "VWR",
    quantity: "12 boxes",
    estimatedCost: "CAD 190",
    requestedDate: "Jan 05, 2027",
    status: "Delivered",
  },
];