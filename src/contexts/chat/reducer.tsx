export const reducer = (state: any, objParams: any) => {
    return {
      ...state,
      order: objParams.order ?? state.order,
      merchant: objParams.merchant ?? state.merchant,
      roomChat: objParams.roomChat ?? state.roomChat,
    };
  };
  
  export const initialState = {
    order: false,
    merchant: {},
    roomChat: [],
  };
  