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

// src/ElementFunctions.ts
var ElementFunctions_exports = {};
__export(ElementFunctions_exports, {
  compareJSON: () => compareJSON,
  convexHullSort: () => convexHullSort,
  decomposeMatrix: () => decomposeMatrix,
  deltaTransformPoint: () => deltaTransformPoint,
  fixPolygonPointsOrder: () => fixPolygonPointsOrder,
  getAnchor: () => getAnchor,
  getBasicShapeProps: () => getBasicShapeProps,
  getElemExpandedTransformFromCSSStyle: () => getElemExpandedTransformFromCSSStyle,
  getElemExpandedTransformFromMatrix: () => getElemExpandedTransformFromMatrix,
  getElemPointsBasedOnBasicShape: () => getElemPointsBasedOnBasicShape,
  getElemTransformFromCSSStyle: () => getElemTransformFromCSSStyle,
  getElemTransformFromMatrix: () => getElemTransformFromMatrix,
  getGlobalBoundingRect: () => getGlobalBoundingRect,
  getGlobalOffsetRect: () => getGlobalOffsetRect,
  getLocalBoundingRect: () => getLocalBoundingRect,
  getLocalOffsetRect: () => getLocalOffsetRect,
  getPointsEllipse: () => getPointsEllipse,
  getPointsInset: () => getPointsInset,
  getPointsPath: () => getPointsPath,
  getPointsPolygon: () => getPointsPolygon,
  getPolygonIntersect: () => getPolygonIntersect,
  isPointInsidePolygon: () => isPointInsidePolygon,
  parseCSSTransform: () => parseCSSTransform,
  roundTo: () => roundTo3,
  transformCSSCoord: () => transformCSSCoord
});
module.exports = __toCommonJS(ElementFunctions_exports);

// node_modules/@catsums/vector2/lib/esm/MY.js
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
function mod(n, m) {
  return (n % m + m) % m;
}
__name(mod, "mod");
__name2(mod, "mod");
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
function isInfinity(x) {
  return x === -Infinity || x === Infinity;
}
__name(isInfinity, "isInfinity");
__name2(isInfinity, "isInfinity");
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

// node_modules/@catsums/vector2/lib/esm/Vector2.js
var __defProp3 = Object.defineProperty;
var __name3 = /* @__PURE__ */ __name((target, value) => __defProp3(target, "name", { value, configurable: true }), "__name");
var Vector2 = class _Vector2 {
  static {
    __name(this, "Vector2");
  }
  static {
    __name3(this, "Vector2");
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
      mod(v1.x, v2.x),
      mod(v1.y, v2.y)
    );
  }
  mod(other) {
    this.x = mod(this.x, other.x);
    this.y = mod(this.y, other.y);
  }
  static MODBY(v1, n) {
    return new _Vector2(
      mod(v1.x, n),
      mod(v1.y, n)
    );
  }
  modBy(n) {
    this.x = mod(this.x, n);
    this.y = mod(this.y, n);
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
    if (roundTo(v1.x, p) === roundTo(v2.x, p) && roundTo(v1.y, p) === roundTo(v2.y, p))
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
      safeDivide(this.x, sum),
      safeDivide(this.y, sum)
    );
  }
  isNormalised() {
    return Math.abs(this.lengthSquared() - 1) == 0;
  }
  normalized() {
    var llen = this.length();
    return new _Vector2(
      safeDivide(this.x, llen),
      safeDivide(this.y, llen)
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
    return safeDivide(this.y, this.x);
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
    let ix = safeDivide(1, v1.x);
    let iy = safeDivide(1, v1.y);
    return new _Vector2(ix, iy);
  }
  inverse() {
    let ix = safeDivide(1, this.x);
    let iy = safeDivide(1, this.y);
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
    let x = safeDivide(_x, arr.length);
    let y = safeDivide(_y, arr.length);
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
    let x = safeDivide(_x, arr.length + 1);
    let y = safeDivide(_y, arr.length + 1);
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
    var clamp = /* @__PURE__ */ __name3(function(n, min, max) {
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
var __defProp4 = Object.defineProperty;
var __name4 = /* @__PURE__ */ __name((target, value) => __defProp4(target, "name", { value, configurable: true }), "__name");
var Vector2Line = class _Vector2Line {
  static {
    __name(this, "Vector2Line");
  }
  static {
    __name4(this, "Vector2Line");
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
    return safeDivide(-this.a, this.b);
  }
  get m() {
    return this.gradient;
  }
  get xIntercept() {
    return safeDivide(-this.c, this.a);
  }
  get f() {
    return this.xIntercept;
  }
  get yIntercept() {
    return safeDivide(-this.c, this.b);
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
      if (isInfinity(m)) {
        c = -(v1.x || v2.x);
        b = 0;
        a = 1;
      } else if (m == 0) {
        a = 0;
        b = -1;
        c = v1.y || v2.y;
      } else {
        e = v1.y - m * v1.x;
        f = safeDivide(-e, m);
        c = -(f * m);
        b = safeDivide(-c, e) || 1;
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
          f = safeDivide(-c, m);
        }
        b = safeDivide(-c, e);
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
        b = safeDivide(-c, e);
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
      b = safeDivide(-c, e);
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
      x = safeDivide(y - e, m);
    } else {
      let c = this.c;
      let a = this.a;
      x = safeDivide(-c, a);
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
      y = safeDivide(-c, b);
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
    if (isInfinity(this.a) && isInfinity(this.b)) {
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
    if (isInfinity(b1c2) && isInfinity(b2c1) && b1c2 == b2c1) {
      BC = b1c2;
    } else {
      BC = b1c2 - b2c1;
    }
    if (isInfinity(a1b2) && isInfinity(a2b1) && a1b2 == a2b1) {
      AB = a1b2;
    } else {
      AB = a1b2 - a2b1;
    }
    if (isInfinity(a2c1) && isInfinity(a1c2) && a2c1 == a1c2) {
      AC = a2c1;
    } else {
      AC = a2c1 - a1c2;
    }
    let x = safeDivide(BC, AB);
    let y = safeDivide(AC, AB);
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
      let m = safeDivide(-1, this.gradient);
      let e = point.y + 1 / m * point.x;
      let f = safeDivide(-e, m);
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
    let unitC = safeDivide(this.c, _normal.length());
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
var __defProp5 = Object.defineProperty;
var __name5 = /* @__PURE__ */ __name((target, value) => __defProp5(target, "name", { value, configurable: true }), "__name");
var Rect2 = class _Rect2 {
  static {
    __name(this, "Rect2");
  }
  static {
    __name5(this, "Rect2");
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
var __defProp6 = Object.defineProperty;
var __name6 = /* @__PURE__ */ __name((target, value) => __defProp6(target, "name", { value, configurable: true }), "__name");
var Transform2 = class _Transform2 {
  static {
    __name(this, "Transform2");
  }
  static {
    __name6(this, "Transform2");
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

// node_modules/@catsums/my/lib/esm/MyHelperFunctions.js
var __defProp7 = Object.defineProperty;
var __name7 = /* @__PURE__ */ __name((target, value) => __defProp7(target, "name", { value, configurable: true }), "__name");
function cout(...vars) {
  console.log(...vars);
}
__name(cout, "cout");
__name7(cout, "cout");
function clog(...x) {
  console.log(...x);
}
__name(clog, "clog");
__name7(clog, "clog");
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
function mod2(n, m) {
  return (n % m + m) % m;
}
__name(mod2, "mod");
__name7(mod2, "mod");
function isInfinity2(x) {
  return x === -Infinity || x === Infinity;
}
__name(isInfinity2, "isInfinity");
__name7(isInfinity2, "isInfinity");
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
__name7(safeDivide2, "safeDivide");
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
__name7(getAverageFrom, "getAverageFrom");
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
__name7(getCSSValueInPixels, "getCSSValueInPixels");
function loadHTMLtoObject(query, url) {
  document.querySelector(query)?.setAttribute("data", url);
}
__name(loadHTMLtoObject, "loadHTMLtoObject");
__name7(loadHTMLtoObject, "loadHTMLtoObject");
function docReady(fn) {
  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}
__name(docReady, "docReady");
__name7(docReady, "docReady");
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
__name7(forMediaQuery, "forMediaQuery");
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
__name7(checkBootstrapMedia, "checkBootstrapMedia");
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
__name7(getFormData, "getFormData");
function submitForm(query, callback, url) {
  let formElement = document.querySelector(query);
  let formData = new FormData(formElement);
  let methodType = formElement.getAttribute("method");
  ajax(formData, url, methodType, callback);
}
__name(submitForm, "submitForm");
__name7(submitForm, "submitForm");
var defectForm = /* @__PURE__ */ __name7(function(e) {
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
__name7(defectAllFormSubmits, "defectAllFormSubmits");
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
__name7(formDataToJSON, "formDataToJSON");
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
__name7(getBase64, "getBase64");
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
__name7(ajax, "ajax");
function ajaxGET(url, callback, failback = function(x) {
}) {
  ajax("", url, "GET", callback, failback);
}
__name(ajaxGET, "ajaxGET");
__name7(ajaxGET, "ajaxGET");
function ajaxPOST(data, url, callback, failback = function(x) {
}) {
  ajax(data, url, "POST", callback, failback);
}
__name(ajaxPOST, "ajaxPOST");
__name7(ajaxPOST, "ajaxPOST");
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
__name7(getFileBlob, "getFileBlob");
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
__name7(processAjaxData, "processAjaxData");
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
__name7(setHistoryState, "setHistoryState");
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
__name7(pushHistoryState, "pushHistoryState");
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
__name7(objectToURLParams, "objectToURLParams");
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
__name7(parseURLParams, "parseURLParams");
function checkCookie(cname) {
  let cookey = getCookie(cname);
  if (cookey != "")
    return true;
  return false;
}
__name(checkCookie, "checkCookie");
__name7(checkCookie, "checkCookie");
function setCookie(cname, cvalue, exdays = 1) {
  let d = /* @__PURE__ */ new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1e3);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + "; path=/";
}
__name(setCookie, "setCookie");
__name7(setCookie, "setCookie");
function deleteCookie(cname) {
  document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
__name(deleteCookie, "deleteCookie");
__name7(deleteCookie, "deleteCookie");
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
__name7(getCookie, "getCookie");
function isInt(val) {
  return isNumber(val) && Math.trunc(val) === val;
}
__name(isInt, "isInt");
__name7(isInt, "isInt");
function isNumber(val) {
  return !isNaN(Number(val));
}
__name(isNumber, "isNumber");
__name7(isNumber, "isNumber");
function isArray(arr) {
  return typeof arr === "object" && arr instanceof Array;
}
__name(isArray, "isArray");
__name7(isArray, "isArray");
function isString(str) {
  return typeof str === "string";
}
__name(isString, "isString");
__name7(isString, "isString");
function isFunction(func) {
  return typeof func === "function" || func instanceof Function;
}
__name(isFunction, "isFunction");
__name7(isFunction, "isFunction");
function isObject(object) {
  return object != null && typeof object === "object";
}
__name(isObject, "isObject");
__name7(isObject, "isObject");
function isInRange(num, min, max, inclusive = true) {
  if (inclusive)
    return num >= min && num <= max;
  else
    return num > min && num < max;
}
__name(isInRange, "isInRange");
__name7(isInRange, "isInRange");
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
__name7(isJSON, "isJSON");
function link_is_external(link_element, _location = window.location) {
  return link_element.host !== _location.host;
}
__name(link_is_external, "link_is_external");
__name7(link_is_external, "link_is_external");
function isExternalURLFast(url) {
  var match = url.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/);
  if (typeof match[1] === "string" && match[1].length > 0 && match[1].toLowerCase() !== location.protocol)
    return true;
  if (typeof match[2] === "string" && match[2].length > 0 && match[2].replace(new RegExp(":(" + { "http:": 80, "https:": 443 }[location.protocol] + ")?$"), "") !== location.host)
    return true;
  return false;
}
__name(isExternalURLFast, "isExternalURLFast");
__name7(isExternalURLFast, "isExternalURLFast");
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
__name7(isExternalURL, "isExternalURL");
function JSONobjectsAreEqual(objA, objB) {
  var jsonA = JSON.stringify(objA);
  var jsonB = JSON.stringify(objB);
  if (jsonA === jsonB)
    return true;
  return false;
}
__name(JSONobjectsAreEqual, "JSONobjectsAreEqual");
__name7(JSONobjectsAreEqual, "JSONobjectsAreEqual");
function randomId(_prefix = "", _suffix = "") {
  return _prefix + Math.random().toString(36).substr(2, 9) + _suffix;
}
__name(randomId, "randomId");
__name7(randomId, "randomId");
function randomID(_prefix = "", _suffix = "", _length = 9) {
  return `${_prefix}${randomString(9)}${_suffix}`;
}
__name(randomID, "randomID");
__name7(randomID, "randomID");
function hexadecimalID(_len = 16, _pow = 4) {
  return Math.floor((1 + Math.random()) * Math.pow(_len, _pow)).toString(16).substring(1);
}
__name(hexadecimalID, "hexadecimalID");
__name7(hexadecimalID, "hexadecimalID");
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
__name7(randomString, "randomString");
function randomCharFrom(str) {
  return randomString(1, str);
}
__name(randomCharFrom, "randomCharFrom");
__name7(randomCharFrom, "randomCharFrom");
function rndInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
__name(rndInt, "rndInt");
__name7(rndInt, "rndInt");
function randomItemFrom(arr) {
  return arr[rndInt(0, arr.length - 1)];
}
__name(randomItemFrom, "randomItemFrom");
__name7(randomItemFrom, "randomItemFrom");
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
__name7(safeStringify, "safeStringify");
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
__name7(hash32, "hash32");
function hash64(str) {
  var h1 = hash32(str);
  return h1 + hash32(h1 + str);
}
__name(hash64, "hash64");
__name7(hash64, "hash64");
function hash128(str) {
  var h1 = hash64(str);
  return h1 + hash64(h1 + str);
}
__name(hash128, "hash128");
__name7(hash128, "hash128");
function stringTrimToLength(_str, _len) {
  if (_len == null)
    _len = String(_str).length;
  _str = String(_str);
  return _str.substring(0, _len);
}
__name(stringTrimToLength, "stringTrimToLength");
__name7(stringTrimToLength, "stringTrimToLength");
function jsonFix(str) {
  str = String(str);
  let regex = /\,(?!\s*?[\{\[\"\'\w])/g;
  var newStr = str.replace(regex, "");
  return newStr;
}
__name(jsonFix, "jsonFix");
__name7(jsonFix, "jsonFix");
function deg2rad(deg) {
  var res = deg * Math.PI / 180;
  return res;
}
__name(deg2rad, "deg2rad");
__name7(deg2rad, "deg2rad");
function rad2deg(rad) {
  var res = rad * 180 / Math.PI;
  return res;
}
__name(rad2deg, "rad2deg");
__name7(rad2deg, "rad2deg");
function stepify(value, step) {
  if (step == 0)
    return value;
  if (step == Infinity)
    return 1;
  return Math.round((value + Number.EPSILON) / step) * step;
}
__name(stepify, "stepify");
__name7(stepify, "stepify");
function splitStringByLength(str, len) {
  var parts = [];
  for (var i = 0; i < str.length; i += len) {
    parts.push(str.substring(i, i + len));
  }
  return parts;
}
__name(splitStringByLength, "splitStringByLength");
__name7(splitStringByLength, "splitStringByLength");
function sanitizeString(str) {
  str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "");
  return str.trim();
}
__name(sanitizeString, "sanitizeString");
__name7(sanitizeString, "sanitizeString");
function validateEmail(email) {
  return String(email).toLowerCase().match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}
__name(validateEmail, "validateEmail");
__name7(validateEmail, "validateEmail");
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
__name7(mysql_real_escape_string, "mysql_real_escape_string");
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
__name7(areSimilar, "areSimilar");
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
__name7(hardPush, "hardPush");
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
__name7(shallowEqual, "shallowEqual");
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
__name7(deepEqual, "deepEqual");
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
__name7(findItemIndex, "findItemIndex");
function findItem(arr, item) {
  var res = findItemIndex(arr, item);
  if (res < 0)
    return false;
  return true;
}
__name(findItem, "findItem");
__name7(findItem, "findItem");
function arrayRemove(arr, item) {
  var res = arr.indexOf(item);
  if (res < 0)
    return false;
  let x = arr.splice(res, 1);
  return x.length > 0;
}
__name(arrayRemove, "arrayRemove");
__name7(arrayRemove, "arrayRemove");
function findItemObject(arr, item, compareProperties = null) {
  var res = findItemObjectIndex(arr, item, compareProperties);
  if (res < 0)
    return false;
  return true;
}
__name(findItemObject, "findItemObject");
__name7(findItemObject, "findItemObject");
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
__name7(findItemObjectIndex, "findItemObjectIndex");
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
__name7(getObjectFromArray, "getObjectFromArray");
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
    let _i = mod2(iL, arr.length);
    arrL.push(arr[_i]);
    if (Math.abs(_i) == _to)
      break;
    iL--;
  }
  while (arrR.length < arr.length) {
    let _i = mod2(iR, arr.length);
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
__name7(getClosestPathInCircle, "getClosestPathInCircle");
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
__name7(roundTo2, "roundTo");

// src/ElementFunctions.ts
var import_svg_path_parser = __toESM(require_svg_path_parser());
function compareJSON(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}
__name(compareJSON, "compareJSON");
function getAnchor(elem, opts = { global: false }) {
  let { global } = opts;
  let rect = getLocalOffsetRect(elem);
  if (global) {
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
  if (isInfinity2(step))
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
function transformCSSCoord(transformArr, v) {
  v = new Vector2(v);
  let x = v.x, y = v.y;
  if (transformArr.length == 6) {
    var t = transformArr, det = t[0] * t[3] - t[1] * t[2];
    return new Vector2({
      x: safeDivide2(x * t[3] - y * t[2] + t[2] * t[5] - t[4] * t[3], det),
      y: safeDivide2(-x * t[1] + y * t[0] + t[4] * t[1] - t[0] * t[5], det)
    });
  } else {
    return v;
  }
}
__name(transformCSSCoord, "transformCSSCoord");
function getElemExpandedTransformFromMatrix(elem, _t = 0) {
  let localTransform = getElemTransformFromMatrix(elem, _t);
  if (elem != document.body && elem != document.documentElement) {
    let parent = elem?.parentElement || null;
    if (parent && parent != elem) {
      let parentTransform = getElemExpandedTransformFromMatrix(parent, _t);
      parentTransform.addChild(localTransform);
    }
  }
  return localTransform;
}
__name(getElemExpandedTransformFromMatrix, "getElemExpandedTransformFromMatrix");
function getElemExpandedTransformFromCSSStyle(elem, _t = 0) {
  let localTransform = getElemTransformFromCSSStyle(elem, _t);
  if (elem != document.body && elem != document.documentElement) {
    let parent = elem?.parentElement || null;
    if (parent && parent != elem) {
      let parentTransform = getElemExpandedTransformFromCSSStyle(parent, _t);
      parentTransform.addChild(localTransform);
    }
  }
  return localTransform;
}
__name(getElemExpandedTransformFromCSSStyle, "getElemExpandedTransformFromCSSStyle");
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
    case "circle":
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
function getElemPointsBasedOnBasicShape(elem, shape, props = [], { transform = true, global = true, opts = {} }) {
  let rect;
  if (global)
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
  let clampedPoints = rect.clampPoints(points);
  let anchor = getAnchor(elem, { global: true });
  let newPoints = clampedPoints.map((pt) => {
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
    for (let i = 0; i < pA.length; i++) {
      let aa = new Vector2(pA[i]);
      let ab = new Vector2(pA[(i + 1) % pA.length]);
      let lineA = new Vector2Line(aa, ab);
      let lineARect = Rect2.from([aa, ab]);
      for (let j = 0; j < pB.length; j++) {
        let ba = new Vector2(pB[j]);
        let bb = new Vector2(pB[(j + 1) % pB.length]);
        let lineB = new Vector2Line(ba, bb);
        let lineBRect = Rect2.from([ba, bb]);
        let v = lineB.intersect(lineA);
        if (!v)
          continue;
        if (lineBRect.containsPoint(v) && lineARect.containsPoint(v)) {
          intersects.push(v);
        }
        if (intersectRect.containsPoint(ba)) {
          if (isPointInsidePolygon(pA, ba)) {
            intersects.push(ba);
          }
        }
      }
      if (intersectRect.containsPoint(ab)) {
        if (isPointInsidePolygon(pB, ab)) {
          intersects.push(ab);
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
function fixPolygonPointsOrder(polygon, precision = Number.EPSILON) {
  let arr = polygon.map((pt) => new Vector2(pt)).slice();
  let len = arr.length;
  let rect = Rect2.from(arr);
  let swaps = [];
  mainLoop:
    for (let p = 0; p < len + 1; p++) {
      swaps = [];
      loopA:
        for (let i = 0; i < len; i++) {
          let nextI = (i + 1) % len;
          let aa = arr[i];
          let ab = arr[nextI];
          let lineA = new Vector2Line(aa, ab);
          let lineARect = Rect2.from([aa, ab]);
          console.log(`lineA ${aa} -- ${ab}`);
          loopB:
            for (let j = 0; j < len; j++) {
              if (j == i)
                continue;
              let nextJ = (j + 1) % len;
              let ba = arr[j];
              let bb = arr[(j + 1) % len];
              let lineB = new Vector2Line(ba, bb);
              let lineBRect = Rect2.from([ba, bb]);
              console.log(`lineB ${ba} -- ${bb}`);
              let intersectAB = lineA.intersect(lineB);
              console.log(`intersectAB ${intersectAB}`);
              if (!intersectAB)
                continue;
              for (let pt of arr) {
                if (Vector2.EQUALS(pt, intersectAB, precision)) {
                  console.log(`intersect ${intersectAB} is a polygon point`);
                  continue loopB;
                }
              }
              let rectIntersect = lineARect.getIntersectWith(lineBRect);
              if (rectIntersect && rectIntersect.containsPoint(intersectAB)) {
                swaps.push([i, nextJ]);
                let temp = arr[i];
                arr[i] = arr[nextJ];
                arr[nextJ] = temp;
                console.log(`swapped ${arr[i]} and ${arr[nextJ]}`);
              }
            }
        }
      if (!swaps.length) {
        break mainLoop;
      }
    }
  if (swaps.length) {
    console.log("I give up, just use convex hull");
    arr = sortPoints(arr);
  }
  return arr.slice();
}
__name(fixPolygonPointsOrder, "fixPolygonPointsOrder");
function convexHullSort(polygon) {
  return sortPoints(polygon);
}
__name(convexHullSort, "convexHullSort");
function sortPoints(points) {
  points = points.slice();
  let p0 = new Vector2();
  p0.y = Math.min.apply(null, points.map((p) => p.y));
  p0.x = Math.max.apply(null, points.filter((p) => p.y == p0.y).map((p) => p.x));
  points.sort((a, b) => angleCompare(p0, a, b));
  return points;
}
__name(sortPoints, "sortPoints");
function angleCompare(p0, a, b) {
  var left = isLeft(p0, a, b);
  if (left == 0)
    return distCompare(p0, a, b);
  return left;
}
__name(angleCompare, "angleCompare");
function isLeft(p0, a, b) {
  return (a.x - p0.x) * (b.y - p0.y) - (b.x - p0.x) * (a.y - p0.y);
}
__name(isLeft, "isLeft");
function distCompare(p0, a, b) {
  var distA = (p0.x - a.x) * (p0.x - a.x) + (p0.y - a.y) * (p0.y - a.y);
  var distB = (p0.x - b.x) * (p0.x - b.x) + (p0.y - b.y) * (p0.y - b.y);
  return distA - distB;
}
__name(distCompare, "distCompare");
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
