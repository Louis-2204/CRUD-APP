# Ma Bibliothèque - Application CRUD

Application de gestion de bibliothèque construite avec **Next.js 16**, **Prisma**, **TypeScript** et **Tailwind CSS**.

## Fonctionnalités

- **Créer** un nouveau livre
- **Lire** la liste des livres
- **Modifier** un livre existant
- **Supprimer** un livre

## Architecture

### Structure du projet
```
app/
├── actions/
│   └── bookActions.ts      # Server Actions (create, update, delete)
├── components/
│   ├── BookForm.tsx         # Formulaire (Client Component)
│   └── BookList.tsx         # Liste des livres (Client Component)
├── data/
│   └── bookData.ts          # Récupération des données (SSR)
└── page.tsx                 # Page principale
```

### Technologies utilisées
- **Next.js 16** (App Router)
- **Prisma** (ORM)
- **TypeScript**
- **Tailwind CSS v4**
- **PostgreSQL** (via Prisma Postgres)

## Modèle de données

```prisma
model Book {
  id          String   @id @default(cuid())
  title       String
  author      String
  isbn        String?  @unique
  year        Int?
  genre       String?
  rating      Float?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## Installation et démarrage

### 1. Installer les dépendances
```bash
npm install
```

### 2. Créer et configurer le fichier `.env` à la racine du projet
```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```

### 3. Générer le client Prisma et créer la base de données
```bash
npx prisma generate
npx prisma db push
```

### 4. Lancer l'application en mode développement
```bash
npm run dev
```