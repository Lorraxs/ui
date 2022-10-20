import axios from 'axios';
import { toast } from 'react-toastify';

export const register = async data => {
  try {
    const result = await axios.post('REGISTER', data);
    const _data = await result.data;
    console.log(_data);
    return _data;
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};
