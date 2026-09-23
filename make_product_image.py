from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance, ImageFont

ROOT = Path(r"C:\Users\cocad\Documents\Codex\2026-09-13\gu")
OUT = ROOT / "output" / "el-botiquin-de-keiko-hotmart.png"
BG = Path(r"C:\Users\cocad\.codex\generated_images\01a0cb45-28a9-75e2-b824-97373fbe6b20\exec-752272de-e4d9-4509-80e2-7830e2d09000.png")
COVER = ROOT / "tmp" / "pdfs" / "cover-v2" / "cover-panorama-01.png"

canvas = Image.open(BG).convert("RGBA").resize((1200, 1200), Image.Resampling.LANCZOS)
# Make the intentionally empty left field even calmer for high-contrast product copy.
overlay = Image.new("RGBA", canvas.size, (11, 39, 35, 0))
omask = Image.new("L", canvas.size, 0)
ImageDraw.Draw(omask).rounded_rectangle((0, 0, 570, 1200), radius=0, fill=220)
omask = omask.filter(ImageFilter.GaussianBlur(18))
overlay.putalpha(omask)
canvas = Image.alpha_composite(canvas, overlay)
draw = ImageDraw.Draw(canvas)
draw.rectangle((0, 0, 17, 1200), fill=(201, 77, 46, 255))
draw.rounded_rectangle((56, 60, 295, 106), radius=23, fill=(243, 238, 229, 255))
try:
    from PIL import ImageFont
    font = ImageFont.truetype(r"C:\Windows\Fonts\segoeuib.ttf", 20)
    small = ImageFont.truetype(r"C:\Windows\Fonts\segoeuib.ttf", 16)
except OSError:
    font = small = None
draw.text((79, 71), "GUÍA VISUAL · PDF", fill=(19,45,41), font=font)
display = ImageFont.truetype(r"C:\Windows\Fonts\georgiab.ttf", 65)
display2 = ImageFont.truetype(r"C:\Windows\Fonts\georgiab.ttf", 45)
body = ImageFont.truetype(r"C:\Windows\Fonts\segoeui.ttf", 25)
label = ImageFont.truetype(r"C:\Windows\Fonts\segoeuib.ttf", 20)
draw.text((67, 212), "EL JARDÍN DE KEIKO", fill=(213,168,70), font=label)
draw.text((67, 278), "El Botiquín", fill=(255,255,255), font=display)
draw.text((67, 352), "de Keiko", fill=(255,255,255), font=display)
draw.text((67, 474), "15 problemas de plantas", fill=(255,255,255), font=display2)
draw.text((67, 530), "que puedes identificar", fill=(255,255,255), font=display2)
draw.text((67, 586), "y resolver.", fill=(255,255,255), font=display2)
draw.rounded_rectangle((67, 690, 458, 788), radius=16, fill=(201,77,46,255))
draw.text((91, 715), "MIRA LA SEÑAL", fill=(255,255,255), font=label)
draw.text((91, 748), "CONFIRMA · ACTÚA", fill=(255,255,255), font=label)
draw.text((67, 1091), "68 PÁGINAS · PAGO ÚNICO · ACCESO INMEDIATO", fill=(213,168,70), font=small)

OUT.parent.mkdir(parents=True, exist_ok=True)
canvas.convert("RGB").save(OUT, "PNG", optimize=True)
print(OUT)
print(f"{OUT.stat().st_size / 1024 / 1024:.2f} MB")
