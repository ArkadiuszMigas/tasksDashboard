# Tasks Dashboard

**Task Dashboard** to nowoczesna aplikacja webowa stworzona przy użyciu React i dnd-kit, służąca do zarządzania zadaniami. Aplikacja umożliwia tworzenie, edycję, przeciąganie oraz usuwanie zadań, a także wyświetlanie statystyk w formie wykresów. Wykorzystuje Firebase do uwierzytelniania przez Google oraz zapisu danych w Firestore, przy czym dla niezalogowanych użytkowników dane przechowywane są lokalnie (localStorage).

---

## 📱 Funkcjonalności

### 🔐 Uwierzytelnianie
- Logowanie i wylogowanie za pomocą Google (Firebase Auth)
- Przechowywanie danych zalogowanego użytkownika w Firestore („Users” → `user.uid` → „tasks”)
- Fallback do localStorage dla niezalogowanych użytkowników

### 🗂️ Zarządzanie zadaniami
- Dodawanie nowych zadań z możliwością edycji tytułu
- Przeciąganie zadań między kolumnami (To Do, In Progress, Done)
- Usuwanie zadań – zabezpieczenie przed przypadkowym przeciąganiem

### 🖱️ Drag & Drop
- Wykorzystanie biblioteki dnd-kit do intuicyjnego przeciągania zadań
- Podświetlanie kolumny, gdy zadanie jest nad jej obszarem
- DragOverlay zapewniający lepszy podgląd przeciąganego elementu

### 📊 Statystyki
- Wyświetlanie wykresów (Recharts) z podziałem na liczbę zadań w poszczególnych statusach

### 🎨 Personalizacja wyglądu
- Nowoczesny ciemny motyw z odcieniami złota, żółtego i pomarańczowego
- Niestandardowe style oparte na Tailwind CSS, zdefiniowane w `index.css`

---

## 🚀 Jak uruchomić projekt

### Sklonuj repozytorium:
```bash
git clone git@github.com:ArkadiuszMigas/tasksDashboard.git
cd task-dashboard
```

### Instalacja i Uruchomienie

### Zainstaluj zależności

Jeśli korzystasz z **npm**:

```bash
npm install
```

lub z yarn:

```bash
yarn install
```

### Skonfiguruj Firebase
- Utwórz projekt w Firebase i pobierz dane konfiguracyjne.
- Skonfiguruj plik src/lib/firebase.js (lub firebaseConfig.js) z danymi Firebase.
- Upewnij się, że masz odpowiednie reguły bezpieczeństwa dla Firestore.

### Uruchom aplikację
Dla npm:

```bash
npm start
```

lub dla yarn:

```bash
yarn start
```

## 🔧 Technologie
- React – biblioteka do tworzenia interfejsu użytkownika

- dnd-kit – nowoczesna biblioteka drag & drop

- Firebase Auth & Firestore – uwierzytelnianie i zapis danych

- zustand – lekki menedżer stanu

- Tailwind CSS – framework do stylowania

- Recharts – wizualizacja statystyk

## 📌 Przyszłe funkcjonalności
- Rozbudowana edycja szczegółów zadania

- Synchronizacja danych w czasie rzeczywistym między użytkownikami

- Rozbudowane statystyki z możliwością filtrowania według kategorii

- Dodatkowa personalizacja interfejsu i motywów kolorystycznych

## 🧑‍💻 Autor
Projekt stworzony przez Arkadiusza Migas
