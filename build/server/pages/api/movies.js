"use strict";
(() => {
var exports = {};
exports.id = 853;
exports.ids = [853];
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

/***/ 2979:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3533);

const handler = async (req, res)=>{
    const { method  } = req;
    const { api_id  } = req.query;
    const parsedApi_id = parseInt(api_id);
    switch(method){
        case "GET":
            if (parsedApi_id) {
                try {
                    const movies = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__/* ["default"].movie.findMany */ .Z.movie.findMany({
                        where: {
                            api_id: parsedApi_id
                        }
                    });
                    res.status(200).json(movies);
                } catch (error) {
                    console.log(error);
                    res.status(500).json({
                        message: error
                    });
                }
                break;
            }
            try {
                const movies = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__/* ["default"].movie.findMany */ .Z.movie.findMany({});
                res.status(200).json(movies);
            } catch (error) {
                console.log(error);
                res.status(500).json({
                    message: error
                });
            }
            break;
        case "POST":
            try {
                const { api_id , alreadySeen , favourite  } = req.body;
                const newBook = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__/* ["default"].movie.create */ .Z.movie.create({
                    data: {
                        api_id: api_id,
                        alreadySeen: alreadySeen,
                        favourite: favourite
                    }
                });
                res.status(200).json(newBook);
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
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(2979));
module.exports = __webpack_exports__;

})();