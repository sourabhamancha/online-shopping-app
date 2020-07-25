import React, { useContext } from "react";
import { AuthContext } from "../context/auth";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_CART_ITEMS_QUERY } from "../pages/Cart";
import { FETCH_ALL_PRODUCTS_QUERY } from "../pages/Home";
// sem-ui
import { Button } from "semantic-ui-react";

function RemoveFromCartButton({ productId }) {
  const { user, removeProductId } = useContext(AuthContext);
  const userId = user ? user.userId : "";
  const [removeFromCart] = useMutation(REMOVE_FROM_CART_MUTATION, {
    onError(err) {
      console.log(err.graphQLErrors);
    },
    variables: { userId, productId },
    refetchQueries: [
      {
        query: FETCH_ALL_PRODUCTS_QUERY,
        variables: { userId },
      },
      {
        query: FETCH_CART_ITEMS_QUERY,
        variables: { userId },
      },
    ],
  });

  return (
    <div>
      <Button
        secondary
        onClick={() => {
          removeFromCart();
          removeProductId(productId);
        }}
      >
        Remove from cart
      </Button>
    </div>
  );
}

export default RemoveFromCartButton;

const REMOVE_FROM_CART_MUTATION = gql`
  mutation removeFromCart($userId: String, $productId: String) {
    removeFromCart(userId: $userId, productId: $productId) {
      _id
    }
  }
`;
