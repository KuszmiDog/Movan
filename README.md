# Movan 🚚

**Aplicación de transporte y logística para conectar clientes con transportistas privados**

## 📱 Descripción

Movan es una aplicación móvil desarrollada en React Native con Expo que conecta a usuarios particulares que necesitan servicios de transporte con transportistas privados. La aplicación facilita la creación, gestión y seguimiento de pedidos de transporte de manera eficiente y segura.

## ✨ Características Principales

### Para Usuarios Particulares:
- 📦 **Crear solicitudes de transporte** con origen y destino
- 📍 **Integración con Google Places** para selección de direcciones
- 💰 **Establecer precio** y prioridad del pedido
- 🔍 **Seguimiento en tiempo real** del estado del pedido
- ⭐ **Sistema de calificaciones** para transportistas

### Para Transportistas Privados:
- 🪙 **Sistema de créditos/tokens** exclusivo (1 crédito = 1 pedido)
- 👀 **Visualizar pedidos disponibles** en tiempo real
- ✅ **Aceptar pedidos** usando créditos
- 🗺️ **Navegación integrada** con Google Maps
- 📊 **Historial de créditos** y transacciones
- 💳 **Recarga de créditos** con múltiples paquetes
- 📈 **Estadísticas** de envíos y ganancias

### Características Generales:
- 🔐 **Sistema de autenticación** completo
- 👤 **Gestión de perfiles** con fotos
- 🎭 **Roles diferenciados** (Particular vs Transportista)
- 📱 **Interfaz responsiva** y moderna
- 🌍 **Mapas interactivos** con marcadores

## 🚀 Tecnologías Utilizadas

- **React Native** con Expo
- **TypeScript** para type safety
- **Expo Router** para navegación
- **Google Maps API** para mapas y navegación
- **Google Places API** para búsqueda de direcciones
- **AsyncStorage** para persistencia local
- **React Native Maps** para integración de mapas
- **Expo Image Picker** para manejo de imágenes

## 📋 Requisitos Previos

- Node.js (versión 18 o superior)
- npm o yarn
- Expo CLI
- Cuenta de Google Cloud Platform (para APIs de Maps y Places)
- Dispositivo Android/iOS o emulador para testing

## 🛠️ Instalación

1. **Clonar el repositorio:**
```bash
git clone <url-del-repositorio>
cd Movan
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Configurar variables de entorno:**
   - Crear archivo `app.json` con tu Google Maps API Key
   - Configurar las claves necesarias en `expo-constants`

4. **Ejecutar la aplicación:**
```bash
npm start
```

## 📖 Cómo Usar la Aplicación

### Primera vez:
1. **Registro:** Crea una cuenta con email y contraseña
2. **Selección de rol:** Elige entre "Usuario Particular" o "Transportista Privado"
3. **Completar perfil:** Agrega tu información personal

### Como Usuario Particular:
1. **Crear pedido:** Ve a "Inicio" y toca "Crear Nuevo Pedido"
2. **Completar detalles:** Agrega tipo de carga, peso, descripción y precio
3. **Seleccionar ubicaciones:** Elige origen y destino usando el buscador
4. **Publicar:** Tu pedido aparecerá disponible para transportistas

### Como Transportista:
1. **Verificar créditos:** Revisa tu contador de créditos en la pantalla principal
2. **Ver pedidos:** Explora los pedidos disponibles en tu área
3. **Aceptar pedido:** Usa 1 crédito para aceptar un pedido
4. **Navegar:** Sigue las indicaciones del mapa para recoger y entregar
5. **Recargar créditos:** Usa el botón "+" para comprar más créditos

## 🪙 Sistema de Créditos

- **Inicio:** Cada transportista nuevo recibe 5 créditos gratis
- **Costo:** 1 crédito por pedido aceptado
- **Paquetes disponibles:**
  - 5 créditos - $5.000
  - 10 créditos - $9.000 (Más Popular)
  - 20 créditos - $16.000
  - 50 créditos - $35.000

## 🗺️ Estructura del Proyecto

```
src/
├── app/                    # Pantallas principales (Expo Router)
│   ├── (auth)/            # Autenticación y onboarding
│   ├── (Menu)/            # Menú principal y pestañas
│   │   ├── (tabs)/        # Pestañas (Inicio, Buscar, Cuenta)
│   │   ├── (Ajustes)/     # Configuraciones
│   │   └── (Transportista)/ # Vistas exclusivas de transportistas
├── components/            # Componentes reutilizables
├── constants/            # Estilos y constantes
├── utils/               # Servicios y contextos
│   ├── AuthContext.tsx  # Manejo de autenticación
│   ├── CreditService.ts # Sistema de créditos
│   └── UserService.ts   # Gestión de usuarios
└── assets/             # Imágenes, iconos y recursos
```

## 🔧 Configuración de APIs

### Google Maps API:
1. Ir a Google Cloud Console
2. Habilitar "Maps SDK for Android/iOS" y "Places API"
3. Crear API Key y agregarlo a `app.json`
4. Configurar restricciones de API key

### Configuración del proyecto:
```json
{
  "expo": {
    "extra": {
      "GOOGLE_MAPS_API_KEY": "tu-api-key-aqui"
    }
  }
}
```

## 📱 Pantallas Principales

- **Autenticación:** Login, registro y onboarding
- **Inicio:** Dashboard principal diferenciado por rol
- **Buscar:** Mapa interactivo con navegación
- **Cuenta:** Perfil, configuraciones y estadísticas
- **Créditos:** Recarga y historial (solo transportistas)

## 🎯 Funcionalidades Futuras

- 💳 Integración con pasarelas de pago reales (MercadoPago, Stripe)
- 🔔 Notificaciones push
- 📊 Analytics avanzados
- 🚛 Tracking en tiempo real
- 💬 Chat entre usuario y transportista
- ⭐ Sistema de reseñas expandido

## 🤝 Contribuir

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 👨‍💻 Desarrollador

Desarrollado por mApache para revolucionar el transporte local.

---
