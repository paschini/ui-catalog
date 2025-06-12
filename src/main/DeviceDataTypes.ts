export type Firmware = {
  board: string[];
  platform: string;
};

export type Images = {
  default: string;
  nopadding: string;
  topology: string;
};

export type Icon = {
  id: string;
  resolutions: [number, number][];
};

export type Line = {
  id: string;
  name: string;
};

export type Product = {
  abbrev: string;
  name: string;
};

export type UISP = {
  bleServices: any; //TODO: check later
  firmware: Firmware;
  line: string;
  nameLegacy: string[];
};

export type Tripplets = [{ k1: string }, { k2: string }, { k3: string }];

export type DeviceData = {
  guids: string[];
  icon: Icon;
  id: string;
  images: Images;
  line: Line;
  product: Product;
  shortnames: string[];
  sku: string;
  syid: string;
  syids: string[];
  tripplets: Tripplets;
  uisp: UISP;
  videos: any; //TODO: check later
};
