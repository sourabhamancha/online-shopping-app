import React, { useContext, useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { AuthContext } from "../context/auth";
import { FETCH_ALL_PRODUCTS_QUERY } from "../pages/Home";

// sem-ui
import { Icon, Button, Modal, Form, Grid } from "semantic-ui-react";

function AddProduct() {
  const context = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [prodVal, setProdVal] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    imageUrl: "",
  });

  const [createProduct, { loading: mutationLoading }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      onError(err) {},
      refetchQueries: [
        {
          query: FETCH_ALL_PRODUCTS_QUERY,
          variables: { userId: context.user ? context.user.userId : "" },
        },
      ],
    }
  );

  const handleOnChange = (e) => {
    setProdVal({ ...prodVal, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = () => {
    prodVal.creatorId = context.user ? context.user.userId : "";
    console.log(prodVal);
    createProduct({ variables: prodVal });
    setProdVal({
      name: "",
      category: "",
      price: "",
      description: "",
      imageUrl: "",
    });
    setOpen(false);
  };

  return (
    <div>
      <Modal
        trigger={
          <Button color="teal" onClick={() => setOpen(true)}>
            <Icon name="add" />
            Add Product
          </Button>
        }
        open={open}
        onClose={() => setOpen(false)}
        dimmer="inverted"
      >
        <Modal.Header>List your product</Modal.Header>

        <Modal.Description>
          <Grid centered columns={2}>
            <Grid.Column>
              <hr style={{ visibility: "hidden" }} />
              <Form
                onSubmit={handleOnSubmit}
                className={mutationLoading ? "loading" : ""}
              >
                <Form.Field>
                  <label>Name</label>
                  <input
                    placeholder="Name..."
                    name="name"
                    value={prodVal.name}
                    onChange={handleOnChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Catergory</label>
                  <input
                    placeholder="Catergory..."
                    name="category"
                    value={prodVal.category}
                    onChange={handleOnChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Price</label>
                  <input
                    placeholder="Price..."
                    name="price"
                    value={prodVal.price}
                    onChange={handleOnChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Description</label>
                  <input
                    placeholder="Description..."
                    name="description"
                    value={prodVal.description}
                    onChange={handleOnChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Image Link</label>
                  <input
                    placeholder="Image Link..."
                    name="imageUrl"
                    value={prodVal.imageUrl}
                    onChange={handleOnChange}
                  />
                </Form.Field>
                <hr style={{ visibility: "hidden" }} />
                <Button color="teal" type="submit">
                  Submit
                </Button>
                <Button color="black" onClick={() => setOpen(false)}>
                  Continue Shopping
                </Button>
                <hr style={{ visibility: "hidden" }} />
              </Form>
            </Grid.Column>
          </Grid>
        </Modal.Description>
      </Modal>
    </div>
  );
}

export default AddProduct;

const CREATE_PRODUCT_MUTATION = gql`
  mutation createProduct(
    $creatorId: String!
    $name: String!
    $category: String!
    $price: String!
    $description: String!
    $imageUrl: String!
  ) {
    createProduct(
      input: {
        creatorId: $creatorId
        name: $name
        category: $category
        price: $price
        description: $description
        imageUrl: $imageUrl
      }
    ) {
      _id
    }
  }
`;
