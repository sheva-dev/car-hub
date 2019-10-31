import React from "react";
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBCardHeader,} from 'mdbreact';
import { Link, Redirect } from "react-router-dom";
class LoginFrom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    email: '',
    password: '',
    redirectTo: null,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    }

    axios.post('http://localhost:5000/users/auth', user)
      .then(response => {
        console.log(response.data)
        if (response.status === 200) {
          const token = response.data.token
          localStorage.setItem('token', token)
          console.log("take me to home page")
          this.setState({
            redirectTo: '/'
          })
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    } else {
      return (
        <MDBContainer>
          <MDBRow>
            <MDBCol md="6">
              <form onSubmit={this.onSubmit}>
                <MDBCardHeader className="form-header indigo rounded" >
                  <h3 className="my-3">
                    <MDBIcon icon="lock" className="text-white" />
                    <strong className="font-weight-bold text-white"> Logga in</strong>
                  </h3>
                </MDBCardHeader>
                <br />
                <br />
                <label htmlFor="email" className="dark-grey-text">
                  E-post
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={this.state.email}
                  onChange={this.handleChange}
                  name="email"
                />
                <br />
                <label htmlFor="password" className="dark-grey-text">
                  Lösenord
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  autoComplete="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  name="password"
                />
                <div className="text-center mt-4">
                  <MDBBtn color="indigo" type="submit" className="font-weight-bold">logga in</MDBBtn>
                </div>
                <br />
                <p className="font-small grey-text d-flex justify-content-center">
                  Ny kund?
                  <Link to="/signup" className="dark-grey-text font-weight-bold ml-1">
                  Skapa ett konto
                  </Link>
                </p>
              </form>
            </MDBCol>
          </MDBRow>
          <p>{this.state.token}</p>
        </MDBContainer>
      );
    }
  }
}

export default LoginFrom;
