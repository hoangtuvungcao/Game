# Hướng Dẫn Deploy Lên Vercel

## Bá Chủ Khu Rừng - Deployment Guide

Tài liệu này hướng dẫn cách deploy trò chơi lên Vercel.

---

## 1. Điều Kiện Tiên Quyết

✓ GitHub repository được kết nối
✓ Vercel account (vercel.com)
✓ Node.js 18+ đã cài đặt (nếu build locally)

---

## 2. Cách Deploy Qua v0 UI

### Phương Pháp 1: Sử Dụng v0 Publish Button (Đơn Giản Nhất)

1. **Mở Settings** (nút gear ⚙️ ở góc phải trên cùng v0)
2. **Kiểm tra Git Connection**
   - Repository: `hoangtuvungcao/Game`
   - Branch: `game-mode-redesign`
   - Status: Connected ✓

3. **Nhấn "Publish" Button** (ở góc trên phải)
   - v0 sẽ tự động commit changes lên GitHub
   - Vercel sẽ tự động trigger build

### Phương Pháp 2: Manual Deploy (Nếu Publish Button Không Hoạt động)

1. **Commit & Push từ v0**
   - Mở Settings > Git
   - Xem Git Activity để verify commits
   - Nếu cần, pull changes nếu có conflicts

2. **Deploy Trên Vercel.com**
   - Truy cập https://vercel.com/dashboard
   - Chọn project `Game`
   - Nếu chưa connect:
     - Click "Import Project"
     - Chọn GitHub repository `hoangtuvungcao/Game`
     - Xác định root directory: `game/`
     - Click "Deploy"

---

## 3. Build Configuration

### Vercel Project Settings

**Project Directory**
```
game/
```

**Build Command**
```bash
npm run build
```

**Output Directory**
```
dist/
```

**Install Command**
```bash
npm install
```

### Environment Variables (Nếu Cần)

Không có environment variables required hiện tại. Nếu thêm sau:
- Mở Vercel Dashboard > Project > Settings > Environment Variables
- Thêm các biến cần thiết

---

## 4. Kiểm Tra Build Cục Bộ (Optional)

Để test build trước khi deploy:

```bash
# Di chuyển đến game folder
cd game/

# Install dependencies
npm install

# Build
npm run build

# Preview build
npm run preview
```

---

## 5. Monitoring & Troubleshooting

### Xem Build Logs
1. Mở https://vercel.com/dashboard
2. Chọn project `Game`
3. Mở tab "Deployments"
4. Chọn deployment muốn xem
5. Xem build logs chi tiết

### Phổ Biến Issues

**Issue 1: Build Fail - Missing Dependencies**
```
Fix: npm install --save phaser
```

**Issue 2: Output Directory Not Found**
```
Kiểm tra vite.config.js:
- outDir phải là "dist"
- Chạy npm run build cục bộ để verify
```

**Issue 3: Wrong Root Directory**
```
Settings > Root Directory: game/
```

---

## 6. Vercel URL & Custom Domain

### Vercel Auto-Generated URL
```
https://game-[random].vercel.app
```

### Custom Domain (Optional)
1. Vercel Dashboard > Project > Settings > Domains
2. Click "Add"
3. Thêm domain của bạn
4. Update DNS records theo hướng dẫn Vercel

---

## 7. Performance Optimization

### Đã Configured
✓ Minification (terser)
✓ Source maps disabled (production)
✓ Asset optimization
✓ Gzip compression (automatic)

### Monitoring
- Vercel Analytics: https://vercel.com/analytics
- Xem real-time metrics
- Performance insights

---

## 8. Rollback & Versioning

Nếu cần rollback:

1. Vercel Dashboard > Deployments
2. Tìm deployment cần rollback
3. Click "Promote to Production"

---

## 9. Continuous Deployment

### Tự Động Deploy Mỗi Khi Push
Vercel tự động deploy khi:
- Push đến branch `main` hoặc `game-mode-redesign`
- GitHub webhook được kích hoạt
- Build thành công

### Disable Auto Deploy (Nếu Cần)
Settings > Git > Auto Deploy > Disable

---

## 10. Quick Checklist

Trước khi deploy:

- [ ] Tất cả changes đã commit
- [ ] GitHub repository connected
- [ ] vite.config.js có outDir: "dist"
- [ ] package.json có build script
- [ ] Root directory set to: `game/`
- [ ] No console errors locally
- [ ] Assets loaded correctly
- [ ] UI responsive trên mobile

---

## 11. Post-Deployment Verification

Sau khi deploy thành công:

1. **Verify Game Loads**
   - Truy cập Vercel URL
   - Kiểm tra console có errors
   - Test main menu, game modes
   
2. **Performance Check**
   - DevTools > Performance tab
   - Kiểm tra FPS on mobile
   - Xem build size (DevTools > Network)

3. **Mobile Testing**
   - Mở URL trên iPhone/Android
   - Test touch controls
   - Verify responsive design

---

## 12. Support & Issues

### Nếu Gặp Vấn Đề
1. Kiểm tra Vercel build logs
2. Xem browser console errors
3. Rebuild từ Vercel Dashboard
4. Contact Vercel support: vercel.com/help

### Hữu Ích Resources
- [Vercel Docs](https://vercel.com/docs)
- [Vite Build Guide](https://vitejs.dev/guide/build.html)
- [Phaser Documentation](https://phaser.io/docs)

---

## Status

**Current Branch**: `game-mode-redesign`
**Last Update**: 2026-03-14
**Game Version**: 0.3.2
**Vite Version**: 5.4.0

