import { useState, useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import MetaData from '../../../components/Layout/MetaData'
// import { useAlert } from 'react-alert'
import {login} from "../../../helpers/backend_helper";
// import { login, clearErrors } from '../../actions/userActions'


const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // const { loading, error, isAuthenticated } = useSelector(state => state.auth)
    const loading=false;

    // const alert = useAlert()

    // const dispatch = useDispatch()
    // useEffect(() => {
    //
    //     if (error) {
    //         alert.error(error)
    //         dispatch(clearErrors())
    //     }
    // }, [error, alert, dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login({username:email,password});
        // dispatch(login(email, password))
    }

    return (
        <>
            <MetaData title='login' />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form onSubmit={handleSubmit} className="shadow-lg">
                        <h1 className="mb-3">Login</h1>
                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input onChange={(e) => setEmail(e.target.value)} type="email" id="email_field" className="form-control" value={email} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" id="password_field" className="form-control" value={password} />
                        </div>

                        {/*<Link to="/forgot-password" className="float-right mb-4">Forgot Password?</Link>*/}

                        <button disabled={loading ? true : false} id="login_button" type="submit" className="btn btn-block py-3">
                            LOGIN
                        </button>

                        <Link to="/register" style={{ fontSize: '18px' }} className="float-right mt-3 font-weight-bold text-info">New User ?</Link>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
