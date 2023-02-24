"use strict";
exports.id = 272;
exports.ids = [272];
exports.modules = {

/***/ 7635:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9648);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_0__]);
axios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

const fetchClientTmdb = ()=>{
    const defaultOptions = {
        baseURL: process.env.API_URL || "https://api.themoviedb.org/3/"
    };
    // Create instance
    const instance = axios__WEBPACK_IMPORTED_MODULE_0__["default"].create(defaultOptions);
    return instance;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (fetchClientTmdb());

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2272:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "C6": () => (/* binding */ moviesByTopRated),
/* harmony export */   "Fo": () => (/* binding */ movieByString),
/* harmony export */   "sO": () => (/* binding */ movieById)
/* harmony export */ });
/* unused harmony export moviePoster */
/* harmony import */ var _axiosInstanceTmdb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7635);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_axiosInstanceTmdb__WEBPACK_IMPORTED_MODULE_0__]);
_axiosInstanceTmdb__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

const movieByString = {
    getAll: async (query)=>(await _axiosInstanceTmdb__WEBPACK_IMPORTED_MODULE_0__/* ["default"].get */ .Z.get(`/search/movie?api_key=${"dd1eb8ca85399a76f2c590a30e7e2364"}&query=${query}`)).data
};
const movieById = {
    getOne: async (id)=>(await _axiosInstanceTmdb__WEBPACK_IMPORTED_MODULE_0__/* ["default"].get */ .Z.get(`/movie/${id}?api_key=${"dd1eb8ca85399a76f2c590a30e7e2364"}&append_to_response=credits&language=fr-FR`)).data
};
const moviesByTopRated = {
    getAll: async ()=>(await _axiosInstanceTmdb__WEBPACK_IMPORTED_MODULE_0__/* ["default"].get */ .Z.get(`/movie/top_rated?api_key=${"dd1eb8ca85399a76f2c590a30e7e2364"}&language=fr-FR&page=1&append_to_response=credits`)).data
};
const moviePoster = {
    getOne: async (query)=>(await _axiosInstanceTmdb__WEBPACK_IMPORTED_MODULE_0__/* ["default"].get */ .Z.get(`https://image.tmdb.org/t/p/w500${query}`)).data
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;