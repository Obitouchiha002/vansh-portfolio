AI GRAPHICS — drop files into the RIGHT type folder. Each type = its own tab.

  graphics/        -> "AI Graphics" tab     (normal AI images)
  posters/         -> "Posters" tab
  infographics/    -> "Infographics" tab
  carousels/       -> "Carousels" tab       (see below)

SINGLE IMAGES (graphics / posters / infographics):
- Just drop an image into the folder: .png .jpg .jpeg .webp .gif .svg
- The file name becomes the title.
    cyberpunk-city.png  ->  "Cyberpunk City"
- It appears automatically in that type's tab. Click = opens in a popup.

CAROUSELS (multi-slide posts):
- Make ONE folder per carousel inside  carousels/
    carousels/my-launch-post/
        1.png
        2.png
        3.png
- The folder name becomes the carousel title (my-launch-post -> "My Launch Post").
- Name slides 1, 2, 3... so they show in the right order.
- On the site it shows as ONE card with a slide count; clicking opens a
  swipe-able slider (next / previous).
- You can delete the "example-carousel" folder.

After adding files, restart the dev server (npm run dev) or rebuild so Vite picks them up.
