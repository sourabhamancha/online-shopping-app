import React, { useContext } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../context/auth";

// components
import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";
// sem-ui
import { Grid, Segment, Label, Divider } from "semantic-ui-react";

function Cart() {
  const context = useContext(AuthContext);
  const { loading, error, data } = useQuery(FETCH_CART_ITEMS_QUERY, {
    variables: { userId: context.user ? context.user.userId : "" },
  });

  if (loading) return <h1>Loading...</h1>;

  if (error) return `Error! ${error.message}`;

  if (Object.keys(data.cartItems).length < 1) {
    return <h1>Cart is empty</h1>;
  }
  const firstItem = data.cartItems[0]._id;

  return (
    <div>
      <Grid columns={2} centered>
        <Grid.Row verticalAlign="top">
          <Grid.Column width="10">
            <Segment raised>
              <Label as="a" color="red" ribbon>
                Shopping Bag
              </Label>
              {data.cartItems.map((item) => (
                <div key={item._id}>
                  <br />
                  <CartItem cartItem={item} firstItem={firstItem} />
                  <Divider />
                </div>
              ))}
            </Segment>
          </Grid.Column>
          <Grid.Column width="6">
            <Segment raised>
              <Label as="a" color="orange" ribbon>
                Order Summary
              </Label>
              <div>
                <br />
                <OrderSummary />
              </div>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Cart;

export const FETCH_CART_ITEMS_QUERY = gql`
  query($userId: String) {
    cartItems(userId: $userId) {
      _id
      createdAt
      product {
        _id
        name
        category
        price
        description
        imageUrl
      }
    }
  }
`;
