import React, { useContext } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { AuthContext } from "../context/auth";
import { Link } from "react-router-dom";
// graphql
import { FETCH_ALL_PRODUCTS_QUERY } from "../pages/Home";
import { FETCH_CART_ITEMS_QUERY } from "../pages/Cart";
// component
import MoreButton from "./MoreButton";
// sem-ui
import {
  Card,
  Segment,
  Label,
  Divider,
  Image,
  Popup,
  Button,
  Grid,
  Icon,
} from "semantic-ui-react";

function Products({ products }) {
  const context = useContext(AuthContext);

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
  if (mutationLoading) {
  }

  return (
    <>
      <Card.Group doubling itemsPerRow={4} stackable>
        {products &&
          products.map((product) => (
            <Card key={product._id}>
              <Segment>
                <Label color="teal" ribbon>
                  {product.category}
                </Label>
                <Image src={product.imageUrl} />
                <Divider />
                <Card.Content>
                  <Card.Header>{product.name}</Card.Header>
                  <Card.Meta>
                    <span className="price">${product.price}</span>
                  </Card.Meta>
                </Card.Content>
                <Divider />
                <Card.Content extra>
                  <Grid divided="vertically">
                    <Grid.Row columns={2}>
                      <Grid.Column>
                        {context.user ? (
                          product.inCart ? (
                            <Popup
                              position="top center"
                              content="In cart"
                              trigger={
                                <Button
                                  color="teal"
                                  as={Link}
                                  to="/cart"
                                  onClick={context.setCart}
                                >
                                  <Icon name="cart" />
                                </Button>
                              }
                            />
                          ) : (
                            <Popup
                              position="top center"
                              content="Add to cart"
                              trigger={
                                <Button
                                  onClick={() => {
                                    addToCart({
                                      variables: {
                                        userId: context.user
                                          ? context.user.userId
                                          : null,
                                        productId: product._id,
                                      },
                                    });
                                  }}
                                >
                                  <Icon name="cart" />
                                </Button>
                              }
                            />
                          )
                        ) : (
                          <Popup
                            position="top center"
                            content="Login/Signup to add to cart"
                            trigger={
                              <Button
                                as={Link}
                                to="/login"
                                onClick={context.setLogin}
                              >
                                <Icon name="cart" />
                              </Button>
                            }
                          />
                        )}
                      </Grid.Column>
                      <Grid.Column>
                        <MoreButton product={product} />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Card.Content>
              </Segment>
            </Card>
          ))}
      </Card.Group>
    </>
  );
}

export default Products;

export const ADD_TO_CART_MUTATION = gql`
  mutation addToCart($userId: String, $productId: String) {
    addToCart(userId: $userId, productId: $productId) {
      _id
    }
  }
`;
