webpackJsonp([1,4],{

/***/ 141:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(28)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 142:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(28)(false);
// imports


// module
exports.push([module.i, "#paper{\n    width: 600px;\n    height: 800px;\n    background-color: beige;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 143:
/***/ (function(module, exports) {

module.exports = "<h1>\n<app-sketch></app-sketch>\n</h1>\n"

/***/ }),

/***/ 144:
/***/ (function(module, exports) {

module.exports = "<div id=\"paper\">\n  <svg style=\"width: 100%; height: 100%;\" (mousedown)=\"handleMouseDown($event)\" (mouseup)=\"handleMouseUp($event)\" (mousemove)=\"handleMove($event)\">\n    <svg:g [attr.id]=\"i\" *ngFor=\"let feature of features()\">\n      <ng-container *ngFor=\"let plane of feature.planes()\">\n        <polygon [attr.points]=\"plane.svgPoints()\" [attr.fill]=\"plane.color\" style=\"stroke-width:2\" />\n      </ng-container>\n      <ng-container *ngFor=\"let edge of feature.edges()\">\n        <line [attr.x1]=\"edge.start.x\" [attr.y1]=\"edge.start.y\" [attr.x2]=\"edge.end.x\" [attr.y2]=\"edge.end.y\" [attr.stroke]=\"edge.color\"\n          style=\"stroke-width:2\" fill-rule=\"evenodd\" />\n      </ng-container>\n    </svg:g>\n  </svg>\n</div>"

/***/ }),

/***/ 169:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(75);


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

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FoldFeature; });
var FoldFeature = (function () {
    function FoldFeature() {
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
    FoldFeature.prototype.spansFold = function (e) {
        return false;
    };
    return FoldFeature;
}());

//# sourceMappingURL=fold-feature.js.map

/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
        this.orientation = orientation;
        this.color = this.randomColor();
    }
    Plane.prototype.randomColor = function () {
        switch (this.orientation) {
            case OrientationKind.Horizontal:
                return "rgb(" + this.randomBetween(240, 250) + "," + this.randomBetween(255, 255) + "," + this.randomBetween(255, 255) + ")";
            case OrientationKind.Vertical:
                return "rgb(" + this.randomBetween(255, 255) + "," + this.randomBetween(240, 250) + "," + this.randomBetween(255, 255) + ")";
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

/***/ 74:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 74;


/***/ }),

/***/ 75:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(87);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 82:
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__(143),
        styles: [__webpack_require__(141)],
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 83:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sketch_sketch_component__ = __webpack_require__(86);
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

/***/ 84:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_app_fold_feature__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_edge__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_plane__ = __webpack_require__(51);
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

/***/ 85:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_app_fold_feature__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_edge__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_plane__ = __webpack_require__(51);
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

/***/ 86:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_box_fold__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_card__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_edge__ = __webpack_require__(31);
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
    };
    return SketchComponent;
}());
SketchComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'app-sketch',
        template: __webpack_require__(144),
        styles: [__webpack_require__(142)]
    }),
    __metadata("design:paramtypes", [])
], SketchComponent);

//# sourceMappingURL=sketch.component.js.map

/***/ }),

/***/ 87:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var environment = {
    production: true
};
//# sourceMappingURL=environment.js.map

/***/ })

},[169]);
//# sourceMappingURL=main.bundle.js.map