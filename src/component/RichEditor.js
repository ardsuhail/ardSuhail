"use client"
// component/editor/RichEditor.jsx
// Props: value, onChange, productId, placeholder, minHeight, className

import React, {
  useEffect, useRef, useState, useImperativeHandle, forwardRef
} from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit        from "@tiptap/starter-kit"
import UnderlineExt      from "@tiptap/extension-underline"
import LinkExt           from "@tiptap/extension-link"
import ImageExt          from "@tiptap/extension-image"
import { TextStyle }     from "@tiptap/extension-text-style"
import ColorExt          from "@tiptap/extension-color"
import HighlightExt      from "@tiptap/extension-highlight"
import TextAlignExt      from "@tiptap/extension-text-align"
import FontFamilyExt     from "@tiptap/extension-font-family"
import PlaceholderExt    from "@tiptap/extension-placeholder"
import TaskListExt       from "@tiptap/extension-task-list"
import TaskItemExt       from "@tiptap/extension-task-item"
import { Table as TableExt }             from "@tiptap/extension-table"
import { TableRow as TableRowExt }       from "@tiptap/extension-table-row"
import { TableCell as TableCellExt }     from "@tiptap/extension-table-cell"
import { TableHeader as TableHeaderExt } from "@tiptap/extension-table-header"
import { Extension }     from "@tiptap/core"
import { UploadFile } from "@/lib/UploadFile"
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered, CheckSquare,
  Link as LinkIcon, Image as ImageIcon,
  Quote, Code, Minus, Undo2, Eraser,
  ChevronDown, Table, Trash2,
  PaintBucket, Loader2, Code2, X,
} from "lucide-react"
import { createPortal } from "react-dom"

// ─── FONT SIZE EXTENSION ─────────────────────────────────────────────────────
const FontSize = Extension.create({
  name: "fontSize",
  addGlobalAttributes() {
    return [{
      types: ["textStyle"],
      attributes: {
        fontSize: {
          default: null,
          parseHTML: el => el.style.fontSize || null,
          renderHTML: attrs => attrs.fontSize ? { style: `font-size:${attrs.fontSize}` } : {},
        },
      },
    }]
  },
  addCommands() {
    return {
      setFontSize: size => ({ chain }) =>
        chain().setMark("textStyle", { fontSize: size }).run(),
    }
  },
})

// ─── CONSTANTS ───────────────────────────────────────────────────────────────
const FONT_FAMILIES = [
  { label:"Inter",          value:"Inter, sans-serif" },
  { label:"Arial",          value:"Arial, sans-serif" },
  { label:"Georgia",        value:"Georgia, serif" },
  { label:"Times New Roman",value:"Times New Roman, serif" },
  { label:"Courier New",    value:"Courier New, monospace" },
  { label:"Verdana",        value:"Verdana, sans-serif" },
]
const FONT_SIZES = ["12px","14px","16px","18px","20px","24px","28px","32px","36px","48px"]
const PALETTE = [
  "#000000","#1e293b","#374151","#4b5563","#6b7280","#9ca3af","#d1d5db","#f1f5f9",
  "#1d4ed8","#2563eb","#3b82f6","#60a5fa","#93c5fd","#bfdbfe","#dbeafe","#eff6ff",
  "#065f46","#059669","#10b981","#34d399","#6ee7b7","#a7f3d0","#d1fae5","#ecfdf5",
  "#991b1b","#dc2626","#ef4444","#f87171","#fca5a5","#fecaca","#fee2e2","#fff5f5",
  "#78350f","#d97706","#f59e0b","#fbbf24","#fcd34d","#fde68a","#fef3c7","#fffbeb",
  "#5b21b6","#7c3aed","#8b5cf6","#a78bfa","#c4b5fd","#ede9fe","#f3e8ff","#faf5ff",
  "#fef9c3","#d1fae5","#dbeafe","#fce7f3","#fee2e2","#e0e7ff","#fff7ed","#ffffff",
]

// ─── COLOR UTILS ─────────────────────────────────────────────────────────────
function hsvToHex(h, s, v) {
  s /= 100; v /= 100
  const i = Math.floor(h / 60) % 6
  const f = h / 60 - Math.floor(h / 60)
  const p = v*(1-s), q = v*(1-f*s), t = v*(1-(1-f)*s)
  let r,g,b
  if(i===0){r=v;g=t;b=p}else if(i===1){r=q;g=v;b=p}
  else if(i===2){r=p;g=v;b=t}else if(i===3){r=p;g=q;b=v}
  else if(i===4){r=t;g=p;b=v}else{r=v;g=p;b=q}
  return "#"+[r,g,b].map(x=>Math.round(x*255).toString(16).padStart(2,"0")).join("")
}
function hexToHsv(hex) {
  if (!hex||hex.length!==7) return {h:0,s:100,v:50}
  const r=parseInt(hex.slice(1,3),16)/255
  const g=parseInt(hex.slice(3,5),16)/255
  const b=parseInt(hex.slice(5,7),16)/255
  const max=Math.max(r,g,b),min=Math.min(r,g,b),d=max-min
  let h=0
  if(d){
    if(max===r) h=((g-b)/d+6)%6
    else if(max===g) h=(b-r)/d+2
    else h=(r-g)/d+4
    h*=60
  }
  return {h:Math.round(h),s:max?Math.round(d/max*100):0,v:Math.round(max*100)}
}

// ─── PRIMITIVES ──────────────────────────────────────────────────────────────
function TBtn({active,disabled,onClick,title,children,className=""}) {
  return (
    <button type="button" title={title} disabled={disabled}
      onMouseDown={e=>{e.preventDefault();e.stopPropagation();onClick?.()}}
      className={`flex items-center justify-center p-1.5 rounded-lg transition-all text-sm select-none flex-shrink-0
        ${active?"bg-slate-900 text-white shadow-sm":"text-slate-600 hover:bg-slate-100 hover:text-slate-900"}
        disabled:opacity-30 disabled:cursor-not-allowed ${className}`}>
      {children}
    </button>
  )
}
function Divider() {
  return <div className="w-px h-5 bg-slate-200 mx-0.5 self-center flex-shrink-0"/>
}

// ─── SCROLL-AWARE DROPDOWN ───────────────────────────────────────────────────
function Dropdown({anchor,open,onClose,children,width=180}) {
  const [style,setStyle] = useState({})
  const ref = useRef(null)

  function calc() {
    if(!anchor.current) return
    const rect = anchor.current.getBoundingClientRect()
    const spaceBelow = window.innerHeight - rect.bottom
    const left = Math.min(rect.left, window.innerWidth - width - 8)
    if(spaceBelow >= 220) {
      setStyle({position:"fixed",top:rect.bottom+4,left,width,zIndex:9999})
    } else {
      setStyle({position:"fixed",top:rect.top-4,left,width,zIndex:9999,transform:"translateY(-100%)"})
    }
  }

  useEffect(() => {
    if(!open) return
    calc()
    window.addEventListener("scroll",calc,true)
    window.addEventListener("resize",calc)
    return ()=>{
      window.removeEventListener("scroll",calc,true)
      window.removeEventListener("resize",calc)
    }
  },[open,width])

  useEffect(() => {
    if(!open) return
    const h=e=>{
      if(ref.current&&!ref.current.contains(e.target)&&
         anchor.current&&!anchor.current.contains(e.target)) onClose()
    }
    document.addEventListener("mousedown",h,true)
    return ()=>document.removeEventListener("mousedown",h,true)
  },[open,onClose])

  if(!open||typeof window==="undefined") return null
  return createPortal(
    <div ref={ref} style={style}
      className="bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden py-1">
      {children}
    </div>,
    document.body
  )
}

// ─── CUSTOM COLOR PICKER ─────────────────────────────────────────────────────
function ColorPickerInput({value="#3b82f6",onChange}) {
  const init      = hexToHsv(value.startsWith("#")&&value.length===7?value:"#3b82f6")
  const [hue,setHue]   = useState(init.h)
  const [pos,setPos]   = useState({x:init.s,y:100-init.v})
  const [hex,setHex]   = useState(value||"#3b82f6")
  const pickerRef = useRef(null)
  const hueRef    = useRef(null)
  const pDrag     = useRef(false)
  const hDrag     = useRef(false)

  function emit(h,x,y) {
    const c = hsvToHex(h,x,100-y)
    setHex(c); onChange?.(c)
  }

  function onPickerDown(e) {
    e.preventDefault()
    pDrag.current=true
    const rect=pickerRef.current.getBoundingClientRect()
    const cx=e.touches?e.touches[0].clientX:e.clientX
    const cy=e.touches?e.touches[0].clientY:e.clientY
    const x=Math.max(0,Math.min(100,(cx-rect.left)/rect.width*100))
    const y=Math.max(0,Math.min(100,(cy-rect.top)/rect.height*100))
    setPos({x,y}); emit(hue,x,y)
  }
  function onHueDown(e) {
    e.preventDefault()
    hDrag.current=true
    const rect=hueRef.current.getBoundingClientRect()
    const cx=e.touches?e.touches[0].clientX:e.clientX
    const h=Math.max(0,Math.min(360,(cx-rect.left)/rect.width*360))
    setHue(h); emit(h,pos.x,pos.y)
  }

  useEffect(()=>{
    function move(e) {
      if(pDrag.current&&pickerRef.current) {
        const rect=pickerRef.current.getBoundingClientRect()
        const cx=e.touches?e.touches[0].clientX:e.clientX
        const cy=e.touches?e.touches[0].clientY:e.clientY
        const x=Math.max(0,Math.min(100,(cx-rect.left)/rect.width*100))
        const y=Math.max(0,Math.min(100,(cy-rect.top)/rect.height*100))
        setPos({x,y}); emit(hue,x,y)
      }
      if(hDrag.current&&hueRef.current) {
        const rect=hueRef.current.getBoundingClientRect()
        const cx=e.touches?e.touches[0].clientX:e.clientX
        const h=Math.max(0,Math.min(360,(cx-rect.left)/rect.width*360))
        setHue(h); emit(h,pos.x,pos.y)
      }
    }
    function stop(){pDrag.current=false;hDrag.current=false}
    window.addEventListener("mousemove",move)
    window.addEventListener("touchmove",move,{passive:false})
    window.addEventListener("mouseup",stop)
    window.addEventListener("touchend",stop)
    return ()=>{
      window.removeEventListener("mousemove",move)
      window.removeEventListener("touchmove",move)
      window.removeEventListener("mouseup",stop)
      window.removeEventListener("touchend",stop)
    }
  })

  const thumbColor = hsvToHex(hue,pos.x,100-pos.y)
  const hueColor   = `hsl(${hue},100%,50%)`

  return (
    <div className="select-none">
      {/* Gradient square */}
      <div ref={pickerRef}
        className="w-full rounded-xl cursor-crosshair relative mb-2.5 overflow-hidden"
        style={{height:108,background:`linear-gradient(to bottom,transparent,#000),linear-gradient(to right,#fff,${hueColor})`}}
        onMouseDown={onPickerDown}
        onTouchStart={onPickerDown}>
        <div className="absolute w-4 h-4 rounded-full border-2 border-white pointer-events-none"
          style={{left:`${pos.x}%`,top:`${pos.y}%`,transform:"translate(-50%,-50%)",background:thumbColor,
            boxShadow:"0 0 0 1px rgba(0,0,0,.2),0 2px 6px rgba(0,0,0,.3)"}}/>
      </div>

      {/* Hue bar */}
      <div ref={hueRef}
        className="w-full h-3 rounded-full cursor-pointer relative mb-3 overflow-visible"
        style={{background:"linear-gradient(to right,#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)"}}
        onMouseDown={onHueDown}
        onTouchStart={onHueDown}>
        <div className="absolute top-1/2 w-4 h-4 rounded-full border-2 border-white pointer-events-none"
          style={{left:`${(hue/360)*100}%`,transform:"translate(-50%,-50%)",background:hueColor,
            boxShadow:"0 0 0 1px rgba(0,0,0,.15),0 1px 4px rgba(0,0,0,.2)"}}/>
      </div>

      {/* Preview + hex input */}
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-lg border border-slate-200 flex-shrink-0"
          style={{background:hex}}/>
        <input value={hex}
          onChange={e=>{
            setHex(e.target.value)
            if(/^#[0-9a-f]{6}$/i.test(e.target.value)){
              const {h,s,v}=hexToHsv(e.target.value)
              setHue(h); setPos({x:s,y:100-v})
              onChange?.(e.target.value)
            }
          }}
          className="flex-1 px-2.5 py-1.5 text-xs font-mono border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 bg-slate-50 focus:bg-white"
          placeholder="#000000" maxLength={7} spellCheck={false}/>
      </div>
    </div>
  )
}

// ─── COLOR PANEL ─────────────────────────────────────────────────────────────
function ColorPanel({editor,open,onClose,anchor}) {
  const [tab,setTab]       = useState("text")
  const [picked,setPicked] = useState("#3b82f6")
  const ref    = useRef(null)
  const [style,setStyle] = useState({})

  function calc() {
    if(!anchor.current) return
    const rect=anchor.current.getBoundingClientRect()
    const W=252,H=400
    const left=Math.min(rect.left,window.innerWidth-W-8)
    const spaceBelow=window.innerHeight-rect.bottom
    const spaceAbove=rect.top
    let top
    if(spaceBelow>=H+8){
      top=rect.bottom+4
    }else if(spaceAbove>=H+8){
      top=rect.top-H-4
    }else{
      // Not enough space, position below and clamp to viewport
      top=Math.max(8,rect.bottom+4)
    }
    setStyle({position:"fixed",top,left,width:W,zIndex:9999})
  }

  useEffect(()=>{
    if(!open) return
    calc()
    window.addEventListener("scroll",calc,true)
    window.addEventListener("resize",calc)
    return ()=>{
      window.removeEventListener("scroll",calc,true)
      window.removeEventListener("resize",calc)
    }
  },[open])

  useEffect(()=>{
    if(!open) return
    const h=e=>{
      if(ref.current&&!ref.current.contains(e.target)&&
         anchor.current&&!anchor.current.contains(e.target)) onClose()
    }
    document.addEventListener("mousedown",h,true)
    return ()=>document.removeEventListener("mousedown",h,true)
  },[open,onClose])

  function applyColor(color) {
    if(!editor) return
    if(tab==="text")           editor.chain().focus().setColor(color).run()
    else if(tab==="highlight") editor.chain().focus().setHighlight({color}).run()
    else editor.chain().focus()
      .updateAttributes(editor.isActive("heading")?"heading":"paragraph",
        {style:`background-color:${color}`}).run()
  }

  function removeColor() {
    if(!editor) return
    if(tab==="text")           editor.chain().focus().unsetColor().run()
    else if(tab==="highlight") editor.chain().focus().unsetHighlight().run()
    else editor.chain().focus()
      .updateAttributes(editor.isActive("heading")?"heading":"paragraph",{style:""}).run()
    onClose()
  }

  if(!open||typeof window==="undefined") return null
  return createPortal(
    <div ref={ref} style={style}
      className="bg-white border border-slate-200 rounded-2xl shadow-2xl p-3.5"
      onMouseDown={e=>e.stopPropagation()}>

      {/* Tabs */}
      <div className="flex gap-1 mb-3 bg-slate-100 p-0.5 rounded-lg">
        {[{k:"text",l:"Text"},{k:"highlight",l:"Highlight"},{k:"bg",l:"Background"}].map(t=>(
          <button key={t.k} type="button"
            onMouseDown={e=>{e.preventDefault();setTab(t.k)}}
            className={`flex-1 py-1.5 text-[11px] font-semibold rounded-md transition-all ${
              tab===t.k?"bg-white shadow-sm text-slate-900":"text-slate-500 hover:text-slate-700"}`}>
            {t.l}
          </button>
        ))}
      </div>

      <ColorPickerInput value={picked} onChange={c=>{setPicked(c);applyColor(c)}}/>

      {/* Presets */}
      <div className="mt-3 pt-3 border-t border-slate-100">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Presets</p>
        <div className="grid grid-cols-8 gap-1">
          {PALETTE.map((c,i)=>(
            <button key={i} type="button"
              onMouseDown={e=>{e.preventDefault();setPicked(c);applyColor(c)}}
              title={c}
              className="w-6 h-6 rounded-md hover:scale-110 transition-transform shadow-sm"
              style={{background:c,outline:"1px solid #e2e8f0"}}/>
          ))}
        </div>
      </div>

      <button type="button"
        onMouseDown={e=>{e.preventDefault();removeColor()}}
        className="mt-3 w-full py-1.5 text-[11px] font-semibold text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
        Remove color
      </button>
    </div>,
    document.body
  )
}

// ─── LINK MODAL (with display text) ──────────────────────────────────────────
function LinkModal({editor,open,onClose}) {
  const [href,  setHref]   = useState("")
  const [text,  setText]   = useState("")
  const [newTab,setNewTab] = useState(false)

  useEffect(()=>{
    if(!open||!editor) return
    setHref(editor.getAttributes("link").href||"")
    setNewTab(editor.getAttributes("link").target==="_blank")
    const {from,to}=editor.state.selection
    setText(editor.state.doc.textBetween(from,to,"")||"")
  },[open,editor])

  function apply() {
    if(!editor) return
    if(!href.trim()){
      editor.chain().focus().extendMarkRange("link").unsetLink().run()
      onClose(); return
    }
    const {from,to}=editor.state.selection
    const hasSelection=from!==to
    const isExisting=editor.isActive("link")
    if(text.trim()&&!hasSelection&&!isExisting) {
      editor.chain().focus()
        .insertContent(`<a href="${href.trim()}"${newTab?' target="_blank"':''} rel="noopener noreferrer">${text.trim()}</a>&nbsp;`)
        .run()
    } else {
      editor.chain().focus().extendMarkRange("link")
        .setLink({href:href.trim(),target:newTab?"_blank":null}).run()
    }
    onClose()
  }

  if(!open) return null
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <LinkIcon className="w-4 h-4"/> Insert Link
          </h3>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100">
            <X className="w-4 h-4"/>
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              Display Text
              <span className="text-slate-400 font-normal ml-1">— alag text likhna ho to</span>
            </label>
            <input value={text} onChange={e=>setText(e.target.value)}
              placeholder="Click here to visit…"
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"/>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">URL *</label>
            <input value={href} onChange={e=>setHref(e.target.value)}
              placeholder="https://example.com"
              onKeyDown={e=>e.key==="Enter"&&apply()}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"/>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={newTab} onChange={e=>setNewTab(e.target.checked)}
              className="rounded border-slate-300"/>
            <span className="text-xs text-slate-600">Open in new tab</span>
          </label>
        </div>

        <div className="flex gap-2 mt-5">
          {editor?.isActive("link")&&(
            <button onClick={()=>{editor.chain().focus().extendMarkRange("link").unsetLink().run();onClose()}}
              className="px-4 py-2 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl">
              Remove
            </button>
          )}
          <button onClick={onClose} className="flex-1 px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl">Cancel</button>
          <button onClick={apply}   className="flex-1 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl">Apply</button>
        </div>
      </div>
    </div>
  )
}

// ─── IMAGE MODAL ─────────────────────────────────────────────────────────────
function ImageModal({editor,open,onClose,productId}) {
  const [url,setUrl]           = useState("")
  const [uploading,setUploading] = useState(false)
  const [error,setError]       = useState("")
  const fileRef = useRef(null)

  async function handleFile(e) {
    const file=e.target.files?.[0]
    if(!file) return
    if(!productId){setError("productId required");return}
    setUploading(true);setError("")
    try{
      const u=await UploadFile(file,productId)
      insert(u)
    }catch{setError("Upload failed.")}
    finally{setUploading(false)}
  }

  function insert(src) {
    if(!src?.trim()) return
    editor?.chain().focus().setImage({src:src.trim()}).run()
    setUrl("");onClose()
  }

  if(!open) return null
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-900">Insert Image</h3>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"><X className="w-4 h-4"/></button>
        </div>
        {productId &&(
          <div className="mb-4">
            <label className="flex flex-col items-center gap-2 px-4 py-5 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:border-slate-400 bg-slate-50">
              {uploading?<Loader2 className="w-6 h-6 text-slate-400 animate-spin"/>:<ImageIcon className="w-6 h-6 text-slate-400"/>}
              <span className="text-xs font-semibold text-slate-500">{uploading?"Uploading…":"Click to upload"}</span>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile}/>
            </label>
            {error&&<p className="text-xs text-red-500 mt-1">{error}</p>}
          </div>
        )}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Or paste image URL</label>
          <div className="flex gap-2">
            <input value={url} onChange={e=>setUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              onKeyDown={e=>e.key==="Enter"&&insert(url)}
              className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10"/>
            <button onClick={()=>insert(url)} disabled={!url.trim()}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-xl disabled:opacity-50">
              Insert
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── HTML MODAL ──────────────────────────────────────────────────────────────
function HtmlModal({editor,open,onClose}) {
  const [html,setHtml]=useState("")
  useEffect(()=>{if(open&&editor)setHtml(editor.getHTML())},[open,editor])
  function apply(){editor?.commands.setContent(html,false);onClose()}
  if(!open) return null
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2"><Code2 className="w-4 h-4"/>HTML Source</h3>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"><X className="w-4 h-4"/></button>
        </div>
        <div className="flex-1 overflow-hidden p-4">
          <textarea value={html} onChange={e=>setHtml(e.target.value)}
            className="w-full h-full min-h-[300px] px-3 py-3 text-xs font-mono border border-slate-200 rounded-xl focus:outline-none resize-none bg-slate-950 text-emerald-400 leading-relaxed"
            spellCheck={false}/>
        </div>
        <div className="flex gap-3 px-5 py-4 border-t border-slate-100">
          <button onClick={onClose} className="flex-1 px-4 py-2.5 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl">Cancel</button>
          <button onClick={apply}   className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl">Apply Changes</button>
        </div>
      </div>
    </div>
  )
}

// ─── TABLE DROPDOWN ──────────────────────────────────────────────────────────
function TableDropdown({editor,open,onClose,anchor}) {
  const [style,setStyle]=useState({})
  const ref=useRef(null)

  function calc(){
    if(!anchor.current) return
    const rect=anchor.current.getBoundingClientRect()
    setStyle({position:"fixed",top:rect.bottom+4,left:rect.left,width:200,zIndex:9999})
  }
  useEffect(()=>{
    if(!open) return
    calc()
    window.addEventListener("scroll",calc,true)
    window.addEventListener("resize",calc)
    return ()=>{window.removeEventListener("scroll",calc,true);window.removeEventListener("resize",calc)}
  },[open])
  useEffect(()=>{
    if(!open) return
    const h=e=>{if(ref.current&&!ref.current.contains(e.target)&&anchor.current&&!anchor.current.contains(e.target))onClose()}
    document.addEventListener("mousedown",h,true)
    return ()=>document.removeEventListener("mousedown",h,true)
  },[open,onClose])

  function act(fn){fn();onClose()}
  if(!open||typeof window==="undefined") return null
  return createPortal(
    <div ref={ref} style={style} className="bg-white border border-slate-200 rounded-xl shadow-2xl py-1">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 pt-2 pb-1">Insert</p>
      <button type="button"
        onMouseDown={e=>{e.preventDefault();act(()=>editor.chain().focus().insertTable({rows:3,cols:3,withHeaderRow:true}).run())}}
        className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
        <Table className="w-4 h-4 text-slate-400"/> Table (3×3)
      </button>
      {editor?.isActive("table")&&(
        <>
          <div className="border-t border-slate-100 my-1"/>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 pt-1 pb-1">Row</p>
          {[
            {l:"Add row above",fn:()=>editor.chain().focus().addRowBefore().run()},
            {l:"Add row below",fn:()=>editor.chain().focus().addRowAfter().run()},
          ].map(b=>(
            <button key={b.l} type="button" onMouseDown={e=>{e.preventDefault();act(b.fn)}}
              className="w-full px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 text-left">{b.l}</button>
          ))}
          <button type="button" onMouseDown={e=>{e.preventDefault();act(()=>editor.chain().focus().deleteRow().run())}}
            className="w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 text-left">Delete row</button>
          <div className="border-t border-slate-100 my-1"/>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 pt-1 pb-1">Column</p>
          {[
            {l:"Add column left", fn:()=>editor.chain().focus().addColumnBefore().run()},
            {l:"Add column right",fn:()=>editor.chain().focus().addColumnAfter().run()},
          ].map(b=>(
            <button key={b.l} type="button" onMouseDown={e=>{e.preventDefault();act(b.fn)}}
              className="w-full px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 text-left">{b.l}</button>
          ))}
          <button type="button" onMouseDown={e=>{e.preventDefault();act(()=>editor.chain().focus().deleteColumn().run())}}
            className="w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 text-left">Delete column</button>
          <div className="border-t border-slate-100 my-1"/>
          <button type="button" onMouseDown={e=>{e.preventDefault();act(()=>editor.chain().focus().deleteTable().run())}}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50">
            <Trash2 className="w-4 h-4"/>Delete table
          </button>
        </>
      )}
    </div>,
    document.body
  )
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
const RichEditor = forwardRef(function RichEditor({
  value="", onChange, productId,
  placeholder="Start writing…",
  minHeight="420px", className="",
},ref) {

  const [headingOpen,setHeadingOpen]=useState(false)
  const [fontOpen,   setFontOpen]   =useState(false)
  const [sizeOpen,   setSizeOpen]   =useState(false)
  const [colorOpen,  setColorOpen]  =useState(false)
  const [tableOpen,  setTableOpen]  =useState(false)
  const [alignOpen,  setAlignOpen]  =useState(false)
  const [linkOpen,   setLinkOpen]   =useState(false)
  const [imageOpen,  setImageOpen]  =useState(false)
  const [htmlOpen,   setHtmlOpen]   =useState(false)

  const headingRef=useRef(null), fontRef=useRef(null), sizeRef=useRef(null)
  const colorRef=useRef(null),   tableRef=useRef(null),alignRef=useRef(null)
  const isInternal=useRef(false)

  // Close all dropdowns helper
  function closeAll(){setHeadingOpen(false);setFontOpen(false);setSizeOpen(false);setColorOpen(false);setAlignOpen(false);setTableOpen(false)}

  const editor=useEditor({
    extensions:[
      StarterKit.configure({heading:{levels:[1,2,3,4,5,6]},codeBlock:{languageClassPrefix:"language-"},horizontalRule:true}),
      UnderlineExt,
      LinkExt.configure({openOnClick:false,HTMLAttributes:{class:"text-blue-600 underline cursor-pointer",rel:"noopener noreferrer"}}),
      ImageExt.configure({inline:false,allowBase64:true}),
      TextStyle, FontSize, ColorExt,
      HighlightExt.configure({multicolor:true}),
      TextAlignExt.configure({types:["heading","paragraph"]}),
      FontFamilyExt,
      PlaceholderExt.configure({placeholder}),
      TaskListExt,
      TaskItemExt.configure({nested:true}),
      TableExt.configure({resizable:true}),
      TableRowExt, TableHeaderExt, TableCellExt,
    ],
    content: value||"",
    editorProps:{attributes:{class:"rich-editor-content focus:outline-none",spellcheck:"true"}},
    immediatelyRender:false,
    onUpdate:({editor})=>{
      isInternal.current=true
      onChange?.(editor.getHTML())
      setTimeout(()=>{isInternal.current=false},0)
    },
  })

  useEffect(()=>{
    if(!editor||isInternal.current) return
    if(editor.getHTML()!==value) editor.commands.setContent(value||"",false)
  },[value,editor])

  useImperativeHandle(ref,()=>({editor}),[editor])

  const headingLabel=[1,2,3,4,5,6].find(l=>editor?.isActive("heading",{level:l}))
    ?`H${[1,2,3,4,5,6].find(l=>editor?.isActive("heading",{level:l}))}`:"Para"

  const AlignIcon=editor?.isActive({textAlign:"center"})?AlignCenter
    :editor?.isActive({textAlign:"right"})?AlignRight
    :editor?.isActive({textAlign:"justify"})?AlignJustify
    :AlignLeft

  return (
    <>
      <style>{`
        .rich-editor-content{min-height:${minHeight};padding:20px 24px;font-size:15px;line-height:1.8;color:#1e293b}
        .rich-editor-content h1{font-size:2em;font-weight:800;margin:.6em 0 .3em;line-height:1.2}
        .rich-editor-content h2{font-size:1.6em;font-weight:700;margin:.6em 0 .3em;line-height:1.3}
        .rich-editor-content h3{font-size:1.3em;font-weight:700;margin:.5em 0 .25em;line-height:1.4}
        .rich-editor-content h4{font-size:1.1em;font-weight:600;margin:.5em 0 .25em}
        .rich-editor-content h5,.rich-editor-content h6{font-size:1em;font-weight:600;margin:.5em 0 .25em}
        .rich-editor-content p{margin:.25em 0}
        .rich-editor-content blockquote{border-left:4px solid #e2e8f0;padding:.5em 1em;color:#64748b;margin:.5em 0;background:#f8fafc;border-radius:0 8px 8px 0;font-style:italic}
        .rich-editor-content code{background:#f1f5f9;border-radius:4px;padding:.1em .4em;font-size:.875em;font-family:'Courier New',monospace}
        .rich-editor-content pre{background:#1e293b;color:#e2e8f0;border-radius:12px;padding:16px;overflow-x:auto;margin:.5em 0}
        .rich-editor-content pre code{background:transparent;padding:0;color:inherit}
        .rich-editor-content ul{list-style:disc;padding-left:1.5em;margin:.25em 0}
        .rich-editor-content ol{list-style:decimal;padding-left:1.5em;margin:.25em 0}
        .rich-editor-content li{margin:.15em 0}
        .rich-editor-content ul[data-type="taskList"]{list-style:none;padding-left:0}
        .rich-editor-content ul[data-type="taskList"] li{display:flex;align-items:flex-start;gap:.5em}
        .rich-editor-content ul[data-type="taskList"] li label{margin-top:.15em;cursor:pointer}
        .rich-editor-content hr{border:none;border-top:2px solid #e2e8f0;margin:1em 0}
        .rich-editor-content a{color:#2563eb;text-decoration:underline;text-underline-offset:2px}
        .rich-editor-content img{max-width:100%;border-radius:10px;margin:.5em 0;display:block}
        .rich-editor-content table{border-collapse:collapse;width:100%;margin:.5em 0}
        .rich-editor-content th{background:#f1f5f9;font-weight:600;text-align:left;border:1px solid #e2e8f0;padding:8px 12px}
        .rich-editor-content td{border:1px solid #e2e8f0;padding:8px 12px}
        .rich-editor-content .selectedCell{background:#dbeafe!important}
        .rich-editor-content .is-editor-empty:first-child::before{content:attr(data-placeholder);float:left;color:#94a3b8;pointer-events:none;height:0}
      `}</style>

      {/* Wrapper — NO overflow-hidden so sticky toolbar works */}
      <div className={`rich-editor-wrapper border relative border-slate-200 rounded-2xl bg-white ${className}`}>

        {/* ── STICKY TOOLBAR ── */}
        <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-slate-200 bg-white/95 backdrop-blur-sm sticky top-0 z-20 rounded-t-2xl shadow-sm">

          {/* Heading */}
          <div ref={headingRef} className="relative flex-shrink-0">
            <button type="button"
              onMouseDown={e=>{e.preventDefault();e.stopPropagation();setHeadingOpen(o=>!o);setFontOpen(false);setSizeOpen(false);setColorOpen(false);setAlignOpen(false);setTableOpen(false)}}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100 rounded-lg min-w-[48px]">
              {headingLabel}<ChevronDown className="w-3 h-3 text-slate-400"/>
            </button>
            <Dropdown anchor={headingRef} open={headingOpen} onClose={()=>setHeadingOpen(false)} width={156}>
              <button type="button" onMouseDown={e=>{e.preventDefault();editor?.chain().focus().setParagraph().run();setHeadingOpen(false)}}
                className={`w-full px-3 py-2 text-sm text-left hover:bg-slate-50 ${editor?.isActive("paragraph")?"font-semibold":""}`}>Paragraph</button>
              {[1,2,3,4,5,6].map(l=>(
                <button key={l} type="button"
                  onMouseDown={e=>{e.preventDefault();editor?.chain().focus().setHeading({level:l}).run();setHeadingOpen(false)}}
                  className={`w-full px-3 py-2 text-left hover:bg-slate-50 ${editor?.isActive("heading",{level:l})?"font-semibold":""}`}
                  style={{fontSize:`${Math.max(0.78,1.5-l*.12)}em`,fontWeight:Math.max(400,700-l*40)}}>
                  Heading {l}
                </button>
              ))}
            </Dropdown>
          </div>

          <Divider/>

          {/* Font family */}
          <div ref={fontRef} className="relative flex-shrink-0">
            <button type="button"
              onMouseDown={e=>{e.preventDefault();e.stopPropagation();setFontOpen(o=>!o);setHeadingOpen(false);setSizeOpen(false)}}
              className="flex items-center gap-1 px-2 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg">
              Font<ChevronDown className="w-3 h-3 text-slate-400"/>
            </button>
            <Dropdown anchor={fontRef} open={fontOpen} onClose={()=>setFontOpen(false)} width={178}>
              {FONT_FAMILIES.map(f=>(
                <button key={f.value} type="button"
                  onMouseDown={e=>{e.preventDefault();editor?.chain().focus().setFontFamily(f.value).run();setFontOpen(false)}}
                  className="w-full px-3 py-2 text-sm text-left hover:bg-slate-50" style={{fontFamily:f.value}}>
                  {f.label}
                </button>
              ))}
            </Dropdown>
          </div>

          {/* Font size */}
          <div ref={sizeRef} className="relative flex-shrink-0">
            <button type="button"
              onMouseDown={e=>{e.preventDefault();e.stopPropagation();setSizeOpen(o=>!o);setHeadingOpen(false);setFontOpen(false)}}
              className="flex items-center gap-1 px-2 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg">
              Size<ChevronDown className="w-3 h-3 text-slate-400"/>
            </button>
            <Dropdown anchor={sizeRef} open={sizeOpen} onClose={()=>setSizeOpen(false)} width={90}>
              <div className="max-h-52 overflow-y-auto">
                {FONT_SIZES.map(s=>(
                  <button key={s} type="button"
                    onMouseDown={e=>{e.preventDefault();editor?.chain().focus().setFontSize(s).run();setSizeOpen(false)}}
                    className="w-full px-3 py-2 text-sm text-left hover:bg-slate-50">{s}</button>
                ))}
              </div>
            </Dropdown>
          </div>

          <Divider/>

          <TBtn active={editor?.isActive("bold")}      onClick={()=>editor?.chain().focus().toggleBold().run()}      title="Bold (Ctrl+B)"><Bold className="w-4 h-4"/></TBtn>
          <TBtn active={editor?.isActive("italic")}    onClick={()=>editor?.chain().focus().toggleItalic().run()}    title="Italic (Ctrl+I)"><Italic className="w-4 h-4"/></TBtn>
          <TBtn active={editor?.isActive("underline")} onClick={()=>editor?.chain().focus().toggleUnderline().run()} title="Underline"><UnderlineIcon className="w-4 h-4"/></TBtn>
          <TBtn active={editor?.isActive("strike")}    onClick={()=>editor?.chain().focus().toggleStrike().run()}    title="Strikethrough"><Strikethrough className="w-4 h-4"/></TBtn>

          <Divider/>

          {/* Color — single button, opens custom panel */}
          <div ref={colorRef} className="relative flex-shrink-0">
            <button type="button"
              onMouseDown={e=>{e.preventDefault();e.stopPropagation(); setColorOpen(o=>!o); }}
              title="Colors (Text / Highlight / Background)"
              className={`flex items-center gap-1 p-1.5 rounded-lg transition-all ${colorOpen?"bg-slate-900 text-white":"text-slate-600 hover:bg-slate-100"}`}>
              <PaintBucket className="w-4 h-4"/>
              <ChevronDown className="w-3 h-3 opacity-60"/>
            </button>
            <ColorPanel editor={editor} open={colorOpen} onClose={()=>setColorOpen(false)} anchor={colorRef}/>
          </div>

          <Divider/>

          {/* Alignment */}
          <div ref={alignRef} className="relative flex-shrink-0">
            <button type="button"
              onMouseDown={e=>{e.preventDefault();e.stopPropagation();setAlignOpen(o=>!o);setHeadingOpen(false);setFontOpen(false);setSizeOpen(false);setColorOpen(false);setTableOpen(false)}}
              className={`flex items-center gap-1 p-1.5 rounded-lg transition-all ${alignOpen?"bg-slate-900 text-white":"text-slate-600 hover:bg-slate-100"}`}>
              <AlignIcon className="w-4 h-4"/>
              <ChevronDown className="w-3 h-3 opacity-60"/>
            </button>
            <Dropdown anchor={alignRef} open={alignOpen} onClose={()=>setAlignOpen(false)} width={130}>
              {[
                {a:"left",    Icon:AlignLeft,    l:"Left"},
                {a:"center",  Icon:AlignCenter,  l:"Center"},
                {a:"right",   Icon:AlignRight,   l:"Right"},
                {a:"justify", Icon:AlignJustify, l:"Justify"},
              ].map(({a,Icon,l})=>(
                <button key={a} type="button"
                  onMouseDown={e=>{e.preventDefault();editor?.chain().focus().setTextAlign(a).run();setAlignOpen(false)}}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-slate-50 ${editor?.isActive({textAlign:a})?"font-semibold":""}`}>
                  <Icon className="w-4 h-4 text-slate-400"/>{l}
                </button>
              ))}
            </Dropdown>
          </div>

          <Divider/>

          <TBtn active={editor?.isActive("bulletList")}  onClick={()=>editor?.chain().focus().toggleBulletList().run()}  title="Bullet List"><List className="w-4 h-4"/></TBtn>
          <TBtn active={editor?.isActive("orderedList")} onClick={()=>editor?.chain().focus().toggleOrderedList().run()} title="Numbered List"><ListOrdered className="w-4 h-4"/></TBtn>
          <TBtn active={editor?.isActive("taskList")}    onClick={()=>editor?.chain().focus().toggleTaskList().run()}    title="Task List"><CheckSquare className="w-4 h-4"/></TBtn>

          <Divider/>

          <TBtn active={editor?.isActive("blockquote")} onClick={()=>editor?.chain().focus().toggleBlockquote().run()} title="Blockquote"><Quote className="w-4 h-4"/></TBtn>
          <TBtn active={editor?.isActive("codeBlock")}  onClick={()=>editor?.chain().focus().toggleCodeBlock().run()}  title="Code Block"><Code className="w-4 h-4"/></TBtn>
          <TBtn onClick={()=>editor?.chain().focus().setHorizontalRule().run()} title="Divider"><Minus className="w-4 h-4"/></TBtn>

          <Divider/>

          <TBtn active={editor?.isActive("link")} onClick={()=>{closeAll();setLinkOpen(true)}}  title="Insert Link"><LinkIcon className="w-4 h-4"/></TBtn>
          <TBtn onClick={()=>{closeAll();setImageOpen(true)}}                                     title="Insert Image"><ImageIcon className="w-4 h-4"/></TBtn>

          {/* Table */}
          <div ref={tableRef} className="relative flex-shrink-0">
            <button type="button"
              onMouseDown={e=>{e.preventDefault();e.stopPropagation();setTableOpen(o=>!o);setHeadingOpen(false);setFontOpen(false);setSizeOpen(false);setColorOpen(false);setAlignOpen(false)}}
              title="Table"
              className={`flex items-center gap-1 p-1.5 rounded-lg transition-all ${editor?.isActive("table")||tableOpen?"bg-slate-900 text-white":"text-slate-600 hover:bg-slate-100"}`}>
              <Table className="w-4 h-4"/>
              <ChevronDown className="w-3 h-3 opacity-60"/>
            </button>
            <TableDropdown editor={editor} open={tableOpen} onClose={()=>setTableOpen(false)} anchor={tableRef}/>
          </div>

          <Divider/>

          <TBtn onClick={()=>editor?.chain().focus().undo().run()} disabled={!editor?.can().undo()} title="Undo"><Undo2 className="w-4 h-4"/></TBtn>
          <TBtn onClick={()=>editor?.chain().focus().redo().run()} disabled={!editor?.can().redo()} title="Redo"><Undo2 className="w-4 h-4 scale-x-[-1]"/></TBtn>
          <TBtn onClick={()=>editor?.chain().focus().unsetAllMarks().clearNodes().run()} title="Clear Formatting"><Eraser className="w-4 h-4"/></TBtn>

          <div className="ml-auto">
            <TBtn onClick={()=>{closeAll();setHtmlOpen(true)}} title="HTML Source"><Code2 className="w-4 h-4"/></TBtn>
          </div>
        </div>

        {/* ── EDITOR ── */}
        <EditorContent editor={editor}/>

        {/* ── MODALS ── */}
        <LinkModal  editor={editor} open={linkOpen}  onClose={()=>setLinkOpen(false)}/>
        <ImageModal editor={editor} open={imageOpen} onClose={()=>setImageOpen(false)} productId={productId}/>
        <HtmlModal  editor={editor} open={htmlOpen}  onClose={()=>setHtmlOpen(false)}/>
      </div>
    </>
  )
})

export default RichEditor