/* Copyright (c) 2021, ARTCOMPILER INC */
import * as React from 'react';
import * as d3 from 'd3';
import './style.css';

export class Viewer extends React.Component {
  componentDidMount() {
  }
  render () {
    let props = this.props;
    var data = props.obj.data;
    return (
      data !== undefined ? <div>
        <link rel="stylesheet" href="/L138/style.css" />
        <div className="L138">
          <input id="fileupload" name="myfile" type="file" onChange={handleChange} />
          <br/> <br />
        </div>
      </div>
      : <div>
          <input id="fileupload" name="myfile" type="file" onChange={handleChange} />
        </div>
    );
  }
}

function handleChange(e) {
  const inputElement = e.target;
  const file = inputElement.files[0];
  const reader = new FileReader;
  reader.readAsText(file);
  reader.onload = (e) => {
    const data = JSON.parse(e.target.result);
    window.gcexports.dispatcher.dispatch({
      [window.gcexports.id]: {
        data: data,
        refresh: true,
        recompileCode: true,
      }
    });
  };
}

window.gcexports.viewer = (function () {
  return {
    Viewer: Viewer,
  };
})();
