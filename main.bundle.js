webpackJsonp([1,4],{

/***/ 144:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(29)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 145:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(29)(false);
// imports


// module
exports.push([module.i, "#paper{\n    width: 600px;\n    height: 800px;\n    background-color: beige;\n}\n\n#threeD{\n    position: absolute;\n    left: 630px;\n    top: 30px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 146:
/***/ (function(module, exports) {

module.exports = "<h1>\n<app-sketch></app-sketch>\n</h1>\n"

/***/ }),

/***/ 147:
/***/ (function(module, exports) {

module.exports = "<div id=\"paper\">\n  <svg style=\"width: 100%; height: 100%;\" (mousedown)=\"handleMouseDown($event)\" (mouseup)=\"handleMouseUp($event)\" (mousemove)=\"handleMove($event)\">\n    <svg:g [attr.id]=\"i\" *ngFor=\"let feature of features()\">\n      <ng-container *ngFor=\"let plane of feature.planes()\">\n        <polygon [attr.points]=\"plane.svgPoints()\" [attr.fill]=\"plane.svgColor()\" style=\"stroke-width:2\" />\n      </ng-container>\n      <ng-container *ngFor=\"let edge of feature.edges()\">\n        <line [attr.x1]=\"edge.start.x\" [attr.y1]=\"edge.start.y\" [attr.x2]=\"edge.end.x\" [attr.y2]=\"edge.end.y\" [attr.stroke]=\"edge.color\"\n          style=\"stroke-width:2\" fill-rule=\"evenodd\" />\n      </ng-container>\n    </svg:g>\n  </svg>\n  <div id=\"threeD\">\n    <div #container></div>\n  </div>\n</div>"

/***/ }),

/***/ 173:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(77);


/***/ }),

/***/ 31:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Point; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return EdgeKind; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Edge; });
var Point = (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());

var EdgeKind;
(function (EdgeKind) {
    EdgeKind[EdgeKind["Fold"] = 0] = "Fold";
    EdgeKind[EdgeKind["Cut"] = 1] = "Cut";
})(EdgeKind || (EdgeKind = {}));
// really just a straight line right now.
// #TODO: maybe just use svgpathelements
var Edge = (function () {
    function Edge(start, end, kind) {
        if (kind === void 0) { kind = EdgeKind.Cut; }
        this.start = start;
        this.end = end;
        this.kind = kind;
        this.color = this.edgeColor(this.kind);
    }
    // TODO move this to view layer
    Edge.prototype.edgeColor = function (kind) {
        switch (kind) {
            case EdgeKind.Cut:
                return "rgb(" + this.randomBetween(50, 255) + "," + this.randomBetween(0, 0) + "," + this.randomBetween(0, 255) + ")";
            case EdgeKind.Fold:
                return "rgb(" + this.randomBetween(0, 0) + "," + this.randomBetween(100, 255) + "," + this.randomBetween(0, 0) + ")";
        }
    };
    Edge.prototype.randomBetween = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    Edge.prototype.reverse = function () {
        return new Edge(this.end, this.start);
    };
    return Edge;
}());

//# sourceMappingURL=edge.js.map

/***/ }),

/***/ 32:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return OrientationKind; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Plane; });


var OrientationKind;
(function (OrientationKind) {
    OrientationKind[OrientationKind["Vertical"] = 0] = "Vertical";
    OrientationKind[OrientationKind["Horizontal"] = 1] = "Horizontal";
})(OrientationKind || (OrientationKind = {}));
var Plane = (function () {
    function Plane(edges, orientation) {
        this.points = [];
        for (var _i = 0, edges_1 = edges; _i < edges_1.length; _i++) {
            var edge = edges_1[_i];
            this.points.push(edge.start);
        }
        this.pivotPoint = __WEBPACK_IMPORTED_MODULE_1_lodash__["minBy"](this.points, function (p) { return p.x + p.y; });
        this.orientation = orientation;
        this.color = this.randomColor();
    }
    Plane.prototype.svgColor = function () {
        return "rgb(" + this.color.r * 255 + "," + this.color.g * 255 + "," + this.color.b * 255 + ")";
    };
    Plane.prototype.randomColor = function () {
        switch (this.orientation) {
            case OrientationKind.Horizontal:
                return new __WEBPACK_IMPORTED_MODULE_0_three__["k" /* Color */](this.randomBetween(20, 200) / 255, this.randomBetween(255, 255) / 255, this.randomBetween(255, 255) / 255);
            case OrientationKind.Vertical:
                return new __WEBPACK_IMPORTED_MODULE_0_three__["k" /* Color */](this.randomBetween(255, 255) / 255, this.randomBetween(20, 200) / 255, this.randomBetween(255, 255) / 255);
        }
    };
    Plane.prototype.randomBetween = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    Plane.prototype.svgPoints = function () {
        return this.points.map(function (p) {
            return p.x + "," + p.y;
        }).join(" ");
    };
    return Plane;
}());

//# sourceMappingURL=plane.js.map

/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FoldFeature; });
var FoldFeature = (function () {
    function FoldFeature() {
        this.children = [];
    }
    FoldFeature.prototype.edges = function () {
        return [];
    };
    FoldFeature.prototype.folds = function () {
        return [];
    };
    FoldFeature.prototype.planes = function () {
        return [];
    };
    FoldFeature.prototype.setDriver = function (fold) {
        this.drivingFold = fold;
    };
    FoldFeature.prototype.addChild = function (feature) {
        this.children.push(feature);
    };
    FoldFeature.prototype.spansFold = function (e) {
        return false;
    };
    return FoldFeature;
}());

//# sourceMappingURL=fold-feature.js.map

/***/ }),

/***/ 76:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 76;


/***/ }),

/***/ 77:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(90);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 84:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app works!';
    }
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__(146),
        styles: [__webpack_require__(144)],
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 85:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sketch_sketch_component__ = __webpack_require__(88);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_5__sketch_sketch_component__["a" /* SketchComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */]
        ],
        providers: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]],
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 86:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_app_fold_feature__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_edge__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_plane__ = __webpack_require__(32);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BoxFold; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var BoxFold = (function (_super) {
    __extends(BoxFold, _super);
    function BoxFold(start, end) {
        var _this = _super.call(this) || this;
        _this.start = start;
        _this.end = end;
        return _this;
    }
    BoxFold.prototype.moveEnd = function (to) {
        if (to != this.end) {
            this.end = to;
            delete this.cachedEdges;
        }
    };
    BoxFold.prototype.edges = function () {
        // make h0, and h2 first because they always exist.
        var es = [];
        if (this.cachedEdges) {
            return this.cachedEdges;
        }
        this.cachedPlanes = [];
        var h0 = new __WEBPACK_IMPORTED_MODULE_1_app_edge__["b" /* Edge */](this.start, new __WEBPACK_IMPORTED_MODULE_1_app_edge__["a" /* Point */](this.end.x, this.start.y), __WEBPACK_IMPORTED_MODULE_1_app_edge__["c" /* EdgeKind */].Fold);
        var h2 = new __WEBPACK_IMPORTED_MODULE_1_app_edge__["b" /* Edge */](this.end, new __WEBPACK_IMPORTED_MODULE_1_app_edge__["a" /* Point */](this.start.x, this.end.y), __WEBPACK_IMPORTED_MODULE_1_app_edge__["c" /* EdgeKind */].Fold);
        //
        //                  h0
        //            S- - - - -
        //         s0 |         | e0
        //            |     h1  |
        //            - - -< - - 
        //         s1 |         | e1
        //     _ _ _ _|         |_ _ _ _ _ driving
        //            |         |
        //            |     h2  | 
        //            - - - - - E
        //
        // if box spans driving fold
        if (this.drivingFold) {
            var drivingY = this.drivingFold.start.y;
            // h1 is translated by 
            var offsetY = drivingY - this.start.y;
            var h1 = new __WEBPACK_IMPORTED_MODULE_1_app_edge__["b" /* Edge */](new __WEBPACK_IMPORTED_MODULE_1_app_edge__["a" /* Point */](this.end.x, this.end.y - offsetY), new __WEBPACK_IMPORTED_MODULE_1_app_edge__["a" /* Point */](this.start.x, this.end.y - offsetY), __WEBPACK_IMPORTED_MODULE_1_app_edge__["c" /* EdgeKind */].Fold);
            var e0 = new __WEBPACK_IMPORTED_MODULE_1_app_edge__["b" /* Edge */](h0.end, h1.start);
            var s0 = new __WEBPACK_IMPORTED_MODULE_1_app_edge__["b" /* Edge */](h1.end, this.start);
            var e1 = new __WEBPACK_IMPORTED_MODULE_1_app_edge__["b" /* Edge */](h1.start, this.end);
            var s1 = new __WEBPACK_IMPORTED_MODULE_1_app_edge__["b" /* Edge */](h2.end, h1.end);
            es.push(h0, e0, h1, s0, e1, h2, s1);
            this.cachedPlanes.push(new __WEBPACK_IMPORTED_MODULE_2_app_plane__["a" /* Plane */]([h0, e0, h1, s0], __WEBPACK_IMPORTED_MODULE_2_app_plane__["b" /* OrientationKind */].Horizontal));
            this.cachedPlanes.push(new __WEBPACK_IMPORTED_MODULE_2_app_plane__["a" /* Plane */]([e1, h2, s1, h1.reverse()], __WEBPACK_IMPORTED_MODULE_2_app_plane__["b" /* OrientationKind */].Vertical));
        }
        else {
            // otherwise, we only have 4 edges
            //
            //               h0
            //            S------
            //         s0 |      | e0
            //            |      |
            //            -------E
            //               h2
            var s0 = new __WEBPACK_IMPORTED_MODULE_1_app_edge__["b" /* Edge */](h2.end, this.start);
            var e0 = new __WEBPACK_IMPORTED_MODULE_1_app_edge__["b" /* Edge */](h0.end, this.end);
            h0.kind = __WEBPACK_IMPORTED_MODULE_1_app_edge__["c" /* EdgeKind */].Cut;
            h2.kind = __WEBPACK_IMPORTED_MODULE_1_app_edge__["c" /* EdgeKind */].Cut;
            es.push(h0, e0, h2, s0);
            this.cachedPlanes.push(new __WEBPACK_IMPORTED_MODULE_2_app_plane__["a" /* Plane */](es, __WEBPACK_IMPORTED_MODULE_2_app_plane__["b" /* OrientationKind */].Vertical));
        }
        this.cachedEdges = es;
        return es;
    };
    BoxFold.prototype.planes = function () {
        // calculate cached edges, which calculates planes as a side effect
        this.edges();
        return this.cachedPlanes;
    };
    BoxFold.prototype.spansFold = function (e) {
        var minY = Math.min(this.start.y, this.end.y);
        var maxY = Math.max(this.start.y, this.end.y);
        var drivingY = e.start.y;
        var minX = Math.min(this.start.x, this.end.x);
        var maxX = Math.max(this.start.x, this.end.x);
        var minDrivingX = Math.min(e.start.x, e.end.x);
        var maxDrivingX = Math.max(e.start.x, e.end.x);
        return minY < drivingY && maxY > drivingY && minDrivingX < minX && maxDrivingX > maxX;
    };
    BoxFold.prototype.folds = function () {
        return this.edges().filter(function (e) { return e.kind == __WEBPACK_IMPORTED_MODULE_1_app_edge__["c" /* EdgeKind */].Fold; });
    };
    return BoxFold;
}(__WEBPACK_IMPORTED_MODULE_0_app_fold_feature__["a" /* FoldFeature */]));

//# sourceMappingURL=box-fold.js.map

/***/ }),

/***/ 87:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_app_fold_feature__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_edge__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_plane__ = __webpack_require__(32);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Card; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var Card = (function (_super) {
    __extends(Card, _super);
    function Card(width, height) {
        var _this = _super.call(this) || this;
        _this.cachedPlanes = [];
        _this.h1 = new __WEBPACK_IMPORTED_MODULE_1_app_edge__["b" /* Edge */](new __WEBPACK_IMPORTED_MODULE_1_app_edge__["a" /* Point */](0, height / 2), new __WEBPACK_IMPORTED_MODULE_1_app_edge__["a" /* Point */](width, height / 2), __WEBPACK_IMPORTED_MODULE_1_app_edge__["c" /* EdgeKind */].Fold);
        _this.s0 = new __WEBPACK_IMPORTED_MODULE_1_app_edge__["b" /* Edge */](new __WEBPACK_IMPORTED_MODULE_1_app_edge__["a" /* Point */](0, 0), _this.h1.start);
        _this.e0 = new __WEBPACK_IMPORTED_MODULE_1_app_edge__["b" /* Edge */](_this.h1.end, new __WEBPACK_IMPORTED_MODULE_1_app_edge__["a" /* Point */](width, 0));
        _this.h0 = new __WEBPACK_IMPORTED_MODULE_1_app_edge__["b" /* Edge */](_this.e0.end, _this.s0.start);
        _this.e1 = new __WEBPACK_IMPORTED_MODULE_1_app_edge__["b" /* Edge */](_this.h1.end, new __WEBPACK_IMPORTED_MODULE_1_app_edge__["a" /* Point */](width, height));
        _this.h2 = new __WEBPACK_IMPORTED_MODULE_1_app_edge__["b" /* Edge */](_this.e1.end, new __WEBPACK_IMPORTED_MODULE_1_app_edge__["a" /* Point */](0, height));
        _this.s1 = new __WEBPACK_IMPORTED_MODULE_1_app_edge__["b" /* Edge */](_this.h2.end, _this.h1.start);
        _this.centerFold = _this.h1;
        _this.cachedPlanes.push(new __WEBPACK_IMPORTED_MODULE_2_app_plane__["a" /* Plane */]([_this.s0, _this.h1, _this.e0, _this.h0], __WEBPACK_IMPORTED_MODULE_2_app_plane__["b" /* OrientationKind */].Vertical));
        _this.cachedPlanes.push(new __WEBPACK_IMPORTED_MODULE_2_app_plane__["a" /* Plane */]([_this.h1, _this.e1, _this.h2, _this.s1], __WEBPACK_IMPORTED_MODULE_2_app_plane__["b" /* OrientationKind */].Horizontal));
        return _this;
    }
    Card.prototype.edges = function () {
        return [this.s0, this.h1, this.e0, this.h0, this.e1, this.h2, this.s1];
    };
    Card.prototype.folds = function () {
        return [this.centerFold];
    };
    Card.prototype.planes = function () {
        return this.cachedPlanes;
    };
    Card.prototype.spansFold = function (e) {
        return false;
    };
    return Card;
}(__WEBPACK_IMPORTED_MODULE_0_app_fold_feature__["a" /* FoldFeature */]));

//# sourceMappingURL=card.js.map

/***/ }),

/***/ 88:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_box_fold__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_card__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_edge__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_sketch_sketch3d__ = __webpack_require__(89);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SketchComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SketchComponent = (function () {
    function SketchComponent() {
        this.previousFeatures = [];
        var card = new __WEBPACK_IMPORTED_MODULE_2_app_card__["a" /* Card */](600, 800);
        this.previousFeatures.push(card);
    }
    SketchComponent.prototype.features = function () {
        var features = this.previousFeatures;
        if (this.currentFeature) {
            features = features.concat(this.currentFeature);
        }
        return features;
    };
    ;
    SketchComponent.prototype.handleMouseDown = function (e) {
        var p = new __WEBPACK_IMPORTED_MODULE_3_app_edge__["a" /* Point */](e.clientX, e.clientY);
        this.currentFeature = new __WEBPACK_IMPORTED_MODULE_1_app_box_fold__["a" /* BoxFold */](p, p);
    };
    SketchComponent.prototype.handleMouseUp = function (e) {
        this.sketch3d.addFeature(this.currentFeature);
        this.previousFeatures.push(this.currentFeature);
        delete this.currentFeature;
    };
    SketchComponent.prototype.handleMove = function (e) {
        if (this.currentFeature) {
            var p = new __WEBPACK_IMPORTED_MODULE_3_app_edge__["a" /* Point */](e.clientX, e.clientY);
            if (!this.currentFeature.drivingFold || !this.currentFeature.spansFold(this.currentFeature.drivingFold)) {
                delete this.currentFeature.drivingFold;
                // reversing previous features for now — will eventually split all the driving potential folds
                outer: for (var _i = 0, _a = this.previousFeatures; _i < _a.length; _i++) {
                    var feature = _a[_i];
                    for (var _b = 0, _c = feature.folds(); _b < _c.length; _b++) {
                        var fold = _c[_b];
                        if (this.currentFeature.spansFold(fold)) {
                            feature.addChild(this.currentFeature);
                            this.currentFeature.setDriver(fold);
                            break outer;
                        }
                    }
                }
            }
            this.currentFeature.moveEnd(p);
        }
    };
    SketchComponent.prototype.ngOnInit = function () {
        console.log(this.elementRef);
        this.container = this.elementRef.nativeElement;
        this.sketch3d = new __WEBPACK_IMPORTED_MODULE_5_app_sketch_sketch3d__["a" /* Sketch3d */](__WEBPACK_IMPORTED_MODULE_4_lodash__["flatten"](this.features()), this.container);
        this.sketch3d.init();
        this.sketch3d.addFeature(this.previousFeatures[0]);
    };
    return SketchComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* ViewChild */])('container'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* ElementRef */]) === "function" && _a || Object)
], SketchComponent.prototype, "elementRef", void 0);
SketchComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({
        selector: 'app-sketch',
        template: __webpack_require__(147),
        styles: [__webpack_require__(145)]
    }),
    __metadata("design:paramtypes", [])
], SketchComponent);

var _a;
//# sourceMappingURL=sketch.component.js.map

/***/ }),

/***/ 89:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_app_plane__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_three__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_lodash__);
/* unused harmony export Plane3d */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Sketch3d; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var Plane3d = (function (_super) {
    __extends(Plane3d, _super);
    function Plane3d() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Plane3d;
}(__WEBPACK_IMPORTED_MODULE_0_app_plane__["a" /* Plane */]));

var Sketch3d = (function () {
    function Sketch3d(features, container) {
        this.planes = [];
        this.features = features;
        this.container = container;
    }
    Sketch3d.prototype.addFeature = function (feature) {
        this.features.push(feature);
        this.features = [feature];
        this.planes = __WEBPACK_IMPORTED_MODULE_2_lodash__["flatten"](this.features.map(function (feature) { return feature.planes(); }));
        // const plane = planes[0];
        for (var _i = 0, _a = this.planes; _i < _a.length; _i++) {
            var plane = _a[_i];
            var planeShape = new __WEBPACK_IMPORTED_MODULE_1_three__["a" /* Shape */]();
            planeShape.moveTo(plane.points[0].x, -plane.points[0].y);
            for (var _b = 0, _c = plane.points; _b < _c.length; _b++) {
                var point = _c[_b];
                planeShape.lineTo(point.x, -point.y);
            }
            var extrudeSettings = { amount: 1, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
            var geometry = new __WEBPACK_IMPORTED_MODULE_1_three__["b" /* ExtrudeGeometry */](planeShape, extrudeSettings);
            // geometry.rotateX(THREE.Math.degToRad(180));
            // let geometry = new THREE.PlaneGeometry(10, 5),
            var material = new __WEBPACK_IMPORTED_MODULE_1_three__["c" /* MeshPhongMaterial */]({ color: plane.color });
            // this.plane = 
            plane.mesh = new __WEBPACK_IMPORTED_MODULE_1_three__["d" /* Mesh */](geometry, material);
            var s = plane.pivotPoint;
            var scalingFactor = 0.009;
            plane.mesh.scale.set(scalingFactor, scalingFactor, scalingFactor);
            plane.mesh.position.set(0, 0, 0).set(-s.x, s.y, 0).multiplyScalar(scalingFactor);
            this.camera.lookAt(plane.mesh.position);
            var pointGeo = new __WEBPACK_IMPORTED_MODULE_1_three__["e" /* SphereGeometry */](0.1);
            var pointMesh = new __WEBPACK_IMPORTED_MODULE_1_three__["d" /* Mesh */](pointGeo, new __WEBPACK_IMPORTED_MODULE_1_three__["c" /* MeshPhongMaterial */]({ color: plane.color }));
            pointMesh.position.set(s.x, -s.y, 0).multiplyScalar(scalingFactor);
            plane.pivot = pointMesh;
            this.scene.add(pointMesh);
            pointMesh.add(plane.mesh);
            // this.scene.add(plane.mesh);
            // pointMesh.add(plane.mesh)
        }
        this.render();
    };
    Sketch3d.prototype.rotateAboutPoint = function (obj, point, axis, theta, pointIsWorld) {
        pointIsWorld = (pointIsWorld === undefined) ? false : pointIsWorld;
        if (pointIsWorld) {
            obj.parent.localToWorld(obj.position); // compensate for world coordinate
        }
        obj.position.sub(point); // remove the offset
        obj.position.applyAxisAngle(axis, theta); // rotate the POSITION
        obj.position.add(point); // re-add the offset
        if (pointIsWorld) {
            obj.parent.worldToLocal(obj.position); // undo world coordinates compensation
        }
        obj.rotateOnAxis(axis, theta); // rotate the OBJECT
    };
    Sketch3d.prototype.init = function () {
        var screen = {
            width: 600,
            height: 800
        }, view = {
            angle: 45,
            aspect: screen.width / screen.height,
            near: 0.1,
            far: 10000
        };
        this.scene = new __WEBPACK_IMPORTED_MODULE_1_three__["f" /* Scene */]();
        this.camera = new __WEBPACK_IMPORTED_MODULE_1_three__["g" /* PerspectiveCamera */](view.angle, view.aspect, view.near, view.far);
        this.renderer = new __WEBPACK_IMPORTED_MODULE_1_three__["h" /* WebGLRenderer */]();
        this.scene.add(this.camera);
        this.scene.add(new __WEBPACK_IMPORTED_MODULE_1_three__["i" /* AxisHelper */](2));
        this.camera.position.set(10, 0, 20);
        this.renderer.setSize(screen.width, screen.height);
        this.container.appendChild(this.renderer.domElement);
        var light = new __WEBPACK_IMPORTED_MODULE_1_three__["j" /* PointLight */](0xffffff, 8, 100);
        light.position.set(50, 50, 50);
        this.scene.add(light);
        this.render();
    };
    Sketch3d.prototype.render = function () {
        var self = this;
        (function render() {
            requestAnimationFrame(render);
            self.renderer.render(self.scene, self.camera);
            self.animate();
        }());
    };
    Sketch3d.prototype.animate = function () {
        for (var _i = 0, _a = this.planes; _i < _a.length; _i++) {
            var plane = _a[_i];
            switch (plane.orientation) {
                case __WEBPACK_IMPORTED_MODULE_0_app_plane__["b" /* OrientationKind */].Vertical:
                    // plane.pivot.rotateX(-0.01);
                    break;
                case __WEBPACK_IMPORTED_MODULE_0_app_plane__["b" /* OrientationKind */].Horizontal:
                    plane.pivot.rotateX(-0.01);
                    break;
            }
            // console.log(pointMesh.getWorldPosition());
            // var pad2 = new THREE.Vector3(e.x, e.y, 0);
            // const rawr = (pad1.add(pad2)).multiplyScalar(0.5);
            // dir.subVectors(new THREE.Vector3(s.x, s.y, 0), new THREE.Vector3(e.x, e.y, 0));
            // plane.mesh.rotateOnAxis(dir,0.01)
            // plane.mesh.rotateOnAxis(dir,0.01);
            // var geometry = new THREE.Geometry();
            // geometry.vertices.push(pad1);
            // geometry.vertices.push(pad2);
            // var line = new THREE.Line(geometry, new THREE.LineBasicMaterial());
            // this.camera.lookAt(line.aab);
            // renderer.render(scene, camera);
        }
    };
    return Sketch3d;
}());

//# sourceMappingURL=sketch3d.js.map

/***/ }),

/***/ 90:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var environment = {
    production: true
};
//# sourceMappingURL=environment.js.map

/***/ })

},[173]);
//# sourceMappingURL=main.bundle.js.map