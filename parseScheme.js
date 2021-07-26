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
        var key = g.t;
        var props = schema[key];
        if (!props) { continue; }
        else { css += `.${theme} .${name.replace(' ', '-')} { `; }

        // These aren't the same as the original function, but I think they should work
        // The original does both RGB & RGBA. And it sets default `bgo` to 0.5 for `props.bg`
        if (props.fg)  { css += `color: ${RGBA(props.fg, props.fgo==null? 1: props.fgo)}; `} 
        if (props.bg) { css += `background-color: ${RGBA(props.bg, props.bgo==null? 0.5: props.bgo)}; `}

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


const SCMS = [ // built-in schemes
    {
      name: 'Default',
      theme: 'light',
      styles: 'asgn=fg:00f com=fg:088 dfn=fg:00f diam=fg:00f err=fg:f00 fn=fg:008 idm=fg:008 kw=fg:800 '
      + 'lnum=fg:008,bg:f,bgo:0 mod=bg:7,bgo:.25 mtch=bg:ff8,bgo:.5 norm=bg:f,bgo:1 ns=fg:8 num=fg:8 op1=fg:00f op2=fg:00f '
      + 'par=fg:00f quad=fg:808 qdl=fg:c0c sel=bg:48e,bgo:.5 semi=fg:00f sqbr=fg:00f srch=bg:f80,bgo:.5 str=fg:088 tc=bg:d,bgo:1 '
      + 'tcpe=bg:c8c8c8,bgo:1 trad=fg:8 var=fg:8 zld=fg:008 scmd=fg:00f ucmd=fg:00f vtt=bg:ff0 '
      + 'ca=bg:828282,bgo:1,fg:0f0 cm=bg:0,bgo:.1,fg:080 cv=bg:f,bgo:1,fg:0 cvv=bg:0,bgo:1,fg:0ff '
      + 'ma=bg:828282,bgo:1,fg:0ff na=bg:828282,bgo:1,fg:f qor=bg:f00,bgo:1,fg:f dc=bg:e2d3bb,bgo:1',
    }, {
      name: 'Francisco Goya',
      theme: 'dark',
      styles: 'asgn=fg:ff0 com=fg:b,I:1 cur=bc:f00 dfn2=fg:eb4 dfn3=fg:c79 dfn4=fg:cd0 dfn5=fg:a0d '
      + 'dfn=fg:a7b diam=fg:ff0 err=fg:f00,bg:822,bgo:.5,B:1 fn=fg:0f0 idm=fg:0f0 glb=B:1 kw=fg:aa2 '
      + 'lbl=U:1,bg:642,bgo:.5 lnum=fg:b94,bg:010,bgo:0 mod=bg:7,bgo:.5 mtch=fg:0,bg:0,bgo:0 norm=fg:9c7,bg:0,bgo:1 '
      + 'num=fg:a8b op1=fg:d95 op2=fg:fd6 sel=bg:048,bgo:.5 semi=fg:8 sqbr=fg:8 srch=bg:b96,bgo:.75,fg:0 str=fg:dae '
      + 'tc=bg:1,bgo:1 tcpe=bg:2,bgo:1 zld=fg:d9f,B:1 scmd=fg:0ff ucmd=fg:f80,B:1 vtip=bg:733,fg:ff0,bgo:1,bc:900 vtt=bc:f80 '
      + 'ca=bg:828282,bgo:1,fg:0f0 cm=bg:0,bgo:1,fg:0f0 cv=bg:f,bgo:1,fg:0 cvv=bg:0,bgo:1,fg:0ff '
      + 'ma=bg:828282,bgo:1,fg:0ff na=bg:828282,bgo:1,fg:f qor=bg:f00,bgo:1,fg:f dc=bg:3,bgo:1',
    }, {
      name: 'Albrecht Dürer',
      theme: 'light',
      styles: 'com=I:1 diam=B:1 err=fg:0,bg:1,bgo:.5,B:1,I:1 glb=I:1 kw=B:1 '
      + 'lnum=bg:f,bgo:0 mod=bg:7,bgo:.25 mtch=bg:c,bgo:.5 norm=bg:f,bgo:1 ns=fg:8 num=fg:8 quad=fg:8 srch=bg:c,bgo:.5 '
      + 'str=fg:8 tc=bg:e,bgo:1 tcpe=bg:dadada,bgo:1 zld=fg:8 vtt=bc:aaa dc=bg:e2d3bb,bgo:1',
    }, {
      name: 'Kazimir Malevich',
      theme: 'light',
      styles: 'norm=bg:f,bgo:1',
    }, {
      name: 'Dracula',
      theme: 'dark',
      styles: 'asgn=fg:#50fa7b com=fg:#6272a4 diam=fg:#ff79c6 err=fg:#ff5555,bgo:1,U fn=fg:#8be9fd idm=U kw=fg:#ff79c6 '
      + 'lnum=bgo:0,fg:6272a4 mod=bgo:0.5,bg:#44475a mtch=bgo:0.5,fg:#f8f8f2,bg:#44475a norm=bg:#282a36,bgo:1,fg:f8f8f2 '
      + 'num=fg:#bd93f9 op1=fg:#50fa7b,fgo:1 op2=fg:#f1fa8c quad=fg:#ffb86c sel=bg:#6bb2ff,bgo:0.5 semi=fg:#50fa7b '
      + 'sqbr=fg:#50fa7b srch=bg:#bd93f9,bgo:0.5 str=fg:#f1fa8c tc=bg:#44475a,bgo:1 tcpe=bg:#44475a,bgo:1 zld=fg:#bd93f9 '
      + 'scmd=fg:#ff79c6 ucmd=fg:#ff79c6,B vtt=bg:#44475a,bgo:1 ca=bg:#44475a,bgo:1,fg:#ff5555 cm=bg:#282a36,bgo:1,fg:#50fa7b '
      + 'cv=bg:#44475a,bgo:1,fg:#f1fa8c cvv=bg:#282a36,bgo:1,fg:#8be9fd ma=bg:#44475a,bgo:1,fg:#8be9fd '
      + 'na=bg:#44475a,bgo:1,fg:#bd93f9 qor=bg:#ff5555,bgo:1,fg:#f8f8f2 dc=bg:#6272a4,bgo:1 lbl=fg:#ff79c6,B glb=fg:#ffb86c '
      + 'cubr=fg:#f8f8f2 par=fg:#f8f8f2 dfn=fg:#f8f8f2 qdl=fg:#f8f8f2 cur=fg:#f8f8f2,fgo:1 acsl=bg:#bd93f9,bgo:0.25',
    }, {
      name: 'New Moon',
      theme: 'dark',
      styles: 'asgn=fg:#6ab0f3 com=fg:#777c85 diam=fg:#ffeea6 err=fg:#f2777a,bgo:1,U fn=fg:#ac8d58 idm=U kw=fg:#ffeea6 '
      + 'lnum=bgo:0,fg:#777c85 mod=bgo:0.25,bg:#777c85 mtch=bgo:0.5,bg:#777c85,fgo:1 norm=bg:#2d2d2d,bgo:1,fg:#b3b9c5 '
      + 'num=fg:#fca369 op1=fg:#6ab0f3,fgo:1 op2=fg:#76d4d6 quad=fg:#f2777a sel=bg:#6ab0f3,bgo:0.5 semi=fg:#6ab0f3 '
      + 'sqbr=fg:#6ab0f3 srch=bg:#e1a6f2,bgo:0.25 str=fg:#92d192 tc=bg:#777c85,bgo:0.25 tcpe=bg:#777c85,bgo:0.25 zld=fg:#fca369 '
      + 'scmd=fg:#ffeea6 ucmd=fg:#ffeea6,B vtt=bg:#777c85,bgo:1 ca=bg:#777c85,bgo:0.25,fg:#f2777a cm=bg:#2d2d2d,bgo:1,fg:#92d192 '
      + 'cv=bg:#2d2d2d,bgo:1,fg:#ffeea6 cvv=bg:#2d2d2d,bgo:1,fg:#76d4d6 ma=bg:#777c85,bgo:0.25,fg:#76d4d6 '
      + 'na=bg:#44475a,bgo:1,fg:#bd93f9 qor=bg:#f2777a,bgo:1,fg:#ffffff dc=bg:#777c85,bgo:1 lbl=fg:#ffd479 glb=fg:#f2777a '
      + 'dfn=fg:#ffffff qdl=fg:#b3b9c5 cur=fg:#ffffff,fgo:1 acsl=bgo:0.25,bg:#e1a6f2',
    }, {
      name: 'Nord',
      theme: 'dark',
      styles: 'com=fg:#616e88 diam=B,fg:#81a1c1 err=fg:#bf616a,bgo:0.5,U glb=fg:#ebcb8b kw=fg:#81a1c1 lnum=bgo:0,fg:#4c566a '
      + 'mod=bg:#434c5e,bgo:0.25 mtch=bg:#434c5e,bgo:0.5 norm=bg:#2e3440,bgo:1,fg:#eceff4 num=fg:#b48ead quad=fg:#ebcb8b '
      + 'srch=bg:#434c5e,bgo:0.5 str=fg:#a3be8c tc=bg:#434c5e,bgo:1,fg:#eceff4 tcpe=bg:#434c5e,bgo:1,fg:#eceff4 zld=fg:#b48ead '
      + 'vtt=bg:#434c5e dc=bg:#434c5e,bgo:1 cur=fg:#d8dee9 cubr=fg:#5e81ac asgn=fg:#88c0d0 lbl=fg:#81a1c1,B fn=fg:#81a1c1 '
      + 'qdl=fg:#d8dee9 var=fg:#d8dee9 sqbr=fg:#81a1c1 semi=fg:#81a1c1 idm=fg:#d08770 sel=bg:#434c5e par=fg:#eceff4 '
      + 'scmd=fg:#81a1c1 ucmd=fg:#81a1c1 vtip=bg:#3b4252,fg:#eceff4,bgo:1 ca=fg:#bf616a,bg:#434c5e,bgo:1 '
      + 'cm=fg:#a3be8c,bg:#2e3440,bgo:1 cv=fg:#ebcb8b,bg:#2e3440 cvv=fg:#88c0d0,bg:#2e3440,bgo:1 ma=fg:#88c0d0,bg:#434c5e,bgo:1 '
      + 'na=fg:#b48ead,bg:#434c5e,bgo:1 qor=fg:#eceff4,bg:#bf616a,bgo:1 op1=fg:#88c0d0 op2=fg:#8fbcbb',
}];


var dzaima = {
	"name": 'dzaima',
	"theme": 'dark',
	"styles": "asgn=fg:ff0 com=fg:#898989 cur=bc:#c0c0c0 dfn2=fg:eb4 dfn3=fg:c79 dfn4=fg:cd0 dfn5=fg:#b63cda dfn=fg:a7b diam=fg:ff0 err=fg:f00,bgo:1,B,U fn=fg:0f0 glob=B idm=U,B,fg:#808080 kw=fg:aa2 lbl=U,bgo:0.5 lnum=fg:b94,bgo:1 mod=bgo:0.25,bg:1 mtch=bgo:0.5,bg:#404040,B norm=fg:#d0d0d0,bg:#14141a,bgo:1 num=fg:a8b op1=fg:d95 op2=fg:fd6 sel=bg:048,bgo:0.5 semi=fg:8 sqbr=fg:8 srch=bgo:0.25,bg:980000 str=fg:dae tc=bg:1,bgo:1 zld=fg:d9f,B scmd=fg:0ff ucmd=fg:f80,B vtip=bg:#404040,bgo:1 vtt=bc:f80 glb=bgo:0.5"
};

var d = decScm(dzaima);

var parse = n=>renderCSS(decScm(n));