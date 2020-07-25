import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import { useHistory } from "react-router-dom";

// components
import AddProduct from "./AddProduct";
// sem-ui
import { Menu, Icon, Confirm } from "semantic-ui-react";

function NavBar() {
  const context = useContext(AuthContext);
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const handleConfirm = () => {
    context.logout();
    context.setLogin();
    setOpen(false);
    history.push("/login");
  };

  const unAuthNav = (
    <Menu size="massive" color="teal" inverted>
      <Menu.Item
        name="Home"
        active={context.navItem === "home"}
        onClick={context.setHome}
        as={Link}
        to="/"
      >
        <Icon name="building" />
        Store
      </Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item
          name="Login"
          active={context.navItem === "login"}
          onClick={context.setLogin}
          as={Link}
          to="/login"
        >
          <Icon name="user" />
          Login
        </Menu.Item>
        <Menu.Item
          name="Signup"
          active={context.navItem === "signup"}
          onClick={context.setSignup}
          as={Link}
          to="/signup"
        >
          <Icon name="signup" />
          Signup
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );

  const authNav = (
    <Menu size="massive" color="teal" inverted>
      <Menu.Item
        name="Home"
        active={context.navItem === "home"}
        onClick={context.setHome}
        as={Link}
        to="/"
      >
        <Icon name="building" />
        Store
      </Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item name="Add">
          <AddProduct />
        </Menu.Item>
        <Menu.Item
          name="Orders"
          active={context.navItem === "orders"}
          onClick={context.setOrders}
          as={Link}
          to="/orders"
        >
          <Icon name="numbered list" />
          Orders
        </Menu.Item>
        <Menu.Item
          name="Cart"
          active={context.navItem === "cart"}
          onClick={context.setCart}
          as={Link}
          to="/cart"
        >
          <Icon name="cart" />
          Cart
        </Menu.Item>
        <Menu.Item name="Log Out" onClick={() => setOpen(true)}>
          <Icon name="log out" />
          Logout
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
  return (
    <>
      {context.user ? authNav : unAuthNav}
      <Confirm
        open={open}
        onCancel={() => setOpen(false)}
        onConfirm={handleConfirm}
      />
    </>
  );
}

export default NavBar;
