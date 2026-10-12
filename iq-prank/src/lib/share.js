export async function shareLink(url) {
  if(navigator.share){try{await navigator.share({title:'2026 智力水平综合评估系统',text:'来挑战15道逻辑与推理题！',url});return 'shared';}catch(error){if(error.name==='AbortError')return 'cancelled';}}
  try {if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(url);return 'copied';}}catch{ /* 安全上下文/授权不支持时使用手动选择链接 */ }
  return 'manual';
}
