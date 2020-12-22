import walletClient from '../utils/walletClient';
import {SET_NAME} from "./namesReducer";

const SET_YOUR_BIDS = 'app/bids/setYourBids';

const initialState = {
  yourBids: [],
};

export const setYourBids = (bids = []) => ({
  type: SET_YOUR_BIDS,
  payload: bids,
});

export const getYourBids = () => async (dispatch) => {
  const result = await walletClient.getBids();
  const bids = result.map(({ bid, start, info, isOwner }) => {
    dispatch({
      type: SET_NAME,
      payload: {
        name: bid.name,
        start,
        info,
        isOwner,
      },
    });
    return bid;
  });

  const yourBids = bids.filter(({ own }) => own);

  if (result && result.length) {
    dispatch(setYourBids(yourBids));
  }
};

export default function bidsReducer(state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case SET_YOUR_BIDS:
      return {...state, yourBids: payload};
    default:
      return state;
  }
}
