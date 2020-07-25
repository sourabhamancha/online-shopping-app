import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { AuthContext } from "../context/auth";
import { Link } from "react-router-dom";
// graphql
import { ADD_TO_CART_MUTATION } from "./Products";
import { FETCH_ALL_PRODUCTS_QUERY } from "../pages/Home";
import { FETCH_CART_ITEMS_QUERY } from "../pages/Cart";
// sem-ui
import { Button, Header, Image, Modal, Icon } from "semantic-ui-react";

function MoreButton({ product }) {
  const context = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const [addToCart, { loading: mutationLoading }] = useMutation(
    ADD_TO_CART_MUTATION,
    {
      onError(err) {},
      refetchQueries: [
        {
          query: FETCH_ALL_PRODUCTS_QUERY,
          variables: { userId: context.user ? context.user.userId : "" },
        },
        {
          query: FETCH_CART_ITEMS_QUERY,
          variables: { userId: context.user ? context.user.userId : "" },
        },
      ],
    }
  );

  if (mutationLoading) return <h1>Loading..</h1>;
  return (
    <div>
      <Button animated="fade" floated="right" onClick={() => setOpen(true)}>
        <Button.Content visible>More</Button.Content>

        <Button.Content hidden>
          <Icon name="expand arrows alternate" />
        </Button.Content>
      </Button>
      <Modal dimmer="blurring" open={open} onClose={() => setOpen(false)}>
        <Modal.Header>More about {product.name}</Modal.Header>
        <Modal.Content image>
          <Image wrapped size="medium" src={product.imageUrl} />
          <Modal.Description>
            <Header>{product.name}</Header>
            {product.isOrdered ? (
              <p>You have previously ordered this product</p>
            ) : null}
            <p>
              <strong>Category: </strong>
              {product.category}
            </p>
            <p>
              <strong>Price: </strong>${product.price}
            </p>
            <p>
              <strong>Product Description: </strong>
              {product.description}
            </p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setOpen(false)}>
            Continue Shopping
          </Button>
          {context.user ? (
            product.inCart ? (
              <Button
                color="teal"
                as={Link}
                to="/cart"
                onClick={context.setCart}
              >
                <Icon name="cart" />
                In Cart
              </Button>
            ) : (
              <Button
                onClick={() => {
                  addToCart({
                    variables: {
                      userId: context.user ? context.user.userId : null,
                      productId: product._id,
                    },
                  });
                  setOpen(false);
                }}
              >
                <Icon name="cart" />
                Add to Cart
              </Button>
            )
          ) : (
            <Button as={Link} to="/login" onClick={context.setLogin}>
              <Icon name="cart" />
              Login/Signup to add to cart
            </Button>
          )}
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default MoreButton;
