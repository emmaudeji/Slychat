import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (inputData, navigateTo) => async (dispatch) => {
  try {
    const { data } = await api.signIn(inputData);

    dispatch({ type: AUTH, data });

    navigateTo.push('/');
  } catch (error) {
    console.log(error);
  }
};

export const signup = (inputData, navigateTo) => async (dispatch) => {
  try {
    const { data } = await api.signUp(inputData);

    dispatch({ type: AUTH, data });

    navigateTo.push('/');
  } catch (error) {
    console.log(error);
  }
};
