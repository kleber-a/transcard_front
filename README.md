# 🚌 Transcard - Frontend (Resumo)

## 🔹 Objetivo
Criar o frontend do sistema **Transcard**, responsável por gerenciar usuários e cartões de transporte, consumindo a API do backend e aplicando boas práticas de desenvolvimento web responsivo.

---

# Repositório principal [Transcard](https://github.com/kleber-a/transcard.git)





https://github.com/user-attachments/assets/fb4e6da6-989a-41f1-9442-caaf1042a349




## 🔹 Tecnologias Utilizadas
- **Angular 19**  
- **TailwindCSS** para design responsivo  
- Comunicação com backend via **HTTP Services / RxJS**  
- Proteção de rotas com **AuthGuard**  
- Interceptação de requisições com **AuthInterceptor** (para adicionar token JWT)  
- Gerenciamento de autenticação e sessão via **AuthService**  
- Componentização para reutilização e manutenção do código  
- **Testes unitários** 
- Build e execução com **Angular CLI**

---



## 🔹 Funcionalidades Implementadas
- Listar, criar, editar e deletar usuários (consumindo API do backend)  
- Listar, adicionar, ativar/inativar e remover cartões de transporte  
- Diferenciação de acesso por perfil (admin x usuário comum)  
- Design responsivo, acessível em diferentes dispositivos  

---

## 🔹 Boas Práticas Aplicadas
- Separação clara de responsabilidades (**modularidade**)  
- Reutilização de components sempre que possível  
- Centralização das chamadas à API via **services**  
- Estrutura de dados tipada com **interfaces / models**  

---

## Como Rodar Localmente

##### Front-End
1. Entre no diretório do frontend:

```bash 
cd ../frontend
```
2. Instale dependências:
```bash 
npm install
```

3. Configure a URL base da API (no environment):
```bash
export const environment = {
  apiUrl: 'http://localhost:8080'
};
```

4. Execute:
```bash
ng serve
```
