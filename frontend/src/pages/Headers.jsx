import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Headers.css'; // Import custom styles for sliding effect
import { useState } from 'react';

const Headers = () => {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

    return (
        <nav className="navbar navbar-expand-lg navbar-light " style={{ backgroundColor: '#ff69b4' }}>
            <div className="container-fluid  ">
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <Link className="navbar-brand" to="/">
                        My Gallery
                    </Link>
                    <div className="exp ">
                        <ul className="  navbar-nav  d-flex flex-row justify-content-end gap-2" style={{ width: '100%',marginLeft:"80VH" }}>
                            <li className="nav-item">
                                <Link to="/add-image">
                                    <button className="btn btn-outline-primary mr-2">Add Image</button>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/add-category">
                                    <button className="btn btn-outline-secondary">Add Category</button>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <button
                    className="navbar-toggler"
                    type="button"
                    aria-controls="navbarNav"
                    aria-expanded={!isNavCollapsed}
                    aria-label="Toggle navigation"
                    onClick={handleNavCollapse}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className={`navbar-collapse sliding-collapse ${isNavCollapsed ? 'collapsed' : 'expanded'}`}
                    id="navbarNav"
                >
                    <ul className="navbar-nav ml-auto d-flex flex-row align-items-end justify-end gap-2" style={{justifyContent:"end"}}>
                        <li className="nav-item mt-2">
                            <Link to="/add-image">
                                <button className="btn btn-outline-primary w-100">Add Image</button>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/add-category">
                                <button className="btn btn-outline-secondary w-100">Add Category</button>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Headers;
