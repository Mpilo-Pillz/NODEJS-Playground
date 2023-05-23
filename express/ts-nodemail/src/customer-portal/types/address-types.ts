import { Region } from "../../enums/enum";

export type region =
  | Region.HHOHHO
  | Region.LUBOMBO
  | Region.MANZINI
  | Region.SHISELWENI;

export interface IAddress {
  streetNumber: string;
  streetName: string;
  postalCode: string;
  region: region;
  creator: string;
}
