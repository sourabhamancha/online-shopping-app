import React, { useContext, useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/auth";
// sem-ui
import { Grid, Form, Button } from "semantic-ui-react";

function Login() {
  const context = useContext(AuthContext);
  const history = useHistory();
  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const [loginUser, { loading: mutationLoading }] = useMutation(
    LOGIN_USER_MUTATION,
    {
      update(_, result) {
        context.login(result.data.login);
        history.push("/");
        context.setHome();
      },
      variables: loginValues,
      onError(err) {
        setErrors(err.graphQLErrors[0].extensions.errors);
      },
    }
  );

  const handleOnChange = (e) => {
    setLoginValues({ ...loginValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };
  return (
    <Grid centered columns={3}>
      <Grid.Column>
        <Form
          onSubmit={handleSubmit}
          className={mutationLoading ? "loading" : ""}
        >
          <Form.Field>
            <label>Email</label>
            <input
              placeholder="Email.."
              name="email"
              value={loginValues.email}
              onChange={handleOnChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              type="password"
              placeholder="Password.."
              name="password"
              value={loginValues.password}
              onChange={handleOnChange}
            />
          </Form.Field>
          <Button color="teal" type="submit">
            Login
          </Button>
        </Form>
        {Object.keys(errors).length > 0 && (
          <div className="ui error message">
            <ul className="list">
              {Object.values(errors).map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </div>
        )}
      </Grid.Column>
    </Grid>
  );
}

const LOGIN_USER_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      userId
      token
    }
  }
`;

export default Login;
