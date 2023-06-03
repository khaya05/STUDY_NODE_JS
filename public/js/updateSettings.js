/*eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

// type is either pass || data
export const updateSettings = async (data, type) => {
  try {
    const endPoint = type === 'password' ? 'updateMyPassword' : 'updateMe';
    const res = await axios({
      method: 'PATCH',
      url: `http://localhost:3000/api/v1/users/${endPoint}`,
      data
    });

    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated successfully`);
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};
