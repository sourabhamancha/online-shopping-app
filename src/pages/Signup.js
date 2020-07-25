import React, { useContext, useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/auth";
// sem-ui
import { Grid, Form, Button } from "semantic-ui-react";

function Signup() {
  const context = useContext(AuthContext);

  const history = useHistory();

  const [regValues, setRegValues] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const [registerUser, { loading: mutationLoading }] = useMutation(
    REGISTER_USER_MUTATION,
    {
      update(_, result) {
        context.login(result.data.registerUser);
        history.push("/");
        context.setHome();
      },
      variables: regValues,
      onError(err) {
        setErrors(err.graphQLErrors[0].extensions.errors);
      },
    }
  );

  const handleOnChange = (e) => {
    setRegValues({ ...regValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser();
  };
  return (
    <Grid centered columns={3}>
      <Grid.Column>
        <Form
          onSubmit={handleSubmit}
          className={mutationLoading ? "loading" : ""}
        >
          <Form.Field>
            <label>Fullname</label>
            <input
              placeholder="Fullname.."
              name="fullname"
              value={regValues.fullname}
              onChange={handleOnChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input
              placeholder="Email.."
              name="email"
              value={regValues.email}
              onChange={handleOnChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              type="password"
              placeholder="Password.."
              name="password"
              value={regValues.password}
              onChange={handleOnChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password.."
              name="confirmPassword"
              value={regValues.confirmPassword}
              onChange={handleOnChange}
            />
          </Form.Field>
          <Button color="teal" type="submit">
            Signup
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

const REGISTER_USER_MUTATION = gql`
  mutation registerUser(
    $fullname: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    registerUser(
      input: {
        fullname: $fullname
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      userId
      token
    }
  }
`;

export default Signup;
