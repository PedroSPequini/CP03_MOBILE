import React from 'react';
import {
  View, Text, ScrollView, Image, TouchableOpacity, StyleSheet,
} from 'react-native';
import { useUser } from '../context/UserContext';
import { colors, shared } from '../theme';

function InfoRow({ icon, label, value }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{icon}  {label}</Text>
      <Text style={styles.infoValue} numberOfLines={2}>{value || '—'}</Text>
    </View>
  );
}

export default function PerfilScreen({ navigation }) {
  const { userData } = useUser();

  if (!userData.nome) {
    return (
      <View style={[shared.screen, styles.emptyState]}>
        <Text style={styles.emptyIcon}>📭</Text>
        <Text style={styles.emptyText}>Nenhum dado cadastrado ainda.</Text>
        <TouchableOpacity style={[shared.btn, { marginTop: 16 }]} onPress={() => navigation.navigate('Cadastro')}>
          <Text style={shared.btnText}>Ir para Cadastro</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const initials = userData.nome
    .split(' ')
    .slice(0, 2)
    .map((n) => n.charAt(0).toUpperCase())
    .join('');

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      {/* Header */}
      <View style={shared.header}>
        <View style={[shared.accentBar, { backgroundColor: colors.accentLight }]} />
        <View>
          <Text style={shared.headerTitle}>Visualização</Text>
          <Text style={shared.headerSub}>Perfil do Aluno</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={[shared.body, { paddingBottom: 40 }]}>

        {/* Hero card */}
        <View style={styles.heroCard}>
          <View style={[shared.avatar, { alignSelf: 'center', marginBottom: 12 }]}>
            {userData.foto
              ? <Image source={{ uri: userData.foto }} style={styles.avatarImg} />
              : <Text style={styles.initials}>{initials || '👤'}</Text>
            }
          </View>
          <Text style={styles.heroName}>{userData.nome}</Text>
          <View style={styles.badges}>
            {userData.rm ? (
              <View style={shared.badge}><Text style={shared.badgeText}>RM: {userData.rm}</Text></View>
            ) : null}
            {userData.uf ? (
              <View style={styles.badgeGreen}><Text style={styles.badgeGreenText}>{userData.uf}</Text></View>
            ) : null}
          </View>
        </View>

        {/* Contato */}
        <View style={shared.card}>
          <Text style={[shared.label, { marginBottom: 12 }]}>📬  Contato</Text>
          <InfoRow icon="✉" label="E-mail" value={userData.email} />
          <InfoRow icon="📞" label="Telefone" value={userData.telefone} />
        </View>

        {/* Endereço */}
        <View style={shared.card}>
          <Text style={[shared.label, { marginBottom: 12 }]}>📍  Endereço</Text>
          <InfoRow icon="🏘" label="CEP" value={userData.cep} />
          <InfoRow icon="🛣" label="Logradouro" value={userData.logradouro} />
          <InfoRow icon="🏙" label="Bairro" value={userData.bairro} />
          <InfoRow icon="🌆" label="Cidade" value={userData.cidade ? `${userData.cidade} - ${userData.uf}` : ''} />
        </View>

        {/* Context tag */}
        <View style={styles.contextTag}>
          <Text style={styles.contextTagText}>⚡ Dados compartilhados via Context API</Text>
        </View>

        <TouchableOpacity
          style={[shared.btn, shared.btnOutline, { marginTop: 8 }]}
          onPress={() => navigation.navigate('Cadastro')}
        >
          <Text style={shared.btnOutlineText}>✏  Editar Cadastro</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyText: { color: colors.muted, fontSize: 15, textAlign: 'center' },
  heroCard: {
    backgroundColor: '#16213e',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(108,99,255,0.3)',
    marginBottom: 12,
  },
  avatarImg: { width: '100%', height: '100%', resizeMode: 'cover' },
  initials: { fontSize: 30, fontWeight: '700', color: colors.accentLight },
  heroName: { fontSize: 20, fontWeight: '700', color: colors.text, marginBottom: 8, textAlign: 'center' },
  badges: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', justifyContent: 'center' },
  badgeGreen: {
    backgroundColor: 'rgba(74,222,128,0.15)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeGreenText: { color: colors.success, fontSize: 11, fontWeight: '700' },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  infoLabel: { fontSize: 13, color: colors.muted, flex: 1 },
  infoValue: { fontSize: 14, fontWeight: '500', color: colors.text, flex: 1, textAlign: 'right' },
  contextTag: {
    alignItems: 'center',
    marginVertical: 12,
  },
  contextTagText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.accentLight,
    backgroundColor: colors.accentDim,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});
