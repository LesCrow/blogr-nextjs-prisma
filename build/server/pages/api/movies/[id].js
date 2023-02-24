"use strict";
(() => {
var exports = {};
exports.id = 900;
exports.ids = [900];
exports.modules = {

/***/ 3533:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ lib_prisma)
});

;// CONCATENATED MODULE: external "@prisma/client"
const client_namespaceObject = require("@prisma/client");
;// CONCATENATED MODULE: ./lib/prisma.ts
// lib/prisma.ts

let prisma;
if (true) {
    prisma = new client_namespaceObject.PrismaClient();
} else {}
/* harmony default export */ const lib_prisma = (prisma);


/***/ }),

/***/ 3307:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3533);

const handler = async (req, res)=>{
    const { method  } = req;
    const { id  } = req.query;
    switch(method){
        case "GET":
            try {
                const movie = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__/* ["default"].movie.findUniqueOrThrow */ .Z.movie.findUniqueOrThrow({
                    where: {
                        id: id
                    }
                });
                res.status(200).json(movie);
            } catch (error) {
                console.log(error);
                res.status(500).json({
                    message: error
                });
            }
            break;
        case "PUT":
            try {
                const { alreadySeen , favourite  } = req.body;
                const updatedMovie = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__/* ["default"].movie.update */ .Z.movie.update({
                    where: {
                        id: id
                    },
                    data: {
                        alreadySeen: alreadySeen,
                        favourite: favourite
                    }
                });
                res.status(200).json(updatedMovie);
            } catch (error) {
                console.log(error);
                res.status(500).json({
                    message: error
                });
            }
            break;
        case "DELETE":
            try {
                const deletedMovie = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__/* ["default"].movie["delete"] */ .Z.movie["delete"]({
                    where: {
                        id: id
                    }
                });
                res.status(200).json(deletedMovie);
            } catch (error) {
                console.log(error);
                res.status(500).json({
                    message: error
                });
            }
            break;
        default:
            res.status(405).end(`Method ${method} Not Allowed`);
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handler);


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(3307));
module.exports = __webpack_exports__;

})();