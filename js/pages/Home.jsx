const { Link, NavLink, withRouter } = ReactRouterDOM;

export function Home() {
    return (
        <section className="home">
            <input type="checkbox" id="check" />
            <header>
                <h1 className="logo" onClick={() => this.props.history.push("/")}>
                    Appsus
                </h1>
                <nav className="app-nav">
                    <NavLink activeClassName="my-active" exact to="/">
                        Home
                    </NavLink>{" "}
                    <NavLink activeClassName="my-active" to="/about">
                        About
                    </NavLink>{" "}
                    <NavLink activeClassName="my-active" to="/book">
                        Books
                    </NavLink>
                    <NavLink activeClassName="my-active" to="/keep">
                        Keep
                    </NavLink>
                    <NavLink activeClassName="my-active" to="/mail">
                        Mail
                    </NavLink>
                </nav>
                <label htmlFor="check">
                    <i className="fas fa-bars menu-btn"></i>
                    <i className="fas fa-times close-btn"></i>
                </label>
            </header>
            <div className="content">
                <div className="info">
                    <h2>Welcome to our</h2>
                    <h2>
                        <span>Apssus App</span>
                    </h2>
                    <p>
                        Here you can manage and edit your most valueble Apps Like E-mail , Keep &#38; Still be conacted to your Favorite Book shop !
                        {/* <p></p> */}
                        At Appsus we are put <span>YOU</span> the user at <span>FIRST PRIORITY</span>
                    </p>
                    <a href="#" className="info-btn">
                        About Us
                    </a>
                </div>
            </div>
            <div className="media-icons">
                <a title="Under construction" href="http://www.comunicaffe.com/wp-content/uploads/2013/07/under-construction.jpg">
                    <i className="fab fa-facebook-f"></i>
                </a>
                <a title="I'm feeling lucky!" href="https://www.appsus.co.uk/">
                    <i className="fab fa-google"></i>
                </a>
            </div>
        </section>
    );
}
