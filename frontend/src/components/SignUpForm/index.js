import React from "react";
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBCardHeader,} from 'mdbreact';
import { Link, Redirect } from "react-router-dom";
class SignUpForm extends React.Component {
  constructor(props) {
    super(props);

		this.handleChange = this.handleChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this);
    this.createUser = this.createUser.bind(this);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      password: '',
      redirectTo: null
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  componentDidMount() {
    this.createUser();
  }

  onSubmit(e) {
    e.preventDefault();
    this.componentDidMount()
  }

  createUser() {
    const user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      mobile: this.state.mobile,
      password: this.state.password
    }

    axios.post('http://localhost:5000/users/register', user)
      .then(res => {
        console.log(res.data)
        if (res.status === 200) {
          console.log("take me to login page")
          this.setState({
            redirectTo: '/login'
          })
        }
      })
      .catch(error => {
        console.log(error.response);
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
              <div className="sign-in">
                <MDBCardHeader className="form-header indigo rounded" >
                  <h3 className="my-3">
                    <MDBIcon icon="user-alt" className="text-white"/>
                    <strong className="font-weight-bold text-white"> Skapa konto</strong>
                  </h3>
                </MDBCardHeader>
                <br / >
              </div>
              <form onSubmit={this.onSubmit}>
                <label htmlFor="firstName" className="dark-grey-text">
                  Förnamn
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="form-control"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                  name="firstName"
                />
                <br />
                <label htmlFor="lastName" className="dark-grey-text">
                  Efternamn
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="form-control"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                  name="lastName"
                />
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
                <label htmlFor="mobile" className="dark-grey-text">
                  Mobile nummer
                </label>
                <input
                  type="number"
                  id="mobile"
                  className="form-control"
                  value={this.state.mobile}
                  onChange={this.handleChange}
                  name="mobile"
                />
                <br />
                <label
                  htmlFor="password"
                  className="dark-grey-text"
                >
                  Lösenord
                </label>
                <input
                  autoComplete="password"
                  type="password"
                  id="password"
                  className="form-control"
                  value={this.state.password}
                  onChange={this.handleChange}
                  name="password"
                />
                <div className="text-center mt-4">
                  <MDBBtn color="indigo" type="submit" className="font-weight-bold">
                    Skapa konto
                  </MDBBtn>
                </div>
                <br />
                <p className="font-small grey-text d-flex justify-content-center">
                  Är du redan kund?
                  <Link to="/login" className="dark-grey-text font-weight-bold ml-1">
                    Logga in
                  </Link>
                </p>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      );
    }
  }
}

export default SignUpForm;
