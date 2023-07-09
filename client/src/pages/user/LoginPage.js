import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login as StoreLogin } from "../../stores/user";
import { selectUser } from "../../stores/user";
import Api from "../../lib/api";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const login = () => {
    Api.login(username, password)
      .then(res => {
        dispatch(StoreLogin(res));
        navigate("/");
      })
      .catch(err => {
        setLoginFailed(true);
        if (err.response) {
          console.log("Login Failed");
        } else {
          console.log("Failed to perform calls");
          console.error(err);
        }
      });
  };
  useEffect(() => {
    if (user !== null) {
      navigate("/");
    }
  }, [user, navigate]);
  return (
    <div style={{marginLeft:"40%", marginTop:"15%"}}>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label style={{fontWeight: "500"}}>Username</Form.Label>
          <Form.Control style={{maxWidth: "250px"}} type="text" placeholder="Enter email address" value={username} onChange={e => setUsername(e.target.value)} />
          <Form.Text id="usernameHelpBlock" muted>
            Username must be within 20 characters.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label style={{fontWeight: "500"}}>Password</Form.Label>
          <Form.Control style={{maxWidth: "250px"}} type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remember Me for 30 Days" />
        </Form.Group>
        {loginFailed ?
          <Form.Text id="failed" className="text-danger">
            Failed to Login, wrong user name or password
          </Form.Text> : null}
        <Form.Group style={{margin: "0" }}className="mb-3" controlId="formBasicCheckbox">
          <Button style={{marginRight: "5px"}} onClick={() => login()}>Log In</Button>
          <Button onClick={() => navigate("/")} >Back to Homepage</Button>
        </Form.Group>
        <Form.Group className="mb-3" controlId="newUserRegistration">
          <Button variant="link" onClick={() => navigate("/register")}>New User? Create Account</Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default LoginPage;
