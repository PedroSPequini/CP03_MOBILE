import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  Image, Alert, ActivityIndicator, StyleSheet, KeyboardAvoidingView, Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useUser } from '../context/UserContext';
import { colors, shared } from '../theme';

export default function CadastroScreen({ navigation }) {
  const { userData, updateUserData } = useUser();
  const [form, setForm] = useState({ ...userData });
  const [loadingCep, setLoadingCep] = useState(false);
  const [saving, setSaving] = useState(false);

  const set = (key) => (value) => setForm((prev) => ({ ...prev, [key]: value }));

  // ── API ViaCEP ─────────────────────────────────────────────────────────────
  async function buscarCep() {
    const cep = form.cep.replace(/\D/g, '');
    if (cep.length !== 8) {
      Alert.alert('CEP Inválido', 'Digite um CEP com 8 dígitos.');
      return;
    }
    setLoadingCep(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (!response.ok) throw new Error('Falha na conexão com a API.');
      const data = await response.json();
      if (data.erro) throw new Error('CEP não encontrado.');
      setForm((prev) => ({
        ...prev,
        logradouro: data.logradouro || '',
        bairro: data.bairro || '',
        cidade: data.localidade || '',
        uf: data.uf || '',
      }));
      Alert.alert('✓ Sucesso', 'Endereço preenchido automaticamente via ViaCEP!');
    } catch (error) {
      Alert.alert('Erro na API', error.message || 'Não foi possível buscar o CEP.');
    } finally {
      setLoadingCep(false);
    }
  }

  // ── Câmera ─────────────────────────────────────────────────────────────────
  async function abrirCamera() {
    // Solicita permissão de câmera
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permissão Negada',
        'É necessário permitir o acesso à câmera nas configurações do dispositivo.',
        [{ text: 'OK' }]
      );
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setForm((prev) => ({ ...prev, foto: result.assets[0].uri }));
        Alert.alert('✓ Foto capturada!', 'A foto foi definida como seu avatar.');
      }
    } catch {
      Alert.alert('Erro', 'Não foi possível acessar a câmera.');
    }
  }

  // ── Salvar no Context ──────────────────────────────────────────────────────
  function salvar() {
    if (!form.nome.trim() || !form.rm.trim()) {
      Alert.alert('Campos obrigatórios', 'Preencha Nome e RM para continuar.');
      return;
    }
    setSaving(true);
    setTimeout(() => {
      updateUserData(form);
      setSaving(false);
      Alert.alert('✓ Salvo!', 'Dados armazenados no Context API.', [
        { text: 'Ver Perfil', onPress: () => navigation.navigate('Perfil') },
      ]);
    }, 600);
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.bg }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Header */}
      <View style={shared.header}>
        <View style={[shared.accentBar, { backgroundColor: colors.accent }]} />
        <View>
          <Text style={shared.headerTitle}>Cadastro</Text>
          <Text style={shared.headerSub}>Perfil Acadêmico</Text>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[shared.body, { paddingBottom: 40 }]}
        keyboardShouldPersistTaps="handled"
      >
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={shared.avatar}>
            {form.foto ? (
              <Image source={{ uri: form.foto }} style={styles.avatarImg} />
            ) : (
              <Text style={styles.avatarPlaceholder}>👤</Text>
            )}
          </View>
          <TouchableOpacity style={[shared.btn, shared.btnOutline, styles.cameraBtn]} onPress={abrirCamera}>
            <Text style={shared.btnOutlineText}>📷  Tirar Foto</Text>
          </TouchableOpacity>
        </View>

        {/* Dados Pessoais */}
        <View style={shared.card}>
          <Text style={[shared.label, { marginBottom: 12 }]}>📋  Dados Pessoais</Text>

          <View style={shared.group}>
            <Text style={shared.label}>Nome Completo *</Text>
            <TextInput
              style={shared.input}
              value={form.nome}
              onChangeText={set('nome')}
              placeholder="Digite seu nome completo"
              placeholderTextColor={colors.muted}
            />
          </View>

          <View style={shared.row}>
            <View style={[shared.group, { flex: 1 }]}>
              <Text style={shared.label}>RM *</Text>
              <TextInput
                style={shared.input}
                value={form.rm}
                onChangeText={set('rm')}
                placeholder="RM12345"
                placeholderTextColor={colors.muted}
              />
            </View>
            <View style={[shared.group, { flex: 1 }]}>
              <Text style={shared.label}>Telefone</Text>
              <TextInput
                style={shared.input}
                value={form.telefone}
                onChangeText={set('telefone')}
                placeholder="(11) 99999-9999"
                placeholderTextColor={colors.muted}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <View style={shared.group}>
            <Text style={shared.label}>E-mail</Text>
            <TextInput
              style={shared.input}
              value={form.email}
              onChangeText={set('email')}
              placeholder="aluno@fiap.com.br"
              placeholderTextColor={colors.muted}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* Endereço com API */}
        <View style={shared.card}>
          <Text style={[shared.label, { marginBottom: 12 }]}>📍  Endereço via API ViaCEP</Text>

          <View style={[shared.row, { alignItems: 'flex-end', marginBottom: 12 }]}>
            <View style={{ flex: 1 }}>
              <Text style={shared.label}>CEP</Text>
              <TextInput
                style={shared.input}
                value={form.cep}
                onChangeText={set('cep')}
                placeholder="00000-000"
                placeholderTextColor={colors.muted}
                keyboardType="numeric"
                maxLength={9}
              />
            </View>
            <TouchableOpacity
              style={[shared.btn, styles.cepBtn, loadingCep && { opacity: 0.6 }]}
              onPress={buscarCep}
              disabled={loadingCep}
            >
              {loadingCep
                ? <ActivityIndicator color="#fff" size="small" />
                : <Text style={shared.btnText}>Buscar</Text>
              }
            </TouchableOpacity>
          </View>

          {loadingCep && (
            <Text style={styles.loadingText}>⏳ Consultando API ViaCEP...</Text>
          )}

          <View style={shared.row}>
            <View style={[shared.group, { flex: 2 }]}>
              <Text style={shared.label}>Logradouro</Text>
              <TextInput style={shared.input} value={form.logradouro} onChangeText={set('logradouro')} placeholder="Rua..." placeholderTextColor={colors.muted} />
            </View>
            <View style={[shared.group, { flex: 1 }]}>
              <Text style={shared.label}>Bairro</Text>
              <TextInput style={shared.input} value={form.bairro} onChangeText={set('bairro')} placeholder="Bairro" placeholderTextColor={colors.muted} />
            </View>
          </View>

          <View style={shared.row}>
            <View style={[shared.group, { flex: 2 }]}>
              <Text style={shared.label}>Cidade</Text>
              <TextInput style={shared.input} value={form.cidade} onChangeText={set('cidade')} placeholder="Cidade" placeholderTextColor={colors.muted} />
            </View>
            <View style={[shared.group, { flex: 1 }]}>
              <Text style={shared.label}>UF</Text>
              <TextInput style={shared.input} value={form.uf} onChangeText={set('uf')} placeholder="SP" placeholderTextColor={colors.muted} maxLength={2} autoCapitalize="characters" />
            </View>
          </View>
        </View>

        {/* Salvar */}
        <TouchableOpacity
          style={[shared.btn, saving && { opacity: 0.7 }]}
          onPress={salvar}
          disabled={saving}
        >
          {saving
            ? <ActivityIndicator color="#fff" />
            : <Text style={shared.btnText}>✔  Salvar e Ver Perfil</Text>
          }
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  avatarSection: {
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  avatarPlaceholder: {
    fontSize: 36,
  },
  cameraBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 'auto',
  },
  cepBtn: {
    marginLeft: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: 'auto',
    marginBottom: 14,
  },
  loadingText: {
    color: colors.muted,
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 8,
  },
});
