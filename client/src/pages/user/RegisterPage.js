import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../stores/user";
import Api from "../../lib/api";


function RegisterPage() {
  const [successMessage, setSuccessMessage] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [profile] = useState("profile")
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const handleCheckboxChange = () => {
    setIsAdmin(!isAdmin);
  }
  const register = () => {
    Api.register(userName, password, profile, isAdmin)
      .then(res => {
        setSuccessMessage(true);
        setUserName("");
        setPassword("");
      })
      .catch(err => {
        if (err.response) {
          alert("Login Failed");
        } else
          alert("Failed to retrieve products");
      });
  };
  useEffect(() => {
    if (user !== null) {
      navigate("/");
    }
  }, [user, navigate]);
  return (
    <div style={{ marginLeft: "40%", marginTop: "15%" }}>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label style={{ fontWeight: "500" }} className="font-weight-bold">Set Username</Form.Label>
          <Form.Control style={{ maxWidth: "250px" }} type="email" placeholder="Enter Username" value={userName} onChange={e => setUserName(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label style={{ fontWeight: "500" }}>Set Password</Form.Label>
          <Form.Control style={{ maxWidth: "250px" }} type="password" placeholder="New Password" value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="This account will be an admin account" onChange={handleCheckboxChange} />
        </Form.Group>
        <Button style={{ marginRight: "5px" }} onClick={() => register()}>
          Register
        </Button>
        <Button onClick={() => navigate("/")}>
          Back to Homepage
        </Button>
        {successMessage && <Form.Group style={{ color: "green", display: "flex" }} ><p className="font-weight-bold" style={{ marginTop: "15px" }}>Registered Successfully, you may</p>
          <Button style={{ paddingLeft: "5px " }} variant="link" onClick={() => navigate("/login")}>Log in</Button>
        </Form.Group>}
      </Form>
    </div>
  );
};

export default RegisterPage;
