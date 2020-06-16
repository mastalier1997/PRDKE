export interface User {
  $oid: string;
  stitchid: string;
  username: string;
  password: string;
  firstname: string;
  surname: string;
  follows: User[];
}
