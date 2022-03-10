import {Outlet} from 'react-router-dom';
import Layout from "../components/Layout";

const PrivateOutlet=()=>{
    const auth = true;

    return (<>
            {auth? <Outlet/>:<h1>Not authenticated</h1>}
    </>);

}

export default PrivateOutlet;