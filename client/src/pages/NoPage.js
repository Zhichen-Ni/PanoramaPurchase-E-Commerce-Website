import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";

function NoPage() {
  const navigate = useNavigate();
  return (<div>
    <h1>The resource you are looking for does not exist :(</h1>
    <Button onClick={() => navigate("/")}>Home</Button>
  </div>)
}

export default NoPage;
