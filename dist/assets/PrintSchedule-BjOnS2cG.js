import{u as y,a as k,r as i,S,J as x,j as e,B as m,A as w,P as D,Q as A}from"./index-CFyYK32l.js";const L=()=>{const{scheduleId:d}=y(),c=k(),l=i.useRef(null),[s,b]=i.useState(null),[n,p]=i.useState([]),[j,o]=i.useState(!0);i.useEffect(()=>{d&&u()},[d]);const u=async()=>{try{o(!0);const r=await S.getScheduleWithJobs(d);r.success&&r.schedule&&r.jobs?(b(r.schedule),p(r.jobs)):(x.error(r.error||"Failed to load schedule"),c("/schedules"))}catch(r){console.error("Error loading schedule:",r),x.error("Failed to load schedule"),c("/schedules")}finally{o(!1)}},g=()=>{c("/schedules")},N=()=>{l.current&&(l.current.style.display="block",l.current.style.visibility="visible",l.current.querySelectorAll("svg, canvas, .qrcode").forEach(a=>{a.style.display="block",a.style.visibility="visible"})),setTimeout(()=>{window.print()},500)},h=r=>new Date(r).toLocaleDateString(),v=()=>s?`${window.location.origin}/schedules/display/${s.id}?schedule=${s.schedule_number}&date=${s.schedule_date}&vehicle=${s.vehicle}&verified=true`:"";return j?e.jsx("div",{className:"flex items-center justify-center h-64",children:e.jsx("div",{className:"text-lg",children:"Loading schedule..."})}):s?e.jsxs("div",{className:"min-h-screen bg-white",children:[e.jsx("style",{children:`
          @media print {
            .print\\:hidden { display: none !important; }
            .print-container { 
              margin: 0 !important; 
              padding: 0 !important;
              background: white !important;
            }
            body { 
              margin: 0 !important; 
              padding: 0 !important;
              background: white !important;
              font-size: 12px !important;
            }
            .print-content {
              margin: 0 !important;
              padding: 20px !important;
              background: white !important;
              width: 100% !important;
              max-width: none !important;
            }
            table { 
              width: 100% !important; 
              border-collapse: collapse !important;
              margin: 0 !important;
            }
            th, td { 
              border: 1px solid #000 !important; 
              padding: 8px !important;
              font-size: 11px !important;
            }
            .qr-code {
              break-inside: avoid !important;
              page-break-inside: avoid !important;
            }
            svg, canvas, .qrcode {
              max-width: 100px !important;
              max-height: 100px !important;
              width: 100px !important;
              height: 100px !important;
              display: block !important;
              visibility: visible !important;
            }
          }
        `}),e.jsxs("div",{className:"print:hidden p-4 bg-white shadow-md mb-4 sticky top-0 z-10 flex items-center justify-between",children:[e.jsxs(m,{variant:"outline",onClick:g,className:"flex items-center gap-2",children:[e.jsx(w,{className:"h-4 w-4"}),"Back"]}),e.jsxs("div",{className:"text-xl font-bold",children:["Print Schedule - ",s.schedule_number]}),e.jsxs(m,{onClick:N,className:"flex items-center gap-2 bg-blue-500 hover:bg-blue-600",children:[e.jsx(D,{className:"h-4 w-4"}),"Print"]})]}),e.jsxs("div",{ref:l,className:"print-content bg-white p-8",children:[e.jsxs("div",{className:"flex justify-between items-start mb-6",children:[e.jsxs("div",{className:"flex-1",children:[e.jsx("h1",{className:"text-2xl font-bold text-blue-600 mb-2",children:"QATAR CARGO COLLECTION & DELIVERY"}),e.jsxs("div",{className:"text-sm text-gray-600",children:[e.jsx("p",{children:"P.O. Box: 22550, Doha - Qatar"}),e.jsx("p",{children:"Tel: +974 4460 4470 | Mobile: +974 5554 4470"}),e.jsx("p",{children:"Email: info@qatarcargo.com"})]})]}),e.jsxs("div",{className:"qr-code flex flex-col items-center",children:[e.jsx(A,{value:v(),size:100,level:"M",includeMargin:!0,className:"border border-gray-300"}),e.jsx("p",{className:"text-xs text-gray-600 mt-1 text-center",children:"Scan for Details"})]})]}),e.jsxs("div",{className:"border-2 border-blue-500 p-4 mb-6",children:[e.jsx("h2",{className:"text-xl font-bold text-center mb-4",children:"JOB SCHEDULE"}),e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsxs("div",{children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Schedule Number:"})," ",s.schedule_number]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Date:"})," ",h(s.schedule_date)]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Vehicle:"})," ",s.vehicle]})]}),e.jsxs("div",{children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Sales Representative:"})," ",s.sales_rep]}),s.driver&&e.jsxs("p",{children:[e.jsx("strong",{children:"Driver:"})," ",s.driver]}),s.helper&&e.jsxs("p",{children:[e.jsx("strong",{children:"Helper:"})," ",s.helper]})]})]})]}),e.jsx("div",{className:"mb-6",children:e.jsxs("table",{className:"w-full border-collapse border border-black",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-blue-500 text-white",children:[e.jsx("th",{className:"border border-black p-2 text-left",children:"SL#"}),e.jsx("th",{className:"border border-black p-2 text-left",children:"Job Number"}),e.jsx("th",{className:"border border-black p-2 text-left",children:"Customer"}),e.jsx("th",{className:"border border-black p-2 text-left",children:"From Address"}),e.jsx("th",{className:"border border-black p-2 text-left",children:"To Address"}),e.jsx("th",{className:"border border-black p-2 text-left",children:"Service Type"}),e.jsx("th",{className:"border border-black p-2 text-left",children:"Items"}),e.jsx("th",{className:"border border-black p-2 text-left",children:"Signature"})]})}),e.jsx("tbody",{children:n.length>0?n.map((r,a)=>{const t=r.job_data,f=t.items?t.items.length:0;return e.jsxs("tr",{children:[e.jsx("td",{className:"border border-black p-2",children:a+1}),e.jsx("td",{className:"border border-black p-2",children:t.jobNumber||`JOB-${a+1}`}),e.jsx("td",{className:"border border-black p-2",children:t.customer||"N/A"}),e.jsx("td",{className:"border border-black p-2 text-xs",children:t.fromAddress||"N/A"}),e.jsx("td",{className:"border border-black p-2 text-xs",children:t.toAddress||"N/A"}),e.jsx("td",{className:"border border-black p-2",children:t.serviceType||"N/A"}),e.jsx("td",{className:"border border-black p-2 text-center",children:f}),e.jsx("td",{className:"border border-black p-2",style:{minWidth:"100px",height:"40px"}})]},r.id)}):e.jsx("tr",{children:e.jsx("td",{colSpan:8,className:"border border-black p-4 text-center",children:"No jobs found in this schedule"})})})]})}),e.jsxs("div",{className:"grid grid-cols-2 gap-6 mt-6",children:[e.jsxs("div",{className:"border border-black p-4",children:[e.jsx("h3",{className:"font-bold mb-2",children:"Schedule Summary"}),e.jsxs("p",{children:["Total Jobs: ",n.length]}),e.jsxs("p",{children:["Vehicle: ",s.vehicle]}),e.jsxs("p",{children:["Date: ",h(s.schedule_date)]})]}),e.jsxs("div",{className:"border border-black p-4",children:[e.jsx("h3",{className:"font-bold mb-2",children:"Team Signatures"}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{children:[e.jsxs("p",{className:"text-sm",children:["Sales Rep: ",s.sales_rep]}),e.jsx("div",{className:"border-b border-gray-400 mt-2",style:{height:"30px"}})]}),s.driver&&e.jsxs("div",{children:[e.jsxs("p",{className:"text-sm",children:["Driver: ",s.driver]}),e.jsx("div",{className:"border-b border-gray-400 mt-2",style:{height:"30px"}})]}),s.helper&&e.jsxs("div",{children:[e.jsxs("p",{className:"text-sm",children:["Helper: ",s.helper]}),e.jsx("div",{className:"border-b border-gray-400 mt-2",style:{height:"30px"}})]})]})]})]}),e.jsxs("div",{className:"mt-6 text-center text-xs text-gray-600",children:[e.jsx("p",{children:"This is a computer-generated schedule. For verification, scan the QR code above."}),e.jsxs("p",{children:["Generated on: ",new Date().toLocaleDateString()," at ",new Date().toLocaleTimeString()]})]})]})]}):e.jsx("div",{className:"flex items-center justify-center h-64",children:e.jsx("div",{className:"text-lg",children:"Schedule not found"})})};export{L as default};
