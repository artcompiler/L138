/* Copyright (c) 2021, ARTCOMPILER INC */
import * as React from 'react';
import * as d3 from 'd3';
import './style.css';

function renderElts(data) {
  let elts = [];
  let key = 1;
  data.forEach(node => {
    if (node.type === undefined) {
      // We have raw data.
      elts.push(
        <pre key={key += 1}>{ JSON.stringify(node, null, 2) }</pre>
      );
    } else {
      switch(node.type) {
      case 'upload':
        elts.push(
          <div>
            <input id="fileupload" name="myfile" type="file" onChange={handleChange} />
          </div>
        );
        break;
      case 'fetch':
        elts = elts.concat(renderElts(node.elts));
        break;
      default:
        break;
      }
    }
  });
  return elts;
}

export class Viewer extends React.Component {
  render() {
    const props = this.props;
    const data = props.obj && props.obj.data || [];
    const elts = renderElts([].concat(data));
    return (
      <div>
        <div key='1'>
          { elts }
        </div>
      </div>
    );
  }
}

function dispatchData(data) {
  window.gcexports.dispatcher.dispatch({
    [window.gcexports.id]: {
      data: data,
    }
  });
}


function handleChange(e) {
  const inputElement = e.target;
  const file = inputElement.files[0];
  const reader = new FileReader;
  reader.readAsText(file);
  reader.onload = (e) => {
    const data = JSON.parse(e.target.result).data;
    dispatchData(data);
  };
}

window.gcexports.viewer = (function () {
  return {
    Viewer: Viewer,
  };
})();
