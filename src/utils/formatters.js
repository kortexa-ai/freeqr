/**
 * QR type definitions, default data, and structured data formatters
 */

export const QR_TYPES = [
  { id: 'text', label: 'Text', icon: 'Type' },
  { id: 'url', label: 'URL', icon: 'Link' },
  { id: 'contact', label: 'Contact', icon: 'Contact' },
  { id: 'wifi', label: 'WiFi', icon: 'Wifi' },
  { id: 'email', label: 'Email', icon: 'Mail' },
  { id: 'phone', label: 'Phone', icon: 'Phone' },
  { id: 'sms', label: 'SMS', icon: 'MessageSquare' },
  { id: 'location', label: 'Location', icon: 'MapPin' },
];

export const DEFAULT_DATA = {
  text: { text: '' },
  url: { url: '' },
  contact: { firstName: '', lastName: '', phone: '', email: '', org: '', url: '', note: '' },
  wifi: { ssid: '', password: '', encryption: 'WPA', hidden: false },
  email: { to: '', subject: '', body: '' },
  phone: { phone: '' },
  sms: { phone: '', message: '' },
  location: { lat: '', lng: '', label: '' },
};

export const DOT_STYLES = [
  { id: 'square', label: 'Square' },
  { id: 'rounded', label: 'Rounded' },
  { id: 'dots', label: 'Dots' },
  { id: 'classy', label: 'Classy' },
  { id: 'classy-rounded', label: 'Classy Rounded' },
  { id: 'extra-rounded', label: 'Extra Rounded' },
];

export const SIZES = [
  { id: 256, label: 'S' },
  { id: 512, label: 'M' },
  { id: 1024, label: 'L' },
];

export const ERROR_CORRECTION_LEVELS = [
  { id: 'L', label: 'L', description: 'Low (~7%)' },
  { id: 'M', label: 'M', description: 'Medium (~15%)' },
  { id: 'Q', label: 'Q', description: 'Quartile (~25%)' },
  { id: 'H', label: 'H', description: 'High (~30%)' },
];

// QR version determines the module grid size: version 1 = 21×21, version 40 = 177×177
// 0 = auto (smallest version that fits the data)
export const QR_VERSIONS = [
  { id: 0, label: 'Auto' },
  { id: 5, label: '5 (37×37)' },
  { id: 10, label: '10 (57×57)' },
  { id: 15, label: '15 (77×77)' },
  { id: 20, label: '20 (97×97)' },
  { id: 25, label: '25 (117×117)' },
  { id: 30, label: '30 (137×137)' },
  { id: 40, label: '40 (177×177)' },
];

export const DEFAULT_STYLE = {
  dotStyle: 'rounded',
  fgColor: '#000000',
  bgColor: '#ffffff',
  size: 512,
  errorCorrection: 'M',
  qrVersion: 0,
};

/** Escape special chars for WiFi/vCard strings */
function escWifi(str) {
  return str.replace(/([\\;,":])/, '\\$1');
}

/** Format data fields into a QR-encodable string */
export function formatQRString(type, data) {
  switch (type) {
    case 'text':
      return data.text || '';

    case 'url': {
      const url = (data.url || '').trim();
      if (!url) return '';
      if (!/^https?:\/\//i.test(url)) return 'https://' + url;
      return url;
    }

    case 'contact': {
      const { firstName, lastName, phone, email, org, url, note } = data;
      if (!firstName && !lastName && !phone && !email) return '';
      const lines = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${lastName || ''};${firstName || ''};;;`,
        `FN:${[firstName, lastName].filter(Boolean).join(' ')}`,
      ];
      if (org) lines.push(`ORG:${org}`);
      if (phone) lines.push(`TEL:${phone}`);
      if (email) lines.push(`EMAIL:${email}`);
      if (url) lines.push(`URL:${url}`);
      if (note) lines.push(`NOTE:${note}`);
      lines.push('END:VCARD');
      return lines.join('\n');
    }

    case 'wifi': {
      const { ssid, password, encryption, hidden } = data;
      if (!ssid) return '';
      let s = `WIFI:T:${encryption || 'WPA'};S:${escWifi(ssid)};`;
      if (password) s += `P:${escWifi(password)};`;
      if (hidden) s += 'H:true;';
      s += ';';
      return s;
    }

    case 'email': {
      const { to, subject, body } = data;
      if (!to) return '';
      const params = [];
      if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
      if (body) params.push(`body=${encodeURIComponent(body)}`);
      return `mailto:${to}${params.length ? '?' + params.join('&') : ''}`;
    }

    case 'phone':
      return data.phone ? `tel:${data.phone}` : '';

    case 'sms': {
      const { phone, message } = data;
      if (!phone) return '';
      return `smsto:${phone}${message ? ':' + message : ''}`;
    }

    case 'location': {
      const { lat, lng, label } = data;
      if (!lat || !lng) return '';
      return `geo:${lat},${lng}${label ? '?q=' + encodeURIComponent(label) : ''}`;
    }

    default:
      return '';
  }
}

/** Derive a short label for history entries */
export function deriveLabel(type, data) {
  switch (type) {
    case 'text':
      return (data.text || '').slice(0, 40) || 'Empty text';
    case 'url':
      return (data.url || '').slice(0, 40) || 'Empty URL';
    case 'contact':
      return [data.firstName, data.lastName].filter(Boolean).join(' ') || 'Empty contact';
    case 'wifi':
      return data.ssid || 'Empty WiFi';
    case 'email':
      return data.to || 'Empty email';
    case 'phone':
      return data.phone || 'Empty phone';
    case 'sms':
      return data.phone || 'Empty SMS';
    case 'location':
      return data.label || `${data.lat}, ${data.lng}` || 'Empty location';
    default:
      return 'QR Code';
  }
}
