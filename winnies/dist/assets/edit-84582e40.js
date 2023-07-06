import{n,u as o,j as e,N as s,H as a,O as c}from"./index-19d1e496.js";const l=({className:t})=>{const{t:r}=o(["settingPage"]);return e.jsx(e.Fragment,{children:e.jsx("nav",{className:t,children:e.jsxs("ul",{className:"p-2 flex gap-2",children:[e.jsx(s,{end:!0,to:"tx",children:r("nav.tx")}),e.jsx(s,{end:!0,to:"threshold",children:r("nav.threshold")}),e.jsx(s,{end:!0,to:"store",children:r("nav.store achieve")}),e.jsx(s,{end:!0,to:"osom",children:r("nav.osom achieve")})]})})})},d=n(l)`
    background-color: ${t=>t.theme.color.navBgc};

    a {
        border: 1px solid ${t=>t.theme.color.white};
        color: ${t=>t.theme.color.white};
        border-radius: .5rem;
        padding: .2em .5em;

        &.active {
            background-color: ${t=>t.theme.color.navActive};
        }
    }
`,h=()=>{const{t}=o(["settingPage"]);return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:t("title")}),e.jsx(d,{}),e.jsx(c,{})]})};export{h as default};
