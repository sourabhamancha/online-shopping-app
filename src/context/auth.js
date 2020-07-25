import React, { useReducer, createContext } from "react";
import jwtDecode from "jwt-decode";

const initialState = {
  user: null,
  navItem: "home",
  cartTotal: 0,
};

const pathname = window.location.pathname;
const path = pathname === "/" ? "home" : pathname.substring(1);
initialState.navItem = path;

if (localStorage.getItem("jwtToken")) {
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext({
  user: null,
  navItem: "home",
  cartTotal: 0,
  cartProductsIds: [],
  login: (userData) => {},
  logout: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    case "NAV":
      return {
        ...state,
        navItem: action.payload,
      };
    case "INIT_CART":
      return {
        ...state,
        cartTotal: 0,
        cartProductsIds: [],
      };
    case "CART":
      return {
        ...state,
        cartTotal: state.cartTotal + action.payload.value,
        cartProductsIds: [...state.cartProductsIds, action.payload.productId],
      };
    case "REM_CART":
      return {
        ...state,
        cartProductsIds: state.cartProductsIds.filter(
          (id) => id !== action.payload
        ),
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(userData) {
    localStorage.setItem("jwtToken", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  }

  function logout() {
    localStorage.removeItem("jwtToken");
    dispatch({ type: "LOGOUT" });
  }

  function setHome() {
    dispatch({
      type: "NAV",
      payload: "home",
    });
  }

  function setLogin() {
    dispatch({
      type: "NAV",
      payload: "login",
    });
  }

  function setSignup() {
    dispatch({
      type: "NAV",
      payload: "signup",
    });
  }

  function setOrders() {
    dispatch({
      type: "NAV",
      payload: "orders",
    });
  }

  function setCart() {
    dispatch({
      type: "NAV",
      payload: "cart",
    });
  }

  function updateCartTotal(value, productId) {
    dispatch({
      type: "CART",
      payload: { value, productId },
    });
  }

  function initCartTotal() {
    dispatch({
      type: "INIT_CART",
    });
  }

  function removeProductId(productId) {
    dispatch({
      type: "REM_CART",
      payload: productId,
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        navItem: state.navItem,
        cartTotal: state.cartTotal,
        cartProductsIds: state.cartProductsIds,
        setHome,
        setLogin,
        setSignup,
        setOrders,
        setCart,
        login,
        logout,
        initCartTotal,
        updateCartTotal,
        removeProductId,
      }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
