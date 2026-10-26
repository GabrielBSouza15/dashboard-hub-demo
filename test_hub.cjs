const test=require('node:test');const assert=require('node:assert/strict');
const {dayKey,latestDate,validDemoLink,summarize}=require('./docs/core.js');
const now='2026-10-26T12:00:00-03:00';
const item=(date,extra={})=>({state:'available',url:'report.html?id=producao',updated:date,...extra});
test('janela inclui hoje e seis dias anteriores; exclui datas futuras e antigas',()=>{
  const list=['2026-10-26T09:00:00-03:00','2026-10-20T00:00:00-03:00','2026-10-19T23:59:00-03:00','2026-10-27T00:00:00-03:00'].map(d=>item(d));
  assert.deepEqual(summarize(list,now),{total:4,available:4,construction:0,recent:2});
});
test('data inválida, ausente e itens sem link não contam como recentes',()=>{
  assert.equal(summarize([item(null),item('inválida'),item(now,{url:''}),item(now,{state:'construction'})],now).recent,0);
});
test('limite de meia-noite usa São Paulo',()=>{assert.equal(dayKey('2026-10-27T01:30:00Z'),'2026-10-26');});
test('maior data pode estar antes da última linha',()=>{assert.equal(latestDate(['2026-10-26T10:00:00Z','2026-10-20T12:00:00Z',null,'inválida']),'2026-10-26T10:00:00.000Z');});
test('ausência de datas válidas não vira data de consulta',()=>{assert.equal(latestDate([null,'','invalida']),null);});
test('links do catálogo ficam limitados aos relatórios locais conhecidos',()=>{assert.equal(validDemoLink('report.html?id=prazos'),true);for(const value of ['javascript:alert(1)','https://example.com','report.html?id=nao-cadastrado'])assert.equal(validDemoLink(value),false);});
