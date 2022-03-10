import {Link} from "react-router-dom";

const Sidebar1 = (props) => {
    const  style={
        cursor: 'pointer',
        listStyleType: 'none',
        background: '#6C757D' ,
        color: '#fff' ,
        fontWeight: 'bold' ,
        borderRadius: '5px',
        marginBottom:'3px',
        padding:'3px'
    }
    return (
            <div className="mt-1">
                {/*<h4 className="mb-3"> Categories </h4>*/}
                <ul className="pl-0">
                    <li style={style}>
                        <Link to="/" className="">
                            <i className="bx bx-border-all"/>
                            <span>Homepage</span>
                        </Link>
                    </li>
                    <li style={style}>
                        <Link to="/dashboard" className="">
                            {/*<i className="bx bx-border-all"/>*/}
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li style={style}>
                        <Link to="/product" className="">
                            {/*<i className="bx bx-border-all"/>*/}
                            <span>Products</span>
                        </Link>
                    </li>
                    <li style={style}>
                        <Link to="/product/create" className="">
                            {/*<i className="bx bx-border-all"/>*/}
                            <span>Products Create</span>
                        </Link>
                    </li>

                </ul>
            </div>
    )
}

export default Sidebar1;
