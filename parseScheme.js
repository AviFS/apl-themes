G = [
    // t: token type, a short key for storing customisations
    // s: string to display in the UI
    // c: css selector -- will be prefixed with "#col_cm" or ".ride_win" unless /*noprefix*/ is present
    // m: monaco theme token name
    // ctrls: what UI controls should be shown or hidden for this group (other than the default ones)
    {s:'assignment'      ,t:'asgn',m:'keyword.operator.assignment'}, //←
    {s:'autocomplete sel',t:'acsl',e:'editorSuggestWidget.selectedBackground', ctrls:{bg:1,BIU:0,fg:0}},
    {s:'bracket'         ,t:'sqbr',m:'delimiter.square'}, //[]
    {s:'comment'         ,t:'com' ,m:'comment'}, //⍝
    {s:'cursor'          ,t:'cur' ,e:'editorCursor.foreground', ctrls:{bg:0,BIU:0,fg:1}},
    {s:'curly braces'    ,t:'cubr',m:'delimiter.curly'}, //{}
    {s:'dfn-level1'     ,t:'dfn1',m:'identifier.dfn.1'}, //{}
    {s:'dfn-level2'     ,t:'dfn2',m:'identifier.dfn.2'},
    {s:'dfn-level3'     ,t:'dfn3',m:'identifier.dfn.3'},
    {s:'dfn-level4'     ,t:'dfn4',m:'identifier.dfn.4'},
    {s:'dfn-level5'     ,t:'dfn5',m:'identifier.dfn.5'}, //{1 {2 {3 {4 {5} } } } }
    {s:'dfn'             ,t:'dfn' ,m:'identifier.dfn'},
    {s:'diamond'         ,t:'diam',m:'delimiter.diamond'}, //⋄
    {s:'dyadic-operator' ,t:'op2' ,m:'keyword.operator.dyadic'}, //⍣ ...
    {s:'error'           ,t:'err' ,m:'invalid'},
    {s:'function'        ,t:'fn'  ,m:'keyword.function'}, //+ ...
    {s:'global-name'     ,t:'glb' ,m:'identifier.global'},
    {s:'idiom'           ,t:'idm' ,m:'predefined.idiom'}, //⊃⌽ ...
    {s:'keyword'         ,t:'kw'  ,m:'keyword'}, //:If ...
    {s:'label'           ,t:'lbl' ,m:'meta.label'}, //L:
    {s:'line number'     ,t:'lnum',e:'editorLineNumber.foreground'},
    {s:'matching bracket',t:'mtch',e:'editorBracketMatch.background'},
    {s:'modified line'   ,t:'mod' ,c:'.modified'   }, //in the session - lines queued for execution
    {s:'monadic operator',t:'op1' ,m:'keyword.operator.monadic'}, //⌸ ...
    {s:'namespace'       ,t:'ns'  ,m:'namespace'}, //#
    {s:'name'            ,t:'var' ,m:'identifier.local'}, //a.k.a. identifier
    {s:'normal'          ,t:'norm',c:'.ride_win_me'},
    {s:'number'          ,t:'num' ,m:'number'}, //0 ...
    {s:'parenthesis'     ,t:'par' ,m:'delimiter.parenthesis'}, //()
    {s:'quad name'       ,t:'quad',m:'predefined.sysfn'}, //⎕XYZ
    {s:'quad name local' ,t:'qdl' ,m:'predefined.sysfn.local'}, // localized ⎕XYZ
    {s:'search match'    ,t:'srch',e:'editor.findMatchBackground',ctrls:{fg:0,BIU:0}},
    {s:'selection'       ,t:'sel' ,e:'editor.selectionBackground',ctrls:{fg:0,BIU:0}},
    {s:'semicolon'       ,t:'semi',m:'delimiter.semicolon'}, //as in A[B;C]
    {s:'string'          ,t:'str' ,m:'string'}, //'a.k.a. character vector or scalar'
    {s:'system command'  ,t:'scmd',m:'predefined.scmd'}, //)XYZ
    {s:'tracer'          ,t:'tc'  ,c:'/*noprefix*/.tracer .monaco-editor-background,/*noprefix*/.tracer .monaco-editor .margin'},
    {s:'pendent'         ,t:'tcpe',c:'/*noprefix*/.tracer.pendent .monaco-editor-background,/*noprefix*/.tracer.pendent .monaco-editor .margin'},
    {s:'tradfn'          ,t:'trad',m:'identifier.tradfn'}, //the header line (e.g. ∇{R}←A F B) or the closing ∇
    {s:'user command'    ,t:'ucmd',m:'predefined.ucmd'}, //]XYZ
    {s:'value tip target',t:'vtt' ,c:'.vt_marker',ctrls:{bc:1,fg:0,BIU:0}}, //the rectangle around the token
    {s:'value tip'       ,t:'vtip',c:'/*noprefix*/#vt_bln,/*noprefix*/#vt_tri',ctrls:{bc:1}}, //the balloon
    {s:'zilde'           ,t:'zld' ,m:'predefined.zilde'},  //⍬
    
    {s:'chararr'         ,t:'ca'  ,c:'.chararr'},
    {s:'charmat'         ,t:'cm'  ,c:'.charmat'},
    {s:'charvec'         ,t:'cv'  ,c:'.charvec'},
    {s:'charvecvec'      ,t:'cvv' ,c:'.charvecvec'},
    {s:'mixarr'          ,t:'ma'  ,c:'.mixarr'},
    {s:'numarr'          ,t:'na'  ,c:'.numarr'},
    {s:'quador'          ,t:'qor' ,c:'.quador'},
    {s:'disconnected'    ,t:'dc'  ,c:'.disconnected'},
    
];

// RGB() expands the hex representation of a colour, rgb() shrinks it
function RGB(x) {
    const n = (x || '').length;
    if (n === 6) return `#${x}`;
    if (n === 3) return `#${x.replace(/(.)/g, '$1$1')}`;
    return n === 1 ? `#${x.repeat(6)}` : x;
}

function RGBA(x, a) {
    const r = RGB(x);
    return `rgba(${[+`0x${r.slice(1, 3)}`, +`0x${r.slice(3, 5)}`, +`0x${r.slice(5, 7)}`, a]})`;
}

function RGBO(x, a) {
    const o = a === undefined ? '' : `00${Math.round(a * 255).toString(16)}`.slice(-2);
    return RGB(x) + o;
}

function decScm(x) { // x:for example "num=fg:345,bg:f,B,U,bgo:.5 str=fg:2,I com=U"
    const r = { name: x.name, theme: x.theme }; // r:the result
    const a = (x.styles || '').split(/\s+/); // a:for example ["num=fg:345,bg:f,B,U,bgo:.5","str=fg:2,I","com=U"]
    for (let i = 0; i < a.length; i++) {
        if (a[i]) {
        const b = a[i].split('='); // b:["num","fg:345,bg:f,B,U,bgo:.5"]
        const g = b[0]; // g:"num" (the group)
        const c = b[1].split(',');
        const h = {}; r[g] = h;
        for (let j = 0; j < c.length; j++) { // c:["fg:345","bg:f","B","U","bgo:.5"]
            const pv = c[j].split(':');
            const p = pv[0];
            const v = pv[1];
            h[p] = v != null ? v : 1; // p:"fg" v:"345"  or  p:"B" v:undefined
        }
        // if .bgo (background opacity) is present, convert it to a number
        h.fgo != null && (h.fgo = +h.fgo);
        h.bgo != null && (h.bgo = +h.bgo);
        }
    }
    if (!r.theme) { // check brightness and pick matching theme
        const [rr, gg, bb] = RGB(r.norm.bg).match(/([0-9a-fA-F]{2})/g).map((c) => parseInt(c, 16));
        const lum = Math.sqrt((0.241 * rr * rr) + (0.691 * gg * gg) + (0.068 * bb * bb));
        r.theme = lum < 130 ? 'dark' : 'light';
    }
    return r;
}

function renderCSS(schema) {
    var css = "";
    var theme = String(schema.name).toLowerCase().replace(' ', '-');
    for (const g of G) {
        var name = g.s;
        console.log(name);
        var key = g.t;
        var props = schema[key];
        if (!props) { continue; }
        else { css += `.${theme} .${name.replace(' ', '-')} { `; }

        // These aren't the same as the original function, but I think they should work
        // The original does both RGB & RGBA. And it sets default `bgo` to 0.5 for `props.bg`
        if (props.fg)  { css += `color: ${RGBA(props.fg, props.fgo==null? 1: props.fgo)}; `} 
        if (props.bg) { css += `background-color: ${RGBA(props.bg, props.bgo==null? 1: props.bgo)}; `}

        if (props.B) { css += "font-weight: bold; "; }
        if (props.I) { css += "font-style: italic; "; }
        if (props.U) { css += "text-decoration: underline; "; }

        css += '}\n';

    }
    return css;
//     return G.map((g) => {
//       const h = schema[g.t];
//       if (!h || !g.c) return '';
//       const els = g.c.split(',').map((x) => (isSample ? '#nonexistent' : x)).join(',');
//       const edmode = true;
//       let cls;
//       if (edmode) {
//         cls = `${els} .monaco-editor-background,${els} .monaco-editor .margin{`;
//         h.bg && (cls += `background-color:${RGB(h.bg)};`);
//         h.bg && (cls += `background-color:${RGBA(h.bg, h.bgo == null ? 0.5 : h.bgo)};`);
//         cls += `}${els} .monaco-editor span,${els} .monaco-editor .line-numbers{`;
//         h.fg && (cls += `color:${RGB(h.fg)};`);
//         h.fg && (cls += `color:${RGBA(h.fg, h.fgo == null ? 1 : h.fgo)};`);
//         h.B && (cls += 'font-weight:bold;');
//         h.I && (cls += 'font-style:italic;');
//         h.U && (cls += 'text-decoration:underline;');
//         cls += '}';
//         return cls;
//       }
//       cls = `${els}{`;
//       h.fg && (cls += `color:${RGB(h.fg)};`);
//       h.B && (cls += 'font-weight:bold;');
//       h.I && (cls += 'font-style:italic;');
//       h.U && (cls += 'text-decoration:underline;');
//       h.bc && (cls += `border-color:${RGB(h.bc)};`);
//       h.bg && (cls += `background-color:${RGB(h.bg)};`);
//       h.bg && (cls += `background-color:${RGBA(h.bg, h.bgo == null ? 0.5 : h.bgo)};`);
//       cls += '}';
//       return cls;
//     }).join('');
//   }
}



var dzaima = {
	"name": 'dzaima',
	"theme": 'dark',
	"styles": "asgn=fg:ff0 com=fg:#898989 cur=bc:#c0c0c0 dfn2=fg:eb4 dfn3=fg:c79 dfn4=fg:cd0 dfn5=fg:#b63cda dfn=fg:a7b diam=fg:ff0 err=fg:f00,bgo:1,B,U fn=fg:0f0 glob=B idm=U,B,fg:#808080 kw=fg:aa2 lbl=U,bgo:0.5 lnum=fg:b94,bgo:1 mod=bgo:0.25,bg:1 mtch=bgo:0.5,bg:#404040,B norm=fg:#d0d0d0,bg:#14141a,bgo:1 num=fg:a8b op1=fg:d95 op2=fg:fd6 sel=bg:048,bgo:0.5 semi=fg:8 sqbr=fg:8 srch=bgo:0.25,bg:980000 str=fg:dae tc=bg:1,bgo:1 zld=fg:d9f,B scmd=fg:0ff ucmd=fg:f80,B vtip=bg:#404040,bgo:1 vtt=bc:f80 glb=bgo:0.5"
};

var d = decScm(dzaima);
console.log(d);