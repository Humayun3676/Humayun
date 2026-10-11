import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def generate():
    os.makedirs('public', exist_ok=True)
    os.makedirs('backup-assets', exist_ok=True)

    # 1. Hero Portrait to WebP
    if os.path.exists('public/humayun.jpg'):
        with Image.open('public/humayun.jpg') as img:
            img.save('public/humayun-mirza-software-engineer.webp', 'WEBP', quality=88, method=6)
            print("Generated humayun-mirza-software-engineer.webp")

    # 2. Source for icons / avatar
    src_profile_path = 'backup-assets/profile.png' if os.path.exists('backup-assets/profile.png') else 'public/profile.png'
    with Image.open(src_profile_path) as profile_img:
        # Navbar avatar WebP (160x160 for crisp 2x retina on 32-40px displays)
        nav_avatar = profile_img.resize((160, 160), Image.Resampling.LANCZOS)
        nav_avatar.save('public/profile-nav.webp', 'WEBP', quality=90)
        print("Generated profile-nav.webp")

        # Replace oversized public/profile.png with an optimized 400x400 PNG fallback (~40KB vs 2.2MB)
        optimized_profile = profile_img.resize((400, 400), Image.Resampling.LANCZOS)
        optimized_profile.save('public/profile.png', 'PNG', optimize=True)
        print("Optimized public/profile.png")

        # Favicons & Touch icons
        fav16 = profile_img.resize((16, 16), Image.Resampling.LANCZOS)
        fav16.save('public/favicon-16x16.png', 'PNG')

        fav32 = profile_img.resize((32, 32), Image.Resampling.LANCZOS)
        fav32.save('public/favicon-32x32.png', 'PNG')

        fav180 = profile_img.resize((180, 180), Image.Resampling.LANCZOS)
        fav180.save('public/apple-touch-icon.png', 'PNG')

        fav192 = profile_img.resize((192, 192), Image.Resampling.LANCZOS)
        fav192.save('public/android-chrome-192x192.png', 'PNG')

        fav512 = profile_img.resize((512, 512), Image.Resampling.LANCZOS)
        fav512.save('public/android-chrome-512x512.png', 'PNG')

        # Multi-size ICO
        fav32.save('public/favicon.ico', format='ICO', sizes=[(16, 16), (32, 32), (48, 48)])
        print("Generated standard favicons and favicon.ico")

    # 3. Create 1200x630 Open Graph / Twitter Card Image (og-image.png)
    og_w, og_h = 1200, 630
    og_img = Image.new('RGB', (og_w, og_h), color='#0B1120')
    draw = ImageDraw.Draw(og_img)

    # Ambient glow blobs
    glow = Image.new('RGBA', (og_w, og_h), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    # Blue primary glow
    glow_draw.ellipse([50, -100, 650, 500], fill=(37, 99, 235, 45))
    # Indigo accent glow
    glow_draw.ellipse([700, 200, 1300, 800], fill=(99, 102, 241, 35))
    glow = glow.filter(ImageFilter.GaussianBlur(100))
    og_img.paste(glow, (0, 0), glow)

    # Load fonts
    font_bold_title = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 58)
    font_bold_sub = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 30)
    font_reg = ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', 24)
    font_pill = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 18)

    # Re-draw on base
    draw = ImageDraw.Draw(og_img)

    # Eyebrow badge / pill
    badge_text = "PORTFOLIO & RESEARCH"
    draw.rounded_rectangle([90, 85, 360, 125], radius=20, fill=(30, 41, 59), outline=(59, 130, 246), width=1)
    draw.text((120, 95), badge_text, fill=(147, 197, 253), font=font_pill)

    # Main Headline
    draw.text((90, 155), "HUMAYUN MIRZA", fill=(255, 255, 255), font=font_bold_title)

    # Subtitle
    draw.text((90, 245), "Software Engineer & AI/ML Developer", fill=(59, 130, 246), font=font_bold_sub)

    # Location & Focus
    draw.text((90, 310), "Sialkot, Pakistan • University of Sialkot", fill=(203, 213, 225), font=font_reg)

    # Description bullets
    desc_lines = [
        "Specializing in Machine Learning, Deep Learning & Computer Vision",
        "Full-Stack Web & Scalable Modern Architecture",
        "Applied AI Research & High-Performance Engineering"
    ]
    y_pos = 370
    for line in desc_lines:
        draw.text((90, y_pos), "—  " + line, fill=(148, 163, 184), font=font_reg)
        y_pos += 42

    # URL watermark pill at bottom left
    draw.rounded_rectangle([90, 520, 450, 565], radius=10, fill=(15, 23, 42), outline=(51, 65, 85), width=1)
    draw.text((110, 532), "humayun-pearl.vercel.app", fill=(226, 232, 240), font=font_pill)

    # Right side: Circular or rounded portrait
    with Image.open(src_profile_path) as p_img:
        p_resized = p_img.resize((380, 380), Image.Resampling.LANCZOS)
        # Create circular mask
        mask = Image.new('L', (380, 380), 0)
        mask_draw = ImageDraw.Draw(mask)
        mask_draw.ellipse((0, 0, 380, 380), fill=255)

        # Border ring behind portrait
        draw.ellipse([735, 125, 1125, 515], outline=(37, 99, 235), width=4)
        og_img.paste(p_resized, (740, 130), mask)

    og_img.save('public/og-image.png', 'PNG', optimize=True)
    print("Generated 1200x630 og-image.png")

if __name__ == '__main__':
    generate()
