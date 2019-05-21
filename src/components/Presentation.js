import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import {Button, TextField} from '@material-ui/core';
import sample from './sample.pdf';
//create react app nonsense
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class Presentation extends React.Component {
  state = {
    numPages: null,
    pageNumber: 1,
    currentQuestion:"What does 'memory regions' mean?",
    questions:[],
  }
 
  prevPage = (e) => {
    e.preventDefault();
    if (this.state.pageNumber - 1 > 0)
    {
      this.setState({pageNumber:this.state.pageNumber - 1});
    }
  }

  nextPage = (e) => {
    e.preventDefault();
    if (this.state.pageNumber < this.state.numPages)
    {
      this.setState({pageNumber:this.state.pageNumber + 1});
    }
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }

  onSubmitQuestion = (e) => {
      e.preventDefault();
      const q = {pageNumber:this.state.pageNumber, question:e.target.Question.value};
      this.state.questions.push(q);
      this.forceUpdate();
  }
 
  render() {
    const { pageNumber, numPages } = this.state;
 
    return (<>
        <Document
          file={sample}
          onLoadSuccess={this.onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
        <p>Page {pageNumber} of {numPages}</p>
        <Button 
        variant="contained"
        onClick={this.prevPage}>Prev Page</Button>
        <Button 
        variant="contained"
        onClick={this.nextPage}>Next Page</Button>
        <form onSubmit={this.onSubmitQuestion}>
        <TextField
          id="outlined-multiline-flexible"
          multiline
          label="Question"
          name="Question"
          value={this.state.currentQuestion}
          margin="normal"
          variant="outlined"
        />
        <Button 
        variant="contained"
        type="submit">Ask Question</Button>
        </form>
        <div>
          <h4>Questions for slide {this.state.pageNumber}</h4>
          <ul>
            {this.state.questions.map((e) => {
              if (e.pageNumber === this.state.pageNumber)
              {
                return (<li>{e.question}</li>);
              }
            })}
          </ul>
        </div>
        </>
        
    );
  }
}



export default Presentation;