import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';
import { toast } from "react-hot-toast";

export const signin = (inputData, navigateTo) => async (dispatch) => {
  try {
    const { data } = await api.signIn(inputData);

    dispatch({ type: AUTH, data });

    navigateTo.push('/');
    toast.success('Successfull signin')
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const signup = (inputData, navigateTo) => async (dispatch) => {
  try {
    const { data } = await api.signUp(inputData);

    dispatch({ type: AUTH, data });

    navigateTo.push('/');
    toast.success('Successfull signup')
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
