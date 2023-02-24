"use strict";
exports.id = 896;
exports.ids = [896];
exports.modules = {

/***/ 6880:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9648);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_0__]);
axios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

const fetchClient = ()=>{
    const defaultOptions = {
        baseURL: "http://localhost:3000/api/" || 0
    };
    // Create instance
    const instance = axios__WEBPACK_IMPORTED_MODULE_0__["default"].create(defaultOptions);
    return instance;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (fetchClient());

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6353:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Dm": () => (/* binding */ releaseDate),
/* harmony export */   "aA": () => (/* binding */ runtimeToHours),
/* harmony export */   "c1": () => (/* binding */ srcImage)
/* harmony export */ });
const releaseDate = (release_date)=>{
    return new Date(release_date).getFullYear();
};
const runtimeToHours = (runtime)=>{
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}min`;
};
const srcImage = (url)=>{
    if (url !== null) {
        return `https://image.tmdb.org/t/p/w500${url}`;
    }
    return "/pictos/no-image.jpg";
};


/***/ }),

/***/ 4205:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "b": () => (/* binding */ movieFetcher),
/* harmony export */   "d": () => (/* binding */ getMovieByApiId)
/* harmony export */ });
/* harmony import */ var _axiosInstance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6880);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_axiosInstance__WEBPACK_IMPORTED_MODULE_0__]);
_axiosInstance__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

const getMovieByApiId = {
    getOne: async (api_id)=>await (await _axiosInstance__WEBPACK_IMPORTED_MODULE_0__/* ["default"].get */ .Z.get(`/movies?api_id=${api_id}`)).data
};
const movieFetcher = {
    getAll: async ()=>(await _axiosInstance__WEBPACK_IMPORTED_MODULE_0__/* ["default"].get */ .Z.get("movies")).data,
    post: async (api_id, alreadySeen, favourite)=>await _axiosInstance__WEBPACK_IMPORTED_MODULE_0__/* ["default"].post */ .Z.post("movies", {
            api_id: api_id,
            alreadySeen: alreadySeen,
            favourite: favourite
        }),
    update: async (id, favourite, alreadySeen)=>await _axiosInstance__WEBPACK_IMPORTED_MODULE_0__/* ["default"].put */ .Z.put(`movies/${id}`, {
            alreadySeen: alreadySeen,
            favourite: favourite
        })
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;