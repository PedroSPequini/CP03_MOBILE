# CP3-Mobile

Aplicativo mobile desenvolvido para o **Checkpoint 03** da disciplina de Mobile da FIAP.

**Aluno:** Pedro Santos Pequini  
**RM:** 561842  
**Turma:** Análise e Desenvolvimento de Sistemas

---

## 📱 Sobre o projeto

O objetivo do app é evoluir o projeto anterior integrando gerenciamento de dados global via **Context API**, consumo de serviço externo (**API ViaCEP**) e uso de hardware (**câmera**).

O app possui 3 telas:
- **Cadastro** — formulário com preenchimento automático de endereço via CEP e captura de foto pelo celular
- **Perfil** — visualização dos dados cadastrados, compartilhados via Context API
- **Dev** — informações do desenvolvedor (nome, RM e foto)

---

## 🛠️ Tecnologias utilizadas

- React Native + Expo
- Context API (gerenciamento global de estado)
- React Navigation (Bottom Tabs)
- expo-image-picker (câmera)
- API ViaCEP (preenchimento de endereço)

---

## ✅ Requisitos implementados

| Critério | Implementação | Pontos |
|---|---|---|
| **Context API** | `UserContext.js` com Provider envolvendo toda a aplicação | 2,5 |
| **Consumo de API** | `fetch` na ViaCEP com `try/catch`, preenchimento automático do endereço | 2,0 |
| **Câmera** | `expo-image-picker` com solicitação de permissão e captura de foto de perfil | 2,0 |
| **Tela de Dev** | Exibe nome, RM e foto do desenvolvedor | 1,5 |
| **Navegação** | Bottom Tab Navigator entre Cadastro, Perfil e Dev | 1,0 |
| **Tratamento de Erros** | Alertas para CEP inválido, câmera negada e campos obrigatórios | 1,0 |
| **Total** | | **10,0** |

---

## 📂 Estrutura do projeto

```
CP3-Mobile/
├── App.js                       # Raiz: UserProvider + Navegação
├── app.json                     # Config Expo (permissões de câmera)
├── src/
│   ├── context/
│   │   └── UserContext.js       # Context API — estado global compartilhado
│   ├── screens/
│   │   ├── CadastroScreen.js    # Formulário + busca CEP + câmera
│   │   ├── PerfilScreen.js      # Visualização dos dados do Context
│   │   └── DevsScreen.js        # Tela do desenvolvedor
│   └── theme.js                 # Cores e estilos globais
└── assets/
```

---

## 🚀 Como rodar

**Pré-requisitos:** Node.js instalado + app Expo Go no celular

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar
npx expo start

# 3. Escanear o QR Code com o Expo Go (Android) ou câmera (iPhone)
```

---

## 💡 Exemplo de fluxo

1. Abre o app na **Tela de Cadastro**
2. Digita o CEP → endereço é preenchido automaticamente via **API ViaCEP**
3. Clica em "Tirar Foto" → câmera abre e a foto vira o avatar
4. Salva → dados vão para o **Context API**
5. Na **Tela de Perfil**, os dados aparecem formatados
6. Na **Tela de Dev**, aparecem as informações do desenvolvedor
