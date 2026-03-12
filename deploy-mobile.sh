#!/bin/bash
# ReeveOS Mobile App — Deploy Script
# Run this on the VPS: bash deploy-mobile.sh

set -e

APP_DIR="/opt/reeveos-mobile"
REPO="https://github.com/Reeveos-Hub/mobile.git"
# If repo is private, use: git clone https://YOUR_TOKEN@github.com/Reeveos-Hub/mobile.git

echo "=== ReeveOS Mobile Deploy ==="

# Clone or pull
if [ -d "$APP_DIR" ]; then
  echo "→ Pulling latest..."
  cd "$APP_DIR"
  git stash 2>/dev/null || true
  git pull
else
  echo "→ Cloning repo..."
  git clone "$REPO" "$APP_DIR"
  cd "$APP_DIR"
fi

# Install deps (skip if node_modules exists and package.json unchanged)
echo "→ Installing dependencies..."
npm install --production=false 2>&1 | tail -3

# Build
echo "→ Building app..."
npx vite build 2>&1 | tail -5

echo ""
echo "=== Build complete ==="
echo "Static files at: $APP_DIR/dist"
echo ""
echo "Now add the Nginx config (see nginx-mobile.conf) and reload:"
echo "  sudo cp $APP_DIR/nginx-mobile.conf /etc/nginx/snippets/mobile-app.conf"
echo "  sudo nginx -t && sudo systemctl reload nginx"
echo ""
echo "Then open: https://portal.rezvo.app/app/"
