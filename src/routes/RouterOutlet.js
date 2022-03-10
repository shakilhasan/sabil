import {Outlet} from 'react-router-dom';
import Layout from "../components/Layout";

const RouterOutlet=()=>{
    return (<>
        <Layout>
             <Outlet/>
        </Layout>

    </>);

}

export default RouterOutlet;