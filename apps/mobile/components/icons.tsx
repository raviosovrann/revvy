import { Text } from 'react-native';
import { colors } from '@/constants/theme';

export type IconProps = {
  size?: number;
  color?: string;
  strokeWidth?: number;
};

const DEFAULT_SIZE = 22;
const DEFAULT_COLOR = colors.text;

function Icon({ size = DEFAULT_SIZE, color = DEFAULT_COLOR, children }: IconProps & { children: string }) {
  return (
    <Text style={{ fontSize: size, color, lineHeight: size * 1.1 }}>
      {children}
    </Text>
  );
}

export function HomeIcon(props: IconProps) {
  return <Icon {...props}>🏠</Icon>;
}

export function CalendarIcon(props: IconProps) {
  return <Icon {...props}>📅</Icon>;
}

export function CarIcon(props: IconProps) {
  return <Icon {...props}>🚗</Icon>;
}

export function UserIcon(props: IconProps) {
  return <Icon {...props}>👤</Icon>;
}

export function GridIcon(props: IconProps) {
  return <Icon {...props}>⊞</Icon>;
}

export function DashboardIcon(props: IconProps) {
  return <Icon {...props}>📊</Icon>;
}

export function PeopleIcon(props: IconProps) {
  return <Icon {...props}>👥</Icon>;
}

export function WrenchIcon(props: IconProps) {
  return <Icon {...props}>🔧</Icon>;
}

export function BellIcon(props: IconProps) {
  return <Icon {...props}>🔔</Icon>;
}

export function MenuIcon(props: IconProps) {
  return <Icon {...props}>☰</Icon>;
}

export function ListIcon(props: IconProps) {
  return <Icon {...props}>☰</Icon>;
}

export function GearIcon(props: IconProps) {
  return <Icon {...props}>⚙️</Icon>;
}

export function SearchIcon(props: IconProps) {
  return <Icon {...props}>🔍</Icon>;
}

export function ChevronRightIcon(props: IconProps) {
  return <Icon {...props}>›</Icon>;
}

export function ChevronLeftIcon(props: IconProps) {
  return <Icon {...props}>‹</Icon>;
}

export function CheckIcon(props: IconProps) {
  return <Icon {...props}>✓</Icon>;
}

export function CameraIcon(props: IconProps) {
  return <Icon {...props}>📷</Icon>;
}

export function DollarIcon(props: IconProps) {
  return <Icon {...props}>$</Icon>;
}

export function LockIcon(props: IconProps) {
  return <Icon {...props}>🔒</Icon>;
}

export function PhoneIcon(props: IconProps) {
  return <Icon {...props}>📞</Icon>;
}

export function MapPinIcon(props: IconProps) {
  return <Icon {...props}>📍</Icon>;
}

export function CreditCardIcon(props: IconProps) {
  return <Icon {...props}>💳</Icon>;
}

export function PlusIcon(props: IconProps) {
  return <Icon {...props}>+</Icon>;
}

export function LogoutIcon(props: IconProps) {
  return <Icon {...props}>🚪</Icon>;
}
