import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { ScreenWrapper } from '@/components/screen-wrapper';
import { ScreenHeader } from '@/components/header';
import { Button } from '@/components/ui';
import { CameraIcon } from '@/components/icons';
import { colors, spacing, typography } from '@/constants/theme';
import { TECH_PHOTOS, TECH_NOTES } from '@/lib/mock-data';

export default function TechPhotosScreen() {
  return (
    <ScreenWrapper>
      <ScreenHeader title="Photos & notes" />

      <Text style={styles.sectionTitle}>Photos</Text>
      <View style={styles.photoGrid}>
        {TECH_PHOTOS.map((ph, idx) => (
          <View key={idx} style={styles.photoPlaceholder}>
            <CameraIcon size={26} color={colors.textMuted} />
            <Text style={styles.photoCaption}>{ph.cap}</Text>
          </View>
        ))}
        <TouchableOpacity style={styles.addPhoto} activeOpacity={0.8}>
          <CameraIcon size={24} color={colors.textMuted} />
          <Text style={styles.addPhotoText}>Add</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.sectionTitle, { marginTop: spacing.xl }]}>Notes</Text>
      <View style={styles.notesList}>
        {TECH_NOTES.map((n, idx) => (
          <View key={idx} style={styles.noteCard}>
            <View style={styles.noteHeader}>
              <Text style={styles.noteAuthor}>{n.author}</Text>
              <Text style={styles.noteWhen}>{n.when}</Text>
            </View>
            <Text style={styles.noteText}>{n.text}</Text>
          </View>
        ))}
      </View>

      <View style={styles.addNoteRow}>
        <TextInput style={styles.addNoteInput} placeholder="Add a note..." placeholderTextColor={colors.textMuted} />
        <Button title="Post" style={styles.postButton} />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: typography.size.xs,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  photoPlaceholder: {
    width: '31%',
    aspectRatio: 1,
    backgroundColor: colors.surfaceLight,
    justifyContent: 'flex-end',
    padding: 6,
    alignItems: 'center',
  },
  photoCaption: {
    fontSize: 9,
    color: colors.textMuted,
    fontWeight: '600',
    position: 'absolute',
    bottom: 6,
    left: 6,
  },
  addPhoto: {
    width: '31%',
    aspectRatio: 1,
    borderWidth: 2,
    borderColor: colors.textMuted,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  addPhotoText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.textMuted,
  },
  notesList: {
    flexDirection: 'column',
    gap: spacing.md,
  },
  noteCard: {
    backgroundColor: colors.surface,
    padding: spacing.md,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  noteAuthor: {
    fontFamily: typography.heading.fontFamily,
    fontWeight: typography.heading.fontWeight,
    fontSize: typography.size.xs,
    color: colors.text,
  },
  noteWhen: {
    fontSize: typography.size.xs,
    color: colors.textMuted,
  },
  noteText: {
    fontSize: typography.size.md,
    color: colors.text,
  },
  addNoteRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  addNoteInput: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: spacing.md,
    padding: spacing.md,
    color: colors.text,
    fontSize: typography.size.base,
  },
  postButton: {
    flex: 'none' as any,
  },
});
