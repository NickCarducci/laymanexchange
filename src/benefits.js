import React from "react";

export default class Benefits extends React.Component {
  constructor(props) {
    super(props);

    //let testing = [];
    let noData = [];
    let date = [];
    let ages = [];
    let wage = [];
    let wageData = [];
    let social = [];
    let socialData = [];
    let benefits = [];
    let benefitsData = [];
    let rent = [];
    let rentData = [];

    const years = {
      2018: {
        wage: 9323.5,
        benefits: 2124.2,
        rentCCA: 692.1,
        interest: 1652,
        dividends: 1316,
        social: 3083.1
      },
      2019: {
        wage: 9323.5,
        benefits: 2124.2,
        rentCCA: 692.1,
        interest: 1652,
        dividends: 1316,
        social: 3083.1
      }
    };
    Object.keys(years).forEach((year) => {
      const d = years[year];
      date.push(year);
      wageData.push([year, d.wage]);
      wage.push(d.wage);
      benefitsData.push([year, d.benefits]);
      benefits.push(d.benefits);
      socialData.push([year, d.social]);
      social.push(d.social);
      rentData.push([year, d.rentCCA + d.interest + d.dividends]);
      rent.push(d.rentCCA + d.interest + d.dividends);
      return noData.push([year, 0]);
    });
    var lowVotes = 0; //Math.min(...rent, ...benefits);
    var lowDate = Math.min(...date);
    var highVotes = Math.max(...rent, ...benefits, ...wage);
    var highDate = Math.max(...date);
    //console.log(dataData);
    var state = {
      years,
      ages,
      socialData,
      rentData,
      benefitsData,
      wageData,
      noData,
      yAxis: highVotes - lowVotes,
      xAxis: highDate - lowDate,
      lowVotes,
      highVotes,
      highDate,
      lowDate
    };
    this.state = state;
  }
  render() {
    const { ages } = this.state;
    const labelstyle = {
      backgroundColor: "rgba(50,120,200,.6)",
      top: "0px",
      height: "min-content",
      display: "flex",
      maxWidth: "100%",
      left: "2px",
      flexWrap: "wrap"
    };
    const buttonStyle = {
      userSelect: "none",
      border: "1px solid black",
      color: "black",
      backgroundColor: "rgb(220,220,220)",
      borderRadius: "4px",
      padding: "5px",
      margin: "2px"
    };

    const shortNumber = (scler, notRound) => {
      var newnum = String(Math.round(scler));
      if (notRound) newnum = String(scler);
      var app = null;
      var decimal = null;
      const suff = ["", "k", "m", "b", "t"];
      for (let i = 0; i < suff.length; i++) {
        if (newnum.length > 3) {
          decimal = newnum[newnum.length - 3];
          newnum = newnum.substring(0, newnum.length - 3);
        } else {
          app = i;
          break;
        }
      }
      return newnum + (decimal ? "." + decimal : "") + suff[app];
    };
    //console.log(this.state.oilprice);
    const coefficience = (this.props.lastWidth - 60) / this.props.lastWidth;
    const noData = this.state.noData.map(([x, y]) => [
      ((x - this.state.lowDate) / this.state.xAxis) *
        coefficience *
        this.props.lastWidth,
      0
    ]);
    //console.log(this.state.oilprice);

    const lineheight = this.props.lineheight ? this.props.lineheight : 200;
    const linecss = {
      left: "0px",
      bottom: "0px",
      display: "flex",
      position: "absolute",
      width: "100%",
      height: lineheight + 10,
      transform: "translate(0%,0%) scale(1,-1)"
    };

    const socialData = this.state.socialData.map(([x, y]) => [
      ((x - this.state.lowDate) / this.state.xAxis) *
        coefficience *
        this.props.lastWidth,
      ((y - this.state.lowVotes) / this.state.yAxis) * lineheight
    ]);
    const wageData = this.state.wageData.map(([x, y]) => [
      ((x - this.state.lowDate) / this.state.xAxis) *
        coefficience *
        this.props.lastWidth,
      ((y - this.state.lowVotes) / this.state.yAxis) * lineheight
    ]);
    const benefitsData = this.state.benefitsData.map(([x, y]) => [
      ((x - this.state.lowDate) / this.state.xAxis) *
        coefficience *
        this.props.lastWidth,
      ((y - this.state.lowVotes) / this.state.yAxis) * lineheight
    ]);
    const rentData = this.state.rentData.map(([x, y]) => [
      ((x - this.state.lowDate) / this.state.xAxis) *
        coefficience *
        this.props.lastWidth,
      ((y - this.state.lowVotes) / this.state.yAxis) * lineheight
    ]);
    //console.log(rentData);
    return (
      <div
        style={{
          width: "100%",
          height: lineheight + 80,
          position: "relative",
          backgroundColor: "black"
        }}
      >
        <div
          style={{
            zIndex: "9",
            backgroundColor: "rgba(255,255,255,.7)",
            padding: "4px 8px",
            position: "absolute",
            right: "0px"
          }}
        >
          <a href="https://www.state.nj.us/state/elections/assets/pdf/election-results/2020/2020-official-general-voter-turnout.pdf">
            {this.state.lowDate}
            &nbsp;-&nbsp;
            {this.state.highDate}
          </a>
        </div>
        <div
          style={{
            color: "white",
            userSelect: "none",
            cursor: "pointer",
            display: "flex",
            backgroundColor: "rgba(255,255,255,.1)",
            height: "40px",
            position: "relative"
          }}
        >
          <b>
            <span
              style={{
                color: "deepskyblue"
              }}
            >
              Wages
            </span>{" "}
            2019{" "}
            <a
              href="https://apps.bea.gov/iTable/iTable.cfm?reqid=19&step=3&isuri=1&select_all_years=0&nipa_table_list=58&series=a&first_year=2019&last_year=2019&scale=-9&categories=survey#reqid=19&step=3&isuri=1&select_all_years=0&nipa_table_list=58&series=a&first_year=2019&last_year=2019&scale=-9&categories=survey"
              style={{ color: "firebrick" }}
            >
              Rent, Interest, and Dividends
            </a>{" "}
            <span
              style={{
                fontSize: "10px",
                fontWeight: "normal",
                color: "orange"
              }}
            >
              gift tax unlimited
            </span>
            <br />
            <span
              style={{
                color: "darkmagenta"
              }}
            >
              Social
            </span>{" "}
            <span
              style={{
                color: "tan"
              }}
            >
              Corporate benefits (camp,{" "}
              <span
                style={{
                  color: "orange"
                }}
              >
                tuition, medical
              </span>
              , retreats, lunch)
            </span>
          </b>
        </div>
        <div style={{ position: "absolute", color: "grey", right: "50px" }}>
          {Object.keys(this.state.years[2019]).map((x) => (
            <div
              key={x}
              style={{
                color:
                  x === "wage"
                    ? "deepskyblue"
                    : x === "benefits"
                    ? "orange"
                    : x === "social"
                    ? "darkmagenta"
                    : ""
              }}
            >
              {x}: ${shortNumber(this.state.years[2019][x] * 1000000000)}/yr
            </div>
          ))}
        </div>
        <div style={{ height: lineheight + 20, position: "relative" }}>
          <svg
            className="all"
            style={linecss}
            xmlns="http://www.w3.org/2000/svg"
          >
            {noData.map(
              ([x, y], i) =>
                !isNaN(x) &&
                !isNaN(y) && (
                  <rect
                    x={x}
                    y={y}
                    width={100}
                    height={1}
                    stroke="rgb(200,200,230)"
                    fill="transparent"
                    strokeWidth={4}
                    key={i}
                  />
                )
            )}
            {socialData.map(([x, y], i) => {
              return (
                !isNaN(x) &&
                !isNaN(y) && (
                  <rect
                    x={x}
                    y={y}
                    transform=".3s ease-in"
                    width={3}
                    height={3}
                    stroke="darkmagenta"
                    fill="blue"
                    opacity={1}
                    strokeWidth={4}
                    key={i}
                  />
                )
              );
            })}
            {benefitsData.map(([x, y], i) => {
              return (
                !isNaN(x) &&
                !isNaN(y) && (
                  <rect
                    x={x}
                    y={y}
                    transform=".3s ease-in"
                    width={3}
                    height={3}
                    stroke="orange"
                    fill="blue"
                    opacity={1}
                    strokeWidth={4}
                    key={i}
                  />
                )
              );
            })}
            {wageData.map(([x, y], i) => {
              return (
                !isNaN(x) &&
                !isNaN(y) && (
                  <rect
                    x={x}
                    y={y}
                    transform=".3s ease-in"
                    width={3}
                    height={3}
                    stroke="deepskyblue"
                    fill="blue"
                    opacity={1}
                    strokeWidth={4}
                    key={i}
                  />
                )
              );
            })}
            {rentData.map(([x, y], i) => {
              return (
                !isNaN(x) &&
                !isNaN(y) && (
                  <rect
                    x={x}
                    y={y}
                    transform=".3s ease-in"
                    width={3}
                    height={3}
                    stroke="firebrick"
                    fill="blue"
                    opacity={1}
                    strokeWidth={4}
                    key={i}
                  />
                )
              );
            })}
          </svg>
        </div>
      </div>
    );
  }
}
