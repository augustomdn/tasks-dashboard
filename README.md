# TasksDB

#### Aplicação voltada para criação de uma lista de tarefas, possibilitando uma maior autonomia das atividades do usuário no dia a dia.

![Tela principal da aplicação](https://i.imgur.com/Uz9rc8v.jpeg)

#### Este projeto foi criado como uma resolução de um teste técnico solicitado pela SGA (Software Gaming Architects).

- [Funcionalidades](#funcionalidades)
- [Instalação](#instalação)
- [Tecnologias](#tecnologias)
- [Licença](#licença)

![Tela de tarefas da aplicação](https://i.imgur.com/j8E40Kc.jpeg)


### ✨ Funcionalidades
- Login, é possível efetuar login com as credencias solicitadas pelo avaliador [Login: admin] [Senha: password].
- Dentro da plataforma é possível:
  - Criar tarefas, cada tarefa tem um Título (obrigatório), Descrição, Prioridade e Status.
  - Editar tarefas
  - Excluir tarefas
  - Efetuar filtragens por:
    - Títulos
    - Descrições
    - Prioridades
    - Status
    - Data de criação
    (Pensei em por um regex no input de busca para evitar que o usuário não conseguisse achar as tarefas caso digitasse caracteres especiais, mas resolvi poupar tempo para entregar o MVP).

Obs: Na aplição existe persistência (Todos os dados ficam salvos no localStorage)

### Melhorias

- Criei um TaskContext para gerenciar o estado global das tarefas dentro da aplicação.
- Foi feito um hook personalizado para as Tasks onde é efetuado as operações de CRUD: Optei por esta abordagem para centralizar toda a lógica
- Guardas na rota:
  - Ao tentar acessar alguma rota sem ser autênticado o usuário é redirecionado para uma página 404
- Logs de Atividade
    - Log ao efetuar login
    - Log ao efetuar logoff
    - Log ao inserir credenciais erradas no formulário
    - Log ao criar, editar e deletar tarefas.
- Criação de Tags personalizadas:
    - É oferecido ao usuário a possibilidade de adicionar tags extras aos cards, com cores personalizadas.


### ⚙️ Instalação & Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### 🔄 Passos
1. Clone o repositório
   ```bash
   git clone [https://github.com/seu-usuario/seu-repo.git](https://github.com/augustomdn/tasks-dashboard.git)
   cd seu-repo
   ```

2. Rode o projeto
   ```bash
    npm run dev
    ####or
    yarn dev
   ```

3. Abra no navegador
   ```bash
    Open [http://localhost:3000](http://localhost:3000) no seu navegador.

### 🛠 Tecnologias utilizadas
- [Next.js](https://nextjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [ShadcnUI](https://ui.shadcn.com/)
- [TailwindCSS](https://tailwindcss.com/)

### 📄 Licença
- [Licença](https://choosealicense.com/licenses/mit/)

