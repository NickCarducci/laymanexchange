import React from "react";
//import TwitterTweetEmbed from "./TwitterTweetEmbed";
import { UAParser } from "ua-parser-js";
//import Benefits from "./benefits";
import Cable from "./Dropwire";
//import Turnout from "./njturnout";
//import Petition from "./Petition";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    var parser = new UAParser();
    const name = parser.getBrowser().name;
    console.log(name);
    this.state = {
      trigger: false,
      browser: name,
      serviceCancelingImages: name.includes("Safari")
    };
    for (let i = 0; i < 220; i++) {
      this["scrollImg" + i] = React.createRef();
    }
  }
  componentDidMount = () => {
    window.addEventListener("resize", this.refresh);
    window.addEventListener("scroll", this.handleScroll);
    this.refresh(true);
    this.handleScroll();
  };
  componentWillUnmount = () => {
    clearTimeout(this.check);
    clearTimeout(this.scrollTimeout);
    clearTimeout(this.resizeTimer);
    window.removeEventListener("resize", this.refresh);
    window.removeEventListener("scroll", this.handleScroll);
  };
  handleScroll = (e) => {
    if (!this.state.offScroll) {
      const scrollTop = window.scrollY;
      this.setState(
        {
          scrolling: true,
          scrollTop
        },
        () => {
          clearTimeout(this.scrollTimeout);
          this.scrollTimeout = setTimeout(() => {
            this.setState({
              scrolling: false
            });
          }, 900);
        }
      );
    }
  };
  refresh = (first) => {
    const width =
      (this.state.ios ? window.screen.availWidth : window.innerWidth) - 20;
    if (first || Math.abs(this.state.lastWidth - width) > 0) {
      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(() => {
        this.setState({
          lastWidth: width,
          width,
          availableHeight: this.state.ios
            ? window.screen.availHeight - 20
            : window.innerHeight
        });
      }, 600);
    }
  };
  componentDidUpdate = (prevProps) => {
    if (this.props.pathname !== prevProps.pathname) {
      clearTimeout(this.check);
      const check = () => {
        if (this.props.pathname !== "/") {
          this.setState({ trigger: true });
        }
        if (this.props.pathname === "/edu") {
          // window.scroll(0, this.edu.current.offsetTop);
        }
      };
      check();
      this.check = setTimeout(check, 4000);
    }
  };
  render() {
    const handleScollImgError = (e) => {
      if (e.message) {
        console.log(e.message);
        this.setState({ serviceCancelingImages: true });
      }
    };
    let arrayOfnumbers = 0;
    const scrollnum = () => {
      arrayOfnumbers = arrayOfnumbers + 1; //arrayOfnumbers[arrayOfnumbers.length - 1] + 1;
      //arrayOfnumbers.push(num);
      //console.log(arrayOfnumbers)
      return arrayOfnumbers;
    };
    const space = " ";
    return (
      <div
        style={{
          overflow: "hidden",
          //margin: "5px",
          fontFamily: "arial, sans serif",
          wordBreak: "break-word",
          textAlign: "left",
          width: "100%",
          maxWidth: "600px",
          position: "relative"
        }}
      >
        <div
          style={{
            float: "right",
            width: "300px"
            //width: `calc(${Math.min(600, this.state.width)}px - 70%)`
          }}
        >
          <div>
            <a href="https://truncatedwholesaletax.quora.com">
              <Cable
                style={{
                  backgroundColor: "white",
                  width: "100%",
                  height: "auto"
                }}
                onError={handleScollImgError}
                img={true}
                src={
                  this.state.noyout
                    ? ""
                    : "https://www.dl.dropboxusercontent.com/s/vsjqo5xgajgsom9/PhD%20economists.png?dl=0"
                }
                float={null}
                title="https://truncatedwholesaletax.quora.com"
                scrolling={this.state.scrolling}
                fwd={this["scrollImg" + scrollnum()]}
                scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
                scrollTop={this.state.scrollTop}
              />
            </a>
          </div>
          <div>
            <a href="https://academia.stackexchange.com/questions/186829/why-do-the-mathematics-fields-allow-phd-economists-to-not-define-shifts-of-a-mad">
              Econ
            </a>
          </div>
        </div>
        <div
          style={{
            position: "fixed",
            right: "0px",
            bottom: "0px",
            opacity: ".5"
          }}
        >
          <a
            href="https://github.com/nickcarducci"
            style={{
              color: "black",
              textDecoration: "none"
            }}
          >
            truncated wholesale tax NJ 2024
          </a>
        </div>
        I'm currently trying to convince the economist PhD's that they must
        define utility as leisure preferred as thev do shifts in price such is
        change-rate units not macroeconomic levels.
        <div>
          <a href="https://truncatedwholesaletax.quora.com">
            <Cable
              style={{
                backgroundColor: "white",
                width: "100%",
                height: "auto"
              }}
              onError={handleScollImgError}
              img={true}
              src={
                this.state.noyout
                  ? ""
                  : "https://www.dl.dropboxusercontent.com/s/4i13nuq6of791tk/stack%20exchange%20donee%20beneficiary%20credit.png?dl=0"
              }
              float={null}
              title="https://truncatedwholesaletax.quora.com"
              scrolling={this.state.scrolling}
              fwd={this["scrollImg" + scrollnum()]}
              scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
              scrollTop={this.state.scrollTop}
            />
          </a>
        </div>
      </div>
    );
  }
}
