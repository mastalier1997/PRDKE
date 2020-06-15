export interface User {
  $oid: string;
  stitchid: string;
  username: string;
  password: string;
  follows: User[];
}
