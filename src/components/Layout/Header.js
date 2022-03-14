import { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import '../../App.css';
import { Link } from 'react-router-dom';
import {logout} from "../../helpers/backend_helper";
// import Search from './Search';
// import { logout } from '../../actions/userActions';
// import logo from "../../../public/images/logo.png";

const Header = () => {
    const [keyword, setKeyword] = useState('');
    // const dispatch = useDispatch();

    // const { loading, user } = useSelector((state) => state.auth);
    // const { totalItems } = useSelector((state) => state.cart);

    // useEffect(() => {
    //     cartquatity.current = cartItems.reduce(
    //         (acc, item) => item.quantity + acc,
    //         0
    //     );
    // }, [totalItems]);

    const handleLogout = async () => {
        await logout({});
    };

    return (
        <>
            <nav className="navbar row">
                <div className="col-12 col-md-3">
                    <div className="navbar-brand">
                        <Link to="/" onClick={() => setKeyword('')}>
                            {/*<img src={logo} alt="logo" />*/}
                        </Link>
                    </div>
                </div>

                <div className="col-12 col-md-6 mt-2 mt-md-0">
                    {/* <Route
                        render={({ history }) => (
                            <Search
                                history={history}
                            />
                        )}
                    /> */}
                    {/*<Search keyword={keyword} setKeyword={setKeyword} />*/}
                </div>

                <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                    <Link
                        // to="/cart"
                        to="#"
                    >
                        <span id="cart" className="ml-3">
                            Cart
                        </span>
                        <span className="ml-1" id="cart_count">
                            {/*{totalItems}*/}
                        </span>
                    </Link>
                    {/*{user ? (*/}
                        <div className="ml-4 dropdown d-inline">
                            <Link
                                to="#"
                                className="btn dropdown-toggle text-white"
                                type="button"
                                id="dropDownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false">
                                <figure className="avatar avatar-nav">
                                    <img
                                        // src={user.avatar && user.avatar.url}
                                        // alt={user && user.name}
                                        className="rounded-circle"
                                    />
                                </figure>
                                <span>"user1"</span>
                            </Link>
                            <div
                                className="dropdown-menu"
                                aria-labelledby="dropDownMenuButton">
                                {/*{user && user.role === 'admin' && (*/}
                                    <Link
                                        to="/dashboard"
                                        className="dropdown-item">
                                        Dashboard
                                    </Link>
                                {/*)}*/}
                                <Link
                                    to="#"
                                    // to="/me"
                                    className="dropdown-item">
                                    Profile
                                </Link>
                                <Link
                                    to="#"
                                    // to="/orders/me"
                                    className="dropdown-item">
                                    Orders
                                </Link>
                                <Link
                                    to="#"
                                    // to="/"
                                    className="dropdown-item text-danger"
                                    onClick={handleLogout}
                                    >
                                    Logout
                                </Link>
                            </div>
                        </div>
                    {/*) : (*/}
                    {/*     !loading && (*/}
                            <Link
                                to="#"
                                to="/login"
                                className="btn ml-4"
                                id="login_btn">
                                Login
                            </Link>
                        {/*// )*/}
                    {/*)}*/}
                </div>
            </nav>
        </>
    );
};

export default Header;
