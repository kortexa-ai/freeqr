import { QR_TYPES, DOT_STYLES, SIZES, ERROR_CORRECTION_LEVELS, QR_VERSIONS } from '../utils/formatters';
import {
  Type, Link, Contact, Wifi, Mail, Phone, MessageSquare, MapPin,
  Save, RotateCcw,
} from 'lucide-react';

const ICONS = { Type, Link, Contact, Wifi, Mail, Phone, MessageSquare, MapPin };

function Input({ label, type = 'text', value, onChange, placeholder, ...rest }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
        {...rest}
      />
    </div>
  );
}

function Textarea({ label, value, onChange, placeholder, rows = 3 }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{label}</label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors resize-y"
      />
    </div>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
      >
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

function Checkbox({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        className="rounded border-slate-300 dark:border-slate-600 text-emerald-600 focus:ring-emerald-500"
      />
      {label}
    </label>
  );
}

/* Type-specific field groups */
function TextFields({ data, update }) {
  return <Textarea label="Text" value={data.text} onChange={v => update('text', v)} placeholder="Enter any text…" rows={4} />;
}

function URLFields({ data, update }) {
  return <Input label="URL" type="url" value={data.url} onChange={v => update('url', v)} placeholder="example.com" />;
}

function ContactFields({ data, update }) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Input label="First name" value={data.firstName} onChange={v => update('firstName', v)} placeholder="John" />
        <Input label="Last name" value={data.lastName} onChange={v => update('lastName', v)} placeholder="Doe" />
      </div>
      <Input label="Phone" type="tel" value={data.phone} onChange={v => update('phone', v)} placeholder="+1 555 123 4567" />
      <Input label="Email" type="email" value={data.email} onChange={v => update('email', v)} placeholder="john@example.com" />
      <Input label="Organization" value={data.org} onChange={v => update('org', v)} placeholder="Acme Inc." />
      <Input label="Website" type="url" value={data.url} onChange={v => update('url', v)} placeholder="https://example.com" />
      <Input label="Note" value={data.note} onChange={v => update('note', v)} placeholder="Met at conference" />
    </div>
  );
}

function WiFiFields({ data, update }) {
  return (
    <div className="space-y-3">
      <Input label="Network name (SSID)" value={data.ssid} onChange={v => update('ssid', v)} placeholder="MyWiFi" />
      <Input label="Password" value={data.password} onChange={v => update('password', v)} placeholder="••••••••" />
      <Select
        label="Encryption"
        value={data.encryption}
        onChange={v => update('encryption', v)}
        options={[
          { value: 'WPA', label: 'WPA/WPA2' },
          { value: 'WEP', label: 'WEP' },
          { value: 'nopass', label: 'None' },
        ]}
      />
      <Checkbox label="Hidden network" checked={data.hidden} onChange={v => update('hidden', v)} />
    </div>
  );
}

function EmailFields({ data, update }) {
  return (
    <div className="space-y-3">
      <Input label="To" type="email" value={data.to} onChange={v => update('to', v)} placeholder="hello@example.com" />
      <Input label="Subject" value={data.subject} onChange={v => update('subject', v)} placeholder="Subject line" />
      <Textarea label="Body" value={data.body} onChange={v => update('body', v)} placeholder="Message body…" />
    </div>
  );
}

function PhoneFields({ data, update }) {
  return <Input label="Phone number" type="tel" value={data.phone} onChange={v => update('phone', v)} placeholder="+1 555 123 4567" />;
}

function SMSFields({ data, update }) {
  return (
    <div className="space-y-3">
      <Input label="Phone number" type="tel" value={data.phone} onChange={v => update('phone', v)} placeholder="+1 555 123 4567" />
      <Textarea label="Message" value={data.message} onChange={v => update('message', v)} placeholder="Hey, check this out!" rows={2} />
    </div>
  );
}

function LocationFields({ data, update }) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Input label="Latitude" type="number" value={data.lat} onChange={v => update('lat', v)} placeholder="40.7128" step="any" />
        <Input label="Longitude" type="number" value={data.lng} onChange={v => update('lng', v)} placeholder="-74.0060" step="any" />
      </div>
      <Input label="Label" value={data.label} onChange={v => update('label', v)} placeholder="New York City" />
    </div>
  );
}

const FIELD_COMPONENTS = {
  text: TextFields,
  url: URLFields,
  contact: ContactFields,
  wifi: WiFiFields,
  email: EmailFields,
  phone: PhoneFields,
  sms: SMSFields,
  location: LocationFields,
};

export default function QRForm({ type, data, style, changeType, updateField, updateStyle, onSave, onReset }) {
  const FieldComponent = FIELD_COMPONENTS[type];

  return (
    <div className="space-y-6">
      {/* Type selector */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Type</label>
        <div className="flex flex-wrap gap-1.5">
          {QR_TYPES.map(t => {
            const Icon = ICONS[t.icon];
            const active = type === t.id;
            return (
              <button
                key={t.id}
                onClick={() => changeType(t.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Conditional fields */}
      <div>
        <FieldComponent data={data} update={updateField} />
      </div>

      {/* Style options */}
      <div className="border-t border-slate-200 dark:border-slate-700 pt-5 space-y-4">
        <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">Style</h3>

        {/* Dot style */}
        <div>
          <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1.5">Dot style</label>
          <div className="flex flex-wrap gap-1.5">
            {DOT_STYLES.map(ds => (
              <button
                key={ds.id}
                onClick={() => updateStyle('dotStyle', ds.id)}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  style.dotStyle === ds.id
                    ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                {ds.label}
              </button>
            ))}
          </div>
        </div>

        {/* Error correction */}
        <div>
          <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1.5">Error correction</label>
          <div className="flex gap-1.5">
            {ERROR_CORRECTION_LEVELS.map(ec => (
              <button
                key={ec.id}
                onClick={() => updateStyle('errorCorrection', ec.id)}
                title={ec.description}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  style.errorCorrection === ec.id
                    ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                {ec.id}
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            Higher = more recoverable but denser
          </p>
        </div>

        {/* QR version (density) */}
        <div>
          <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1.5">QR version (grid density)</label>
          <div className="flex flex-wrap gap-1.5">
            {QR_VERSIONS.map(v => (
              <button
                key={v.id}
                onClick={() => updateStyle('qrVersion', v.id)}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  style.qrVersion === v.id
                    ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            Higher version = more modules = finer grid
          </p>
        </div>

        {/* Colors */}
        <div className="flex gap-4">
          <div>
            <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1.5">Foreground</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={style.fgColor}
                onChange={e => updateStyle('fgColor', e.target.value)}
                className="w-8 h-8 rounded cursor-pointer border border-slate-300 dark:border-slate-600"
              />
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">{style.fgColor}</span>
            </div>
          </div>
          <div>
            <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1.5">Background</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={style.bgColor}
                onChange={e => updateStyle('bgColor', e.target.value)}
                className="w-8 h-8 rounded cursor-pointer border border-slate-300 dark:border-slate-600"
              />
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">{style.bgColor}</span>
            </div>
          </div>
        </div>

        {/* Size */}
        <div>
          <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1.5">Size</label>
          <div className="flex gap-1.5">
            {SIZES.map(s => (
              <button
                key={s.id}
                onClick={() => updateStyle('size', s.id)}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  style.size === s.id
                    ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                {s.label} ({s.id})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 border-t border-slate-200 dark:border-slate-700 pt-5">
        <button
          onClick={onSave}
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          <Save className="w-4 h-4" />
          Save
        </button>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>
    </div>
  );
}
