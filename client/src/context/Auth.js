import React, { useState, useEffect } from 'react';
const AuthContext = React.createContext();

const AuthProvider = (props) => {
  const [user, setUser] = useState({});

  useEffect(
    () => {
      // console.log(user, 'user')
      window.localStorage.setItem('user', JSON.stringify(user));
    },
    [user]
  );

  const initialState = {
    user,
    setUser
  };

  // const [authState, dispatch] = useReducer(reducer, initialState);
  return (
    <AuthContext.Provider value={ initialState }>
      { props.children }
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider };