/** @typedef {'hero' | 'quiz' | 'interstitial' | 'results' | 'recommendation'} FunnelStep */

export const BRAND = {
  name: 'Verdan',
  tagline: 'Confidence backed by modern care.',
}

/** Bundled photos (client-safe, work offline) */
export const LOCAL_IMAGES = {
  hero: '/images/hero.jpg',
  product: '/images/product.jpg',
  interstitial: '/images/interstitial.jpg',
}

/** SVG fallbacks if a photo fails to load */
export const LOCAL_FALLBACKS = {
  hero: '/images/hero.svg',
  product: '/images/product.svg',
  interstitial: '/images/interstitial.svg',
}

/** Remote fallbacks when bundled assets are missing */
export const REMOTE_IMAGES = {
  heroPhoto:
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1200&q=85&auto=format&fit=crop&crop=faces',
  interstitialPhoto:
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=85&auto=format&fit=crop',
  productPhoto:
    'https://images.pexels.com/photos/3786154/pexels-photo-3786154.jpeg?auto=compress&cs=tinysrgb&w=1200',
}

export const VIDEO = {
  hero: 'https://videos.pexels.com/video-files/6963395/6963395-hd_1920_1080_25fps.mp4',
}
