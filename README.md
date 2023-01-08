# APLIKACJA DO ZARZĄDZANIA LISTĄ PROJEKTÓW I ZADAŃ

## Skorzystano z
- JavaScript
- CSS
- Webpack
- Firebase

## Działanie programu
- W panelu logowania użytkownik loguje się podając e-mail i hasło lub zakłada nowe konto.
- Aby dodać nowy projekt należy kliknąć w ikonę ze znakiem `+` i podać jego nazwę.
- Aby dodać nowe zadanie do wybranego projektu należny kliknąć w przycisk `Add Item` i wypełnić wszystkie pola tj. tytuł i opis.
- Wybrane projekty i zadania można usuwać poprzez kliknięcie w ikonę `kosza`.
- Aby edytować wybrane zadanie należy kliknąć w ikonę `ołówka`. Inputy wyświetlonego okna zostaną wypełnione istniejącymi danymi. Wprowadzone zmiany należy zatwierdzić przyciskiem `Update`.
- Aby wyświetlić pełne dane wybranego zadania należy kliknąć w to zadanie.
- Aby oznaczyć zadanie jako wykonane należy kliknąć w input typu `checkbox`. Widoczna zawartość zadania zostanie przekreślona. Operację można cofnąć w identyczny sposób. 
- Wszystkie wykonane zadania można usunąć przyciskiem `Clear Checked`.
- Aby wyjść z okien dt. dodawania lub edycji należy kliknąć poza obszar okna.

## Autentykacja i baza danych
- Firebase Authentication
- Firebase Firestore Database

## Webpack
- Instalacja webpack i project dependencies: `npm install`
- Budowa plików projektowych w trybie deweloperskim: `npm run build`
- Uruchomienie projektu na webpack live server: `npm start`
