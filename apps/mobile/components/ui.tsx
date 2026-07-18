import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, spacing, typography, radius } from '@/constants/theme';

export function Button({
  title,
  onPress,
  variant = 'primary',
  style,
  textStyle,
  disabled,
}: {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}) {
  const variantStyles = {
    primary: { backgroundColor: colors.accent },
    secondary: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.accent },
    ghost: { backgroundColor: 'transparent' },
    danger: { backgroundColor: colors.error },
  };

  const textColors = {
    primary: colors.text,
    secondary: colors.accent,
    ghost: colors.text,
    danger: colors.text,
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={[styles.button, variantStyles[variant], style, disabled && { opacity: 0.5 }]}
    >
      <Text style={[styles.buttonText, { color: textColors[variant] }, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

export function Tag({
  label,
  variant = 'neutral',
  style,
}: {
  label: string;
  variant?: 'neutral' | 'accent' | 'outline' | 'accent-2';
  style?: ViewStyle;
}) {
  const variantStyles = {
    neutral: { backgroundColor: colors.surfaceLight, color: colors.text },
    accent: { backgroundColor: colors.secondary, color: colors.text },
    'accent-2': { backgroundColor: 'rgba(139, 92, 246, 0.2)', color: colors.secondaryLight },
    outline: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.divider, color: colors.text },
  };

  return (
    <View style={[styles.tag, variantStyles[variant], style]}>
      <Text style={[styles.tagText, { color: variantStyles[variant].color }]}>{label}</Text>
    </View>
  );
}

export function Input(props: TextInputProps & { containerStyle?: ViewStyle }) {
  return (
    <View style={[{ position: 'relative' }, props.containerStyle]}>
      <TextInput
        {...props}
        placeholderTextColor={props.placeholderTextColor || colors.textMuted}
        style={[styles.input, props.style]}
      />
    </View>
  );
}

export function Card({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function SectionTitle({ title }: { title: string }) {
  return (
    <Text style={styles.sectionTitle}>{title}</Text>
  );
}

export function Divider({ style }: { style?: ViewStyle }) {
  return <View style={[styles.divider, style]} />;
}

export function EmptyState({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View style={styles.emptyState}>
      <Text style={styles.emptyTitle}>{title}</Text>
      {subtitle && <Text style={styles.emptySubtitle}>{subtitle}</Text>}
    </View>
  );
}

export function IconButton({
  icon,
  onPress,
  style,
}: {
  icon: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
}) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={[styles.iconButton, style]}>
      {icon}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: spacing.md + 2,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: typography.heading.fontFamily,
    fontWeight: typography.heading.fontWeight,
    fontSize: typography.size.base,
  },
  tag: {
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.md,
    borderRadius: radius.sm,
  },
  tagText: {
    fontSize: typography.size.xs,
    fontWeight: '700',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
    fontSize: typography.size.base,
    color: colors.text,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.sm,
    padding: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.size.xs,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xxl,
  },
  emptyTitle: {
    fontSize: typography.size['3xl'],
    fontWeight: '800',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  emptySubtitle: {
    fontSize: typography.size.base,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  iconButton: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
