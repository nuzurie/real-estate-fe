import Navbar from './Navbar'
import React, {Fragment} from "react";
// import Footer from './footer'


function Layout(children: React.ReactNode) {
    return (
        <Fragment>
            <Navbar />
            <main>{children}</main>
        </Fragment>
    )
}

export default Layout;
// export default function Layout({ children }) {
//     return (
//         <>
//             <Navbar />
//         <main>{children}</main>
//         <Footer />
//         </>
//     )
// }