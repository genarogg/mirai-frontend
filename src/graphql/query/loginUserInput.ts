import { gql } from '@apollo/client';

const LOGIN_USER_MUTATION = gql`
  mutation LoginUser($input: LoginUserInput!) {
    loginUser(input: $input) {
      type
      message
      token
    }
  }
`;

export default LOGIN_USER_MUTATION;