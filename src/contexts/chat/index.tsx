"use client";

import React from "react";
import {initialState, reducer} from "./reducer";

export const ChatContext: any = React.createContext({
  state: initialState,
  dispatch: () => null,
});

export const ChatProvider = ({ children }: any) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <ChatContext.Provider value={[state, dispatch]}>
      {children}
    </ChatContext.Provider>
  );
};
