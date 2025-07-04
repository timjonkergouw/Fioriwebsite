# Fiori - Dynamische Productpagina

Een moderne kledingwebshop met een dynamische productpagina die productgegevens laadt vanuit een JSON-bestand.

## 🚀 Functionaliteiten

### Dynamische Productpagina
- **URL-gebaseerde product loading**: `product.html?id=1`
- **JSON-gebaseerde productgegevens**: Alle productinformatie wordt geladen vanuit `products.json`
- **Responsive design**: Werkt perfect op desktop, tablet en mobiel
- **Image gallery**: Hoofdafbeelding met thumbnails
- **Maatselectie**: S, M, L, XL opties
- **Winkelwagen integratie**: Volledige shopping cart functionaliteit

### Productgegevens Structuur
```json
{
  "id": 1,
  "name": "Bloem Shirt",
  "price": 40,
  "description": "Product beschrijving...",
  "category": "tshirt",
  "images": ["image1.png", "image2.png", "image3.png"],
  "details": {
    "material": "100% biologisch katoen",
    "fit": "Regular fit",
    "care": "Machine wasbaar op 30°C",
    "sustainability": "GOTS gecertificeerd"
  }
}
```

## 📁 Bestandsstructuur

```
Fiori/
├── index.html              # Hoofdpagina met carousel
├── product.html            # Dynamische productpagina
├── producten.html       # Productoverzicht
├── products.json           # Productgegevens
├── product-loader.js       # JavaScript voor product loading
├── cart.js                 # Winkelwagen functionaliteit
├── script.js               # Algemene JavaScript
├── styles.css              # Styling
└── images/                 # Productafbeeldingen
```

## 🔧 Hoe het werkt

### 1. URL Parameters
De productpagina gebruikt URL parameters om het juiste product te laden:
```
product.html?id=1  // Laadt Bloem Shirt
product.html?id=2  // Laadt AI Garden Shirt
product.html?id=3  // Laadt Fruit Shirt
```

### 2. Product Loading
- `ProductLoader` klasse laadt productgegevens uit `products.json`
- Product wordt gevonden op basis van ID uit URL
- Dynamische content wordt ingevuld (titel, prijs, beschrijving, afbeeldingen)

### 3. Error Handling
- Loading state tijdens het laden
- Error state als product niet gevonden wordt
- Fallback functionaliteit

## 🎨 Design Features

### Loading & Error States
- **Loading spinner**: Toont tijdens het laden van productgegevens
- **Error handling**: Duidelijke foutmeldingen met terugknop
- **Smooth transitions**: Vloeiende animaties tussen states

### Responsive Design
- **Desktop**: 2-koloms layout (afbeeldingen links, info rechts)
- **Tablet**: Aangepaste spacing en font sizes
- **Mobile**: 1-koloms layout met geoptimaliseerde touch targets

### Image Gallery
- **Hoofdafbeelding**: Grote productafbeelding
- **Thumbnails**: Klikbare kleine afbeeldingen
- **Hover effects**: Smooth transitions en scaling

## 🛒 Winkelwagen Integratie

### Features
- **Maatselectie**: Verplicht voordat product kan worden toegevoegd
- **LocalStorage**: Producten blijven bewaard na page refresh
- **Cart overlay**: Slide-in winkelwagen van rechts
- **Betalingsoverlay**: Creditcard formulier

### Product Toevoegen
```javascript
// Voorbeeld van product toevoegen
const product = {
    name: "Bloem Shirt",
    price: 40,
    size: "M",
    image: "images/Bloem shirt met vrouw model.png",
    id: Date.now()
};
cart.addItem(product);
```

## 📱 Responsive Breakpoints

- **Desktop**: > 900px - 2-koloms layout
- **Tablet**: 700px - 900px - Aangepaste spacing
- **Mobile**: < 700px - 1-koloms layout

## 🔄 Uitbreidbaarheid

### Nieuwe Producten Toevoegen
1. Voeg productgegevens toe aan `products.json`
2. Geef uniek ID
3. Voeg afbeeldingen toe aan `images/` folder
4. Update product links in `producten.html`

### Nieuwe Categorieën
1. Voeg categorie toe aan productgegevens
2. Update filter buttons in `producten.html`
3. Voeg CSS styling toe indien nodig

### Nieuwe Productdetails
1. Voeg veld toe aan `details` object in JSON
2. Update `formatDetailLabel()` functie in `product-loader.js`
3. CSS styling wordt automatisch toegepast

## 🚀 Gebruik

### Product Pagina Bezoeken
```
http://localhost/product.html?id=1
```

### Producten Toevoegen
1. Selecteer maat (S, M, L, XL)
2. Klik "Voeg toe aan winkelmand"
3. Product verschijnt in winkelwagen

### Winkelwagen Beheren
- Klik op winkelwagen icoon
- Bekijk producten en totaal
- Verwijder producten met × knop
- Ga naar betaling met "Afrekenen"

## 🛠️ Technische Details

### JavaScript Classes
- **ProductLoader**: Beheert product loading en display
- **ShoppingCart**: Winkelwagen functionaliteit
- **Error Handling**: Graceful error handling

### CSS Features
- **CSS Grid**: Voor responsive layouts
- **Flexbox**: Voor alignment en spacing
- **CSS Animations**: Smooth transitions
- **Media Queries**: Responsive breakpoints

### Performance
- **Lazy Loading**: Afbeeldingen laden alleen wanneer nodig
- **LocalStorage**: Snelle cart updates
- **Minimal DOM Manipulation**: Efficiënte updates

## 📝 Toekomstige Verbeteringen

- [ ] Product reviews en ratings
- [ ] Wishlist functionaliteit
- [ ] Product vergelijking
- [ ] Advanced filtering (prijs, kleur, etc.)
- [ ] Product recommendations
- [ ] SEO optimalisatie
- [ ] PWA functionaliteit 