import { colors } from '@/constants/theme';

export type IconProps = {
  size?: number;
  color?: string;
  strokeWidth?: number;
};

const DEFAULT_SIZE = 22;
const DEFAULT_COLOR = colors.text;
const DEFAULT_STROKE = 2;

export function HomeIcon({ size = DEFAULT_SIZE, color = DEFAULT_COLOR, strokeWidth = DEFAULT_STROKE }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth}>
      <path d="M4 11l8-6 8 6v9H4z" />
      <path d="M9 20v-6h6v6" />
    </svg>
  );
}

export function CalendarIcon({ size = DEFAULT_SIZE, color = DEFAULT_COLOR, strokeWidth = DEFAULT_STROKE }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth}>
      <rect x="4" y="5" width="16" height="16" />
      <path d="M4 9h16M8 3v4M16 3v4" />
    </svg>
  );
}

export function CarIcon({ size = DEFAULT_SIZE, color = DEFAULT_COLOR, strokeWidth = DEFAULT_STROKE }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth}>
      <path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11m-14 0h14v6H5zM8 17v1m8-1v1" />
    </svg>
  );
}

export function UserIcon({ size = DEFAULT_SIZE, color = DEFAULT_COLOR, strokeWidth = DEFAULT_STROKE }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
    </svg>
  );
}

export function GridIcon({ size = DEFAULT_SIZE, color = DEFAULT_COLOR, strokeWidth = DEFAULT_STROKE }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth}>
      <rect x="4" y="4" width="7" height="7" />
      <rect x="13" y="4" width="7" height="7" />
      <rect x="4" y="13" width="7" height="7" />
      <rect x="13" y="13" width="7" height="7" />
    </svg>
  );
}

export function PeopleIcon({ size = DEFAULT_SIZE, color = DEFAULT_COLOR, strokeWidth = DEFAULT_STROKE }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth}>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M3 20c0-3.5 3-5 6-5s6 1.5 6 5" />
      <path d="M16 5a3.5 3.5 0 0 1 0 7M17.5 15c2.5.4 4 2 4 5" />
    </svg>
  );
}

export function WrenchIcon({ size = DEFAULT_SIZE, color = DEFAULT_COLOR, strokeWidth = DEFAULT_STROKE }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth}>
      <path d="M14 6a4 4 0 0 1 5 5l-8.5 8.5a2 2 0 0 1-3-3L16 8a4 4 0 0 1-2-2z" />
    </svg>
  );
}

export function BellIcon({ size = DEFAULT_SIZE, color = DEFAULT_COLOR, strokeWidth = DEFAULT_STROKE }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth}>
      <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6M10 20a2 2 0 0 0 4 0" />
    </svg>
  );
}

export function MenuIcon({ size = DEFAULT_SIZE, color = DEFAULT_COLOR, strokeWidth = DEFAULT_STROKE }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

export function ListIcon({ size = DEFAULT_SIZE, color = DEFAULT_COLOR, strokeWidth = DEFAULT_STROKE }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth}>
      <path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01" />
    </svg>
  );
}

export function SearchIcon({ size = DEFAULT_SIZE, color = DEFAULT_COLOR, strokeWidth = DEFAULT_STROKE }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth}>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4-4" />
    </svg>
  );
}

export function ChevronRightIcon({ size = DEFAULT_SIZE, color = DEFAULT_COLOR, strokeWidth = DEFAULT_STROKE }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth}>
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

export function ChevronLeftIcon({ size = DEFAULT_SIZE, color = DEFAULT_COLOR, strokeWidth = DEFAULT_STROKE }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth}>
      <path d="M15 6l-6 6 6 6" />
    </svg>
  );
}

export function CheckIcon({ size = DEFAULT_SIZE, color = DEFAULT_COLOR, strokeWidth = DEFAULT_STROKE }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth}>
      <path d="M4 12l6 6L20 6" />
    </svg>
  );
}

export function CameraIcon({ size = DEFAULT_SIZE, color = DEFAULT_COLOR, strokeWidth = DEFAULT_STROKE }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth}>
      <rect x="3" y="6" width="18" height="13" />
      <circle cx="12" cy="12.5" r="3.5" />
      <path d="M8 6l1.5-2h5L16 6" />
    </svg>
  );
}

export function DollarIcon({ size = DEFAULT_SIZE, color = DEFAULT_COLOR, strokeWidth = DEFAULT_STROKE }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth}>
      <path d="M12 3v18M16 7c0-2-2-3-4-3s-4 1-4 3 2 3 4 3 4 1 4 3-2 3-4 3-4-1-4-3" />
    </svg>
  );
}

export function LockIcon({ size = DEFAULT_SIZE, color = DEFAULT_COLOR, strokeWidth = DEFAULT_STROKE }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth}>
      <rect x="4" y="10" width="16" height="10" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

export function PhoneIcon({ size = DEFAULT_SIZE, color = DEFAULT_COLOR, strokeWidth = DEFAULT_STROKE }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export function MapPinIcon({ size = DEFAULT_SIZE, color = DEFAULT_COLOR, strokeWidth = DEFAULT_STROKE }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth}>
      <path d="M21 10c0 6-9 13-9 13S3 16 3 10a9 9 0 1 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function CreditCardIcon({ size = DEFAULT_SIZE, color = DEFAULT_COLOR, strokeWidth = DEFAULT_STROKE }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth}>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
    </svg>
  );
}

export function PlusIcon({ size = DEFAULT_SIZE, color = DEFAULT_COLOR, strokeWidth = DEFAULT_STROKE }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function LogoutIcon({ size = DEFAULT_SIZE, color = DEFAULT_COLOR, strokeWidth = DEFAULT_STROKE }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="M16 17l5-5-5-5" />
      <path d="M21 12H9" />
    </svg>
  );
}
