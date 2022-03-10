import React from "react";
// import { withRouter } from "react-router-dom"
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Loader from "./Loader";

const Layout = props => {
    const loading=false;
    return (
        <React.Fragment>

            <div id="layout-wrapper">
                <Header />
                <section id="products" className=" mt-2">
                    <div className="row">
                        <div className="col-md-2 mb-5">
                            <Sidebar/>
                        </div>
                        <div className="col-md-10">
                            <div className="main-content">{props.children}</div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        </React.Fragment>
    )
}

Layout.propTypes = {
}

// export default withRouter(Layout)
export default Layout
