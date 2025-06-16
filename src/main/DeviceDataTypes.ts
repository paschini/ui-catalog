export type Btle = {
  factoryDefualt: string;
  userConfigured: string;
};

export type Compliance = {
  anatel: string;
  fcc: string;
  ic: string;
  icEmi: string;
  modelName: string;
  rfCmFcc: string;
  rfCmIc: string;
  text: {
    BR: string[];
    CA: string[];
    US: string[];
  };
};

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
  bleServices: any; // REF depends on the btle field values, might be able to do some typescript voodoo
  /* TODO
   * bleServices: {
   *  [${btle.factoryDefault}]: { mode: 'factory' | 'default' }
   *  [${btle.userConfigured}]:: { mode: 'factory' | 'default' }
   * */
  firmware: Firmware;
  line: string;
  nameLegacy: string[];
};

export type Features = {
  atfDisabled: boolean;
  ax: boolean;
  bandsteer: boolean;
  be: boolean;
  gen: number;
  outdoorModeSupport: boolean;
};

export type Radio = {
  gain: number;
  maxPower: number;
  maxSpeedMegabitsPerSecond: number;
};

export type Radios = {
  '6e': Radio;
  na: Radio;
  ng: Radio;
};

export type Network = {
  chipset: string;
  deviceCapabilities: string[];
  ethernetMaxSpeedMegabitsPerSecond: number;
  diagram?: string[];
  linkNegotiation?: any;
  features?: Features;
  minimumFirmwareRequired: string;
  model: string;
  netowrkGroups?: {
    eth0?: string;
    eth1?: string;
    eth2?: string;
    eth3?: string;
    eth4?: string;
    eth5?: string;
    eth6?: string;
  };
  numberOfPorts: number;
  radios?: Radios;
  systemIdHexadecimal: string;
  type: string;
  subtypes?: string[];
};

export type UniFi = {
  adoptability: string;
  network: Network;
};

export type Tripplets = [{ k1: string }, { k2: string }, { k3: string }];

export type DeviceData = {
  btle?: Btle;
  compliance?: Compliance;
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
  uisp?: UISP;
  unifi?: UniFi;
  videos: any;
};
