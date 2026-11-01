import urllib.request,re,json
from urllib.parse import urljoin
from pathlib import Path
sites={'higgsfield':'https://higgsfield.ai','google-flow':'https://labs.google/flow/','kling':'https://klingai.com','heygen':'https://www.heygen.com','magnific':'https://magnific.ai','flora':'https://www.florafauna.ai','openart':'https://openart.ai','artlist':'https://artlist.io','elevenlabs':'https://elevenlabs.io','suno':'https://suno.com','sora':'https://sora.com','grok':'https://grok.com','chatgpt':'https://chatgpt.com','claude':'https://claude.ai'}
out=Path('public/assets/tool-logos');out.mkdir(parents=True,exist_ok=True)
results={}
for key,url in sites.items():
 try:
  req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'})
  html=urllib.request.urlopen(req,timeout=12).read().decode('utf-8',errors='ignore')
  icons=[]
  for tag in re.findall(r'<link\b[^>]*>',html,re.I):
   if re.search(r'rel=["\'][^"\']*icon',tag,re.I):
    href=re.search(r'href=["\']([^"\']+)',tag,re.I)
    if href:icons.append(urljoin(url,href.group(1)))
  source=icons[-1] if icons else urljoin(url,'/favicon.ico')
  response=urllib.request.urlopen(urllib.request.Request(source,headers={'User-Agent':'Mozilla/5.0'}),timeout=12)
  data=response.read();mime=response.headers.get('Content-Type','');ext='.svg' if 'svg' in mime or b'<svg' in data[:300] else '.png' if data[:4]==b'\x89PNG' else '.ico'
  (out/(key+ext)).write_bytes(data);results[key]={'file':key+ext,'source':source}
 except Exception as e:results[key]={'error':str(e)}
Path('tool-logo-sources.json').write_text(json.dumps(results,indent=2))
print(json.dumps(results))
