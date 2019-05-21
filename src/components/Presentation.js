import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import {Button} from '@material-ui/core';
import sample from './sample.pdf';
//create react app nonsense
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class Presentation extends React.Component {
  state = {
    numPages: null,
    pageNumber: 1,
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
        </>
    );
  }
}



export default Presentation;