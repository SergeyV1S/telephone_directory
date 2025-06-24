export type TPhoneNumber = "gasPhone" | "urbanPhone";

export interface IPhoneNumber {
  type: TPhoneNumber;
  phone: string;
}
