webpackJsonp([1,4],{

/***/ 138:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(28)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 139:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(28)(false);
// imports


// module
exports.push([module.i, "#paper{\n    width: 600px;\n    height: 800px;\n    background-color: beige;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 140:
/***/ (function(module, exports) {

module.exports = "<h1>\n<app-sketch></app-sketch>\n</h1>\n"

/***/ }),

/***/ 141:
/***/ (function(module, exports) {

module.exports = "<div id=\"paper\">\n  <svg style=\"width: 100%; height: 100%;\" (mousedown)=\"handleMouseDown($event)\" (mousemove)=\"handleMove($event)\">\n  <svg:g *ngFor=\"let feature of features()\">\n    <svg:g *ngFor=\"let edge of feature.edges()\">\n        <line [attr.x1]=\"edge.start.x\" [attr.y1]=\"edge.start.y\" [attr.x2]=\"edge.end.x\" [attr.y2]=\"edge.end.y\" \n        [attr.stroke]=\"edge.color\"\n        style=\"stroke-width:2\"\n        />\n      </svg:g>\n    </svg:g>\n  </svg>\n</div>"

/***/ }),

/***/ 166:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(73);


/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Point; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Edge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return FoldFeature; });
var Point = (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());

// really just a straight line right now.
// #TODO: maybe just use svgpathelements
var Edge = (function () {
    function Edge(start, end) {
        this.start = start;
        this.end = end;
        this.color = "rgb(" + this.randomBetween(50, 255) + "," + this.randomBetween(50, 255) + "," + this.randomBetween(50, 255) + ")";
    }
    Edge.prototype.randomBetween = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    return Edge;
}());

var FoldFeature = (function () {
    function FoldFeature() {
    }
    FoldFeature.prototype.edges = function () {
        return [];
    };
    return FoldFeature;
}());

//# sourceMappingURL=fold-feature.js.map

/***/ }),

/***/ 72:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 72;


/***/ }),

/***/ 73:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(84);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 80:
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
        template: __webpack_require__(140),
        styles: [__webpack_require__(138)],
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 81:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sketch_sketch_component__ = __webpack_require__(83);
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

/***/ 82:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_app_fold_feature__ = __webpack_require__(49);
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
        _this.drivingFold = new __WEBPACK_IMPORTED_MODULE_0_app_fold_feature__["b" /* Edge */](new __WEBPACK_IMPORTED_MODULE_0_app_fold_feature__["a" /* Point */](0, 400), new __WEBPACK_IMPORTED_MODULE_0_app_fold_feature__["a" /* Point */](1000, 400));
        _this.start = start;
        _this.end = end;
        return _this;
    }
    BoxFold.prototype.moveEnd = function (to) {
        this.end = to;
    };
    BoxFold.prototype.edges = function () {
        // make h0, h1, and h2 first.  Then s0, s1, s2, e0, e1, e2....
        //
        //                  h0
        //            S- - - - -
        //         s0 |         | e0
        //            |     h1  |
        //            - - - - - -
        //         s1 |         | e1
        //     _ _ _ _|         |_ _ _ _ _ driving
        //            |         |
        //         s2 |     h2  | e2
        //            - - - - - E
        //
        // #TODO
        // otherwise, we only have 4 edges
        //
        //               h0
        //            S------
        //         s0 |      | e0
        //            |      |
        //            -------E
        //               h2
        var s0 = new __WEBPACK_IMPORTED_MODULE_0_app_fold_feature__["b" /* Edge */](this.start, new __WEBPACK_IMPORTED_MODULE_0_app_fold_feature__["a" /* Point */](this.start.x, this.end.y));
        var h0 = new __WEBPACK_IMPORTED_MODULE_0_app_fold_feature__["b" /* Edge */](this.start, new __WEBPACK_IMPORTED_MODULE_0_app_fold_feature__["a" /* Point */](this.end.x, this.start.y));
        var h2 = new __WEBPACK_IMPORTED_MODULE_0_app_fold_feature__["b" /* Edge */](this.end, new __WEBPACK_IMPORTED_MODULE_0_app_fold_feature__["a" /* Point */](this.start.x, this.end.y));
        var e0 = new __WEBPACK_IMPORTED_MODULE_0_app_fold_feature__["b" /* Edge */](this.end, new __WEBPACK_IMPORTED_MODULE_0_app_fold_feature__["a" /* Point */](this.end.x, this.start.y));
        var bisect = new __WEBPACK_IMPORTED_MODULE_0_app_fold_feature__["b" /* Edge */](this.start, this.end);
        return [s0, h0, h2, e0, this.drivingFold];
    };
    return BoxFold;
}(__WEBPACK_IMPORTED_MODULE_0_app_fold_feature__["c" /* FoldFeature */]));

//# sourceMappingURL=box-fold.js.map

/***/ }),

/***/ 83:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_fold_feature__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_box_fold__ = __webpack_require__(82);
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
    }
    SketchComponent.prototype.features = function () {
        if (this.currentFeature) {
            return [this.currentFeature];
        }
        return [];
    };
    ;
    SketchComponent.prototype.handleMouseDown = function (e) {
        var p = new __WEBPACK_IMPORTED_MODULE_1_app_fold_feature__["a" /* Point */](e.clientX, e.clientY);
        this.currentFeature = new __WEBPACK_IMPORTED_MODULE_2_app_box_fold__["a" /* BoxFold */](p, p);
    };
    SketchComponent.prototype.handleMove = function (e) {
        var p = new __WEBPACK_IMPORTED_MODULE_1_app_fold_feature__["a" /* Point */](e.clientX, e.clientY);
        if (this.currentFeature) {
            this.currentFeature.moveEnd(p);
        }
    };
    SketchComponent.prototype.ngOnInit = function () {
        console.error('meowr');
    };
    return SketchComponent;
}());
SketchComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'app-sketch',
        template: __webpack_require__(141),
        styles: [__webpack_require__(139)]
    }),
    __metadata("design:paramtypes", [])
], SketchComponent);

//# sourceMappingURL=sketch.component.js.map

/***/ }),

/***/ 84:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var environment = {
    production: true
};
//# sourceMappingURL=environment.js.map

/***/ })

},[166]);
//# sourceMappingURL=main.bundle.js.map