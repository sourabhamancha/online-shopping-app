import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/auth";

// components
import RemoveFromCartButton from "./RemoveFromCartButton";
import BuyButton from "./BuyButton";

// sem-ui
import { Image, Grid, Button, Header } from "semantic-ui-react";

function CartItem({ cartItem, firstItem }) {
  const context = useContext(AuthContext);

  const [count, setCount] = useState(1);

  useEffect(() => {
    if (cartItem._id === firstItem) {
      context.initCartTotal();
    }
    context.updateCartTotal(
      count * parseInt(cartItem.product.price),
      cartItem.product._id
    );
  }, []);

  return (
    <div>
      <Grid centered>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Image src={cartItem.product.imageUrl} />
          </Grid.Column>
          <Grid.Column>
            <Header>{cartItem.product.name}</Header>
            <span>Catergory: {cartItem.product.category}</span>
            <br />
            <span>{cartItem.product.description}</span>
            <br />
            <br />
            <div>
              <Header sub>Total Price</Header>
              <span>${count * parseInt(cartItem.product.price)}</span>
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <BuyButton type="only" productsIds={[cartItem.product._id]} />
          <Button
            basic
            color="red"
            icon="angle down"
            onClick={() => {
              if (count === 1) {
                setCount(count);
              } else {
                setCount((prevCount) => prevCount - 1);
                context.updateCartTotal(-parseInt(cartItem.product.price));
              }
            }}
          />
          <Button basic color="blue">
            {count}
          </Button>
          <Button
            basic
            color="green"
            icon="angle up"
            onClick={() => {
              setCount((prevCount) => prevCount + 1);
              context.updateCartTotal(parseInt(cartItem.product.price));
            }}
          />
          <RemoveFromCartButton productId={cartItem.product._id} />
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default CartItem;
