import React from 'react';

//Component for downloading files from database
type Props = {
  fileName: string,
};
class DownloadFile extends React.Component<Props> {
  downloadEmployeeData() {
    let link = document.createElement('a');
    link.href = 'http://localhost:4000/public/file/' + this.props.fileName;
    link.download = 'file.pdf';
    link.target = '_blank';
    link.click();
  }
  render() {
    return (
      <div id="container">
        <span
          style={{ cursor: 'pointer', color: 'blue' }}
          onClick={() => {
            this.downloadEmployeeData();
          }}
        >
          {this.props.fileName}
        </span>
      </div>
    );
  }
}

export default DownloadFile;
