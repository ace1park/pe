#!/usr/bin/env python3
"""폴더 전체 → 인터넷 없이 여는 한 파일 HTML (USB·메신저·전자칠판용)
   쓰는 법: python3 tools/make_single.py  →  내손안의체육_파일용.html
   - 글꼴·아이콘·화면 모양·자료·프로그램을 모두 한 파일 안에 넣음
   - 메신저·파일 미리보기에서는 '읽기 화면'(tools/preview.html, make_preview.js가 새로 만듦)이 보임"""
import base64, json, pathlib, re, subprocess, sys, datetime
R=pathlib.Path(__file__).resolve().parent.parent
OUT=pathlib.Path(sys.argv[1]) if len(sys.argv)>1 else R.parent/'내손안의체육_파일용.html'
subprocess.run(['node',str(R/'tools/make_preview.js')],check=True)
s=(R/'index.html').read_text(encoding='utf-8')
b64=lambda p: base64.b64encode((R/p).read_bytes()).decode()
def rep(a,b):
    global s
    assert s.count(a)==1,a[:70]; s=s.replace(a,b)
faces=''.join(f'@font-face{{font-family:"{fam}";font-style:normal;font-weight:{w};font-display:swap;src:url(data:font/woff2;base64,{b64("fonts/"+f)}) format("woff2")}}\n'
  for fam,w,f in [('Black Han Sans',400,'BlackHanSans.woff2'),('Gothic A1',400,'GothicA1-400.woff2'),('Gothic A1',600,'GothicA1-600.woff2'),('Gothic A1',800,'GothicA1-800.woff2')])
rep('<link rel="stylesheet" href="fonts/fonts.css">','<style>/* 글꼴: Black Han Sans · Gothic A1 (SIL Open Font License 1.1) */\n'+faces+'</style>')
rep('<link rel="stylesheet" href="css/app.css">','<style>\n'+(R/'css/app.css').read_text(encoding='utf-8')+'</style>\n<style id="st-css">\n'+(R/'tools/preview.css').read_text(encoding='utf-8')+'</style>')
rep('<link rel="icon" type="image/png" sizes="192x192" href="icons/icon-192.png">',f'<link rel="icon" type="image/png" sizes="192x192" href="data:image/png;base64,{b64("icons/icon-192.png")}">')
rep('<link rel="apple-touch-icon" href="icons/apple-touch-icon.png">',f'<link rel="apple-touch-icon" href="data:image/png;base64,{b64("icons/apple-touch-icon.png")}">')
rep('<link rel="manifest" href="manifest.webmanifest">\n','')
s=re.sub(r'<link rel="apple-touch-startup-image"[^>]*>\n?','',s)
rep('<body>\n','<body>\n<script>document.documentElement.className+=\' js\';</script>\n<div id="static">'+(R/'tools/preview.html').read_text(encoding='utf-8')+'</div>\n')
def unit_files():
    t=(R/'data/units/list.js').read_text(encoding='utf-8')
    t=re.sub(r'/\*.*?\*/','',t,flags=re.S); t='\n'.join(re.sub(r'//.*$','',l) for l in t.split('\n'))
    return ['data/units/'+n+'.js' for n in re.findall(r"'([^']+)'",t)]
def inline(f):
    js=(R/f).read_text(encoding='utf-8').replace('</script','<\\/script')
    return f'<script>/* {f} */\n{js}</script>'
for f in re.findall(r'<script src="([^"]+)"></script>', s):
    if f=='data/units/list.js': rep(f'<script src="{f}"></script>','\n'.join(inline(u) for u in unit_files()))
    else: rep(f'<script src="{f}"></script>',inline(f))
s=s.replace('</body>',f"<script>window.PE_BUILD='file-{datetime.datetime.now():%Y%m%d-%H%M}';</script>\n</body>",1)
OUT.write_text(s,encoding='utf-8'); print('built',OUT,round(len(s.encode())/1024/1024,2),'MB')
