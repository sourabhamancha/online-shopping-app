import React, { useContext } from "react";
import { AuthContext } from "../context/auth";
// components
import BuyButton from "./BuyButton";
// sem-ui
import { Card, Grid } from "semantic-ui-react";

function OrderSummary() {
  const context = useContext(AuthContext);
  return (
    <Card fluid style={{ backgroundColor: "black" }}>
      <Card.Content>
        <Card.Header style={{ color: "white" }}>Summary</Card.Header>
        <br />
        <Card.Meta style={{ color: "white" }}>
          <Grid columns="equal">
            <Grid.Column>Subtotal</Grid.Column>
            <Grid.Column width={8}></Grid.Column>
            <Grid.Column>${context.cartTotal}</Grid.Column>
          </Grid>
        </Card.Meta>
        <Card.Meta style={{ color: "white" }}>
          <Grid columns="equal">
            <Grid.Column>Shipping</Grid.Column>
            <Grid.Column width={8}></Grid.Column>
            <Grid.Column>$0</Grid.Column>
          </Grid>
        </Card.Meta>
        <br />
        <Card.Header style={{ color: "white" }}>
          <Grid columns="equal">
            <Grid.Column>Total</Grid.Column>
            <Grid.Column width={7}></Grid.Column>
            <Grid.Column>${context.cartTotal}</Grid.Column>
          </Grid>
        </Card.Header>
      </Card.Content>
      <Card.Content extra>
        <div style={{ margin: "auto" }}>
          <BuyButton type="checkout" />
        </div>
      </Card.Content>
    </Card>
  );
}

export default OrderSummary;
