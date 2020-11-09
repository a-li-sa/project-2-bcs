import React from "react";
import { generateWord } from "../../../utils";
import { Box, Typography, Grid } from "@material-ui/core";

class Challenge extends React.Component {
  state = {
    index: 0,
    wordsToBeTyped: "",
    highlightedWord: "",
    wordOptions: {
      punctuation: false,
    },
    tracker: [],
    accuracy: 0,
    WPM: 0,
  };

  componentDidMount() {
    this.handleNewChallenge();
    document.addEventListener("keydown", this.handleCorrectKeyDown);
  }

  handleNewChallenge = () => {
    let options;
    const { wordCount, minChar, maxChar } = this.props;
    options = { wordCount, minChar, maxChar, ...this.state.wordOptions };
    generateWord(options).then((res) => {
      console.log(res);
      const newWordsToBeTyped = res.join(" ");
      const beginning = newWordsToBeTyped.slice(0, this.state.index);
      const highlighted = newWordsToBeTyped[this.state.index];
      const end = newWordsToBeTyped.slice(
        this.state.index + 1,
        newWordsToBeTyped.length
      );

      const newHighlightedWord = (
        <div>
          {beginning}
          <span style={{ backgroundColor: "grey" }}>{highlighted}</span>
          {end}
        </div>
      );
      this.setState({
        wordsToBeTyped: newWordsToBeTyped,
        highlightedWord: newHighlightedWord,
      });
    });
  };

  handleCorrectKeyDown = (e) => {
    const typedChar = e.key;
    const char = this.state.wordsToBeTyped[this.state.index];
    console.log(char);

    if (typedChar === "Shift") return;

    if (typedChar === char) {
      this.setState({
        tracker: [...this.state.tracker, { char, correct: true }],
      });
    } else if (typedChar !== char && typedChar !== "Backspace") {
      this.setState({
        tracker: [...this.state.tracker, { char, correct: false }],
      });
    } else {
      this.setState({
        tracker: [...this.state.tracker].slice(
          0,
          this.state.tracker.length - 1
        ),
      });
    }
    let beginning, highlighted;
    let end = "";
    if (e.key === "Backspace") {
      if (this.state.index === 0) return;
      // beginning = this.state.wordsToBeTyped.slice(0, this.state.index - 1);
      highlighted = this.state.wordsToBeTyped[this.state.index - 1];
      if (this.state.index !== this.state.wordsToBeTyped.length) {
        end = this.state.wordsToBeTyped
          .slice(this.state.index - 1, this.state.wordsToBeTyped.length)
          .substring(1);
      }
      this.setState({ index: this.state.index - 1 });
    } else {
      // beginning = this.state.wordsToBeTyped.slice(0, this.state.index + 1);
      highlighted = this.state.wordsToBeTyped[this.state.index + 1];
      if (this.state.index !== this.state.wordsToBeTyped.length) {
        end = this.state.wordsToBeTyped.slice(
          this.state.index + 2,
          this.state.wordsToBeTyped.length
        );
      }
      if (this.state.index + 1 === this.state.wordsToBeTyped.length) {
        console.log("refresh");
        // this.componentDidUpdate() -> could use?
        this.handleRefreshWords();
        return;
      }
      this.setState({ index: this.state.index + 1 });
    }

    const newHighlightedWord = (
      <div>
        {Object.values(this.state.tracker).map((i) => {
          return (
            <span style={{ backgroundColor: i.correct ? "green" : "red" }}>
              {i.char}
            </span>
          );
        })}
        <span style={{ backgroundColor: "grey" }}>{highlighted}</span>
        {end}
      </div>
    );
    this.setState({ highlightedWord: newHighlightedWord });
  };

  handleAddOption = (e) => {
    const option = e.target.dataset.value;
    switch (option) {
      case "punctuation":
        this.setState(({ wordOptions: { punctuation } }) => {
          return { wordOptions: { punctuation: !punctuation } };
        });
        break;
      default:
        break;
    }
    this.forceUpdate(this.handleRefreshWords);
  };

  handleRefreshWords = () => {
    console.log("refresh Conf");
    // Need to figure out how to set the index back to 0. Maybe a problem with asynchronisity.
    this.setState({
      index: 0,
      wordsToBeTyped: "",
      highlightedWord: "",
      tracker: [],
    });

    this.handleNewChallenge();
  };

  render() {
    const style = {
      fontSize: 30,
      textAlign: "center",
      margin: 100,
    };

    return (
      <div style={style}>
        <Typography component="h1" variant="h2">
          Typing Challenge
        </Typography>        
        <div style={{ margin: 70 }}>{this.state.highlightedWord}</div>
        <div>
            <Grid item container xs={12}>
              <Grid item xs={12} md={6}>
                <Box m={3} style={{ textAlign: "center" }}>
                  <Typography component="h5" variant="h5">
                    Accuracy
                  </Typography>
                  {this.state.accuracy}%
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box m={3} style={{ textAlign: "center" }}>
                  <Typography component="h5" variant="h5">
                    Words Per Minute
                  </Typography>
                  {this.state.WPM}
                </Box>
              </Grid>
            </Grid>
          </div>
        <div>
          <Box mt={6}>
            <Typography
              style={{
                color: this.state.wordOptions.punctuation
                  ? "black"
                  : "lightgray",
              }}
              data-value={"punctuation"}
              onClick={this.handleAddOption}
            >
              Punctuation
            </Typography>
          </Box>
        </div>
      </div>
    );
  }
}

export default Challenge;
