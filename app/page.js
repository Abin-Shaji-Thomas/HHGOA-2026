'use client'

import { useRef, useState, useEffect, useCallback } from 'react'

const Icons = {
  Ticket: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/>
      <path d="M13 5v2"/><path d="M13 11v2"/><path d="M13 17v2"/>
    </svg>
  ),
  IdCard: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 7h3v3H7z"/><path d="M14 8h3"/><path d="M14 12h3"/><path d="M7 16h10"/>
    </svg>
  ),
  User: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  Users: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M22 21v-2a4 4 0 0 1 0-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Share: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  ),
  Download: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  Twitter: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
}

const BUILDER_CLASSES = [
  'Coastal Architect',
  'Async Alchemist',
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
  'Vite Vibe Coder',
  'CUDA Coconut',
  'Zero-Knowledge Yogi',
  'Hackathon Heavyweight',
  'Monad Monk',
  'Solana Sunset Ship',
  'Rust Rustler',
  'CSS Calangute',
  'Prompt Pirate',
  'Payload Paraglider',
  'Fullstack Flamingo',
  'Byte Baga Coder',
  'Kernel Kadam',
  'Wasm Wave Rider',
  'DevRel Driftwood',
  'Bounty Beachhead',
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

const makeShareText = (name, builderClass) => `Just got my #FrameInGoa pass for Hacker House Goa 2026 🌴

${name ? `${name} — ${builderClass}` : 'Builder heading to paradise'}

Oct 28-31, 2026 · Goa, India 🇮🇳
247 builders. 4 days. Real ships.

Generate yours & join the radar → https://hhgoa-2026-five.vercel.app/

#HackerHouseGoa #FrameInGoa #BuildInPublic`

const FRAMES = [
  { id: 'boarding', name: 'Boarding Pass', dim: '1080×566', w: 1080, h: 566 },
  { id: 'id-card', name: 'VIP Builder ID', dim: '1080×1350', w: 1080, h: 1350 },
  { id: 'pfp', name: 'Profile Frame', dim: '1080×1080', w: 1080, h: 1080 },
  { id: 'team', name: 'Team Frame', dim: '1200×630', w: 1200, h: 630 },
]

function calcScore(inputs) {
  const likes = parseInt(inputs.likes) || 0
  const replies = parseInt(inputs.replies) || 0
  const bookmarks = parseInt(inputs.bookmarks) || 0
  const retweets = parseInt(inputs.retweets) || 0
  const quotes = parseInt(inputs.quotes) || 0
  const views = parseInt(inputs.views) || 0

  const pts = likes * 1 + replies * 2 + bookmarks * 3 + retweets * 4 + quotes * 4 + views * 0.02
  return Math.min(100, Math.max(0, Math.round((pts / 500) * 100)))
}

function verdict(score) {
  if (score >= 80) return { text: 'Going viral. Goa is yours.', color: '#FF2D84' }
  if (score >= 60) return { text: 'Strong signal. Keep pushing.', color: '#F5D800' }
  if (score >= 40) return { text: 'Gaining traction. Share more.', color: '#F5D800' }
  if (score >= 20) return { text: 'Needs more heat. Post harder.', color: '#aaa' }
  return { text: 'Post it and watch your score climb.', color: '#888' }
}

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

function drawAutoFitText(ctx, text, x, y, maxW, baseFontSize, fontFace = 'Space Grotesk', weight = 'bold', align = 'center') {
  let size = baseFontSize
  ctx.font = `${weight} ${size}px "${fontFace}", sans-serif`
  while (ctx.measureText(text).width > maxW && size > 11) {
    size -= 1
    ctx.font = `${weight} ${size}px "${fontFace}", sans-serif`
  }
  ctx.textAlign = align
  ctx.fillText(text, x, y)
}

function drawPhoto(ctx, photo, x, y, w, h, zoom = 1, panX = 0, panY = 0) {
  if (!photo) {
    ctx.fillStyle = 'rgba(5, 44, 23, 0.6)'
    ctx.fillRect(x, y, w, h)
    ctx.fillStyle = '#F5D800'
    ctx.font = 'bold 15px "JetBrains Mono", monospace'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('NO PHOTO UPLOADED', x + w / 2, y + h / 2)
    ctx.textBaseline = 'alphabetic'
    return
  }

  const z = Math.max(1, zoom || 1)
  const imgAspect = photo.width / photo.height
  const targetAspect = w / h

  let sw, sh, sx, sy
  if (imgAspect > targetAspect) {
    sh = photo.height
    sw = sh * targetAspect
    sy = 0
    sx = (photo.width - sw) / 2
  } else {
    sw = photo.width
    sh = sw / targetAspect
    sx = 0
    sy = (photo.height - sh) / 2
  }

  sw = sw / z
  sh = sh / z

  const maxShiftX = (photo.width - sw) / 2
  const maxShiftY = (photo.height - sh) / 2

  sx += ((panX || 0) / 50) * (maxShiftX > 0 ? maxShiftX : photo.width * 0.2)
  sy += ((panY || 0) / 50) * (maxShiftY > 0 ? maxShiftY : photo.height * 0.2)

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

function drawDotGrid(ctx, x, y, w, h, color = 'rgba(11,104,57,0.05)', spacing = 20) {
  for (let px = x; px < x + w; px += spacing) {
    for (let py = y; py < y + h; py += spacing) {
      ctx.beginPath()
      ctx.arc(px, py, 1.5, 0, Math.PI * 2)
      ctx.fillStyle = color
      ctx.fill()
    }
  }
}

function drawBarcode(ctx, x, y, w, h, color = 'rgba(11,104,57,0.8)') {
  const bars = 44
  const barW = w / bars
  for (let i = 0; i < bars; i++) {
    const thick = Math.random() > 0.6 ? barW * 0.85 : barW * 0.4
    ctx.fillStyle = color
    ctx.fillRect(x + i * barW + (barW - thick) / 2, y, thick, h)
  }
}

function collectSocials(info) {
  const items = []
  if (info.handle && info.handle.trim()) {
    items.push({ platform: 'X', label: 'TWITTER / X', val: `@${info.handle.trim().replace(/^@/, '')}` })
  }
  if (info.linkedin && info.linkedin.trim()) {
    const cleanLi = info.linkedin.trim().replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '').replace(/\/$/, '')
    items.push({ platform: 'LinkedIn', label: 'LINKEDIN', val: `in/${cleanLi}` })
  }
  if (info.github && info.github.trim()) {
    const cleanGh = info.github.trim().replace(/^https?:\/\/github\.com\//, '')
    items.push({ platform: 'GitHub', label: 'GITHUB', val: `github/${cleanGh}` })
  }
  if (info.instagram && info.instagram.trim()) {
    items.push({ platform: 'Instagram', label: 'INSTAGRAM', val: `@${info.instagram.trim().replace(/^@/, '')}` })
  }
  if (info.email && info.email.trim()) {
    items.push({ platform: 'Email', label: 'EMAIL', val: info.email.trim() })
  }
  if (info.website && info.website.trim()) {
    const cleanWeb = info.website.trim().replace(/^https?:\/\//, '')
    items.push({ platform: 'Web', label: 'PORTFOLIO', val: cleanWeb })
  }
  return items
}

async function drawBoardingPass(ctx, photo, assets, info) {
  const SCALE = 2
  const LOGICAL_W = 1080, LOGICAL_H = 566
  ctx.canvas.width = LOGICAL_W * SCALE
  ctx.canvas.height = LOGICAL_H * SCALE

  ctx.save()
  ctx.scale(SCALE, SCALE)

  const W = LOGICAL_W, H = LOGICAL_H

  ctx.fillStyle = '#F5EDD6'
  ctx.fillRect(0, 0, W, H)

  drawDotGrid(ctx, 0, 0, W, H, 'rgba(11,104,57,0.05)', 20)

  const STUB = 340
  ctx.fillStyle = '#0B6839'
  ctx.fillRect(0, 0, STUB, H)

  if (assets.ornament) {
    ctx.save()
    ctx.globalAlpha = 0.25
    ctx.drawImage(assets.ornament, 0, 0, STUB, H)
    ctx.restore()
  }

  ctx.save()
  ctx.translate(STUB - 60, 48)
  ctx.rotate(-0.15)
  ctx.strokeStyle = '#FF2D84'
  ctx.lineWidth = 2
  roundRect(ctx, -50, -14, 100, 28, 4)
  ctx.stroke()
  ctx.fillStyle = '#FF2D84'
  ctx.font = '700 9px "JetBrains Mono", monospace'
  ctx.textAlign = 'center'
  ctx.fillText('GOA 2026 · VIP', 0, 4)
  ctx.restore()

  const photoR = 95
  const photoCX = STUB / 2
  const photoCY = H / 2 - 20

  ctx.save()
  ctx.beginPath()
  ctx.arc(photoCX, photoCY, photoR + 6, 0, Math.PI * 2)
  ctx.strokeStyle = '#F5D800'
  ctx.lineWidth = 4
  ctx.stroke()
  ctx.restore()

  drawPhotoCircle(ctx, photo, photoCX, photoCY, photoR, info.photoZoom, info.photoPanX, info.photoPanY)

  const displayName = (info.name || 'YOUR NAME').toUpperCase()
  ctx.fillStyle = '#FAFAF8'
  drawAutoFitText(ctx, displayName, STUB / 2, photoCY + photoR + 32, STUB - 36, 22, 'Space Grotesk', 'bold', 'center')

  ctx.fillStyle = '#FF2D84'
  drawAutoFitText(ctx, (info.builderClass || 'Coastal Architect').toUpperCase(), STUB / 2, photoCY + photoR + 54, STUB - 36, 14, 'Space Grotesk', '800', 'center')

  ctx.fillStyle = '#F5D800'
  ctx.fillRect(0, H - 54, STUB, 54)
  ctx.fillStyle = '#0B6839'
  ctx.font = 'bold 18px "Space Grotesk", sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('BOARDING PASS · 2026', STUB / 2, H - 20)

  ctx.strokeStyle = '#0B6839'
  ctx.lineWidth = 2
  ctx.setLineDash([10, 8])
  ctx.beginPath()
  ctx.moveTo(STUB, 0)
  ctx.lineTo(STUB, H)
  ctx.stroke()
  ctx.setLineDash([])

  drawPerforations(ctx, STUB + 10, 15, W - STUB - 20, false, 10)
  drawPerforations(ctx, STUB + 10, H - 15, W - STUB - 20, false, 10)

  const RX = STUB + 44
  const contentW = W - STUB - 64

  ctx.fillStyle = '#0B6839'
  ctx.font = 'bold 44px "Space Grotesk", sans-serif'
  ctx.textAlign = 'left'
  const title1 = 'HACKER HOUSE'
  ctx.fillText(title1, RX, 82)
  const title1W = ctx.measureText(title1).width

  ctx.fillStyle = '#FF2D84'
  ctx.font = 'bold 36px "Space Grotesk", sans-serif'
  ctx.fillText('गोवा', RX + title1W + 12, 80)

  ctx.fillStyle = '#0B6839'
  ctx.font = '700 12px "JetBrains Mono", monospace'
  ctx.fillText('FLIGHT HH2026  ✦  DESTINATION: GOA (GOI)  ✦  OCT 28–31', RX, 108)

  ctx.fillStyle = '#0B6839'
  ctx.fillRect(RX, 122, contentW, 2)

  const fields = []
  fields.push({ label: 'PASSENGER', val: info.name || 'YOUR NAME' })
  fields.push({ label: 'GATE / SEAT', val: `GOA-247 · ${info.builderId?.slice(-4) || 'B247'}` })

  if (info.role || info.location) {
    fields.push({ label: 'ROLE & LOCATION', val: `${info.role || 'Builder'} · ${info.location || 'India'}` })
  }

  if (info.stack && info.stack.trim()) {
    fields.push({ label: 'TECH STACK', val: info.stack.trim() })
  }

  const socials = collectSocials(info)
  socials.forEach(s => {
    fields.push({ label: s.label, val: s.val })
  })

  const fieldYStart = 144
  const rowHeight = 38
  const colW = (contentW - 24) / 2

  fields.forEach((field, i) => {
    const colIdx = i % 2
    const rowIdx = Math.floor(i / 2)
    const fx = RX + colIdx * (colW + 24)
    const fy = fieldYStart + rowIdx * rowHeight

    ctx.fillStyle = 'rgba(11,104,57,0.75)'
    ctx.font = '700 9.5px "JetBrains Mono", monospace'
    ctx.textAlign = 'left'
    ctx.fillText(field.label, fx, fy)

    ctx.fillStyle = '#052C17'
    drawAutoFitText(ctx, field.val, fx, fy + 17, colW, 14, 'Space Grotesk', 'bold', 'left')
  })

  const bcY = H - 110
  ctx.fillStyle = 'rgba(11,104,57,0.08)'
  roundRect(ctx, RX, bcY, contentW, 50, 8)
  ctx.fill()
  drawBarcode(ctx, RX + 12, bcY + 6, contentW - 24, 24)
  ctx.fillStyle = '#0B6839'
  ctx.font = '700 10.5px "JetBrains Mono", monospace'
  ctx.textAlign = 'center'
  ctx.fillText(`PASS ID: ${info.builderId || 'HH26-XXXXXX'}  ·  BOARDING: OCT 28, 2026`, RX + contentW / 2, bcY + 42)

  ctx.fillStyle = '#0B6839'
  ctx.fillRect(STUB, H - 46, W - STUB, 46)
  ctx.fillStyle = '#F5D800'
  ctx.font = 'bold 18px "Space Grotesk", sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('#FrameInGoa  ·  hhgoa.com  ·  2:47PM STUDIO', STUB + (W - STUB) / 2, H - 18)

  ctx.restore()
}

async function drawIdCard(ctx, photo, assets, info) {
  const SCALE = 2
  const LOGICAL_W = 1080, LOGICAL_H = 1350
  ctx.canvas.width = LOGICAL_W * SCALE
  ctx.canvas.height = LOGICAL_H * SCALE

  ctx.save()
  ctx.scale(SCALE, SCALE)

  const W = LOGICAL_W, H = LOGICAL_H

  const theme = info.idTheme || 'emerald'
  const isSunset = theme === 'sunset'
  const isOcean = theme === 'ocean'

  const bgOuter = isSunset ? '#1F061C' : (isOcean ? '#020F1A' : '#042815')
  const cardBg = isSunset ? 'rgba(58, 11, 48, 0.96)' : (isOcean ? 'rgba(6, 36, 60, 0.96)' : 'rgba(7, 62, 34, 0.94)')
  const goldAccent = isSunset ? '#FF2D84' : (isOcean ? '#00E5FF' : '#F5D800')
  const pinkAccent = isSunset ? '#F5D800' : (isOcean ? '#FF2D84' : '#FF2D84')

  // Theme-Adapted Outer Canvas Fill
  ctx.fillStyle = bgOuter
  ctx.fillRect(0, 0, W, H)

  // Radial dark vignette matching theme
  const vignetteGrad = ctx.createRadialGradient(W / 2, H / 2, 200, W / 2, H / 2, 700)
  if (isSunset) {
    vignetteGrad.addColorStop(0, 'rgba(58, 11, 48, 0.5)')
    vignetteGrad.addColorStop(1, 'rgba(26, 5, 23, 0.98)')
  } else if (isOcean) {
    vignetteGrad.addColorStop(0, 'rgba(6, 36, 60, 0.5)')
    vignetteGrad.addColorStop(1, 'rgba(2, 14, 24, 0.98)')
  } else {
    vignetteGrad.addColorStop(0, 'rgba(7, 62, 34, 0.5)')
    vignetteGrad.addColorStop(1, 'rgba(4, 40, 21, 0.98)')
  }
  ctx.fillStyle = vignetteGrad
  ctx.fillRect(0, 0, W, H)

  // Composite Brand Sunrise / Backdrop
  if (assets.sunrise || assets.agenda) {
    const bgImg = assets.sunrise || assets.agenda
    ctx.save()
    ctx.globalAlpha = 0.3
    const bW = W
    const bH = (bgImg.height / bgImg.width) * bW
    ctx.drawImage(bgImg, 0, 0, bW, bH)
    ctx.restore()
  }

  // Ornament border overlay
  if (assets.ornament) {
    ctx.save()
    ctx.globalAlpha = 0.2
    ctx.drawImage(assets.ornament, 0, 0, W, H)
    ctx.restore()
  }

  // Palm tree vector at bottom
  if (assets.palmTrees) {
    ctx.save()
    ctx.globalAlpha = 0.45
    const ptW = W
    const ptH = (assets.palmTrees.height / assets.palmTrees.width) * ptW
    ctx.drawImage(assets.palmTrees, 0, H - ptH + 30, ptW, ptH)
    ctx.restore()
  }

  // Lanyard Punch Hole at Top
  ctx.save()
  const holeX = W / 2 - 40
  const holeY = 18
  roundRect(ctx, holeX, holeY, 80, 18, 9)
  ctx.fillStyle = isSunset ? '#140312' : (isOcean ? '#01080f' : '#02180d')
  ctx.fill()
  ctx.strokeStyle = goldAccent
  ctx.lineWidth = 3
  ctx.stroke()
  ctx.restore()

  // Inner VIP Card Container
  const pad = 40
  const cardW = W - pad * 2
  const cardH = H - pad * 2 - 10
  const cardX = pad
  const cardY = pad + 15

  ctx.save()
  roundRect(ctx, cardX, cardY, cardW, cardH, 28)
  ctx.fillStyle = cardBg
  ctx.fill()
  ctx.strokeStyle = goldAccent
  ctx.lineWidth = 4
  ctx.stroke()
  ctx.restore()

  // Header Strip with Logo
  ctx.fillStyle = goldAccent
  roundRect(ctx, cardX + 24, cardY + 24, cardW - 48, 116, 20)
  ctx.fill()

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

  const headTextX = cardX + 150
  ctx.fillStyle = '#0B6839'
  ctx.font = 'bold 44px "Space Grotesk", sans-serif'
  ctx.textAlign = 'left'
  ctx.fillText('HACKER HOUSE', headTextX, cardY + 82)

  const hW = ctx.measureText('HACKER HOUSE').width
  ctx.fillStyle = '#FF2D84'
  ctx.font = 'bold 36px "Space Grotesk", sans-serif'
  ctx.fillText('गोवा', headTextX + hW + 12, cardY + 80)

  ctx.fillStyle = '#063C20'
  ctx.font = '700 13px "JetBrains Mono", monospace'
  ctx.fillText('2026 OFFICIAL BUILDER VIP PASS  ·  OCT 28–31, GOA', headTextX, cardY + 112)

  // Hero Photo Frame
  const photoSize = 360
  const photoX = W / 2 - photoSize / 2
  const photoY = cardY + 165

  ctx.save()
  roundRect(ctx, photoX - 8, photoY - 8, photoSize + 16, photoSize + 16, 24)
  ctx.fillStyle = bgOuter
  ctx.fill()
  ctx.strokeStyle = goldAccent
  ctx.lineWidth = 5
  ctx.stroke()
  ctx.restore()

  ctx.save()
  roundRect(ctx, photoX - 3, photoY - 3, photoSize + 6, photoSize + 6, 20)
  ctx.strokeStyle = pinkAccent
  ctx.lineWidth = 3
  ctx.stroke()
  ctx.restore()

  drawPhotoRounded(ctx, photo, photoX, photoY, photoSize, photoSize, 16, info.photoZoom, info.photoPanX, info.photoPanY)

  // VIP Hologram Badge Seal
  const sealX = photoX + photoSize - 20
  const sealY = photoY + photoSize - 20
  ctx.save()
  ctx.fillStyle = pinkAccent
  ctx.beginPath()
  ctx.arc(sealX, sealY, 44, 0, Math.PI * 2)
  ctx.fill()
  ctx.strokeStyle = goldAccent
  ctx.lineWidth = 4
  ctx.stroke()

  ctx.fillStyle = '#FAFAF8'
  ctx.font = 'bold 11px "Space Grotesk", sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('BUILDER', sealX, sealY - 6)
  ctx.fillText('VIP 2026', sealX, sealY + 10)
  ctx.restore()

  // Builder Name
  const nameY = photoY + photoSize + 55
  const rawName = (info.name || 'YOUR NAME').toUpperCase()
  ctx.fillStyle = '#FAFAF8'
  drawAutoFitText(ctx, rawName, W / 2, nameY, cardW - 60, 48, 'Space Grotesk', 'bold', 'center')

  // Builder Class Badge Pill
  const bClass = (info.builderClass || 'Coastal Architect').toUpperCase()
  ctx.font = '800 17px "Space Grotesk", sans-serif'
  const bClassW = Math.min(cardW - 80, Math.max(260, ctx.measureText(bClass).width + 48))
  ctx.fillStyle = pinkAccent
  roundRect(ctx, W / 2 - bClassW / 2, nameY + 18, bClassW, 44, 22)
  ctx.fill()
  ctx.fillStyle = '#FAFAF8'
  ctx.textAlign = 'center'
  drawAutoFitText(ctx, bClass, W / 2, nameY + 46, bClassW - 20, 17, 'Space Grotesk', '800', 'center')

  // Multi-Social & Info Grid Container
  const gridY = nameY + 86
  const gridW = cardW - 64
  const gridX = cardX + 32

  const items = []
  if (info.role || info.location) {
    items.push({ label: 'ROLE & LOCATION', val: `${info.role || 'Builder'} · ${info.location || 'India'}` })
  }
  if (info.stack && info.stack.trim()) {
    items.push({ label: 'TECH STACK', val: info.stack.trim() })
  }

  const socials = collectSocials(info)
  socials.forEach(s => items.push({ label: s.label, val: s.val }))

  if (items.length === 0) {
    items.push({ label: 'STATUS', val: '247 BUILDERS SELECTED' })
    items.push({ label: 'VENUE', val: 'GOA, INDIA' })
    items.push({ label: 'ACCESS', val: 'FULL BEACH RESORT PASS' })
    items.push({ label: 'STUDIO', val: '2:47 PM STUDIO' })
  }

  const gridRows = Math.ceil(items.length / 2)
  const boxH = Math.max(260, gridRows * 76 + 24)

  ctx.fillStyle = 'rgba(0,0,0,0.25)'
  roundRect(ctx, gridX, gridY, gridW, boxH, 20)
  ctx.fill()
  ctx.strokeStyle = goldAccent
  ctx.lineWidth = 1.5
  ctx.stroke()

  const colWidth = (gridW - 44) / 2
  items.slice(0, 8).forEach((item, idx) => {
    const colIdx = idx % 2
    const rowIdx = Math.floor(idx / 2)
    const fx = gridX + 22 + colIdx * (colWidth + 20)
    const fy = gridY + 24 + rowIdx * 72

    ctx.fillStyle = 'rgba(255,255,255,0.05)'
    roundRect(ctx, fx - 10, fy - 16, colWidth, 62, 12)
    ctx.fill()

    ctx.fillStyle = goldAccent
    ctx.font = '700 11px "JetBrains Mono", monospace'
    ctx.textAlign = 'left'
    ctx.fillText(item.label, fx, fy)

    ctx.fillStyle = '#FAFAF8'
    drawAutoFitText(ctx, item.val, fx, fy + 24, colWidth - 20, 15, 'Space Grotesk', '600', 'left')
  })

  // Footer Barcode
  const footerY = cardY + cardH - 120
  ctx.fillStyle = 'rgba(0,0,0,0.35)'
  roundRect(ctx, gridX, footerY, gridW, 80, 16)
  ctx.fill()

  drawBarcode(ctx, gridX + 20, footerY + 14, gridW - 40, 32, goldAccent)

  ctx.fillStyle = goldAccent
  ctx.font = '700 13px "JetBrains Mono", monospace'
  ctx.textAlign = 'center'
  ctx.fillText(`PASS ID: ${info.builderId || 'HH26-VIP247'}  ·  #FrameInGoa  ·  2:47PM STUDIO`, W / 2, footerY + 64)

  ctx.restore()
}

async function drawPfp(ctx, photo, assets, info) {
  const SCALE = 2
  const LOGICAL_W = 1080, LOGICAL_H = 1080
  ctx.canvas.width = LOGICAL_W * SCALE
  ctx.canvas.height = LOGICAL_H * SCALE

  ctx.save()
  ctx.scale(SCALE, SCALE)

  const W = LOGICAL_W, H = LOGICAL_H

  ctx.fillStyle = '#084D2A'
  ctx.fillRect(0, 0, W, H)

  if (assets.sunrise || assets.agenda) {
    const bgImg = assets.sunrise || assets.agenda
    ctx.save()
    ctx.globalAlpha = 0.38
    const srW = W
    const srH = (bgImg.height / bgImg.width) * srW
    ctx.drawImage(bgImg, 0, (H - srH) / 2, srW, srH)
    ctx.restore()
  }

  const grad = ctx.createRadialGradient(W / 2, H / 2, 180, W / 2, H / 2, 600)
  grad.addColorStop(0, 'rgba(8,77,42,0.4)')
  grad.addColorStop(0.7, 'rgba(8,77,42,0.85)')
  grad.addColorStop(1, 'rgba(5,44,23,0.98)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, W, H)

  if (assets.ornament) {
    ctx.save()
    ctx.globalAlpha = 0.38
    ctx.drawImage(assets.ornament, 0, 0, W, H)
    ctx.restore()
  }

  if (assets.palmTrees) {
    ctx.save()
    ctx.globalAlpha = 0.45
    const ptW = W
    const ptH = (assets.palmTrees.height / assets.palmTrees.width) * ptW
    ctx.drawImage(assets.palmTrees, 0, H - ptH + 20, ptW, ptH)
    ctx.restore()
  }

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

  ctx.fillStyle = '#0B6839'
  ctx.font = '700 13px "JetBrains Mono", monospace'
  ctx.textAlign = 'center'
  ctx.fillText('GOA, INDIA · OCT 28–31 · 2:47PM STUDIO', W / 2, 80)

  const photoR = 250
  const photoCX = W / 2
  const photoCY = H / 2 - 40

  const glowGrad = ctx.createRadialGradient(photoCX, photoCY, photoR - 20, photoCX, photoCY, photoR + 60)
  glowGrad.addColorStop(0, 'rgba(245,216,0,0.25)')
  glowGrad.addColorStop(1, 'rgba(245,216,0,0)')
  ctx.fillStyle = glowGrad
  ctx.beginPath()
  ctx.arc(photoCX, photoCY, photoR + 60, 0, Math.PI * 2)
  ctx.fill()

  ctx.beginPath()
  ctx.arc(photoCX, photoCY, photoR + 20, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(245,216,0,0.35)'
  ctx.lineWidth = 2
  ctx.setLineDash([16, 12])
  ctx.stroke()
  ctx.setLineDash([])

  ctx.beginPath()
  ctx.arc(photoCX, photoCY, photoR + 8, 0, Math.PI * 2)
  ctx.strokeStyle = '#F5D800'
  ctx.lineWidth = 8
  ctx.stroke()

  drawPhotoCircle(ctx, photo, photoCX, photoCY, photoR, info.photoZoom, info.photoPanX, info.photoPanY)

  ctx.save()
  ctx.font = '700 19px "JetBrains Mono", monospace'
  ctx.fillStyle = 'rgba(245,216,0,0.85)'
  const arcText = 'HACKER HOUSE GOA 2026 · BUILD IN GOA · SHIP FROM PARADISE · '
  const arcR = photoR + 36
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

  if (info.name) {
    const rawName = info.name.toUpperCase()
    ctx.font = 'bold 42px "Space Grotesk", sans-serif'
    const nameW = Math.min(W - 120, ctx.measureText(rawName).width)
    const nameY = photoCY + photoR + 105

    ctx.save()
    roundRect(ctx, W / 2 - (nameW + 48) / 2, nameY - 38, nameW + 48, 54, 16)
    ctx.fillStyle = 'rgba(5, 44, 23, 0.95)'
    ctx.fill()
    ctx.strokeStyle = '#F5D800'
    ctx.lineWidth = 2
    ctx.stroke()

    ctx.fillStyle = '#FAFAF8'
    drawAutoFitText(ctx, rawName, W / 2, nameY, nameW + 20, 42, 'Space Grotesk', 'bold', 'center')
    ctx.restore()
  }

  ctx.fillStyle = 'rgba(0,0,0,0.7)'
  ctx.fillRect(0, H - 80, W, 80)
  ctx.fillStyle = '#F5D800'
  ctx.font = 'bold 24px "Space Grotesk", sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('#FrameInGoa', W / 2, H - 46)
  ctx.fillStyle = 'rgba(250,250,248,0.6)'
  ctx.font = '13px "JetBrains Mono", monospace'
  ctx.fillText('hhgoa.com · Oct 28-31, 2026 · Goa, India', W / 2, H - 22)

  ctx.restore()
}

async function drawTeamFrame(ctx, photos, assets, info) {
  const SCALE = 2
  const LOGICAL_W = 1200, LOGICAL_H = 630
  ctx.canvas.width = LOGICAL_W * SCALE
  ctx.canvas.height = LOGICAL_H * SCALE

  ctx.save()
  ctx.scale(SCALE, SCALE)

  const W = LOGICAL_W, H = LOGICAL_H

  const bgImg = assets.hackers || assets.buildersScene || assets.sunrise
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

  const overlayGrad = ctx.createLinearGradient(0, 0, 0, H)
  overlayGrad.addColorStop(0, 'rgba(5,44,23,0.9)')
  overlayGrad.addColorStop(0.5, 'rgba(5,44,23,0.7)')
  overlayGrad.addColorStop(1, 'rgba(5,44,23,0.95)')
  ctx.fillStyle = overlayGrad
  ctx.fillRect(0, 0, W, H)

  if (assets.ornament) {
    ctx.save()
    ctx.globalAlpha = 0.22
    ctx.drawImage(assets.ornament, 0, 0, W, H)
    ctx.restore()
  }

  if (assets.palmTrees) {
    ctx.save()
    ctx.globalAlpha = 0.35
    const ptW = W
    const ptH = (assets.palmTrees.height / assets.palmTrees.width) * ptW
    ctx.drawImage(assets.palmTrees, 0, H - ptH + 20, ptW, ptH)
    ctx.restore()
  }

  ctx.fillStyle = '#F5D800'
  ctx.fillRect(0, 0, W, 76)
  ctx.fillStyle = '#0B6839'
  ctx.font = 'bold 36px "Space Grotesk", sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('HACKER HOUSE GOA 2026  ·  TEAM SQUAD', W / 2, 48)

  ctx.fillStyle = '#0B6839'
  ctx.font = '700 12px "JetBrains Mono", monospace'
  ctx.fillText('OCT 28–31, 2026  ✦  GOA, INDIA  ✦  SHIPPING FROM PARADISE', W / 2, 68)

  const activePhotos = photos.filter(Boolean)
  const count = Math.max(1, Math.min(4, activePhotos.length || 1))

  let slotR = 100
  let gap = 70
  if (count === 1) { slotR = 130; gap = 0 }
  else if (count === 2) { slotR = 115; gap = 90 }
  else if (count === 3) { slotR = 105; gap = 70 }
  else { slotR = 95; gap = 50 }

  const totalWidth = count * (slotR * 2) + (count - 1) * gap
  const startX = W / 2 - totalWidth / 2 + slotR
  const cy = H / 2 + 10

  for (let i = 0; i < count; i++) {
    const cx = startX + i * (slotR * 2 + gap)
    const currentPhoto = activePhotos[i] || (i === 0 ? photos[0] : null)

    const glw = ctx.createRadialGradient(cx, cy, slotR - 10, cx, cy, slotR + 36)
    glw.addColorStop(0, `rgba(${i % 2 === 0 ? '245,216,0' : '255,45,132'},0.35)`)
    glw.addColorStop(1, 'transparent')
    ctx.fillStyle = glw
    ctx.beginPath(); ctx.arc(cx, cy, slotR + 36, 0, Math.PI * 2); ctx.fill()

    ctx.beginPath()
    ctx.arc(cx, cy, slotR + 6, 0, Math.PI * 2)
    ctx.strokeStyle = i % 2 === 0 ? '#F5D800' : '#FF2D84'
    ctx.lineWidth = 6
    ctx.stroke()

    drawPhotoCircle(ctx, currentPhoto, cx, cy, slotR, info.photoZoom, info.photoPanX, info.photoPanY)

    const memberName = info.teamNames?.[i] || (i === 0 ? (info.name || 'You') : `Builder ${i + 1}`)
    ctx.fillStyle = '#FAFAF8'
    drawAutoFitText(ctx, memberName, cx, cy + slotR + 30, slotR * 2 + 20, 20, 'Space Grotesk', 'bold', 'center')

    const subHandle = i === 0 && info.handle ? `@${info.handle}` : `BUILDER 0${i + 1}`
    ctx.fillStyle = '#F5D800'
    ctx.font = '700 12px "JetBrains Mono", monospace'
    ctx.fillText(subHandle, cx, cy + slotR + 50)
  }

  ctx.fillStyle = 'rgba(0,0,0,0.85)'
  ctx.fillRect(0, H - 64, W, 64)
  ctx.fillStyle = '#F5D800'
  ctx.font = 'bold 22px "Space Grotesk", sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('#FrameInGoa  ·  Oct 28–31, 2026  ·  GOA, INDIA  ·  hhgoa.com', W / 2, H - 34)
  ctx.fillStyle = 'rgba(250,250,248,0.6)'
  ctx.font = '12px "JetBrains Mono", monospace'
  ctx.fillText('2:47 PM STUDIO  ·  247 BUILDERS SELECTED', W / 2, H - 14)

  ctx.restore()
}

export default function Page() {
  const [step, setStep] = useState('landing')
  const [activeFrame, setActiveFrame] = useState('boarding')
  const [userPhoto, setUserPhoto] = useState(null)
  const [teamPhotos, setTeamPhotos] = useState([null, null, null, null])
  const [hasPhoto, setHasPhoto] = useState(false)

  const [info, setInfo] = useState({
    name: '',
    role: 'Builder',
    stack: '',
    handle: '',
    linkedin: '',
    github: '',
    instagram: '',
    email: '',
    website: '',
    location: '',
    idTheme: 'emerald',
    photoZoom: 1.0,
    photoPanX: 0,
    photoPanY: 0,
    builderClass: randomBuilderClass(),
    builderId: generateBuilderId(),
    teamNames: ['', '', '', ''],
  })

  const [isDragging, setIsDragging] = useState(false)
  const [toast, setToast] = useState('')
  const [scoreInputs, setScoreInputs] = useState({
    likes: '',
    replies: '',
    bookmarks: '',
    retweets: '',
    quotes: '',
    views: '',
  })
  const [assetsLoaded, setAssetsLoaded] = useState(false)
  const [assets, setAssets] = useState({})
  const [activeTab, setActiveTab] = useState('generator')

  const canvasRef = useRef(null)
  const fileInputRef = useRef(null)
  const teamFileRefs = [useRef(null), useRef(null), useRef(null), useRef(null)]

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

  useEffect(() => {
    if (!assetsLoaded || !canvasRef.current || (step !== 'result' && step !== 'form')) return
    const ctx = canvasRef.current.getContext('2d')
    let animationFrameId

    const render = async () => {
      try {
        if (activeFrame === 'boarding') await drawBoardingPass(ctx, userPhoto, assets, info)
        else if (activeFrame === 'id-card') await drawIdCard(ctx, userPhoto, assets, info)
        else if (activeFrame === 'pfp') await drawPfp(ctx, userPhoto, assets, info)
        else if (activeFrame === 'team') await drawTeamFrame(ctx, teamPhotos, assets, info)
      } catch (e) {
        console.error(e)
      }
    }

    animationFrameId = requestAnimationFrame(render)
    return () => cancelAnimationFrame(animationFrameId)
  }, [activeFrame, userPhoto, teamPhotos, info, assetsLoaded, assets, step])

  const nudgePhoto = (dir) => {
    setInfo(prev => {
      let { photoPanX, photoPanY } = prev
      const step = 8
      if (dir === 'up') photoPanY = Math.max(-50, photoPanY - step)
      if (dir === 'down') photoPanY = Math.min(50, photoPanY + step)
      if (dir === 'left') photoPanX = Math.max(-50, photoPanX - step)
      if (dir === 'right') photoPanX = Math.min(50, photoPanX + step)
      if (dir === 'reset') { photoPanX = 0; photoPanY = 0; }
      return { ...prev, photoPanX, photoPanY }
    })
  }

  const handleFile = useCallback((file, teamIndex = -1) => {
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        if (teamIndex >= 0) {
          setTeamPhotos(prev => { const n = [...prev]; n[teamIndex] = img; return n })
        } else {
          setUserPhoto(img)
          setHasPhoto(true)
          setInfo(prev => ({ ...prev, photoPanX: 0, photoPanY: 0, photoZoom: 1.0 }))
        }
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
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
      showToast('Ultra HD Frame downloaded as PNG!')
    }, 'image/png')
  }

  const handleShareX = async () => {
    const text = makeShareText(info.name, info.builderClass)
    const encoded = encodeURIComponent(text)
    window.open(`https://twitter.com/intent/tweet?text=${encoded}`, '_blank', 'noopener')
    if (canvasRef.current) {
      canvasRef.current.toBlob(async (blob) => {
        try {
          await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
          showToast('Ultra HD Image copied to clipboard!')
        } catch { }
      })
    }
  }

  const handleWebShare = async () => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.toBlob(async (blob) => {
      const file = new File([blob], `hhgoa-2026-${activeFrame}.png`, { type: 'image/png' })
      const shareData = {
        title: 'Frame In Goa — HH Goa 2026',
        text: makeShareText(info.name, info.builderClass),
        url: 'https://hhgoa-2026-five.vercel.app/',
        files: [file]
      }
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share(shareData)
          showToast('Shared successfully!')
        } catch (err) {
          if (err.name !== 'AbortError') handleShareX()
        }
      } else {
        handleShareX()
      }
    }, 'image/png')
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
      <header className="site-header">
        <div className="container header-inner">
          <button
            className="logo-lockup"
            onClick={() => { setActiveTab('generator'); setStep('landing'); }}
            id="site-logo"
            style={{ background: 'transparent', border: 'none', padding: 0, textAlign: 'left', cursor: 'pointer' }}
          >
            <img src="/assets/logo.jpeg" alt="HH Goa Logo" className="header-logo-img" />
            <div className="logo-text">
              <strong>Frame In Goa</strong>
              <span>2026 EDITION · 2:47PM STUDIO</span>
            </div>
          </button>
          <nav className="header-nav">
            <button
              className={`nav-tab${activeTab === 'generator' ? ' active' : ''}`}
              onClick={() => { setActiveTab('generator'); }}
              id="nav-generator"
            >
              Generator
            </button>
            <button
              className={`nav-tab${activeTab === 'hype' ? ' active' : ''}`}
              onClick={() => setActiveTab('hype')}
              id="nav-hype"
            >
              Check Hype
            </button>
            <a href="https://hhgoa.com" target="_blank" rel="noopener noreferrer" className="btn-hhgoa" id="btn-hhgoa">
              Apply → hhgoa.com
            </a>
          </nav>
        </div>
      </header>

      {activeTab === 'generator' && (
        <>
          {step === 'landing' && (
            <main className="landing">
              <section className="landing-hero">
                <div className="landing-bg">
                  <img src="/assets/sunrise.png" alt="" className="hero-bg-img" aria-hidden="true" />
                  <div className="hero-overlay" />
                  <img src="/assets/ornament-border.webp" alt="" className="hero-ornament" aria-hidden="true" />
                </div>
                <div className="container landing-hero-inner">
                  <div className="landing-eyebrow">
                    <span className="blink-dot" />
                    Open Now · Oct 2026 · #FrameInGoa
                  </div>
                  <h1 className="landing-title">
                    GET YOUR<br />
                    <span className="title-accent">GOA <em>गोवा</em></span><br />
                    FRAME
                  </h1>
                  <p className="landing-subtitle">
                    Drop your photo. Personalize your pass. Post with <strong>#FrameInGoa</strong> and claim your spot.
                  </p>
                  <div className="landing-features">
                    {[
                      ['Boarding Pass', '1080×566', 'Vintage flight ticket pass with seat stub & barcode'],
                      ['VIP Builder ID', '1080×1350', 'Festival VIP badge with lanyard & hologram seal'],
                      ['Profile Frame', '1080×1080', 'Circular PFP avatar with Goan arch ornament'],
                      ['Team Frame', '1200×630', 'Squad card for 1 to 4 team builders'],
                    ].map(([name, dim, desc]) => (
                      <div className="feature-chip" key={name}>
                        <span className="chip-name">{name}</span>
                        <span className="chip-dim">{dim}</span>
                        <span className="chip-desc">{desc}</span>
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

              <section className="about-strip">
                <div className="container">
                  <div className="about-grid">
                    <div className="about-img-wrap">
                      <img src="/assets/hackers.png" alt="Builders at Hacker House Goa" className="about-img" />
                    </div>
                    <div className="about-text">
                      <div className="about-label">OFFICIAL EVENT FRAME</div>
                      <h2>Your Ticket to Goa</h2>
                      <p>
                        Hacker House Goa 2026 — 247 builders. 4 days. Private beach resort in Goa, India.
                        Oct 28–31, 2026. Less noise. More ships.
                      </p>
                      <p>
                        Generate your personalized HH Goa frame, share on X with <strong>#FrameInGoa</strong> to get tracked on the Radar.
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

              <section className="signpost-strip">
                <div className="container signpost-inner">
                  <img src="/assets/signpost.png" alt="Goa beach signpost" className="signpost-img" />
                  <div className="signpost-cta">
                    <h3>Ready to board?</h3>
                    <p>Upload your photo and generate your unique HH Goa 2026 pass in seconds.</p>
                    <button className="btn-cta-primary" onClick={() => setStep('form')} id="btn-create-frame-2">
                      Generate My Frame →
                    </button>
                  </div>
                </div>
              </section>
            </main>
          )}

          {(step === 'form' || step === 'result') && (
            <main className="form-step">
              <div className="container">
                <button className="btn-back" onClick={() => setStep('landing')} id="btn-back-home">
                  ← Back to Overview
                </button>

                <div className="form-header">
                  <h2>Personalize Your Pass</h2>
                  <p>Pick a style, add your details, and fine-tune your photo position.</p>
                </div>

                <div className="frame-type-bar">
                  {FRAMES.map(f => (
                    <button
                      key={f.id}
                      className={`frame-tab${activeFrame === f.id ? ' active' : ''}`}
                      onClick={() => setActiveFrame(f.id)}
                      id={`tab-frame-${f.id}`}
                    >
                      <span className="frame-tab-name">{f.name}</span>
                      <span className="frame-tab-dim">{f.dim}</span>
                    </button>
                  ))}
                </div>

                <div className="form-grid">
                  <div className="form-panel">
                    <div className="form-section">
                      <div className="form-section-title">1. PHOTO UPLOAD</div>
                      {!isTeam ? (
                        <div>
                          <div
                            className={`drop-zone${hasPhoto ? ' has-photo' : ''}${isDragging ? ' drag-active' : ''}`}
                            onClick={() => fileInputRef.current?.click()}
                            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={handleDrop}
                            id="drop-zone-main"
                          >
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/*"
                              style={{ display: 'none' }}
                              onChange={(e) => handleFile(e.target.files?.[0])}
                            />
                            <div className="dz-title">
                              {hasPhoto ? 'Change Photo' : 'Drop photo or click to browse'}
                            </div>
                            <div className="dz-sub">Supports JPG, PNG, HEIC, WEBP</div>
                          </div>

                          {hasPhoto && (
                            <div className="photo-controls-card">
                              <div className="photo-controls-title">POSITION & ZOOM ADAPTATION</div>

                              <div className="nudge-controls-row">
                                <div className="nudge-pad">
                                  <button className="btn-nudge empty" tabIndex={-1}></button>
                                  <button className="btn-nudge" onClick={() => nudgePhoto('up')} title="Nudge Up">▲</button>
                                  <button className="btn-nudge empty" tabIndex={-1}></button>
                                  <button className="btn-nudge" onClick={() => nudgePhoto('left')} title="Nudge Left">◀</button>
                                  <button className="btn-nudge" onClick={() => nudgePhoto('reset')} title="Reset Center">●</button>
                                  <button className="btn-nudge" onClick={() => nudgePhoto('right')} title="Nudge Right">▶</button>
                                  <button className="btn-nudge empty" tabIndex={-1}></button>
                                  <button className="btn-nudge" onClick={() => nudgePhoto('down')} title="Nudge Down">▼</button>
                                  <button className="btn-nudge empty" tabIndex={-1}></button>
                                </div>
                                <div className="nudge-info">
                                  <div className="control-label-row">
                                    <span>Zoom Scale</span>
                                    <span>{info.photoZoom.toFixed(1)}x</span>
                                  </div>
                                  <input
                                    type="range"
                                    min="1.0"
                                    max="2.5"
                                    step="0.05"
                                    value={info.photoZoom}
                                    onChange={(e) => updateInfo('photoZoom', parseFloat(e.target.value))}
                                    className="range-slider"
                                  />
                                  <button className="btn-reset-photo" onClick={() => nudgePhoto('reset')}>
                                    Reset Position
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="team-slots">
                          {[0, 1, 2, 3].map((idx) => (
                            <div key={idx} className="team-slot">
                              <div
                                className={`team-slot-drop${teamPhotos[idx] ? ' filled' : ''}`}
                                onClick={() => teamFileRefs[idx].current?.click()}
                              >
                                <input
                                  ref={teamFileRefs[idx]}
                                  type="file"
                                  accept="image/*"
                                  style={{ display: 'none' }}
                                  onChange={(e) => handleFile(e.target.files?.[0], idx)}
                                />
                                {teamPhotos[idx] ? '✓ Member' : `+ Member ${idx + 1}`}
                              </div>
                              <input
                                type="text"
                                className="field-input"
                                placeholder={`Member ${idx + 1} Name`}
                                value={info.teamNames[idx]}
                                onChange={(e) => updateTeamName(idx, e.target.value)}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="form-section">
                      <div className="form-section-title">2. PERSONAL DETAILS & SOCIALS</div>
                      <div className="fields-col">
                        <div className="fields-row">
                          <div className="field-wrap">
                            <label className="field-label">FULL NAME</label>
                            <input
                              type="text"
                              className="field-input"
                              placeholder="e.g. Satoshi Nakamoto"
                              value={info.name}
                              onChange={(e) => updateInfo('name', e.target.value)}
                              id="input-name"
                            />
                          </div>
                          <div className="field-wrap">
                            <label className="field-label">PRIMARY ROLE</label>
                            <input
                              type="text"
                              className="field-input"
                              placeholder="e.g. Fullstack Engineer"
                              value={info.role}
                              onChange={(e) => updateInfo('role', e.target.value)}
                              id="input-role"
                            />
                          </div>
                        </div>

                        <div className="fields-row">
                          <div className="field-wrap">
                            <label className="field-label">TWITTER / X</label>
                            <input
                              type="text"
                              className="field-input"
                              placeholder="e.g. username"
                              value={info.handle}
                              onChange={(e) => updateInfo('handle', e.target.value)}
                              id="input-twitter"
                            />
                          </div>
                          <div className="field-wrap">
                            <label className="field-label">LINKEDIN</label>
                            <input
                              type="text"
                              className="field-input"
                              placeholder="e.g. in/username"
                              value={info.linkedin}
                              onChange={(e) => updateInfo('linkedin', e.target.value)}
                              id="input-linkedin"
                            />
                          </div>
                        </div>

                        <div className="fields-row">
                          <div className="field-wrap">
                            <label className="field-label">GITHUB</label>
                            <input
                              type="text"
                              className="field-input"
                              placeholder="e.g. username"
                              value={info.github}
                              onChange={(e) => updateInfo('github', e.target.value)}
                              id="input-github"
                            />
                          </div>
                          <div className="field-wrap">
                            <label className="field-label">INSTAGRAM</label>
                            <input
                              type="text"
                              className="field-input"
                              placeholder="e.g. username"
                              value={info.instagram}
                              onChange={(e) => updateInfo('instagram', e.target.value)}
                              id="input-instagram"
                            />
                          </div>
                        </div>

                        <div className="fields-row">
                          <div className="field-wrap">
                            <label className="field-label">EMAIL ADDRESS</label>
                            <input
                              type="email"
                              className="field-input"
                              placeholder="e.g. builder@domain.com"
                              value={info.email}
                              onChange={(e) => updateInfo('email', e.target.value)}
                              id="input-email"
                            />
                          </div>
                          <div className="field-wrap">
                            <label className="field-label">PORTFOLIO / WEB</label>
                            <input
                              type="text"
                              className="field-input"
                              placeholder="e.g. mysite.com"
                              value={info.website}
                              onChange={(e) => updateInfo('website', e.target.value)}
                              id="input-website"
                            />
                          </div>
                        </div>

                        <div className="fields-row">
                          <div className="field-wrap">
                            <label className="field-label">LOCATION</label>
                            <input
                              type="text"
                              className="field-input"
                              placeholder="e.g. Bengaluru, India"
                              value={info.location}
                              onChange={(e) => updateInfo('location', e.target.value)}
                              id="input-location"
                            />
                          </div>
                          <div className="field-wrap">
                            <label className="field-label">TECH STACK</label>
                            <input
                              type="text"
                              className="field-input"
                              placeholder="e.g. Next.js, Rust, Solidity, AI"
                              value={info.stack}
                              onChange={(e) => updateInfo('stack', e.target.value)}
                              id="input-stack"
                            />
                          </div>
                        </div>

                        {activeFrame === 'id-card' && (
                          <div className="field-wrap">
                            <label className="field-label">VIP ID CARD THEME</label>
                            <div className="theme-selector-row">
                              {[
                                ['emerald', 'Emerald & Gold'],
                                ['sunset', 'Sunset Twilight'],
                                ['ocean', 'Arabian Ocean'],
                              ].map(([tKey, tLabel]) => (
                                <button
                                  key={tKey}
                                  type="button"
                                  className={`btn-theme${info.idTheme === tKey ? ' active' : ''}`}
                                  onClick={() => updateInfo('idTheme', tKey)}
                                >
                                  {tLabel}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="field-wrap">
                          <label className="field-label">BUILDER CLASS</label>
                          <div className="builder-class-row">
                            <div className="builder-class-display">{info.builderClass}</div>
                            <button
                              type="button"
                              className="btn-reroll"
                              onClick={rerollClass}
                              title="Shuffle Class"
                              id="btn-reroll-class"
                            >
                              ↻
                            </button>
                          </div>
                        </div>

                        <div className="field-wrap">
                          <label className="field-label">UNIQUE PASS ID</label>
                          <div className="builder-class-row">
                            <div className="builder-class-display mono">{info.builderId}</div>
                            <button
                              type="button"
                              className="btn-reroll"
                              onClick={rerollId}
                              title="New Pass ID"
                              id="btn-reroll-id"
                            >
                              ↻
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="preview-panel">
                    <div className="preview-label">LIVE ULTRA-HD PREVIEW</div>
                    <div className="canvas-wrap">
                      <canvas ref={canvasRef} />
                    </div>

                    <div className="result-actions">
                      <button className="btn-share-x" onClick={handleShareX} id="btn-share-x">
                        <Icons.Twitter /> Post on X with #FrameInGoa
                      </button>
                      <div className="result-action-secondary">
                        <button className="btn-download" onClick={handleDownload} id="btn-download">
                          <Icons.Download /> Download Ultra HD PNG
                        </button>
                        <button className="btn-edit" onClick={handleWebShare} id="btn-web-share">
                          <Icons.Share /> Share File
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          )}
        </>
      )}

      {activeTab === 'hype' && (
        <main className="hype-page">
          <div className="container">
            <div className="hype-hero">
              <h2>Selection <span>Radar Score</span></h2>
              <p>Plug in your X post stats to calculate your candidate score for Hacker House Goa 2026 selection.</p>
            </div>

            <div className="hype-grid">
              <div className="hype-inputs">
                {[
                  ['likes', 'Likes', '× 1 pt'],
                  ['retweets', 'Reposts', '× 4 pts'],
                  ['replies', 'Replies', '× 2 pts'],
                  ['bookmarks', 'Bookmarks', '× 3 pts'],
                  ['quotes', 'Quotes', '× 4 pts'],
                  ['views', 'Views', '× 0.02 pt'],
                ].map(([key, label, mult]) => (
                  <div className="hype-input-card" key={key}>
                    <div className="hype-input-top">
                      <span className="hype-label">{label}</span>
                      <span className="hype-mult">{mult}</span>
                    </div>
                    <input
                      type="number"
                      className="hype-num-input"
                      placeholder="0"
                      value={scoreInputs[key]}
                      onChange={(e) => {
                        const val = e.target.value
                        setScoreInputs(prev => ({ ...prev, [key]: val }))
                      }}
                      id={`hype-input-${key}`}
                    />
                  </div>
                ))}
              </div>

              <div className="hype-result">
                <div className="hype-result-label">CANDIDATE SELECTION SCORE</div>
                <div className="hype-score-number" style={{ color: verd.color }}>
                  {score} <span>/ 100</span>
                </div>

                <div className="hype-bar-track">
                  <div className="hype-bar-fill" style={{ width: `${score}%`, background: verd.color }} />
                </div>

                <div className="hype-verdict" style={{ color: verd.color }}>
                  {verd.text}
                </div>

                <div className="hype-tip">
                  <strong>Pro Tip:</strong> Post your pass with <strong>#FrameInGoa</strong> on X. Quality replies and reposts carry the highest weight in the radar formula.
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      <div className={`toast${toast ? ' show' : ''}`}>{toast}</div>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            Hacker House Goa 2026
          </div>
          <div className="footer-links">
            <a href="https://hhgoa.com" target="_blank" rel="noopener noreferrer">hhgoa.com</a>
            <span>·</span>
            <span>Oct 28–31, 2026 · Goa, India</span>
            <span>·</span>
            <span>Powered by 2:47PM Studio</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
