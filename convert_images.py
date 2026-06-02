import os
from PIL import Image

def optimize_images(directory):
    for filename in os.listdir(directory):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg')) and not filename.lower().endswith('.webp'):
            file_path = os.path.join(directory, filename)
            try:
                img = Image.open(file_path)
                # Convert to RGB if it's RGBA and we're saving to jpeg (though webp supports RGBA)
                
                webp_path = os.path.join(directory, os.path.splitext(filename)[0] + '.webp')
                img.save(webp_path, 'webp', quality=80, optimize=True)
                print(f"Optimized: {filename} -> {os.path.basename(webp_path)}")
            except Exception as e:
                print(f"Error optimizing {filename}: {e}")

if __name__ == '__main__':
    optimize_images('Images')
    optimize_images('news-images')
