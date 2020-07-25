import React, { useContext } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../context/auth";
// components
import HomePlaceholder from "../components/HomePlaceholder";
import Products from "../components/Products";

function Home() {
  const context = useContext(AuthContext);
  const { loading, error, data } = useQuery(FETCH_ALL_PRODUCTS_QUERY, {
    variables: { userId: context.user ? context.user.userId : "" },
  });
  if (loading) return <HomePlaceholder />;
  if (error) return `Error! ${error.message}`;
  return (
    <div>
      <Products products={data.products} />
    </div>
  );
}

export default Home;

export const FETCH_ALL_PRODUCTS_QUERY = gql`
  query products($userId: String) {
    products(userId: $userId) {
      _id
      userId
      creatorId
      name
      category
      price
      description
      imageUrl
      inCart
      isOrdered
    }
  }
`;
