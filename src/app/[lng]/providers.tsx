'use client';

import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { createContext, useReducer } from 'react';

export enum SessionAction {
  SET_SESSION = 'SET_SESSION',
  SET_STATUS = 'SET_STATUS',
}

type SessionStatus = 'loading' | 'authenticated' | 'unauthenticated';
type IActions =
  | {
      type: SessionAction.SET_SESSION;
      payload: Session | null;
    }
  | {
      type: SessionAction.SET_STATUS;
      payload: SessionStatus;
    };
export interface SessionState {
  session: Session | null;
  status: SessionStatus;
}

const initialState: SessionState = {
  session: null,
  status: 'unauthenticated',
};

const reducer = (state: SessionState, action: IActions): SessionState => {
  const { type, payload } = action;
  switch (type) {
    case SessionAction.SET_STATUS:
      return {
        ...state,
        status: payload,
      };
    case SessionAction.SET_SESSION:
      return {
        ...state,
        session: payload,
      };
    default:
      return state;
  }
};

interface SessionContext {
  state: SessionState;
  dispatch: React.Dispatch<IActions>;
  updateSession?: (newSession: Session | null) => Promise<Session | null>;
}
export const SessionWrapperContext = createContext<SessionContext>({
  state: initialState,
  dispatch: () => null,
});

export default function SessionProviders({ children }: { children: React.ReactNode }) {
  const { update } = useSession();
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SessionWrapperContext.Provider value={{ state, dispatch, updateSession: update }}>
      {children}
    </SessionWrapperContext.Provider>
  );
}
