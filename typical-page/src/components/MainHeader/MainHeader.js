import Navigation from './Navigation'
import './MainHeader.css'

const MainHeader = (props) => {
    return (
        <header className="main-header">
            <h1>A Typical Page</h1>
            <Navigation loggedIn={props.isAuthenticated} onLogout={props.onLogout} />
        </header>
    )
} 

export default MainHeader