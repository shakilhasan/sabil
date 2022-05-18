import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { Auth0Client } from '@auth0/auth0-spa-js';
//
import { AUTH0_API } from '../config';

// ----------------------------------------------------------------------

let auth0Client = null;

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return { ...state, isAuthenticated, isInitialized: true, user };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;
    return { ...state, isAuthenticated: true, user };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'auth0',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        auth0Client = new Auth0Client({
          client_id: AUTH0_API.clientId,
          domain: AUTH0_API.domain,
          redirect_uri: window.location.origin,
        });

        await auth0Client.checkSession();

        const isAuthenticated = await auth0Client.isAuthenticated();

        if (isAuthenticated) {
          const user = await auth0Client.getUser();

          dispatch({
            type: 'INITIALIZE',
            payload: { isAuthenticated, user },
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: { isAuthenticated, user: null },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: { isAuthenticated: false, user: null },
        });
      }
    };

    initialize();
  }, []);

  const login = async () => {
    await auth0Client.loginWithPopup();
    const isAuthenticated = await auth0Client.isAuthenticated();

    if (isAuthenticated) {
      const user = await auth0Client.getUser();
      dispatch({ type: 'LOGIN', payload: { user } });
    }
  };

  const logout = () => {
    auth0Client.logout();
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'auth0',
        user: {
          id: state?.user?.sub,
          photoURL: state?.user?.picture,
          email: state?.user?.email,
          displayName: 'Jaydon Frankie',
          role: 'admin',
        },
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
