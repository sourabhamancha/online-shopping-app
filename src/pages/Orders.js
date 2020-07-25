import React, { useContext } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../context/auth";
import moment from "moment";
// sem-ui
import { Table, Image } from "semantic-ui-react";

function Orders() {
  const context = useContext(AuthContext);
  const { loading, error, data } = useQuery(FETCH_ALL_ORDERS_QUERY, {
    variables: { userId: context.user ? context.user.userId : "" },
  });

  if (loading) return <h1>Loading...</h1>;

  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <h1>Recent Purchases</h1>
      <Table color="teal" key="teal" inverted>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Image</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Category</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.orders.map((order) => (
            <Table.Row key={order._id}>
              <Table.Cell>
                <Image src={order.product.imageUrl} size="tiny" />
              </Table.Cell>
              <Table.Cell>{order.product.name}</Table.Cell>
              <Table.Cell>{moment(order.createdAt).fromNow(true)}</Table.Cell>
              <Table.Cell>${order.product.price}</Table.Cell>
              <Table.Cell>{order.product.category}</Table.Cell>
              <Table.Cell>{order.product.description}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default Orders;

export const FETCH_ALL_ORDERS_QUERY = gql`
  query($userId: String) {
    orders(userId: $userId) {
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
