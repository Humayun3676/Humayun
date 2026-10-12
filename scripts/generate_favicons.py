import os
from PIL import Image

def generate_favicons():
    src_path = 'public/humayun.jpg'
    if not os.path.exists(src_path):
        raise FileNotFoundError(f"Source portrait not found at {src_path}")

    with Image.open(src_path) as img:
        # Tight, square head-and-shoulders crop centered on the face
        # Original is 681 x 1024. Face bbox is [280, 187, 316, 316] (center: 438, 345)
        # Box (130, 40, 670, 580) gives a 540x540 square with full hair, shoulders, and centered face
        crop = img.crop((130, 40, 670, 580))

        # 1. Generate PNGs at required resolutions
        sizes = {
            'public/favicon-16x16.png': 16,
            'public/favicon-32x32.png': 32,
            'public/favicon-48x48.png': 48,
            'public/favicon-96x96.png': 96,
            'public/favicon-192x192.png': 192,
            'public/android-chrome-192x192.png': 192,
            'public/apple-touch-icon.png': 180,
            'public/android-chrome-512x512.png': 512,
        }

        for path, sz in sizes.items():
            resized = crop.resize((sz, sz), Image.Resampling.LANCZOS)
            resized.save(path, 'PNG', optimize=True)
            print(f"Generated {path} ({sz}x{sz}, {os.path.getsize(path)} bytes)")

        # 2. Multi-size ICO with 16, 32, and 48px
        ico_sizes = [(16, 16), (32, 32), (48, 48)]
        ico_base = crop.resize((48, 48), Image.Resampling.LANCZOS)
        ico_path = 'public/favicon.ico'
        ico_base.save(ico_path, format='ICO', sizes=ico_sizes)
        print(f"Generated {ico_path} with sizes [16, 32, 48] ({os.path.getsize(ico_path)} bytes)")

    # 3. Remove favicon.svg so browsers never prefer SVG over PNG
    svg_path = 'public/favicon.svg'
    if os.path.exists(svg_path):
        os.remove(svg_path)
        print(f"Removed {svg_path} to prioritize crisp PNG search logo.")

if __name__ == '__main__':
    generate_favicons()
