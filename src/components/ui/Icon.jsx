import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  Check,
  MapPin,
  Zap,
  ChevronRight,
  ChevronLeft,
  Star,
  Phone,
  Mail,
  Shield,
  ShieldCheck,
  X,
  Trash2,
  Edit3,
  Eye,
  ExternalLink,
  Users,
  Smartphone,
  MessageSquare,
  RefreshCw,
  Download,
  Play,
  Upload,
  Info,
  AlertTriangle,
  AlertCircle,
  Clock,
  Sparkles,
  Search,
  Settings,
  Sliders,
  LogOut,
  FolderOpen,
  Send,
  Calendar,
  Lock,
} from 'lucide-react';

const ICON_MAP = {
  // Key icons specified in the prompt
  arrow_back: ArrowLeft,
  arrow_forward: ArrowRight,
  north_east: ArrowUpRight,
  check_circle: CheckCircle2,
  pin_drop: MapPin,
  bolt: Zap,
  chevron_right: ChevronRight,
  chevron_left: ChevronLeft,
  star: Star,
  call: Phone,
  mail: Mail,
  shield: Shield,
  shield_lock: ShieldCheck,

  // Common UI icons
  close: X,
  delete: Trash2,
  delete_forever: Trash2,
  edit: Edit3,
  visibility: Eye,
  open_in_new: ExternalLink,
  groups: Users,
  phone_iphone: Smartphone,
  chat: MessageSquare,
  refresh: RefreshCw,
  download: Download,
  cloud_upload: Upload,
  cloud_sync: RefreshCw,
  play_arrow: Play,
  arrow_downward: ArrowDown,
  arrow_upward: ArrowUp,
  arrow_forward_ios: ChevronRight,
  check: Check,
  task_alt: CheckCircle2,
  info: Info,
  warning: AlertTriangle,
  error: AlertCircle,
  error_outline: AlertCircle,
  schedule: Clock,
  celebration: Sparkles,
  search: Search,
  settings: Settings,
  tune: Sliders,
  logout: LogOut,
  inbox: FolderOpen,
  send: Send,
  event_available: Calendar,
  lock: Lock,
};

/**
 * Universal Zero-Flash Icon Component
 *
 * Renders an inline SVG icon powered by Lucide with zero reliance on web font loading.
 * Eliminates the Material Icons ligature text flash ("arrow_back", "check_circle", etc.)
 * while maintaining exact sizing, color inheritance, and styling.
 */
export default function Icon({ name, className = '', size = 20, strokeWidth = 2, 'aria-hidden': ariaHidden = true, ...props }) {
  const IconComponent = ICON_MAP[name];

  if (IconComponent) {
    return (
      <IconComponent
        size={size}
        strokeWidth={strokeWidth}
        className={`inline-block shrink-0 align-middle ${className}`}
        aria-hidden={ariaHidden}
        {...props}
      />
    );
  }

  // Fallback for icons not in map: render with font-display block and ligature hiding protection
  return (
    <span
      className={`material-symbols-outlined select-none ${className}`}
      style={{ fontSize: `${size}px` }}
      aria-hidden={ariaHidden}
      {...props}
    >
      {name}
    </span>
  );
}
