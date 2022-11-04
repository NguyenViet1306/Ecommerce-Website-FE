import {Role} from "./Role";

export interface CustomerToken{
  id?: string
  accessToken?: string;
  username?: string
  email?: string
  role?: Role[]
}
