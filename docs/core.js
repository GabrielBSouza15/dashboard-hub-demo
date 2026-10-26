
(function(root){'use strict';
function dayKey(value){if(!value)return null;const d=new Date(value);return isNaN(d.getTime())?null:new Intl.DateTimeFormat('en-CA',{timeZone:'America/Sao_Paulo',year:'numeric',month:'2-digit',day:'2-digit'}).format(d);}
function latestDate(values){const valid=values.filter(v=>v!==null&&v!==undefined&&String(v).trim()!=='').map(v=>new Date(v)).filter(d=>!isNaN(d.getTime()));return valid.length?new Date(Math.max(...valid.map(d=>d.getTime()))).toISOString():null;}
function validDemoLink(value){return /^report\.html\?id=(producao|prazos|qualidade|capacidade)$/.test(value||'');}
function summarize(items,now){const today=dayKey(now);if(!today)throw Error('Data de referência inválida');const first=new Date(today+'T12:00:00Z');first.setUTCDate(first.getUTCDate()-6);const start=dayKey(first);const available=items.filter(d=>d.state==='available'&&validDemoLink(d.url));return {total:items.length,available:available.length,construction:items.length-available.length,recent:available.filter(d=>{const key=dayKey(d.updated);return key&&key>=start&&key<=today;}).length};}
const api={dayKey,latestDate,validDemoLink,summarize};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.HubCore=api;
})(typeof window!=='undefined'?window:globalThis);
