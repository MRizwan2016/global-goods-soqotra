import{a as e}from"./chunk-BEqpzyXh.js";import{a as t,t as n}from"./dist-7f2tEZsE.js";import{E as r,T as i,d as a,n as o,p as s,t as c}from"./ScheduleService-BtsRd8Ln.js";import{a as l,i as u}from"./index-CdWoR21H.js";var d=e(t(),1),f=s(),p=()=>{let{scheduleId:e}=r(),t=i(),s=(0,d.useRef)(null),[p,m]=(0,d.useState)(null),[h,g]=(0,d.useState)([]),[_,v]=(0,d.useState)(!0);(0,d.useEffect)(()=>{e&&y()},[e]);let y=async()=>{try{v(!0);let r=await c.getScheduleWithJobs(e);r.success&&r.schedule&&r.jobs?(m(r.schedule),g(r.jobs)):(n.error(r.error||`Failed to load schedule`),t(`/schedules`))}catch(e){console.error(`Error loading schedule:`,e),n.error(`Failed to load schedule`),t(`/schedules`)}finally{v(!1)}},b=()=>{t(`/schedules`)},x=()=>{s.current&&(s.current.style.display=`block`,s.current.style.visibility=`visible`,s.current.querySelectorAll(`svg, canvas, .qrcode`).forEach(e=>{e.style.display=`block`,e.style.visibility=`visible`})),setTimeout(()=>{window.print()},500)},S=e=>new Date(e).toLocaleDateString();return _?(0,f.jsx)(`div`,{className:`flex items-center justify-center h-64`,children:(0,f.jsx)(`div`,{className:`text-lg`,children:`Loading schedule...`})}):p?(0,f.jsxs)(`div`,{className:`min-h-screen bg-white`,children:[(0,f.jsx)(`style`,{children:`
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
        `}),(0,f.jsxs)(`div`,{className:`print:hidden p-4 bg-white shadow-md mb-4 sticky top-0 z-10 flex items-center justify-between`,children:[(0,f.jsxs)(o,{variant:`outline`,onClick:b,className:`flex items-center gap-2`,children:[(0,f.jsx)(l,{className:`h-4 w-4`}),`Back`]}),(0,f.jsxs)(`div`,{className:`text-xl font-bold`,children:[`Print Schedule - `,p.schedule_number]}),(0,f.jsxs)(o,{onClick:x,className:`flex items-center gap-2 bg-blue-500 hover:bg-blue-600`,children:[(0,f.jsx)(a,{className:`h-4 w-4`}),`Print`]})]}),(0,f.jsxs)(`div`,{ref:s,className:`print-content bg-white p-8`,children:[(0,f.jsxs)(`div`,{className:`flex justify-between items-start mb-6`,children:[(0,f.jsxs)(`div`,{className:`flex-1`,children:[(0,f.jsx)(`h1`,{className:`text-2xl font-bold text-blue-600 mb-2`,children:`QATAR CARGO COLLECTION & DELIVERY`}),(0,f.jsxs)(`div`,{className:`text-sm text-gray-600`,children:[(0,f.jsx)(`p`,{children:`P.O. Box: 22550, Doha - Qatar`}),(0,f.jsx)(`p`,{children:`Tel: +974 4460 4470 | Mobile: +974 5554 4470`}),(0,f.jsx)(`p`,{children:`Email: info@qatarcargo.com`})]})]}),(0,f.jsxs)(`div`,{className:`qr-code flex flex-col items-center`,children:[(0,f.jsx)(u,{value:p?`${window.location.origin}/schedules/display/${p.id}?schedule=${p.schedule_number}&date=${p.schedule_date}&vehicle=${p.vehicle}&verified=true`:``,size:100,level:`M`,includeMargin:!0,className:`border border-gray-300`}),(0,f.jsx)(`p`,{className:`text-xs text-gray-600 mt-1 text-center`,children:`Scan for Details`})]})]}),(0,f.jsxs)(`div`,{className:`border-2 border-blue-500 p-4 mb-6`,children:[(0,f.jsx)(`h2`,{className:`text-xl font-bold text-center mb-4`,children:`JOB SCHEDULE`}),(0,f.jsxs)(`div`,{className:`grid grid-cols-2 gap-4`,children:[(0,f.jsxs)(`div`,{children:[(0,f.jsxs)(`p`,{children:[(0,f.jsx)(`strong`,{children:`Schedule Number:`}),` `,p.schedule_number]}),(0,f.jsxs)(`p`,{children:[(0,f.jsx)(`strong`,{children:`Date:`}),` `,S(p.schedule_date)]}),(0,f.jsxs)(`p`,{children:[(0,f.jsx)(`strong`,{children:`Vehicle:`}),` `,p.vehicle]})]}),(0,f.jsxs)(`div`,{children:[(0,f.jsxs)(`p`,{children:[(0,f.jsx)(`strong`,{children:`Sales Representative:`}),` `,p.sales_rep]}),p.driver&&(0,f.jsxs)(`p`,{children:[(0,f.jsx)(`strong`,{children:`Driver:`}),` `,p.driver]}),p.helper&&(0,f.jsxs)(`p`,{children:[(0,f.jsx)(`strong`,{children:`Helper:`}),` `,p.helper]})]})]})]}),(0,f.jsx)(`div`,{className:`mb-6`,children:(0,f.jsxs)(`table`,{className:`w-full border-collapse border border-black`,children:[(0,f.jsx)(`thead`,{children:(0,f.jsxs)(`tr`,{className:`bg-blue-500 text-white`,children:[(0,f.jsx)(`th`,{className:`border border-black p-2 text-left`,children:`SL#`}),(0,f.jsx)(`th`,{className:`border border-black p-2 text-left`,children:`Job Number`}),(0,f.jsx)(`th`,{className:`border border-black p-2 text-left`,children:`Customer`}),(0,f.jsx)(`th`,{className:`border border-black p-2 text-left`,children:`From Address`}),(0,f.jsx)(`th`,{className:`border border-black p-2 text-left`,children:`To Address`}),(0,f.jsx)(`th`,{className:`border border-black p-2 text-left`,children:`Service Type`}),(0,f.jsx)(`th`,{className:`border border-black p-2 text-left`,children:`Items`}),(0,f.jsx)(`th`,{className:`border border-black p-2 text-left`,children:`Signature`})]})}),(0,f.jsx)(`tbody`,{children:h.length>0?h.map((e,t)=>{let n=e.job_data,r=n.items?n.items.length:0;return(0,f.jsxs)(`tr`,{children:[(0,f.jsx)(`td`,{className:`border border-black p-2`,children:t+1}),(0,f.jsx)(`td`,{className:`border border-black p-2`,children:n.jobNumber||`JOB-${t+1}`}),(0,f.jsx)(`td`,{className:`border border-black p-2`,children:n.customer||`N/A`}),(0,f.jsx)(`td`,{className:`border border-black p-2 text-xs`,children:n.fromAddress||`N/A`}),(0,f.jsx)(`td`,{className:`border border-black p-2 text-xs`,children:n.toAddress||`N/A`}),(0,f.jsx)(`td`,{className:`border border-black p-2`,children:n.serviceType||`N/A`}),(0,f.jsx)(`td`,{className:`border border-black p-2 text-center`,children:r}),(0,f.jsx)(`td`,{className:`border border-black p-2`,style:{minWidth:`100px`,height:`40px`}})]},e.id)}):(0,f.jsx)(`tr`,{children:(0,f.jsx)(`td`,{colSpan:8,className:`border border-black p-4 text-center`,children:`No jobs found in this schedule`})})})]})}),(0,f.jsxs)(`div`,{className:`grid grid-cols-2 gap-6 mt-6`,children:[(0,f.jsxs)(`div`,{className:`border border-black p-4`,children:[(0,f.jsx)(`h3`,{className:`font-bold mb-2`,children:`Schedule Summary`}),(0,f.jsxs)(`p`,{children:[`Total Jobs: `,h.length]}),(0,f.jsxs)(`p`,{children:[`Vehicle: `,p.vehicle]}),(0,f.jsxs)(`p`,{children:[`Date: `,S(p.schedule_date)]})]}),(0,f.jsxs)(`div`,{className:`border border-black p-4`,children:[(0,f.jsx)(`h3`,{className:`font-bold mb-2`,children:`Team Signatures`}),(0,f.jsxs)(`div`,{className:`space-y-4`,children:[(0,f.jsxs)(`div`,{children:[(0,f.jsxs)(`p`,{className:`text-sm`,children:[`Sales Rep: `,p.sales_rep]}),(0,f.jsx)(`div`,{className:`border-b border-gray-400 mt-2`,style:{height:`30px`}})]}),p.driver&&(0,f.jsxs)(`div`,{children:[(0,f.jsxs)(`p`,{className:`text-sm`,children:[`Driver: `,p.driver]}),(0,f.jsx)(`div`,{className:`border-b border-gray-400 mt-2`,style:{height:`30px`}})]}),p.helper&&(0,f.jsxs)(`div`,{children:[(0,f.jsxs)(`p`,{className:`text-sm`,children:[`Helper: `,p.helper]}),(0,f.jsx)(`div`,{className:`border-b border-gray-400 mt-2`,style:{height:`30px`}})]})]})]})]}),(0,f.jsxs)(`div`,{className:`mt-6 text-center text-xs text-gray-600`,children:[(0,f.jsx)(`p`,{children:`This is a computer-generated schedule. For verification, scan the QR code above.`}),(0,f.jsxs)(`p`,{children:[`Generated on: `,new Date().toLocaleDateString(),` at `,new Date().toLocaleTimeString()]})]})]})]}):(0,f.jsx)(`div`,{className:`flex items-center justify-center h-64`,children:(0,f.jsx)(`div`,{className:`text-lg`,children:`Schedule not found`})})};export{p as default};