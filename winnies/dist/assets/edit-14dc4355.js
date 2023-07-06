import{n as a,u as r,j as e,N as n,H as o,O as d}from"./index-9a6f43dc.js";const i=({className:t})=>{const{t:s}=r(["settingPage"]);return e.jsx(e.Fragment,{children:e.jsx("nav",{className:t,children:e.jsxs("ul",{className:"p-2 flex gap-2",children:[e.jsx(n,{end:!0,to:"tx",children:s("nav.tx")}),e.jsx(n,{end:!0,to:"threshold",children:s("nav.threshold")}),e.jsx(n,{end:!0,to:"store",children:s("nav.store achieve")}),e.jsx(n,{end:!0,to:"osom",children:s("nav.osom achieve")})]})})})},c=a(i)`
    background-color: ${t=>t.theme.navBgc};

    a {
        border: 1px solid ${t=>t.theme.white};
        color: ${t=>t.theme.white};
        border-radius: .5rem;
        padding: .2em .5em;

        &.active {
            background-color: ${t=>t.theme.navActive};
        }
    }
`,h=()=>{const{t}=r(["settingPage"]);return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:t("title")}),e.jsx(c,{}),e.jsx(d,{})]})};export{h as default};
