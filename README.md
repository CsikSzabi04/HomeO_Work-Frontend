# Teve Istálló App

![](https://github-production-user-asset-6210df.s3.amazonaws.com/68150404/546184931-c1b743c0-fee2-4c25-a08c-1f4823f307c5.png)

Egy egyszerű webalkalmazás tevék kezelésére, nyilvántartására. Az alkalmazás lehetővé teszi tevék hozzáadását, szerkesztését, törlését és listázását.

## 🚀 Funkciók

- **Tevék listázása** - Táblázatos nézet az összes teve adataival
- **Új teve hozzáadása** - Űrlap segítségével, validációval
- **Teve szerkesztése** - Meglévő tevék adatainak módosítása
- **Teve törlése** - Megerősítő dialógus ablakkal
- **Validáció** - Kötelező mezők ellenőrzése (név, púpok száma)
- **Reszponzív design** - Bootstrap 5 alapú, minden eszközön jól működik
- **Felhasználóbarát felület** - Intuitív kezelés, ikonok, visszajelzések

## Adatmodell

A teve entitás a következő mezőket tartalmazza:
- **Név** (kötelező, minimum 2 karakter)
- **Szín** (opcionális)
- **Utoljára etetve** (dátum és idő, opcionális)
- **Púpok száma** (kötelező, csak 1 vagy 2 lehet)

## Technológiai háttér

- **Angular** - Frontend keretrendszer
- **TypeScript** - Programozási nyelv
- **Bootstrap 5** - Stíluskeretrendszer
- **Angular Reactive Forms** - Űrlapkezelés
- **Font Awesome** - Ikonok

## Telepítés és futtatás

### Előfeltételek

- [Node.js](https://nodejs.org/) (v14 vagy újabb)
- [Angular CLI](https://angular.io/cli) (globálisan telepítve)
- Git

### Telepítés lépései

1. **Tároló klónozása**
   ```bash
   git clone <repository-url>
   cd teve-istallo-app
   npm install
   ng serve
   (buld: ng build --prod)
