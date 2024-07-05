(function (g, f) {
    if ("object" == typeof exports && "object" == typeof module) {
      module.exports = f();
    } else if ("function" == typeof define && define.amd) {
      define("TargetObservers", [], f);
    } else if ("object" == typeof exports) {
      exports["TargetObservers"] = f();
    } else {
      g["TargetObservers"] = f();
    }
  }(this, () => {
var exports = {};
var module = { exports };
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __commonJS = (cb, mod3) => function __require() {
  return mod3 || (0, cb[__getOwnPropNames(cb)[0]])((mod3 = { exports: {} }).exports, mod3), mod3.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod3, isNodeMode, target) => (target = mod3 != null ? __create(__getProtoOf(mod3)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod3 || !mod3.__esModule ? __defProp(target, "default", { value: mod3, enumerable: true }) : target,
  mod3
));
var __toCommonJS = (mod3) => __copyProps(__defProp({}, "__esModule", { value: true }), mod3);

// node_modules/svg-path-parser/parser.js
var require_parser = __commonJS({
  "node_modules/svg-path-parser/parser.js"(exports, module2) {
    "use strict";
    function peg$subclass(child, parent) {
      function ctor() {
        this.constructor = child;
      }
      __name(ctor, "ctor");
      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
    }
    __name(peg$subclass, "peg$subclass");
    function peg$SyntaxError(message, expected, found, location2) {
      this.message = message;
      this.expected = expected;
      this.found = found;
      this.location = location2;
      this.name = "SyntaxError";
      if (typeof Error.captureStackTrace === "function") {
        Error.captureStackTrace(this, peg$SyntaxError);
      }
    }
    __name(peg$SyntaxError, "peg$SyntaxError");
    peg$subclass(peg$SyntaxError, Error);
    peg$SyntaxError.buildMessage = function(expected, found) {
      var DESCRIBE_EXPECTATION_FNS = {
        literal: function(expectation) {
          return '"' + literalEscape(expectation.text) + '"';
        },
        "class": function(expectation) {
          var escapedParts = "", i;
          for (i = 0; i < expectation.parts.length; i++) {
            escapedParts += expectation.parts[i] instanceof Array ? classEscape(expectation.parts[i][0]) + "-" + classEscape(expectation.parts[i][1]) : classEscape(expectation.parts[i]);
          }
          return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
        },
        any: function(expectation) {
          return "any character";
        },
        end: function(expectation) {
          return "end of input";
        },
        other: function(expectation) {
          return expectation.description;
        }
      };
      function hex(ch) {
        return ch.charCodeAt(0).toString(16).toUpperCase();
      }
      __name(hex, "hex");
      function literalEscape(s) {
        return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(ch) {
          return "\\x0" + hex(ch);
        }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) {
          return "\\x" + hex(ch);
        });
      }
      __name(literalEscape, "literalEscape");
      function classEscape(s) {
        return s.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(ch) {
          return "\\x0" + hex(ch);
        }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) {
          return "\\x" + hex(ch);
        });
      }
      __name(classEscape, "classEscape");
      function describeExpectation(expectation) {
        return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
      }
      __name(describeExpectation, "describeExpectation");
      function describeExpected(expected2) {
        var descriptions = new Array(expected2.length), i, j;
        for (i = 0; i < expected2.length; i++) {
          descriptions[i] = describeExpectation(expected2[i]);
        }
        descriptions.sort();
        if (descriptions.length > 0) {
          for (i = 1, j = 1; i < descriptions.length; i++) {
            if (descriptions[i - 1] !== descriptions[i]) {
              descriptions[j] = descriptions[i];
              j++;
            }
          }
          descriptions.length = j;
        }
        switch (descriptions.length) {
          case 1:
            return descriptions[0];
          case 2:
            return descriptions[0] + " or " + descriptions[1];
          default:
            return descriptions.slice(0, -1).join(", ") + ", or " + descriptions[descriptions.length - 1];
        }
      }
      __name(describeExpected, "describeExpected");
      function describeFound(found2) {
        return found2 ? '"' + literalEscape(found2) + '"' : "end of input";
      }
      __name(describeFound, "describeFound");
      return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
    };
    function peg$parse(input, options) {
      options = options !== void 0 ? options : {};
      var peg$FAILED = {}, peg$startRuleFunctions = { svg_path: peg$parsesvg_path }, peg$startRuleFunction = peg$parsesvg_path, peg$c0 = /* @__PURE__ */ __name(function(data) {
        if (!data)
          return [];
        for (var cmds2 = [], i = 0; i < data.length; i++)
          cmds2 = cmds2.concat.apply(cmds2, data[i]);
        var first = cmds2[0];
        if (first && first.code == "m") {
          delete first.relative;
          first.code = "M";
        }
        return cmds2;
      }, "peg$c0"), peg$c1 = /* @__PURE__ */ __name(function(first, more) {
        return merge(first, more);
      }, "peg$c1"), peg$c2 = /^[Mm]/, peg$c3 = peg$classExpectation(["M", "m"], false, false), peg$c4 = /* @__PURE__ */ __name(function(c, first, more) {
        var move = commands(c, [first]);
        if (more)
          move = move.concat(commands(c == "M" ? "L" : "l", more[1]));
        return move;
      }, "peg$c4"), peg$c5 = /^[Zz]/, peg$c6 = peg$classExpectation(["Z", "z"], false, false), peg$c7 = /* @__PURE__ */ __name(function() {
        return commands("Z");
      }, "peg$c7"), peg$c8 = /^[Ll]/, peg$c9 = peg$classExpectation(["L", "l"], false, false), peg$c10 = /* @__PURE__ */ __name(function(c, args) {
        return commands(c, args);
      }, "peg$c10"), peg$c11 = /^[Hh]/, peg$c12 = peg$classExpectation(["H", "h"], false, false), peg$c13 = /* @__PURE__ */ __name(function(c, args) {
        return commands(c, args.map(function(x) {
          return { x };
        }));
      }, "peg$c13"), peg$c14 = /^[Vv]/, peg$c15 = peg$classExpectation(["V", "v"], false, false), peg$c16 = /* @__PURE__ */ __name(function(c, args) {
        return commands(c, args.map(function(y) {
          return { y };
        }));
      }, "peg$c16"), peg$c17 = /^[Cc]/, peg$c18 = peg$classExpectation(["C", "c"], false, false), peg$c19 = /* @__PURE__ */ __name(function(a, b, c) {
        return { x1: a.x, y1: a.y, x2: b.x, y2: b.y, x: c.x, y: c.y };
      }, "peg$c19"), peg$c20 = /^[Ss]/, peg$c21 = peg$classExpectation(["S", "s"], false, false), peg$c22 = /* @__PURE__ */ __name(function(b, c) {
        return { x2: b.x, y2: b.y, x: c.x, y: c.y };
      }, "peg$c22"), peg$c23 = /^[Qq]/, peg$c24 = peg$classExpectation(["Q", "q"], false, false), peg$c25 = /* @__PURE__ */ __name(function(a, b) {
        return { x1: a.x, y1: a.y, x: b.x, y: b.y };
      }, "peg$c25"), peg$c26 = /^[Tt]/, peg$c27 = peg$classExpectation(["T", "t"], false, false), peg$c28 = /^[Aa]/, peg$c29 = peg$classExpectation(["A", "a"], false, false), peg$c30 = /* @__PURE__ */ __name(function(rx, ry, xrot, large, sweep, xy) {
        return { rx, ry, xAxisRotation: xrot, largeArc: large, sweep, x: xy.x, y: xy.y };
      }, "peg$c30"), peg$c31 = /* @__PURE__ */ __name(function(x, y) {
        return { x, y };
      }, "peg$c31"), peg$c32 = /* @__PURE__ */ __name(function(n) {
        return n * 1;
      }, "peg$c32"), peg$c33 = /* @__PURE__ */ __name(function(parts) {
        return parts.join("") * 1;
      }, "peg$c33"), peg$c34 = /^[01]/, peg$c35 = peg$classExpectation(["0", "1"], false, false), peg$c36 = /* @__PURE__ */ __name(function(bit) {
        return bit == "1";
      }, "peg$c36"), peg$c37 = /* @__PURE__ */ __name(function() {
        return "";
      }, "peg$c37"), peg$c38 = ",", peg$c39 = peg$literalExpectation(",", false), peg$c40 = /* @__PURE__ */ __name(function(parts) {
        return parts.join("");
      }, "peg$c40"), peg$c41 = ".", peg$c42 = peg$literalExpectation(".", false), peg$c43 = /^[eE]/, peg$c44 = peg$classExpectation(["e", "E"], false, false), peg$c45 = /^[+\-]/, peg$c46 = peg$classExpectation(["+", "-"], false, false), peg$c47 = /^[0-9]/, peg$c48 = peg$classExpectation([["0", "9"]], false, false), peg$c49 = /* @__PURE__ */ __name(function(digits) {
        return digits.join("");
      }, "peg$c49"), peg$c50 = /^[ \t\n\r]/, peg$c51 = peg$classExpectation([" ", "	", "\n", "\r"], false, false), peg$currPos = 0, peg$savedPos = 0, peg$posDetailsCache = [{ line: 1, column: 1 }], peg$maxFailPos = 0, peg$maxFailExpected = [], peg$silentFails = 0, peg$result;
      if ("startRule" in options) {
        if (!(options.startRule in peg$startRuleFunctions)) {
          throw new Error(`Can't start parsing from rule "` + options.startRule + '".');
        }
        peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
      }
      function text() {
        return input.substring(peg$savedPos, peg$currPos);
      }
      __name(text, "text");
      function location2() {
        return peg$computeLocation(peg$savedPos, peg$currPos);
      }
      __name(location2, "location");
      function expected(description, location3) {
        location3 = location3 !== void 0 ? location3 : peg$computeLocation(peg$savedPos, peg$currPos);
        throw peg$buildStructuredError(
          [peg$otherExpectation(description)],
          input.substring(peg$savedPos, peg$currPos),
          location3
        );
      }
      __name(expected, "expected");
      function error(message, location3) {
        location3 = location3 !== void 0 ? location3 : peg$computeLocation(peg$savedPos, peg$currPos);
        throw peg$buildSimpleError(message, location3);
      }
      __name(error, "error");
      function peg$literalExpectation(text2, ignoreCase) {
        return { type: "literal", text: text2, ignoreCase };
      }
      __name(peg$literalExpectation, "peg$literalExpectation");
      function peg$classExpectation(parts, inverted, ignoreCase) {
        return { type: "class", parts, inverted, ignoreCase };
      }
      __name(peg$classExpectation, "peg$classExpectation");
      function peg$anyExpectation() {
        return { type: "any" };
      }
      __name(peg$anyExpectation, "peg$anyExpectation");
      function peg$endExpectation() {
        return { type: "end" };
      }
      __name(peg$endExpectation, "peg$endExpectation");
      function peg$otherExpectation(description) {
        return { type: "other", description };
      }
      __name(peg$otherExpectation, "peg$otherExpectation");
      function peg$computePosDetails(pos) {
        var details = peg$posDetailsCache[pos], p;
        if (details) {
          return details;
        } else {
          p = pos - 1;
          while (!peg$posDetailsCache[p]) {
            p--;
          }
          details = peg$posDetailsCache[p];
          details = {
            line: details.line,
            column: details.column
          };
          while (p < pos) {
            if (input.charCodeAt(p) === 10) {
              details.line++;
              details.column = 1;
            } else {
              details.column++;
            }
            p++;
          }
          peg$posDetailsCache[pos] = details;
          return details;
        }
      }
      __name(peg$computePosDetails, "peg$computePosDetails");
      function peg$computeLocation(startPos, endPos) {
        var startPosDetails = peg$computePosDetails(startPos), endPosDetails = peg$computePosDetails(endPos);
        return {
          start: {
            offset: startPos,
            line: startPosDetails.line,
            column: startPosDetails.column
          },
          end: {
            offset: endPos,
            line: endPosDetails.line,
            column: endPosDetails.column
          }
        };
      }
      __name(peg$computeLocation, "peg$computeLocation");
      function peg$fail(expected2) {
        if (peg$currPos < peg$maxFailPos) {
          return;
        }
        if (peg$currPos > peg$maxFailPos) {
          peg$maxFailPos = peg$currPos;
          peg$maxFailExpected = [];
        }
        peg$maxFailExpected.push(expected2);
      }
      __name(peg$fail, "peg$fail");
      function peg$buildSimpleError(message, location3) {
        return new peg$SyntaxError(message, null, null, location3);
      }
      __name(peg$buildSimpleError, "peg$buildSimpleError");
      function peg$buildStructuredError(expected2, found, location3) {
        return new peg$SyntaxError(
          peg$SyntaxError.buildMessage(expected2, found),
          expected2,
          found,
          location3
        );
      }
      __name(peg$buildStructuredError, "peg$buildStructuredError");
      function peg$parsesvg_path() {
        var s0, s1, s2, s3, s4;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parsewsp();
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parsewsp();
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parsemoveTo_drawTo_commandGroups();
          if (s2 === peg$FAILED) {
            s2 = null;
          }
          if (s2 !== peg$FAILED) {
            s3 = [];
            s4 = peg$parsewsp();
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              s4 = peg$parsewsp();
            }
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c0(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      __name(peg$parsesvg_path, "peg$parsesvg_path");
      function peg$parsemoveTo_drawTo_commandGroups() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        s1 = peg$parsemoveTo_drawTo_commandGroup();
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$currPos;
          s4 = [];
          s5 = peg$parsewsp();
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$parsewsp();
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsemoveTo_drawTo_commandGroup();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$currPos;
            s4 = [];
            s5 = peg$parsewsp();
            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$parsewsp();
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsemoveTo_drawTo_commandGroup();
              if (s5 !== peg$FAILED) {
                s4 = [s4, s5];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          }
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c1(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      __name(peg$parsemoveTo_drawTo_commandGroups, "peg$parsemoveTo_drawTo_commandGroups");
      function peg$parsemoveTo_drawTo_commandGroup() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        s1 = peg$parsemoveto();
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$currPos;
          s4 = [];
          s5 = peg$parsewsp();
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$parsewsp();
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsedrawto_command();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$currPos;
            s4 = [];
            s5 = peg$parsewsp();
            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$parsewsp();
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsedrawto_command();
              if (s5 !== peg$FAILED) {
                s4 = [s4, s5];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          }
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c1(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      __name(peg$parsemoveTo_drawTo_commandGroup, "peg$parsemoveTo_drawTo_commandGroup");
      function peg$parsedrawto_command() {
        var s0;
        s0 = peg$parseclosepath();
        if (s0 === peg$FAILED) {
          s0 = peg$parselineto();
          if (s0 === peg$FAILED) {
            s0 = peg$parsehorizontal_lineto();
            if (s0 === peg$FAILED) {
              s0 = peg$parsevertical_lineto();
              if (s0 === peg$FAILED) {
                s0 = peg$parsecurveto();
                if (s0 === peg$FAILED) {
                  s0 = peg$parsesmooth_curveto();
                  if (s0 === peg$FAILED) {
                    s0 = peg$parsequadratic_bezier_curveto();
                    if (s0 === peg$FAILED) {
                      s0 = peg$parsesmooth_quadratic_bezier_curveto();
                      if (s0 === peg$FAILED) {
                        s0 = peg$parseelliptical_arc();
                      }
                    }
                  }
                }
              }
            }
          }
        }
        return s0;
      }
      __name(peg$parsedrawto_command, "peg$parsedrawto_command");
      function peg$parsemoveto() {
        var s0, s1, s2, s3, s4, s5, s6;
        s0 = peg$currPos;
        if (peg$c2.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c3);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$parsewsp();
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parsewsp();
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parsecoordinate_pair();
            if (s3 !== peg$FAILED) {
              s4 = peg$currPos;
              s5 = peg$parsecomma_wsp();
              if (s5 === peg$FAILED) {
                s5 = null;
              }
              if (s5 !== peg$FAILED) {
                s6 = peg$parselineto_argument_sequence();
                if (s6 !== peg$FAILED) {
                  s5 = [s5, s6];
                  s4 = s5;
                } else {
                  peg$currPos = s4;
                  s4 = peg$FAILED;
                }
              } else {
                peg$currPos = s4;
                s4 = peg$FAILED;
              }
              if (s4 === peg$FAILED) {
                s4 = null;
              }
              if (s4 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c4(s1, s3, s4);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      __name(peg$parsemoveto, "peg$parsemoveto");
      function peg$parseclosepath() {
        var s0, s1;
        s0 = peg$currPos;
        if (peg$c5.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c6);
          }
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c7();
        }
        s0 = s1;
        return s0;
      }
      __name(peg$parseclosepath, "peg$parseclosepath");
      function peg$parselineto() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        if (peg$c8.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c9);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$parsewsp();
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parsewsp();
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parselineto_argument_sequence();
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c10(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      __name(peg$parselineto, "peg$parselineto");
      function peg$parselineto_argument_sequence() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        s1 = peg$parsecoordinate_pair();
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$currPos;
          s4 = peg$parsecomma_wsp();
          if (s4 === peg$FAILED) {
            s4 = null;
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsecoordinate_pair();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$currPos;
            s4 = peg$parsecomma_wsp();
            if (s4 === peg$FAILED) {
              s4 = null;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsecoordinate_pair();
              if (s5 !== peg$FAILED) {
                s4 = [s4, s5];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          }
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c1(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      __name(peg$parselineto_argument_sequence, "peg$parselineto_argument_sequence");
      function peg$parsehorizontal_lineto() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        if (peg$c11.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c12);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$parsewsp();
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parsewsp();
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parsecoordinate_sequence();
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c13(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      __name(peg$parsehorizontal_lineto, "peg$parsehorizontal_lineto");
      function peg$parsecoordinate_sequence() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        s1 = peg$parsenumber();
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$currPos;
          s4 = peg$parsecomma_wsp();
          if (s4 === peg$FAILED) {
            s4 = null;
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsenumber();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$currPos;
            s4 = peg$parsecomma_wsp();
            if (s4 === peg$FAILED) {
              s4 = null;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsenumber();
              if (s5 !== peg$FAILED) {
                s4 = [s4, s5];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          }
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c1(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      __name(peg$parsecoordinate_sequence, "peg$parsecoordinate_sequence");
      function peg$parsevertical_lineto() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        if (peg$c14.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c15);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$parsewsp();
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parsewsp();
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parsecoordinate_sequence();
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c16(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      __name(peg$parsevertical_lineto, "peg$parsevertical_lineto");
      function peg$parsecurveto() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        if (peg$c17.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c18);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$parsewsp();
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parsewsp();
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parsecurveto_argument_sequence();
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c10(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      __name(peg$parsecurveto, "peg$parsecurveto");
      function peg$parsecurveto_argument_sequence() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        s1 = peg$parsecurveto_argument();
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$currPos;
          s4 = peg$parsecomma_wsp();
          if (s4 === peg$FAILED) {
            s4 = null;
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsecurveto_argument();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$currPos;
            s4 = peg$parsecomma_wsp();
            if (s4 === peg$FAILED) {
              s4 = null;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsecurveto_argument();
              if (s5 !== peg$FAILED) {
                s4 = [s4, s5];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          }
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c1(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      __name(peg$parsecurveto_argument_sequence, "peg$parsecurveto_argument_sequence");
      function peg$parsecurveto_argument() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        s1 = peg$parsecoordinate_pair();
        if (s1 !== peg$FAILED) {
          s2 = peg$parsecomma_wsp();
          if (s2 === peg$FAILED) {
            s2 = null;
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parsecoordinate_pair();
            if (s3 !== peg$FAILED) {
              s4 = peg$parsecomma_wsp();
              if (s4 === peg$FAILED) {
                s4 = null;
              }
              if (s4 !== peg$FAILED) {
                s5 = peg$parsecoordinate_pair();
                if (s5 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c19(s1, s3, s5);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      __name(peg$parsecurveto_argument, "peg$parsecurveto_argument");
      function peg$parsesmooth_curveto() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        if (peg$c20.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c21);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$parsewsp();
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parsewsp();
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parsesmooth_curveto_argument_sequence();
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c10(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      __name(peg$parsesmooth_curveto, "peg$parsesmooth_curveto");
      function peg$parsesmooth_curveto_argument_sequence() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        s1 = peg$parsesmooth_curveto_argument();
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$currPos;
          s4 = peg$parsecomma_wsp();
          if (s4 === peg$FAILED) {
            s4 = null;
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsesmooth_curveto_argument();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$currPos;
            s4 = peg$parsecomma_wsp();
            if (s4 === peg$FAILED) {
              s4 = null;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsesmooth_curveto_argument();
              if (s5 !== peg$FAILED) {
                s4 = [s4, s5];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          }
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c1(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      __name(peg$parsesmooth_curveto_argument_sequence, "peg$parsesmooth_curveto_argument_sequence");
      function peg$parsesmooth_curveto_argument() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        s1 = peg$parsecoordinate_pair();
        if (s1 !== peg$FAILED) {
          s2 = peg$parsecomma_wsp();
          if (s2 === peg$FAILED) {
            s2 = null;
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parsecoordinate_pair();
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c22(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      __name(peg$parsesmooth_curveto_argument, "peg$parsesmooth_curveto_argument");
      function peg$parsequadratic_bezier_curveto() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        if (peg$c23.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c24);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$parsewsp();
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parsewsp();
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parsequadratic_bezier_curveto_argument_sequence();
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c10(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      __name(peg$parsequadratic_bezier_curveto, "peg$parsequadratic_bezier_curveto");
      function peg$parsequadratic_bezier_curveto_argument_sequence() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        s1 = peg$parsequadratic_bezier_curveto_argument();
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$currPos;
          s4 = peg$parsecomma_wsp();
          if (s4 === peg$FAILED) {
            s4 = null;
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsequadratic_bezier_curveto_argument();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$currPos;
            s4 = peg$parsecomma_wsp();
            if (s4 === peg$FAILED) {
              s4 = null;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsequadratic_bezier_curveto_argument();
              if (s5 !== peg$FAILED) {
                s4 = [s4, s5];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          }
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c1(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      __name(peg$parsequadratic_bezier_curveto_argument_sequence, "peg$parsequadratic_bezier_curveto_argument_sequence");
      function peg$parsequadratic_bezier_curveto_argument() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        s1 = peg$parsecoordinate_pair();
        if (s1 !== peg$FAILED) {
          s2 = peg$parsecomma_wsp();
          if (s2 === peg$FAILED) {
            s2 = null;
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parsecoordinate_pair();
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c25(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      __name(peg$parsequadratic_bezier_curveto_argument, "peg$parsequadratic_bezier_curveto_argument");
      function peg$parsesmooth_quadratic_bezier_curveto() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        if (peg$c26.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c27);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$parsewsp();
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parsewsp();
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parsesmooth_quadratic_bezier_curveto_argument_sequence();
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c10(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      __name(peg$parsesmooth_quadratic_bezier_curveto, "peg$parsesmooth_quadratic_bezier_curveto");
      function peg$parsesmooth_quadratic_bezier_curveto_argument_sequence() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        s1 = peg$parsecoordinate_pair();
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$currPos;
          s4 = peg$parsecomma_wsp();
          if (s4 === peg$FAILED) {
            s4 = null;
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsecoordinate_pair();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$currPos;
            s4 = peg$parsecomma_wsp();
            if (s4 === peg$FAILED) {
              s4 = null;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsecoordinate_pair();
              if (s5 !== peg$FAILED) {
                s4 = [s4, s5];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          }
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c1(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      __name(peg$parsesmooth_quadratic_bezier_curveto_argument_sequence, "peg$parsesmooth_quadratic_bezier_curveto_argument_sequence");
      function peg$parseelliptical_arc() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        if (peg$c28.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c29);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$parsewsp();
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parsewsp();
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parseelliptical_arc_argument_sequence();
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c10(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      __name(peg$parseelliptical_arc, "peg$parseelliptical_arc");
      function peg$parseelliptical_arc_argument_sequence() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        s1 = peg$parseelliptical_arc_argument();
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$currPos;
          s4 = peg$parsecomma_wsp();
          if (s4 === peg$FAILED) {
            s4 = null;
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parseelliptical_arc_argument();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$currPos;
            s4 = peg$parsecomma_wsp();
            if (s4 === peg$FAILED) {
              s4 = null;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parseelliptical_arc_argument();
              if (s5 !== peg$FAILED) {
                s4 = [s4, s5];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          }
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c1(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      __name(peg$parseelliptical_arc_argument_sequence, "peg$parseelliptical_arc_argument_sequence");
      function peg$parseelliptical_arc_argument() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11;
        s0 = peg$currPos;
        s1 = peg$parsenonnegative_number();
        if (s1 !== peg$FAILED) {
          s2 = peg$parsecomma_wsp();
          if (s2 === peg$FAILED) {
            s2 = null;
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parsenonnegative_number();
            if (s3 !== peg$FAILED) {
              s4 = peg$parsecomma_wsp();
              if (s4 === peg$FAILED) {
                s4 = null;
              }
              if (s4 !== peg$FAILED) {
                s5 = peg$parsenumber();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parsecomma_wsp();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parseflag();
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parsecomma_wsp();
                      if (s8 === peg$FAILED) {
                        s8 = null;
                      }
                      if (s8 !== peg$FAILED) {
                        s9 = peg$parseflag();
                        if (s9 !== peg$FAILED) {
                          s10 = peg$parsecomma_wsp();
                          if (s10 === peg$FAILED) {
                            s10 = null;
                          }
                          if (s10 !== peg$FAILED) {
                            s11 = peg$parsecoordinate_pair();
                            if (s11 !== peg$FAILED) {
                              peg$savedPos = s0;
                              s1 = peg$c30(s1, s3, s5, s7, s9, s11);
                              s0 = s1;
                            } else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      __name(peg$parseelliptical_arc_argument, "peg$parseelliptical_arc_argument");
      function peg$parsecoordinate_pair() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        s1 = peg$parsenumber();
        if (s1 !== peg$FAILED) {
          s2 = peg$parsecomma_wsp();
          if (s2 === peg$FAILED) {
            s2 = null;
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parsenumber();
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c31(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      __name(peg$parsecoordinate_pair, "peg$parsecoordinate_pair");
      function peg$parsenonnegative_number() {
        var s0, s1;
        s0 = peg$currPos;
        s1 = peg$parsefloating_point_constant();
        if (s1 === peg$FAILED) {
          s1 = peg$parsedigit_sequence();
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c32(s1);
        }
        s0 = s1;
        return s0;
      }
      __name(peg$parsenonnegative_number, "peg$parsenonnegative_number");
      function peg$parsenumber() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        s1 = peg$currPos;
        s2 = peg$parsesign();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsefloating_point_constant();
          if (s3 !== peg$FAILED) {
            s2 = [s2, s3];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
        if (s1 === peg$FAILED) {
          s1 = peg$currPos;
          s2 = peg$parsesign();
          if (s2 === peg$FAILED) {
            s2 = null;
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parsedigit_sequence();
            if (s3 !== peg$FAILED) {
              s2 = [s2, s3];
              s1 = s2;
            } else {
              peg$currPos = s1;
              s1 = peg$FAILED;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c33(s1);
        }
        s0 = s1;
        return s0;
      }
      __name(peg$parsenumber, "peg$parsenumber");
      function peg$parseflag() {
        var s0, s1;
        s0 = peg$currPos;
        if (peg$c34.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c35);
          }
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c36(s1);
        }
        s0 = s1;
        return s0;
      }
      __name(peg$parseflag, "peg$parseflag");
      function peg$parsecomma_wsp() {
        var s0, s1, s2, s3, s4;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parsewsp();
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$parsewsp();
          }
        } else {
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parsecomma();
          if (s2 === peg$FAILED) {
            s2 = null;
          }
          if (s2 !== peg$FAILED) {
            s3 = [];
            s4 = peg$parsewsp();
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              s4 = peg$parsewsp();
            }
            if (s3 !== peg$FAILED) {
              s1 = [s1, s2, s3];
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$currPos;
          s2 = peg$parsecomma();
          if (s2 !== peg$FAILED) {
            s3 = [];
            s4 = peg$parsewsp();
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              s4 = peg$parsewsp();
            }
            if (s3 !== peg$FAILED) {
              s2 = [s2, s3];
              s1 = s2;
            } else {
              peg$currPos = s1;
              s1 = peg$FAILED;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c37();
          }
          s0 = s1;
        }
        return s0;
      }
      __name(peg$parsecomma_wsp, "peg$parsecomma_wsp");
      function peg$parsecomma() {
        var s0;
        if (input.charCodeAt(peg$currPos) === 44) {
          s0 = peg$c38;
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c39);
          }
        }
        return s0;
      }
      __name(peg$parsecomma, "peg$parsecomma");
      function peg$parsefloating_point_constant() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        s1 = peg$currPos;
        s2 = peg$parsefractional_constant();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseexponent();
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            s2 = [s2, s3];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
        if (s1 === peg$FAILED) {
          s1 = peg$currPos;
          s2 = peg$parsedigit_sequence();
          if (s2 !== peg$FAILED) {
            s3 = peg$parseexponent();
            if (s3 !== peg$FAILED) {
              s2 = [s2, s3];
              s1 = s2;
            } else {
              peg$currPos = s1;
              s1 = peg$FAILED;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c40(s1);
        }
        s0 = s1;
        return s0;
      }
      __name(peg$parsefloating_point_constant, "peg$parsefloating_point_constant");
      function peg$parsefractional_constant() {
        var s0, s1, s2, s3, s4;
        s0 = peg$currPos;
        s1 = peg$currPos;
        s2 = peg$parsedigit_sequence();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 46) {
            s3 = peg$c41;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c42);
            }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parsedigit_sequence();
            if (s4 !== peg$FAILED) {
              s2 = [s2, s3, s4];
              s1 = s2;
            } else {
              peg$currPos = s1;
              s1 = peg$FAILED;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
        if (s1 === peg$FAILED) {
          s1 = peg$currPos;
          s2 = peg$parsedigit_sequence();
          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 46) {
              s3 = peg$c41;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c42);
              }
            }
            if (s3 !== peg$FAILED) {
              s2 = [s2, s3];
              s1 = s2;
            } else {
              peg$currPos = s1;
              s1 = peg$FAILED;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c40(s1);
        }
        s0 = s1;
        return s0;
      }
      __name(peg$parsefractional_constant, "peg$parsefractional_constant");
      function peg$parseexponent() {
        var s0, s1, s2, s3, s4;
        s0 = peg$currPos;
        s1 = peg$currPos;
        if (peg$c43.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c44);
          }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsesign();
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parsedigit_sequence();
            if (s4 !== peg$FAILED) {
              s2 = [s2, s3, s4];
              s1 = s2;
            } else {
              peg$currPos = s1;
              s1 = peg$FAILED;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c40(s1);
        }
        s0 = s1;
        return s0;
      }
      __name(peg$parseexponent, "peg$parseexponent");
      function peg$parsesign() {
        var s0;
        if (peg$c45.test(input.charAt(peg$currPos))) {
          s0 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c46);
          }
        }
        return s0;
      }
      __name(peg$parsesign, "peg$parsesign");
      function peg$parsedigit_sequence() {
        var s0, s1, s2;
        s0 = peg$currPos;
        s1 = [];
        if (peg$c47.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c48);
          }
        }
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            if (peg$c47.test(input.charAt(peg$currPos))) {
              s2 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c48);
              }
            }
          }
        } else {
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c49(s1);
        }
        s0 = s1;
        return s0;
      }
      __name(peg$parsedigit_sequence, "peg$parsedigit_sequence");
      function peg$parsewsp() {
        var s0, s1;
        s0 = peg$currPos;
        if (peg$c50.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c51);
          }
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c37();
        }
        s0 = s1;
        return s0;
      }
      __name(peg$parsewsp, "peg$parsewsp");
      function merge(first, more) {
        if (!more)
          return [first];
        for (var a = [first], i = 0, l = more.length; i < l; i++)
          a[i + 1] = more[i][1];
        return a;
      }
      __name(merge, "merge");
      var cmds = { m: "moveto", l: "lineto", h: "horizontal lineto", v: "vertical lineto", c: "curveto", s: "smooth curveto", q: "quadratic curveto", t: "smooth quadratic curveto", a: "elliptical arc", z: "closepath" };
      for (var code in cmds)
        cmds[code.toUpperCase()] = cmds[code];
      function commands(code2, args) {
        if (!args)
          args = [{}];
        for (var i = args.length; i--; ) {
          var cmd = { code: code2, command: cmds[code2] };
          if (code2 == code2.toLowerCase())
            cmd.relative = true;
          for (var k in args[i])
            cmd[k] = args[i][k];
          args[i] = cmd;
        }
        return args;
      }
      __name(commands, "commands");
      peg$result = peg$startRuleFunction();
      if (peg$result !== peg$FAILED && peg$currPos === input.length) {
        return peg$result;
      } else {
        if (peg$result !== peg$FAILED && peg$currPos < input.length) {
          peg$fail(peg$endExpectation());
        }
        throw peg$buildStructuredError(
          peg$maxFailExpected,
          peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
          peg$maxFailPos < input.length ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1) : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
        );
      }
    }
    __name(peg$parse, "peg$parse");
    module2.exports = {
      SyntaxError: peg$SyntaxError,
      parse: peg$parse
    };
  }
});

// node_modules/svg-path-parser/index.js
var require_svg_path_parser = __commonJS({
  "node_modules/svg-path-parser/index.js"(exports, module2) {
    var parserFunction = require_parser().parse;
    parserFunction.parseSVG = parserFunction;
    parserFunction.makeAbsolute = makeSVGPathCommandsAbsolute;
    module2.exports = parserFunction;
    function makeSVGPathCommandsAbsolute(commands) {
      var subpathStart, prevCmd = { x: 0, y: 0 };
      var attr = { x: "x0", y: "y0", x1: "x0", y1: "y0", x2: "x0", y2: "y0" };
      commands.forEach(function(cmd) {
        if (cmd.command === "moveto")
          subpathStart = cmd;
        cmd.x0 = prevCmd.x;
        cmd.y0 = prevCmd.y;
        for (var a in attr)
          if (a in cmd)
            cmd[a] += cmd.relative ? cmd[attr[a]] : 0;
        if (!("x" in cmd))
          cmd.x = prevCmd.x;
        if (!("y" in cmd))
          cmd.y = prevCmd.y;
        cmd.relative = false;
        cmd.code = cmd.code.toUpperCase();
        if (cmd.command == "closepath") {
          cmd.x = subpathStart.x;
          cmd.y = subpathStart.y;
        }
        prevCmd = cmd;
      });
      return commands;
    }
    __name(makeSVGPathCommandsAbsolute, "makeSVGPathCommandsAbsolute");
  }
});

// node_modules/lodash/lodash.js
var require_lodash = __commonJS({
  "node_modules/lodash/lodash.js"(exports, module2) {
    (function() {
      var undefined;
      var VERSION = "4.17.21";
      var LARGE_ARRAY_SIZE = 200;
      var CORE_ERROR_TEXT = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", FUNC_ERROR_TEXT = "Expected a function", INVALID_TEMPL_VAR_ERROR_TEXT = "Invalid `variable` option passed into `_.template`";
      var HASH_UNDEFINED = "__lodash_hash_undefined__";
      var MAX_MEMOIZE_SIZE = 500;
      var PLACEHOLDER = "__lodash_placeholder__";
      var CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG = 4;
      var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
      var WRAP_BIND_FLAG = 1, WRAP_BIND_KEY_FLAG = 2, WRAP_CURRY_BOUND_FLAG = 4, WRAP_CURRY_FLAG = 8, WRAP_CURRY_RIGHT_FLAG = 16, WRAP_PARTIAL_FLAG = 32, WRAP_PARTIAL_RIGHT_FLAG = 64, WRAP_ARY_FLAG = 128, WRAP_REARG_FLAG = 256, WRAP_FLIP_FLAG = 512;
      var DEFAULT_TRUNC_LENGTH = 30, DEFAULT_TRUNC_OMISSION = "...";
      var HOT_COUNT = 800, HOT_SPAN = 16;
      var LAZY_FILTER_FLAG = 1, LAZY_MAP_FLAG = 2, LAZY_WHILE_FLAG = 3;
      var INFINITY = 1 / 0, MAX_SAFE_INTEGER = 9007199254740991, MAX_INTEGER = 17976931348623157e292, NAN = 0 / 0;
      var MAX_ARRAY_LENGTH = 4294967295, MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1, HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;
      var wrapFlags = [
        ["ary", WRAP_ARY_FLAG],
        ["bind", WRAP_BIND_FLAG],
        ["bindKey", WRAP_BIND_KEY_FLAG],
        ["curry", WRAP_CURRY_FLAG],
        ["curryRight", WRAP_CURRY_RIGHT_FLAG],
        ["flip", WRAP_FLIP_FLAG],
        ["partial", WRAP_PARTIAL_FLAG],
        ["partialRight", WRAP_PARTIAL_RIGHT_FLAG],
        ["rearg", WRAP_REARG_FLAG]
      ];
      var argsTag = "[object Arguments]", arrayTag = "[object Array]", asyncTag = "[object AsyncFunction]", boolTag = "[object Boolean]", dateTag = "[object Date]", domExcTag = "[object DOMException]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", nullTag = "[object Null]", objectTag = "[object Object]", promiseTag = "[object Promise]", proxyTag = "[object Proxy]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", undefinedTag = "[object Undefined]", weakMapTag = "[object WeakMap]", weakSetTag = "[object WeakSet]";
      var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
      var reEmptyStringLeading = /\b__p \+= '';/g, reEmptyStringMiddle = /\b(__p \+=) '' \+/g, reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
      var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g, reUnescapedHtml = /[&<>"']/g, reHasEscapedHtml = RegExp(reEscapedHtml.source), reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
      var reEscape = /<%-([\s\S]+?)%>/g, reEvaluate = /<%([\s\S]+?)%>/g, reInterpolate = /<%=([\s\S]+?)%>/g;
      var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/, rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
      var reRegExpChar = /[\\^$.*+?()[\]{}|]/g, reHasRegExpChar = RegExp(reRegExpChar.source);
      var reTrimStart = /^\s+/;
      var reWhitespace = /\s/;
      var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/, reSplitDetails = /,? & /;
      var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
      var reForbiddenIdentifierChars = /[()=,{}\[\]\/\s]/;
      var reEscapeChar = /\\(\\)?/g;
      var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
      var reFlags = /\w*$/;
      var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
      var reIsBinary = /^0b[01]+$/i;
      var reIsHostCtor = /^\[object .+?Constructor\]$/;
      var reIsOctal = /^0o[0-7]+$/i;
      var reIsUint = /^(?:0|[1-9]\d*)$/;
      var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
      var reNoMatch = /($^)/;
      var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
      var rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsDingbatRange = "\\u2700-\\u27bf", rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsPunctuationRange = "\\u2000-\\u206f", rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange = "\\ufe0e\\ufe0f", rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
      var rsApos = "['\u2019]", rsAstral = "[" + rsAstralRange + "]", rsBreak = "[" + rsBreakRange + "]", rsCombo = "[" + rsComboRange + "]", rsDigits = "\\d+", rsDingbat = "[" + rsDingbatRange + "]", rsLower = "[" + rsLowerRange + "]", rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsUpper = "[" + rsUpperRange + "]", rsZWJ = "\\u200d";
      var rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")", rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")", rsOptContrLower = "(?:" + rsApos + "(?:d|ll|m|re|s|t|ve))?", rsOptContrUpper = "(?:" + rsApos + "(?:D|LL|M|RE|S|T|VE))?", reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*", rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsEmoji = "(?:" + [rsDingbat, rsRegional, rsSurrPair].join("|") + ")" + rsSeq, rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
      var reApos = RegExp(rsApos, "g");
      var reComboMark = RegExp(rsCombo, "g");
      var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
      var reUnicodeWord = RegExp([
        rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")",
        rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [rsBreak, rsUpper + rsMiscLower, "$"].join("|") + ")",
        rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower,
        rsUpper + "+" + rsOptContrUpper,
        rsOrdUpper,
        rsOrdLower,
        rsDigits,
        rsEmoji
      ].join("|"), "g");
      var reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + "]");
      var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
      var contextProps = [
        "Array",
        "Buffer",
        "DataView",
        "Date",
        "Error",
        "Float32Array",
        "Float64Array",
        "Function",
        "Int8Array",
        "Int16Array",
        "Int32Array",
        "Map",
        "Math",
        "Object",
        "Promise",
        "RegExp",
        "Set",
        "String",
        "Symbol",
        "TypeError",
        "Uint8Array",
        "Uint8ClampedArray",
        "Uint16Array",
        "Uint32Array",
        "WeakMap",
        "_",
        "clearTimeout",
        "isFinite",
        "parseInt",
        "setTimeout"
      ];
      var templateCounter = -1;
      var typedArrayTags = {};
      typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
      typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
      var cloneableTags = {};
      cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
      cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
      var deburredLetters = {
        // Latin-1 Supplement block.
        "\xC0": "A",
        "\xC1": "A",
        "\xC2": "A",
        "\xC3": "A",
        "\xC4": "A",
        "\xC5": "A",
        "\xE0": "a",
        "\xE1": "a",
        "\xE2": "a",
        "\xE3": "a",
        "\xE4": "a",
        "\xE5": "a",
        "\xC7": "C",
        "\xE7": "c",
        "\xD0": "D",
        "\xF0": "d",
        "\xC8": "E",
        "\xC9": "E",
        "\xCA": "E",
        "\xCB": "E",
        "\xE8": "e",
        "\xE9": "e",
        "\xEA": "e",
        "\xEB": "e",
        "\xCC": "I",
        "\xCD": "I",
        "\xCE": "I",
        "\xCF": "I",
        "\xEC": "i",
        "\xED": "i",
        "\xEE": "i",
        "\xEF": "i",
        "\xD1": "N",
        "\xF1": "n",
        "\xD2": "O",
        "\xD3": "O",
        "\xD4": "O",
        "\xD5": "O",
        "\xD6": "O",
        "\xD8": "O",
        "\xF2": "o",
        "\xF3": "o",
        "\xF4": "o",
        "\xF5": "o",
        "\xF6": "o",
        "\xF8": "o",
        "\xD9": "U",
        "\xDA": "U",
        "\xDB": "U",
        "\xDC": "U",
        "\xF9": "u",
        "\xFA": "u",
        "\xFB": "u",
        "\xFC": "u",
        "\xDD": "Y",
        "\xFD": "y",
        "\xFF": "y",
        "\xC6": "Ae",
        "\xE6": "ae",
        "\xDE": "Th",
        "\xFE": "th",
        "\xDF": "ss",
        // Latin Extended-A block.
        "\u0100": "A",
        "\u0102": "A",
        "\u0104": "A",
        "\u0101": "a",
        "\u0103": "a",
        "\u0105": "a",
        "\u0106": "C",
        "\u0108": "C",
        "\u010A": "C",
        "\u010C": "C",
        "\u0107": "c",
        "\u0109": "c",
        "\u010B": "c",
        "\u010D": "c",
        "\u010E": "D",
        "\u0110": "D",
        "\u010F": "d",
        "\u0111": "d",
        "\u0112": "E",
        "\u0114": "E",
        "\u0116": "E",
        "\u0118": "E",
        "\u011A": "E",
        "\u0113": "e",
        "\u0115": "e",
        "\u0117": "e",
        "\u0119": "e",
        "\u011B": "e",
        "\u011C": "G",
        "\u011E": "G",
        "\u0120": "G",
        "\u0122": "G",
        "\u011D": "g",
        "\u011F": "g",
        "\u0121": "g",
        "\u0123": "g",
        "\u0124": "H",
        "\u0126": "H",
        "\u0125": "h",
        "\u0127": "h",
        "\u0128": "I",
        "\u012A": "I",
        "\u012C": "I",
        "\u012E": "I",
        "\u0130": "I",
        "\u0129": "i",
        "\u012B": "i",
        "\u012D": "i",
        "\u012F": "i",
        "\u0131": "i",
        "\u0134": "J",
        "\u0135": "j",
        "\u0136": "K",
        "\u0137": "k",
        "\u0138": "k",
        "\u0139": "L",
        "\u013B": "L",
        "\u013D": "L",
        "\u013F": "L",
        "\u0141": "L",
        "\u013A": "l",
        "\u013C": "l",
        "\u013E": "l",
        "\u0140": "l",
        "\u0142": "l",
        "\u0143": "N",
        "\u0145": "N",
        "\u0147": "N",
        "\u014A": "N",
        "\u0144": "n",
        "\u0146": "n",
        "\u0148": "n",
        "\u014B": "n",
        "\u014C": "O",
        "\u014E": "O",
        "\u0150": "O",
        "\u014D": "o",
        "\u014F": "o",
        "\u0151": "o",
        "\u0154": "R",
        "\u0156": "R",
        "\u0158": "R",
        "\u0155": "r",
        "\u0157": "r",
        "\u0159": "r",
        "\u015A": "S",
        "\u015C": "S",
        "\u015E": "S",
        "\u0160": "S",
        "\u015B": "s",
        "\u015D": "s",
        "\u015F": "s",
        "\u0161": "s",
        "\u0162": "T",
        "\u0164": "T",
        "\u0166": "T",
        "\u0163": "t",
        "\u0165": "t",
        "\u0167": "t",
        "\u0168": "U",
        "\u016A": "U",
        "\u016C": "U",
        "\u016E": "U",
        "\u0170": "U",
        "\u0172": "U",
        "\u0169": "u",
        "\u016B": "u",
        "\u016D": "u",
        "\u016F": "u",
        "\u0171": "u",
        "\u0173": "u",
        "\u0174": "W",
        "\u0175": "w",
        "\u0176": "Y",
        "\u0177": "y",
        "\u0178": "Y",
        "\u0179": "Z",
        "\u017B": "Z",
        "\u017D": "Z",
        "\u017A": "z",
        "\u017C": "z",
        "\u017E": "z",
        "\u0132": "IJ",
        "\u0133": "ij",
        "\u0152": "Oe",
        "\u0153": "oe",
        "\u0149": "'n",
        "\u017F": "s"
      };
      var htmlEscapes = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      };
      var htmlUnescapes = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#39;": "'"
      };
      var stringEscapes = {
        "\\": "\\",
        "'": "'",
        "\n": "n",
        "\r": "r",
        "\u2028": "u2028",
        "\u2029": "u2029"
      };
      var freeParseFloat = parseFloat, freeParseInt = parseInt;
      var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
      var freeSelf = typeof self == "object" && self && self.Object === Object && self;
      var root = freeGlobal || freeSelf || Function("return this")();
      var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
      var freeModule = freeExports && typeof module2 == "object" && module2 && !module2.nodeType && module2;
      var moduleExports = freeModule && freeModule.exports === freeExports;
      var freeProcess = moduleExports && freeGlobal.process;
      var nodeUtil = function() {
        try {
          var types = freeModule && freeModule.require && freeModule.require("util").types;
          if (types) {
            return types;
          }
          return freeProcess && freeProcess.binding && freeProcess.binding("util");
        } catch (e) {
        }
      }();
      var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer, nodeIsDate = nodeUtil && nodeUtil.isDate, nodeIsMap = nodeUtil && nodeUtil.isMap, nodeIsRegExp = nodeUtil && nodeUtil.isRegExp, nodeIsSet = nodeUtil && nodeUtil.isSet, nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
      function apply(func, thisArg, args) {
        switch (args.length) {
          case 0:
            return func.call(thisArg);
          case 1:
            return func.call(thisArg, args[0]);
          case 2:
            return func.call(thisArg, args[0], args[1]);
          case 3:
            return func.call(thisArg, args[0], args[1], args[2]);
        }
        return func.apply(thisArg, args);
      }
      __name(apply, "apply");
      function arrayAggregator(array, setter, iteratee, accumulator) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          var value = array[index];
          setter(accumulator, value, iteratee(value), array);
        }
        return accumulator;
      }
      __name(arrayAggregator, "arrayAggregator");
      function arrayEach(array, iteratee) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (iteratee(array[index], index, array) === false) {
            break;
          }
        }
        return array;
      }
      __name(arrayEach, "arrayEach");
      function arrayEachRight(array, iteratee) {
        var length = array == null ? 0 : array.length;
        while (length--) {
          if (iteratee(array[length], length, array) === false) {
            break;
          }
        }
        return array;
      }
      __name(arrayEachRight, "arrayEachRight");
      function arrayEvery(array, predicate) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (!predicate(array[index], index, array)) {
            return false;
          }
        }
        return true;
      }
      __name(arrayEvery, "arrayEvery");
      function arrayFilter(array, predicate) {
        var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
        while (++index < length) {
          var value = array[index];
          if (predicate(value, index, array)) {
            result[resIndex++] = value;
          }
        }
        return result;
      }
      __name(arrayFilter, "arrayFilter");
      function arrayIncludes(array, value) {
        var length = array == null ? 0 : array.length;
        return !!length && baseIndexOf(array, value, 0) > -1;
      }
      __name(arrayIncludes, "arrayIncludes");
      function arrayIncludesWith(array, value, comparator) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (comparator(value, array[index])) {
            return true;
          }
        }
        return false;
      }
      __name(arrayIncludesWith, "arrayIncludesWith");
      function arrayMap(array, iteratee) {
        var index = -1, length = array == null ? 0 : array.length, result = Array(length);
        while (++index < length) {
          result[index] = iteratee(array[index], index, array);
        }
        return result;
      }
      __name(arrayMap, "arrayMap");
      function arrayPush(array, values) {
        var index = -1, length = values.length, offset = array.length;
        while (++index < length) {
          array[offset + index] = values[index];
        }
        return array;
      }
      __name(arrayPush, "arrayPush");
      function arrayReduce(array, iteratee, accumulator, initAccum) {
        var index = -1, length = array == null ? 0 : array.length;
        if (initAccum && length) {
          accumulator = array[++index];
        }
        while (++index < length) {
          accumulator = iteratee(accumulator, array[index], index, array);
        }
        return accumulator;
      }
      __name(arrayReduce, "arrayReduce");
      function arrayReduceRight(array, iteratee, accumulator, initAccum) {
        var length = array == null ? 0 : array.length;
        if (initAccum && length) {
          accumulator = array[--length];
        }
        while (length--) {
          accumulator = iteratee(accumulator, array[length], length, array);
        }
        return accumulator;
      }
      __name(arrayReduceRight, "arrayReduceRight");
      function arraySome(array, predicate) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (predicate(array[index], index, array)) {
            return true;
          }
        }
        return false;
      }
      __name(arraySome, "arraySome");
      var asciiSize = baseProperty("length");
      function asciiToArray(string) {
        return string.split("");
      }
      __name(asciiToArray, "asciiToArray");
      function asciiWords(string) {
        return string.match(reAsciiWord) || [];
      }
      __name(asciiWords, "asciiWords");
      function baseFindKey(collection, predicate, eachFunc) {
        var result;
        eachFunc(collection, function(value, key, collection2) {
          if (predicate(value, key, collection2)) {
            result = key;
            return false;
          }
        });
        return result;
      }
      __name(baseFindKey, "baseFindKey");
      function baseFindIndex(array, predicate, fromIndex, fromRight) {
        var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
        while (fromRight ? index-- : ++index < length) {
          if (predicate(array[index], index, array)) {
            return index;
          }
        }
        return -1;
      }
      __name(baseFindIndex, "baseFindIndex");
      function baseIndexOf(array, value, fromIndex) {
        return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
      }
      __name(baseIndexOf, "baseIndexOf");
      function baseIndexOfWith(array, value, fromIndex, comparator) {
        var index = fromIndex - 1, length = array.length;
        while (++index < length) {
          if (comparator(array[index], value)) {
            return index;
          }
        }
        return -1;
      }
      __name(baseIndexOfWith, "baseIndexOfWith");
      function baseIsNaN(value) {
        return value !== value;
      }
      __name(baseIsNaN, "baseIsNaN");
      function baseMean(array, iteratee) {
        var length = array == null ? 0 : array.length;
        return length ? baseSum(array, iteratee) / length : NAN;
      }
      __name(baseMean, "baseMean");
      function baseProperty(key) {
        return function(object) {
          return object == null ? undefined : object[key];
        };
      }
      __name(baseProperty, "baseProperty");
      function basePropertyOf(object) {
        return function(key) {
          return object == null ? undefined : object[key];
        };
      }
      __name(basePropertyOf, "basePropertyOf");
      function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
        eachFunc(collection, function(value, index, collection2) {
          accumulator = initAccum ? (initAccum = false, value) : iteratee(accumulator, value, index, collection2);
        });
        return accumulator;
      }
      __name(baseReduce, "baseReduce");
      function baseSortBy(array, comparer) {
        var length = array.length;
        array.sort(comparer);
        while (length--) {
          array[length] = array[length].value;
        }
        return array;
      }
      __name(baseSortBy, "baseSortBy");
      function baseSum(array, iteratee) {
        var result, index = -1, length = array.length;
        while (++index < length) {
          var current = iteratee(array[index]);
          if (current !== undefined) {
            result = result === undefined ? current : result + current;
          }
        }
        return result;
      }
      __name(baseSum, "baseSum");
      function baseTimes(n, iteratee) {
        var index = -1, result = Array(n);
        while (++index < n) {
          result[index] = iteratee(index);
        }
        return result;
      }
      __name(baseTimes, "baseTimes");
      function baseToPairs(object, props) {
        return arrayMap(props, function(key) {
          return [key, object[key]];
        });
      }
      __name(baseToPairs, "baseToPairs");
      function baseTrim(string) {
        return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
      }
      __name(baseTrim, "baseTrim");
      function baseUnary(func) {
        return function(value) {
          return func(value);
        };
      }
      __name(baseUnary, "baseUnary");
      function baseValues(object, props) {
        return arrayMap(props, function(key) {
          return object[key];
        });
      }
      __name(baseValues, "baseValues");
      function cacheHas(cache, key) {
        return cache.has(key);
      }
      __name(cacheHas, "cacheHas");
      function charsStartIndex(strSymbols, chrSymbols) {
        var index = -1, length = strSymbols.length;
        while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
        }
        return index;
      }
      __name(charsStartIndex, "charsStartIndex");
      function charsEndIndex(strSymbols, chrSymbols) {
        var index = strSymbols.length;
        while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
        }
        return index;
      }
      __name(charsEndIndex, "charsEndIndex");
      function countHolders(array, placeholder) {
        var length = array.length, result = 0;
        while (length--) {
          if (array[length] === placeholder) {
            ++result;
          }
        }
        return result;
      }
      __name(countHolders, "countHolders");
      var deburrLetter = basePropertyOf(deburredLetters);
      var escapeHtmlChar = basePropertyOf(htmlEscapes);
      function escapeStringChar(chr) {
        return "\\" + stringEscapes[chr];
      }
      __name(escapeStringChar, "escapeStringChar");
      function getValue(object, key) {
        return object == null ? undefined : object[key];
      }
      __name(getValue, "getValue");
      function hasUnicode(string) {
        return reHasUnicode.test(string);
      }
      __name(hasUnicode, "hasUnicode");
      function hasUnicodeWord(string) {
        return reHasUnicodeWord.test(string);
      }
      __name(hasUnicodeWord, "hasUnicodeWord");
      function iteratorToArray(iterator) {
        var data, result = [];
        while (!(data = iterator.next()).done) {
          result.push(data.value);
        }
        return result;
      }
      __name(iteratorToArray, "iteratorToArray");
      function mapToArray(map) {
        var index = -1, result = Array(map.size);
        map.forEach(function(value, key) {
          result[++index] = [key, value];
        });
        return result;
      }
      __name(mapToArray, "mapToArray");
      function overArg(func, transform) {
        return function(arg) {
          return func(transform(arg));
        };
      }
      __name(overArg, "overArg");
      function replaceHolders(array, placeholder) {
        var index = -1, length = array.length, resIndex = 0, result = [];
        while (++index < length) {
          var value = array[index];
          if (value === placeholder || value === PLACEHOLDER) {
            array[index] = PLACEHOLDER;
            result[resIndex++] = index;
          }
        }
        return result;
      }
      __name(replaceHolders, "replaceHolders");
      function setToArray(set) {
        var index = -1, result = Array(set.size);
        set.forEach(function(value) {
          result[++index] = value;
        });
        return result;
      }
      __name(setToArray, "setToArray");
      function setToPairs(set) {
        var index = -1, result = Array(set.size);
        set.forEach(function(value) {
          result[++index] = [value, value];
        });
        return result;
      }
      __name(setToPairs, "setToPairs");
      function strictIndexOf(array, value, fromIndex) {
        var index = fromIndex - 1, length = array.length;
        while (++index < length) {
          if (array[index] === value) {
            return index;
          }
        }
        return -1;
      }
      __name(strictIndexOf, "strictIndexOf");
      function strictLastIndexOf(array, value, fromIndex) {
        var index = fromIndex + 1;
        while (index--) {
          if (array[index] === value) {
            return index;
          }
        }
        return index;
      }
      __name(strictLastIndexOf, "strictLastIndexOf");
      function stringSize(string) {
        return hasUnicode(string) ? unicodeSize(string) : asciiSize(string);
      }
      __name(stringSize, "stringSize");
      function stringToArray(string) {
        return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
      }
      __name(stringToArray, "stringToArray");
      function trimmedEndIndex(string) {
        var index = string.length;
        while (index-- && reWhitespace.test(string.charAt(index))) {
        }
        return index;
      }
      __name(trimmedEndIndex, "trimmedEndIndex");
      var unescapeHtmlChar = basePropertyOf(htmlUnescapes);
      function unicodeSize(string) {
        var result = reUnicode.lastIndex = 0;
        while (reUnicode.test(string)) {
          ++result;
        }
        return result;
      }
      __name(unicodeSize, "unicodeSize");
      function unicodeToArray(string) {
        return string.match(reUnicode) || [];
      }
      __name(unicodeToArray, "unicodeToArray");
      function unicodeWords(string) {
        return string.match(reUnicodeWord) || [];
      }
      __name(unicodeWords, "unicodeWords");
      var runInContext = /* @__PURE__ */ __name(function runInContext2(context) {
        context = context == null ? root : _2.defaults(root.Object(), context, _2.pick(root, contextProps));
        var Array2 = context.Array, Date2 = context.Date, Error2 = context.Error, Function2 = context.Function, Math2 = context.Math, Object2 = context.Object, RegExp2 = context.RegExp, String2 = context.String, TypeError2 = context.TypeError;
        var arrayProto = Array2.prototype, funcProto = Function2.prototype, objectProto = Object2.prototype;
        var coreJsData = context["__core-js_shared__"];
        var funcToString = funcProto.toString;
        var hasOwnProperty = objectProto.hasOwnProperty;
        var idCounter = 0;
        var maskSrcKey = function() {
          var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
          return uid ? "Symbol(src)_1." + uid : "";
        }();
        var nativeObjectToString = objectProto.toString;
        var objectCtorString = funcToString.call(Object2);
        var oldDash = root._;
        var reIsNative = RegExp2(
          "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
        );
        var Buffer2 = moduleExports ? context.Buffer : undefined, Symbol2 = context.Symbol, Uint8Array2 = context.Uint8Array, allocUnsafe = Buffer2 ? Buffer2.allocUnsafe : undefined, getPrototype = overArg(Object2.getPrototypeOf, Object2), objectCreate = Object2.create, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice, spreadableSymbol = Symbol2 ? Symbol2.isConcatSpreadable : undefined, symIterator = Symbol2 ? Symbol2.iterator : undefined, symToStringTag = Symbol2 ? Symbol2.toStringTag : undefined;
        var defineProperty = function() {
          try {
            var func = getNative(Object2, "defineProperty");
            func({}, "", {});
            return func;
          } catch (e) {
          }
        }();
        var ctxClearTimeout = context.clearTimeout !== root.clearTimeout && context.clearTimeout, ctxNow = Date2 && Date2.now !== root.Date.now && Date2.now, ctxSetTimeout = context.setTimeout !== root.setTimeout && context.setTimeout;
        var nativeCeil = Math2.ceil, nativeFloor = Math2.floor, nativeGetSymbols = Object2.getOwnPropertySymbols, nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : undefined, nativeIsFinite = context.isFinite, nativeJoin = arrayProto.join, nativeKeys = overArg(Object2.keys, Object2), nativeMax = Math2.max, nativeMin = Math2.min, nativeNow = Date2.now, nativeParseInt = context.parseInt, nativeRandom = Math2.random, nativeReverse = arrayProto.reverse;
        var DataView = getNative(context, "DataView"), Map2 = getNative(context, "Map"), Promise2 = getNative(context, "Promise"), Set = getNative(context, "Set"), WeakMap = getNative(context, "WeakMap"), nativeCreate = getNative(Object2, "create");
        var metaMap = WeakMap && new WeakMap();
        var realNames = {};
        var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map2), promiseCtorString = toSource(Promise2), setCtorString = toSource(Set), weakMapCtorString = toSource(WeakMap);
        var symbolProto = Symbol2 ? Symbol2.prototype : undefined, symbolValueOf = symbolProto ? symbolProto.valueOf : undefined, symbolToString = symbolProto ? symbolProto.toString : undefined;
        function lodash(value) {
          if (isObjectLike(value) && !isArray2(value) && !(value instanceof LazyWrapper)) {
            if (value instanceof LodashWrapper) {
              return value;
            }
            if (hasOwnProperty.call(value, "__wrapped__")) {
              return wrapperClone(value);
            }
          }
          return new LodashWrapper(value);
        }
        __name(lodash, "lodash");
        var baseCreate = function() {
          function object() {
          }
          __name(object, "object");
          return function(proto) {
            if (!isObject2(proto)) {
              return {};
            }
            if (objectCreate) {
              return objectCreate(proto);
            }
            object.prototype = proto;
            var result2 = new object();
            object.prototype = undefined;
            return result2;
          };
        }();
        function baseLodash() {
        }
        __name(baseLodash, "baseLodash");
        function LodashWrapper(value, chainAll) {
          this.__wrapped__ = value;
          this.__actions__ = [];
          this.__chain__ = !!chainAll;
          this.__index__ = 0;
          this.__values__ = undefined;
        }
        __name(LodashWrapper, "LodashWrapper");
        lodash.templateSettings = {
          /**
           * Used to detect `data` property values to be HTML-escaped.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          "escape": reEscape,
          /**
           * Used to detect code to be evaluated.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          "evaluate": reEvaluate,
          /**
           * Used to detect `data` property values to inject.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          "interpolate": reInterpolate,
          /**
           * Used to reference the data object in the template text.
           *
           * @memberOf _.templateSettings
           * @type {string}
           */
          "variable": "",
          /**
           * Used to import variables into the compiled template.
           *
           * @memberOf _.templateSettings
           * @type {Object}
           */
          "imports": {
            /**
             * A reference to the `lodash` function.
             *
             * @memberOf _.templateSettings.imports
             * @type {Function}
             */
            "_": lodash
          }
        };
        lodash.prototype = baseLodash.prototype;
        lodash.prototype.constructor = lodash;
        LodashWrapper.prototype = baseCreate(baseLodash.prototype);
        LodashWrapper.prototype.constructor = LodashWrapper;
        function LazyWrapper(value) {
          this.__wrapped__ = value;
          this.__actions__ = [];
          this.__dir__ = 1;
          this.__filtered__ = false;
          this.__iteratees__ = [];
          this.__takeCount__ = MAX_ARRAY_LENGTH;
          this.__views__ = [];
        }
        __name(LazyWrapper, "LazyWrapper");
        function lazyClone() {
          var result2 = new LazyWrapper(this.__wrapped__);
          result2.__actions__ = copyArray(this.__actions__);
          result2.__dir__ = this.__dir__;
          result2.__filtered__ = this.__filtered__;
          result2.__iteratees__ = copyArray(this.__iteratees__);
          result2.__takeCount__ = this.__takeCount__;
          result2.__views__ = copyArray(this.__views__);
          return result2;
        }
        __name(lazyClone, "lazyClone");
        function lazyReverse() {
          if (this.__filtered__) {
            var result2 = new LazyWrapper(this);
            result2.__dir__ = -1;
            result2.__filtered__ = true;
          } else {
            result2 = this.clone();
            result2.__dir__ *= -1;
          }
          return result2;
        }
        __name(lazyReverse, "lazyReverse");
        function lazyValue() {
          var array = this.__wrapped__.value(), dir = this.__dir__, isArr = isArray2(array), isRight = dir < 0, arrLength = isArr ? array.length : 0, view = getView(0, arrLength, this.__views__), start = view.start, end = view.end, length = end - start, index = isRight ? end : start - 1, iteratees = this.__iteratees__, iterLength = iteratees.length, resIndex = 0, takeCount = nativeMin(length, this.__takeCount__);
          if (!isArr || !isRight && arrLength == length && takeCount == length) {
            return baseWrapperValue(array, this.__actions__);
          }
          var result2 = [];
          outer:
            while (length-- && resIndex < takeCount) {
              index += dir;
              var iterIndex = -1, value = array[index];
              while (++iterIndex < iterLength) {
                var data = iteratees[iterIndex], iteratee2 = data.iteratee, type = data.type, computed = iteratee2(value);
                if (type == LAZY_MAP_FLAG) {
                  value = computed;
                } else if (!computed) {
                  if (type == LAZY_FILTER_FLAG) {
                    continue outer;
                  } else {
                    break outer;
                  }
                }
              }
              result2[resIndex++] = value;
            }
          return result2;
        }
        __name(lazyValue, "lazyValue");
        LazyWrapper.prototype = baseCreate(baseLodash.prototype);
        LazyWrapper.prototype.constructor = LazyWrapper;
        function Hash(entries) {
          var index = -1, length = entries == null ? 0 : entries.length;
          this.clear();
          while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1]);
          }
        }
        __name(Hash, "Hash");
        function hashClear() {
          this.__data__ = nativeCreate ? nativeCreate(null) : {};
          this.size = 0;
        }
        __name(hashClear, "hashClear");
        function hashDelete(key) {
          var result2 = this.has(key) && delete this.__data__[key];
          this.size -= result2 ? 1 : 0;
          return result2;
        }
        __name(hashDelete, "hashDelete");
        function hashGet(key) {
          var data = this.__data__;
          if (nativeCreate) {
            var result2 = data[key];
            return result2 === HASH_UNDEFINED ? undefined : result2;
          }
          return hasOwnProperty.call(data, key) ? data[key] : undefined;
        }
        __name(hashGet, "hashGet");
        function hashHas(key) {
          var data = this.__data__;
          return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
        }
        __name(hashHas, "hashHas");
        function hashSet(key, value) {
          var data = this.__data__;
          this.size += this.has(key) ? 0 : 1;
          data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
          return this;
        }
        __name(hashSet, "hashSet");
        Hash.prototype.clear = hashClear;
        Hash.prototype["delete"] = hashDelete;
        Hash.prototype.get = hashGet;
        Hash.prototype.has = hashHas;
        Hash.prototype.set = hashSet;
        function ListCache(entries) {
          var index = -1, length = entries == null ? 0 : entries.length;
          this.clear();
          while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1]);
          }
        }
        __name(ListCache, "ListCache");
        function listCacheClear() {
          this.__data__ = [];
          this.size = 0;
        }
        __name(listCacheClear, "listCacheClear");
        function listCacheDelete(key) {
          var data = this.__data__, index = assocIndexOf(data, key);
          if (index < 0) {
            return false;
          }
          var lastIndex = data.length - 1;
          if (index == lastIndex) {
            data.pop();
          } else {
            splice.call(data, index, 1);
          }
          --this.size;
          return true;
        }
        __name(listCacheDelete, "listCacheDelete");
        function listCacheGet(key) {
          var data = this.__data__, index = assocIndexOf(data, key);
          return index < 0 ? undefined : data[index][1];
        }
        __name(listCacheGet, "listCacheGet");
        function listCacheHas(key) {
          return assocIndexOf(this.__data__, key) > -1;
        }
        __name(listCacheHas, "listCacheHas");
        function listCacheSet(key, value) {
          var data = this.__data__, index = assocIndexOf(data, key);
          if (index < 0) {
            ++this.size;
            data.push([key, value]);
          } else {
            data[index][1] = value;
          }
          return this;
        }
        __name(listCacheSet, "listCacheSet");
        ListCache.prototype.clear = listCacheClear;
        ListCache.prototype["delete"] = listCacheDelete;
        ListCache.prototype.get = listCacheGet;
        ListCache.prototype.has = listCacheHas;
        ListCache.prototype.set = listCacheSet;
        function MapCache(entries) {
          var index = -1, length = entries == null ? 0 : entries.length;
          this.clear();
          while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1]);
          }
        }
        __name(MapCache, "MapCache");
        function mapCacheClear() {
          this.size = 0;
          this.__data__ = {
            "hash": new Hash(),
            "map": new (Map2 || ListCache)(),
            "string": new Hash()
          };
        }
        __name(mapCacheClear, "mapCacheClear");
        function mapCacheDelete(key) {
          var result2 = getMapData(this, key)["delete"](key);
          this.size -= result2 ? 1 : 0;
          return result2;
        }
        __name(mapCacheDelete, "mapCacheDelete");
        function mapCacheGet(key) {
          return getMapData(this, key).get(key);
        }
        __name(mapCacheGet, "mapCacheGet");
        function mapCacheHas(key) {
          return getMapData(this, key).has(key);
        }
        __name(mapCacheHas, "mapCacheHas");
        function mapCacheSet(key, value) {
          var data = getMapData(this, key), size2 = data.size;
          data.set(key, value);
          this.size += data.size == size2 ? 0 : 1;
          return this;
        }
        __name(mapCacheSet, "mapCacheSet");
        MapCache.prototype.clear = mapCacheClear;
        MapCache.prototype["delete"] = mapCacheDelete;
        MapCache.prototype.get = mapCacheGet;
        MapCache.prototype.has = mapCacheHas;
        MapCache.prototype.set = mapCacheSet;
        function SetCache(values2) {
          var index = -1, length = values2 == null ? 0 : values2.length;
          this.__data__ = new MapCache();
          while (++index < length) {
            this.add(values2[index]);
          }
        }
        __name(SetCache, "SetCache");
        function setCacheAdd(value) {
          this.__data__.set(value, HASH_UNDEFINED);
          return this;
        }
        __name(setCacheAdd, "setCacheAdd");
        function setCacheHas(value) {
          return this.__data__.has(value);
        }
        __name(setCacheHas, "setCacheHas");
        SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
        SetCache.prototype.has = setCacheHas;
        function Stack(entries) {
          var data = this.__data__ = new ListCache(entries);
          this.size = data.size;
        }
        __name(Stack, "Stack");
        function stackClear() {
          this.__data__ = new ListCache();
          this.size = 0;
        }
        __name(stackClear, "stackClear");
        function stackDelete(key) {
          var data = this.__data__, result2 = data["delete"](key);
          this.size = data.size;
          return result2;
        }
        __name(stackDelete, "stackDelete");
        function stackGet(key) {
          return this.__data__.get(key);
        }
        __name(stackGet, "stackGet");
        function stackHas(key) {
          return this.__data__.has(key);
        }
        __name(stackHas, "stackHas");
        function stackSet(key, value) {
          var data = this.__data__;
          if (data instanceof ListCache) {
            var pairs = data.__data__;
            if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
              pairs.push([key, value]);
              this.size = ++data.size;
              return this;
            }
            data = this.__data__ = new MapCache(pairs);
          }
          data.set(key, value);
          this.size = data.size;
          return this;
        }
        __name(stackSet, "stackSet");
        Stack.prototype.clear = stackClear;
        Stack.prototype["delete"] = stackDelete;
        Stack.prototype.get = stackGet;
        Stack.prototype.has = stackHas;
        Stack.prototype.set = stackSet;
        function arrayLikeKeys(value, inherited) {
          var isArr = isArray2(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result2 = skipIndexes ? baseTimes(value.length, String2) : [], length = result2.length;
          for (var key in value) {
            if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
            (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
            isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
            isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
            isIndex(key, length)))) {
              result2.push(key);
            }
          }
          return result2;
        }
        __name(arrayLikeKeys, "arrayLikeKeys");
        function arraySample(array) {
          var length = array.length;
          return length ? array[baseRandom(0, length - 1)] : undefined;
        }
        __name(arraySample, "arraySample");
        function arraySampleSize(array, n) {
          return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
        }
        __name(arraySampleSize, "arraySampleSize");
        function arrayShuffle(array) {
          return shuffleSelf(copyArray(array));
        }
        __name(arrayShuffle, "arrayShuffle");
        function assignMergeValue(object, key, value) {
          if (value !== undefined && !eq(object[key], value) || value === undefined && !(key in object)) {
            baseAssignValue(object, key, value);
          }
        }
        __name(assignMergeValue, "assignMergeValue");
        function assignValue(object, key, value) {
          var objValue = object[key];
          if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined && !(key in object)) {
            baseAssignValue(object, key, value);
          }
        }
        __name(assignValue, "assignValue");
        function assocIndexOf(array, key) {
          var length = array.length;
          while (length--) {
            if (eq(array[length][0], key)) {
              return length;
            }
          }
          return -1;
        }
        __name(assocIndexOf, "assocIndexOf");
        function baseAggregator(collection, setter, iteratee2, accumulator) {
          baseEach(collection, function(value, key, collection2) {
            setter(accumulator, value, iteratee2(value), collection2);
          });
          return accumulator;
        }
        __name(baseAggregator, "baseAggregator");
        function baseAssign(object, source) {
          return object && copyObject(source, keys(source), object);
        }
        __name(baseAssign, "baseAssign");
        function baseAssignIn(object, source) {
          return object && copyObject(source, keysIn(source), object);
        }
        __name(baseAssignIn, "baseAssignIn");
        function baseAssignValue(object, key, value) {
          if (key == "__proto__" && defineProperty) {
            defineProperty(object, key, {
              "configurable": true,
              "enumerable": true,
              "value": value,
              "writable": true
            });
          } else {
            object[key] = value;
          }
        }
        __name(baseAssignValue, "baseAssignValue");
        function baseAt(object, paths) {
          var index = -1, length = paths.length, result2 = Array2(length), skip = object == null;
          while (++index < length) {
            result2[index] = skip ? undefined : get(object, paths[index]);
          }
          return result2;
        }
        __name(baseAt, "baseAt");
        function baseClamp(number, lower, upper) {
          if (number === number) {
            if (upper !== undefined) {
              number = number <= upper ? number : upper;
            }
            if (lower !== undefined) {
              number = number >= lower ? number : lower;
            }
          }
          return number;
        }
        __name(baseClamp, "baseClamp");
        function baseClone(value, bitmask, customizer, key, object, stack) {
          var result2, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
          if (customizer) {
            result2 = object ? customizer(value, key, object, stack) : customizer(value);
          }
          if (result2 !== undefined) {
            return result2;
          }
          if (!isObject2(value)) {
            return value;
          }
          var isArr = isArray2(value);
          if (isArr) {
            result2 = initCloneArray(value);
            if (!isDeep) {
              return copyArray(value, result2);
            }
          } else {
            var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
            if (isBuffer(value)) {
              return cloneBuffer(value, isDeep);
            }
            if (tag == objectTag || tag == argsTag || isFunc && !object) {
              result2 = isFlat || isFunc ? {} : initCloneObject(value);
              if (!isDeep) {
                return isFlat ? copySymbolsIn(value, baseAssignIn(result2, value)) : copySymbols(value, baseAssign(result2, value));
              }
            } else {
              if (!cloneableTags[tag]) {
                return object ? value : {};
              }
              result2 = initCloneByTag(value, tag, isDeep);
            }
          }
          stack || (stack = new Stack());
          var stacked = stack.get(value);
          if (stacked) {
            return stacked;
          }
          stack.set(value, result2);
          if (isSet(value)) {
            value.forEach(function(subValue) {
              result2.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
            });
          } else if (isMap(value)) {
            value.forEach(function(subValue, key2) {
              result2.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
            });
          }
          var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
          var props = isArr ? undefined : keysFunc(value);
          arrayEach(props || value, function(subValue, key2) {
            if (props) {
              key2 = subValue;
              subValue = value[key2];
            }
            assignValue(result2, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
          });
          return result2;
        }
        __name(baseClone, "baseClone");
        function baseConforms(source) {
          var props = keys(source);
          return function(object) {
            return baseConformsTo(object, source, props);
          };
        }
        __name(baseConforms, "baseConforms");
        function baseConformsTo(object, source, props) {
          var length = props.length;
          if (object == null) {
            return !length;
          }
          object = Object2(object);
          while (length--) {
            var key = props[length], predicate = source[key], value = object[key];
            if (value === undefined && !(key in object) || !predicate(value)) {
              return false;
            }
          }
          return true;
        }
        __name(baseConformsTo, "baseConformsTo");
        function baseDelay(func, wait, args) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          return setTimeout2(function() {
            func.apply(undefined, args);
          }, wait);
        }
        __name(baseDelay, "baseDelay");
        function baseDifference(array, values2, iteratee2, comparator) {
          var index = -1, includes2 = arrayIncludes, isCommon = true, length = array.length, result2 = [], valuesLength = values2.length;
          if (!length) {
            return result2;
          }
          if (iteratee2) {
            values2 = arrayMap(values2, baseUnary(iteratee2));
          }
          if (comparator) {
            includes2 = arrayIncludesWith;
            isCommon = false;
          } else if (values2.length >= LARGE_ARRAY_SIZE) {
            includes2 = cacheHas;
            isCommon = false;
            values2 = new SetCache(values2);
          }
          outer:
            while (++index < length) {
              var value = array[index], computed = iteratee2 == null ? value : iteratee2(value);
              value = comparator || value !== 0 ? value : 0;
              if (isCommon && computed === computed) {
                var valuesIndex = valuesLength;
                while (valuesIndex--) {
                  if (values2[valuesIndex] === computed) {
                    continue outer;
                  }
                }
                result2.push(value);
              } else if (!includes2(values2, computed, comparator)) {
                result2.push(value);
              }
            }
          return result2;
        }
        __name(baseDifference, "baseDifference");
        var baseEach = createBaseEach(baseForOwn);
        var baseEachRight = createBaseEach(baseForOwnRight, true);
        function baseEvery(collection, predicate) {
          var result2 = true;
          baseEach(collection, function(value, index, collection2) {
            result2 = !!predicate(value, index, collection2);
            return result2;
          });
          return result2;
        }
        __name(baseEvery, "baseEvery");
        function baseExtremum(array, iteratee2, comparator) {
          var index = -1, length = array.length;
          while (++index < length) {
            var value = array[index], current = iteratee2(value);
            if (current != null && (computed === undefined ? current === current && !isSymbol(current) : comparator(current, computed))) {
              var computed = current, result2 = value;
            }
          }
          return result2;
        }
        __name(baseExtremum, "baseExtremum");
        function baseFill(array, value, start, end) {
          var length = array.length;
          start = toInteger(start);
          if (start < 0) {
            start = -start > length ? 0 : length + start;
          }
          end = end === undefined || end > length ? length : toInteger(end);
          if (end < 0) {
            end += length;
          }
          end = start > end ? 0 : toLength(end);
          while (start < end) {
            array[start++] = value;
          }
          return array;
        }
        __name(baseFill, "baseFill");
        function baseFilter(collection, predicate) {
          var result2 = [];
          baseEach(collection, function(value, index, collection2) {
            if (predicate(value, index, collection2)) {
              result2.push(value);
            }
          });
          return result2;
        }
        __name(baseFilter, "baseFilter");
        function baseFlatten(array, depth, predicate, isStrict, result2) {
          var index = -1, length = array.length;
          predicate || (predicate = isFlattenable);
          result2 || (result2 = []);
          while (++index < length) {
            var value = array[index];
            if (depth > 0 && predicate(value)) {
              if (depth > 1) {
                baseFlatten(value, depth - 1, predicate, isStrict, result2);
              } else {
                arrayPush(result2, value);
              }
            } else if (!isStrict) {
              result2[result2.length] = value;
            }
          }
          return result2;
        }
        __name(baseFlatten, "baseFlatten");
        var baseFor = createBaseFor();
        var baseForRight = createBaseFor(true);
        function baseForOwn(object, iteratee2) {
          return object && baseFor(object, iteratee2, keys);
        }
        __name(baseForOwn, "baseForOwn");
        function baseForOwnRight(object, iteratee2) {
          return object && baseForRight(object, iteratee2, keys);
        }
        __name(baseForOwnRight, "baseForOwnRight");
        function baseFunctions(object, props) {
          return arrayFilter(props, function(key) {
            return isFunction2(object[key]);
          });
        }
        __name(baseFunctions, "baseFunctions");
        function baseGet(object, path) {
          path = castPath(path, object);
          var index = 0, length = path.length;
          while (object != null && index < length) {
            object = object[toKey(path[index++])];
          }
          return index && index == length ? object : undefined;
        }
        __name(baseGet, "baseGet");
        function baseGetAllKeys(object, keysFunc, symbolsFunc) {
          var result2 = keysFunc(object);
          return isArray2(object) ? result2 : arrayPush(result2, symbolsFunc(object));
        }
        __name(baseGetAllKeys, "baseGetAllKeys");
        function baseGetTag(value) {
          if (value == null) {
            return value === undefined ? undefinedTag : nullTag;
          }
          return symToStringTag && symToStringTag in Object2(value) ? getRawTag(value) : objectToString(value);
        }
        __name(baseGetTag, "baseGetTag");
        function baseGt(value, other) {
          return value > other;
        }
        __name(baseGt, "baseGt");
        function baseHas(object, key) {
          return object != null && hasOwnProperty.call(object, key);
        }
        __name(baseHas, "baseHas");
        function baseHasIn(object, key) {
          return object != null && key in Object2(object);
        }
        __name(baseHasIn, "baseHasIn");
        function baseInRange(number, start, end) {
          return number >= nativeMin(start, end) && number < nativeMax(start, end);
        }
        __name(baseInRange, "baseInRange");
        function baseIntersection(arrays, iteratee2, comparator) {
          var includes2 = comparator ? arrayIncludesWith : arrayIncludes, length = arrays[0].length, othLength = arrays.length, othIndex = othLength, caches = Array2(othLength), maxLength = Infinity, result2 = [];
          while (othIndex--) {
            var array = arrays[othIndex];
            if (othIndex && iteratee2) {
              array = arrayMap(array, baseUnary(iteratee2));
            }
            maxLength = nativeMin(array.length, maxLength);
            caches[othIndex] = !comparator && (iteratee2 || length >= 120 && array.length >= 120) ? new SetCache(othIndex && array) : undefined;
          }
          array = arrays[0];
          var index = -1, seen = caches[0];
          outer:
            while (++index < length && result2.length < maxLength) {
              var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
              value = comparator || value !== 0 ? value : 0;
              if (!(seen ? cacheHas(seen, computed) : includes2(result2, computed, comparator))) {
                othIndex = othLength;
                while (--othIndex) {
                  var cache = caches[othIndex];
                  if (!(cache ? cacheHas(cache, computed) : includes2(arrays[othIndex], computed, comparator))) {
                    continue outer;
                  }
                }
                if (seen) {
                  seen.push(computed);
                }
                result2.push(value);
              }
            }
          return result2;
        }
        __name(baseIntersection, "baseIntersection");
        function baseInverter(object, setter, iteratee2, accumulator) {
          baseForOwn(object, function(value, key, object2) {
            setter(accumulator, iteratee2(value), key, object2);
          });
          return accumulator;
        }
        __name(baseInverter, "baseInverter");
        function baseInvoke(object, path, args) {
          path = castPath(path, object);
          object = parent(object, path);
          var func = object == null ? object : object[toKey(last(path))];
          return func == null ? undefined : apply(func, object, args);
        }
        __name(baseInvoke, "baseInvoke");
        function baseIsArguments(value) {
          return isObjectLike(value) && baseGetTag(value) == argsTag;
        }
        __name(baseIsArguments, "baseIsArguments");
        function baseIsArrayBuffer(value) {
          return isObjectLike(value) && baseGetTag(value) == arrayBufferTag;
        }
        __name(baseIsArrayBuffer, "baseIsArrayBuffer");
        function baseIsDate(value) {
          return isObjectLike(value) && baseGetTag(value) == dateTag;
        }
        __name(baseIsDate, "baseIsDate");
        function baseIsEqual(value, other, bitmask, customizer, stack) {
          if (value === other) {
            return true;
          }
          if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
            return value !== value && other !== other;
          }
          return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
        }
        __name(baseIsEqual, "baseIsEqual");
        function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
          var objIsArr = isArray2(object), othIsArr = isArray2(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
          objTag = objTag == argsTag ? objectTag : objTag;
          othTag = othTag == argsTag ? objectTag : othTag;
          var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
          if (isSameTag && isBuffer(object)) {
            if (!isBuffer(other)) {
              return false;
            }
            objIsArr = true;
            objIsObj = false;
          }
          if (isSameTag && !objIsObj) {
            stack || (stack = new Stack());
            return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
          }
          if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
            var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
            if (objIsWrapped || othIsWrapped) {
              var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
              stack || (stack = new Stack());
              return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
            }
          }
          if (!isSameTag) {
            return false;
          }
          stack || (stack = new Stack());
          return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
        }
        __name(baseIsEqualDeep, "baseIsEqualDeep");
        function baseIsMap(value) {
          return isObjectLike(value) && getTag(value) == mapTag;
        }
        __name(baseIsMap, "baseIsMap");
        function baseIsMatch(object, source, matchData, customizer) {
          var index = matchData.length, length = index, noCustomizer = !customizer;
          if (object == null) {
            return !length;
          }
          object = Object2(object);
          while (index--) {
            var data = matchData[index];
            if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
              return false;
            }
          }
          while (++index < length) {
            data = matchData[index];
            var key = data[0], objValue = object[key], srcValue = data[1];
            if (noCustomizer && data[2]) {
              if (objValue === undefined && !(key in object)) {
                return false;
              }
            } else {
              var stack = new Stack();
              if (customizer) {
                var result2 = customizer(objValue, srcValue, key, object, source, stack);
              }
              if (!(result2 === undefined ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result2)) {
                return false;
              }
            }
          }
          return true;
        }
        __name(baseIsMatch, "baseIsMatch");
        function baseIsNative(value) {
          if (!isObject2(value) || isMasked(value)) {
            return false;
          }
          var pattern = isFunction2(value) ? reIsNative : reIsHostCtor;
          return pattern.test(toSource(value));
        }
        __name(baseIsNative, "baseIsNative");
        function baseIsRegExp(value) {
          return isObjectLike(value) && baseGetTag(value) == regexpTag;
        }
        __name(baseIsRegExp, "baseIsRegExp");
        function baseIsSet(value) {
          return isObjectLike(value) && getTag(value) == setTag;
        }
        __name(baseIsSet, "baseIsSet");
        function baseIsTypedArray(value) {
          return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
        }
        __name(baseIsTypedArray, "baseIsTypedArray");
        function baseIteratee(value) {
          if (typeof value == "function") {
            return value;
          }
          if (value == null) {
            return identity;
          }
          if (typeof value == "object") {
            return isArray2(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
          }
          return property(value);
        }
        __name(baseIteratee, "baseIteratee");
        function baseKeys(object) {
          if (!isPrototype(object)) {
            return nativeKeys(object);
          }
          var result2 = [];
          for (var key in Object2(object)) {
            if (hasOwnProperty.call(object, key) && key != "constructor") {
              result2.push(key);
            }
          }
          return result2;
        }
        __name(baseKeys, "baseKeys");
        function baseKeysIn(object) {
          if (!isObject2(object)) {
            return nativeKeysIn(object);
          }
          var isProto = isPrototype(object), result2 = [];
          for (var key in object) {
            if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) {
              result2.push(key);
            }
          }
          return result2;
        }
        __name(baseKeysIn, "baseKeysIn");
        function baseLt(value, other) {
          return value < other;
        }
        __name(baseLt, "baseLt");
        function baseMap(collection, iteratee2) {
          var index = -1, result2 = isArrayLike(collection) ? Array2(collection.length) : [];
          baseEach(collection, function(value, key, collection2) {
            result2[++index] = iteratee2(value, key, collection2);
          });
          return result2;
        }
        __name(baseMap, "baseMap");
        function baseMatches(source) {
          var matchData = getMatchData(source);
          if (matchData.length == 1 && matchData[0][2]) {
            return matchesStrictComparable(matchData[0][0], matchData[0][1]);
          }
          return function(object) {
            return object === source || baseIsMatch(object, source, matchData);
          };
        }
        __name(baseMatches, "baseMatches");
        function baseMatchesProperty(path, srcValue) {
          if (isKey(path) && isStrictComparable(srcValue)) {
            return matchesStrictComparable(toKey(path), srcValue);
          }
          return function(object) {
            var objValue = get(object, path);
            return objValue === undefined && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
          };
        }
        __name(baseMatchesProperty, "baseMatchesProperty");
        function baseMerge(object, source, srcIndex, customizer, stack) {
          if (object === source) {
            return;
          }
          baseFor(source, function(srcValue, key) {
            stack || (stack = new Stack());
            if (isObject2(srcValue)) {
              baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
            } else {
              var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : undefined;
              if (newValue === undefined) {
                newValue = srcValue;
              }
              assignMergeValue(object, key, newValue);
            }
          }, keysIn);
        }
        __name(baseMerge, "baseMerge");
        function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
          var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
          if (stacked) {
            assignMergeValue(object, key, stacked);
            return;
          }
          var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : undefined;
          var isCommon = newValue === undefined;
          if (isCommon) {
            var isArr = isArray2(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
            newValue = srcValue;
            if (isArr || isBuff || isTyped) {
              if (isArray2(objValue)) {
                newValue = objValue;
              } else if (isArrayLikeObject(objValue)) {
                newValue = copyArray(objValue);
              } else if (isBuff) {
                isCommon = false;
                newValue = cloneBuffer(srcValue, true);
              } else if (isTyped) {
                isCommon = false;
                newValue = cloneTypedArray(srcValue, true);
              } else {
                newValue = [];
              }
            } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
              newValue = objValue;
              if (isArguments(objValue)) {
                newValue = toPlainObject(objValue);
              } else if (!isObject2(objValue) || isFunction2(objValue)) {
                newValue = initCloneObject(srcValue);
              }
            } else {
              isCommon = false;
            }
          }
          if (isCommon) {
            stack.set(srcValue, newValue);
            mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
            stack["delete"](srcValue);
          }
          assignMergeValue(object, key, newValue);
        }
        __name(baseMergeDeep, "baseMergeDeep");
        function baseNth(array, n) {
          var length = array.length;
          if (!length) {
            return;
          }
          n += n < 0 ? length : 0;
          return isIndex(n, length) ? array[n] : undefined;
        }
        __name(baseNth, "baseNth");
        function baseOrderBy(collection, iteratees, orders) {
          if (iteratees.length) {
            iteratees = arrayMap(iteratees, function(iteratee2) {
              if (isArray2(iteratee2)) {
                return function(value) {
                  return baseGet(value, iteratee2.length === 1 ? iteratee2[0] : iteratee2);
                };
              }
              return iteratee2;
            });
          } else {
            iteratees = [identity];
          }
          var index = -1;
          iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
          var result2 = baseMap(collection, function(value, key, collection2) {
            var criteria = arrayMap(iteratees, function(iteratee2) {
              return iteratee2(value);
            });
            return { "criteria": criteria, "index": ++index, "value": value };
          });
          return baseSortBy(result2, function(object, other) {
            return compareMultiple(object, other, orders);
          });
        }
        __name(baseOrderBy, "baseOrderBy");
        function basePick(object, paths) {
          return basePickBy(object, paths, function(value, path) {
            return hasIn(object, path);
          });
        }
        __name(basePick, "basePick");
        function basePickBy(object, paths, predicate) {
          var index = -1, length = paths.length, result2 = {};
          while (++index < length) {
            var path = paths[index], value = baseGet(object, path);
            if (predicate(value, path)) {
              baseSet(result2, castPath(path, object), value);
            }
          }
          return result2;
        }
        __name(basePickBy, "basePickBy");
        function basePropertyDeep(path) {
          return function(object) {
            return baseGet(object, path);
          };
        }
        __name(basePropertyDeep, "basePropertyDeep");
        function basePullAll(array, values2, iteratee2, comparator) {
          var indexOf2 = comparator ? baseIndexOfWith : baseIndexOf, index = -1, length = values2.length, seen = array;
          if (array === values2) {
            values2 = copyArray(values2);
          }
          if (iteratee2) {
            seen = arrayMap(array, baseUnary(iteratee2));
          }
          while (++index < length) {
            var fromIndex = 0, value = values2[index], computed = iteratee2 ? iteratee2(value) : value;
            while ((fromIndex = indexOf2(seen, computed, fromIndex, comparator)) > -1) {
              if (seen !== array) {
                splice.call(seen, fromIndex, 1);
              }
              splice.call(array, fromIndex, 1);
            }
          }
          return array;
        }
        __name(basePullAll, "basePullAll");
        function basePullAt(array, indexes) {
          var length = array ? indexes.length : 0, lastIndex = length - 1;
          while (length--) {
            var index = indexes[length];
            if (length == lastIndex || index !== previous) {
              var previous = index;
              if (isIndex(index)) {
                splice.call(array, index, 1);
              } else {
                baseUnset(array, index);
              }
            }
          }
          return array;
        }
        __name(basePullAt, "basePullAt");
        function baseRandom(lower, upper) {
          return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
        }
        __name(baseRandom, "baseRandom");
        function baseRange(start, end, step, fromRight) {
          var index = -1, length = nativeMax(nativeCeil((end - start) / (step || 1)), 0), result2 = Array2(length);
          while (length--) {
            result2[fromRight ? length : ++index] = start;
            start += step;
          }
          return result2;
        }
        __name(baseRange, "baseRange");
        function baseRepeat(string, n) {
          var result2 = "";
          if (!string || n < 1 || n > MAX_SAFE_INTEGER) {
            return result2;
          }
          do {
            if (n % 2) {
              result2 += string;
            }
            n = nativeFloor(n / 2);
            if (n) {
              string += string;
            }
          } while (n);
          return result2;
        }
        __name(baseRepeat, "baseRepeat");
        function baseRest(func, start) {
          return setToString(overRest(func, start, identity), func + "");
        }
        __name(baseRest, "baseRest");
        function baseSample(collection) {
          return arraySample(values(collection));
        }
        __name(baseSample, "baseSample");
        function baseSampleSize(collection, n) {
          var array = values(collection);
          return shuffleSelf(array, baseClamp(n, 0, array.length));
        }
        __name(baseSampleSize, "baseSampleSize");
        function baseSet(object, path, value, customizer) {
          if (!isObject2(object)) {
            return object;
          }
          path = castPath(path, object);
          var index = -1, length = path.length, lastIndex = length - 1, nested = object;
          while (nested != null && ++index < length) {
            var key = toKey(path[index]), newValue = value;
            if (key === "__proto__" || key === "constructor" || key === "prototype") {
              return object;
            }
            if (index != lastIndex) {
              var objValue = nested[key];
              newValue = customizer ? customizer(objValue, key, nested) : undefined;
              if (newValue === undefined) {
                newValue = isObject2(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
              }
            }
            assignValue(nested, key, newValue);
            nested = nested[key];
          }
          return object;
        }
        __name(baseSet, "baseSet");
        var baseSetData = !metaMap ? identity : function(func, data) {
          metaMap.set(func, data);
          return func;
        };
        var baseSetToString = !defineProperty ? identity : function(func, string) {
          return defineProperty(func, "toString", {
            "configurable": true,
            "enumerable": false,
            "value": constant(string),
            "writable": true
          });
        };
        function baseShuffle(collection) {
          return shuffleSelf(values(collection));
        }
        __name(baseShuffle, "baseShuffle");
        function baseSlice(array, start, end) {
          var index = -1, length = array.length;
          if (start < 0) {
            start = -start > length ? 0 : length + start;
          }
          end = end > length ? length : end;
          if (end < 0) {
            end += length;
          }
          length = start > end ? 0 : end - start >>> 0;
          start >>>= 0;
          var result2 = Array2(length);
          while (++index < length) {
            result2[index] = array[index + start];
          }
          return result2;
        }
        __name(baseSlice, "baseSlice");
        function baseSome(collection, predicate) {
          var result2;
          baseEach(collection, function(value, index, collection2) {
            result2 = predicate(value, index, collection2);
            return !result2;
          });
          return !!result2;
        }
        __name(baseSome, "baseSome");
        function baseSortedIndex(array, value, retHighest) {
          var low = 0, high = array == null ? low : array.length;
          if (typeof value == "number" && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
            while (low < high) {
              var mid = low + high >>> 1, computed = array[mid];
              if (computed !== null && !isSymbol(computed) && (retHighest ? computed <= value : computed < value)) {
                low = mid + 1;
              } else {
                high = mid;
              }
            }
            return high;
          }
          return baseSortedIndexBy(array, value, identity, retHighest);
        }
        __name(baseSortedIndex, "baseSortedIndex");
        function baseSortedIndexBy(array, value, iteratee2, retHighest) {
          var low = 0, high = array == null ? 0 : array.length;
          if (high === 0) {
            return 0;
          }
          value = iteratee2(value);
          var valIsNaN = value !== value, valIsNull = value === null, valIsSymbol = isSymbol(value), valIsUndefined = value === undefined;
          while (low < high) {
            var mid = nativeFloor((low + high) / 2), computed = iteratee2(array[mid]), othIsDefined = computed !== undefined, othIsNull = computed === null, othIsReflexive = computed === computed, othIsSymbol = isSymbol(computed);
            if (valIsNaN) {
              var setLow = retHighest || othIsReflexive;
            } else if (valIsUndefined) {
              setLow = othIsReflexive && (retHighest || othIsDefined);
            } else if (valIsNull) {
              setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
            } else if (valIsSymbol) {
              setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
            } else if (othIsNull || othIsSymbol) {
              setLow = false;
            } else {
              setLow = retHighest ? computed <= value : computed < value;
            }
            if (setLow) {
              low = mid + 1;
            } else {
              high = mid;
            }
          }
          return nativeMin(high, MAX_ARRAY_INDEX);
        }
        __name(baseSortedIndexBy, "baseSortedIndexBy");
        function baseSortedUniq(array, iteratee2) {
          var index = -1, length = array.length, resIndex = 0, result2 = [];
          while (++index < length) {
            var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
            if (!index || !eq(computed, seen)) {
              var seen = computed;
              result2[resIndex++] = value === 0 ? 0 : value;
            }
          }
          return result2;
        }
        __name(baseSortedUniq, "baseSortedUniq");
        function baseToNumber(value) {
          if (typeof value == "number") {
            return value;
          }
          if (isSymbol(value)) {
            return NAN;
          }
          return +value;
        }
        __name(baseToNumber, "baseToNumber");
        function baseToString(value) {
          if (typeof value == "string") {
            return value;
          }
          if (isArray2(value)) {
            return arrayMap(value, baseToString) + "";
          }
          if (isSymbol(value)) {
            return symbolToString ? symbolToString.call(value) : "";
          }
          var result2 = value + "";
          return result2 == "0" && 1 / value == -INFINITY ? "-0" : result2;
        }
        __name(baseToString, "baseToString");
        function baseUniq(array, iteratee2, comparator) {
          var index = -1, includes2 = arrayIncludes, length = array.length, isCommon = true, result2 = [], seen = result2;
          if (comparator) {
            isCommon = false;
            includes2 = arrayIncludesWith;
          } else if (length >= LARGE_ARRAY_SIZE) {
            var set2 = iteratee2 ? null : createSet(array);
            if (set2) {
              return setToArray(set2);
            }
            isCommon = false;
            includes2 = cacheHas;
            seen = new SetCache();
          } else {
            seen = iteratee2 ? [] : result2;
          }
          outer:
            while (++index < length) {
              var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
              value = comparator || value !== 0 ? value : 0;
              if (isCommon && computed === computed) {
                var seenIndex = seen.length;
                while (seenIndex--) {
                  if (seen[seenIndex] === computed) {
                    continue outer;
                  }
                }
                if (iteratee2) {
                  seen.push(computed);
                }
                result2.push(value);
              } else if (!includes2(seen, computed, comparator)) {
                if (seen !== result2) {
                  seen.push(computed);
                }
                result2.push(value);
              }
            }
          return result2;
        }
        __name(baseUniq, "baseUniq");
        function baseUnset(object, path) {
          path = castPath(path, object);
          object = parent(object, path);
          return object == null || delete object[toKey(last(path))];
        }
        __name(baseUnset, "baseUnset");
        function baseUpdate(object, path, updater, customizer) {
          return baseSet(object, path, updater(baseGet(object, path)), customizer);
        }
        __name(baseUpdate, "baseUpdate");
        function baseWhile(array, predicate, isDrop, fromRight) {
          var length = array.length, index = fromRight ? length : -1;
          while ((fromRight ? index-- : ++index < length) && predicate(array[index], index, array)) {
          }
          return isDrop ? baseSlice(array, fromRight ? 0 : index, fromRight ? index + 1 : length) : baseSlice(array, fromRight ? index + 1 : 0, fromRight ? length : index);
        }
        __name(baseWhile, "baseWhile");
        function baseWrapperValue(value, actions) {
          var result2 = value;
          if (result2 instanceof LazyWrapper) {
            result2 = result2.value();
          }
          return arrayReduce(actions, function(result3, action) {
            return action.func.apply(action.thisArg, arrayPush([result3], action.args));
          }, result2);
        }
        __name(baseWrapperValue, "baseWrapperValue");
        function baseXor(arrays, iteratee2, comparator) {
          var length = arrays.length;
          if (length < 2) {
            return length ? baseUniq(arrays[0]) : [];
          }
          var index = -1, result2 = Array2(length);
          while (++index < length) {
            var array = arrays[index], othIndex = -1;
            while (++othIndex < length) {
              if (othIndex != index) {
                result2[index] = baseDifference(result2[index] || array, arrays[othIndex], iteratee2, comparator);
              }
            }
          }
          return baseUniq(baseFlatten(result2, 1), iteratee2, comparator);
        }
        __name(baseXor, "baseXor");
        function baseZipObject(props, values2, assignFunc) {
          var index = -1, length = props.length, valsLength = values2.length, result2 = {};
          while (++index < length) {
            var value = index < valsLength ? values2[index] : undefined;
            assignFunc(result2, props[index], value);
          }
          return result2;
        }
        __name(baseZipObject, "baseZipObject");
        function castArrayLikeObject(value) {
          return isArrayLikeObject(value) ? value : [];
        }
        __name(castArrayLikeObject, "castArrayLikeObject");
        function castFunction(value) {
          return typeof value == "function" ? value : identity;
        }
        __name(castFunction, "castFunction");
        function castPath(value, object) {
          if (isArray2(value)) {
            return value;
          }
          return isKey(value, object) ? [value] : stringToPath(toString(value));
        }
        __name(castPath, "castPath");
        var castRest = baseRest;
        function castSlice(array, start, end) {
          var length = array.length;
          end = end === undefined ? length : end;
          return !start && end >= length ? array : baseSlice(array, start, end);
        }
        __name(castSlice, "castSlice");
        var clearTimeout = ctxClearTimeout || function(id) {
          return root.clearTimeout(id);
        };
        function cloneBuffer(buffer, isDeep) {
          if (isDeep) {
            return buffer.slice();
          }
          var length = buffer.length, result2 = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
          buffer.copy(result2);
          return result2;
        }
        __name(cloneBuffer, "cloneBuffer");
        function cloneArrayBuffer(arrayBuffer) {
          var result2 = new arrayBuffer.constructor(arrayBuffer.byteLength);
          new Uint8Array2(result2).set(new Uint8Array2(arrayBuffer));
          return result2;
        }
        __name(cloneArrayBuffer, "cloneArrayBuffer");
        function cloneDataView(dataView, isDeep) {
          var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
          return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
        }
        __name(cloneDataView, "cloneDataView");
        function cloneRegExp(regexp) {
          var result2 = new regexp.constructor(regexp.source, reFlags.exec(regexp));
          result2.lastIndex = regexp.lastIndex;
          return result2;
        }
        __name(cloneRegExp, "cloneRegExp");
        function cloneSymbol(symbol) {
          return symbolValueOf ? Object2(symbolValueOf.call(symbol)) : {};
        }
        __name(cloneSymbol, "cloneSymbol");
        function cloneTypedArray(typedArray, isDeep) {
          var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
          return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
        }
        __name(cloneTypedArray, "cloneTypedArray");
        function compareAscending(value, other) {
          if (value !== other) {
            var valIsDefined = value !== undefined, valIsNull = value === null, valIsReflexive = value === value, valIsSymbol = isSymbol(value);
            var othIsDefined = other !== undefined, othIsNull = other === null, othIsReflexive = other === other, othIsSymbol = isSymbol(other);
            if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
              return 1;
            }
            if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
              return -1;
            }
          }
          return 0;
        }
        __name(compareAscending, "compareAscending");
        function compareMultiple(object, other, orders) {
          var index = -1, objCriteria = object.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length;
          while (++index < length) {
            var result2 = compareAscending(objCriteria[index], othCriteria[index]);
            if (result2) {
              if (index >= ordersLength) {
                return result2;
              }
              var order = orders[index];
              return result2 * (order == "desc" ? -1 : 1);
            }
          }
          return object.index - other.index;
        }
        __name(compareMultiple, "compareMultiple");
        function composeArgs(args, partials, holders, isCurried) {
          var argsIndex = -1, argsLength = args.length, holdersLength = holders.length, leftIndex = -1, leftLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(leftLength + rangeLength), isUncurried = !isCurried;
          while (++leftIndex < leftLength) {
            result2[leftIndex] = partials[leftIndex];
          }
          while (++argsIndex < holdersLength) {
            if (isUncurried || argsIndex < argsLength) {
              result2[holders[argsIndex]] = args[argsIndex];
            }
          }
          while (rangeLength--) {
            result2[leftIndex++] = args[argsIndex++];
          }
          return result2;
        }
        __name(composeArgs, "composeArgs");
        function composeArgsRight(args, partials, holders, isCurried) {
          var argsIndex = -1, argsLength = args.length, holdersIndex = -1, holdersLength = holders.length, rightIndex = -1, rightLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(rangeLength + rightLength), isUncurried = !isCurried;
          while (++argsIndex < rangeLength) {
            result2[argsIndex] = args[argsIndex];
          }
          var offset = argsIndex;
          while (++rightIndex < rightLength) {
            result2[offset + rightIndex] = partials[rightIndex];
          }
          while (++holdersIndex < holdersLength) {
            if (isUncurried || argsIndex < argsLength) {
              result2[offset + holders[holdersIndex]] = args[argsIndex++];
            }
          }
          return result2;
        }
        __name(composeArgsRight, "composeArgsRight");
        function copyArray(source, array) {
          var index = -1, length = source.length;
          array || (array = Array2(length));
          while (++index < length) {
            array[index] = source[index];
          }
          return array;
        }
        __name(copyArray, "copyArray");
        function copyObject(source, props, object, customizer) {
          var isNew = !object;
          object || (object = {});
          var index = -1, length = props.length;
          while (++index < length) {
            var key = props[index];
            var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined;
            if (newValue === undefined) {
              newValue = source[key];
            }
            if (isNew) {
              baseAssignValue(object, key, newValue);
            } else {
              assignValue(object, key, newValue);
            }
          }
          return object;
        }
        __name(copyObject, "copyObject");
        function copySymbols(source, object) {
          return copyObject(source, getSymbols(source), object);
        }
        __name(copySymbols, "copySymbols");
        function copySymbolsIn(source, object) {
          return copyObject(source, getSymbolsIn(source), object);
        }
        __name(copySymbolsIn, "copySymbolsIn");
        function createAggregator(setter, initializer) {
          return function(collection, iteratee2) {
            var func = isArray2(collection) ? arrayAggregator : baseAggregator, accumulator = initializer ? initializer() : {};
            return func(collection, setter, getIteratee(iteratee2, 2), accumulator);
          };
        }
        __name(createAggregator, "createAggregator");
        function createAssigner(assigner) {
          return baseRest(function(object, sources) {
            var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : undefined, guard = length > 2 ? sources[2] : undefined;
            customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : undefined;
            if (guard && isIterateeCall(sources[0], sources[1], guard)) {
              customizer = length < 3 ? undefined : customizer;
              length = 1;
            }
            object = Object2(object);
            while (++index < length) {
              var source = sources[index];
              if (source) {
                assigner(object, source, index, customizer);
              }
            }
            return object;
          });
        }
        __name(createAssigner, "createAssigner");
        function createBaseEach(eachFunc, fromRight) {
          return function(collection, iteratee2) {
            if (collection == null) {
              return collection;
            }
            if (!isArrayLike(collection)) {
              return eachFunc(collection, iteratee2);
            }
            var length = collection.length, index = fromRight ? length : -1, iterable = Object2(collection);
            while (fromRight ? index-- : ++index < length) {
              if (iteratee2(iterable[index], index, iterable) === false) {
                break;
              }
            }
            return collection;
          };
        }
        __name(createBaseEach, "createBaseEach");
        function createBaseFor(fromRight) {
          return function(object, iteratee2, keysFunc) {
            var index = -1, iterable = Object2(object), props = keysFunc(object), length = props.length;
            while (length--) {
              var key = props[fromRight ? length : ++index];
              if (iteratee2(iterable[key], key, iterable) === false) {
                break;
              }
            }
            return object;
          };
        }
        __name(createBaseFor, "createBaseFor");
        function createBind(func, bitmask, thisArg) {
          var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
          function wrapper() {
            var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
            return fn.apply(isBind ? thisArg : this, arguments);
          }
          __name(wrapper, "wrapper");
          return wrapper;
        }
        __name(createBind, "createBind");
        function createCaseFirst(methodName) {
          return function(string) {
            string = toString(string);
            var strSymbols = hasUnicode(string) ? stringToArray(string) : undefined;
            var chr = strSymbols ? strSymbols[0] : string.charAt(0);
            var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
            return chr[methodName]() + trailing;
          };
        }
        __name(createCaseFirst, "createCaseFirst");
        function createCompounder(callback) {
          return function(string) {
            return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "");
          };
        }
        __name(createCompounder, "createCompounder");
        function createCtor(Ctor) {
          return function() {
            var args = arguments;
            switch (args.length) {
              case 0:
                return new Ctor();
              case 1:
                return new Ctor(args[0]);
              case 2:
                return new Ctor(args[0], args[1]);
              case 3:
                return new Ctor(args[0], args[1], args[2]);
              case 4:
                return new Ctor(args[0], args[1], args[2], args[3]);
              case 5:
                return new Ctor(args[0], args[1], args[2], args[3], args[4]);
              case 6:
                return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
              case 7:
                return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
            }
            var thisBinding = baseCreate(Ctor.prototype), result2 = Ctor.apply(thisBinding, args);
            return isObject2(result2) ? result2 : thisBinding;
          };
        }
        __name(createCtor, "createCtor");
        function createCurry(func, bitmask, arity) {
          var Ctor = createCtor(func);
          function wrapper() {
            var length = arguments.length, args = Array2(length), index = length, placeholder = getHolder(wrapper);
            while (index--) {
              args[index] = arguments[index];
            }
            var holders = length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder ? [] : replaceHolders(args, placeholder);
            length -= holders.length;
            if (length < arity) {
              return createRecurry(
                func,
                bitmask,
                createHybrid,
                wrapper.placeholder,
                undefined,
                args,
                holders,
                undefined,
                undefined,
                arity - length
              );
            }
            var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
            return apply(fn, this, args);
          }
          __name(wrapper, "wrapper");
          return wrapper;
        }
        __name(createCurry, "createCurry");
        function createFind(findIndexFunc) {
          return function(collection, predicate, fromIndex) {
            var iterable = Object2(collection);
            if (!isArrayLike(collection)) {
              var iteratee2 = getIteratee(predicate, 3);
              collection = keys(collection);
              predicate = /* @__PURE__ */ __name(function(key) {
                return iteratee2(iterable[key], key, iterable);
              }, "predicate");
            }
            var index = findIndexFunc(collection, predicate, fromIndex);
            return index > -1 ? iterable[iteratee2 ? collection[index] : index] : undefined;
          };
        }
        __name(createFind, "createFind");
        function createFlow(fromRight) {
          return flatRest(function(funcs) {
            var length = funcs.length, index = length, prereq = LodashWrapper.prototype.thru;
            if (fromRight) {
              funcs.reverse();
            }
            while (index--) {
              var func = funcs[index];
              if (typeof func != "function") {
                throw new TypeError2(FUNC_ERROR_TEXT);
              }
              if (prereq && !wrapper && getFuncName(func) == "wrapper") {
                var wrapper = new LodashWrapper([], true);
              }
            }
            index = wrapper ? index : length;
            while (++index < length) {
              func = funcs[index];
              var funcName = getFuncName(func), data = funcName == "wrapper" ? getData(func) : undefined;
              if (data && isLaziable(data[0]) && data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) && !data[4].length && data[9] == 1) {
                wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
              } else {
                wrapper = func.length == 1 && isLaziable(func) ? wrapper[funcName]() : wrapper.thru(func);
              }
            }
            return function() {
              var args = arguments, value = args[0];
              if (wrapper && args.length == 1 && isArray2(value)) {
                return wrapper.plant(value).value();
              }
              var index2 = 0, result2 = length ? funcs[index2].apply(this, args) : value;
              while (++index2 < length) {
                result2 = funcs[index2].call(this, result2);
              }
              return result2;
            };
          });
        }
        __name(createFlow, "createFlow");
        function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary2, arity) {
          var isAry = bitmask & WRAP_ARY_FLAG, isBind = bitmask & WRAP_BIND_FLAG, isBindKey = bitmask & WRAP_BIND_KEY_FLAG, isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG), isFlip = bitmask & WRAP_FLIP_FLAG, Ctor = isBindKey ? undefined : createCtor(func);
          function wrapper() {
            var length = arguments.length, args = Array2(length), index = length;
            while (index--) {
              args[index] = arguments[index];
            }
            if (isCurried) {
              var placeholder = getHolder(wrapper), holdersCount = countHolders(args, placeholder);
            }
            if (partials) {
              args = composeArgs(args, partials, holders, isCurried);
            }
            if (partialsRight) {
              args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
            }
            length -= holdersCount;
            if (isCurried && length < arity) {
              var newHolders = replaceHolders(args, placeholder);
              return createRecurry(
                func,
                bitmask,
                createHybrid,
                wrapper.placeholder,
                thisArg,
                args,
                newHolders,
                argPos,
                ary2,
                arity - length
              );
            }
            var thisBinding = isBind ? thisArg : this, fn = isBindKey ? thisBinding[func] : func;
            length = args.length;
            if (argPos) {
              args = reorder(args, argPos);
            } else if (isFlip && length > 1) {
              args.reverse();
            }
            if (isAry && ary2 < length) {
              args.length = ary2;
            }
            if (this && this !== root && this instanceof wrapper) {
              fn = Ctor || createCtor(fn);
            }
            return fn.apply(thisBinding, args);
          }
          __name(wrapper, "wrapper");
          return wrapper;
        }
        __name(createHybrid, "createHybrid");
        function createInverter(setter, toIteratee) {
          return function(object, iteratee2) {
            return baseInverter(object, setter, toIteratee(iteratee2), {});
          };
        }
        __name(createInverter, "createInverter");
        function createMathOperation(operator, defaultValue) {
          return function(value, other) {
            var result2;
            if (value === undefined && other === undefined) {
              return defaultValue;
            }
            if (value !== undefined) {
              result2 = value;
            }
            if (other !== undefined) {
              if (result2 === undefined) {
                return other;
              }
              if (typeof value == "string" || typeof other == "string") {
                value = baseToString(value);
                other = baseToString(other);
              } else {
                value = baseToNumber(value);
                other = baseToNumber(other);
              }
              result2 = operator(value, other);
            }
            return result2;
          };
        }
        __name(createMathOperation, "createMathOperation");
        function createOver(arrayFunc) {
          return flatRest(function(iteratees) {
            iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
            return baseRest(function(args) {
              var thisArg = this;
              return arrayFunc(iteratees, function(iteratee2) {
                return apply(iteratee2, thisArg, args);
              });
            });
          });
        }
        __name(createOver, "createOver");
        function createPadding(length, chars) {
          chars = chars === undefined ? " " : baseToString(chars);
          var charsLength = chars.length;
          if (charsLength < 2) {
            return charsLength ? baseRepeat(chars, length) : chars;
          }
          var result2 = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
          return hasUnicode(chars) ? castSlice(stringToArray(result2), 0, length).join("") : result2.slice(0, length);
        }
        __name(createPadding, "createPadding");
        function createPartial(func, bitmask, thisArg, partials) {
          var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
          function wrapper() {
            var argsIndex = -1, argsLength = arguments.length, leftIndex = -1, leftLength = partials.length, args = Array2(leftLength + argsLength), fn = this && this !== root && this instanceof wrapper ? Ctor : func;
            while (++leftIndex < leftLength) {
              args[leftIndex] = partials[leftIndex];
            }
            while (argsLength--) {
              args[leftIndex++] = arguments[++argsIndex];
            }
            return apply(fn, isBind ? thisArg : this, args);
          }
          __name(wrapper, "wrapper");
          return wrapper;
        }
        __name(createPartial, "createPartial");
        function createRange(fromRight) {
          return function(start, end, step) {
            if (step && typeof step != "number" && isIterateeCall(start, end, step)) {
              end = step = undefined;
            }
            start = toFinite(start);
            if (end === undefined) {
              end = start;
              start = 0;
            } else {
              end = toFinite(end);
            }
            step = step === undefined ? start < end ? 1 : -1 : toFinite(step);
            return baseRange(start, end, step, fromRight);
          };
        }
        __name(createRange, "createRange");
        function createRelationalOperation(operator) {
          return function(value, other) {
            if (!(typeof value == "string" && typeof other == "string")) {
              value = toNumber(value);
              other = toNumber(other);
            }
            return operator(value, other);
          };
        }
        __name(createRelationalOperation, "createRelationalOperation");
        function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary2, arity) {
          var isCurry = bitmask & WRAP_CURRY_FLAG, newHolders = isCurry ? holders : undefined, newHoldersRight = isCurry ? undefined : holders, newPartials = isCurry ? partials : undefined, newPartialsRight = isCurry ? undefined : partials;
          bitmask |= isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG;
          bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);
          if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
            bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
          }
          var newData = [
            func,
            bitmask,
            thisArg,
            newPartials,
            newHolders,
            newPartialsRight,
            newHoldersRight,
            argPos,
            ary2,
            arity
          ];
          var result2 = wrapFunc.apply(undefined, newData);
          if (isLaziable(func)) {
            setData(result2, newData);
          }
          result2.placeholder = placeholder;
          return setWrapToString(result2, func, bitmask);
        }
        __name(createRecurry, "createRecurry");
        function createRound(methodName) {
          var func = Math2[methodName];
          return function(number, precision) {
            number = toNumber(number);
            precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
            if (precision && nativeIsFinite(number)) {
              var pair = (toString(number) + "e").split("e"), value = func(pair[0] + "e" + (+pair[1] + precision));
              pair = (toString(value) + "e").split("e");
              return +(pair[0] + "e" + (+pair[1] - precision));
            }
            return func(number);
          };
        }
        __name(createRound, "createRound");
        var createSet = !(Set && 1 / setToArray(new Set([, -0]))[1] == INFINITY) ? noop : function(values2) {
          return new Set(values2);
        };
        function createToPairs(keysFunc) {
          return function(object) {
            var tag = getTag(object);
            if (tag == mapTag) {
              return mapToArray(object);
            }
            if (tag == setTag) {
              return setToPairs(object);
            }
            return baseToPairs(object, keysFunc(object));
          };
        }
        __name(createToPairs, "createToPairs");
        function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary2, arity) {
          var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
          if (!isBindKey && typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          var length = partials ? partials.length : 0;
          if (!length) {
            bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
            partials = holders = undefined;
          }
          ary2 = ary2 === undefined ? ary2 : nativeMax(toInteger(ary2), 0);
          arity = arity === undefined ? arity : toInteger(arity);
          length -= holders ? holders.length : 0;
          if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
            var partialsRight = partials, holdersRight = holders;
            partials = holders = undefined;
          }
          var data = isBindKey ? undefined : getData(func);
          var newData = [
            func,
            bitmask,
            thisArg,
            partials,
            holders,
            partialsRight,
            holdersRight,
            argPos,
            ary2,
            arity
          ];
          if (data) {
            mergeData(newData, data);
          }
          func = newData[0];
          bitmask = newData[1];
          thisArg = newData[2];
          partials = newData[3];
          holders = newData[4];
          arity = newData[9] = newData[9] === undefined ? isBindKey ? 0 : func.length : nativeMax(newData[9] - length, 0);
          if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
            bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
          }
          if (!bitmask || bitmask == WRAP_BIND_FLAG) {
            var result2 = createBind(func, bitmask, thisArg);
          } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
            result2 = createCurry(func, bitmask, arity);
          } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
            result2 = createPartial(func, bitmask, thisArg, partials);
          } else {
            result2 = createHybrid.apply(undefined, newData);
          }
          var setter = data ? baseSetData : setData;
          return setWrapToString(setter(result2, newData), func, bitmask);
        }
        __name(createWrap, "createWrap");
        function customDefaultsAssignIn(objValue, srcValue, key, object) {
          if (objValue === undefined || eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key)) {
            return srcValue;
          }
          return objValue;
        }
        __name(customDefaultsAssignIn, "customDefaultsAssignIn");
        function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
          if (isObject2(objValue) && isObject2(srcValue)) {
            stack.set(srcValue, objValue);
            baseMerge(objValue, srcValue, undefined, customDefaultsMerge, stack);
            stack["delete"](srcValue);
          }
          return objValue;
        }
        __name(customDefaultsMerge, "customDefaultsMerge");
        function customOmitClone(value) {
          return isPlainObject(value) ? undefined : value;
        }
        __name(customOmitClone, "customOmitClone");
        function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
          if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
            return false;
          }
          var arrStacked = stack.get(array);
          var othStacked = stack.get(other);
          if (arrStacked && othStacked) {
            return arrStacked == other && othStacked == array;
          }
          var index = -1, result2 = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : undefined;
          stack.set(array, other);
          stack.set(other, array);
          while (++index < arrLength) {
            var arrValue = array[index], othValue = other[index];
            if (customizer) {
              var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
            }
            if (compared !== undefined) {
              if (compared) {
                continue;
              }
              result2 = false;
              break;
            }
            if (seen) {
              if (!arraySome(other, function(othValue2, othIndex) {
                if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
                  return seen.push(othIndex);
                }
              })) {
                result2 = false;
                break;
              }
            } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              result2 = false;
              break;
            }
          }
          stack["delete"](array);
          stack["delete"](other);
          return result2;
        }
        __name(equalArrays, "equalArrays");
        function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
          switch (tag) {
            case dataViewTag:
              if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
                return false;
              }
              object = object.buffer;
              other = other.buffer;
            case arrayBufferTag:
              if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array2(object), new Uint8Array2(other))) {
                return false;
              }
              return true;
            case boolTag:
            case dateTag:
            case numberTag:
              return eq(+object, +other);
            case errorTag:
              return object.name == other.name && object.message == other.message;
            case regexpTag:
            case stringTag:
              return object == other + "";
            case mapTag:
              var convert = mapToArray;
            case setTag:
              var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
              convert || (convert = setToArray);
              if (object.size != other.size && !isPartial) {
                return false;
              }
              var stacked = stack.get(object);
              if (stacked) {
                return stacked == other;
              }
              bitmask |= COMPARE_UNORDERED_FLAG;
              stack.set(object, other);
              var result2 = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
              stack["delete"](object);
              return result2;
            case symbolTag:
              if (symbolValueOf) {
                return symbolValueOf.call(object) == symbolValueOf.call(other);
              }
          }
          return false;
        }
        __name(equalByTag, "equalByTag");
        function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
          if (objLength != othLength && !isPartial) {
            return false;
          }
          var index = objLength;
          while (index--) {
            var key = objProps[index];
            if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
              return false;
            }
          }
          var objStacked = stack.get(object);
          var othStacked = stack.get(other);
          if (objStacked && othStacked) {
            return objStacked == other && othStacked == object;
          }
          var result2 = true;
          stack.set(object, other);
          stack.set(other, object);
          var skipCtor = isPartial;
          while (++index < objLength) {
            key = objProps[index];
            var objValue = object[key], othValue = other[key];
            if (customizer) {
              var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
            }
            if (!(compared === undefined ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
              result2 = false;
              break;
            }
            skipCtor || (skipCtor = key == "constructor");
          }
          if (result2 && !skipCtor) {
            var objCtor = object.constructor, othCtor = other.constructor;
            if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
              result2 = false;
            }
          }
          stack["delete"](object);
          stack["delete"](other);
          return result2;
        }
        __name(equalObjects, "equalObjects");
        function flatRest(func) {
          return setToString(overRest(func, undefined, flatten), func + "");
        }
        __name(flatRest, "flatRest");
        function getAllKeys(object) {
          return baseGetAllKeys(object, keys, getSymbols);
        }
        __name(getAllKeys, "getAllKeys");
        function getAllKeysIn(object) {
          return baseGetAllKeys(object, keysIn, getSymbolsIn);
        }
        __name(getAllKeysIn, "getAllKeysIn");
        var getData = !metaMap ? noop : function(func) {
          return metaMap.get(func);
        };
        function getFuncName(func) {
          var result2 = func.name + "", array = realNames[result2], length = hasOwnProperty.call(realNames, result2) ? array.length : 0;
          while (length--) {
            var data = array[length], otherFunc = data.func;
            if (otherFunc == null || otherFunc == func) {
              return data.name;
            }
          }
          return result2;
        }
        __name(getFuncName, "getFuncName");
        function getHolder(func) {
          var object = hasOwnProperty.call(lodash, "placeholder") ? lodash : func;
          return object.placeholder;
        }
        __name(getHolder, "getHolder");
        function getIteratee() {
          var result2 = lodash.iteratee || iteratee;
          result2 = result2 === iteratee ? baseIteratee : result2;
          return arguments.length ? result2(arguments[0], arguments[1]) : result2;
        }
        __name(getIteratee, "getIteratee");
        function getMapData(map2, key) {
          var data = map2.__data__;
          return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
        }
        __name(getMapData, "getMapData");
        function getMatchData(object) {
          var result2 = keys(object), length = result2.length;
          while (length--) {
            var key = result2[length], value = object[key];
            result2[length] = [key, value, isStrictComparable(value)];
          }
          return result2;
        }
        __name(getMatchData, "getMatchData");
        function getNative(object, key) {
          var value = getValue(object, key);
          return baseIsNative(value) ? value : undefined;
        }
        __name(getNative, "getNative");
        function getRawTag(value) {
          var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
          try {
            value[symToStringTag] = undefined;
            var unmasked = true;
          } catch (e) {
          }
          var result2 = nativeObjectToString.call(value);
          if (unmasked) {
            if (isOwn) {
              value[symToStringTag] = tag;
            } else {
              delete value[symToStringTag];
            }
          }
          return result2;
        }
        __name(getRawTag, "getRawTag");
        var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
          if (object == null) {
            return [];
          }
          object = Object2(object);
          return arrayFilter(nativeGetSymbols(object), function(symbol) {
            return propertyIsEnumerable.call(object, symbol);
          });
        };
        var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
          var result2 = [];
          while (object) {
            arrayPush(result2, getSymbols(object));
            object = getPrototype(object);
          }
          return result2;
        };
        var getTag = baseGetTag;
        if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
          getTag = /* @__PURE__ */ __name(function(value) {
            var result2 = baseGetTag(value), Ctor = result2 == objectTag ? value.constructor : undefined, ctorString = Ctor ? toSource(Ctor) : "";
            if (ctorString) {
              switch (ctorString) {
                case dataViewCtorString:
                  return dataViewTag;
                case mapCtorString:
                  return mapTag;
                case promiseCtorString:
                  return promiseTag;
                case setCtorString:
                  return setTag;
                case weakMapCtorString:
                  return weakMapTag;
              }
            }
            return result2;
          }, "getTag");
        }
        function getView(start, end, transforms) {
          var index = -1, length = transforms.length;
          while (++index < length) {
            var data = transforms[index], size2 = data.size;
            switch (data.type) {
              case "drop":
                start += size2;
                break;
              case "dropRight":
                end -= size2;
                break;
              case "take":
                end = nativeMin(end, start + size2);
                break;
              case "takeRight":
                start = nativeMax(start, end - size2);
                break;
            }
          }
          return { "start": start, "end": end };
        }
        __name(getView, "getView");
        function getWrapDetails(source) {
          var match = source.match(reWrapDetails);
          return match ? match[1].split(reSplitDetails) : [];
        }
        __name(getWrapDetails, "getWrapDetails");
        function hasPath(object, path, hasFunc) {
          path = castPath(path, object);
          var index = -1, length = path.length, result2 = false;
          while (++index < length) {
            var key = toKey(path[index]);
            if (!(result2 = object != null && hasFunc(object, key))) {
              break;
            }
            object = object[key];
          }
          if (result2 || ++index != length) {
            return result2;
          }
          length = object == null ? 0 : object.length;
          return !!length && isLength(length) && isIndex(key, length) && (isArray2(object) || isArguments(object));
        }
        __name(hasPath, "hasPath");
        function initCloneArray(array) {
          var length = array.length, result2 = new array.constructor(length);
          if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
            result2.index = array.index;
            result2.input = array.input;
          }
          return result2;
        }
        __name(initCloneArray, "initCloneArray");
        function initCloneObject(object) {
          return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
        }
        __name(initCloneObject, "initCloneObject");
        function initCloneByTag(object, tag, isDeep) {
          var Ctor = object.constructor;
          switch (tag) {
            case arrayBufferTag:
              return cloneArrayBuffer(object);
            case boolTag:
            case dateTag:
              return new Ctor(+object);
            case dataViewTag:
              return cloneDataView(object, isDeep);
            case float32Tag:
            case float64Tag:
            case int8Tag:
            case int16Tag:
            case int32Tag:
            case uint8Tag:
            case uint8ClampedTag:
            case uint16Tag:
            case uint32Tag:
              return cloneTypedArray(object, isDeep);
            case mapTag:
              return new Ctor();
            case numberTag:
            case stringTag:
              return new Ctor(object);
            case regexpTag:
              return cloneRegExp(object);
            case setTag:
              return new Ctor();
            case symbolTag:
              return cloneSymbol(object);
          }
        }
        __name(initCloneByTag, "initCloneByTag");
        function insertWrapDetails(source, details) {
          var length = details.length;
          if (!length) {
            return source;
          }
          var lastIndex = length - 1;
          details[lastIndex] = (length > 1 ? "& " : "") + details[lastIndex];
          details = details.join(length > 2 ? ", " : " ");
          return source.replace(reWrapComment, "{\n/* [wrapped with " + details + "] */\n");
        }
        __name(insertWrapDetails, "insertWrapDetails");
        function isFlattenable(value) {
          return isArray2(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
        }
        __name(isFlattenable, "isFlattenable");
        function isIndex(value, length) {
          var type = typeof value;
          length = length == null ? MAX_SAFE_INTEGER : length;
          return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
        }
        __name(isIndex, "isIndex");
        function isIterateeCall(value, index, object) {
          if (!isObject2(object)) {
            return false;
          }
          var type = typeof index;
          if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
            return eq(object[index], value);
          }
          return false;
        }
        __name(isIterateeCall, "isIterateeCall");
        function isKey(value, object) {
          if (isArray2(value)) {
            return false;
          }
          var type = typeof value;
          if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
            return true;
          }
          return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object2(object);
        }
        __name(isKey, "isKey");
        function isKeyable(value) {
          var type = typeof value;
          return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
        }
        __name(isKeyable, "isKeyable");
        function isLaziable(func) {
          var funcName = getFuncName(func), other = lodash[funcName];
          if (typeof other != "function" || !(funcName in LazyWrapper.prototype)) {
            return false;
          }
          if (func === other) {
            return true;
          }
          var data = getData(other);
          return !!data && func === data[0];
        }
        __name(isLaziable, "isLaziable");
        function isMasked(func) {
          return !!maskSrcKey && maskSrcKey in func;
        }
        __name(isMasked, "isMasked");
        var isMaskable = coreJsData ? isFunction2 : stubFalse;
        function isPrototype(value) {
          var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
          return value === proto;
        }
        __name(isPrototype, "isPrototype");
        function isStrictComparable(value) {
          return value === value && !isObject2(value);
        }
        __name(isStrictComparable, "isStrictComparable");
        function matchesStrictComparable(key, srcValue) {
          return function(object) {
            if (object == null) {
              return false;
            }
            return object[key] === srcValue && (srcValue !== undefined || key in Object2(object));
          };
        }
        __name(matchesStrictComparable, "matchesStrictComparable");
        function memoizeCapped(func) {
          var result2 = memoize(func, function(key) {
            if (cache.size === MAX_MEMOIZE_SIZE) {
              cache.clear();
            }
            return key;
          });
          var cache = result2.cache;
          return result2;
        }
        __name(memoizeCapped, "memoizeCapped");
        function mergeData(data, source) {
          var bitmask = data[1], srcBitmask = source[1], newBitmask = bitmask | srcBitmask, isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);
          var isCombo = srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_CURRY_FLAG || srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_REARG_FLAG && data[7].length <= source[8] || srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG) && source[7].length <= source[8] && bitmask == WRAP_CURRY_FLAG;
          if (!(isCommon || isCombo)) {
            return data;
          }
          if (srcBitmask & WRAP_BIND_FLAG) {
            data[2] = source[2];
            newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
          }
          var value = source[3];
          if (value) {
            var partials = data[3];
            data[3] = partials ? composeArgs(partials, value, source[4]) : value;
            data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
          }
          value = source[5];
          if (value) {
            partials = data[5];
            data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
            data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
          }
          value = source[7];
          if (value) {
            data[7] = value;
          }
          if (srcBitmask & WRAP_ARY_FLAG) {
            data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
          }
          if (data[9] == null) {
            data[9] = source[9];
          }
          data[0] = source[0];
          data[1] = newBitmask;
          return data;
        }
        __name(mergeData, "mergeData");
        function nativeKeysIn(object) {
          var result2 = [];
          if (object != null) {
            for (var key in Object2(object)) {
              result2.push(key);
            }
          }
          return result2;
        }
        __name(nativeKeysIn, "nativeKeysIn");
        function objectToString(value) {
          return nativeObjectToString.call(value);
        }
        __name(objectToString, "objectToString");
        function overRest(func, start, transform2) {
          start = nativeMax(start === undefined ? func.length - 1 : start, 0);
          return function() {
            var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array2(length);
            while (++index < length) {
              array[index] = args[start + index];
            }
            index = -1;
            var otherArgs = Array2(start + 1);
            while (++index < start) {
              otherArgs[index] = args[index];
            }
            otherArgs[start] = transform2(array);
            return apply(func, this, otherArgs);
          };
        }
        __name(overRest, "overRest");
        function parent(object, path) {
          return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
        }
        __name(parent, "parent");
        function reorder(array, indexes) {
          var arrLength = array.length, length = nativeMin(indexes.length, arrLength), oldArray = copyArray(array);
          while (length--) {
            var index = indexes[length];
            array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
          }
          return array;
        }
        __name(reorder, "reorder");
        function safeGet(object, key) {
          if (key === "constructor" && typeof object[key] === "function") {
            return;
          }
          if (key == "__proto__") {
            return;
          }
          return object[key];
        }
        __name(safeGet, "safeGet");
        var setData = shortOut(baseSetData);
        var setTimeout2 = ctxSetTimeout || function(func, wait) {
          return root.setTimeout(func, wait);
        };
        var setToString = shortOut(baseSetToString);
        function setWrapToString(wrapper, reference, bitmask) {
          var source = reference + "";
          return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
        }
        __name(setWrapToString, "setWrapToString");
        function shortOut(func) {
          var count = 0, lastCalled = 0;
          return function() {
            var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
            lastCalled = stamp;
            if (remaining > 0) {
              if (++count >= HOT_COUNT) {
                return arguments[0];
              }
            } else {
              count = 0;
            }
            return func.apply(undefined, arguments);
          };
        }
        __name(shortOut, "shortOut");
        function shuffleSelf(array, size2) {
          var index = -1, length = array.length, lastIndex = length - 1;
          size2 = size2 === undefined ? length : size2;
          while (++index < size2) {
            var rand = baseRandom(index, lastIndex), value = array[rand];
            array[rand] = array[index];
            array[index] = value;
          }
          array.length = size2;
          return array;
        }
        __name(shuffleSelf, "shuffleSelf");
        var stringToPath = memoizeCapped(function(string) {
          var result2 = [];
          if (string.charCodeAt(0) === 46) {
            result2.push("");
          }
          string.replace(rePropName, function(match, number, quote, subString) {
            result2.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
          });
          return result2;
        });
        function toKey(value) {
          if (typeof value == "string" || isSymbol(value)) {
            return value;
          }
          var result2 = value + "";
          return result2 == "0" && 1 / value == -INFINITY ? "-0" : result2;
        }
        __name(toKey, "toKey");
        function toSource(func) {
          if (func != null) {
            try {
              return funcToString.call(func);
            } catch (e) {
            }
            try {
              return func + "";
            } catch (e) {
            }
          }
          return "";
        }
        __name(toSource, "toSource");
        function updateWrapDetails(details, bitmask) {
          arrayEach(wrapFlags, function(pair) {
            var value = "_." + pair[0];
            if (bitmask & pair[1] && !arrayIncludes(details, value)) {
              details.push(value);
            }
          });
          return details.sort();
        }
        __name(updateWrapDetails, "updateWrapDetails");
        function wrapperClone(wrapper) {
          if (wrapper instanceof LazyWrapper) {
            return wrapper.clone();
          }
          var result2 = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
          result2.__actions__ = copyArray(wrapper.__actions__);
          result2.__index__ = wrapper.__index__;
          result2.__values__ = wrapper.__values__;
          return result2;
        }
        __name(wrapperClone, "wrapperClone");
        function chunk(array, size2, guard) {
          if (guard ? isIterateeCall(array, size2, guard) : size2 === undefined) {
            size2 = 1;
          } else {
            size2 = nativeMax(toInteger(size2), 0);
          }
          var length = array == null ? 0 : array.length;
          if (!length || size2 < 1) {
            return [];
          }
          var index = 0, resIndex = 0, result2 = Array2(nativeCeil(length / size2));
          while (index < length) {
            result2[resIndex++] = baseSlice(array, index, index += size2);
          }
          return result2;
        }
        __name(chunk, "chunk");
        function compact(array) {
          var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result2 = [];
          while (++index < length) {
            var value = array[index];
            if (value) {
              result2[resIndex++] = value;
            }
          }
          return result2;
        }
        __name(compact, "compact");
        function concat() {
          var length = arguments.length;
          if (!length) {
            return [];
          }
          var args = Array2(length - 1), array = arguments[0], index = length;
          while (index--) {
            args[index - 1] = arguments[index];
          }
          return arrayPush(isArray2(array) ? copyArray(array) : [array], baseFlatten(args, 1));
        }
        __name(concat, "concat");
        var difference = baseRest(function(array, values2) {
          return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true)) : [];
        });
        var differenceBy = baseRest(function(array, values2) {
          var iteratee2 = last(values2);
          if (isArrayLikeObject(iteratee2)) {
            iteratee2 = undefined;
          }
          return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2)) : [];
        });
        var differenceWith = baseRest(function(array, values2) {
          var comparator = last(values2);
          if (isArrayLikeObject(comparator)) {
            comparator = undefined;
          }
          return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), undefined, comparator) : [];
        });
        function drop(array, n, guard) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          n = guard || n === undefined ? 1 : toInteger(n);
          return baseSlice(array, n < 0 ? 0 : n, length);
        }
        __name(drop, "drop");
        function dropRight(array, n, guard) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          n = guard || n === undefined ? 1 : toInteger(n);
          n = length - n;
          return baseSlice(array, 0, n < 0 ? 0 : n);
        }
        __name(dropRight, "dropRight");
        function dropRightWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true, true) : [];
        }
        __name(dropRightWhile, "dropRightWhile");
        function dropWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true) : [];
        }
        __name(dropWhile, "dropWhile");
        function fill(array, value, start, end) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          if (start && typeof start != "number" && isIterateeCall(array, value, start)) {
            start = 0;
            end = length;
          }
          return baseFill(array, value, start, end);
        }
        __name(fill, "fill");
        function findIndex(array, predicate, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index = fromIndex == null ? 0 : toInteger(fromIndex);
          if (index < 0) {
            index = nativeMax(length + index, 0);
          }
          return baseFindIndex(array, getIteratee(predicate, 3), index);
        }
        __name(findIndex, "findIndex");
        function findLastIndex(array, predicate, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index = length - 1;
          if (fromIndex !== undefined) {
            index = toInteger(fromIndex);
            index = fromIndex < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
          }
          return baseFindIndex(array, getIteratee(predicate, 3), index, true);
        }
        __name(findLastIndex, "findLastIndex");
        function flatten(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseFlatten(array, 1) : [];
        }
        __name(flatten, "flatten");
        function flattenDeep(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseFlatten(array, INFINITY) : [];
        }
        __name(flattenDeep, "flattenDeep");
        function flattenDepth(array, depth) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          depth = depth === undefined ? 1 : toInteger(depth);
          return baseFlatten(array, depth);
        }
        __name(flattenDepth, "flattenDepth");
        function fromPairs(pairs) {
          var index = -1, length = pairs == null ? 0 : pairs.length, result2 = {};
          while (++index < length) {
            var pair = pairs[index];
            result2[pair[0]] = pair[1];
          }
          return result2;
        }
        __name(fromPairs, "fromPairs");
        function head(array) {
          return array && array.length ? array[0] : undefined;
        }
        __name(head, "head");
        function indexOf(array, value, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index = fromIndex == null ? 0 : toInteger(fromIndex);
          if (index < 0) {
            index = nativeMax(length + index, 0);
          }
          return baseIndexOf(array, value, index);
        }
        __name(indexOf, "indexOf");
        function initial(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseSlice(array, 0, -1) : [];
        }
        __name(initial, "initial");
        var intersection = baseRest(function(arrays) {
          var mapped = arrayMap(arrays, castArrayLikeObject);
          return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped) : [];
        });
        var intersectionBy = baseRest(function(arrays) {
          var iteratee2 = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
          if (iteratee2 === last(mapped)) {
            iteratee2 = undefined;
          } else {
            mapped.pop();
          }
          return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, getIteratee(iteratee2, 2)) : [];
        });
        var intersectionWith = baseRest(function(arrays) {
          var comparator = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
          comparator = typeof comparator == "function" ? comparator : undefined;
          if (comparator) {
            mapped.pop();
          }
          return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, undefined, comparator) : [];
        });
        function join(array, separator) {
          return array == null ? "" : nativeJoin.call(array, separator);
        }
        __name(join, "join");
        function last(array) {
          var length = array == null ? 0 : array.length;
          return length ? array[length - 1] : undefined;
        }
        __name(last, "last");
        function lastIndexOf(array, value, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index = length;
          if (fromIndex !== undefined) {
            index = toInteger(fromIndex);
            index = index < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
          }
          return value === value ? strictLastIndexOf(array, value, index) : baseFindIndex(array, baseIsNaN, index, true);
        }
        __name(lastIndexOf, "lastIndexOf");
        function nth(array, n) {
          return array && array.length ? baseNth(array, toInteger(n)) : undefined;
        }
        __name(nth, "nth");
        var pull = baseRest(pullAll);
        function pullAll(array, values2) {
          return array && array.length && values2 && values2.length ? basePullAll(array, values2) : array;
        }
        __name(pullAll, "pullAll");
        function pullAllBy(array, values2, iteratee2) {
          return array && array.length && values2 && values2.length ? basePullAll(array, values2, getIteratee(iteratee2, 2)) : array;
        }
        __name(pullAllBy, "pullAllBy");
        function pullAllWith(array, values2, comparator) {
          return array && array.length && values2 && values2.length ? basePullAll(array, values2, undefined, comparator) : array;
        }
        __name(pullAllWith, "pullAllWith");
        var pullAt = flatRest(function(array, indexes) {
          var length = array == null ? 0 : array.length, result2 = baseAt(array, indexes);
          basePullAt(array, arrayMap(indexes, function(index) {
            return isIndex(index, length) ? +index : index;
          }).sort(compareAscending));
          return result2;
        });
        function remove(array, predicate) {
          var result2 = [];
          if (!(array && array.length)) {
            return result2;
          }
          var index = -1, indexes = [], length = array.length;
          predicate = getIteratee(predicate, 3);
          while (++index < length) {
            var value = array[index];
            if (predicate(value, index, array)) {
              result2.push(value);
              indexes.push(index);
            }
          }
          basePullAt(array, indexes);
          return result2;
        }
        __name(remove, "remove");
        function reverse(array) {
          return array == null ? array : nativeReverse.call(array);
        }
        __name(reverse, "reverse");
        function slice(array, start, end) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          if (end && typeof end != "number" && isIterateeCall(array, start, end)) {
            start = 0;
            end = length;
          } else {
            start = start == null ? 0 : toInteger(start);
            end = end === undefined ? length : toInteger(end);
          }
          return baseSlice(array, start, end);
        }
        __name(slice, "slice");
        function sortedIndex(array, value) {
          return baseSortedIndex(array, value);
        }
        __name(sortedIndex, "sortedIndex");
        function sortedIndexBy(array, value, iteratee2) {
          return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2));
        }
        __name(sortedIndexBy, "sortedIndexBy");
        function sortedIndexOf(array, value) {
          var length = array == null ? 0 : array.length;
          if (length) {
            var index = baseSortedIndex(array, value);
            if (index < length && eq(array[index], value)) {
              return index;
            }
          }
          return -1;
        }
        __name(sortedIndexOf, "sortedIndexOf");
        function sortedLastIndex(array, value) {
          return baseSortedIndex(array, value, true);
        }
        __name(sortedLastIndex, "sortedLastIndex");
        function sortedLastIndexBy(array, value, iteratee2) {
          return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2), true);
        }
        __name(sortedLastIndexBy, "sortedLastIndexBy");
        function sortedLastIndexOf(array, value) {
          var length = array == null ? 0 : array.length;
          if (length) {
            var index = baseSortedIndex(array, value, true) - 1;
            if (eq(array[index], value)) {
              return index;
            }
          }
          return -1;
        }
        __name(sortedLastIndexOf, "sortedLastIndexOf");
        function sortedUniq(array) {
          return array && array.length ? baseSortedUniq(array) : [];
        }
        __name(sortedUniq, "sortedUniq");
        function sortedUniqBy(array, iteratee2) {
          return array && array.length ? baseSortedUniq(array, getIteratee(iteratee2, 2)) : [];
        }
        __name(sortedUniqBy, "sortedUniqBy");
        function tail(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseSlice(array, 1, length) : [];
        }
        __name(tail, "tail");
        function take(array, n, guard) {
          if (!(array && array.length)) {
            return [];
          }
          n = guard || n === undefined ? 1 : toInteger(n);
          return baseSlice(array, 0, n < 0 ? 0 : n);
        }
        __name(take, "take");
        function takeRight(array, n, guard) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          n = guard || n === undefined ? 1 : toInteger(n);
          n = length - n;
          return baseSlice(array, n < 0 ? 0 : n, length);
        }
        __name(takeRight, "takeRight");
        function takeRightWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3), false, true) : [];
        }
        __name(takeRightWhile, "takeRightWhile");
        function takeWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3)) : [];
        }
        __name(takeWhile, "takeWhile");
        var union = baseRest(function(arrays) {
          return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
        });
        var unionBy = baseRest(function(arrays) {
          var iteratee2 = last(arrays);
          if (isArrayLikeObject(iteratee2)) {
            iteratee2 = undefined;
          }
          return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2));
        });
        var unionWith = baseRest(function(arrays) {
          var comparator = last(arrays);
          comparator = typeof comparator == "function" ? comparator : undefined;
          return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined, comparator);
        });
        function uniq(array) {
          return array && array.length ? baseUniq(array) : [];
        }
        __name(uniq, "uniq");
        function uniqBy(array, iteratee2) {
          return array && array.length ? baseUniq(array, getIteratee(iteratee2, 2)) : [];
        }
        __name(uniqBy, "uniqBy");
        function uniqWith(array, comparator) {
          comparator = typeof comparator == "function" ? comparator : undefined;
          return array && array.length ? baseUniq(array, undefined, comparator) : [];
        }
        __name(uniqWith, "uniqWith");
        function unzip(array) {
          if (!(array && array.length)) {
            return [];
          }
          var length = 0;
          array = arrayFilter(array, function(group) {
            if (isArrayLikeObject(group)) {
              length = nativeMax(group.length, length);
              return true;
            }
          });
          return baseTimes(length, function(index) {
            return arrayMap(array, baseProperty(index));
          });
        }
        __name(unzip, "unzip");
        function unzipWith(array, iteratee2) {
          if (!(array && array.length)) {
            return [];
          }
          var result2 = unzip(array);
          if (iteratee2 == null) {
            return result2;
          }
          return arrayMap(result2, function(group) {
            return apply(iteratee2, undefined, group);
          });
        }
        __name(unzipWith, "unzipWith");
        var without = baseRest(function(array, values2) {
          return isArrayLikeObject(array) ? baseDifference(array, values2) : [];
        });
        var xor = baseRest(function(arrays) {
          return baseXor(arrayFilter(arrays, isArrayLikeObject));
        });
        var xorBy = baseRest(function(arrays) {
          var iteratee2 = last(arrays);
          if (isArrayLikeObject(iteratee2)) {
            iteratee2 = undefined;
          }
          return baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee2, 2));
        });
        var xorWith = baseRest(function(arrays) {
          var comparator = last(arrays);
          comparator = typeof comparator == "function" ? comparator : undefined;
          return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined, comparator);
        });
        var zip = baseRest(unzip);
        function zipObject(props, values2) {
          return baseZipObject(props || [], values2 || [], assignValue);
        }
        __name(zipObject, "zipObject");
        function zipObjectDeep(props, values2) {
          return baseZipObject(props || [], values2 || [], baseSet);
        }
        __name(zipObjectDeep, "zipObjectDeep");
        var zipWith = baseRest(function(arrays) {
          var length = arrays.length, iteratee2 = length > 1 ? arrays[length - 1] : undefined;
          iteratee2 = typeof iteratee2 == "function" ? (arrays.pop(), iteratee2) : undefined;
          return unzipWith(arrays, iteratee2);
        });
        function chain(value) {
          var result2 = lodash(value);
          result2.__chain__ = true;
          return result2;
        }
        __name(chain, "chain");
        function tap(value, interceptor) {
          interceptor(value);
          return value;
        }
        __name(tap, "tap");
        function thru(value, interceptor) {
          return interceptor(value);
        }
        __name(thru, "thru");
        var wrapperAt = flatRest(function(paths) {
          var length = paths.length, start = length ? paths[0] : 0, value = this.__wrapped__, interceptor = /* @__PURE__ */ __name(function(object) {
            return baseAt(object, paths);
          }, "interceptor");
          if (length > 1 || this.__actions__.length || !(value instanceof LazyWrapper) || !isIndex(start)) {
            return this.thru(interceptor);
          }
          value = value.slice(start, +start + (length ? 1 : 0));
          value.__actions__.push({
            "func": thru,
            "args": [interceptor],
            "thisArg": undefined
          });
          return new LodashWrapper(value, this.__chain__).thru(function(array) {
            if (length && !array.length) {
              array.push(undefined);
            }
            return array;
          });
        });
        function wrapperChain() {
          return chain(this);
        }
        __name(wrapperChain, "wrapperChain");
        function wrapperCommit() {
          return new LodashWrapper(this.value(), this.__chain__);
        }
        __name(wrapperCommit, "wrapperCommit");
        function wrapperNext() {
          if (this.__values__ === undefined) {
            this.__values__ = toArray(this.value());
          }
          var done = this.__index__ >= this.__values__.length, value = done ? undefined : this.__values__[this.__index__++];
          return { "done": done, "value": value };
        }
        __name(wrapperNext, "wrapperNext");
        function wrapperToIterator() {
          return this;
        }
        __name(wrapperToIterator, "wrapperToIterator");
        function wrapperPlant(value) {
          var result2, parent2 = this;
          while (parent2 instanceof baseLodash) {
            var clone2 = wrapperClone(parent2);
            clone2.__index__ = 0;
            clone2.__values__ = undefined;
            if (result2) {
              previous.__wrapped__ = clone2;
            } else {
              result2 = clone2;
            }
            var previous = clone2;
            parent2 = parent2.__wrapped__;
          }
          previous.__wrapped__ = value;
          return result2;
        }
        __name(wrapperPlant, "wrapperPlant");
        function wrapperReverse() {
          var value = this.__wrapped__;
          if (value instanceof LazyWrapper) {
            var wrapped = value;
            if (this.__actions__.length) {
              wrapped = new LazyWrapper(this);
            }
            wrapped = wrapped.reverse();
            wrapped.__actions__.push({
              "func": thru,
              "args": [reverse],
              "thisArg": undefined
            });
            return new LodashWrapper(wrapped, this.__chain__);
          }
          return this.thru(reverse);
        }
        __name(wrapperReverse, "wrapperReverse");
        function wrapperValue() {
          return baseWrapperValue(this.__wrapped__, this.__actions__);
        }
        __name(wrapperValue, "wrapperValue");
        var countBy = createAggregator(function(result2, value, key) {
          if (hasOwnProperty.call(result2, key)) {
            ++result2[key];
          } else {
            baseAssignValue(result2, key, 1);
          }
        });
        function every(collection, predicate, guard) {
          var func = isArray2(collection) ? arrayEvery : baseEvery;
          if (guard && isIterateeCall(collection, predicate, guard)) {
            predicate = undefined;
          }
          return func(collection, getIteratee(predicate, 3));
        }
        __name(every, "every");
        function filter(collection, predicate) {
          var func = isArray2(collection) ? arrayFilter : baseFilter;
          return func(collection, getIteratee(predicate, 3));
        }
        __name(filter, "filter");
        var find = createFind(findIndex);
        var findLast = createFind(findLastIndex);
        function flatMap(collection, iteratee2) {
          return baseFlatten(map(collection, iteratee2), 1);
        }
        __name(flatMap, "flatMap");
        function flatMapDeep(collection, iteratee2) {
          return baseFlatten(map(collection, iteratee2), INFINITY);
        }
        __name(flatMapDeep, "flatMapDeep");
        function flatMapDepth(collection, iteratee2, depth) {
          depth = depth === undefined ? 1 : toInteger(depth);
          return baseFlatten(map(collection, iteratee2), depth);
        }
        __name(flatMapDepth, "flatMapDepth");
        function forEach(collection, iteratee2) {
          var func = isArray2(collection) ? arrayEach : baseEach;
          return func(collection, getIteratee(iteratee2, 3));
        }
        __name(forEach, "forEach");
        function forEachRight(collection, iteratee2) {
          var func = isArray2(collection) ? arrayEachRight : baseEachRight;
          return func(collection, getIteratee(iteratee2, 3));
        }
        __name(forEachRight, "forEachRight");
        var groupBy = createAggregator(function(result2, value, key) {
          if (hasOwnProperty.call(result2, key)) {
            result2[key].push(value);
          } else {
            baseAssignValue(result2, key, [value]);
          }
        });
        function includes(collection, value, fromIndex, guard) {
          collection = isArrayLike(collection) ? collection : values(collection);
          fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;
          var length = collection.length;
          if (fromIndex < 0) {
            fromIndex = nativeMax(length + fromIndex, 0);
          }
          return isString2(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1;
        }
        __name(includes, "includes");
        var invokeMap = baseRest(function(collection, path, args) {
          var index = -1, isFunc = typeof path == "function", result2 = isArrayLike(collection) ? Array2(collection.length) : [];
          baseEach(collection, function(value) {
            result2[++index] = isFunc ? apply(path, value, args) : baseInvoke(value, path, args);
          });
          return result2;
        });
        var keyBy = createAggregator(function(result2, value, key) {
          baseAssignValue(result2, key, value);
        });
        function map(collection, iteratee2) {
          var func = isArray2(collection) ? arrayMap : baseMap;
          return func(collection, getIteratee(iteratee2, 3));
        }
        __name(map, "map");
        function orderBy(collection, iteratees, orders, guard) {
          if (collection == null) {
            return [];
          }
          if (!isArray2(iteratees)) {
            iteratees = iteratees == null ? [] : [iteratees];
          }
          orders = guard ? undefined : orders;
          if (!isArray2(orders)) {
            orders = orders == null ? [] : [orders];
          }
          return baseOrderBy(collection, iteratees, orders);
        }
        __name(orderBy, "orderBy");
        var partition = createAggregator(function(result2, value, key) {
          result2[key ? 0 : 1].push(value);
        }, function() {
          return [[], []];
        });
        function reduce(collection, iteratee2, accumulator) {
          var func = isArray2(collection) ? arrayReduce : baseReduce, initAccum = arguments.length < 3;
          return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEach);
        }
        __name(reduce, "reduce");
        function reduceRight(collection, iteratee2, accumulator) {
          var func = isArray2(collection) ? arrayReduceRight : baseReduce, initAccum = arguments.length < 3;
          return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEachRight);
        }
        __name(reduceRight, "reduceRight");
        function reject(collection, predicate) {
          var func = isArray2(collection) ? arrayFilter : baseFilter;
          return func(collection, negate(getIteratee(predicate, 3)));
        }
        __name(reject, "reject");
        function sample(collection) {
          var func = isArray2(collection) ? arraySample : baseSample;
          return func(collection);
        }
        __name(sample, "sample");
        function sampleSize(collection, n, guard) {
          if (guard ? isIterateeCall(collection, n, guard) : n === undefined) {
            n = 1;
          } else {
            n = toInteger(n);
          }
          var func = isArray2(collection) ? arraySampleSize : baseSampleSize;
          return func(collection, n);
        }
        __name(sampleSize, "sampleSize");
        function shuffle(collection) {
          var func = isArray2(collection) ? arrayShuffle : baseShuffle;
          return func(collection);
        }
        __name(shuffle, "shuffle");
        function size(collection) {
          if (collection == null) {
            return 0;
          }
          if (isArrayLike(collection)) {
            return isString2(collection) ? stringSize(collection) : collection.length;
          }
          var tag = getTag(collection);
          if (tag == mapTag || tag == setTag) {
            return collection.size;
          }
          return baseKeys(collection).length;
        }
        __name(size, "size");
        function some(collection, predicate, guard) {
          var func = isArray2(collection) ? arraySome : baseSome;
          if (guard && isIterateeCall(collection, predicate, guard)) {
            predicate = undefined;
          }
          return func(collection, getIteratee(predicate, 3));
        }
        __name(some, "some");
        var sortBy = baseRest(function(collection, iteratees) {
          if (collection == null) {
            return [];
          }
          var length = iteratees.length;
          if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
            iteratees = [];
          } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
            iteratees = [iteratees[0]];
          }
          return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
        });
        var now = ctxNow || function() {
          return root.Date.now();
        };
        function after(n, func) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          n = toInteger(n);
          return function() {
            if (--n < 1) {
              return func.apply(this, arguments);
            }
          };
        }
        __name(after, "after");
        function ary(func, n, guard) {
          n = guard ? undefined : n;
          n = func && n == null ? func.length : n;
          return createWrap(func, WRAP_ARY_FLAG, undefined, undefined, undefined, undefined, n);
        }
        __name(ary, "ary");
        function before(n, func) {
          var result2;
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          n = toInteger(n);
          return function() {
            if (--n > 0) {
              result2 = func.apply(this, arguments);
            }
            if (n <= 1) {
              func = undefined;
            }
            return result2;
          };
        }
        __name(before, "before");
        var bind = baseRest(function(func, thisArg, partials) {
          var bitmask = WRAP_BIND_FLAG;
          if (partials.length) {
            var holders = replaceHolders(partials, getHolder(bind));
            bitmask |= WRAP_PARTIAL_FLAG;
          }
          return createWrap(func, bitmask, thisArg, partials, holders);
        });
        var bindKey = baseRest(function(object, key, partials) {
          var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
          if (partials.length) {
            var holders = replaceHolders(partials, getHolder(bindKey));
            bitmask |= WRAP_PARTIAL_FLAG;
          }
          return createWrap(key, bitmask, object, partials, holders);
        });
        function curry(func, arity, guard) {
          arity = guard ? undefined : arity;
          var result2 = createWrap(func, WRAP_CURRY_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
          result2.placeholder = curry.placeholder;
          return result2;
        }
        __name(curry, "curry");
        function curryRight(func, arity, guard) {
          arity = guard ? undefined : arity;
          var result2 = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
          result2.placeholder = curryRight.placeholder;
          return result2;
        }
        __name(curryRight, "curryRight");
        function debounce(func, wait, options) {
          var lastArgs, lastThis, maxWait, result2, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          wait = toNumber(wait) || 0;
          if (isObject2(options)) {
            leading = !!options.leading;
            maxing = "maxWait" in options;
            maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
            trailing = "trailing" in options ? !!options.trailing : trailing;
          }
          function invokeFunc(time) {
            var args = lastArgs, thisArg = lastThis;
            lastArgs = lastThis = undefined;
            lastInvokeTime = time;
            result2 = func.apply(thisArg, args);
            return result2;
          }
          __name(invokeFunc, "invokeFunc");
          function leadingEdge(time) {
            lastInvokeTime = time;
            timerId = setTimeout2(timerExpired, wait);
            return leading ? invokeFunc(time) : result2;
          }
          __name(leadingEdge, "leadingEdge");
          function remainingWait(time) {
            var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
            return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
          }
          __name(remainingWait, "remainingWait");
          function shouldInvoke(time) {
            var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
            return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
          }
          __name(shouldInvoke, "shouldInvoke");
          function timerExpired() {
            var time = now();
            if (shouldInvoke(time)) {
              return trailingEdge(time);
            }
            timerId = setTimeout2(timerExpired, remainingWait(time));
          }
          __name(timerExpired, "timerExpired");
          function trailingEdge(time) {
            timerId = undefined;
            if (trailing && lastArgs) {
              return invokeFunc(time);
            }
            lastArgs = lastThis = undefined;
            return result2;
          }
          __name(trailingEdge, "trailingEdge");
          function cancel() {
            if (timerId !== undefined) {
              clearTimeout(timerId);
            }
            lastInvokeTime = 0;
            lastArgs = lastCallTime = lastThis = timerId = undefined;
          }
          __name(cancel, "cancel");
          function flush() {
            return timerId === undefined ? result2 : trailingEdge(now());
          }
          __name(flush, "flush");
          function debounced() {
            var time = now(), isInvoking = shouldInvoke(time);
            lastArgs = arguments;
            lastThis = this;
            lastCallTime = time;
            if (isInvoking) {
              if (timerId === undefined) {
                return leadingEdge(lastCallTime);
              }
              if (maxing) {
                clearTimeout(timerId);
                timerId = setTimeout2(timerExpired, wait);
                return invokeFunc(lastCallTime);
              }
            }
            if (timerId === undefined) {
              timerId = setTimeout2(timerExpired, wait);
            }
            return result2;
          }
          __name(debounced, "debounced");
          debounced.cancel = cancel;
          debounced.flush = flush;
          return debounced;
        }
        __name(debounce, "debounce");
        var defer = baseRest(function(func, args) {
          return baseDelay(func, 1, args);
        });
        var delay = baseRest(function(func, wait, args) {
          return baseDelay(func, toNumber(wait) || 0, args);
        });
        function flip(func) {
          return createWrap(func, WRAP_FLIP_FLAG);
        }
        __name(flip, "flip");
        function memoize(func, resolver) {
          if (typeof func != "function" || resolver != null && typeof resolver != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          var memoized = /* @__PURE__ */ __name(function() {
            var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
            if (cache.has(key)) {
              return cache.get(key);
            }
            var result2 = func.apply(this, args);
            memoized.cache = cache.set(key, result2) || cache;
            return result2;
          }, "memoized");
          memoized.cache = new (memoize.Cache || MapCache)();
          return memoized;
        }
        __name(memoize, "memoize");
        memoize.Cache = MapCache;
        function negate(predicate) {
          if (typeof predicate != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          return function() {
            var args = arguments;
            switch (args.length) {
              case 0:
                return !predicate.call(this);
              case 1:
                return !predicate.call(this, args[0]);
              case 2:
                return !predicate.call(this, args[0], args[1]);
              case 3:
                return !predicate.call(this, args[0], args[1], args[2]);
            }
            return !predicate.apply(this, args);
          };
        }
        __name(negate, "negate");
        function once(func) {
          return before(2, func);
        }
        __name(once, "once");
        var overArgs = castRest(function(func, transforms) {
          transforms = transforms.length == 1 && isArray2(transforms[0]) ? arrayMap(transforms[0], baseUnary(getIteratee())) : arrayMap(baseFlatten(transforms, 1), baseUnary(getIteratee()));
          var funcsLength = transforms.length;
          return baseRest(function(args) {
            var index = -1, length = nativeMin(args.length, funcsLength);
            while (++index < length) {
              args[index] = transforms[index].call(this, args[index]);
            }
            return apply(func, this, args);
          });
        });
        var partial = baseRest(function(func, partials) {
          var holders = replaceHolders(partials, getHolder(partial));
          return createWrap(func, WRAP_PARTIAL_FLAG, undefined, partials, holders);
        });
        var partialRight = baseRest(function(func, partials) {
          var holders = replaceHolders(partials, getHolder(partialRight));
          return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined, partials, holders);
        });
        var rearg = flatRest(function(func, indexes) {
          return createWrap(func, WRAP_REARG_FLAG, undefined, undefined, undefined, indexes);
        });
        function rest(func, start) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          start = start === undefined ? start : toInteger(start);
          return baseRest(func, start);
        }
        __name(rest, "rest");
        function spread(func, start) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          start = start == null ? 0 : nativeMax(toInteger(start), 0);
          return baseRest(function(args) {
            var array = args[start], otherArgs = castSlice(args, 0, start);
            if (array) {
              arrayPush(otherArgs, array);
            }
            return apply(func, this, otherArgs);
          });
        }
        __name(spread, "spread");
        function throttle(func, wait, options) {
          var leading = true, trailing = true;
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          if (isObject2(options)) {
            leading = "leading" in options ? !!options.leading : leading;
            trailing = "trailing" in options ? !!options.trailing : trailing;
          }
          return debounce(func, wait, {
            "leading": leading,
            "maxWait": wait,
            "trailing": trailing
          });
        }
        __name(throttle, "throttle");
        function unary(func) {
          return ary(func, 1);
        }
        __name(unary, "unary");
        function wrap(value, wrapper) {
          return partial(castFunction(wrapper), value);
        }
        __name(wrap, "wrap");
        function castArray() {
          if (!arguments.length) {
            return [];
          }
          var value = arguments[0];
          return isArray2(value) ? value : [value];
        }
        __name(castArray, "castArray");
        function clone(value) {
          return baseClone(value, CLONE_SYMBOLS_FLAG);
        }
        __name(clone, "clone");
        function cloneWith(value, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined;
          return baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
        }
        __name(cloneWith, "cloneWith");
        function cloneDeep(value) {
          return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
        }
        __name(cloneDeep, "cloneDeep");
        function cloneDeepWith(value, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined;
          return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
        }
        __name(cloneDeepWith, "cloneDeepWith");
        function conformsTo(object, source) {
          return source == null || baseConformsTo(object, source, keys(source));
        }
        __name(conformsTo, "conformsTo");
        function eq(value, other) {
          return value === other || value !== value && other !== other;
        }
        __name(eq, "eq");
        var gt = createRelationalOperation(baseGt);
        var gte = createRelationalOperation(function(value, other) {
          return value >= other;
        });
        var isArguments = baseIsArguments(function() {
          return arguments;
        }()) ? baseIsArguments : function(value) {
          return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
        };
        var isArray2 = Array2.isArray;
        var isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer;
        function isArrayLike(value) {
          return value != null && isLength(value.length) && !isFunction2(value);
        }
        __name(isArrayLike, "isArrayLike");
        function isArrayLikeObject(value) {
          return isObjectLike(value) && isArrayLike(value);
        }
        __name(isArrayLikeObject, "isArrayLikeObject");
        function isBoolean(value) {
          return value === true || value === false || isObjectLike(value) && baseGetTag(value) == boolTag;
        }
        __name(isBoolean, "isBoolean");
        var isBuffer = nativeIsBuffer || stubFalse;
        var isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;
        function isElement(value) {
          return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
        }
        __name(isElement, "isElement");
        function isEmpty(value) {
          if (value == null) {
            return true;
          }
          if (isArrayLike(value) && (isArray2(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer(value) || isTypedArray(value) || isArguments(value))) {
            return !value.length;
          }
          var tag = getTag(value);
          if (tag == mapTag || tag == setTag) {
            return !value.size;
          }
          if (isPrototype(value)) {
            return !baseKeys(value).length;
          }
          for (var key in value) {
            if (hasOwnProperty.call(value, key)) {
              return false;
            }
          }
          return true;
        }
        __name(isEmpty, "isEmpty");
        function isEqual(value, other) {
          return baseIsEqual(value, other);
        }
        __name(isEqual, "isEqual");
        function isEqualWith(value, other, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined;
          var result2 = customizer ? customizer(value, other) : undefined;
          return result2 === undefined ? baseIsEqual(value, other, undefined, customizer) : !!result2;
        }
        __name(isEqualWith, "isEqualWith");
        function isError(value) {
          if (!isObjectLike(value)) {
            return false;
          }
          var tag = baseGetTag(value);
          return tag == errorTag || tag == domExcTag || typeof value.message == "string" && typeof value.name == "string" && !isPlainObject(value);
        }
        __name(isError, "isError");
        function isFinite(value) {
          return typeof value == "number" && nativeIsFinite(value);
        }
        __name(isFinite, "isFinite");
        function isFunction2(value) {
          if (!isObject2(value)) {
            return false;
          }
          var tag = baseGetTag(value);
          return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
        }
        __name(isFunction2, "isFunction");
        function isInteger(value) {
          return typeof value == "number" && value == toInteger(value);
        }
        __name(isInteger, "isInteger");
        function isLength(value) {
          return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
        }
        __name(isLength, "isLength");
        function isObject2(value) {
          var type = typeof value;
          return value != null && (type == "object" || type == "function");
        }
        __name(isObject2, "isObject");
        function isObjectLike(value) {
          return value != null && typeof value == "object";
        }
        __name(isObjectLike, "isObjectLike");
        var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
        function isMatch(object, source) {
          return object === source || baseIsMatch(object, source, getMatchData(source));
        }
        __name(isMatch, "isMatch");
        function isMatchWith(object, source, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined;
          return baseIsMatch(object, source, getMatchData(source), customizer);
        }
        __name(isMatchWith, "isMatchWith");
        function isNaN2(value) {
          return isNumber2(value) && value != +value;
        }
        __name(isNaN2, "isNaN");
        function isNative(value) {
          if (isMaskable(value)) {
            throw new Error2(CORE_ERROR_TEXT);
          }
          return baseIsNative(value);
        }
        __name(isNative, "isNative");
        function isNull(value) {
          return value === null;
        }
        __name(isNull, "isNull");
        function isNil(value) {
          return value == null;
        }
        __name(isNil, "isNil");
        function isNumber2(value) {
          return typeof value == "number" || isObjectLike(value) && baseGetTag(value) == numberTag;
        }
        __name(isNumber2, "isNumber");
        function isPlainObject(value) {
          if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
            return false;
          }
          var proto = getPrototype(value);
          if (proto === null) {
            return true;
          }
          var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
          return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
        }
        __name(isPlainObject, "isPlainObject");
        var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;
        function isSafeInteger(value) {
          return isInteger(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER;
        }
        __name(isSafeInteger, "isSafeInteger");
        var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
        function isString2(value) {
          return typeof value == "string" || !isArray2(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
        }
        __name(isString2, "isString");
        function isSymbol(value) {
          return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
        }
        __name(isSymbol, "isSymbol");
        var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
        function isUndefined(value) {
          return value === undefined;
        }
        __name(isUndefined, "isUndefined");
        function isWeakMap(value) {
          return isObjectLike(value) && getTag(value) == weakMapTag;
        }
        __name(isWeakMap, "isWeakMap");
        function isWeakSet(value) {
          return isObjectLike(value) && baseGetTag(value) == weakSetTag;
        }
        __name(isWeakSet, "isWeakSet");
        var lt = createRelationalOperation(baseLt);
        var lte = createRelationalOperation(function(value, other) {
          return value <= other;
        });
        function toArray(value) {
          if (!value) {
            return [];
          }
          if (isArrayLike(value)) {
            return isString2(value) ? stringToArray(value) : copyArray(value);
          }
          if (symIterator && value[symIterator]) {
            return iteratorToArray(value[symIterator]());
          }
          var tag = getTag(value), func = tag == mapTag ? mapToArray : tag == setTag ? setToArray : values;
          return func(value);
        }
        __name(toArray, "toArray");
        function toFinite(value) {
          if (!value) {
            return value === 0 ? value : 0;
          }
          value = toNumber(value);
          if (value === INFINITY || value === -INFINITY) {
            var sign = value < 0 ? -1 : 1;
            return sign * MAX_INTEGER;
          }
          return value === value ? value : 0;
        }
        __name(toFinite, "toFinite");
        function toInteger(value) {
          var result2 = toFinite(value), remainder = result2 % 1;
          return result2 === result2 ? remainder ? result2 - remainder : result2 : 0;
        }
        __name(toInteger, "toInteger");
        function toLength(value) {
          return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
        }
        __name(toLength, "toLength");
        function toNumber(value) {
          if (typeof value == "number") {
            return value;
          }
          if (isSymbol(value)) {
            return NAN;
          }
          if (isObject2(value)) {
            var other = typeof value.valueOf == "function" ? value.valueOf() : value;
            value = isObject2(other) ? other + "" : other;
          }
          if (typeof value != "string") {
            return value === 0 ? value : +value;
          }
          value = baseTrim(value);
          var isBinary = reIsBinary.test(value);
          return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
        }
        __name(toNumber, "toNumber");
        function toPlainObject(value) {
          return copyObject(value, keysIn(value));
        }
        __name(toPlainObject, "toPlainObject");
        function toSafeInteger(value) {
          return value ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER) : value === 0 ? value : 0;
        }
        __name(toSafeInteger, "toSafeInteger");
        function toString(value) {
          return value == null ? "" : baseToString(value);
        }
        __name(toString, "toString");
        var assign = createAssigner(function(object, source) {
          if (isPrototype(source) || isArrayLike(source)) {
            copyObject(source, keys(source), object);
            return;
          }
          for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
              assignValue(object, key, source[key]);
            }
          }
        });
        var assignIn = createAssigner(function(object, source) {
          copyObject(source, keysIn(source), object);
        });
        var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
          copyObject(source, keysIn(source), object, customizer);
        });
        var assignWith = createAssigner(function(object, source, srcIndex, customizer) {
          copyObject(source, keys(source), object, customizer);
        });
        var at = flatRest(baseAt);
        function create(prototype, properties) {
          var result2 = baseCreate(prototype);
          return properties == null ? result2 : baseAssign(result2, properties);
        }
        __name(create, "create");
        var defaults = baseRest(function(object, sources) {
          object = Object2(object);
          var index = -1;
          var length = sources.length;
          var guard = length > 2 ? sources[2] : undefined;
          if (guard && isIterateeCall(sources[0], sources[1], guard)) {
            length = 1;
          }
          while (++index < length) {
            var source = sources[index];
            var props = keysIn(source);
            var propsIndex = -1;
            var propsLength = props.length;
            while (++propsIndex < propsLength) {
              var key = props[propsIndex];
              var value = object[key];
              if (value === undefined || eq(value, objectProto[key]) && !hasOwnProperty.call(object, key)) {
                object[key] = source[key];
              }
            }
          }
          return object;
        });
        var defaultsDeep = baseRest(function(args) {
          args.push(undefined, customDefaultsMerge);
          return apply(mergeWith, undefined, args);
        });
        function findKey(object, predicate) {
          return baseFindKey(object, getIteratee(predicate, 3), baseForOwn);
        }
        __name(findKey, "findKey");
        function findLastKey(object, predicate) {
          return baseFindKey(object, getIteratee(predicate, 3), baseForOwnRight);
        }
        __name(findLastKey, "findLastKey");
        function forIn(object, iteratee2) {
          return object == null ? object : baseFor(object, getIteratee(iteratee2, 3), keysIn);
        }
        __name(forIn, "forIn");
        function forInRight(object, iteratee2) {
          return object == null ? object : baseForRight(object, getIteratee(iteratee2, 3), keysIn);
        }
        __name(forInRight, "forInRight");
        function forOwn(object, iteratee2) {
          return object && baseForOwn(object, getIteratee(iteratee2, 3));
        }
        __name(forOwn, "forOwn");
        function forOwnRight(object, iteratee2) {
          return object && baseForOwnRight(object, getIteratee(iteratee2, 3));
        }
        __name(forOwnRight, "forOwnRight");
        function functions(object) {
          return object == null ? [] : baseFunctions(object, keys(object));
        }
        __name(functions, "functions");
        function functionsIn(object) {
          return object == null ? [] : baseFunctions(object, keysIn(object));
        }
        __name(functionsIn, "functionsIn");
        function get(object, path, defaultValue) {
          var result2 = object == null ? undefined : baseGet(object, path);
          return result2 === undefined ? defaultValue : result2;
        }
        __name(get, "get");
        function has(object, path) {
          return object != null && hasPath(object, path, baseHas);
        }
        __name(has, "has");
        function hasIn(object, path) {
          return object != null && hasPath(object, path, baseHasIn);
        }
        __name(hasIn, "hasIn");
        var invert = createInverter(function(result2, value, key) {
          if (value != null && typeof value.toString != "function") {
            value = nativeObjectToString.call(value);
          }
          result2[value] = key;
        }, constant(identity));
        var invertBy = createInverter(function(result2, value, key) {
          if (value != null && typeof value.toString != "function") {
            value = nativeObjectToString.call(value);
          }
          if (hasOwnProperty.call(result2, value)) {
            result2[value].push(key);
          } else {
            result2[value] = [key];
          }
        }, getIteratee);
        var invoke = baseRest(baseInvoke);
        function keys(object) {
          return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
        }
        __name(keys, "keys");
        function keysIn(object) {
          return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
        }
        __name(keysIn, "keysIn");
        function mapKeys(object, iteratee2) {
          var result2 = {};
          iteratee2 = getIteratee(iteratee2, 3);
          baseForOwn(object, function(value, key, object2) {
            baseAssignValue(result2, iteratee2(value, key, object2), value);
          });
          return result2;
        }
        __name(mapKeys, "mapKeys");
        function mapValues(object, iteratee2) {
          var result2 = {};
          iteratee2 = getIteratee(iteratee2, 3);
          baseForOwn(object, function(value, key, object2) {
            baseAssignValue(result2, key, iteratee2(value, key, object2));
          });
          return result2;
        }
        __name(mapValues, "mapValues");
        var merge = createAssigner(function(object, source, srcIndex) {
          baseMerge(object, source, srcIndex);
        });
        var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
          baseMerge(object, source, srcIndex, customizer);
        });
        var omit = flatRest(function(object, paths) {
          var result2 = {};
          if (object == null) {
            return result2;
          }
          var isDeep = false;
          paths = arrayMap(paths, function(path) {
            path = castPath(path, object);
            isDeep || (isDeep = path.length > 1);
            return path;
          });
          copyObject(object, getAllKeysIn(object), result2);
          if (isDeep) {
            result2 = baseClone(result2, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
          }
          var length = paths.length;
          while (length--) {
            baseUnset(result2, paths[length]);
          }
          return result2;
        });
        function omitBy(object, predicate) {
          return pickBy(object, negate(getIteratee(predicate)));
        }
        __name(omitBy, "omitBy");
        var pick = flatRest(function(object, paths) {
          return object == null ? {} : basePick(object, paths);
        });
        function pickBy(object, predicate) {
          if (object == null) {
            return {};
          }
          var props = arrayMap(getAllKeysIn(object), function(prop) {
            return [prop];
          });
          predicate = getIteratee(predicate);
          return basePickBy(object, props, function(value, path) {
            return predicate(value, path[0]);
          });
        }
        __name(pickBy, "pickBy");
        function result(object, path, defaultValue) {
          path = castPath(path, object);
          var index = -1, length = path.length;
          if (!length) {
            length = 1;
            object = undefined;
          }
          while (++index < length) {
            var value = object == null ? undefined : object[toKey(path[index])];
            if (value === undefined) {
              index = length;
              value = defaultValue;
            }
            object = isFunction2(value) ? value.call(object) : value;
          }
          return object;
        }
        __name(result, "result");
        function set(object, path, value) {
          return object == null ? object : baseSet(object, path, value);
        }
        __name(set, "set");
        function setWith(object, path, value, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined;
          return object == null ? object : baseSet(object, path, value, customizer);
        }
        __name(setWith, "setWith");
        var toPairs = createToPairs(keys);
        var toPairsIn = createToPairs(keysIn);
        function transform(object, iteratee2, accumulator) {
          var isArr = isArray2(object), isArrLike = isArr || isBuffer(object) || isTypedArray(object);
          iteratee2 = getIteratee(iteratee2, 4);
          if (accumulator == null) {
            var Ctor = object && object.constructor;
            if (isArrLike) {
              accumulator = isArr ? new Ctor() : [];
            } else if (isObject2(object)) {
              accumulator = isFunction2(Ctor) ? baseCreate(getPrototype(object)) : {};
            } else {
              accumulator = {};
            }
          }
          (isArrLike ? arrayEach : baseForOwn)(object, function(value, index, object2) {
            return iteratee2(accumulator, value, index, object2);
          });
          return accumulator;
        }
        __name(transform, "transform");
        function unset(object, path) {
          return object == null ? true : baseUnset(object, path);
        }
        __name(unset, "unset");
        function update(object, path, updater) {
          return object == null ? object : baseUpdate(object, path, castFunction(updater));
        }
        __name(update, "update");
        function updateWith(object, path, updater, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined;
          return object == null ? object : baseUpdate(object, path, castFunction(updater), customizer);
        }
        __name(updateWith, "updateWith");
        function values(object) {
          return object == null ? [] : baseValues(object, keys(object));
        }
        __name(values, "values");
        function valuesIn(object) {
          return object == null ? [] : baseValues(object, keysIn(object));
        }
        __name(valuesIn, "valuesIn");
        function clamp(number, lower, upper) {
          if (upper === undefined) {
            upper = lower;
            lower = undefined;
          }
          if (upper !== undefined) {
            upper = toNumber(upper);
            upper = upper === upper ? upper : 0;
          }
          if (lower !== undefined) {
            lower = toNumber(lower);
            lower = lower === lower ? lower : 0;
          }
          return baseClamp(toNumber(number), lower, upper);
        }
        __name(clamp, "clamp");
        function inRange(number, start, end) {
          start = toFinite(start);
          if (end === undefined) {
            end = start;
            start = 0;
          } else {
            end = toFinite(end);
          }
          number = toNumber(number);
          return baseInRange(number, start, end);
        }
        __name(inRange, "inRange");
        function random(lower, upper, floating) {
          if (floating && typeof floating != "boolean" && isIterateeCall(lower, upper, floating)) {
            upper = floating = undefined;
          }
          if (floating === undefined) {
            if (typeof upper == "boolean") {
              floating = upper;
              upper = undefined;
            } else if (typeof lower == "boolean") {
              floating = lower;
              lower = undefined;
            }
          }
          if (lower === undefined && upper === undefined) {
            lower = 0;
            upper = 1;
          } else {
            lower = toFinite(lower);
            if (upper === undefined) {
              upper = lower;
              lower = 0;
            } else {
              upper = toFinite(upper);
            }
          }
          if (lower > upper) {
            var temp = lower;
            lower = upper;
            upper = temp;
          }
          if (floating || lower % 1 || upper % 1) {
            var rand = nativeRandom();
            return nativeMin(lower + rand * (upper - lower + freeParseFloat("1e-" + ((rand + "").length - 1))), upper);
          }
          return baseRandom(lower, upper);
        }
        __name(random, "random");
        var camelCase = createCompounder(function(result2, word, index) {
          word = word.toLowerCase();
          return result2 + (index ? capitalize(word) : word);
        });
        function capitalize(string) {
          return upperFirst(toString(string).toLowerCase());
        }
        __name(capitalize, "capitalize");
        function deburr(string) {
          string = toString(string);
          return string && string.replace(reLatin, deburrLetter).replace(reComboMark, "");
        }
        __name(deburr, "deburr");
        function endsWith(string, target, position) {
          string = toString(string);
          target = baseToString(target);
          var length = string.length;
          position = position === undefined ? length : baseClamp(toInteger(position), 0, length);
          var end = position;
          position -= target.length;
          return position >= 0 && string.slice(position, end) == target;
        }
        __name(endsWith, "endsWith");
        function escape(string) {
          string = toString(string);
          return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
        }
        __name(escape, "escape");
        function escapeRegExp(string) {
          string = toString(string);
          return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar, "\\$&") : string;
        }
        __name(escapeRegExp, "escapeRegExp");
        var kebabCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? "-" : "") + word.toLowerCase();
        });
        var lowerCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? " " : "") + word.toLowerCase();
        });
        var lowerFirst = createCaseFirst("toLowerCase");
        function pad(string, length, chars) {
          string = toString(string);
          length = toInteger(length);
          var strLength = length ? stringSize(string) : 0;
          if (!length || strLength >= length) {
            return string;
          }
          var mid = (length - strLength) / 2;
          return createPadding(nativeFloor(mid), chars) + string + createPadding(nativeCeil(mid), chars);
        }
        __name(pad, "pad");
        function padEnd(string, length, chars) {
          string = toString(string);
          length = toInteger(length);
          var strLength = length ? stringSize(string) : 0;
          return length && strLength < length ? string + createPadding(length - strLength, chars) : string;
        }
        __name(padEnd, "padEnd");
        function padStart(string, length, chars) {
          string = toString(string);
          length = toInteger(length);
          var strLength = length ? stringSize(string) : 0;
          return length && strLength < length ? createPadding(length - strLength, chars) + string : string;
        }
        __name(padStart, "padStart");
        function parseInt2(string, radix, guard) {
          if (guard || radix == null) {
            radix = 0;
          } else if (radix) {
            radix = +radix;
          }
          return nativeParseInt(toString(string).replace(reTrimStart, ""), radix || 0);
        }
        __name(parseInt2, "parseInt");
        function repeat(string, n, guard) {
          if (guard ? isIterateeCall(string, n, guard) : n === undefined) {
            n = 1;
          } else {
            n = toInteger(n);
          }
          return baseRepeat(toString(string), n);
        }
        __name(repeat, "repeat");
        function replace() {
          var args = arguments, string = toString(args[0]);
          return args.length < 3 ? string : string.replace(args[1], args[2]);
        }
        __name(replace, "replace");
        var snakeCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? "_" : "") + word.toLowerCase();
        });
        function split(string, separator, limit) {
          if (limit && typeof limit != "number" && isIterateeCall(string, separator, limit)) {
            separator = limit = undefined;
          }
          limit = limit === undefined ? MAX_ARRAY_LENGTH : limit >>> 0;
          if (!limit) {
            return [];
          }
          string = toString(string);
          if (string && (typeof separator == "string" || separator != null && !isRegExp(separator))) {
            separator = baseToString(separator);
            if (!separator && hasUnicode(string)) {
              return castSlice(stringToArray(string), 0, limit);
            }
          }
          return string.split(separator, limit);
        }
        __name(split, "split");
        var startCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? " " : "") + upperFirst(word);
        });
        function startsWith(string, target, position) {
          string = toString(string);
          position = position == null ? 0 : baseClamp(toInteger(position), 0, string.length);
          target = baseToString(target);
          return string.slice(position, position + target.length) == target;
        }
        __name(startsWith, "startsWith");
        function template(string, options, guard) {
          var settings = lodash.templateSettings;
          if (guard && isIterateeCall(string, options, guard)) {
            options = undefined;
          }
          string = toString(string);
          options = assignInWith({}, options, settings, customDefaultsAssignIn);
          var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn), importsKeys = keys(imports), importsValues = baseValues(imports, importsKeys);
          var isEscaping, isEvaluating, index = 0, interpolate = options.interpolate || reNoMatch, source = "__p += '";
          var reDelimiters = RegExp2(
            (options.escape || reNoMatch).source + "|" + interpolate.source + "|" + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + "|" + (options.evaluate || reNoMatch).source + "|$",
            "g"
          );
          var sourceURL = "//# sourceURL=" + (hasOwnProperty.call(options, "sourceURL") ? (options.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++templateCounter + "]") + "\n";
          string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
            interpolateValue || (interpolateValue = esTemplateValue);
            source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);
            if (escapeValue) {
              isEscaping = true;
              source += "' +\n__e(" + escapeValue + ") +\n'";
            }
            if (evaluateValue) {
              isEvaluating = true;
              source += "';\n" + evaluateValue + ";\n__p += '";
            }
            if (interpolateValue) {
              source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
            }
            index = offset + match.length;
            return match;
          });
          source += "';\n";
          var variable = hasOwnProperty.call(options, "variable") && options.variable;
          if (!variable) {
            source = "with (obj) {\n" + source + "\n}\n";
          } else if (reForbiddenIdentifierChars.test(variable)) {
            throw new Error2(INVALID_TEMPL_VAR_ERROR_TEXT);
          }
          source = (isEvaluating ? source.replace(reEmptyStringLeading, "") : source).replace(reEmptyStringMiddle, "$1").replace(reEmptyStringTrailing, "$1;");
          source = "function(" + (variable || "obj") + ") {\n" + (variable ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (isEscaping ? ", __e = _.escape" : "") + (isEvaluating ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + source + "return __p\n}";
          var result2 = attempt(function() {
            return Function2(importsKeys, sourceURL + "return " + source).apply(undefined, importsValues);
          });
          result2.source = source;
          if (isError(result2)) {
            throw result2;
          }
          return result2;
        }
        __name(template, "template");
        function toLower(value) {
          return toString(value).toLowerCase();
        }
        __name(toLower, "toLower");
        function toUpper(value) {
          return toString(value).toUpperCase();
        }
        __name(toUpper, "toUpper");
        function trim(string, chars, guard) {
          string = toString(string);
          if (string && (guard || chars === undefined)) {
            return baseTrim(string);
          }
          if (!string || !(chars = baseToString(chars))) {
            return string;
          }
          var strSymbols = stringToArray(string), chrSymbols = stringToArray(chars), start = charsStartIndex(strSymbols, chrSymbols), end = charsEndIndex(strSymbols, chrSymbols) + 1;
          return castSlice(strSymbols, start, end).join("");
        }
        __name(trim, "trim");
        function trimEnd(string, chars, guard) {
          string = toString(string);
          if (string && (guard || chars === undefined)) {
            return string.slice(0, trimmedEndIndex(string) + 1);
          }
          if (!string || !(chars = baseToString(chars))) {
            return string;
          }
          var strSymbols = stringToArray(string), end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;
          return castSlice(strSymbols, 0, end).join("");
        }
        __name(trimEnd, "trimEnd");
        function trimStart(string, chars, guard) {
          string = toString(string);
          if (string && (guard || chars === undefined)) {
            return string.replace(reTrimStart, "");
          }
          if (!string || !(chars = baseToString(chars))) {
            return string;
          }
          var strSymbols = stringToArray(string), start = charsStartIndex(strSymbols, stringToArray(chars));
          return castSlice(strSymbols, start).join("");
        }
        __name(trimStart, "trimStart");
        function truncate(string, options) {
          var length = DEFAULT_TRUNC_LENGTH, omission = DEFAULT_TRUNC_OMISSION;
          if (isObject2(options)) {
            var separator = "separator" in options ? options.separator : separator;
            length = "length" in options ? toInteger(options.length) : length;
            omission = "omission" in options ? baseToString(options.omission) : omission;
          }
          string = toString(string);
          var strLength = string.length;
          if (hasUnicode(string)) {
            var strSymbols = stringToArray(string);
            strLength = strSymbols.length;
          }
          if (length >= strLength) {
            return string;
          }
          var end = length - stringSize(omission);
          if (end < 1) {
            return omission;
          }
          var result2 = strSymbols ? castSlice(strSymbols, 0, end).join("") : string.slice(0, end);
          if (separator === undefined) {
            return result2 + omission;
          }
          if (strSymbols) {
            end += result2.length - end;
          }
          if (isRegExp(separator)) {
            if (string.slice(end).search(separator)) {
              var match, substring = result2;
              if (!separator.global) {
                separator = RegExp2(separator.source, toString(reFlags.exec(separator)) + "g");
              }
              separator.lastIndex = 0;
              while (match = separator.exec(substring)) {
                var newEnd = match.index;
              }
              result2 = result2.slice(0, newEnd === undefined ? end : newEnd);
            }
          } else if (string.indexOf(baseToString(separator), end) != end) {
            var index = result2.lastIndexOf(separator);
            if (index > -1) {
              result2 = result2.slice(0, index);
            }
          }
          return result2 + omission;
        }
        __name(truncate, "truncate");
        function unescape(string) {
          string = toString(string);
          return string && reHasEscapedHtml.test(string) ? string.replace(reEscapedHtml, unescapeHtmlChar) : string;
        }
        __name(unescape, "unescape");
        var upperCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? " " : "") + word.toUpperCase();
        });
        var upperFirst = createCaseFirst("toUpperCase");
        function words(string, pattern, guard) {
          string = toString(string);
          pattern = guard ? undefined : pattern;
          if (pattern === undefined) {
            return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
          }
          return string.match(pattern) || [];
        }
        __name(words, "words");
        var attempt = baseRest(function(func, args) {
          try {
            return apply(func, undefined, args);
          } catch (e) {
            return isError(e) ? e : new Error2(e);
          }
        });
        var bindAll = flatRest(function(object, methodNames) {
          arrayEach(methodNames, function(key) {
            key = toKey(key);
            baseAssignValue(object, key, bind(object[key], object));
          });
          return object;
        });
        function cond(pairs) {
          var length = pairs == null ? 0 : pairs.length, toIteratee = getIteratee();
          pairs = !length ? [] : arrayMap(pairs, function(pair) {
            if (typeof pair[1] != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            return [toIteratee(pair[0]), pair[1]];
          });
          return baseRest(function(args) {
            var index = -1;
            while (++index < length) {
              var pair = pairs[index];
              if (apply(pair[0], this, args)) {
                return apply(pair[1], this, args);
              }
            }
          });
        }
        __name(cond, "cond");
        function conforms(source) {
          return baseConforms(baseClone(source, CLONE_DEEP_FLAG));
        }
        __name(conforms, "conforms");
        function constant(value) {
          return function() {
            return value;
          };
        }
        __name(constant, "constant");
        function defaultTo(value, defaultValue) {
          return value == null || value !== value ? defaultValue : value;
        }
        __name(defaultTo, "defaultTo");
        var flow = createFlow();
        var flowRight = createFlow(true);
        function identity(value) {
          return value;
        }
        __name(identity, "identity");
        function iteratee(func) {
          return baseIteratee(typeof func == "function" ? func : baseClone(func, CLONE_DEEP_FLAG));
        }
        __name(iteratee, "iteratee");
        function matches(source) {
          return baseMatches(baseClone(source, CLONE_DEEP_FLAG));
        }
        __name(matches, "matches");
        function matchesProperty(path, srcValue) {
          return baseMatchesProperty(path, baseClone(srcValue, CLONE_DEEP_FLAG));
        }
        __name(matchesProperty, "matchesProperty");
        var method = baseRest(function(path, args) {
          return function(object) {
            return baseInvoke(object, path, args);
          };
        });
        var methodOf = baseRest(function(object, args) {
          return function(path) {
            return baseInvoke(object, path, args);
          };
        });
        function mixin(object, source, options) {
          var props = keys(source), methodNames = baseFunctions(source, props);
          if (options == null && !(isObject2(source) && (methodNames.length || !props.length))) {
            options = source;
            source = object;
            object = this;
            methodNames = baseFunctions(source, keys(source));
          }
          var chain2 = !(isObject2(options) && "chain" in options) || !!options.chain, isFunc = isFunction2(object);
          arrayEach(methodNames, function(methodName) {
            var func = source[methodName];
            object[methodName] = func;
            if (isFunc) {
              object.prototype[methodName] = function() {
                var chainAll = this.__chain__;
                if (chain2 || chainAll) {
                  var result2 = object(this.__wrapped__), actions = result2.__actions__ = copyArray(this.__actions__);
                  actions.push({ "func": func, "args": arguments, "thisArg": object });
                  result2.__chain__ = chainAll;
                  return result2;
                }
                return func.apply(object, arrayPush([this.value()], arguments));
              };
            }
          });
          return object;
        }
        __name(mixin, "mixin");
        function noConflict() {
          if (root._ === this) {
            root._ = oldDash;
          }
          return this;
        }
        __name(noConflict, "noConflict");
        function noop() {
        }
        __name(noop, "noop");
        function nthArg(n) {
          n = toInteger(n);
          return baseRest(function(args) {
            return baseNth(args, n);
          });
        }
        __name(nthArg, "nthArg");
        var over = createOver(arrayMap);
        var overEvery = createOver(arrayEvery);
        var overSome = createOver(arraySome);
        function property(path) {
          return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
        }
        __name(property, "property");
        function propertyOf(object) {
          return function(path) {
            return object == null ? undefined : baseGet(object, path);
          };
        }
        __name(propertyOf, "propertyOf");
        var range = createRange();
        var rangeRight = createRange(true);
        function stubArray() {
          return [];
        }
        __name(stubArray, "stubArray");
        function stubFalse() {
          return false;
        }
        __name(stubFalse, "stubFalse");
        function stubObject() {
          return {};
        }
        __name(stubObject, "stubObject");
        function stubString() {
          return "";
        }
        __name(stubString, "stubString");
        function stubTrue() {
          return true;
        }
        __name(stubTrue, "stubTrue");
        function times(n, iteratee2) {
          n = toInteger(n);
          if (n < 1 || n > MAX_SAFE_INTEGER) {
            return [];
          }
          var index = MAX_ARRAY_LENGTH, length = nativeMin(n, MAX_ARRAY_LENGTH);
          iteratee2 = getIteratee(iteratee2);
          n -= MAX_ARRAY_LENGTH;
          var result2 = baseTimes(length, iteratee2);
          while (++index < n) {
            iteratee2(index);
          }
          return result2;
        }
        __name(times, "times");
        function toPath(value) {
          if (isArray2(value)) {
            return arrayMap(value, toKey);
          }
          return isSymbol(value) ? [value] : copyArray(stringToPath(toString(value)));
        }
        __name(toPath, "toPath");
        function uniqueId(prefix) {
          var id = ++idCounter;
          return toString(prefix) + id;
        }
        __name(uniqueId, "uniqueId");
        var add = createMathOperation(function(augend, addend) {
          return augend + addend;
        }, 0);
        var ceil = createRound("ceil");
        var divide = createMathOperation(function(dividend, divisor) {
          return dividend / divisor;
        }, 1);
        var floor = createRound("floor");
        function max(array) {
          return array && array.length ? baseExtremum(array, identity, baseGt) : undefined;
        }
        __name(max, "max");
        function maxBy(array, iteratee2) {
          return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseGt) : undefined;
        }
        __name(maxBy, "maxBy");
        function mean(array) {
          return baseMean(array, identity);
        }
        __name(mean, "mean");
        function meanBy(array, iteratee2) {
          return baseMean(array, getIteratee(iteratee2, 2));
        }
        __name(meanBy, "meanBy");
        function min(array) {
          return array && array.length ? baseExtremum(array, identity, baseLt) : undefined;
        }
        __name(min, "min");
        function minBy(array, iteratee2) {
          return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseLt) : undefined;
        }
        __name(minBy, "minBy");
        var multiply = createMathOperation(function(multiplier, multiplicand) {
          return multiplier * multiplicand;
        }, 1);
        var round = createRound("round");
        var subtract = createMathOperation(function(minuend, subtrahend) {
          return minuend - subtrahend;
        }, 0);
        function sum(array) {
          return array && array.length ? baseSum(array, identity) : 0;
        }
        __name(sum, "sum");
        function sumBy(array, iteratee2) {
          return array && array.length ? baseSum(array, getIteratee(iteratee2, 2)) : 0;
        }
        __name(sumBy, "sumBy");
        lodash.after = after;
        lodash.ary = ary;
        lodash.assign = assign;
        lodash.assignIn = assignIn;
        lodash.assignInWith = assignInWith;
        lodash.assignWith = assignWith;
        lodash.at = at;
        lodash.before = before;
        lodash.bind = bind;
        lodash.bindAll = bindAll;
        lodash.bindKey = bindKey;
        lodash.castArray = castArray;
        lodash.chain = chain;
        lodash.chunk = chunk;
        lodash.compact = compact;
        lodash.concat = concat;
        lodash.cond = cond;
        lodash.conforms = conforms;
        lodash.constant = constant;
        lodash.countBy = countBy;
        lodash.create = create;
        lodash.curry = curry;
        lodash.curryRight = curryRight;
        lodash.debounce = debounce;
        lodash.defaults = defaults;
        lodash.defaultsDeep = defaultsDeep;
        lodash.defer = defer;
        lodash.delay = delay;
        lodash.difference = difference;
        lodash.differenceBy = differenceBy;
        lodash.differenceWith = differenceWith;
        lodash.drop = drop;
        lodash.dropRight = dropRight;
        lodash.dropRightWhile = dropRightWhile;
        lodash.dropWhile = dropWhile;
        lodash.fill = fill;
        lodash.filter = filter;
        lodash.flatMap = flatMap;
        lodash.flatMapDeep = flatMapDeep;
        lodash.flatMapDepth = flatMapDepth;
        lodash.flatten = flatten;
        lodash.flattenDeep = flattenDeep;
        lodash.flattenDepth = flattenDepth;
        lodash.flip = flip;
        lodash.flow = flow;
        lodash.flowRight = flowRight;
        lodash.fromPairs = fromPairs;
        lodash.functions = functions;
        lodash.functionsIn = functionsIn;
        lodash.groupBy = groupBy;
        lodash.initial = initial;
        lodash.intersection = intersection;
        lodash.intersectionBy = intersectionBy;
        lodash.intersectionWith = intersectionWith;
        lodash.invert = invert;
        lodash.invertBy = invertBy;
        lodash.invokeMap = invokeMap;
        lodash.iteratee = iteratee;
        lodash.keyBy = keyBy;
        lodash.keys = keys;
        lodash.keysIn = keysIn;
        lodash.map = map;
        lodash.mapKeys = mapKeys;
        lodash.mapValues = mapValues;
        lodash.matches = matches;
        lodash.matchesProperty = matchesProperty;
        lodash.memoize = memoize;
        lodash.merge = merge;
        lodash.mergeWith = mergeWith;
        lodash.method = method;
        lodash.methodOf = methodOf;
        lodash.mixin = mixin;
        lodash.negate = negate;
        lodash.nthArg = nthArg;
        lodash.omit = omit;
        lodash.omitBy = omitBy;
        lodash.once = once;
        lodash.orderBy = orderBy;
        lodash.over = over;
        lodash.overArgs = overArgs;
        lodash.overEvery = overEvery;
        lodash.overSome = overSome;
        lodash.partial = partial;
        lodash.partialRight = partialRight;
        lodash.partition = partition;
        lodash.pick = pick;
        lodash.pickBy = pickBy;
        lodash.property = property;
        lodash.propertyOf = propertyOf;
        lodash.pull = pull;
        lodash.pullAll = pullAll;
        lodash.pullAllBy = pullAllBy;
        lodash.pullAllWith = pullAllWith;
        lodash.pullAt = pullAt;
        lodash.range = range;
        lodash.rangeRight = rangeRight;
        lodash.rearg = rearg;
        lodash.reject = reject;
        lodash.remove = remove;
        lodash.rest = rest;
        lodash.reverse = reverse;
        lodash.sampleSize = sampleSize;
        lodash.set = set;
        lodash.setWith = setWith;
        lodash.shuffle = shuffle;
        lodash.slice = slice;
        lodash.sortBy = sortBy;
        lodash.sortedUniq = sortedUniq;
        lodash.sortedUniqBy = sortedUniqBy;
        lodash.split = split;
        lodash.spread = spread;
        lodash.tail = tail;
        lodash.take = take;
        lodash.takeRight = takeRight;
        lodash.takeRightWhile = takeRightWhile;
        lodash.takeWhile = takeWhile;
        lodash.tap = tap;
        lodash.throttle = throttle;
        lodash.thru = thru;
        lodash.toArray = toArray;
        lodash.toPairs = toPairs;
        lodash.toPairsIn = toPairsIn;
        lodash.toPath = toPath;
        lodash.toPlainObject = toPlainObject;
        lodash.transform = transform;
        lodash.unary = unary;
        lodash.union = union;
        lodash.unionBy = unionBy;
        lodash.unionWith = unionWith;
        lodash.uniq = uniq;
        lodash.uniqBy = uniqBy;
        lodash.uniqWith = uniqWith;
        lodash.unset = unset;
        lodash.unzip = unzip;
        lodash.unzipWith = unzipWith;
        lodash.update = update;
        lodash.updateWith = updateWith;
        lodash.values = values;
        lodash.valuesIn = valuesIn;
        lodash.without = without;
        lodash.words = words;
        lodash.wrap = wrap;
        lodash.xor = xor;
        lodash.xorBy = xorBy;
        lodash.xorWith = xorWith;
        lodash.zip = zip;
        lodash.zipObject = zipObject;
        lodash.zipObjectDeep = zipObjectDeep;
        lodash.zipWith = zipWith;
        lodash.entries = toPairs;
        lodash.entriesIn = toPairsIn;
        lodash.extend = assignIn;
        lodash.extendWith = assignInWith;
        mixin(lodash, lodash);
        lodash.add = add;
        lodash.attempt = attempt;
        lodash.camelCase = camelCase;
        lodash.capitalize = capitalize;
        lodash.ceil = ceil;
        lodash.clamp = clamp;
        lodash.clone = clone;
        lodash.cloneDeep = cloneDeep;
        lodash.cloneDeepWith = cloneDeepWith;
        lodash.cloneWith = cloneWith;
        lodash.conformsTo = conformsTo;
        lodash.deburr = deburr;
        lodash.defaultTo = defaultTo;
        lodash.divide = divide;
        lodash.endsWith = endsWith;
        lodash.eq = eq;
        lodash.escape = escape;
        lodash.escapeRegExp = escapeRegExp;
        lodash.every = every;
        lodash.find = find;
        lodash.findIndex = findIndex;
        lodash.findKey = findKey;
        lodash.findLast = findLast;
        lodash.findLastIndex = findLastIndex;
        lodash.findLastKey = findLastKey;
        lodash.floor = floor;
        lodash.forEach = forEach;
        lodash.forEachRight = forEachRight;
        lodash.forIn = forIn;
        lodash.forInRight = forInRight;
        lodash.forOwn = forOwn;
        lodash.forOwnRight = forOwnRight;
        lodash.get = get;
        lodash.gt = gt;
        lodash.gte = gte;
        lodash.has = has;
        lodash.hasIn = hasIn;
        lodash.head = head;
        lodash.identity = identity;
        lodash.includes = includes;
        lodash.indexOf = indexOf;
        lodash.inRange = inRange;
        lodash.invoke = invoke;
        lodash.isArguments = isArguments;
        lodash.isArray = isArray2;
        lodash.isArrayBuffer = isArrayBuffer;
        lodash.isArrayLike = isArrayLike;
        lodash.isArrayLikeObject = isArrayLikeObject;
        lodash.isBoolean = isBoolean;
        lodash.isBuffer = isBuffer;
        lodash.isDate = isDate;
        lodash.isElement = isElement;
        lodash.isEmpty = isEmpty;
        lodash.isEqual = isEqual;
        lodash.isEqualWith = isEqualWith;
        lodash.isError = isError;
        lodash.isFinite = isFinite;
        lodash.isFunction = isFunction2;
        lodash.isInteger = isInteger;
        lodash.isLength = isLength;
        lodash.isMap = isMap;
        lodash.isMatch = isMatch;
        lodash.isMatchWith = isMatchWith;
        lodash.isNaN = isNaN2;
        lodash.isNative = isNative;
        lodash.isNil = isNil;
        lodash.isNull = isNull;
        lodash.isNumber = isNumber2;
        lodash.isObject = isObject2;
        lodash.isObjectLike = isObjectLike;
        lodash.isPlainObject = isPlainObject;
        lodash.isRegExp = isRegExp;
        lodash.isSafeInteger = isSafeInteger;
        lodash.isSet = isSet;
        lodash.isString = isString2;
        lodash.isSymbol = isSymbol;
        lodash.isTypedArray = isTypedArray;
        lodash.isUndefined = isUndefined;
        lodash.isWeakMap = isWeakMap;
        lodash.isWeakSet = isWeakSet;
        lodash.join = join;
        lodash.kebabCase = kebabCase;
        lodash.last = last;
        lodash.lastIndexOf = lastIndexOf;
        lodash.lowerCase = lowerCase;
        lodash.lowerFirst = lowerFirst;
        lodash.lt = lt;
        lodash.lte = lte;
        lodash.max = max;
        lodash.maxBy = maxBy;
        lodash.mean = mean;
        lodash.meanBy = meanBy;
        lodash.min = min;
        lodash.minBy = minBy;
        lodash.stubArray = stubArray;
        lodash.stubFalse = stubFalse;
        lodash.stubObject = stubObject;
        lodash.stubString = stubString;
        lodash.stubTrue = stubTrue;
        lodash.multiply = multiply;
        lodash.nth = nth;
        lodash.noConflict = noConflict;
        lodash.noop = noop;
        lodash.now = now;
        lodash.pad = pad;
        lodash.padEnd = padEnd;
        lodash.padStart = padStart;
        lodash.parseInt = parseInt2;
        lodash.random = random;
        lodash.reduce = reduce;
        lodash.reduceRight = reduceRight;
        lodash.repeat = repeat;
        lodash.replace = replace;
        lodash.result = result;
        lodash.round = round;
        lodash.runInContext = runInContext2;
        lodash.sample = sample;
        lodash.size = size;
        lodash.snakeCase = snakeCase;
        lodash.some = some;
        lodash.sortedIndex = sortedIndex;
        lodash.sortedIndexBy = sortedIndexBy;
        lodash.sortedIndexOf = sortedIndexOf;
        lodash.sortedLastIndex = sortedLastIndex;
        lodash.sortedLastIndexBy = sortedLastIndexBy;
        lodash.sortedLastIndexOf = sortedLastIndexOf;
        lodash.startCase = startCase;
        lodash.startsWith = startsWith;
        lodash.subtract = subtract;
        lodash.sum = sum;
        lodash.sumBy = sumBy;
        lodash.template = template;
        lodash.times = times;
        lodash.toFinite = toFinite;
        lodash.toInteger = toInteger;
        lodash.toLength = toLength;
        lodash.toLower = toLower;
        lodash.toNumber = toNumber;
        lodash.toSafeInteger = toSafeInteger;
        lodash.toString = toString;
        lodash.toUpper = toUpper;
        lodash.trim = trim;
        lodash.trimEnd = trimEnd;
        lodash.trimStart = trimStart;
        lodash.truncate = truncate;
        lodash.unescape = unescape;
        lodash.uniqueId = uniqueId;
        lodash.upperCase = upperCase;
        lodash.upperFirst = upperFirst;
        lodash.each = forEach;
        lodash.eachRight = forEachRight;
        lodash.first = head;
        mixin(lodash, function() {
          var source = {};
          baseForOwn(lodash, function(func, methodName) {
            if (!hasOwnProperty.call(lodash.prototype, methodName)) {
              source[methodName] = func;
            }
          });
          return source;
        }(), { "chain": false });
        lodash.VERSION = VERSION;
        arrayEach(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(methodName) {
          lodash[methodName].placeholder = lodash;
        });
        arrayEach(["drop", "take"], function(methodName, index) {
          LazyWrapper.prototype[methodName] = function(n) {
            n = n === undefined ? 1 : nativeMax(toInteger(n), 0);
            var result2 = this.__filtered__ && !index ? new LazyWrapper(this) : this.clone();
            if (result2.__filtered__) {
              result2.__takeCount__ = nativeMin(n, result2.__takeCount__);
            } else {
              result2.__views__.push({
                "size": nativeMin(n, MAX_ARRAY_LENGTH),
                "type": methodName + (result2.__dir__ < 0 ? "Right" : "")
              });
            }
            return result2;
          };
          LazyWrapper.prototype[methodName + "Right"] = function(n) {
            return this.reverse()[methodName](n).reverse();
          };
        });
        arrayEach(["filter", "map", "takeWhile"], function(methodName, index) {
          var type = index + 1, isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;
          LazyWrapper.prototype[methodName] = function(iteratee2) {
            var result2 = this.clone();
            result2.__iteratees__.push({
              "iteratee": getIteratee(iteratee2, 3),
              "type": type
            });
            result2.__filtered__ = result2.__filtered__ || isFilter;
            return result2;
          };
        });
        arrayEach(["head", "last"], function(methodName, index) {
          var takeName = "take" + (index ? "Right" : "");
          LazyWrapper.prototype[methodName] = function() {
            return this[takeName](1).value()[0];
          };
        });
        arrayEach(["initial", "tail"], function(methodName, index) {
          var dropName = "drop" + (index ? "" : "Right");
          LazyWrapper.prototype[methodName] = function() {
            return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
          };
        });
        LazyWrapper.prototype.compact = function() {
          return this.filter(identity);
        };
        LazyWrapper.prototype.find = function(predicate) {
          return this.filter(predicate).head();
        };
        LazyWrapper.prototype.findLast = function(predicate) {
          return this.reverse().find(predicate);
        };
        LazyWrapper.prototype.invokeMap = baseRest(function(path, args) {
          if (typeof path == "function") {
            return new LazyWrapper(this);
          }
          return this.map(function(value) {
            return baseInvoke(value, path, args);
          });
        });
        LazyWrapper.prototype.reject = function(predicate) {
          return this.filter(negate(getIteratee(predicate)));
        };
        LazyWrapper.prototype.slice = function(start, end) {
          start = toInteger(start);
          var result2 = this;
          if (result2.__filtered__ && (start > 0 || end < 0)) {
            return new LazyWrapper(result2);
          }
          if (start < 0) {
            result2 = result2.takeRight(-start);
          } else if (start) {
            result2 = result2.drop(start);
          }
          if (end !== undefined) {
            end = toInteger(end);
            result2 = end < 0 ? result2.dropRight(-end) : result2.take(end - start);
          }
          return result2;
        };
        LazyWrapper.prototype.takeRightWhile = function(predicate) {
          return this.reverse().takeWhile(predicate).reverse();
        };
        LazyWrapper.prototype.toArray = function() {
          return this.take(MAX_ARRAY_LENGTH);
        };
        baseForOwn(LazyWrapper.prototype, function(func, methodName) {
          var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName), isTaker = /^(?:head|last)$/.test(methodName), lodashFunc = lodash[isTaker ? "take" + (methodName == "last" ? "Right" : "") : methodName], retUnwrapped = isTaker || /^find/.test(methodName);
          if (!lodashFunc) {
            return;
          }
          lodash.prototype[methodName] = function() {
            var value = this.__wrapped__, args = isTaker ? [1] : arguments, isLazy = value instanceof LazyWrapper, iteratee2 = args[0], useLazy = isLazy || isArray2(value);
            var interceptor = /* @__PURE__ */ __name(function(value2) {
              var result3 = lodashFunc.apply(lodash, arrayPush([value2], args));
              return isTaker && chainAll ? result3[0] : result3;
            }, "interceptor");
            if (useLazy && checkIteratee && typeof iteratee2 == "function" && iteratee2.length != 1) {
              isLazy = useLazy = false;
            }
            var chainAll = this.__chain__, isHybrid = !!this.__actions__.length, isUnwrapped = retUnwrapped && !chainAll, onlyLazy = isLazy && !isHybrid;
            if (!retUnwrapped && useLazy) {
              value = onlyLazy ? value : new LazyWrapper(this);
              var result2 = func.apply(value, args);
              result2.__actions__.push({ "func": thru, "args": [interceptor], "thisArg": undefined });
              return new LodashWrapper(result2, chainAll);
            }
            if (isUnwrapped && onlyLazy) {
              return func.apply(this, args);
            }
            result2 = this.thru(interceptor);
            return isUnwrapped ? isTaker ? result2.value()[0] : result2.value() : result2;
          };
        });
        arrayEach(["pop", "push", "shift", "sort", "splice", "unshift"], function(methodName) {
          var func = arrayProto[methodName], chainName = /^(?:push|sort|unshift)$/.test(methodName) ? "tap" : "thru", retUnwrapped = /^(?:pop|shift)$/.test(methodName);
          lodash.prototype[methodName] = function() {
            var args = arguments;
            if (retUnwrapped && !this.__chain__) {
              var value = this.value();
              return func.apply(isArray2(value) ? value : [], args);
            }
            return this[chainName](function(value2) {
              return func.apply(isArray2(value2) ? value2 : [], args);
            });
          };
        });
        baseForOwn(LazyWrapper.prototype, function(func, methodName) {
          var lodashFunc = lodash[methodName];
          if (lodashFunc) {
            var key = lodashFunc.name + "";
            if (!hasOwnProperty.call(realNames, key)) {
              realNames[key] = [];
            }
            realNames[key].push({ "name": methodName, "func": lodashFunc });
          }
        });
        realNames[createHybrid(undefined, WRAP_BIND_KEY_FLAG).name] = [{
          "name": "wrapper",
          "func": undefined
        }];
        LazyWrapper.prototype.clone = lazyClone;
        LazyWrapper.prototype.reverse = lazyReverse;
        LazyWrapper.prototype.value = lazyValue;
        lodash.prototype.at = wrapperAt;
        lodash.prototype.chain = wrapperChain;
        lodash.prototype.commit = wrapperCommit;
        lodash.prototype.next = wrapperNext;
        lodash.prototype.plant = wrapperPlant;
        lodash.prototype.reverse = wrapperReverse;
        lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;
        lodash.prototype.first = lodash.prototype.head;
        if (symIterator) {
          lodash.prototype[symIterator] = wrapperToIterator;
        }
        return lodash;
      }, "runInContext");
      var _2 = runInContext();
      if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
        root._ = _2;
        define(function() {
          return _2;
        });
      } else if (freeModule) {
        (freeModule.exports = _2)._ = _2;
        freeExports._ = _2;
      } else {
        root._ = _2;
      }
    }).call(exports);
  }
});

// src/CollisionObserver.ts
var CollisionObserver_exports = {};
__export(CollisionObserver_exports, {
  CollisionObserver: () => CollisionObserver
});
module.exports = __toCommonJS(CollisionObserver_exports);

// node_modules/@catsums/my/lib/esm/MyHelperFunctions.js
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
function cout(...vars) {
  console.log(...vars);
}
__name(cout, "cout");
__name2(cout, "cout");
function clog(...x) {
  console.log(...x);
}
__name(clog, "clog");
__name2(clog, "clog");
try {
  if (typeof Storage !== "undefined") {
    Storage.prototype.setObject = function(key, value) {
      this.setItem(key, JSON.stringify(value));
    };
    Storage.prototype.getObject = function(key) {
      var value = this.getItem(key);
      return value && JSON.parse(value);
    };
  }
} catch (err) {
  console.debug(err);
}
Array.prototype.midCeil = function() {
  return this[Math.ceil(this.length / 2)];
};
Array.prototype.midFloor = function() {
  return this[Math.floor(this.length / 2)];
};
Array.prototype.midRound = function() {
  return this[Math.round(this.length / 2)];
};
Array.prototype.last = function() {
  return this[this.length - 1];
};
Array.prototype.first = function() {
  return this[0];
};
Array.prototype.removeAt = function(index) {
  return this.splice(index, 1);
};
Array.prototype.removeItem = function(item) {
  let ind = this.indexOf(item);
  return this.splice(ind, 1) > 0;
};
BigInt.prototype.toJSON = function() {
  return this.toString();
};
Number.prototype.mod = function(n) {
  return (this % n + n) % n;
};
function mod(n, m) {
  return (n % m + m) % m;
}
__name(mod, "mod");
__name2(mod, "mod");
function isInfinity(x) {
  return x === -Infinity || x === Infinity;
}
__name(isInfinity, "isInfinity");
__name2(isInfinity, "isInfinity");
function safeDivide(a, b, useNaN = false) {
  let INF = Infinity;
  let res;
  if (a == 0 && b == 0) {
    if (useNaN)
      res = NaN;
    else
      res = 0;
  } else if (a == 0 && isInfinity(b)) {
    res = 0 * 1;
  } else if (isInfinity(a) && b == 0) {
    res = a * 1;
  } else if (isInfinity(a) && isInfinity(b)) {
    if (useNaN)
      res = NaN;
    else if (a == b)
      res = 1;
    else
      res = -1;
  } else if (b == 0) {
    if (useNaN)
      res = NaN;
    res = INF * a;
  } else if (isInfinity(b)) {
    if (useNaN)
      res = NaN;
    res = 0 * a;
  } else {
    res = a / b;
  }
  return res;
}
__name(safeDivide, "safeDivide");
__name2(safeDivide, "safeDivide");
function getAverageFrom(arr) {
  if (!isArray(arr))
    return null;
  if (!arr.length)
    return 0;
  let sum = arr.reduce((_sum, x) => {
    return _sum + x;
  }, 0);
  return sum / arr.length;
}
__name(getAverageFrom, "getAverageFrom");
__name2(getAverageFrom, "getAverageFrom");
function getCSSValueInPixels(str) {
  let num = 0;
  let val = parseFloat(str);
  let unit = str.replace(`${val}`, "").trim();
  switch (unit) {
    case "in":
      num = val * 96;
      break;
    case "cm":
      num = val / 2.54 * 96;
      break;
    case "mm":
      num = val / 100 / 2.54 * 96;
      break;
    case "pt":
      num = val * 72 * 96;
      break;
    case "pc":
      num = val * 12 * 72 * 96;
      break;
    default:
      num = val;
      break;
  }
  return num;
}
__name(getCSSValueInPixels, "getCSSValueInPixels");
__name2(getCSSValueInPixels, "getCSSValueInPixels");
function loadHTMLtoObject(query, url) {
  document.querySelector(query)?.setAttribute("data", url);
}
__name(loadHTMLtoObject, "loadHTMLtoObject");
__name2(loadHTMLtoObject, "loadHTMLtoObject");
function docReady(fn) {
  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}
__name(docReady, "docReady");
__name2(docReady, "docReady");
var footstrapMediaQueries = {
  xs: "0px",
  sm: "576px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
  xxl: "1400px"
};
function forMediaQuery(mediaQuery, matchFunc, unmatchFunc) {
  let match = window.matchMedia(mediaQuery);
  if (match.matches) {
    matchFunc();
  } else {
    unmatchFunc();
  }
}
__name(forMediaQuery, "forMediaQuery");
__name2(forMediaQuery, "forMediaQuery");
function checkBootstrapMedia() {
  let qVals = Object.values(footstrapMediaQueries);
  for (var c = qVals.length - 1; c >= 0; c--) {
    let qVal = qVals[c];
    let match = window.matchMedia(`(max-width: ${qVal})`);
    if (match.matches)
      return qVal;
  }
  return "xs";
}
__name(checkBootstrapMedia, "checkBootstrapMedia");
__name2(checkBootstrapMedia, "checkBootstrapMedia");
function getFormData(query) {
  let formElement;
  if (typeof query === "string")
    formElement = document.querySelector(query);
  else if (query instanceof HTMLFormElement)
    formElement = query;
  else
    return null;
  let formData = new FormData(formElement);
  return formData;
}
__name(getFormData, "getFormData");
__name2(getFormData, "getFormData");
function submitForm(query, callback, url) {
  let formElement = document.querySelector(query);
  let formData = new FormData(formElement);
  let methodType = formElement.getAttribute("method");
  ajax(formData, url, methodType, callback);
}
__name(submitForm, "submitForm");
__name2(submitForm, "submitForm");
var defectForm = /* @__PURE__ */ __name2(function(e) {
  e.preventDefault();
  console.debug("Submit has been defected. Please use JS to override form submit");
}, "defectForm");
function defectAllFormSubmits() {
  let allForms = document.getElementsByTagName("form");
  for (var form of allForms) {
    form.submit = () => {
    };
    form.addEventListener("submit", defectForm);
  }
}
__name(defectAllFormSubmits, "defectAllFormSubmits");
__name2(defectAllFormSubmits, "defectAllFormSubmits");
function formDataToJSON(formData, stringify = false) {
  let object = {};
  formData.forEach((value, key) => {
    if (!Reflect.has(object, key)) {
      object[key] = value;
      return;
    }
    if (!Array.isArray(object[key])) {
      object[key] = [object[key]];
    }
    object[key].push(value);
  });
  if (stringify)
    return JSON.stringify(object);
  return object;
}
__name(formDataToJSON, "formDataToJSON");
__name2(formDataToJSON, "formDataToJSON");
async function getBase64(file) {
  return new Promise((res, rej) => {
    let reader = new FileReader();
    reader.onload = () => {
      return res(reader.result);
    };
    reader.onerror = (err) => {
      rej(err);
    };
    reader.readAsDataURL(file);
  });
}
__name(getBase64, "getBase64");
__name2(getBase64, "getBase64");
function ajax(data, url = "", type = "POST", success = function(x) {
}, fail = function(x) {
}) {
  var req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if (req.readyState == 4) {
      console.debug("STATUS:" + req.status);
      if (req.status >= 200 && req.status < 300) {
        success(req.responseText);
      } else if (req.status >= 300) {
        fail(req.responseText);
      } else {
        console.log(req.responseText);
      }
    } else {
    }
  };
  req.open(type, url, true);
  if (type.toUpperCase() == "POST") {
    req.send(data);
  } else {
    req.send();
  }
}
__name(ajax, "ajax");
__name2(ajax, "ajax");
function ajaxGET(url, callback, failback = function(x) {
}) {
  ajax("", url, "GET", callback, failback);
}
__name(ajaxGET, "ajaxGET");
__name2(ajaxGET, "ajaxGET");
function ajaxPOST(data, url, callback, failback = function(x) {
}) {
  ajax(data, url, "POST", callback, failback);
}
__name(ajaxPOST, "ajaxPOST");
__name2(ajaxPOST, "ajaxPOST");
function getFileBlob(url, type = "", callback = (uurl, bblob, bbytes) => {
}) {
  var oReq = new XMLHttpRequest();
  oReq.open("GET", url, true);
  oReq.responseType = "arraybuffer";
  oReq.onload = function(oEvent) {
    var arrayBuffer = oReq.response;
    var byteArray = new Uint8Array(arrayBuffer);
    var _blob = new Blob([arrayBuffer], { type });
    var _url = URL.createObjectURL(_blob);
    callback(_url, _blob, byteArray);
  };
  oReq.send();
}
__name(getFileBlob, "getFileBlob");
__name2(getFileBlob, "getFileBlob");
function processAjaxData(contentElement, urlPath = "", response = null, state = {}, callback = function() {
}) {
  var newState = Object.assign({}, state);
  if (response) {
    newState.html = response.html;
    newState.pageTitle = response.pageTitle;
    if (contentElement)
      contentElement.innerHTML = response.html;
    document.title = response.pageTitle;
  } else {
    newState.html = "";
    newState.pageTitle = "";
  }
  window.history.pushState(newState, newState.pageTitle, urlPath);
  callback();
}
__name(processAjaxData, "processAjaxData");
__name2(processAjaxData, "processAjaxData");
function setHistoryState(urlPath = "", response, state = {}, callback = function() {
}) {
  var newState = Object.assign({}, state);
  if (response) {
    newState.html = response.html;
    newState.pageTitle = response.pageTitle;
    document.title = response.pageTitle;
  } else {
    newState.html = "";
    newState.pageTitle = "";
  }
  window.history.replaceState(newState, newState.pageTitle, urlPath);
  callback();
}
__name(setHistoryState, "setHistoryState");
__name2(setHistoryState, "setHistoryState");
function pushHistoryState(urlPath = "", response, state = {}, callback = function() {
}) {
  var newState = Object.assign({}, state);
  if (response) {
    newState.html = response.html;
    newState.pageTitle = response.pageTitle;
    document.title = response.pageTitle;
  } else {
    newState.html = "";
    newState.pageTitle = "";
  }
  window.history.pushState(newState, newState.pageTitle, urlPath);
  callback();
}
__name(pushHistoryState, "pushHistoryState");
__name2(pushHistoryState, "pushHistoryState");
function objectToURLParams(obj) {
  var parts = [];
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      parts.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]));
    }
  }
  return "?" + parts.join("&");
}
__name(objectToURLParams, "objectToURLParams");
__name2(objectToURLParams, "objectToURLParams");
function parseURLParams(url, typecast = false, autoParseObjects = false) {
  var queryStart = url.indexOf("?") + 1, queryEnd = url.indexOf("#") + 1 || url.length + 1, query = url.slice(queryStart, queryEnd - 1), pairs = query.replace(/\+/g, " ").split("&"), params = {}, i, n, v, nv, nx;
  if (query === url || query === "")
    return null;
  for (i = 0; i < pairs.length; i++) {
    nv = pairs[i].split("=", 2);
    n = decodeURIComponent(nv[0]);
    v = decodeURIComponent(nv[1]);
    nx = null;
    if (typecast) {
      if (autoParseObjects) {
        if (n.includes("[")) {
          if (n.includes("[]")) {
            n = n.replace("[]", "");
            if (!params.hasOwnProperty(n))
              params[n] = [];
          } else if (n.includes("]")) {
            var nn = n.split("[", 2);
            n = nn[0];
            nx = nn[1].replace("]", "");
            if (!params.hasOwnProperty(n))
              params[n] = {};
            params[n][nx] = null;
          }
        }
      }
      if (!isNaN(v))
        v = Number(v);
      else {
        v = v === "true" || (v === "false" ? false : v);
        v = v === "undefined" ? void 0 : v === "null" ? null : v;
      }
    }
    if (!params.hasOwnProperty(n)) {
      params[n] = v;
    } else {
      if (typeof params[n] !== "object") {
        params[n] = [params[n]];
      } else if (params[n] instanceof Array)
        params[n].push(nv.length === 2 ? v : null);
      else if (nx != null)
        params[n][nx] = v;
    }
  }
  return params;
}
__name(parseURLParams, "parseURLParams");
__name2(parseURLParams, "parseURLParams");
function checkCookie(cname) {
  let cookey = getCookie(cname);
  if (cookey != "")
    return true;
  return false;
}
__name(checkCookie, "checkCookie");
__name2(checkCookie, "checkCookie");
function setCookie(cname, cvalue, exdays = 1) {
  let d = /* @__PURE__ */ new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1e3);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + "; path=/";
}
__name(setCookie, "setCookie");
__name2(setCookie, "setCookie");
function deleteCookie(cname) {
  document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
__name(deleteCookie, "deleteCookie");
__name2(deleteCookie, "deleteCookie");
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
__name(getCookie, "getCookie");
__name2(getCookie, "getCookie");
function isInt(val) {
  return isNumber(val) && Math.trunc(val) === val;
}
__name(isInt, "isInt");
__name2(isInt, "isInt");
function isNumber(val) {
  return !isNaN(Number(val));
}
__name(isNumber, "isNumber");
__name2(isNumber, "isNumber");
function isArray(arr) {
  return typeof arr === "object" && arr instanceof Array;
}
__name(isArray, "isArray");
__name2(isArray, "isArray");
function isString(str) {
  return typeof str === "string";
}
__name(isString, "isString");
__name2(isString, "isString");
function isFunction(func) {
  return typeof func === "function" || func instanceof Function;
}
__name(isFunction, "isFunction");
__name2(isFunction, "isFunction");
function isObject(object) {
  return object != null && typeof object === "object";
}
__name(isObject, "isObject");
__name2(isObject, "isObject");
function isInRange(num, min, max, inclusive = true) {
  if (inclusive)
    return num >= min && num <= max;
  else
    return num > min && num < max;
}
__name(isInRange, "isInRange");
__name2(isInRange, "isInRange");
function isJSON(str) {
  if (!isString(str)) {
    str = JSON.stringify(str);
  }
  let obj = null;
  try {
    obj = JSON.parse(str);
  } catch (e) {
    return false;
  }
  if (isObject(obj))
    return true;
  return false;
}
__name(isJSON, "isJSON");
__name2(isJSON, "isJSON");
function link_is_external(link_element, _location = window.location) {
  return link_element.host !== _location.host;
}
__name(link_is_external, "link_is_external");
__name2(link_is_external, "link_is_external");
function isExternalURLFast(url) {
  var match = url.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/);
  if (typeof match[1] === "string" && match[1].length > 0 && match[1].toLowerCase() !== location.protocol)
    return true;
  if (typeof match[2] === "string" && match[2].length > 0 && match[2].replace(new RegExp(":(" + { "http:": 80, "https:": 443 }[location.protocol] + ")?$"), "") !== location.host)
    return true;
  return false;
}
__name(isExternalURLFast, "isExternalURLFast");
__name2(isExternalURLFast, "isExternalURLFast");
function isExternalURL(url) {
  try {
    if (typeof URL === "undefined") {
    }
  } catch (e) {
    console.debug(e);
  }
  var res = false;
  try {
    res = new URL(url).origin !== location.origin;
  } catch (e) {
    return false;
  }
  return res;
}
__name(isExternalURL, "isExternalURL");
__name2(isExternalURL, "isExternalURL");
function JSONobjectsAreEqual(objA, objB) {
  var jsonA = JSON.stringify(objA);
  var jsonB = JSON.stringify(objB);
  if (jsonA === jsonB)
    return true;
  return false;
}
__name(JSONobjectsAreEqual, "JSONobjectsAreEqual");
__name2(JSONobjectsAreEqual, "JSONobjectsAreEqual");
function randomId(_prefix = "", _suffix = "") {
  return _prefix + Math.random().toString(36).substr(2, 9) + _suffix;
}
__name(randomId, "randomId");
__name2(randomId, "randomId");
function randomID(_prefix = "", _suffix = "", _length = 9) {
  return `${_prefix}${randomString(9)}${_suffix}`;
}
__name(randomID, "randomID");
__name2(randomID, "randomID");
function hexadecimalID(_len = 16, _pow = 4) {
  return Math.floor((1 + Math.random()) * Math.pow(_len, _pow)).toString(16).substring(1);
}
__name(hexadecimalID, "hexadecimalID");
__name2(hexadecimalID, "hexadecimalID");
function randomString(length, chars = null) {
  if (!chars)
    chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  else
    chars = String(chars);
  var result = "";
  for (var i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}
__name(randomString, "randomString");
__name2(randomString, "randomString");
function randomCharFrom(str) {
  return randomString(1, str);
}
__name(randomCharFrom, "randomCharFrom");
__name2(randomCharFrom, "randomCharFrom");
function rndInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
__name(rndInt, "rndInt");
__name2(rndInt, "rndInt");
function randomItemFrom(arr) {
  return arr[rndInt(0, arr.length - 1)];
}
__name(randomItemFrom, "randomItemFrom");
__name2(randomItemFrom, "randomItemFrom");
function safeStringify(obj) {
  let cache = [];
  let s = JSON.stringify(obj, (key, value) => {
    if (isObject(value)) {
      if (cache.includes(value))
        return;
      cache.push(value);
    }
    return value;
  });
  cache = [];
  return s;
}
__name(safeStringify, "safeStringify");
__name2(safeStringify, "safeStringify");
function hash32(str) {
  var hash = 0, i, chr;
  str = JSON.stringify(str);
  if (str.length === 0)
    return String(hash);
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return String(hash);
}
__name(hash32, "hash32");
__name2(hash32, "hash32");
function hash64(str) {
  var h1 = hash32(str);
  return h1 + hash32(h1 + str);
}
__name(hash64, "hash64");
__name2(hash64, "hash64");
function hash128(str) {
  var h1 = hash64(str);
  return h1 + hash64(h1 + str);
}
__name(hash128, "hash128");
__name2(hash128, "hash128");
function stringTrimToLength(_str, _len) {
  if (_len == null)
    _len = String(_str).length;
  _str = String(_str);
  return _str.substring(0, _len);
}
__name(stringTrimToLength, "stringTrimToLength");
__name2(stringTrimToLength, "stringTrimToLength");
function jsonFix(str) {
  str = String(str);
  let regex = /\,(?!\s*?[\{\[\"\'\w])/g;
  var newStr = str.replace(regex, "");
  return newStr;
}
__name(jsonFix, "jsonFix");
__name2(jsonFix, "jsonFix");
function deg2rad(deg) {
  var res = deg * Math.PI / 180;
  return res;
}
__name(deg2rad, "deg2rad");
__name2(deg2rad, "deg2rad");
function rad2deg(rad) {
  var res = rad * 180 / Math.PI;
  return res;
}
__name(rad2deg, "rad2deg");
__name2(rad2deg, "rad2deg");
function stepify(value, step) {
  if (step == 0)
    return value;
  if (step == Infinity)
    return 1;
  return Math.round((value + Number.EPSILON) / step) * step;
}
__name(stepify, "stepify");
__name2(stepify, "stepify");
function splitStringByLength(str, len) {
  var parts = [];
  for (var i = 0; i < str.length; i += len) {
    parts.push(str.substring(i, i + len));
  }
  return parts;
}
__name(splitStringByLength, "splitStringByLength");
__name2(splitStringByLength, "splitStringByLength");
function sanitizeString(str) {
  str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "");
  return str.trim();
}
__name(sanitizeString, "sanitizeString");
__name2(sanitizeString, "sanitizeString");
function validateEmail(email) {
  return String(email).toLowerCase().match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}
__name(validateEmail, "validateEmail");
__name2(validateEmail, "validateEmail");
function mysql_real_escape_string(str) {
  return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function(char) {
    switch (char) {
      case "\0":
        return "\\0";
      case "\b":
        return "\\b";
      case "	":
        return "\\t";
      case "":
        return "\\z";
      case "\n":
        return "\\n";
      case "\r":
        return "\\r";
      case '"':
      case "'":
      case "\\":
      case "%":
        return "\\" + char;
      default:
        return char;
    }
  });
}
__name(mysql_real_escape_string, "mysql_real_escape_string");
__name2(mysql_real_escape_string, "mysql_real_escape_string");
function areSimilar(objA, objB) {
  if (objA == objB)
    return true;
  if (isObject(objA) && isObject(objB)) {
    objA = JSON.parse(JSON.stringify(objA));
    objB = JSON.parse(JSON.stringify(objB));
    for (let k of Object.keys(objA)) {
      if (!(k in objB))
        return false;
      if (!areSimilar(objA[k], objB[k]))
        return false;
    }
    return true;
  } else {
    if (typeof objA === typeof objB) {
      return objA === objB;
    }
  }
  return false;
}
__name(areSimilar, "areSimilar");
__name2(areSimilar, "areSimilar");
function hardPush(arr, item, compareProps) {
  if (!arr || !(arr instanceof Array))
    return false;
  if (!item)
    return false;
  if (!arr.length) {
    arr.push(item);
    return true;
  }
  if (arr.indexOf(item) >= 0)
    return false;
  for (var i = 0; i < arr.length; i++) {
    var arrItem = arr[i];
    if (isObject(arrItem) && isObject(item)) {
      if (compareProps && isArray(compareProps)) {
        for (let prop of compareProps) {
          if (prop in arrItem && areSimilar(arrItem[prop], item[prop])) {
            return false;
          }
        }
      }
    } else if (arrItem === item) {
      return false;
    }
  }
  arr.push(item);
  return true;
}
__name(hardPush, "hardPush");
__name2(hardPush, "hardPush");
function shallowEqual(object1, object2) {
  let keys1 = Object.keys(object1);
  let keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }
  return true;
}
__name(shallowEqual, "shallowEqual");
__name2(shallowEqual, "shallowEqual");
function deepEqual(object1, object2) {
  let keys1 = Object.keys(object1);
  let keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (let key of keys1) {
    let val1 = object1[key];
    let val2 = object2[key];
    let areObjects = isObject(val1) && isObject(val2);
    if (areObjects && !deepEqual(val1, val2) || !areObjects && val1 !== val2) {
      return false;
    }
  }
  return true;
}
__name(deepEqual, "deepEqual");
__name2(deepEqual, "deepEqual");
function findItemIndex(arr, item) {
  if (!arr || !(arr instanceof Array))
    return -1;
  if (!item)
    return -1;
  for (let i = 0; i < arr.length; i++) {
    let arrItem = arr[i];
    if (isObject(arrItem) && isObject(item)) {
      if (shallowEqual(arrItem, item))
        return i;
      else if (arrItem === item)
        return i;
    }
  }
  return -1;
}
__name(findItemIndex, "findItemIndex");
__name2(findItemIndex, "findItemIndex");
function findItem(arr, item) {
  var res = findItemIndex(arr, item);
  if (res < 0)
    return false;
  return true;
}
__name(findItem, "findItem");
__name2(findItem, "findItem");
function arrayRemove(arr, item) {
  var res = arr.indexOf(item);
  if (res < 0)
    return false;
  let x = arr.splice(res, 1);
  return x.length > 0;
}
__name(arrayRemove, "arrayRemove");
__name2(arrayRemove, "arrayRemove");
function findItemObject(arr, item, compareProperties = null) {
  var res = findItemObjectIndex(arr, item, compareProperties);
  if (res < 0)
    return false;
  return true;
}
__name(findItemObject, "findItemObject");
__name2(findItemObject, "findItemObject");
function findItemObjectIndex(arr, item, compareProperties = null) {
  if (!arr || !(arr instanceof Array))
    return -1;
  if (!item)
    return -1;
  if (arr.length == 0) {
    return -1;
  }
  for (var i = 0; i < arr.length; i++) {
    let arrItem = arr[i];
    if (arrItem instanceof Object && item instanceof Object) {
      if (compareProperties && compareProperties instanceof Array) {
        for (let pproperty of compareProperties) {
          if (arrItem.hasOwnProperty(pproperty) && arrItem[pproperty] === item[pproperty])
            return i;
        }
      } else if (shallowEqual(arrItem, item))
        return i;
    } else if (arrItem === item)
      return i;
  }
  return -1;
}
__name(findItemObjectIndex, "findItemObjectIndex");
__name2(findItemObjectIndex, "findItemObjectIndex");
function getObjectFromArray(arr, properties) {
  if (!arr || !(arr instanceof Array))
    return false;
  if (!properties)
    return false;
  if (arr.length == 0) {
    return false;
  }
  var item = properties;
  var compareProperties = Object.keys(item);
  for (var i = 0; i < arr.length; i++) {
    var arrItem = arr[i];
    if (arrItem instanceof Object && item instanceof Object) {
      if (compareProperties && compareProperties instanceof Array) {
        for (let prop of compareProperties) {
          if (arrItem.hasOwnProperty(prop) && arrItem[prop] === item[prop])
            return arrItem;
        }
      } else if (shallowEqual(arrItem, item))
        return arrItem;
    } else if (arrItem === item)
      return arrItem;
  }
  return false;
}
__name(getObjectFromArray, "getObjectFromArray");
__name2(getObjectFromArray, "getObjectFromArray");
function getClosestPathInCircle(arr, _from, _to, bias = 0) {
  if (!(arr instanceof Array)) {
    return [];
  }
  if (_from < 0 || _from >= arr.length) {
    return [];
  }
  if (_to < 0 || _to >= arr.length) {
    return [];
  }
  let iL, iR;
  iL = iR = _from;
  let arrL = [], arrR = [];
  let arrX;
  while (arrL.length < arr.length) {
    let _i = mod(iL, arr.length);
    arrL.push(arr[_i]);
    if (Math.abs(_i) == _to)
      break;
    iL--;
  }
  while (arrR.length < arr.length) {
    let _i = mod(iR, arr.length);
    arrR.push(arr[_i]);
    if (Math.abs(_i) == _to)
      break;
    iR++;
  }
  if (Math.abs(arrL.length) < Math.abs(arrR.length)) {
    arrX = arrL;
  } else if (Math.abs(arrL.length) > Math.abs(arrR.length)) {
    arrX = arrR;
  } else {
    if (bias > 0)
      arrX = arrR;
    else
      arrX = arrL;
  }
  return arrX;
}
__name(getClosestPathInCircle, "getClosestPathInCircle");
__name2(getClosestPathInCircle, "getClosestPathInCircle");
function roundTo(num, step) {
  if (step == 0)
    return num;
  if (isInfinity(step))
    return Infinity;
  let invStep = Math.pow(step, -1);
  let invMiniStep = Math.pow(step / 10, -1);
  let initNum = Math.round(num * invMiniStep) / invMiniStep;
  let init = Math.round(initNum * invStep) / invStep;
  let res = Math.round((init + Number.EPSILON) * invStep) / invStep;
  return res;
}
__name(roundTo, "roundTo");
__name2(roundTo, "roundTo");

// src/ProcessingTarget.ts
var ProcessingTargetEvent = class extends CustomEvent {
  static {
    __name(this, "ProcessingTargetEvent");
  }
  data;
  constructor(a, b) {
    super(a, b);
    this.data = b?.detail || {};
  }
};
var ProcessingTarget = class extends EventTarget {
  static {
    __name(this, "ProcessingTarget");
  }
  FPS = 12;
  targetName = randomID("[ProcessingTarget:", "]");
  connectId = randomID("ConnectID:");
  // onProcessTimer; onPhysicsProcessTimer;
  _connectedObjects = {};
  _signals = {};
  _startSysTime = 0;
  _lastSysTime = 0;
  _currSysTime = 0;
  _deltaSysTime = 0;
  _fixedDeltaSysTime = 0;
  _initDeltaSysTime = 0;
  _elapsedDeltaTime = 0;
  _elapsedFixedDeltaTime = 0;
  _frameTolerance = Math.sqrt(Math.E) / 1e3;
  _logs = false;
  _active = false;
  _isReady = false;
  _animFrame;
  get deltaTime() {
    return this._deltaSysTime;
  }
  get fixedDeltaTime() {
    return this._fixedDeltaSysTime;
  }
  get frameTime() {
    return safeDivide(1, this.FPS);
  }
  get elapsedTime() {
    return this._elapsedDeltaTime;
  }
  get elapsedFixedTime() {
    return this._elapsedFixedDeltaTime;
  }
  constructor(opts = {}) {
    let { FPS = 12, frameTolerance = Math.sqrt(Math.E) / 1e3, active = false } = opts;
    super();
    this.FPS = FPS;
    this._frameTolerance = frameTolerance;
    if (active) {
      this.activate();
    }
  }
  onPreProcess(timestamp) {
    try {
      this._animFrame = requestAnimationFrame(this.onPreProcess.bind(this));
      if (!this._isReady) {
        this._isReady = true;
        this.onReady();
      }
      this._currSysTime = window.performance.now();
      let fixedDelta = safeDivide(1, this.FPS);
      this._deltaSysTime = (this._currSysTime - this._lastSysTime) / 1e3;
      this._initDeltaSysTime += this._deltaSysTime;
      this.onProcess(this.deltaTime);
      this._elapsedDeltaTime += this.deltaTime;
      if (this._initDeltaSysTime >= this.frameTime) {
        this._fixedDeltaSysTime = this._initDeltaSysTime;
        this.onPhysicsProcess(this.fixedDeltaTime);
        this._elapsedFixedDeltaTime += this.fixedDeltaTime;
        this._initDeltaSysTime = 0;
      }
      this._lastSysTime = this._currSysTime;
    } catch (err) {
      console.log(err);
    }
  }
  onReady() {
  }
  onProcess(delta) {
  }
  onPhysicsProcess(delta) {
  }
  createSignal(name, ...vars) {
    let varsObj = {};
    for (let vvar of vars)
      varsObj[vvar] = null;
    let event = new ProcessingTargetEvent(name, {
      detail: varsObj
    });
    event.data = varsObj;
    this._signals[name] = event;
    if (this._logs)
      console.log("Signal " + name + " in " + this.targetName + " created");
  }
  removeSignal(name) {
    if (this._signals.hasOwnProperty(name)) {
      this._signals[name] = null;
      if (this._logs)
        console.log("Signal " + name + " in " + this.targetName + " removed");
    }
  }
  emitSignal(name, vars = {}, elems = Object.values(this._connectedObjects)) {
    let event = null;
    if (!this._signals.hasOwnProperty(name)) {
      let varKeys = Object.keys(vars);
      this.createSignal(name, ...varKeys);
    }
    event = this._signals[name];
    for (let kkey of Object.keys(vars))
      event.data[kkey] = vars[kkey];
    for (let elem of elems) {
      if (elem instanceof EventTarget)
        elem.dispatchEvent(event);
    }
  }
  connectElement(element) {
    let connectId = randomID("ConnectID:");
    if (element && element instanceof EventTarget) {
      let identifier = "";
      if (!("connectId" in element)) {
        if (element instanceof HTMLElement) {
          element.dataset.connectId = connectId;
        }
      }
      if (element instanceof Element) {
        if (String(element.id)) {
          identifier += " id(" + element.id + ")";
        }
        if (String(element.className)) {
          identifier += " class(" + element.className + ")";
        }
        if (String(element.localName)) {
          identifier += " tag(" + element.localName + ")";
        } else {
          identifier += " tagName(" + element.tagName + ")";
        }
      }
      identifier += " (" + connectId + ")";
      if (this._connectedObjects.hasOwnProperty(connectId)) {
        if (this._logs)
          console.log("Element " + identifier + " is already connected");
        return connectId;
      } else {
        this._connectedObjects[connectId] = element;
        if (this._logs)
          console.log("Element " + identifier + " connected!");
        return connectId;
      }
    } else {
      if (this._logs)
        console.log("Element was not valid");
    }
    return null;
  }
  disconnectElement(element) {
    if (element && element instanceof EventTarget) {
      let identifier = "";
      let isDisconnected = false;
      let connectedIds = Object.keys(this._connectedObjects);
      for (let i = 0; i < connectedIds.length; i++) {
        let elem = this._connectedObjects[connectedIds[i]];
        if (elem === element) {
          delete this._connectedObjects[connectedIds[i]];
          isDisconnected = true;
        }
      }
      if (element instanceof Element) {
        if (String(element.id)) {
          identifier += " id: " + element.id;
        }
        if (String(element.className)) {
          identifier += " class: " + element.className;
        }
        if (String(element.localName)) {
          identifier += " tag: " + element.localName;
        } else {
          identifier += " tagName:" + element.tagName;
        }
      }
      if (!isDisconnected) {
        if (this._logs)
          console.log("Element " + element + " was not connected/already disconnected");
        return false;
      } else {
        if (this._logs)
          console.log("Element " + element + " successfully disconnected!");
        return true;
      }
    } else {
      if (this._logs)
        console.log("Element was not valid");
    }
    return false;
  }
  disconnectAllElements() {
    for (let el of Object.values(this._connectedObjects)) {
      this.disconnectElement(el);
    }
  }
  connectElements(elementArr) {
    if (elementArr && elementArr instanceof Array) {
      for (let el of elementArr) {
        this.connectElement(el);
      }
    }
  }
  isConnectedToElement(element) {
    return findItem(Object.values(this._connectedObjects), element);
  }
  logsOn() {
    this._logs = true;
  }
  logsOff() {
    this._logs = false;
  }
  isActive() {
    return this._active;
  }
  activate() {
    if (this.isActive())
      return;
    this._active = true;
    this._lastSysTime = window.performance.now();
    this._startSysTime = this._lastSysTime;
    this._elapsedDeltaTime = 0;
    this._elapsedFixedDeltaTime = 0;
    this.onPreProcess(this._lastSysTime);
  }
  deactivate() {
    if (!this.isActive())
      return;
    this._active = false;
    if (this._animFrame) {
      cancelAnimationFrame(this._animFrame);
      this._animFrame = null;
    }
  }
};

// node_modules/@catsums/vector2/lib/esm/MY.js
var __defProp3 = Object.defineProperty;
var __name3 = /* @__PURE__ */ __name((target, value) => __defProp3(target, "name", { value, configurable: true }), "__name");
function mod2(n, m) {
  return (n % m + m) % m;
}
__name(mod2, "mod");
__name3(mod2, "mod");
function safeDivide2(a, b, useNaN = false) {
  let INF = Infinity;
  let res;
  if (a == 0 && b == 0) {
    if (useNaN)
      res = NaN;
    else
      res = 0;
  } else if (a == 0 && isInfinity2(b)) {
    res = 0 * 1;
  } else if (isInfinity2(a) && b == 0) {
    res = a * 1;
  } else if (isInfinity2(a) && isInfinity2(b)) {
    if (useNaN)
      res = NaN;
    else if (a == b)
      res = 1;
    else
      res = -1;
  } else if (b == 0) {
    if (useNaN)
      res = NaN;
    res = INF * a;
  } else if (isInfinity2(b)) {
    if (useNaN)
      res = NaN;
    res = 0 * a;
  } else {
    res = a / b;
  }
  return res;
}
__name(safeDivide2, "safeDivide");
__name3(safeDivide2, "safeDivide");
function isInfinity2(x) {
  return x === -Infinity || x === Infinity;
}
__name(isInfinity2, "isInfinity");
__name3(isInfinity2, "isInfinity");
function roundTo2(num, step) {
  if (step == 0)
    return num;
  if (isInfinity2(step))
    return Infinity;
  let invStep = Math.pow(step, -1);
  let invMiniStep = Math.pow(step / 10, -1);
  let initNum = Math.round(num * invMiniStep) / invMiniStep;
  let init = Math.round(initNum * invStep) / invStep;
  let res = Math.round((init + Number.EPSILON) * invStep) / invStep;
  return res;
}
__name(roundTo2, "roundTo");
__name3(roundTo2, "roundTo");

// node_modules/@catsums/vector2/lib/esm/Vector2.js
var __defProp4 = Object.defineProperty;
var __name4 = /* @__PURE__ */ __name((target, value) => __defProp4(target, "name", { value, configurable: true }), "__name");
var Vector2 = class _Vector2 {
  static {
    __name(this, "Vector2");
  }
  static {
    __name4(this, "Vector2");
  }
  x;
  y;
  static get ZERO() {
    return new _Vector2(0, 0);
  }
  static get ONE() {
    return new _Vector2(1, 1);
  }
  static get NEG_ONE() {
    return new _Vector2(-1, -1);
  }
  static get INF() {
    return new _Vector2(Infinity, Infinity);
  }
  static get NEG_INF() {
    return new _Vector2(-Infinity, -Infinity);
  }
  static get EPSILON() {
    return new _Vector2(Number.MIN_VALUE, Number.MIN_VALUE);
  }
  static get UP() {
    return new _Vector2(0, -1);
  }
  static get DOWN() {
    return new _Vector2(0, 1);
  }
  static get LEFT() {
    return new _Vector2(-1, 0);
  }
  static get RIGHT() {
    return new _Vector2(1, 0);
  }
  static ADD(v1, v2) {
    return new _Vector2(v1.x + v2.x, v1.y + v2.y);
  }
  add(other) {
    this.x += other.x;
    this.y += other.y;
  }
  static SUBTRACT(v1, v2) {
    return new _Vector2(v1.x - v2.x, v1.y - v2.y);
  }
  subtract(other) {
    this.x -= other.x;
    this.y -= other.y;
  }
  static MULTIPLY(v1, v2) {
    if (typeof v2 === "number")
      v2 = new _Vector2(v2, v2);
    return new _Vector2(v1.x * v2.x, v1.y * v2.y);
  }
  multiply(other) {
    if (typeof other === "number") {
      return this.scaled(other);
    }
    this.x *= other.x;
    this.y *= other.y;
  }
  static DIVIDE(v1, v2) {
    if (typeof v2 === "number")
      v2 = new _Vector2(v2, v2);
    return new _Vector2(v1.x / v2.x, v1.y / v2.y);
  }
  divide(other) {
    if (typeof other === "number") {
      return this.scaled(1 / other);
    }
    this.x /= other.x;
    this.y /= other.y;
  }
  static SCALE(v1, n) {
    return new _Vector2(v1.x * n, v1.y * n);
  }
  scaleBy(n) {
    this.x *= n;
    this.y *= n;
  }
  scaled(n) {
    return new _Vector2(this.x * n, this.y * n);
  }
  static MOD(v1, v2) {
    return new _Vector2(
      mod2(v1.x, v2.x),
      mod2(v1.y, v2.y)
    );
  }
  mod(other) {
    this.x = mod2(this.x, other.x);
    this.y = mod2(this.y, other.y);
  }
  static MODBY(v1, n) {
    return new _Vector2(
      mod2(v1.x, n),
      mod2(v1.y, n)
    );
  }
  modBy(n) {
    this.x = mod2(this.x, n);
    this.y = mod2(this.y, n);
  }
  static DOT(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
  }
  static EQUALS(v1, v2, precision = 0) {
    let p = precision;
    if (v1 === v2)
      return true;
    if (!v1 || !v2)
      return false;
    if (v1?.x === v2?.x && v1?.y === v2?.y)
      return true;
    if (roundTo2(v1.x, p) === roundTo2(v2.x, p) && roundTo2(v1.y, p) === roundTo2(v2.y, p))
      return true;
    if (Math.abs(v1?.x - v2?.x) < Number.EPSILON && Math.abs(v1?.y - v2?.y) < Number.EPSILON)
      return true;
    return false;
  }
  equals(other, precision = 0) {
    return _Vector2.EQUALS(this, other, precision);
  }
  static SortAlgo(a, b) {
    if (a.isGreaterThan(b))
      return 1;
    else if (a.isLesserThan(b))
      return -1;
    return 0;
  }
  static SortAlgoX(a, b) {
    if (a.x > b.x)
      return 1;
    else if (a.x < b.x)
      return -1;
    return 0;
  }
  static SortAlgoY(a, b) {
    if (a.y > b.y)
      return 1;
    else if (a.y < b.y)
      return -1;
    return 0;
  }
  static SortAlgoXY(a, b) {
    if (a.x > b.x)
      return 1;
    else if (a.x < b.x)
      return -1;
    if (a.y > b.y)
      return 1;
    else if (a.y < b.y)
      return -1;
    return 0;
  }
  static SortAlgoYX(a, b) {
    if (a.y > b.y)
      return 1;
    else if (a.y < b.y)
      return -1;
    if (a.x > b.x)
      return 1;
    else if (a.x < b.x)
      return -1;
    return 0;
  }
  static SortAlgoAvg(a, b) {
    let x, y;
    if (a.x > b.x)
      x = 1;
    else if (a.x < b.x)
      x = -1;
    else
      x = 0;
    if (a.y > b.y)
      y = 1;
    else if (a.y < b.y)
      y = -1;
    else
      y = 0;
    let avg = x + y / 2;
    return Math.trunc(avg);
  }
  constructor(...args) {
    if (args[0] instanceof Object) {
      let v = args[0];
      this.x = v?.x || 0;
      this.y = v?.y || 0;
    } else if (args[0] instanceof Array) {
      let arr = args[0];
      this.x = arr[0];
      this.y = arr[1];
    } else if (typeof args[0] === "number" && typeof args[1] === "number") {
      let [x, y] = args;
      this.x = x;
      this.y = y;
    } else {
      this.x = 0;
      this.y = 0;
    }
  }
  abs() {
    var v = new _Vector2(Math.abs(this.x), Math.abs(this.y));
    return v;
  }
  lengthSquared() {
    var llengthSquared = Math.pow(this.x, 2) + Math.pow(this.y, 2);
    return llengthSquared;
  }
  length() {
    return Math.sqrt(this.lengthSquared());
  }
  lerp(other, t) {
    let x = this.x + (other.x - this.x) * t;
    let y = this.y + (other.y - this.y) * t;
    return new _Vector2(x, y);
  }
  sumOfParts() {
    return this.x + this.y;
  }
  ratioed() {
    var sum = this.sumOfParts();
    return new _Vector2(
      safeDivide2(this.x, sum),
      safeDivide2(this.y, sum)
    );
  }
  isNormalised() {
    return Math.abs(this.lengthSquared() - 1) == 0;
  }
  normalized() {
    var llen = this.length();
    return new _Vector2(
      safeDivide2(this.x, llen),
      safeDivide2(this.y, llen)
    );
  }
  normalised() {
    return this.normalized();
  }
  magnitude() {
    return this.length();
  }
  dot(other) {
    return this.x * other.x + this.y * other.y;
  }
  lineTo(other) {
    return _Vector2.SUBTRACT(other, this);
  }
  gradient() {
    return safeDivide2(this.y, this.x);
  }
  angle() {
    return Math.atan2(this.y, this.x);
  }
  angleTo(other) {
    return Math.atan2(this.y, this.x) - Math.atan2(other.y, other.x);
  }
  angleToPoint(other) {
    return this.lineTo(other).angle();
  }
  angleBetween(a, b) {
    let c = new _Vector2(this);
    let top = a.y * (c.x - b.x) + c.y * (b.x - a.x) + b.y * (a.x - c.x);
    let bot = (a.x - c.x) * (c.x - b.x) + (a.y - c.y) * (c.y - b.y);
    let angle = Math.atan2(top, bot);
    return angle;
  }
  distanceSquaredTo(other) {
    return _Vector2.SUBTRACT(other, this).lengthSquared();
  }
  distanceTo(other) {
    return _Vector2.SUBTRACT(other, this).length();
  }
  directionTo(other) {
    return _Vector2.SUBTRACT(other, this).normalized();
  }
  rotateAround(pivot, angle) {
    let pt = new _Vector2(this);
    let ct = new _Vector2(pivot);
    let sinO = Math.sin(angle);
    let cosO = Math.cos(angle);
    pt.x -= ct.x;
    pt.y -= ct.y;
    this.x = pt.x * cosO - pt.y * sinO + ct.x;
    this.y = pt.x * sinO + pt.y * cosO + ct.y;
  }
  rotated(pivot, angle) {
    let pt = new _Vector2(this);
    let ct = new _Vector2(pivot);
    let sinO = Math.sin(angle);
    let cosO = Math.cos(angle);
    pt.x -= ct.x;
    pt.y -= ct.y;
    let _x = pt.x * cosO - pt.y * sinO + ct.x;
    let _y = pt.x * sinO + pt.y * cosO + ct.y;
    return new _Vector2(_x, _y);
  }
  skewed(pivot, skewer) {
    let pt = new _Vector2(this);
    let ct = new _Vector2(pivot);
    pt.x -= ct.x;
    pt.y -= ct.y;
    let _x = pt.x + pt.y * skewer.x + ct.x;
    let _y = pt.x * skewer.y + pt.y + ct.y;
    return new _Vector2(_x, _y);
  }
  skew(pivot, skewer) {
    let pt = new _Vector2(this);
    let ct = new _Vector2(pivot);
    pt.x -= ct.x;
    pt.y -= ct.y;
    this.x = pt.x + pt.y * skewer.x + ct.x;
    this.y = pt.x * skewer.y + pt.y + ct.y;
  }
  static INVERSE(v1) {
    let ix = safeDivide2(1, v1.x);
    let iy = safeDivide2(1, v1.y);
    return new _Vector2(ix, iy);
  }
  inverse() {
    let ix = safeDivide2(1, this.x);
    let iy = safeDivide2(1, this.y);
    return new _Vector2(ix, iy);
  }
  static FLIPPED(v1) {
    return new _Vector2(v1.y, v1.x);
  }
  flipped() {
    return new _Vector2(this.y, this.x);
  }
  static MIDPOINT(arr) {
    if (arr instanceof Array == false) {
      arr = [];
    }
    let _x = 0, _y = 0;
    for (let v of arr) {
      _x += v.x;
      _y += v.y;
    }
    let x = safeDivide2(_x, arr.length);
    let y = safeDivide2(_y, arr.length);
    return new _Vector2(x, y);
  }
  midPoint(other) {
    let arr = [];
    if (other instanceof Array) {
      arr = arr.concat(other);
    } else {
      arr.push(other);
    }
    let _x = 0, _y = 0;
    for (let v of arr) {
      _x += v.x;
      _y += v.y;
    }
    _x += this.x;
    _y += this.y;
    let x = safeDivide2(_x, arr.length + 1);
    let y = safeDivide2(_y, arr.length + 1);
    return new _Vector2(x, y);
  }
  floor() {
    return new _Vector2(Math.floor(this.x), Math.floor(this.y));
  }
  ceil() {
    return new _Vector2(Math.ceil(this.x), Math.ceil(this.y));
  }
  reflect(other) {
    return _Vector2.SUBTRACT(this, _Vector2.SCALE(other, 2 * _Vector2.DOT(this, other)));
  }
  project(norm) {
    let normLengthSquared = Math.pow(this.x, 2) + Math.pow(this.y, 2);
    return _Vector2.SCALE(norm, this.dot(norm) / normLengthSquared);
  }
  slide(other) {
    return _Vector2.SUBTRACT(this, _Vector2.SCALE(other, this.dot(other)));
  }
  bounce(other) {
    return _Vector2.NEG(this.reflect(other));
  }
  closestPoint(arr, exclusive = false) {
    if (!arr?.length)
      return null;
    let pt = null;
    let dist = Infinity;
    for (let v of arr) {
      if (exclusive && _Vector2.EQUALS(v, this)) {
        continue;
      }
      let _dist = Math.abs(this.distanceTo(v));
      if (_dist < dist) {
        pt = v;
        dist = _dist;
      }
    }
    return pt;
  }
  sortPointsByClosest(points) {
    if (!points?.length)
      return null;
    let arr = points.slice();
    let len = arr.length;
    let newArr = [];
    for (let i = 0; i < len; i++) {
      let pt = this.closestPoint(arr);
      if (!pt)
        continue;
      newArr.push(pt);
      let index = arr.indexOf(pt);
      arr.splice(index, 1);
      i--;
    }
    return newArr;
  }
  toString() {
    let out = "( " + String(this.x) + " , " + String(this.y) + " )";
    return out;
  }
  asObject() {
    return { x: this.x, y: this.y };
  }
  asArray() {
    return [this.x, this.y];
  }
  toJSON() {
    return this.asObject();
  }
  isGreaterThan(other) {
    return this.lengthSquared() > other.lengthSquared();
  }
  isLesserThan(other) {
    return this.lengthSquared() < other.lengthSquared();
  }
  static NEG(v1) {
    return new _Vector2(-v1.x, -v1.y);
  }
  neg() {
    return new _Vector2(-this.x, -this.y);
  }
  static quadraticBezier(points, t) {
    let qPoints = [];
    for (let i = 0; i < points.length - 1; i++) {
      let pA = new _Vector2(points[i]);
      let pB = new _Vector2(points[i + 1]);
      let pt = pA.lerp(pB, t);
      qPoints.push(pt);
    }
    if (qPoints.length < 2) {
      return qPoints[0];
    }
    return _Vector2.quadraticBezier(qPoints, t);
  }
  static quadraticBezierPoints(points, inc) {
    let qPoints = [];
    if (points instanceof Array && typeof inc === "number" && inc > 0) {
      let t = 0;
      let last = false;
      while (t <= 1) {
        qPoints.push(_Vector2.quadraticBezier(points, t));
        t += inc;
        if (t > 1 && !last) {
          t = 1;
          last = true;
        }
      }
    }
    return qPoints;
  }
  static getSVGAngle(_u, _v) {
    let u = new _Vector2(_u);
    let v = new _Vector2(_v);
    let dot = _Vector2.DOT(u, v);
    let len = u.length() * v.length();
    var clamp = /* @__PURE__ */ __name4(function(n, min, max) {
      max = Math.max(min, max);
      min = Math.min(min, max);
      return Math.min(Math.max(n, min), max);
    }, "clamp");
    let ang = Math.acos(clamp(dot / len, -1, 1));
    if (u.x * v.y - u.y * v.x < 0) {
      ang = -ang;
    }
    return ang;
  }
};

// node_modules/@catsums/vector2/lib/esm/Vector2Line.js
var __defProp5 = Object.defineProperty;
var __name5 = /* @__PURE__ */ __name((target, value) => __defProp5(target, "name", { value, configurable: true }), "__name");
var Vector2Line = class _Vector2Line {
  static {
    __name(this, "Vector2Line");
  }
  static {
    __name5(this, "Vector2Line");
  }
  a = 1;
  b = -1;
  c = 0;
  // f //x intercept
  // e //y intercept
  // m //gradient
  static get Y_AXIS() {
    return new _Vector2Line(1, 0, 0);
  }
  static get X_AXIS() {
    return new _Vector2Line(0, -1, 0);
  }
  static get ONE() {
    return new _Vector2Line(1, -1, 0);
  }
  static get NEG_ONE() {
    return new _Vector2Line(1, 1, 0);
  }
  get gradient() {
    return safeDivide2(-this.a, this.b);
  }
  get m() {
    return this.gradient;
  }
  get xIntercept() {
    return safeDivide2(-this.c, this.a);
  }
  get f() {
    return this.xIntercept;
  }
  get yIntercept() {
    return safeDivide2(-this.c, this.b);
  }
  get e() {
    return this.yIntercept;
  }
  constructor(...args) {
    if (args[0] instanceof _Vector2Line) {
      let obj = args[0];
      this.a = obj.a;
      this.b = obj.b;
      this.c = obj.c;
    } else if (args[0] instanceof Object && args[1] instanceof Object) {
      let x = args[0], y = args[1];
      let a, b, c;
      let v1 = new Vector2(
        x.x || x[0] || 0,
        x.y || x[1] || 0
      );
      let v2 = new Vector2(
        y.x || y[0] || 0,
        y.y || y[1] || 0
      );
      let m = Vector2.SUBTRACT(v2, v1).gradient();
      let e, f;
      if (isInfinity2(m)) {
        c = -(v1.x || v2.x);
        b = 0;
        a = 1;
      } else if (m == 0) {
        a = 0;
        b = -1;
        c = v1.y || v2.y;
      } else {
        e = v1.y - m * v1.x;
        f = safeDivide2(-e, m);
        c = -(f * m);
        b = safeDivide2(-c, e) || 1;
        a = -(b * m);
      }
      this.a = a;
      this.b = b;
      this.c = c;
    } else if (args[0] instanceof Object) {
      let x = args[0];
      if ("a" in x && "b" in x && "c" in x) {
        let obj = x;
        this.a = obj.a;
        this.b = obj.b;
        this.c = obj.c;
      } else if (("gradient" in x || "m" in x) && ("e" in x || "c" in x || "yIntercept" in x)) {
        let obj = x;
        let a, b, c;
        let m = obj.gradient || obj.m || 0;
        let e = obj.e || obj.c || obj.yIntercept || 0;
        let f;
        if ("f" in obj || "xIntercept" in obj) {
          f = obj.f || obj.xIntercept || 0;
          c = -(f * m);
        } else {
          c = 1;
          f = safeDivide2(-c, m);
        }
        b = safeDivide2(-c, e);
        a = -(b * m);
        this.a = a;
        this.b = b;
        this.c = c;
      } else if (("f" in x || "x" in x || "c" in x || "xIntercept" in x) && ("e" in x || "y" in x || "yIntercept" in x)) {
        let obj = x;
        let a, b, c;
        let e = obj.e || obj.c || obj.y || obj.yIntercept || 0;
        let f = obj.f || obj.x || obj.xIntercept || 0;
        let m = new Vector2(0 - e, f - 0).gradient();
        c = -(f * m);
        b = safeDivide2(-c, e);
        a = -(b * m);
        this.a = a;
        this.b = b;
        this.c = c;
      }
    } else if (typeof args[0] === "number" && typeof args[1] === "number" && typeof args[2] === "number") {
      let x = args[0], y = args[1], z = args[2];
      let a, b, c;
      a = x;
      b = y;
      c = z;
      this.a = a;
      this.b = b;
      this.c = c;
    } else if (typeof args[0] === "number" && typeof args[1] === "number") {
      let x = args[0], y = args[1];
      let a, b, c;
      let e = y;
      let f = x;
      let m = new Vector2(0 - e, f - 0).gradient();
      c = -(f * m);
      b = safeDivide2(-c, e);
      a = -(b * m);
      this.a = a;
      this.b = b;
      this.c = c;
    }
  }
  getX(y) {
    let x;
    if (this.b != 0) {
      let m = this.gradient;
      let e = this.yIntercept;
      x = safeDivide2(y - e, m);
    } else {
      let c = this.c;
      let a = this.a;
      x = safeDivide2(-c, a);
    }
    return x;
  }
  getY(x) {
    let y;
    if (this.a != 0) {
      let m = this.gradient;
      let e = this.yIntercept;
      y = m * x + e;
    } else {
      let c = this.c;
      let b = this.b;
      y = safeDivide2(-c, b);
    }
    return y;
  }
  equals(other) {
    return this.gradient == other.gradient && this.yIntercept == other.yIntercept && this.xIntercept == other.xIntercept;
  }
  isHorizontal() {
    return this.a === 0;
  }
  isVertical() {
    return this.b === 0;
  }
  hasPoint(point) {
    let v = new Vector2(point);
    let res;
    if (isInfinity2(this.a) && isInfinity2(this.b)) {
      if (this.a == this.b) {
        res = Infinity + this.c;
      } else {
        res = 0 + this.c;
      }
    } else {
      let ax = this.a * v.x;
      let by = this.b * v.y;
      let c = this.c;
      res = ax + by + c;
      res = Number(res);
    }
    return res == 0;
  }
  angle() {
    let xInt = this.xIntercept;
    let yInt = this.yIntercept;
    if (xInt == Infinity)
      return 0;
    if (xInt == -Infinity)
      return Math.PI;
    if (yInt == Infinity)
      return Math.PI / 2;
    if (yInt == -Infinity)
      return -(Math.PI / 2);
    let vx = new Vector2(xInt, 0);
    let vy = new Vector2(0, yInt);
    return vx.angleToPoint(vy);
  }
  static INTERSECT(l1, l2) {
    return l1.intersect(l2);
  }
  static INTERSECTS(arr) {
    if (!arr?.length) {
      return [];
    }
    let pts = [];
    for (let lineA of arr) {
      for (let lineB of arr) {
        if (lineA == lineB)
          continue;
        let ab = _Vector2Line.INTERSECT(lineA, lineB);
        if (ab)
          pts.push(ab);
      }
    }
    return pts;
  }
  intersect(other) {
    if (other.gradient == this.gradient) {
      return null;
    }
    let a1 = this.a, a2 = other.a;
    let b1 = this.b, b2 = other.b;
    let c1 = this.c, c2 = other.c;
    let b1c2 = b1 * c2;
    let b2c1 = b2 * c1;
    let a1b2 = a1 * b2;
    let a2b1 = a2 * b1;
    let a2c1 = a2 * c1;
    let a1c2 = a1 * c2;
    let BC, AB, AC;
    if (isInfinity2(b1c2) && isInfinity2(b2c1) && b1c2 == b2c1) {
      BC = b1c2;
    } else {
      BC = b1c2 - b2c1;
    }
    if (isInfinity2(a1b2) && isInfinity2(a2b1) && a1b2 == a2b1) {
      AB = a1b2;
    } else {
      AB = a1b2 - a2b1;
    }
    if (isInfinity2(a2c1) && isInfinity2(a1c2) && a2c1 == a1c2) {
      AC = a2c1;
    } else {
      AC = a2c1 - a1c2;
    }
    let x = safeDivide2(BC, AB);
    let y = safeDivide2(AC, AB);
    return new Vector2(x, y);
  }
  perpendicular(point) {
    point = new Vector2(point);
    if (this.a == 0) {
      let a = this.b, b = this.a, c = point.x;
      return new _Vector2Line({ a, b, c });
    } else if (this.b == 0) {
      let a = this.b, b = this.a, c = point.y;
      return new _Vector2Line({ a, b, c });
    } else {
      let m = safeDivide2(-1, this.gradient);
      let e = point.y + 1 / m * point.x;
      let f = safeDivide2(-e, m);
      return new _Vector2Line({
        gradient: m,
        xIntercept: f,
        yIntercept: f
      });
    }
  }
  normal() {
    return new Vector2(this.a, this.b);
  }
  mirror(point) {
    point = new Vector2(point);
    if (this.hasPoint(point)) {
      return new Vector2(point);
    }
    let _normal = this.normal();
    let unitNormal = _normal.normalized();
    let unitC = safeDivide2(this.c, _normal.length());
    let signedDist = unitNormal.x * point.x + unitNormal.y * point.y + unitC;
    let mx = point.x - 2 * unitNormal.x * signedDist;
    let my = point.y - 2 * unitNormal.y * signedDist;
    return new Vector2(mx, my);
  }
  asObject() {
    return { a: this.a, b: this.b, c: this.c };
  }
  toString() {
    return `(${this.a}x + ${this.b}y + ${this.c})`;
  }
  toJSON() {
    return this.asObject();
  }
};

// node_modules/@catsums/vector2/lib/esm/Rect2.js
var __defProp6 = Object.defineProperty;
var __name6 = /* @__PURE__ */ __name((target, value) => __defProp6(target, "name", { value, configurable: true }), "__name");
var Rect2 = class _Rect2 {
  static {
    __name(this, "Rect2");
  }
  static {
    __name6(this, "Rect2");
  }
  position;
  size;
  static get ORIGIN() {
    return new _Rect2(0, 0, 1, 1);
  }
  static EQUALS(r1, r2, p = 0) {
    if (r1 === r2)
      return true;
    if (!r1 || !r2)
      return false;
    let a = new _Rect2(r1);
    let b = new _Rect2(r2);
    if (Vector2.EQUALS(a.position, b.position, p) && Vector2.EQUALS(a.size, b.size, p))
      return true;
    return false;
  }
  static COMBINE(rects) {
    let pts = [];
    for (let r of rects) {
      if (r instanceof _Rect2) {
        pts = pts.concat(r.getCorners());
      }
    }
    return _Rect2.from(pts);
  }
  static from(pts) {
    return _Rect2.getFromPoints(pts);
  }
  static getFromPoints(points) {
    if (points instanceof Array == false)
      return null;
    let xMin, xMax, yMin, yMax;
    xMax = yMax = -Infinity;
    xMin = yMin = Infinity;
    for (let pt of points) {
      pt = new Vector2(pt);
      if (xMin == null || xMin > pt.x)
        xMin = pt.x;
      if (yMin == null || yMin > pt.y)
        yMin = pt.y;
      if (xMax == null || xMax < pt.x)
        xMax = pt.x;
      if (yMax == null || yMax < pt.y)
        yMax = pt.y;
    }
    let w = xMax - xMin;
    let h = yMax - yMin;
    return new _Rect2(xMin, yMin, w, h);
  }
  get start() {
    return new Vector2(this.left, this.top);
  }
  get end() {
    return new Vector2(this.right, this.bottom);
  }
  get center() {
    return Vector2.MIDPOINT([this.start, this.end]);
  }
  get extents() {
    return Vector2.SUBTRACT(this.center, this.start);
  }
  get topLeft() {
    return new Vector2(this.left, this.top);
  }
  get topRight() {
    return new Vector2(this.right, this.top);
  }
  get bottomLeft() {
    return new Vector2(this.left, this.bottom);
  }
  get bottomRight() {
    return new Vector2(this.right, this.bottom);
  }
  get x() {
    return this.position.x;
  }
  set x(n) {
    this.position.x = n;
  }
  get y() {
    return this.position.y;
  }
  set y(n) {
    this.position.y = n;
  }
  get w() {
    return this.size.x;
  }
  set w(n) {
    this.size.x = n;
  }
  get h() {
    return this.size.y;
  }
  set h(n) {
    this.size.y = n;
  }
  get width() {
    return this.w;
  }
  set width(n) {
    this.w = n;
  }
  get height() {
    return this.h;
  }
  set height(n) {
    this.h = n;
  }
  get left() {
    return this.x;
  }
  set left(n) {
    this.w = this.right - n;
    this.x = n;
  }
  get top() {
    return this.y;
  }
  set top(n) {
    this.h = this.bottom - n;
    this.y = n;
  }
  get right() {
    return this.x + this.w;
  }
  set right(n) {
    this.w = n - this.left;
  }
  get bottom() {
    return this.y + this.h;
  }
  set bottom(n) {
    this.h = n - this.top;
  }
  constructor(...args) {
    let [p, s, w, h] = args;
    if (p instanceof Object) {
      if ("position" in p && "size" in p) {
        this.position = new Vector2(p.position);
        this.size = new Vector2(p.size);
      } else if ("x" in p && "y" in p && "w" in p && "h" in p) {
        this.position = new Vector2(p.x, p.y);
        this.size = new Vector2(p.w, p.h);
      } else if ("x" in p && "y" in p && "x" in s && "y" in s) {
        this.position = new Vector2(p);
        this.size = new Vector2(s);
      } else if ("top" in p && "left" in p && "right" in p && "bottom" in p) {
        this.position = new Vector2(p.left, p.top);
        this.size = new Vector2(p.right - p.left, p.bottom - p.top);
      } else if ("t" in p && "l" in p && "r" in p && "b" in p) {
        this.position = new Vector2(p.l, p.t);
        this.size = new Vector2(p.r - p.l, p.b - p.t);
      }
    } else if (typeof p === "number" && typeof s === "number" && typeof w === "number" && typeof h === "number") {
      this.position = new Vector2(p, s);
      this.size = new Vector2(w, h);
    } else {
      this.position = new Vector2();
      this.size = new Vector2();
    }
  }
  equals(other, p = 0) {
    return _Rect2.EQUALS(this, other, p);
  }
  abs() {
    return new _Rect2(this.position, this.size.abs());
  }
  containsPoint(v) {
    v = new Vector2(v);
    if (v.x < this.left || v.x > this.right || v.y < this.top || v.y > this.bottom)
      return false;
    return true;
  }
  getIntersectWith(rect, threshold = 0) {
    let other = new _Rect2(rect);
    if (!this.intersectsWith(other, threshold))
      return null;
    let yMin = this.top > other.top ? this.top : other.top;
    let yMax = this.bottom < other.bottom ? this.bottom : other.bottom;
    let xMin = this.left > other.left ? this.left : other.left;
    let xMax = this.right < other.right ? this.right : other.right;
    return new _Rect2(
      new Vector2(xMin, yMin),
      new Vector2(xMax - xMin, yMax - yMin)
    );
  }
  intersectsWith(rect, threshold = 0) {
    let other = new _Rect2(rect);
    if (this.right + threshold < other.left || this.left - threshold > other.right || this.bottom + threshold < other.top || this.top - threshold > other.bottom)
      return false;
    return true;
  }
  isTouching(other, threshold = 0) {
    return this.touches(other, threshold);
  }
  touches(rect, threshold = 0) {
    let other = new _Rect2(rect);
    if (this.right + threshold == other.left || this.left - threshold == other.right || this.bottom + threshold == other.top || this.top - threshold == other.bottom)
      return true;
    return false;
  }
  combine(other) {
    return _Rect2.COMBINE([this, other]);
  }
  getCorners() {
    return [this.topLeft, this.topRight, this.bottomRight, this.bottomLeft];
  }
  clampPoints(pts) {
    let rect = this;
    let newPts = pts.map((pt) => {
      pt = new Vector2(pt);
      if (pt.y > rect.bottom)
        pt.y = rect.bottom;
      if (pt.x > rect.right)
        pt.x = rect.right;
      if (pt.y < rect.top)
        pt.y = rect.top;
      if (pt.x < rect.left)
        pt.x = rect.left;
      return pt;
    });
    return newPts;
  }
  asObject() {
    let rect = {
      x: this.x,
      y: this.y,
      w: this.w,
      h: this.h
    };
    rect = Object.assign(rect, {
      get top() {
        return rect.y;
      },
      get bottom() {
        return rect.y + rect.h;
      },
      get left() {
        return rect.x;
      },
      get right() {
        return rect.x + rect.w;
      }
    });
    return rect;
  }
  asArray() {
    return [this.x, this.y, this.w, this.h];
  }
  toString() {
    var out = `Rect2( ${this.position} ${this.size})`;
    return out;
  }
  toJSON() {
    return {
      position: this.position?.toJSON() || null,
      size: this.size?.toJSON() || null
    };
  }
};

// node_modules/@catsums/vector2/lib/esm/Transform2.js
var __defProp7 = Object.defineProperty;
var __name7 = /* @__PURE__ */ __name((target, value) => __defProp7(target, "name", { value, configurable: true }), "__name");
var Transform2 = class _Transform2 {
  static {
    __name(this, "Transform2");
  }
  static {
    __name7(this, "Transform2");
  }
  _position;
  _rotation;
  _scale;
  _skew;
  _anchor;
  _parent = null;
  _childs = [];
  static get ORIGIN() {
    return new _Transform2(Vector2.ZERO, 0, Vector2.ONE, Vector2.ZERO, Vector2.ZERO);
  }
  static EQUALS(t1, t2, p = 0) {
    if (t1 === t2)
      return true;
    if (!t2 || !t2)
      return false;
    if (Vector2.EQUALS(t1.position, t2.position, p) && Vector2.EQUALS(t1.scale, t2.scale, p) && Vector2.EQUALS(t1.skew, t2.skew, p) && Vector2.EQUALS(t1.anchor, t2.anchor, p))
      return true;
    return false;
  }
  static SIMILAR(t1, t2, p = 0) {
    if (t1 === t2)
      return true;
    if (!t2 || !t2)
      return false;
    if (Vector2.EQUALS(t1.position, t2.position, p) && Vector2.EQUALS(t1.scale, t2.scale, p) && Vector2.EQUALS(t1.skew, t2.skew, p))
      return true;
    return false;
  }
  static INVERSE(t) {
    let p = Vector2.NEG(t.position);
    let s = Vector2.INVERSE(t.scale);
    let r = -t.rotation;
    let k = Vector2.NEG(t.skew);
    let a = t.anchor;
    return new _Transform2(p, r, s, k, a);
  }
  get parent() {
    return this._parent;
  }
  set parent(x) {
    if (x instanceof _Transform2)
      this._parent = x;
  }
  get position() {
    return this._position;
  }
  set position(x) {
    if (x instanceof Vector2)
      this._position = new Vector2(x);
  }
  get rotation() {
    return this._rotation;
  }
  set rotation(x) {
    this._rotation = Number(x);
  }
  get scale() {
    return this._scale;
  }
  set scale(x) {
    if (x instanceof Vector2)
      this._scale = new Vector2(x);
  }
  get skew() {
    return this._skew;
  }
  set skew(x) {
    if (x instanceof Vector2)
      this._skew = new Vector2(x);
  }
  get anchor() {
    return this._anchor;
  }
  set anchor(x) {
    if (x instanceof Vector2)
      this._anchor = new Vector2(x);
  }
  get children() {
    return this._childs;
  }
  get childs() {
    return this.children;
  }
  get a() {
    return this.scale.x * (Math.cos(this.rotation) - Math.sin(this.rotation) * Math.tan(this.skew.x));
  }
  get b() {
    return this.scale.y * (Math.sin(this.rotation) + Math.cos(this.rotation) * Math.tan(this.skew.y));
  }
  get c() {
    return this.scale.x * (Math.cos(this.rotation) * Math.tan(this.skew.x) - Math.sin(this.rotation));
  }
  get d() {
    return this.scale.y * (Math.sin(this.rotation) * Math.tan(this.skew.y) + Math.cos(this.rotation));
  }
  get tx() {
    return this.position.x;
  }
  get ty() {
    return this.position.y;
  }
  get matrix() {
    return [
      [this.a, this.c, this.tx],
      [this.b, this.d, this.ty],
      [0, 0, 1]
    ];
  }
  constructor(...args) {
    if (args[0] instanceof _Transform2) {
      let p = args[0];
      this.position = new Vector2(p.position);
      this.rotation = p.rotation;
      this.scale = new Vector2(p.scale);
      this.skew = new Vector2(p.skew);
      this.anchor = new Vector2(p.anchor);
    } else {
      let [p, r, s, k, a] = args;
      this.position = new Vector2(p);
      this.rotation = r;
      this.scale = new Vector2(s);
      this.skew = new Vector2(k);
      this.anchor = new Vector2(a);
    }
  }
  inverted() {
    return _Transform2.INVERSE(this);
  }
  setParent(x) {
    if (!(x instanceof _Transform2))
      return;
    if (x == this)
      return;
    if (this.parent) {
      this.parent.removeChild(this);
    }
    this.parent = x;
  }
  addChild(x) {
    if (!(x instanceof _Transform2))
      return;
    if (x == this)
      return;
    x.setParent(this);
    this._childs.push(x);
  }
  removeChild(x) {
    if (x == this)
      return null;
    let ind;
    let out = null;
    if (x instanceof _Transform2) {
      ind = this._childs.indexOf(x);
    } else if (typeof x === "number") {
      ind = x;
    }
    if (ind >= 0 && ind < this._childs.length) {
      out = this._childs[ind];
      this._childs.splice(ind, 1);
      out._parent = null;
    }
    return out;
  }
  getGlobalTransform() {
    let parentTransform = this.parent?.getGlobalTransform() || new _Transform2();
    let pt = parentTransform;
    let p = Vector2.ADD(pt.position, this.position);
    let r = pt.rotation + this.rotation;
    let s = Vector2.MULTIPLY(pt.scale, this.scale);
    let k = new Vector2(
      Math.tan(Math.atan(this.skew.x) + Math.atan(pt.skew.x)),
      Math.tan(Math.atan(this.skew.y) + Math.atan(pt.skew.y))
    );
    let a = pt.applyTransform(this.anchor, pt.anchor);
    return new _Transform2(p, r, s, k, a);
  }
  applyGlobalTransform(pt, anchor = this.anchor, order = ["S", "K", "R", "T"]) {
    let globalTrans = this.getGlobalTransform();
    let newPt = new Vector2(pt);
    newPt = globalTrans.applyTransform(pt, anchor, order);
    return newPt;
  }
  applyTranslate(pt, anchor = this.anchor) {
    let newPt = new Vector2(pt);
    newPt = Vector2.SUBTRACT(newPt, anchor);
    newPt = Vector2.ADD(newPt, this.position);
    newPt = Vector2.ADD(newPt, anchor);
    return newPt;
  }
  applyRotate(pt, anchor = this.anchor) {
    let newPt = new Vector2(pt);
    newPt = Vector2.SUBTRACT(newPt, anchor);
    newPt = newPt.rotated(Vector2.ZERO, this.rotation);
    newPt = Vector2.ADD(newPt, anchor);
    return newPt;
  }
  applySkew(pt, anchor = this.anchor) {
    let newPt = new Vector2(pt);
    newPt = Vector2.SUBTRACT(newPt, anchor);
    newPt = newPt.skewed(Vector2.ZERO, this.skew);
    newPt = Vector2.ADD(newPt, anchor);
    return newPt;
  }
  applyScale(pt, anchor = this.anchor) {
    let newPt = new Vector2(pt);
    newPt = Vector2.SUBTRACT(newPt, anchor);
    newPt = Vector2.MULTIPLY(newPt, this.scale);
    newPt = Vector2.ADD(newPt, anchor);
    return newPt;
  }
  applyInverseTransform(pt, anchor = this._anchor, order = ["T", "R", "K", "S"]) {
    let inv = this.inverted();
    return inv.applyTransform(pt, anchor, order.slice());
  }
  applyTransform(pt, anchor = this.anchor, order = ["S", "K", "R", "T"]) {
    let newPt = new Vector2(pt);
    newPt = Vector2.SUBTRACT(newPt, anchor);
    for (let trans of order) {
      if (!trans)
        continue;
      switch (trans?.toUpperCase()) {
        case "T":
        case "TRANSLATE":
        case "POSITION":
          newPt = this.applyTranslate(newPt, Vector2.ZERO);
          break;
        case "R":
        case "ROTATE":
        case "ROTATION":
          newPt = this.applyRotate(newPt, Vector2.ZERO);
          break;
        case "K":
        case "SKEW":
          newPt = this.applySkew(newPt, Vector2.ZERO);
          break;
        case "S":
        case "SCALE":
        case "SIZE":
          newPt = this.applyScale(newPt, Vector2.ZERO);
          break;
        default:
          newPt = newPt;
          break;
      }
    }
    newPt = Vector2.ADD(newPt, anchor);
    return newPt;
  }
  asMatrix() {
    return this.matrix;
  }
  asArray() {
    return [this.a, this.b, this.c, this.d, this.tx, this.ty];
  }
  asObject() {
    return {
      position: this.position?.toJSON() || null,
      rotation: typeof this.rotation === "number" ? this.rotation : null,
      scale: this.scale?.toJSON() || null,
      skew: this.skew?.toJSON() || null,
      anchor: this.anchor?.toJSON() || null
    };
  }
  toString() {
    return `( Translate: ${this.position} Rotate: (${this.rotation}) Scale: ${this.scale} Skew: ${this.skew} Anchor: ${this.anchor} )`;
  }
  toJSON() {
    return this.asObject();
  }
};

// src/ElementFunctions.ts
var import_svg_path_parser = __toESM(require_svg_path_parser());
function compareJSON(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}
__name(compareJSON, "compareJSON");
function getAnchor(elem, opts = { global: false }) {
  let { global: global2 } = opts;
  let rect = getLocalOffsetRect(elem);
  if (global2) {
    rect = getGlobalOffsetRect(elem);
  }
  let compStyle = window.getComputedStyle(elem);
  let tOrigin = compStyle["transform-origin"].split(" ");
  let extents = rect.extents;
  let offset = new Vector2(extents);
  for (let i = 0; i < tOrigin.length; i++) {
    let val;
    if (!tOrigin[i])
      continue;
    switch (tOrigin[i].toLowerCase()) {
      case "top":
        offset.y = extents.y * 0;
        break;
      case "bottom":
        offset.y = extents.y * 2;
        break;
      case "left":
        offset.x = extents.y * 0;
        break;
      case "right":
        offset.x = extents.y * 2;
        break;
      case "center":
        if (i == 0)
          offset.x = extents.x;
        if (i == 1)
          offset.y = extents.y;
        break;
      default:
        if (tOrigin[i].endsWith("%")) {
          val = parseFloat(tOrigin[i]) / 100;
        } else {
          val = getCSSValueInPixels(tOrigin[i]);
        }
        if (i == 0)
          offset.x = val;
        if (i == 1)
          offset.y = val;
        break;
    }
  }
  let anchor = Vector2.ADD(rect.start, offset);
  return anchor;
}
__name(getAnchor, "getAnchor");
function getGlobalOffsetRect(elem) {
  let localRect = getLocalOffsetRect(elem);
  let globalRect = new Rect2(localRect);
  let parent = elem?.parentElement || null;
  if (parent && parent != document.body && parent != document.documentElement) {
    let parentRect = getLocalOffsetRect(parent);
    globalRect.position = Vector2.ADD(
      parentRect.position,
      globalRect.position
    );
  }
  return globalRect;
}
__name(getGlobalOffsetRect, "getGlobalOffsetRect");
function getLocalOffsetRect(elem) {
  let localRect;
  if (elem instanceof HTMLElement) {
    localRect = new Rect2(
      elem.offsetLeft,
      elem.offsetTop,
      elem.offsetWidth,
      elem.offsetHeight
    );
  } else if (elem instanceof SVGGraphicsElement) {
    let bbox = elem.getBBox();
    localRect = new Rect2(
      bbox.x,
      bbox.y,
      bbox.width,
      bbox.height
    );
  } else {
    localRect = getLocalBoundingRect(elem);
  }
  return localRect;
}
__name(getLocalOffsetRect, "getLocalOffsetRect");
function getGlobalBoundingRect(elem) {
  let _rect = elem.getBoundingClientRect();
  let globalRect = new Rect2(
    _rect.x,
    _rect.y,
    _rect.width,
    _rect.height
  );
  return globalRect;
}
__name(getGlobalBoundingRect, "getGlobalBoundingRect");
function getLocalBoundingRect(elem) {
  let globalRect = getGlobalBoundingRect(elem);
  let compStyle = window.getComputedStyle(elem);
  let positionType = compStyle.position?.toLowerCase();
  let parentRect = new Rect2(Vector2.ZERO, Vector2.ZERO);
  switch (positionType) {
    case "static":
    case "relative":
    case "absolute":
    case "sticky":
      {
        let parent = elem?.parentElement || null;
        if (positionType == "absolute") {
          while (parent && parent != elem && parent != document.body && parent != document.documentElement) {
            let parentPosType = window.getComputedStyle(parent)?.position?.toLowerCase();
            if (parentPosType == "static") {
              parent = parent?.parentElement || null;
            } else {
              break;
            }
          }
        }
        if (parent) {
          let prect = parent.getBoundingClientRect();
          parentRect = new Rect2(
            prect.x,
            prect.y,
            prect.width,
            prect.height
          );
        }
      }
      break;
    case "fixed":
      {
        let parent = elem.parentElement || null;
        if (parent) {
          let prect = document.body?.getBoundingClientRect() || document.documentElement?.getBoundingClientRect() || null;
          parentRect = new Rect2(
            prect.x,
            prect.y,
            prect.width,
            prect.height
          );
        }
      }
      break;
    default:
      break;
  }
  let localRect = new Rect2(
    Vector2.SUBTRACT(globalRect.position, parentRect.position),
    globalRect.size
  );
  return localRect;
}
__name(getLocalBoundingRect, "getLocalBoundingRect");
function roundTo3(num, step) {
  if (step == 0)
    return num;
  if (isInfinity(step))
    return Infinity;
  let invStep = Math.pow(step, -1);
  let invMiniStep = Math.pow(step / 10, -1);
  let initNum = Math.round(num * invMiniStep) / invMiniStep;
  let init = Math.round(initNum * invStep) / invStep;
  let res = Math.round((init + Number.EPSILON) * invStep) / invStep;
  return res;
}
__name(roundTo3, "roundTo");
function deltaTransformPoint(matrix, point) {
  var dx = point.x * matrix[0] + point.y * matrix[2] + 0;
  var dy = point.x * matrix[1] + point.y * matrix[3] + 0;
  return { x: dx, y: dy };
}
__name(deltaTransformPoint, "deltaTransformPoint");
function decomposeMatrix(matrix, _t = 0) {
  if (matrix?.length !== 6) {
    matrix = [1, 0, 0, 1, 0, 0];
  }
  var px = deltaTransformPoint(matrix, { x: 0, y: 1 });
  var py = deltaTransformPoint(matrix, { x: 1, y: 0 });
  let [a, b, c, d, tx, ty] = matrix;
  let det = a * d - c * b;
  let sx = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
  let sy = det / sx;
  let r = Math.atan2(b, a);
  let kx = Math.tan(
    Math.atan2(a * c + b * d, a * a + b * b)
  );
  let ky = Math.tan(0);
  return {
    translate: new Vector2(roundTo3(tx, _t), roundTo3(ty, _t)),
    scale: new Vector2(roundTo3(sx, _t), roundTo3(sy, _t)),
    skew: new Vector2(roundTo3(kx, _t), roundTo3(ky, _t)),
    rotation: roundTo3(r, _t / 10)
    // rotation is the same as skew x
    // rotation: (Math.atan2(matrix[]))
  };
}
__name(decomposeMatrix, "decomposeMatrix");
function parseCSSTransform(transform) {
  return transform.split(/\(|,|\)/).slice(1, -1).map(function(v) {
    return parseFloat(v);
  });
}
__name(parseCSSTransform, "parseCSSTransform");
function getElemTransformFromCSSStyle(elem, _t = 0) {
  let compStyle = window.getComputedStyle(elem);
  let rect = getLocalOffsetRect(elem);
  let anchor = getAnchor(elem);
  let p, s, r;
  let cssTranslate = compStyle.translate.trim().split(" ");
  if (cssTranslate.length == 1) {
    let _x = parseFloat(compStyle.translate.split(" ")[0]);
    if (isNaN(_x))
      _x = 0;
    p = new Vector2(_x, 0);
  } else {
    let _x = parseFloat(compStyle.translate.split(" ")[0]);
    let _y = parseFloat(compStyle.translate.split(" ")[1]);
    if (isNaN(_x))
      _x = 0;
    if (isNaN(_y))
      _y = 0;
    p = new Vector2(_x, _y);
  }
  let cssRotate = compStyle.rotate.trim().split(" ");
  if (cssRotate.length == 1) {
    let _r = parseFloat(compStyle.rotate.split(" ")[0]);
    if (isNaN(_r))
      _r = 0;
    r = deg2rad(_r);
  } else {
    r = 0;
  }
  let cssScale = compStyle.scale.trim().split(" ");
  if (cssScale.length == 1) {
    let _x = parseFloat(compStyle.scale.split(" ")[0]);
    if (isNaN(_x))
      _x = 1;
    s = new Vector2(_x, _x);
  } else {
    let _x = parseFloat(compStyle.scale.split(" ")[0]);
    let _y = parseFloat(compStyle.scale.split(" ")[1]);
    if (isNaN(_x))
      _x = 0;
    if (isNaN(_y))
      _y = 0;
    s = new Vector2(_x, _y);
  }
  p = new Vector2(roundTo3(p.x, _t), roundTo3(p.y, _t));
  r = roundTo3(r, _t / 10);
  s = new Vector2(roundTo3(s.x, _t), roundTo3(s.y, _t));
  let transform = new Transform2(
    p,
    r,
    s,
    Vector2.ZERO,
    anchor
  );
  return transform;
}
__name(getElemTransformFromCSSStyle, "getElemTransformFromCSSStyle");
function getElemTransformFromMatrix(elem, precision = 0) {
  let compStyle = window.getComputedStyle(elem);
  let parsedTrans = parseCSSTransform(compStyle["transform"]);
  if (!parsedTrans.length) {
    parsedTrans = [1, 0, 0, 1, 0, 0];
  } else if (parsedTrans.length == 16) {
    let t = parsedTrans;
    parsedTrans = [
      t[0],
      t[1],
      t[4],
      t[5],
      t[12],
      t[13]
    ];
  }
  let [a, b, c, d, tx, ty] = parsedTrans;
  let det = a * d - c * b;
  let decomp = decomposeMatrix(parsedTrans, precision);
  let {
    translate: p,
    rotation: r,
    scale: s,
    skew: k
  } = decomp;
  let rect = getLocalOffsetRect(elem);
  let anchor = getAnchor(elem);
  let transform = new Transform2(p, r, s, k, anchor);
  return transform;
}
__name(getElemTransformFromMatrix, "getElemTransformFromMatrix");
function getBasicShapeProps(cssValueString) {
  let cssBasicShapeStr = "";
  let _comps = cssValueString.split(" ");
  for (let s of _comps) {
    if (s.includes("(")) {
      cssBasicShapeStr = s;
      break;
    }
  }
  let cssBS = cssBasicShapeStr.split("(");
  let shape = cssBS[0] || "none";
  let propsString = cssValueString.split("(")[1]?.replaceAll(")", "") || "";
  let props = [propsString];
  switch (shape) {
    case "polygon":
      props = propsString.split(",");
      break;
    case "path":
      try {
        propsString = propsString.replaceAll(`"`, ``);
        props = import_svg_path_parser.default.parseSVG(propsString);
        props = import_svg_path_parser.default.makeAbsolute(props);
      } catch (e) {
        console.log(e);
        props = [];
      }
      break;
    default:
      props = propsString.split(" ");
      break;
  }
  props = props.map((prop) => {
    if (prop)
      prop = prop.trim();
    return prop;
  });
  return [shape, props];
}
__name(getBasicShapeProps, "getBasicShapeProps");
function getElemPointsBasedOnBasicShape(elem, shape, props = [], { transform = true, global: global2 = true, opts = {} }) {
  let rect;
  if (global2)
    rect = getGlobalOffsetRect(elem);
  else
    rect = getLocalOffsetRect(elem);
  let mTransform, sTransform;
  if (transform) {
    mTransform = getElemTransformFromMatrix(elem);
    sTransform = getElemTransformFromCSSStyle(elem);
  } else {
    mTransform = new Transform2();
    sTransform = new Transform2();
  }
  let points = [];
  switch (shape) {
    case "inset":
      points = getPointsInset(rect, props, opts);
      points.push(new Vector2(points[0]));
      break;
    case "circle":
    case "ellipse":
      points = getPointsEllipse(rect, props, opts);
      points.push(new Vector2(points[0]));
      break;
    case "polygon":
      points = getPointsPolygon(rect, props, opts);
      points.push(new Vector2(points[0]));
      break;
    case "path":
      points = getPointsPath(rect, props, opts);
      break;
    default:
      points = rect.getCorners();
      points.push(new Vector2(points[0]));
      break;
  }
  points = rect.clampPoints(points);
  let anchor = getAnchor(elem, { global: true });
  let newPoints = points.map((pt) => {
    return mTransform.applyTransform(pt, anchor);
  }).map((pt) => {
    return sTransform.applyTransform(pt, anchor);
  });
  return newPoints;
}
__name(getElemPointsBasedOnBasicShape, "getElemPointsBasedOnBasicShape");
function getPointsPath(r, props = [], { increment = 0.125, vertices = 8 }) {
  if (!props?.length) {
    if (props)
      props = [props];
    else
      props = [];
  }
  let rect = new Rect2(r);
  let pts = [];
  let paths = [];
  for (let prop of props) {
    if (!prop || !prop.command || !prop.code)
      continue;
    switch (prop.code) {
      case "V":
      case "H":
      case "L":
        {
          let pt = new Vector2(prop.x, prop.y);
          pts.push(pt);
        }
        break;
      case "S":
      case "C":
        {
          increment = Math.abs(increment);
          let _pts = Vector2.quadraticBezierPoints([
            new Vector2(prop.x0, prop.y0),
            new Vector2(prop.x1, prop.y1),
            new Vector2(prop.x2, prop.y2),
            new Vector2(prop.x, prop.y)
          ], increment);
          pts = pts.concat(_pts);
        }
        break;
      case "T":
      case "Q":
        {
          increment = Math.abs(increment);
          let _pts = Vector2.quadraticBezierPoints([
            new Vector2(prop.x0, prop.y0),
            new Vector2(prop.x1, prop.y1),
            new Vector2(prop.x, prop.y)
          ], increment);
          pts = pts.concat(_pts);
        }
        break;
      case "A":
        {
          pts.push(prop.x, prop.y);
        }
        break;
      case "Z": {
        pts.push(pts[0]);
      }
      case "M":
        {
          paths.push(pts);
          let pt = new Vector2(prop.x, prop.y);
          pts = [pt];
        }
        break;
    }
  }
  if (!paths.length)
    paths = [rect.getCorners()];
  let newPts = [];
  for (let path of paths) {
    for (let _pt of path) {
      newPts.push(new Vector2(_pt));
    }
  }
  let t1 = new Transform2(new Vector2(rect.left, rect.top));
  newPts = newPts.map((pt) => t1.applyTranslate(pt));
  return newPts;
}
__name(getPointsPath, "getPointsPath");
function getPointsPolygon(r, props = [], opts) {
  if (!props?.length) {
    if (props)
      props = [props];
    else
      props = [];
  }
  let rect = new Rect2(r);
  let pts = [];
  for (let prop of props) {
    if (prop == "nonzero" || prop == "evenodd") {
      continue;
    }
    let ptsStr = prop.split(" ");
    if (ptsStr.length != 2)
      return rect.getCorners();
    let _x = parseFloat(ptsStr[0]);
    let _y = parseFloat(ptsStr[1]);
    if (ptsStr[0].includes("%")) {
      _x = rect.width * (parseFloat(ptsStr[0]) / 100);
    }
    if (ptsStr[1].includes("%")) {
      _y = rect.height * (parseFloat(ptsStr[1]) / 100);
    }
    let x = rect.left + _x;
    let y = rect.top + _y;
    pts.push(new Vector2(x, y));
  }
  return pts;
}
__name(getPointsPolygon, "getPointsPolygon");
function getPointsEllipse(r, props = [], { vertices = 8 }) {
  if (!props?.length) {
    if (props)
      props = [props];
    else
      props = [];
  }
  let rect = new Rect2(r);
  let rx, ry, cx, cy;
  let radVals = [];
  let posVals = [];
  let hasAt = false;
  for (let i = 0; i < props.length; i++) {
    let prop = props[i];
    if (prop == "at") {
      hasAt = true;
      continue;
    }
    if (isNaN(parseFloat(prop))) {
      if (hasAt)
        posVals.push(prop);
      else
        break;
    }
    if (hasAt)
      posVals.push(prop);
    else
      radVals.push(prop);
  }
  if (!radVals.length) {
    return rect.getCorners();
  }
  {
    let val = parseFloat(radVals[0]);
    if (radVals[0].startsWith("%")) {
      val = rect.width * (val / 100);
    }
    rx = val;
  }
  if (radVals[1]) {
    let val = parseFloat(radVals[1]);
    if (radVals[1].startsWith("%")) {
      val = rect.height * (val / 100);
    }
    ry = val;
  } else {
    ry = rx;
  }
  if (!posVals.length) {
    cx = rect.center.x;
    cy = rect.center.y;
  } else {
    let val = parseFloat(posVals[0]);
    if (posVals[0].startsWith("%")) {
      val = rect.width * (val / 100);
    } else {
      val = val;
    }
    cx = val;
    val = parseFloat(posVals[1]);
    if (!posVals[1]) {
      val = cx;
    } else if (posVals[1].startsWith("%")) {
      val = rect.height * (val / 100);
    } else {
      val = val;
    }
    cy = val;
  }
  let pts = [];
  let vertexCount = vertices ?? 10;
  if (vertexCount < 4)
    vertexCount = 4;
  vertexCount = Math.trunc(Number(vertexCount));
  for (let i = 0; i < vertexCount; i++) {
    let angl = i * (Math.PI * 2) / vertexCount;
    let pt = new Vector2(
      rx * Math.cos(angl),
      ry * Math.sin(angl)
    );
    pts.push(pt);
  }
  let t0 = new Transform2(new Vector2(cx, cy));
  let t1 = new Transform2(new Vector2(rect.left, rect.top));
  pts = pts.map((pt) => t1.applyTranslate(pt));
  pts = pts.map((pt) => t0.applyTranslate(pt));
  return pts;
}
__name(getPointsEllipse, "getPointsEllipse");
function getPointsInset(_rect, props = [], opts) {
  if (!props?.length) {
    if (props)
      props = [props];
    else
      props = [];
  }
  let rect = new Rect2(_rect);
  let t = 0, l = 0, r = 0, b = 0;
  let vals = [];
  for (let i = 0; i < props.length; i++) {
    let prop = props[i];
    if (isNaN(parseFloat(prop)))
      break;
    vals.push(prop);
  }
  switch (vals.length) {
    case 1:
      {
        if (vals[0].endsWith("%")) {
          let n = parseFloat(vals[0]) / 100;
          t = rect.top + rect.height * n;
          l = rect.left + rect.width * n;
          r = rect.right - rect.width * n;
          b = rect.bottom - rect.height * n;
        } else {
          let n = parseFloat(vals[0]);
          t = rect.top + n;
          l = rect.left + n;
          r = rect.right - n;
          b = rect.bottom - n;
        }
      }
      break;
    case 2:
      {
        if (vals[0].endsWith("%")) {
          let n = parseFloat(vals[0]) / 100;
          t = rect.top + rect.height * n;
          b = rect.bottom - rect.height * n;
        } else {
          let n = parseFloat(vals[0]);
          t = rect.top + n;
          b = rect.bottom - n;
        }
        if (vals[1].endsWith("%")) {
          let n = parseFloat(vals[1]) / 100;
          l = rect.left + rect.width * n;
          r = rect.right - rect.width * n;
        } else {
          let n = parseFloat(vals[1]);
          l = rect.left + n;
          r = rect.right - n;
        }
      }
      break;
    case 3:
      {
        if (vals[0].endsWith("%"))
          t = rect.top + rect.height * (parseFloat(vals[0]) / 100);
        else
          t = rect.top + parseFloat(vals[0]);
        if (vals[1].endsWith("%")) {
          l = rect.left + rect.width * (parseFloat(vals[1]) / 100);
          r = rect.right - rect.width * (parseFloat(vals[1]) / 100);
        } else {
          l = rect.left + parseFloat(vals[1]);
          r = rect.right - parseFloat(vals[1]);
        }
        if (vals[2].endsWith("%"))
          b = rect.bottom - rect.height * (parseFloat(vals[2]) / 100);
        else
          b = rect.bottom + parseFloat(vals[2]);
      }
      break;
    case 4:
      {
        if (vals[0].endsWith("%"))
          t = rect.top + rect.height * (parseFloat(vals[0]) / 100);
        else
          t = rect.top + parseFloat(vals[0]);
        if (vals[1].endsWith("%"))
          r = rect.right - rect.width * (parseFloat(vals[1]) / 100);
        else
          r = rect.right - parseFloat(vals[1]);
        if (vals[2].endsWith("%"))
          b = rect.bottom - rect.height * (parseFloat(vals[2]) / 100);
        else
          b = rect.bottom - parseFloat(vals[2]);
        if (vals[3].endsWith("%"))
          l = rect.left + rect.width * (parseFloat(vals[3]) / 100);
        else
          l = rect.left + parseFloat(vals[3]);
      }
      break;
    default:
      {
        t = rect.top;
        r = rect.right;
        b = rect.bottom;
        l = rect.left;
      }
      break;
  }
  let newPts = new Rect2(l, t, r - l, b - t).getCorners();
  return newPts;
}
__name(getPointsInset, "getPointsInset");
function isPointInsidePolygon(polygon, vec) {
  let arr = polygon.map((pt) => new Vector2(pt));
  let len = arr.length;
  let v = new Vector2(vec);
  let rect = Rect2.from(arr);
  if (!rect.containsPoint(v)) {
    return false;
  }
  let castLine = new Vector2Line(
    new Vector2(v),
    new Vector2(v.x + 1, v.y)
  );
  let intersects = [];
  for (let i = 0; i < len; i++) {
    let a = new Vector2(arr[i]);
    let b = new Vector2(arr[i + 1]);
    let line = new Vector2Line(a, b);
    if (line.hasPoint(v))
      return true;
    let intersect = line.intersect(castLine);
    if (intersect && intersect.x > v.x) {
      let rectAB = Rect2.from([a, b]);
      if (rectAB.containsPoint(intersect)) {
        intersects.push(intersect);
      }
    }
  }
  return intersects.length % 2 != 0;
}
__name(isPointInsidePolygon, "isPointInsidePolygon");
function getPolygonIntersect(pA, pB, precision = Number.EPSILON) {
  if (pA.every((v) => v instanceof Array)) {
    let rects = [];
    for (let _pA of pA) {
      let _rect = getPolygonIntersect(_pA, pB);
      if (_rect) {
        if (_rect instanceof Array)
          rects = rects.concat(_rect);
      }
    }
    return rects;
  } else if (pB.every((v) => v instanceof Array)) {
    let rects = [];
    for (let _pB of pB) {
      let _rect = getPolygonIntersect(pA, _pB);
      if (_rect) {
        if (_rect instanceof Array)
          rects = rects.concat(_rect);
      }
    }
    return rects;
  } else {
    let rectA = Rect2.from(pA);
    let rectB = Rect2.from(pB);
    let intersectRect = rectA.getIntersectWith(rectB, precision);
    if (!intersectRect)
      return null;
    let intersects = [];
    for (let i = 0; i < pA.length - 1; i++) {
      let aa = new Vector2(pA[i]);
      let ab = new Vector2(pA[i + 1]);
      let lineA = new Vector2Line(aa, ab);
      let lineARect = Rect2.from([aa, ab]);
      for (let j = 0; j < pB.length - 1; j++) {
        let ba = new Vector2(pB[j]);
        let bb = new Vector2(pB[j + 1]);
        let lineB = new Vector2Line(ba, bb);
        let lineBRect = Rect2.from([ba, bb]);
        let v = lineB.intersect(lineA);
        if (!v)
          continue;
        if (lineBRect.containsPoint(v) && lineARect.containsPoint(v)) {
          intersects.push(v);
        }
      }
      if (intersectRect.containsPoint(aa)) {
        if (isPointInsidePolygon(pB, aa)) {
          intersects.push(aa);
        }
      }
    }
    for (let j = 0; j < pB.length - 1; j++) {
      let ba = new Vector2(pB[j]);
      if (intersectRect.containsPoint(ba)) {
        if (isPointInsidePolygon(pA, ba)) {
          intersects.push(ba);
        }
      }
    }
    if (!intersects.length)
      return null;
    let resPolygon = intersects;
    return resPolygon;
  }
}
__name(getPolygonIntersect, "getPolygonIntersect");

// src/CollisionObserver.ts
var import_lodash = __toESM(require_lodash());
var defaultObserveOpts = {
  rects: {
    boundingrect: false,
    offsetrect: false,
    transformrect: false,
    clippath: false,
    shapeoutside: false
    // svgshape: false,
  },
  collisionLayers: [],
  targetLayers: [],
  targets: [],
  tolerance: 1e-3
};
var CollisionObserver = class extends ProcessingTarget {
  static {
    __name(this, "CollisionObserver");
  }
  targetName = randomID("[CollisionObserver:", "]");
  _precision = 1e-3;
  _tolerance = 1e-3;
  _observedElements = {};
  // {String(connectID):Element}
  _proxies = /* @__PURE__ */ new Map();
  // {String(connectID):ProxyObject} or Map({Element:ProxyObject})
  _collisionLayers = {};
  // {String:String[connectID]}
  _entriesQueue = [];
  _callback = (entries, obs) => {
  };
  constructor(callback = (entries, obs) => {
  }, opts = {}) {
    let { FPS = 12, frameTolerance = Math.sqrt(Math.E) / 1e3, active = false, precision = 1e-3, tolerance = 1e-3 } = opts;
    super({ FPS, frameTolerance, active });
    this._precision = precision;
    this._tolerance = tolerance;
    this._callback = callback;
  }
  onPhysicsProcess(delta) {
    this.checkUpdates(Object.values(this._observedElements));
  }
  async checkUpdates(elements = Object.values(this._observedElements)) {
    let entries = [];
    let promises = [];
    for (let elem of elements) {
      promises.push(
        this.checkUpdate(elem)
      );
    }
    let results = await Promise.all(promises);
    for (let res of results) {
      if (res && import_lodash.default.isObject(res)) {
        entries.push(res);
      }
    }
    if (entries.length) {
      try {
        this.handleEntries(entries);
      } catch (err) {
        console.log(err);
        return;
      }
    }
  }
  async checkUpdate(elem) {
    if (!elem)
      return null;
    let processTime = this.elapsedFixedTime;
    let proxy = this._proxies.get(elem);
    if (!proxy)
      return null;
    let entry = {
      id: proxy.id,
      target: elem,
      collisions: []
      // {target:Elem, type:CollisionType, layers:[String], intersect:Rect2, intersectPoints:[{x,y}]}
    };
    let targetLayers = proxy.collision.targetLayers;
    for (let _layer of targetLayers) {
      let collLayer = this._collisionLayers[_layer];
      if (!collLayer)
        continue;
      for (let targID of collLayer) {
        let targElem = this._observedElements[targID];
        if (!targElem)
          continue;
        if (targElem == elem)
          continue;
        let targProxy = this._proxies.get(targElem);
        if (!targProxy)
          continue;
        let _collisionData = {};
        for (let opt of Object.keys(proxy.rects)) {
          if (!proxy.rects[opt])
            continue;
          let existingCollData = entry.collisions.find((collData) => collData.target == targElem && collData.rect == opt);
          if (existingCollData) {
            existingCollData.layers.push(_layer);
            continue;
          }
          switch (opt) {
            case "boundingrect":
              {
                let currRect = getGlobalBoundingRect(elem);
                let targRect = getGlobalBoundingRect(targElem);
                let _intersect = currRect.getIntersectWith(targRect, this._tolerance);
                if (_intersect && !proxy.currentCollisions.find((_c) => _c.id == targID)) {
                  _collisionData = {
                    targetID: targID,
                    target: targElem,
                    rect: opt,
                    type: 1 /* IN */,
                    layers: [_layer]
                  };
                  _collisionData.intersect = _intersect.toJSON();
                } else if (!_intersect && proxy.currentCollisions.find((_c) => _c.id == targID)) {
                  _collisionData = {
                    targetID: targID,
                    target: targElem,
                    rect: opt,
                    type: -1 /* OUT */,
                    layers: [_layer]
                  };
                  _collisionData.intersect = null;
                } else if (_intersect && !compareJSON(_intersect, proxy.currentCollisions.find((_c) => _c.id == targID)?.intersect)) {
                  _collisionData = {
                    targetID: targID,
                    target: targElem,
                    rect: opt,
                    type: 0 /* CHANGE */,
                    layers: [_layer]
                  };
                  _collisionData.intersect = _intersect.toJSON();
                }
              }
              break;
            case "offsetrect":
              {
                let currRect = getGlobalOffsetRect(elem);
                let targRect = getGlobalOffsetRect(targElem);
                let _intersect = currRect.getIntersectWith(targRect, this._tolerance);
                if (_intersect && !proxy.currentCollisions.find((_c) => _c.id == targID)) {
                  _collisionData = {
                    targetID: targID,
                    target: targElem,
                    rect: opt,
                    type: 1 /* IN */,
                    layers: [_layer]
                  };
                  _collisionData.intersect = _intersect.toJSON();
                } else if (!_intersect && proxy.currentCollisions.find((_c) => _c.id == targID)) {
                  _collisionData = {
                    targetID: targID,
                    target: targElem,
                    rect: opt,
                    type: -1 /* OUT */,
                    layers: [_layer]
                  };
                  _collisionData.intersect = null;
                } else if (_intersect && !compareJSON(_intersect, proxy.currentCollisions.find((_c) => _c.id == targID)?.intersect)) {
                  _collisionData = {
                    targetID: targID,
                    target: targElem,
                    rect: opt,
                    type: 0 /* CHANGE */,
                    layers: [_layer]
                  };
                  _collisionData.intersect = _intersect.toJSON();
                }
              }
              break;
            case "transformrect":
              {
                let currRect = getGlobalOffsetRect(elem);
                let targRect = getGlobalOffsetRect(targElem);
                let elemT0 = getElemTransformFromCSSStyle(elem, this._tolerance);
                let elemT1 = getElemTransformFromMatrix(elem, this._tolerance);
                let targT0 = getElemTransformFromCSSStyle(targElem, this._tolerance);
                let targT1 = getElemTransformFromMatrix(targElem, this._tolerance);
                let elemPts = currRect.getCorners().map((pt) => {
                  return elemT1.applyTransform(pt, elemT1.anchor);
                }).map((pt) => {
                  return elemT0.applyTransform(pt, elemT0.anchor);
                });
                let targPts = targRect.getCorners().map((pt) => {
                  return targT1.applyTransform(pt, targT1.anchor);
                }).map((pt) => {
                  return targT0.applyTransform(pt, targT0.anchor);
                });
                let _intersects = getPolygonIntersect(elemPts, targPts, this._precision);
                if (_intersects && !proxy.currentCollisions.find((_c) => _c.id == targID)) {
                  _collisionData = {
                    targetID: targID,
                    target: targElem,
                    rect: opt,
                    type: 1 /* IN */,
                    layers: [_layer]
                  };
                  _collisionData.intersect = _intersects.map((v) => v.toJSON?.() ?? v);
                } else if (!_intersects && proxy.currentCollisions.find((_c) => _c.id == targID)) {
                  _collisionData = {
                    targetID: targID,
                    target: targElem,
                    rect: opt,
                    type: -1 /* OUT */,
                    layers: [_layer]
                  };
                  _collisionData.intersect = null;
                } else if (_intersects && !compareJSON(_intersects, proxy.currentCollisions.find((_c) => _c.id == targID)?.intersect)) {
                  _collisionData = {
                    targetID: targID,
                    target: targElem,
                    rect: opt,
                    type: 0 /* CHANGE */,
                    layers: [_layer]
                  };
                  _collisionData.intersect = _intersects.map((v) => v.toJSON?.() ?? v);
                }
              }
              break;
            case "shapeoutside":
            case "clippath":
              {
                let sOpt = "clippath";
                if (opt == "clippath")
                  sOpt = "clip-path";
                if (opt == "shapeoutside")
                  sOpt = "shape-outside";
                let elemClipPath = window.getComputedStyle(elem)[sOpt];
                let targClipPath = window.getComputedStyle(targElem)[sOpt];
                let [elemClipPathShape, elemClipPathProps] = getBasicShapeProps(elemClipPath);
                let [targClipPathShape, targClipPathProps] = getBasicShapeProps(targClipPath);
                let elemPts = getElemPointsBasedOnBasicShape(elem, elemClipPathShape, elemClipPathProps, { opts: {
                  vertices: 8,
                  increment: 0.125
                } });
                let targPts = getElemPointsBasedOnBasicShape(targElem, targClipPathShape, targClipPathProps, { opts: {
                  vertices: 8,
                  increment: 0.125
                } });
                let _intersects = getPolygonIntersect(elemPts, targPts, this._precision);
                if (_intersects && !proxy.currentCollisions.find((_c) => _c.id == targID)) {
                  _collisionData = {
                    targetID: targID,
                    target: targElem,
                    rect: opt,
                    type: 1 /* IN */,
                    layers: [_layer]
                  };
                  _collisionData.intersect = _intersects.map((v) => v.toJSON?.() ?? v);
                } else if (!_intersects && proxy.currentCollisions.find((_c) => _c.id == targID)) {
                  _collisionData = {
                    targetID: targID,
                    target: targElem,
                    rect: opt,
                    type: -1 /* OUT */,
                    layers: [_layer]
                  };
                  _collisionData.intersect = null;
                } else if (_intersects) {
                  let _x = proxy.currentCollisions.find((_c) => _c.id == targID);
                  if (!compareJSON(_intersects, _x?.intersect)) {
                    _collisionData = {
                      targetID: targID,
                      target: targElem,
                      rect: opt,
                      type: 0 /* CHANGE */,
                      layers: [_layer]
                    };
                    _collisionData.intersect = _intersects.map((v) => v.toJSON?.() ?? v);
                  }
                }
              }
              break;
            default:
              break;
          }
        }
        if (Object.keys(_collisionData).length) {
          entry.collisions.push(_collisionData);
        }
      }
    }
    this.processEntry(elem, entry, {
      processTime,
      logTime: /* @__PURE__ */ new Date()
    });
    if (entry.collisions.length) {
      return entry;
    }
    return null;
  }
  handleEntries(ents) {
    this._callback(ents, this);
    let obs = this;
    ents.forEach((ent) => {
      ent.collisions.forEach((collData) => {
        if (!collData)
          return;
        switch (collData.type) {
          case 1 /* IN */:
            {
              obs.emitSignal("collisionIn", {
                collisionData: collData
              }, [ent.target]);
            }
            break;
          case -1 /* OUT */:
            {
              obs.emitSignal("collisionOut", {
                collisionData: collData
              }, [ent.target]);
            }
            break;
          case 0 /* CHANGE */:
            {
              obs.emitSignal("collisionChange", {
                collisionData: collData
              }, [ent.target]);
            }
            break;
        }
        obs.emitSignal("collision", {
          collisionData: collData
        }, [ent.target]);
      });
    });
  }
  processEntry(elem, entry, process) {
    let proxy = this._proxies.get(elem);
    if (!proxy)
      return;
    if (entry) {
      for (let collData of entry.collisions) {
        let targID = collData.targetID;
        if (collData.type == 1 /* IN */) {
          proxy.currentCollisions.push({
            id: targID,
            intersect: collData.intersect,
            rect: collData.rect
          });
        } else if (collData.type == -1 /* OUT */) {
          let _coll = proxy.currentCollisions.find((_c) => _c.id == targID);
          let ind = proxy.currentCollisions.indexOf(_coll);
          proxy.currentCollisions.splice(ind, 1);
        } else if (collData.type == 0 /* CHANGE */) {
          let _coll = proxy.currentCollisions.find((_c) => _c.id == targID);
          Object.assign(_coll, {
            id: targID,
            intersect: collData.intersect,
            rect: collData.rect
          });
        }
      }
      entry.process = {
        processTime: process.processTime,
        logTime: process.logTime,
        timeTaken: process.processTime - proxy._process.processTime
      };
    }
    proxy._process.processTime = process.processTime;
    proxy._process.logTime = process.logTime;
  }
  observe(elem, opts = defaultObserveOpts) {
    let proxies = [];
    if (!import_lodash.default.isObject(opts))
      opts = defaultObserveOpts;
    if (elem instanceof Array) {
      let arr = elem;
      for (let _elem of arr) {
        let p = this.observe(_elem, opts);
        if (p)
          proxies.concat(p);
      }
    } else if (elem instanceof Element) {
      let obsOpts = Object.assign({}, defaultObserveOpts);
      if (opts.rects instanceof Array) {
        for (let r of opts.rects) {
          r = r.toLowerCase();
          if (!(r in obsOpts.rects))
            continue;
          obsOpts.rects[r] = true;
        }
      } else if (import_lodash.default.isObject(opts.rects)) {
        for (let r of Object.keys(opts.rects)) {
          r = r.toLowerCase();
          if (!(r in obsOpts.rects))
            continue;
          obsOpts.rects[r] = opts.rects[r] ? true : false;
        }
      }
      if (import_lodash.default.isArray(opts.targets)) {
        obsOpts.targets = opts.targets.filter((_targ) => _targ instanceof Element);
      }
      if (import_lodash.default.isArray(opts.collisionLayers)) {
        obsOpts.collisionLayers = opts.collisionLayers.map((_layer) => `${_layer}`);
      }
      if (import_lodash.default.isArray(opts.targetLayers)) {
        obsOpts.targetLayers = opts.targetLayers.map((_layer) => `${_layer}`);
      }
      if (typeof opts.tolerance === "number") {
        obsOpts.tolerance = opts.tolerance;
      }
      let connectId = this.connectElement(elem);
      let proxy = {
        id: connectId,
        _process: {
          processTime: this.elapsedFixedTime,
          logTime: /* @__PURE__ */ new Date()
        },
        currentCollisions: [],
        rects: {},
        tolerance: 0,
        collision: {}
      };
      this._observedElements[proxy.id] = elem;
      for (let k of Object.keys(obsOpts.rects)) {
        if (obsOpts.rects[k] == false) {
          delete obsOpts.rects[k];
        } else {
          k = k.toLowerCase();
          proxy.rects[k] = obsOpts.rects[k] ? true : false;
        }
      }
      for (let _layer of obsOpts.collisionLayers) {
        if (!(_layer in this._collisionLayers)) {
          this._collisionLayers[_layer] = [];
        }
        this._collisionLayers[_layer].push(proxy.id);
      }
      proxy.collision = {
        layers: obsOpts.collisionLayers,
        targets: obsOpts.targets,
        targetLayers: obsOpts.targetLayers
      };
      proxy.tolerance = obsOpts.tolerance;
      this._proxies.set(elem, proxy);
      proxies = [proxy];
    }
    return proxies;
  }
  disconnect(elem) {
    let proxy = this._proxies.get(elem);
    if (!proxy)
      return;
    delete this._observedElements[proxy.id];
    this.disconnectElement(elem);
    this._proxies.delete(elem);
    for (let _layer of proxy.collision?.layers) {
      if (!this._collisionLayers[_layer])
        continue;
      let ind = this._collisionLayers[_layer].indexOf(proxy.id);
      if (ind >= 0) {
        this._collisionLayers[_layer].splice(ind, 1);
      }
    }
  }
};
/*! Bundled license information:

lodash/lodash.js:
  (**
   * @license
   * Lodash <https://lodash.com/>
   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   *)
*/
if (typeof module.exports == "object" && typeof exports == "object") {
  var __cp = (to, from, except, desc) => {
    if ((from && typeof from === "object") || typeof from === "function") {
      for (let key of Object.getOwnPropertyNames(from)) {
        if (!Object.prototype.hasOwnProperty.call(to, key) && key !== except)
        Object.defineProperty(to, key, {
          get: () => from[key],
          enumerable: !(desc = Object.getOwnPropertyDescriptor(from, key)) || desc.enumerable,
        });
      }
    }
    return to;
  };
  module.exports = __cp(module.exports, exports);
}
return module.exports;
}))
