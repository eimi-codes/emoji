# 🎨 Emoji Gallery

A collection of custom emoji images for use in Slack, Discord, and other platforms, with a beautiful web gallery powered by GitHub Pages.

## 📸 View the Gallery

Visit the live gallery: [https://eimi-codes.github.io/emoji/](https://eimi-codes.github.io/emoji/)

Browse, search, and download emojis directly from the web interface!

## 📁 Repository Structure

```
emoji/
├── emojis/          # Store your emoji image files here
├── index.html       # Gallery homepage
├── style.css        # Gallery styling
├── script.js        # Gallery functionality
└── README.md        # This file
```

## ➕ Adding New Emojis

1. **Prepare your image file:**
   - Supported formats: PNG, GIF, JPG, JPEG, WEBP, SVG
   - Recommended size: 128x128 pixels or larger
   - Keep file names descriptive and lowercase (e.g., `happy-cat.png`, `thumbs-up.gif`)

2. **Add to the repository:**
   ```bash
   # Add your emoji file to the emojis folder
   git add emojis/your-emoji-name.png
   git commit -m "Add your-emoji-name emoji"
   git push
   ```

3. **The gallery will automatically update** - GitHub Pages will rebuild and show your new emoji!

## 🚀 Using Emojis in Different Platforms

### Slack
1. Go to your Slack workspace settings
2. Click on "Customize" → "Emoji"
3. Click "Add Custom Emoji"
4. Upload the image from this repository
5. Give it a name (e.g., `:happy-cat:`)

### Discord
1. Go to Server Settings → Emoji
2. Click "Upload Emoji"
3. Select the image file from this repository
4. Give it a name

### Other Platforms
Most chat and collaboration platforms support custom emojis. Generally:
1. Navigate to emoji/sticker settings
2. Upload the image file
3. Assign a name/shortcode

## 🔍 Finding Emojis

- **Web Gallery:** Browse at [https://eimi-codes.github.io/emoji/](https://eimi-codes.github.io/emoji/)
- **Search:** Use the search box on the gallery page
- **Direct Access:** All emojis are in the `emojis/` folder

## 🛠️ Local Development

To test the gallery locally:

```bash
# Clone the repository
git clone https://github.com/eimi-codes/emoji.git
cd emoji

# Serve with any static file server, for example:
python -m http.server 8000
# or
npx serve

# Open http://localhost:8000 in your browser
```

## 📝 Tips

- **File naming:** Use descriptive, lowercase names with hyphens (e.g., `party-parrot.gif`)
- **File size:** Keep files under 1MB for faster loading
- **Transparency:** PNG format is best for emojis with transparent backgrounds
- **Animated emojis:** Use GIF format for animations
- **Accessibility:** Choose clear, recognizable images

## 🤝 Contributing

Feel free to add your own emojis! Just create a pull request with your new emoji files added to the `emojis/` folder.

## 📄 License

This repository is for personal use. Individual emoji images may have their own licenses.