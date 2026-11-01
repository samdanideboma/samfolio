import json,urllib.request,re
from pathlib import Path
p=Path('tool-logo-sources.json');data=json.loads(p.read_text())
for key,domain in {'magnific':'magnific.ai','artlist':'artlist.io','sora':'sora.com','chatgpt':'chatgpt.com','claude':'claude.ai'}.items():
 url='https://www.google.com/s2/favicons?domain='+domain+'&sz=128'
 try:
  b=urllib.request.urlopen(url,timeout=15).read();Path('public/assets/tool-logos/'+key+'.png').write_bytes(b);data[key]={'file':key+'.png','source':url};print(key,'saved')
 except Exception as e:print(key,e)
p.write_text(json.dumps(data,indent=2))
html=Path('ai-video.html');s=html.read_text(encoding='utf-8-sig');keys=['higgsfield','google-flow','kling','heygen','magnific','flora','openart','artlist','elevenlabs','suno','sora','grok','chatgpt','claude'];i=iter(keys)
def sub(m):
 key=next(i);file=data[key].get('file')
 return '<span class="tool-icon" aria-hidden="true"><img src="/assets/tool-logos/'+file+'" alt="" loading="lazy"></span>' if file else m.group(0)
s=re.sub(r'<span class="tool-icon tool-mark-\d" aria-hidden="true">.*?</span>',sub,s);html.write_text(s,encoding='utf-8')
