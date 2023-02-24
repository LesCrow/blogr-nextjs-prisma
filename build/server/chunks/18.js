"use strict";
exports.id = 18;
exports.ids = [18];
exports.modules = {

/***/ 4018:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ components_Layout)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: external "next-auth/react"
var react_ = __webpack_require__(1649);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
;// CONCATENATED MODULE: ./components/Header.tsx
// Header.tsx






const Header = ()=>{
    const router = (0,router_.useRouter)();
    const isActive = (pathname)=>router.pathname === pathname;
    const { data: session , status  } = (0,react_.useSession)();
    let left = /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "left"
    });
    let right = null;
    // if (status === "loading") {
    //   left = (
    //     <div className="left">
    //       <Link href="/">
    //         <a className="bold" data-active={isActive("/")}>
    //           Feed
    //         </a>
    //       </Link>
    //       {/* <style jsx>{`
    //         .bold {
    //           font-weight: bold;
    //         }
    //         a {
    //           text-decoration: none;
    //           color: var(--geist-foreground);
    //           display: inline-block;
    //         }
    //         .left a[data-active="true"] {
    //           color: gray;
    //         }
    //         a + a {
    //           margin-left: 1rem;
    //         }
    //       `}</style> */}
    //     </div>
    //   );
    //   right = (
    //     <div className="right">
    //       <p>Validating session ...</p>
    //       {/* <style jsx>{`
    //         .right {
    //           margin-left: auto;
    //         }
    //       `}</style> */}
    //     </div>
    //   );
    // }
    if (!session) {
        right = /*#__PURE__*/ jsx_runtime_.jsx("div", {
            className: "ml-auto ",
            children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                href: "/api/auth/signin",
                children: /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                    className: "cursor-pointer",
                    src: "/pictos/log-in.png",
                    width: 50,
                    height: 50,
                    alt: "Log in"
                })
            })
        });
    }
    if (session) {
        right = /*#__PURE__*/ jsx_runtime_.jsx("div", {
            className: "ml-auto flex",
            children: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                onClick: ()=>(0,react_.signOut)(),
                children: /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                    src: "/pictos/turn-off.png",
                    width: 30,
                    height: 30,
                    alt: "Log out"
                })
            })
        });
    }
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("nav", {
        className: "min-h-[90px] flex px-6 pt-6 pb-4 border-b-2 border-black bg-primary sticky top-0 ",
        children: [
            left,
            right
        ]
    });
};
/* harmony default export */ const components_Header = (Header);

// EXTERNAL MODULE: external "react-burger-menu"
var external_react_burger_menu_ = __webpack_require__(6615);
;// CONCATENATED MODULE: ./components/Sidebar.tsx





function Sidebar() {
    const [menuOpen, setMenuOpen] = (0,external_react_.useState)(false);
    const handleCloseMenu = ()=>{
        setMenuOpen(!menuOpen);
    };
    return /*#__PURE__*/ jsx_runtime_.jsx(external_react_burger_menu_.slide, {
        isOpen: menuOpen,
        onOpen: handleCloseMenu,
        customBurgerIcon: /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
            className: "cursor-pointer",
            src: "/pictos/mov.png",
            width: 40,
            height: 40,
            alt: "Menu"
        }),
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "space-y-4 text-3xl",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                    onClick: handleCloseMenu,
                    href: "/",
                    children: "HOME"
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("br", {}),
                /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                    onClick: handleCloseMenu,
                    href: "/mylist",
                    children: "MA LISTE"
                })
            ]
        })
    });
}

;// CONCATENATED MODULE: ./components/Layout.tsx




const Layout = (props)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(components_Header, {}),
            /*#__PURE__*/ jsx_runtime_.jsx(Sidebar, {}),
            props.children
        ]
    });
/* harmony default export */ const components_Layout = (Layout);


/***/ })

};
;