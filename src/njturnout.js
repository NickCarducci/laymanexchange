import React from "react";

export default class Turnout extends React.Component {
  constructor(props) {
    super(props);

    //let testing = [];
    let noData = [];
    let date = [];
    let ages = [];
    let eligible = [];
    let eligibleData = [];
    let novote = [];
    let novoteData = [];
    let vote = [];
    let voteData = [];

    [
      {
        year: 1992,
        votes: 3348312,
        eligible: 5800000
      },
      {
        year: 1996,
        votes: 3105110,
        eligible: 6005000
      },
      {
        year: 2000,
        votes: 3293378,
        eligible: 6332876
      },
      {
        year: 2004,
        votes: 3638153,
        eligible: 6542820
      },
      {
        year: 2008,
        votes: 3910220,
        eligible: 6635079
      },
      {
        year: 2012,
        votes: 3683638,
        eligible: 6838206
      },
      {
        year: 2016,
        votes: 3957303,
        eligible: 6926094
      },
      {
        year: 2020,
        votes: 4635686,
        eligible: 6947836
      }
    ].forEach((d) => {
      date.push(d.year);
      eligibleData.push([d.year, d.eligible]);
      eligible.push(d.eligible);
      novoteData.push([d.year, d.eligible - d.votes]);
      novote.push(d.eligible - d.votes);
      voteData.push([d.year, d.votes]);
      vote.push(d.votes);
      return noData.push([d.year, 0]);
    });
    var lowVotes = 0; //Math.min(...vote, ...novote);
    var lowDate = Math.min(...date);
    var highVotes = Math.max(...vote, ...novote, ...eligible);
    var highDate = Math.max(...date);
    //console.log(dataData);
    var state = {
      ages,
      voteData,
      novoteData,
      eligibleData,
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

    const eligibleData = this.state.eligibleData.map(([x, y]) => [
      ((x - this.state.lowDate) / this.state.xAxis) *
        coefficience *
        this.props.lastWidth,
      ((y - this.state.lowVotes) / this.state.yAxis) * lineheight
    ]);
    const novoteData = this.state.novoteData.map(([x, y]) => [
      ((x - this.state.lowDate) / this.state.xAxis) *
        coefficience *
        this.props.lastWidth,
      ((y - this.state.lowVotes) / this.state.yAxis) * lineheight
    ]);
    const voteData = this.state.voteData.map(([x, y]) => [
      ((x - this.state.lowDate) / this.state.xAxis) *
        coefficience *
        this.props.lastWidth,
      ((y - this.state.lowVotes) / this.state.yAxis) * lineheight
    ]);
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
              NJ ELIGIBLE TURNOUT
            </span>{" "}
            versus{" "}
            <a
              href="https://www.nj.gov/treasury/omb/fr.shtml"
              style={{ color: "firebrick" }}
            >
              reconciliation powers
            </a>
          </b>
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
            {eligibleData.map(([x, y], i) => {
              return (
                !isNaN(x) &&
                !isNaN(y) && (
                  <rect
                    x={x}
                    y={y}
                    transform=".3s ease-in"
                    width={50}
                    height={3}
                    stroke={i === 0 ? "orange" : "white"}
                    fill="blue"
                    opacity={1}
                    strokeWidth={4}
                    key={i}
                  />
                )
              );
            })}
            {voteData.map(([x, y], i) => {
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
            {novoteData.map(([x, y], i) => {
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
