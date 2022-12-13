# Aplikacja do zarzadzania lista projektow i zadan do wykonania

## Skorzystano z
- JavaScript
- CSS
- Webpack
- Firebase

## Dzialanie programu
- W panelu logowania uzytkownik loguje sie lub zaklada nowe konto. 
- Aby dodac nowy projekt nalezy kliknac ikone `+` i podac nazwe.
- Aby dodac nowe zadanie do wybranego projektu nalezy kliknac ikone `Add Item` i wypelnic wszystkie pola.
- Wybrane projekty i zadania mozna usuwac klikajac ikone `kosza na smieci`.
- Aby edytowac wybrane zadanie nalezy kliknac ikone `olowka`. Inputy zostana wypelnione istniejacymi danymi. Wprowadzone zmiany nalezy zatwierdzic przyciskiem `Update`.
- Aby wyswietlic dokladne dane wybranego zadania nalezy na niego kliknac.
- Aby oznaczyc zadanie jako wykonane mozna kliknac w checkbox. Widoczna zawartosc zadania zostanie przekreslona.
- Wszystkie wykonane zadania mozna usunac przyciskiem `Clear Checked`.
- Aby wyjsc z okien dodawania lub edycji nalezy kliknac poza obszar okna. 

## Autentykacja i baza danych
- Firebase Authentication
- Firebase Cloud Firestore

## Webpack
- Instalacja webpack i project dependencies: `npm install`
- Budowa plikow projektowych w trybie deweloperskim: `npm run build`
- Uruchamienie projektu na webpack live server: `npm start`
