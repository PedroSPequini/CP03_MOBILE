import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { colors, shared } from '../theme';

const DEVS = [
  {
    nome: 'Pedro Santos Pequini',
    rm: 'RM561842',
    emoji: '👨‍💻',
    cor: '#6c63ff',
    curso: 'Análise e Desenvolvimento de Sistemas',
    foto: null,
  },
];

function DevCard({ dev }) {
  return (
    <View style={[shared.card, styles.devCard]}>
      {/* Avatar */}
      <View style={[styles.devAvatar, { borderColor: dev.cor + '66', backgroundColor: dev.cor + '22' }]}>
        {dev.foto
          ? <Image source={dev.foto} style={styles.devAvatarImg} />
          : <Text style={styles.devEmoji}>{dev.emoji}</Text>
        }
      </View>
      {/* Info */}
      <View style={styles.devInfo}>
        <Text style={styles.devNome}>{dev.nome}</Text>
        <View style={[styles.rmBadge, { backgroundColor: dev.cor + '22' }]}>
          <Text style={[styles.rmText, { color: dev.cor }]}>{dev.rm}</Text>
        </View>
        <Text style={styles.devCurso}>{dev.curso}</Text>
      </View>
    </View>
  );
}

export default function DevsScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      {/* Header */}
      <View style={shared.header}>
        <View style={[shared.accentBar, { backgroundColor: colors.warning }]} />
        <View>
          <Text style={shared.headerTitle}>Dev Team</Text>
          <Text style={shared.headerSub}>Integrantes da Equipe</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={[shared.body, { paddingBottom: 40 }]}>
        {/* Chips de info */}
        <View style={styles.chipsRow}>
          <View style={[styles.chip, { backgroundColor: 'rgba(251,191,36,0.12)' }]}>
            <Text style={[styles.chipText, { color: colors.warning }]}>CP3 — FIAP Mobile</Text>
          </View>
          <View style={shared.badge}>
            <Text style={shared.badgeText}>{DEVS.length} integrantes</Text>
          </View>
        </View>

        {/* Cards dos devs */}
        {DEVS.map((dev) => <DevCard key={dev.rm} dev={dev} />)}

        {/* Sobre o projeto */}
        <View style={[shared.card, styles.aboutCard]}>
          <Text style={[shared.label, { marginBottom: 8 }]}>ℹ  Sobre o Projeto</Text>
          <Text style={styles.aboutText}>
            App desenvolvido para o Checkpoint 03 de Mobile (FIAP).
            Implementa Context API para gerenciamento global de estado,
            integração com API ViaCEP para preenchimento automático de endereço,
            funcionalidade de câmera para foto de perfil, e navegação entre 3 telas.
          </Text>
          <View style={styles.tagsRow}>
            {['Context API', 'ViaCEP', 'Câmera', 'React Navigation'].map((tag) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  chipsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6,
  },
  chipText: { fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },
  devCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
  },
  devAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    overflow: 'hidden',
  },
  devAvatarImg: { width: '100%', height: '100%', resizeMode: 'cover' },
  devEmoji: { fontSize: 28 },
  devInfo: { flex: 1 },
  devNome: { fontSize: 15, fontWeight: '700', color: colors.text, marginBottom: 4 },
  rmBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  rmText: { fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },
  devCurso: { fontSize: 12, color: colors.muted },
  aboutCard: {
    backgroundColor: colors.accentDim,
    borderColor: 'rgba(108,99,255,0.3)',
    marginTop: 4,
  },
  aboutText: {
    fontSize: 13,
    color: colors.muted,
    lineHeight: 20,
    marginBottom: 12,
  },
  tagsRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  tag: {
    backgroundColor: colors.accentDim,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.accentLight,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});
