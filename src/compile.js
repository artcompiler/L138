/* Copyright (c) 2021, ARTCOMPILER INC */
import {assert, message, messages, reserveCodeRange} from "./share.js";
import {
  Checker as BasisChecker,
  Transformer as BasisTransformer,
  Compiler as BasisCompiler
} from '@graffiticode/basis';
import d3 from 'd3';
import bent from 'bent';
const getData = bent('string');

export class Checker extends BasisChecker {
  FETCH(node, options, resume) {
    this.visit(node.elts[0], options, async (e0, v0) => {
      const err = [];
      const val = node;
      resume(err, val);
    });
  }
  UPLOAD(node, options, resume) {
    this.visit(node.elts[0], options, async (e0, v0) => {
      const err = [];
      const val = node;
      resume(err, val);
    });
  }
  HELLO(node, options, resume) {
    this.visit(node.elts[0], options, async (e0, v0) => {
      const err = [];
      const val = node;
      resume(err, val);
    });
  }
}

export class Transformer extends BasisTransformer {
  HELLO(node, options, resume) {
    this.visit(node.elts[0], options, async (e0, v0) => {
      const err = [];
      const val = `hello, ${v0}!`;
      resume(err, val);
    });
  }
  FETCH(node, options, resume) {
    const TRY_JSON = 1;
    const TRY_CSV = 2;
    this.visit(node.elts[0], options, async (e0, v0) => {
      try {
        const key = options.config && options.config.key && `&key=${options.config.key}` || '';
        const url = v0.trim() + key;
        const data = await getData(url);
        let obj;
        const firstTry = url.indexOf('.csv') === url.length - '.csv'.length && TRY_CSV || TRY_JSON;
        try {
          if (firstTry === TRY_CSV) {
            obj = d3.csvParse(data);
          } else {
            obj = JSON.parse(data);
          }
        } catch (x) {
          try {
            if (firstTry === TRY_JSON) {
              // We tried JSON, so now try CSV.
              obj = d3.csvParse(data);
            } else {
              obj = JSON.parse(data);
            }
          } catch (x) {
            console.log("ERROR unrecognized format for data=" + data);
          }
        }
        const err = [];
        const val = obj;
        resume(err, val);
      } catch (err) {
        console.log(JSON.stringify(err, null, 2));
        resume(err);
      }
    });
  }
  
  UPLOAD(node, options, resume) {
    this.visit(node.elts[0], options, async (e0, v0) => {
      const err = [];
      const val = {
        type: 'upload',
        elts: [],
      };
      resume(err, val);
    });
  }
}

export const compiler = new BasisCompiler({
  langID: 138,
  version: 'v0.0.0',
  Checker: Checker,
  Transformer: Transformer,
});
