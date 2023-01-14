import axios from 'axios';
import jwt_decode from 'jwt-decode';

type User = {
  sub: string;
  name: string;
  picture: string;
}

export const createOrGetUser = async (response: any) => {
  const decoded: User = jwt_decode(response.credential);
  const { name, picture, sub } = decoded;

  const user = {
    _id: sub,
    _type: 'user',
    userName: name,
    image: picture,
  }

  await axios.post('http://localhost:3000/api/auth', user);
};
