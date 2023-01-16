import axios from 'axios';
import jwt_decode from 'jwt-decode';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

type User = {
  sub: string;
  name: string;
  picture: string;
};

export const createOrGetUser = async (response: any, addUser: any) => {
  const decoded: User = jwt_decode(response.credential);
  const { name, picture, sub } = decoded;

  const user = {
    _id: sub,
    _type: 'user',
    userName: name,
    image: picture
  };

  const res = await axios.post(`${BASE_URL}/api/auth`, user);

  if (res.status === 200) addUser(user);
};
