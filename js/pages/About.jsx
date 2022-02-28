import { AppHeader } from "../cmps/AppHeader.jsx";
export class About extends React.Component {
  gInterval;

  componentDidMount() {
    this.gInterval = setInterval(() => { }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.gInterval);
  }

  render() {
    return (
      <div>
        <AppHeader />
        <section className="about">
          <header className="about-header">
            <h1>About Us</h1>
          </header>
          <section className="team">
            <div className="team-member">
              <img className="card-image" src="./assets/img/ram.jpg" />
              <div className="card-text">
                <h2>Ram Be'er</h2>
                <p>
                  25 years old From Omer Near Be'er Sheva , Southern District.
                  <br />
                  Student at MisterBit , Coding Academy.
                  <br />
                  Love to write code 👨‍💻 playing football ⚽ &#38; Food 🍖🍗🍔🍕
                </p>
              </div>
              <div className="card-icons">
                <div className="media-icons">
                  <a
                    href="https://www.facebook.com/ram.beer.7/"
                    target="_blank"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="https://github.com/RamBeer6" target="_blank">
                    <i className="fab fa-github"></i>
                  </a>
                  <a href="https://www.instagram.com/rambeer6/" target="_blank">
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="team-member">
              <img
                className="card-image" src="./assets/img/woman.jpg"
              />
              <div className="card-text">
                <h2>Nicole Elezra</h2>
                <p>
                  26 years old From Ashkelon , Southern District.
                  <br />
                  Student at MisterBit , Coding Academy.
                  <br />
                  Love to write code 👨‍💻 Crossfit &#38; Food 🍖🍗🍔🍕
                </p>
              </div>
              <div className="card-icons">
                <div className="media-icons">
                  <a
                    href="https://www.facebook.com/nicole.morozov.1/"
                    target="_blank"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="https://github.com/Nikol-mor" target="_blank">
                    <i className="fab fa-github"></i>
                  </a>
                  <a
                    href="https://www.instagram.com/nicole_elezra/"
                    target="_blank"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </section>
      </div>
    );
  }
}
