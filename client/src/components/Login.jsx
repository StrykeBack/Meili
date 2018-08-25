import React from 'react'
// import gql from 'graphql'
// import { Query } from 'react-apollo'

import { Modal, Input, Icon, Header, Button } from 'semantic-ui-react'

// const CREATE_USERS = gql`
//   mutation CreateUsers(
//     $username: String
//     $password: String
//     $firebaseId: String
//   ) {
//     createUsers(
//       username: $username
//       password: $password
//       firebaseId: $firebaseId
//     ) {
//       id
//     }
//   }
// `

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    if (this.props.index === 2) {
      return (
        // <Query query={CREATE_USERS}>
        //   {(createUsers, { data }) => (
        <div>
          {this.props.index === 2 ? (
            <Modal onClose={this.props.closePopup} open={open} size='tiny'>
                <Header style={{ textAlign: 'center' }}>Log In</Header>
                <div style={{ textAlign: 'center' }}>
                  <Input iconPosition="left" placeholder="Email" size="mini">
                    <Icon name="at" />
                    <input
                      onChange={e => {
                        this.props.emailVariable(e)
                      }}
                    />
                  </Input>
                  <Input
                    iconPosition="left"
                    type="password"
                    placeholder="Password"
                    size="mini"
                  >
                    <Icon name="key" />
                    <input
                      onChange={e => {
                        this.props.passwordVariable(e)
                      }}
                    />
                  </Input>
                  <Button
                    size="mini"
                    icon="world"
                    onClick={this.props.loginWithEmail}
                  />
                  <br />
                  <br />
                  <p>Or Log In With Google/Facebook</p>
                  <a>
                    <i
                      className="google plus square icon huge"
                      onClick={this.props.loginWithGoogle}
                    />
                  </a>
                  <a>
                    <i
                      className="facebook square icon huge"
                      onClick={this.props.loginWithFacebook}
                    />
                  </a>
                </div>
            </Modal>
          ) : null}
        </div>
        //   )}
        // </Query>
      )
    } else {
      return null
    }
  }
}

export default Login