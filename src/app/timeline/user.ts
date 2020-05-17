export interface User {
  $oid: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  follows: User[];
}
