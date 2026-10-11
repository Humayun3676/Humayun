import os
import shutil
from PIL import Image

def optimize():
    certs_dir = 'public/certificates'
    logos_dir = 'public/logos'
    backup_certs = 'backup-assets/certificates'
    backup_logos = 'backup-assets/logos'

    os.makedirs(backup_certs, exist_ok=True)
    os.makedirs(backup_logos, exist_ok=True)

    # 1. Backup & Convert Certificates
    cert_files = [f for f in os.listdir(certs_dir) if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
    print(f"Found {len(cert_files)} certificates to process.")

    for f in cert_files:
        src = os.path.join(certs_dir, f)
        dest_backup = os.path.join(backup_certs, f)
        if not os.path.exists(dest_backup):
            shutil.copy2(src, dest_backup)

        base_name, _ = os.path.splitext(f)
        webp_name = f"{base_name}.webp"
        webp_path = os.path.join(certs_dir, webp_name)

        with Image.open(src) as img:
            # Ensure RGB mode for WebP
            if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
                img = img.convert('RGBA')
            else:
                img = img.convert('RGB')
            # Save WebP with high quality for text readability
            img.save(webp_path, 'WEBP', quality=85, method=6)

        # Remove the heavy original PNG from public (it's safe in backup-assets)
        os.remove(src)

    # 2. Backup & Convert Logos
    logo_files = [f for f in os.listdir(logos_dir) if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
    print(f"Found {len(logo_files)} logos to process.")

    for f in logo_files:
        src = os.path.join(logos_dir, f)
        dest_backup = os.path.join(backup_logos, f)
        if not os.path.exists(dest_backup):
            shutil.copy2(src, dest_backup)

        base_name, _ = os.path.splitext(f)
        webp_name = f"{base_name}.webp"
        webp_path = os.path.join(logos_dir, webp_name)

        with Image.open(src) as img:
            # Maintain alpha transparency for logos
            if img.mode != 'RGBA':
                img = img.convert('RGBA')
            # Optimize logo size: max 240px wide while maintaining aspect ratio
            w, h = img.size
            if w > 240:
                new_h = int(h * (240 / w))
                img = img.resize((240, new_h), Image.Resampling.LANCZOS)
            img.save(webp_path, 'WEBP', quality=90, method=6)

        # Remove heavy original PNG from public (safe in backup-assets)
        os.remove(src)

    print("Media optimization complete!")

if __name__ == '__main__':
    optimize()
