'use client'

import { useRef, useState, useEffect, useCallback } from 'react'

/* ==========================================
   BUILDER CLASS GENERATOR
   ========================================== */
const BUILDER_CLASSES = [
  'Coastal Architect',
  'Async Artisan',
  'Terminal Nomad',
  'Ship-or-Die Monk',
  'Recursive Dreamer',
  'Binary Beachcomber',
  'Stack Shaman',
  'Deployment Sadhu',
  'Git Push Guru',
  'Null Pointer Yogi',
  'Regex Rascal',
  'Root Access Rishi',
  'Merge Conflict Mystic',
  'Coconut Compiler',
  'Goa Protocol Pioneer',
]

function randomBuilderClass() {
  return BUILDER_CLASSES[Math.floor(Math.random() * BUILDER_CLASSES.length)]
}

function generateBuilderId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let id = 'HH26-'
  for (let i = 0; i < 6; i++) id += chars[Math.floor(Math.random() * chars.length)]
  return id
}

/* ==========================================
   SHARE TEXT
   ========================================== */
const makeShareText = (name, builderClass) => `just got my #FrameInGoa pass 🌴

${name ? `${name} — ${builderClass}` : 'A builder heading to paradise'}

Hacker House Goa — Oct 28-31, 2026 🇮🇳
247 builders. 4 days. real ships.

Generate yours → hhgoa.com
#HackerHouseGoa #FrameInGoa #BuildInPublic`

/* ==========================================
   FRAME CONFIGS
   ========================================== */
const FRAMES = [
  { id: 'boarding', name: 'Boarding Pass', icon: '🎫', dim: '1080×566', w: 1080, h: 566 },
  { id: 'id-card', name: 'Builder ID', icon: '🪪', dim: '1080×1350', w: 1080, h: 1350 },
  { id: 'pfp', name: 'Profile', icon: '🌴', dim: '1080×1080', w: 1080, h: 1080 },
  { id: 'team', name: 'Team Frame', icon: '🤝', dim: '1200×630', w: 1200, h: 630 },
]

/* ==========================================
   SCORE CALC
   ========================================== */
function calcScore({ likes = 0, replies = 0, bookmarks = 0, retweets = 0, quotes = 0, views = 0 }) {
  const pts = likes * 1 + replies * 2 + bookmarks * 3 + retweets * 4 + quotes * 4 + views * 0.02
  return Math.min(100, Math.max(0, Math.round((pts / 500) * 100)))
}

function verdict(score) {
  if (score >= 80) return { text: 'Going viral. Goa is yours.', emoji: '🔥', color: '#FF2D84' }
  if (score >= 60) return { text: 'Strong signal. Keep pushing.', emoji: '🚀', color: '#F5D800' }
  if (score >= 40) return { text: 'Gaining traction. Share more.', emoji: '📈', color: '#F5D800' }
  if (score >= 20) return { text: 'Needs more heat. Post harder.', emoji: '💬', color: '#aaa' }
  return { text: 'Post it and watch the score climb.', emoji: '👀', color: '#888' }
}

/* ==========================================
   CANVAS HELPERS
   ========================================== */
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

/**
 * Enhanced drawPhoto with Zoom & Pan position support
 */
function drawPhoto(ctx, photo, x, y, w, h, zoom = 1, panX = 0, panY = 0) {
  if (!photo) {
    ctx.fillStyle = 'rgba(0,0,0,0.3)'
    ctx.fillRect(x, y, w, h)
    ctx.fillStyle = 'rgba(245,216,0,0.4)'
    ctx.font = `${Math.min(w, h) * 0.35}px sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('👤', x + w / 2, y + h / 2)
    ctx.textBaseline = 'alphabetic'
    return
  }

  const z = Math.max(1, zoom || 1)
  const aspect = photo.width / photo.height
  let baseW, baseH
  if (aspect > 1) {
    baseH = photo.height
    baseW = baseH
  } else {
    baseW = photo.width
    baseH = baseW
  }

  const sw = baseW / z
  const sh = baseH / z

  let sx = (photo.width - sw) / 2
  let sy = (photo.height - sh) / 2

  const maxShiftX = (photo.width - sw) / 2
  const maxShiftY = (photo.height - sh) / 2

  const shiftFactorX = maxShiftX > 5 ? maxShiftX : photo.width * 0.35
  const shiftFactorY = maxShiftY > 5 ? maxShiftY : photo.height * 0.35

  sx += ((panX || 0) / 50) * shiftFactorX
  sy += ((panY || 0) / 50) * shiftFactorY

  sx = Math.max(0, Math.min(photo.width - sw, sx))
  sy = Math.max(0, Math.min(photo.height - sh, sy))

  ctx.drawImage(photo, sx, sy, sw, sh, x, y, w, h)
}

function drawPhotoCircle(ctx, photo, cx, cy, r, zoom = 1, panX = 0, panY = 0) {
  ctx.save()
  ctx.beginPath()
  ctx.arc(cx, cy, r, 0, Math.PI * 2)
  ctx.clip()
  drawPhoto(ctx, photo, cx - r, cy - r, r * 2, r * 2, zoom, panX, panY)
  ctx.restore()
}

function drawPhotoRounded(ctx, photo, x, y, w, h, r, zoom = 1, panX = 0, panY = 0) {
  ctx.save()
  roundRect(ctx, x, y, w, h, r)
  ctx.clip()
  drawPhoto(ctx, photo, x, y, w, h, zoom, panX, panY)
  ctx.restore()
}

/* Perforated ticket edge */
function drawPerforations(ctx, x, y, length, vertical = false, count = 12) {
  const step = length / count
  for (let i = 0; i < count; i++) {
    const offset = step * i + step / 2
    ctx.beginPath()
    if (vertical) ctx.arc(x, y + offset, 9, 0, Math.PI * 2)
    else ctx.arc(x + offset, y, 9, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(0,0,0,0.8)'
    ctx.fill()
  }
}

/* Decorative dot grid */
function drawDotGrid(ctx, x, y, w, h, color = 'rgba(245,216,0,0.08)', spacing = 24) {
  for (let px = x; px < x + w; px += spacing) {
    for (let py = y; py < y + h; py += spacing) {
      ctx.beginPath()
      ctx.arc(px, py, 1.5, 0, Math.PI * 2)
      ctx.fillStyle = color
      ctx.fill()
    }
  }
}

/* Barcode lines */
function drawBarcode(ctx, x, y, w, h) {
  const bars = 44
  const barW = w / bars
  for (let i = 0; i < bars; i++) {
    const thick = Math.random() > 0.6 ? barW * 0.85 : barW * 0.4
    ctx.fillStyle = `rgba(11,104,57,${0.5 + Math.random() * 0.5})`
    ctx.fillRect(x + i * barW + (barW - thick) / 2, y, thick, h)
  }
}

/* ==========================================
   BOARDING PASS FRAME  (1080×566)
   ========================================== */
async function drawBoardingPass(ctx, photo, assets, info) {
  const W = 1080, H = 566
  ctx.canvas.width = W
  ctx.canvas.height = H

  // Base — warm cream paper
  ctx.fillStyle = '#F5EDD6'
  ctx.fillRect(0, 0, W, H)

  // Dot matrix pattern
  drawDotGrid(ctx, 0, 0, W, H, 'rgba(11,104,57,0.04)', 20)

  // Left stub — dark green section (photo area)
  const STUB = 330
  ctx.fillStyle = '#0B6839'
  ctx.fillRect(0, 0, STUB, H)

  // Ornament border / palm tree overlay on stub
  if (assets.ornament) {
    ctx.save()
    ctx.globalAlpha = 0.18
    ctx.drawImage(assets.ornament, 0, 0, STUB, H)
    ctx.restore()
  }

  // Photo circle in stub
  const photoR = 98
  const photoCX = STUB / 2
  const photoCY = H / 2 - 24
  ctx.save()
  ctx.beginPath()
  ctx.arc(photoCX, photoCY, photoR + 6, 0, Math.PI * 2)
  ctx.strokeStyle = '#F5D800'
  ctx.lineWidth = 4
  ctx.stroke()
  ctx.restore()

  drawPhotoCircle(ctx, photo, photoCX, photoCY, photoR, info.photoZoom, info.photoPanX, info.photoPanY)

  // Dashed ring
  ctx.save()
  ctx.beginPath()
  ctx.arc(photoCX, photoCY, photoR + 16, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(245,216,0,0.4)'
  ctx.lineWidth = 2
  ctx.setLineDash([8, 6])
  ctx.stroke()
  ctx.setLineDash([])
  ctx.restore()

  // Passenger Name on Stub
  const displayName = (info.name || 'YOUR NAME').toUpperCase()
  ctx.fillStyle = '#FAFAF8'
  ctx.font = 'bold 22px "Space Grotesk", sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText(displayName.length > 15 ? displayName.slice(0, 15) + '…' : displayName, STUB / 2, photoCY + photoR + 32)

  // Bolder Builder Class with increased font size (+2pt: 16px bold)
  ctx.fillStyle = '#FF2D84'
  ctx.font = '800 16px "Space Grotesk", sans-serif'
  ctx.fillText((info.builderClass || 'Builder').toUpperCase(), STUB / 2, photoCY + photoR + 54)

  // Stub bottom tag
  ctx.fillStyle = '#F5D800'
  ctx.fillRect(0, H - 56, STUB, 56)
  ctx.fillStyle = '#0B6839'
  ctx.font = 'bold 18px "Space Grotesk", sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('BOARDING PASS', STUB / 2, H - 22)

  // Perforation tear line
  ctx.strokeStyle = '#0B6839'
  ctx.lineWidth = 2
  ctx.setLineDash([10, 8])
  ctx.beginPath()
  ctx.moveTo(STUB + 1, 0)
  ctx.lineTo(STUB + 1, H)
  ctx.stroke()
  ctx.setLineDash([])

  drawPerforations(ctx, STUB + 10, 15, W - STUB - 20, false, 10)
  drawPerforations(ctx, STUB + 10, H - 15, W - STUB - 20, false, 10)

  // Right side content
  const RX = STUB + 40
  const contentW = W - STUB - 60

  // Top right header title without text overlap
  ctx.fillStyle = '#0B6839'
  ctx.font = 'bold 48px "Space Grotesk", sans-serif'
  ctx.textAlign = 'left'
  const title1 = 'HACKER HOUSE'
  ctx.fillText(title1, RX, 90)
  const title1W = ctx.measureText(title1).width

  ctx.fillStyle = '#FF2D84'
  ctx.font = 'bold 36px "Space Grotesk", sans-serif'
  ctx.fillText('गोवा', RX + title1W + 14, 88)

  ctx.fillStyle = '#0B6839'
  ctx.font = '600 12px "JetBrains Mono", monospace'
  ctx.fillText('GOA, INDIA  ✦  OCT 28–31, 2026', RX, 114)

  // Divider
  ctx.fillStyle = '#0B6839'
  ctx.fillRect(RX, 130, contentW - 20, 2)

  // Dynamic Fields Collection (Only show fields user entered!)
  const activeFields = []

  // Always present
  activeFields.push({ label: 'PASSENGER', val: info.name || 'YOUR NAME' })
  activeFields.push({ label: 'GATE / SEAT', val: `28 OCT · ${info.builderId?.slice(-4) || 'B247'}` })

  // Role if entered
  if (info.role) {
    activeFields.push({ label: 'ROLE', val: info.role })
  }

  // Location if entered
  if (info.location) {
    activeFields.push({ label: 'LOCATION', val: info.location })
  }

  // Tech Stack (ONLY IF PROVIDED BY USER)
  if (info.stack && info.stack.trim() !== '') {
    activeFields.push({ label: 'TECH STACK', val: info.stack.trim() })
  }

  // Socials (ONLY IF AT LEAST ONE IS PROVIDED)
  const primarySocial = info.handle ? `@${info.handle}` : (info.github ? `github/${info.github}` : (info.instagram ? `@${info.instagram}` : info.website))
  if (primarySocial && primarySocial.trim() !== '') {
    activeFields.push({ label: 'HANDLE / SOCIAL', val: primarySocial.trim() })
  }

  // Layout active fields in 2 columns dynamically
  const fieldYStart = 168
  const rowHeight = 52
  const colW = (contentW - 40) / 2

  activeFields.forEach((field, i) => {
    const colIdx = i % 2
    const rowIdx = Math.floor(i / 2)
    const fx = RX + colIdx * (colW + 20)
    const fy = fieldYStart + rowIdx * rowHeight

    ctx.fillStyle = '#777'
    ctx.font = '600 10px "JetBrains Mono", monospace'
    ctx.textAlign = 'left'
    ctx.fillText(field.label, fx, fy)

    ctx.fillStyle = '#111'
    ctx.font = 'bold 16px "Space Grotesk", sans-serif'
    const displayV = field.val.length > 22 ? field.val.slice(0, 22) + '…' : field.val
    ctx.fillText(displayV, fx, fy + 22)
  })

  // Barcode section
  const bcY = H - 128
  ctx.fillStyle = 'rgba(11,104,57,0.08)'
  roundRect(ctx, RX, bcY, contentW - 20, 56, 8)
  ctx.fill()
  drawBarcode(ctx, RX + 10, bcY + 8, contentW - 60, 28)
  ctx.fillStyle = '#0B6839'
  ctx.font = '600 11px "JetBrains Mono", monospace'
  ctx.textAlign = 'center'
  ctx.fillText(info.builderId || 'HH26-XXXXXX', RX + (contentW - 60) / 2, bcY + 48)

  // Hashtag strip
  ctx.fillStyle = '#0B6839'
  ctx.fillRect(STUB + 8, H - 52, W - STUB - 8, 52)
  ctx.fillStyle = '#F5D800'
  ctx.font = 'bold 20px "Space Grotesk", sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('#FrameInGoa  ·  hhgoa.com', STUB + (W - STUB) / 2, H - 24)

  // Corner accents
  ctx.fillStyle = '#FF2D84'
  ;[[STUB + 8, 0], [W - 32, 0]].forEach(([cx, cy]) => {
    ctx.fillRect(cx, cy, 24, 24)
  })
}

/* ==========================================
   CREATIVE BUILDER ID CARD (1080×1350)
   Human Designed Beach Resort VIP Pass
   ========================================== */
async function drawIdCard(ctx, photo, assets, info) {
  const W = 1080, H = 1350
  ctx.canvas.width = W
  ctx.canvas.height = H

  // Outer Emerald Background
  ctx.fillStyle = '#052C17'
  ctx.fillRect(0, 0, W, H)

  // Blended Background Scene using provided images (sunrise / agenda)
  if (assets.sunrise || assets.agenda) {
    const bgImg = assets.sunrise || assets.agenda
    ctx.save()
    ctx.globalAlpha = 0.28
    const bW = W
    const bH = (bgImg.height / bgImg.width) * bW
    ctx.drawImage(bgImg, 0, 0, bW, bH)
    ctx.restore()
  }

  // Ornament border overlay (64.webp)
  if (assets.ornament) {
    ctx.save()
    ctx.globalAlpha = 0.22
    ctx.drawImage(assets.ornament, 0, 0, W, H)
    ctx.restore()
  }

  // Palm trees vector at bottom
  if (assets.palmTrees) {
    ctx.save()
    ctx.globalAlpha = 0.35
    const ptW = W
    const ptH = (assets.palmTrees.height / assets.palmTrees.width) * ptW
    ctx.drawImage(assets.palmTrees, 0, H - ptH + 40, ptW, ptH)
    ctx.restore()
  }

  // Top Lanyard Punch Hole
  ctx.save()
  const holeX = W / 2 - 40
  const holeY = 24
  roundRect(ctx, holeX, holeY, 80, 20, 10)
  ctx.fillStyle = '#031f10'
  ctx.fill()
  ctx.strokeStyle = '#F5D800'
  ctx.lineWidth = 3
  ctx.stroke()
  ctx.restore()

  // Inner VIP Card Container
  const pad = 44
  const cardW = W - pad * 2
  const cardH = H - pad * 2 - 20
  const cardX = pad
  const cardY = pad + 20

  // Card Backdrop
  ctx.save()
  roundRect(ctx, cardX, cardY, cardW, cardH, 28)
  ctx.fillStyle = 'rgba(9,78,42,0.92)'
  ctx.fill()
  ctx.strokeStyle = 'rgba(245,216,0,0.45)'
  ctx.lineWidth = 4
  ctx.stroke()
  ctx.restore()

  // Header Strip
  ctx.fillStyle = '#F5D800'
  roundRect(ctx, cardX + 24, cardY + 24, cardW - 48, 116, 20)
  ctx.fill()

  // Top Left Logo
  if (assets.logo) {
    ctx.save()
    const logoSize = 84
    const logoX = cardX + 44
    const logoY = cardY + 40
    roundRect(ctx, logoX, logoY, logoSize, logoSize, 16)
    ctx.clip()
    ctx.drawImage(assets.logo, logoX, logoY, logoSize, logoSize)
    ctx.restore()

    ctx.save()
    roundRect(ctx, logoX, logoY, logoSize, logoSize, 16)
    ctx.strokeStyle = '#0B6839'
    ctx.lineWidth = 3
    ctx.stroke()
    ctx.restore()
  }

  // Header Title
  const headTextX = cardX + 150
  ctx.fillStyle = '#0B6839'
  ctx.font = 'bold 44px "Space Grotesk", sans-serif'
  ctx.textAlign = 'left'
  ctx.fillText('HACKER HOUSE', headTextX, cardY + 84)

  const hW = ctx.measureText('HACKER HOUSE').width
  ctx.fillStyle = '#FF2D84'
  ctx.font = 'bold 36px "Space Grotesk", sans-serif'
  ctx.fillText('गोवा', headTextX + hW + 12, 80)

  ctx.fillStyle = '#063C20'
  ctx.font = 'bold 13px "JetBrains Mono", monospace'
  ctx.fillText('2026 OFFICIAL BUILDER VIP PASS  ·  OCT 28–31, GOA', headTextX, cardY + 114)

  // Hero Photo Area
  const photoSize = 340
  const photoX = W / 2 - photoSize / 2
  const photoY = cardY + 175

  // Photo Container
  ctx.save()
  roundRect(ctx, photoX - 8, photoY - 8, photoSize + 16, photoSize + 16, 24)
  ctx.fillStyle = '#042815'
  ctx.fill()
  ctx.strokeStyle = '#F5D800'
  ctx.lineWidth = 5
  ctx.stroke()
  ctx.restore()

  // Inner Pink Ring
  ctx.save()
  roundRect(ctx, photoX - 3, photoY - 3, photoSize + 6, photoSize + 6, 20)
  ctx.strokeStyle = '#FF2D84'
  ctx.lineWidth = 3
  ctx.stroke()
  ctx.restore()

  // Photo Rendering with Zoom & Pan Position
  drawPhotoRounded(ctx, photo, photoX, photoY, photoSize, photoSize, 16, info.photoZoom, info.photoPanX, info.photoPanY)

  // VIP Hologram Badge Seal
  const sealX = photoX + photoSize - 20
  const sealY = photoY + photoSize - 20
  ctx.save()
  ctx.fillStyle = '#FF2D84'
  ctx.beginPath()
  ctx.arc(sealX, sealY, 44, 0, Math.PI * 2)
  ctx.fill()
  ctx.strokeStyle = '#F5D800'
  ctx.lineWidth = 4
  ctx.stroke()

  ctx.fillStyle = '#FAFAF8'
  ctx.font = 'bold 11px "Space Grotesk", sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('BUILDER', sealX, sealY - 6)
  ctx.fillText('VIP 2026', sealX, sealY + 10)
  ctx.restore()

  // Builder Name
  const nameY = photoY + photoSize + 56
  const rawName = (info.name || 'YOUR NAME').toUpperCase()
  ctx.fillStyle = '#FAFAF8'
  ctx.font = 'bold 50px "Space Grotesk", sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText(rawName.length > 18 ? rawName.slice(0, 18) + '…' : rawName, W / 2, nameY)

  // Builder Class Tag Pill (Bolder, font size 18px)
  const bClass = (info.builderClass || 'Coastal Architect').toUpperCase()
  ctx.font = '800 18px "Space Grotesk", sans-serif'
  const bClassW = Math.max(240, ctx.measureText(bClass).width + 48)
  ctx.fillStyle = '#FF2D84'
  roundRect(ctx, W / 2 - bClassW / 2, nameY + 16, bClassW, 46, 100)
  ctx.fill()
  ctx.fillStyle = '#FAFAF8'
  ctx.textAlign = 'center'
  ctx.fillText(bClass, W / 2, nameY + 46)

  // Dynamic Details & Socials Grid
  const gridY = nameY + 84
  const gridW = cardW - 72
  const gridX = cardX + 36

  // Collect active info cards (Only show Tech Stack & Socials if user provided them!)
  const cardItems = []
  if (info.role || info.location) {
    cardItems.push({ label: 'ROLE & LOCATION', val: `${info.role || 'Builder'} · ${info.location || 'India'}` })
  }
  if (info.stack && info.stack.trim() !== '') {
    cardItems.push({ label: 'TECH STACK', val: info.stack.trim() })
  }
  if (info.handle) cardItems.push({ label: 'TWITTER / X', val: `@${info.handle}` })
  if (info.github) cardItems.push({ label: 'GITHUB', val: `github/${info.github}` })
  if (info.instagram) cardItems.push({ label: 'INSTAGRAM', val: `@${info.instagram}` })
  if (info.website) cardItems.push({ label: 'PORTFOLIO', val: info.website })

  // Fallback defaults if none provided
  if (cardItems.length === 0) {
    cardItems.push({ label: 'STATUS', val: '247 BUILDERS SELECTED' })
    cardItems.push({ label: 'VENUE', val: 'GOA, INDIA' })
  }

  const gridRows = Math.ceil(cardItems.length / 2)
  const boxH = Math.max(100, gridRows * 64 + 20)

  ctx.fillStyle = 'rgba(255,255,255,0.06)'
  roundRect(ctx, gridX, gridY, gridW, boxH, 20)
  ctx.fill()
  ctx.strokeStyle = 'rgba(245,216,0,0.25)'
  ctx.lineWidth = 1.5
  ctx.stroke()

  const colWidth = (gridW - 48) / 2
  cardItems.forEach((item, idx) => {
    const colIdx = idx % 2
    const rowIdx = Math.floor(idx / 2)
    const fx = gridX + 24 + colIdx * (colWidth + 24)
    const fy = gridY + 24 + rowIdx * 60

    ctx.fillStyle = 'rgba(245,216,0,0.75)'
    ctx.font = '700 11px "JetBrains Mono", monospace'
    ctx.textAlign = 'left'
    ctx.fillText(item.label, fx, fy)

    ctx.fillStyle = '#FAFAF8'
    ctx.font = '600 16px "Space Grotesk", sans-serif'
    const displayVal = item.val.length > 22 ? item.val.slice(0, 22) + '…' : item.val
    ctx.fillText(displayVal, fx, fy + 22)
  })

  // Barcode & Footer Strip
  const footerY = gridY + boxH + 20
  ctx.fillStyle = 'rgba(245,216,0,0.08)'
  roundRect(ctx, gridX, footerY, gridW, 76, 16)
  ctx.fill()

  drawBarcode(ctx, gridX + 16, footerY + 12, gridW - 32, 34)

  ctx.fillStyle = '#F5D800'
  ctx.font = '700 13px "JetBrains Mono", monospace'
  ctx.textAlign = 'center'
  ctx.fillText(`PASS ID: ${info.builderId || 'HH26-VIP247'}  ·  #FrameInGoa  ·  2:47PM STUDIO`, W / 2, footerY + 62)
}

/* ==========================================
   CREATIVE PROFILE / PFP FRAME (1080×1080)
   ========================================== */
async function drawPfp(ctx, photo, assets, info) {
  const W = 1080, H = 1080
  ctx.canvas.width = W
  ctx.canvas.height = H

  // Background — Deep Green Base
  ctx.fillStyle = '#084D2A'
  ctx.fillRect(0, 0, W, H)

  // Blend agenda / sunrise scene in background
  if (assets.agenda || assets.sunrise) {
    const bgImg = assets.agenda || assets.sunrise
    ctx.save()
    ctx.globalAlpha = 0.35
    const srW = W
    const srH = (bgImg.height / bgImg.width) * srW
    ctx.drawImage(bgImg, 0, (H - srH) / 2, srW, srH)
    ctx.restore()
  }

  // Soft Radial Dark Vignette
  const grad = ctx.createRadialGradient(W / 2, H / 2, 200, W / 2, H / 2, 600)
  grad.addColorStop(0, 'rgba(8,77,42,0.45)')
  grad.addColorStop(0.7, 'rgba(8,77,42,0.85)')
  grad.addColorStop(1, 'rgba(6,44,23,0.98)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, W, H)

  // Ornament border (64.webp) around central avatar
  if (assets.ornament) {
    ctx.save()
    ctx.globalAlpha = 0.4
    ctx.drawImage(assets.ornament, 0, 0, W, H)
    ctx.restore()
  }

  // Palm trees foliage along bottom
  if (assets.palmTrees) {
    ctx.save()
    ctx.globalAlpha = 0.45
    const ptW = W
    const ptH = (assets.palmTrees.height / assets.palmTrees.width) * ptW
    ctx.drawImage(assets.palmTrees, 0, H - ptH + 20, ptW, ptH)
    ctx.restore()
  }

  // Top Header Yellow Strip
  ctx.fillStyle = '#F5D800'
  ctx.fillRect(0, 0, W, 90)

  ctx.font = 'bold 44px "Space Grotesk", sans-serif'
  const t1 = 'HACKER HOUSE '
  const t1W = ctx.measureText(t1).width
  ctx.font = 'bold 36px "Space Grotesk", sans-serif'
  const t2 = 'गोवा'
  const t2W = ctx.measureText(t2).width

  const totalHeadW = t1W + t2W
  const startHeadX = (W - totalHeadW) / 2

  ctx.fillStyle = '#0B6839'
  ctx.font = 'bold 44px "Space Grotesk", sans-serif'
  ctx.textAlign = 'left'
  ctx.fillText(t1, startHeadX, 58)

  ctx.fillStyle = '#FF2D84'
  ctx.font = 'bold 36px "Space Grotesk", sans-serif'
  ctx.fillText(t2, startHeadX + t1W, 56)

  // Sub-header
  ctx.fillStyle = '#0B6839'
  ctx.font = '600 13px "JetBrains Mono", monospace'
  ctx.textAlign = 'center'
  ctx.fillText('GOA, INDIA · OCT 28–31 · 2:47PM STUDIO', W / 2, 80)

  // Big photo circle
  const photoR = 300
  const photoCX = W / 2
  const photoCY = H / 2 + 20

  // Glow
  const glowGrad = ctx.createRadialGradient(photoCX, photoCY, photoR - 20, photoCX, photoCY, photoR + 60)
  glowGrad.addColorStop(0, 'rgba(245,216,0,0.25)')
  glowGrad.addColorStop(1, 'rgba(245,216,0,0)')
  ctx.fillStyle = glowGrad
  ctx.beginPath()
  ctx.arc(photoCX, photoCY, photoR + 60, 0, Math.PI * 2)
  ctx.fill()

  // Outer dashed ring
  ctx.beginPath()
  ctx.arc(photoCX, photoCY, photoR + 20, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(245,216,0,0.35)'
  ctx.lineWidth = 2
  ctx.setLineDash([16, 12])
  ctx.stroke()
  ctx.setLineDash([])

  // Main gold ring
  ctx.beginPath()
  ctx.arc(photoCX, photoCY, photoR + 8, 0, Math.PI * 2)
  ctx.strokeStyle = '#F5D800'
  ctx.lineWidth = 8
  ctx.stroke()

  // Render Photo with Zoom & Pan Position
  drawPhotoCircle(ctx, photo, photoCX, photoCY, photoR, info.photoZoom, info.photoPanX, info.photoPanY)

  // Pink accent dots
  ;[-Math.PI / 4, Math.PI / 4, Math.PI * 3 / 4, -Math.PI * 3 / 4].forEach(angle => {
    const dx = Math.cos(angle) * (photoR + 8)
    const dy = Math.sin(angle) * (photoR + 8)
    ctx.beginPath()
    ctx.arc(photoCX + dx, photoCY + dy, 12, 0, Math.PI * 2)
    ctx.fillStyle = '#FF2D84'
    ctx.fill()
  })

  // Circular text around photo
  ctx.save()
  ctx.font = 'bold 20px "JetBrains Mono", monospace'
  ctx.fillStyle = 'rgba(245,216,0,0.85)'
  const arcText = 'HACKER HOUSE GOA 2026 · BUILD IN GOA · SHIP FROM PARADISE · '
  const arcR = photoR + 38
  ctx.translate(photoCX, photoCY)
  const charAngle = (2 * Math.PI) / arcText.length
  for (let i = 0; i < arcText.length; i++) {
    ctx.save()
    ctx.rotate(-Math.PI / 2 + i * charAngle)
    ctx.translate(0, -arcR)
    ctx.fillText(arcText[i], 0, 0)
    ctx.restore()
  }
  ctx.restore()

  // Name
  if (info.name) {
    ctx.fillStyle = '#FAFAF8'
    ctx.font = 'bold 50px "Space Grotesk", sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(info.name.toUpperCase(), W / 2, photoCY + photoR + 66)
  }

  // Bottom
  ctx.fillStyle = 'rgba(0,0,0,0.65)'
  ctx.fillRect(0, H - 80, W, 80)
  ctx.fillStyle = '#F5D800'
  ctx.font = 'bold 26px "Space Grotesk", sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('#FrameInGoa', W / 2, H - 46)
  ctx.fillStyle = 'rgba(250,250,248,0.6)'
  ctx.font = '14px "JetBrains Mono", monospace'
  ctx.fillText('hhgoa.com · Oct 28-31, 2026 · Goa, India', W / 2, H - 22)
}

/* ==========================================
   DYNAMIC TEAM FRAME  (1200×630)
   Supports 1, 2, 3, or 4 Members Cleanly
   ========================================== */
async function drawTeamFrame(ctx, photos, assets, info) {
  const W = 1200, H = 630
  ctx.canvas.width = W
  ctx.canvas.height = H

  // Background — hackers scene or builders scene
  const bgImg = assets.hackers || assets.buildersScene
  if (bgImg) {
    ctx.save()
    const bW = W
    const bH = (bgImg.height / bgImg.width) * bW
    ctx.drawImage(bgImg, 0, (H - bH) / 2, bW, bH)
    ctx.restore()
  } else {
    ctx.fillStyle = '#084d2a'
    ctx.fillRect(0, 0, W, H)
  }

  // Clean vibrant overlay (no dark muddy overlay!)
  const overlayGrad = ctx.createLinearGradient(0, 0, 0, H)
  overlayGrad.addColorStop(0, 'rgba(6,44,23,0.85)')
  overlayGrad.addColorStop(0.5, 'rgba(6,44,23,0.65)')
  overlayGrad.addColorStop(1, 'rgba(6,44,23,0.92)')
  ctx.fillStyle = overlayGrad
  ctx.fillRect(0, 0, W, H)

  // Ornament border overlay
  if (assets.ornament) {
    ctx.save()
    ctx.globalAlpha = 0.22
    ctx.drawImage(assets.ornament, 0, 0, W, H)
    ctx.restore()
  }

  // Top header
  ctx.fillStyle = '#F5D800'
  ctx.fillRect(0, 0, W, 72)
  ctx.fillStyle = '#0B6839'
  ctx.font = 'bold 38px "Space Grotesk", sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('HACKER HOUSE गोवा 2026  ·  WE\'RE SHIPPING FROM PARADISE', W / 2, 48)

  // Dynamic Team Size Calculation (Supports 1, 2, 3, or 4 members)
  const activePhotos = photos.filter(Boolean)
  const count = Math.max(1, Math.min(4, activePhotos.length || 1))

  // Size and Gap config based on member count
  let slotR = 100
  let gap = 70

  if (count === 1) { slotR = 130; gap = 0 }
  else if (count === 2) { slotR = 115; gap = 90 }
  else if (count === 3) { slotR = 105; gap = 70 }
  else { slotR = 95; gap = 50 }

  const totalWidth = count * (slotR * 2) + (count - 1) * gap
  const startX = W / 2 - totalWidth / 2 + slotR
  const cy = H / 2 + 18

  for (let i = 0; i < count; i++) {
    const cx = startX + i * (slotR * 2 + gap)
    const currentPhoto = activePhotos[i] || (i === 0 ? photos[0] : null)

    // Glow ring
    const glw = ctx.createRadialGradient(cx, cy, slotR - 10, cx, cy, slotR + 36)
    glw.addColorStop(0, `rgba(${i % 2 === 0 ? '245,216,0' : '255,45,132'},0.35)`)
    glw.addColorStop(1, 'transparent')
    ctx.fillStyle = glw
    ctx.beginPath(); ctx.arc(cx, cy, slotR + 36, 0, Math.PI * 2); ctx.fill()

    // Ring border
    ctx.beginPath()
    ctx.arc(cx, cy, slotR + 6, 0, Math.PI * 2)
    ctx.strokeStyle = i % 2 === 0 ? '#F5D800' : '#FF2D84'
    ctx.lineWidth = 6
    ctx.stroke()

    drawPhotoCircle(ctx, currentPhoto, cx, cy, slotR, info.photoZoom, info.photoPanX, info.photoPanY)

    // Member Name
    const memberName = info.teamNames?.[i] || (i === 0 ? (info.name || 'You') : `Builder ${i + 1}`)
    ctx.fillStyle = '#FAFAF8'
    ctx.font = 'bold 20px "Space Grotesk", sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(memberName, cx, cy + slotR + 32)
  }

  // Bottom Footer Strip
  ctx.fillStyle = 'rgba(0,0,0,0.75)'
  ctx.fillRect(0, H - 64, W, 64)
  ctx.fillStyle = '#F5D800'
  ctx.font = 'bold 22px "Space Grotesk", sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('#FrameInGoa  ·  Oct 28–31, 2026  ·  GOA, INDIA  ·  hhgoa.com', W / 2, H - 32)
  ctx.fillStyle = 'rgba(250,250,248,0.55)'
  ctx.font = '13px "JetBrains Mono", monospace'
  ctx.fillText('2:47 PM Studio · 247 Builders Selected', W / 2, H - 14)
}

/* ==========================================
   MAIN COMPONENT
   ========================================== */
export default function Page() {
  const [step, setStep] = useState('landing') // landing | form | result
  const [activeFrame, setActiveFrame] = useState('boarding')
  const [userPhoto, setUserPhoto] = useState(null)
  const [teamPhotos, setTeamPhotos] = useState([null, null, null, null])
  const [hasPhoto, setHasPhoto] = useState(false)
  const [isDraggingPhoto, setIsDraggingPhoto] = useState(false)
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0, panX: 0, panY: 0 })

  const [info, setInfo] = useState({
    name: '',
    role: 'Builder',
    stack: '',
    github: '',
    instagram: '',
    website: '',
    handle: '',
    location: '',
    photoZoom: 1.0,
    photoPanX: 0,
    photoPanY: 0,
    builderClass: randomBuilderClass(),
    builderId: generateBuilderId(),
    teamNames: ['', '', '', ''],
  })

  const [isDragging, setIsDragging] = useState(false)
  const [toast, setToast] = useState('')
  const [scoreInputs, setScoreInputs] = useState({ likes: 0, replies: 0, bookmarks: 0, retweets: 0, quotes: 0, views: 0 })
  const [assetsLoaded, setAssetsLoaded] = useState(false)
  const [assets, setAssets] = useState({})
  const [rendering, setRendering] = useState(false)
  const [activeTab, setActiveTab] = useState('generator') // generator | hype

  const canvasRef = useRef(null)
  const fileInputRef = useRef(null)
  const teamFileRefs = [useRef(null), useRef(null), useRef(null), useRef(null)]

  // Load all 10 assets
  useEffect(() => {
    async function load() {
      const [palmTrees, sunrise, hackers, ornament, logo, agenda, signpost, studio247, brandBanner, buildersScene] = await Promise.allSettled([
        loadImage('/assets/palm-trees.png'),
        loadImage('/assets/sunrise.png'),
        loadImage('/assets/hackers.png'),
        loadImage('/assets/ornament-border.webp'),
        loadImage('/assets/logo.jpeg'),
        loadImage('/assets/agenda.png'),
        loadImage('/assets/signpost.png'),
        loadImage('/assets/studio247.jpg'),
        loadImage('/assets/brand-banner.webp'),
        loadImage('/assets/builders-scene.jpg'),
      ])
      setAssets({
        palmTrees: palmTrees.status === 'fulfilled' ? palmTrees.value : null,
        sunrise: sunrise.status === 'fulfilled' ? sunrise.value : null,
        hackers: hackers.status === 'fulfilled' ? hackers.value : null,
        ornament: ornament.status === 'fulfilled' ? ornament.value : null,
        logo: logo.status === 'fulfilled' ? logo.value : null,
        agenda: agenda.status === 'fulfilled' ? agenda.value : null,
        signpost: signpost.status === 'fulfilled' ? signpost.value : null,
        studio247: studio247.status === 'fulfilled' ? studio247.value : null,
        brandBanner: brandBanner.status === 'fulfilled' ? brandBanner.value : null,
        buildersScene: buildersScene.status === 'fulfilled' ? buildersScene.value : null,
      })
      setAssetsLoaded(true)
    }
    load()
  }, [])

  // Render canvas when parameters change
  useEffect(() => {
    if (!assetsLoaded || !canvasRef.current || (step !== 'result' && step !== 'form')) return
    const ctx = canvasRef.current.getContext('2d')
    setRendering(true)
    const timer = setTimeout(async () => {
      try {
        if (activeFrame === 'boarding') await drawBoardingPass(ctx, userPhoto, assets, info)
        else if (activeFrame === 'id-card') await drawIdCard(ctx, userPhoto, assets, info)
        else if (activeFrame === 'pfp') await drawPfp(ctx, userPhoto, assets, info)
        else if (activeFrame === 'team') await drawTeamFrame(ctx, teamPhotos, assets, info)
      } catch (e) { console.error(e) }
      setRendering(false)
    }, 40)
    return () => clearTimeout(timer)
  }, [activeFrame, userPhoto, teamPhotos, info, assetsLoaded, assets, step])

  // Drag-to-Pan Photo logic on canvas preview
  const handlePointerDown = (e) => {
    if (!hasPhoto) return
    setIsDraggingPhoto(true)
    setDragStartPos({
      x: e.clientX || e.touches?.[0]?.clientX || 0,
      y: e.clientY || e.touches?.[0]?.clientY || 0,
      panX: info.photoPanX || 0,
      panY: info.photoPanY || 0,
    })
  }

  const handlePointerMove = (e) => {
    if (!isDraggingPhoto) return
    const currentX = e.clientX || e.touches?.[0]?.clientX || 0
    const currentY = e.clientY || e.touches?.[0]?.clientY || 0

    const dx = currentX - dragStartPos.x
    const dy = currentY - dragStartPos.y

    const newPanX = Math.max(-50, Math.min(50, dragStartPos.panX + (dx / 3)))
    const newPanY = Math.max(-50, Math.min(50, dragStartPos.panY + (dy / 3)))

    setInfo(prev => ({ ...prev, photoPanX: Math.round(newPanX), photoPanY: Math.round(newPanY) }))
  }

  const handlePointerUp = () => setIsDraggingPhoto(false)

  const handleFile = useCallback((file, teamIndex = -1) => {
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        if (teamIndex >= 0) {
          setTeamPhotos(prev => { const n = [...prev]; n[teamIndex] = img; return n })
        } else {
          setUserPhoto(img); setHasPhoto(true)
        }
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault(); setIsDragging(false)
    handleFile(e.dataTransfer.files?.[0])
  }, [handleFile])

  const handleDownload = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `hhgoa-2026-${activeFrame}.png`
      a.click()
      URL.revokeObjectURL(url)
    }, 'image/png')
  }

  const handleShareX = async () => {
    const text = makeShareText(info.name, info.builderClass)
    const encoded = encodeURIComponent(text)
    window.open(`https://twitter.com/intent/tweet?text=${encoded}`, '_blank', 'noopener')
    if (canvasRef.current) {
      canvasRef.current.toBlob(async (blob) => {
        try { await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]) } catch { }
      })
    }
  }

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3500) }

  const score = calcScore(scoreInputs)
  const verd = verdict(score)

  const updateInfo = (k, v) => setInfo(prev => ({ ...prev, [k]: v }))
  const updateTeamName = (i, v) => setInfo(prev => { const n = [...prev.teamNames]; n[i] = v; return { ...prev, teamNames: n } })
  const rerollClass = () => updateInfo('builderClass', randomBuilderClass())
  const rerollId = () => updateInfo('builderId', generateBuilderId())

  const isTeam = activeFrame === 'team'

  return (
    <div className="page-wrap">
      {/* HEADER */}
      <header className="site-header">
        <div className="container header-inner">
          <a href="https://hhgoa.com" target="_blank" rel="noopener noreferrer" className="logo-lockup" id="site-logo">
            <img src="/assets/logo.jpeg" alt="HH Goa Logo" className="header-logo-img" />
            <div className="logo-text">
              <strong>Frame In Goa</strong>
              <span>2026 EDITION · 2:47PM STUDIO</span>
            </div>
          </a>
          <nav className="header-nav">
            <button
              className={`nav-tab${activeTab === 'generator' ? ' active' : ''}`}
              onClick={() => { setActiveTab('generator'); if (step === 'landing') {} }}
              id="nav-generator"
            >
              🎫 Generator
            </button>
            <button
              className={`nav-tab${activeTab === 'hype' ? ' active' : ''}`}
              onClick={() => setActiveTab('hype')}
              id="nav-hype"
            >
              🔥 Check Hype
            </button>
            <a href="https://hhgoa.com" target="_blank" rel="noopener noreferrer" className="btn-hhgoa" id="btn-hhgoa">
              Apply → hhgoa.com
            </a>
          </nav>
        </div>
      </header>

      {activeTab === 'generator' && (
        <>
          {/* ==================== LANDING ==================== */}
          {step === 'landing' && (
            <main className="landing">
              {/* Hero with sunrise bg */}
              <section className="landing-hero">
                <div className="landing-bg">
                  <img src="/assets/sunrise.png" alt="" className="hero-bg-img" aria-hidden="true" />
                  <div className="hero-overlay" />
                  <img src="/assets/ornament-border.webp" alt="" className="hero-ornament" aria-hidden="true" />
                </div>
                <div className="container landing-hero-inner">
                  <div className="landing-eyebrow">
                    <span className="blink-dot" />
                    Open Now · Aug 2026 · #FrameInGoa
                  </div>
                  <h1 className="landing-title">
                    GET YOUR<br />
                    <span className="title-accent">GOA <em>गोवा</em></span><br />
                    FRAME
                  </h1>
                  <p className="landing-subtitle">
                    Drop your photo. Personalize your pass. Post it with <strong>#FrameInGoa</strong> and let Goa know you&apos;re coming.
                  </p>
                  <div className="landing-features">
                    {[
                      ['🎫', 'Boarding Pass', '1080×566'],
                      ['🪪', 'VIP Builder ID', '1080×1350'],
                      ['🌴', 'Profile Frame', '1080×1080'],
                      ['🤝', 'Team Frame', '1200×630'],
                    ].map(([icon, name, dim]) => (
                      <div className="feature-chip" key={name}>
                        <span className="chip-icon">{icon}</span>
                        <span className="chip-name">{name}</span>
                        <span className="chip-dim">{dim}</span>
                      </div>
                    ))}
                  </div>
                  <div className="landing-cta-row">
                    <button
                      className="btn-cta-primary"
                      onClick={() => setStep('form')}
                      id="btn-create-frame"
                    >
                      Create Your Frame ✦
                    </button>
                    <a href="https://hhgoa.com" target="_blank" rel="noopener noreferrer" className="btn-cta-secondary" id="btn-learn-more">
                      Learn about HH Goa →
                    </a>
                  </div>
                </div>
              </section>

              {/* About strip */}
              <section className="about-strip">
                <div className="container">
                  <div className="about-grid">
                    <div className="about-img-wrap">
                      <img src="/assets/hackers.png" alt="Builders at Hacker House Goa" className="about-img" />
                    </div>
                    <div className="about-text">
                      <div className="about-label">WHAT IS THIS?</div>
                      <h2>Your Ticket to Goa</h2>
                      <p>
                        Hacker House Goa 2026 — 247 builders. 4 days. One private beach resort in Goa, India.
                        Oct 28–31, 2026. Less noise. More ships.
                      </p>
                      <p>
                        Generate your personalized HH Goa frame, post it on X with <strong>#FrameInGoa</strong> to get featured in the Radar — and climb the ladder toward your exclusive HH Goa ID.
                      </p>
                      <div className="about-stats">
                        {[['247', 'Builders'], ['4', 'Days'], ['20K+', 'Applicants'], ['1', 'Paradise']].map(([n, l]) => (
                          <div className="stat-item" key={l}>
                            <span className="stat-n">{n}</span>
                            <span className="stat-l">{l}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Signpost decoration strip */}
              <section className="signpost-strip">
                <div className="container signpost-inner">
                  <img src="/assets/signpost.png" alt="Goa beach signpost illustration" className="signpost-img" />
                  <div className="signpost-cta">
                    <h3>Ready to board?</h3>
                    <p>Upload your photo and generate your unique HH Goa 2026 frame in seconds.</p>
                    <button className="btn-cta-primary" onClick={() => setStep('form')} id="btn-create-frame-2">
                      Generate My Frame →
                    </button>
                  </div>
                </div>
              </section>
            </main>
          )}

          {/* ==================== FORM STEP ==================== */}
          {step === 'form' && (
            <main className="form-step">
              <div className="container">
                <div className="form-header">
                  <button className="btn-back" onClick={() => setStep('landing')} id="btn-back">
                    ← Back
                  </button>
                  <h2>Customize Your Frame</h2>
                  <p>Fill in your details, drag photo on preview to reposition, and generate your pass.</p>
                </div>

                {/* Frame type selector */}
                <div className="frame-type-bar" role="tablist">
                  {FRAMES.map(f => (
                    <button
                      key={f.id}
                      role="tab"
                      aria-selected={activeFrame === f.id}
                      className={`frame-tab${activeFrame === f.id ? ' active' : ''}`}
                      onClick={() => setActiveFrame(f.id)}
                      id={`frame-tab-${f.id}`}
                    >
                      <span className="frame-tab-icon">{f.icon}</span>
                      <span className="frame-tab-name">{f.name}</span>
                      <span className="frame-tab-dim">{f.dim}</span>
                    </button>
                  ))}
                </div>

                <div className="form-grid">
                  {/* LEFT — controls */}
                  <div className="form-panel">
                    {/* Photo upload & positioning */}
                    <div className="form-section">
                      <div className="form-section-title">
                        {isTeam ? '👥 Team Photos' : '📸 Photo & Position Control'}
                      </div>

                      {!isTeam ? (
                        <>
                          <div
                            className={`drop-zone${isDragging ? ' drag-active' : ''}${hasPhoto ? ' has-photo' : ''}`}
                            onDrop={handleDrop}
                            onDragOver={e => { e.preventDefault(); setIsDragging(true) }}
                            onDragLeave={() => setIsDragging(false)}
                            onClick={() => fileInputRef.current?.click()}
                            role="button"
                            tabIndex={0}
                            onKeyDown={e => e.key === 'Enter' && fileInputRef.current?.click()}
                            id="main-drop-zone"
                            aria-label="Upload photo"
                          >
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/*,.heic,.heif"
                              onChange={e => handleFile(e.target.files?.[0])}
                              id="main-file-input"
                              style={{ display: 'none' }}
                            />
                            <div className="dz-icon">{hasPhoto ? '✅' : '🖼️'}</div>
                            <div className="dz-title">{hasPhoto ? 'Photo Uploaded!' : 'Drop your photo here'}</div>
                            <div className="dz-sub">JPG · PNG · WEBP · HEIC{hasPhoto ? ' · click to replace' : ''}</div>
                          </div>

                          {/* Interactive Photo Zoom & Pan controls */}
                          {hasPhoto && (
                            <div className="photo-controls-card">
                              <div className="photo-controls-title">🔍 Drag Photo on Preview or Adjust Zoom</div>

                              <div className="control-row">
                                <div className="control-label-row">
                                  <label htmlFor="zoom-slider">Zoom Scale</label>
                                  <span>{Math.round((info.photoZoom || 1.0) * 100)}%</span>
                                </div>
                                <input
                                  id="zoom-slider"
                                  type="range" min="1.0" max="2.5" step="0.05"
                                  value={info.photoZoom || 1.0}
                                  onChange={e => updateInfo('photoZoom', parseFloat(e.target.value))}
                                  className="range-slider"
                                />
                              </div>

                              <div className="drag-hint-badge">
                                🖱️ <strong>Tip:</strong> Click & Drag directly on the preview image to reposition your photo!
                              </div>

                              <button
                                className="btn-reset-photo"
                                onClick={() => { updateInfo('photoZoom', 1.0); updateInfo('photoPanX', 0); updateInfo('photoPanY', 0); }}
                                id="btn-reset-photo"
                              >
                                ↺ Reset Alignment
                              </button>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="team-slots">
                          {[0, 1, 2, 3].map(i => (
                            <div className="team-slot" key={i}>
                              <div
                                className={`team-slot-drop${teamPhotos[i] ? ' filled' : ''}`}
                                onClick={() => teamFileRefs[i].current?.click()}
                                id={`team-slot-${i}`}
                              >
                                <input
                                  ref={teamFileRefs[i]}
                                  type="file" accept="image/*" onChange={e => handleFile(e.target.files?.[0], i)}
                                  id={`team-file-${i}`} style={{ display: 'none' }}
                                />
                                <span>{teamPhotos[i] ? '✅' : '➕'}</span>
                              </div>
                              <input
                                type="text" className="field-input" placeholder={`Builder ${i + 1} name`}
                                value={info.teamNames[i]} onChange={e => updateTeamName(i, e.target.value)}
                                id={`team-name-${i}`}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Personal Info & Social Links */}
                    {!isTeam && (
                      <div className="form-section">
                        <div className="form-section-title">✦ Personal Details</div>
                        <div className="fields-col">
                          <div className="field-wrap">
                            <label className="field-label" htmlFor="f-name">Full Name</label>
                            <input id="f-name" type="text" className="field-input" placeholder="e.g. Abin Shaji"
                              value={info.name} onChange={e => updateInfo('name', e.target.value)} />
                          </div>
                          <div className="fields-row">
                            <div className="field-wrap">
                              <label className="field-label" htmlFor="f-role">Role (Optional)</label>
                              <select id="f-role" className="field-input" value={info.role} onChange={e => updateInfo('role', e.target.value)}>
                                {['', 'Builder', 'Hacker', 'Designer', 'Founder', 'Researcher', 'Indie Dev', 'Web3', 'AI Engineer'].map(r =>
                                  <option key={r} value={r}>{r || 'Select Role'}</option>
                                )}
                              </select>
                            </div>
                            <div className="field-wrap">
                              <label className="field-label" htmlFor="f-location">Location (Optional)</label>
                              <input id="f-location" type="text" className="field-input" placeholder="e.g. Kerala, India"
                                value={info.location} onChange={e => updateInfo('location', e.target.value)} />
                            </div>
                          </div>
                          <div className="field-wrap">
                            <label className="field-label" htmlFor="f-stack">Tech Stack (Optional — only shows if entered)</label>
                            <input id="f-stack" type="text" className="field-input" placeholder="e.g. React / Rust / AI (leave empty to hide)"
                              value={info.stack} onChange={e => updateInfo('stack', e.target.value)} />
                          </div>

                          <div className="form-section-title" style={{ marginTop: 10 }}>🌐 Social Profiles (Optional — only shows if entered)</div>

                          <div className="fields-row">
                            <div className="field-wrap">
                              <label className="field-label" htmlFor="f-handle">𝕏 Twitter / X</label>
                              <input id="f-handle" type="text" className="field-input" placeholder="handle (without @)"
                                value={info.handle} onChange={e => updateInfo('handle', e.target.value.replace('@', ''))} />
                            </div>
                            <div className="field-wrap">
                              <label className="field-label" htmlFor="f-github">🐙 GitHub</label>
                              <input id="f-github" type="text" className="field-input" placeholder="username"
                                value={info.github} onChange={e => updateInfo('github', e.target.value.replace('@', ''))} />
                            </div>
                          </div>

                          <div className="fields-row">
                            <div className="field-wrap">
                              <label className="field-label" htmlFor="f-insta">📸 Instagram</label>
                              <input id="f-insta" type="text" className="field-input" placeholder="handle"
                                value={info.instagram} onChange={e => updateInfo('instagram', e.target.value.replace('@', ''))} />
                            </div>
                            <div className="field-wrap">
                              <label className="field-label" htmlFor="f-web">🌐 Portfolio / Website</label>
                              <input id="f-web" type="text" className="field-input" placeholder="yourwebsite.dev"
                                value={info.website} onChange={e => updateInfo('website', e.target.value)} />
                            </div>
                          </div>

                          <div className="field-wrap">
                            <label className="field-label">Builder Class <span className="field-hint">auto-generated, reroll anytime</span></label>
                            <div className="builder-class-row">
                              <div className="builder-class-display">{info.builderClass}</div>
                              <button className="btn-reroll" onClick={rerollClass} id="btn-reroll-class" title="Reroll builder class">↺</button>
                            </div>
                          </div>
                          <div className="field-wrap">
                            <label className="field-label">Builder ID <span className="field-hint">your unique pass number</span></label>
                            <div className="builder-class-row">
                              <div className="builder-class-display mono">{info.builderId}</div>
                              <button className="btn-reroll" onClick={rerollId} id="btn-reroll-id" title="Generate new ID">↺</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Generate button */}
                    <button
                      className="btn-generate"
                      onClick={() => setStep('result')}
                      id="btn-generate"
                    >
                      ✦ Generate My Frame
                    </button>

                    <div className="format-note">
                      Format: <strong>{FRAMES.find(f => f.id === activeFrame)?.dim}</strong> · Post with <strong>#FrameInGoa</strong>
                    </div>
                  </div>

                  {/* RIGHT — live preview with Drag-to-Pan support */}
                  <div className="preview-panel">
                    <div className="preview-label">Live Preview (Drag on Image to Move)</div>
                    <div
                      className={`canvas-wrap${isDraggingPhoto ? ' dragging' : ''}`}
                      id="canvas-preview-wrap"
                      onMouseDown={handlePointerDown}
                      onMouseMove={handlePointerMove}
                      onMouseUp={handlePointerUp}
                      onMouseLeave={handlePointerUp}
                      onTouchStart={handlePointerDown}
                      onTouchMove={handlePointerMove}
                      onTouchEnd={handlePointerUp}
                      style={{ cursor: hasPhoto ? (isDraggingPhoto ? 'grabbing' : 'grab') : 'default' }}
                    >
                      <canvas
                        ref={canvasRef}
                        id="frame-canvas-preview"
                        style={{ opacity: rendering ? 0.75 : 1, transition: 'opacity 0.15s', maxWidth: '100%', borderRadius: 12, pointerEvents: 'none' }}
                      />
                      {!hasPhoto && !isTeam && (
                        <div className="canvas-placeholder">
                          <span>🖼️</span>
                          <p>Upload your photo to see the live preview</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </main>
          )}

          {/* ==================== RESULT STEP ==================== */}
          {step === 'result' && (
            <main className="result-step">
              <div className="container">
                <div className="result-header">
                  <div className="result-badge">✓ Your Frame is Ready</div>
                  <h2>Your HH Goa 2026 Pass</h2>
                  <p>Download it, post it with <strong>#FrameInGoa</strong> on X, and climb the Radar.</p>
                </div>

                {/* Frame selector tabs */}
                <div className="frame-type-bar" role="tablist">
                  {FRAMES.map(f => (
                    <button
                      key={f.id}
                      role="tab"
                      aria-selected={activeFrame === f.id}
                      className={`frame-tab${activeFrame === f.id ? ' active' : ''}`}
                      onClick={() => setActiveFrame(f.id)}
                      id={`result-frame-tab-${f.id}`}
                    >
                      <span className="frame-tab-icon">{f.icon}</span>
                      <span className="frame-tab-name">{f.name}</span>
                    </button>
                  ))}
                </div>

                <div className="result-grid">
                  <div className="result-canvas-wrap" id="result-canvas-wrap">
                    <canvas
                      ref={canvasRef}
                      id="frame-canvas"
                      style={{ opacity: rendering ? 0.75 : 1, transition: 'opacity 0.15s', maxWidth: '100%', borderRadius: 16 }}
                    />
                    {rendering && (
                      <div className="rendering-overlay">
                        <div className="spinner" />
                      </div>
                    )}
                  </div>

                  <div className="result-actions" id="result-actions">
                    <button className="btn-download" onClick={handleDownload} id="btn-download">
                      ⬇ Download Frame
                    </button>
                    <button className="btn-share-x" onClick={handleShareX} id="btn-share-x">
                      𝕏 Post on X with #FrameInGoa
                    </button>
                    <div className="result-action-secondary">
                      <button className="btn-edit" onClick={() => setStep('form')} id="btn-edit">
                        ✎ Edit Details
                      </button>
                      <button className="btn-reset" onClick={() => { setStep('form'); rerollClass(); rerollId() }} id="btn-generate-another">
                        ↺ Generate Another
                      </button>
                    </div>
                    <div className="how-to-post">
                      <div className="how-title">How to post on X:</div>
                      <ol>
                        <li>Download your frame above ↑</li>
                        <li>Click &quot;Post on X&quot; to open X with pre-filled text</li>
                        <li>Attach your downloaded image</li>
                        <li>Make sure <strong>#FrameInGoa</strong> is in the post</li>
                        <li>Hit Post! 🌴</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          )}
        </>
      )}

      {/* ==================== HYPE / SCORE TAB ==================== */}
      {activeTab === 'hype' && (
        <main className="hype-page">
          <div className="container">
            <div className="hype-hero">
              <h2>Check Your <span>Hype Score</span></h2>
              <p>Paste your post stats below to see how you&apos;re ranking on the Radar. More engagement = more signal = better chances at that HH Goa ID.</p>
            </div>

            <div className="hype-grid">
              <div className="hype-formula">
                <div className="formula-title">THE FORMULA</div>
                <div className="formula-box">
                  <div className="formula-line">
                    <span className="f-eq">SCORE</span>
                    <span className="f-op">=</span>
                    <span className="f-term">likes ×1</span>
                    <span className="f-op">+</span>
                    <span className="f-term">replies ×2</span>
                    <span className="f-op">+</span>
                    <span className="f-term">bookmarks ×3</span>
                    <span className="f-op">+</span>
                    <span className="f-term">retweets ×4</span>
                    <span className="f-op">+</span>
                    <span className="f-term">quotes ×4</span>
                    <span className="f-op">+</span>
                    <span className="f-term">views ×0.02</span>
                  </div>
                  <div className="formula-line" style={{ marginTop: 8 }}>
                    <span className="f-eq">FINAL</span>
                    <span className="f-op">=</span>
                    <span>clamp(round(score ÷ 500 × 100), 0, 100)</span>
                  </div>
                </div>
              </div>

              <div className="hype-inputs">
                {[
                  { key: 'likes', label: 'Likes', mult: '×1', icon: '❤️' },
                  { key: 'replies', label: 'Replies', mult: '×2', icon: '💬' },
                  { key: 'bookmarks', label: 'Bookmarks', mult: '×3', icon: '🔖' },
                  { key: 'retweets', label: 'Retweets', mult: '×4', icon: '🔁' },
                  { key: 'quotes', label: 'Quotes', mult: '×4', icon: '💭' },
                  { key: 'views', label: 'Views', mult: '×0.02', icon: '👁️' },
                ].map(({ key, label, mult, icon }) => (
                  <div className="hype-input-card" key={key}>
                    <div className="hype-input-top">
                      <span className="hype-icon">{icon}</span>
                      <span className="hype-label">{label}</span>
                      <span className="hype-mult">{mult}</span>
                    </div>
                    <input
                      id={`score-${key}`}
                      type="number" min="0"
                      className="hype-num-input"
                      value={scoreInputs[key]}
                      onChange={e => setScoreInputs(prev => ({ ...prev, [key]: Math.max(0, parseInt(e.target.value) || 0) }))}
                    />
                  </div>
                ))}
              </div>

              <div className="hype-result" id="hype-result">
                <div className="hype-result-label">YOUR SELECTION SCORE</div>
                <div className="hype-score-number" style={{ color: verd.color }}>
                  {score}<span>/100</span>
                </div>
                <div className="hype-bar-track">
                  <div className="hype-bar-fill" style={{ width: `${score}%`, background: score >= 80 ? '#FF2D84' : '#F5D800' }} />
                </div>
                <div className="hype-verdict">
                  <span className="verdict-emoji">{verd.emoji}</span>
                  <span style={{ color: verd.color }}>{verd.text}</span>
                </div>
                {score < 60 && (
                  <div className="hype-tip">
                    💡 Tip: Ask your network to reply & bookmark your post. Replies and bookmarks carry 2× and 3× more weight than likes.
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      )}

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-trees">
          <img src="/assets/palm-trees.png" alt="" aria-hidden="true" />
        </div>
        <div className="container footer-inner">
          <div className="footer-brand">HACKER HOUSE गोवा 2026</div>
          <div className="footer-links">
            <a href="https://hhgoa.com" target="_blank" rel="noopener noreferrer" id="footer-hhgoa">hhgoa.com</a>
            <span>·</span>
            <a href="https://twitter.com/intent/tweet?text=%23FrameInGoa" target="_blank" rel="noopener noreferrer" id="footer-hashtag">#FrameInGoa</a>
            <span>·</span>
            <span>2:47 PM Studio</span>
          </div>
          <div className="footer-sub">Oct 28–31 · Private Beach Resort · Goa, India</div>
        </div>
      </footer>

      {/* TOAST */}
      <div className={`toast${toast ? ' show' : ''}`} role="status" aria-live="polite">
        {toast}
      </div>
    </div>
  )
}
