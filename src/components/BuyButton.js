import React, { useContext, useState } from "react";
import { AuthContext } from "../context/auth";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
// import { FETCH_ALL_PRODUCTS_QUERY } from "../pages/Home";
// import { FETCH_ALL_ORDERS_QUERY } from "../pages/Orders";
// import { FETCH_CART_ITEMS_QUERY } from "../pages/Cart";
// sem-ui
import { Button, Confirm } from "semantic-ui-react";

function BuyButton({ type, productsIds }) {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const { user, cartProductsIds, setOrders } = useContext(AuthContext);
  const userId = user ? user.userId : "";
  const [checkoutOrders, { loading }] = useMutation(CHECKOUT_ORDERS_MUTATION, {
    onError(err) {
      console.log(err.graphQLErrors);
    },
    variables: {
      userId,
      productsIds: type === "checkout" ? cartProductsIds : productsIds,
    },
    // refetchQueries: [
    //   {
    //     query: FETCH_ALL_PRODUCTS_QUERY,
    //     variables: { userId },
    //   },
    //   {
    //     query: FETCH_ALL_ORDERS_QUERY,
    //     variables: { userId },
    //   },
    // ],
    update(_, __) {
      // const data = cache.readQuery({
      //   query: FETCH_CART_ITEMS_QUERY,
      //   variables: { userId },
      // });
      // const newData = data.cartItems.filter(
      //   (item) => !productsIds.includes(item.product._id)
      // );
      // cache.writeQuery({
      //   query: FETCH_CART_ITEMS_QUERY,
      //   variables: { userId },
      //   data: newData,
      // });
    },
  });

  const handleBuyButton = () => {
    checkoutOrders();
    setOpen(false);
    window.location.reload(false);
    if (type === "checkout") {
      history.push("/orders");
      setOrders();
    }
  };

  return (
    <div>
      {type === "only" ? (
        <Button primary onClick={() => setOpen(true)}>
          Buy only this
        </Button>
      ) : (
        <Button color="orange" onClick={() => setOpen(true)}>
          Member Checkout
        </Button>
      )}
      <Confirm
        open={open}
        cancelButton="I changed my mind"
        confirmButton="Let's do it"
        onCancel={() => setOpen(false)}
        onConfirm={handleBuyButton}
        className={loading ? "loading" : ""}
      />
    </div>
  );
}

export default BuyButton;

const CHECKOUT_ORDERS_MUTATION = gql`
  mutation checkoutOrders($userId: String, $productsIds: [String]) {
    checkoutOrders(userId: $userId, productsIds: $productsIds)
  }
`;
