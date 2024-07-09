import Logo from "../assets/images/trivia_trailz.jpg"
import { useNavigate } from "react-router-dom";


const NavBar = () =>{
    const navigate = useNavigate();
    return(
        <nav className="navbar bg-dark">
            <div className="container-fluid">
                <div className="row hover-pointer" onClick={()=>{
                    navigate('/')
                }}>
                    <div className="col-3">
                        <img src={Logo} alt="Logo" style={{width:"39px",borderRadius:"50px"}} />
                    </div>
                    <div className="col-4 d-flex">
                        <span className="navbar-brand text-light mb-0 fw-medium">The Trivia Trailz</span>
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default NavBar;