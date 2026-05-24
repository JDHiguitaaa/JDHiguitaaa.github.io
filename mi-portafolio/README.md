# Portafolio Personal — Juan David Higuita

Portafolio web profesional con chat de IA integrado, construido con React + Vite y desplegado en Vercel.

**En vivo:** [jd-higuitaaa-github-io.vercel.app](https://jd-higuitaaa-github-io.vercel.app)

---

## ¿Qué es?

Sitio web personal que muestra mi perfil como desarrollador de software, mis proyectos y permite a reclutadores o empresas interesadas hacer preguntas directamente a un agente de IA entrenado con mi información profesional.

El chat responde en español e inglés sobre mi experiencia, proyectos y disponibilidad. Después de 3 preguntas, redirige al visitante a contactarme por WhatsApp.

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Frontend | React 18 + Vite |
| Estilos | CSS-in-JS (inline styles) |
| Chat IA | Claude API (Anthropic) via Serverless Function |
| Deploy | Vercel |
| Fuente de código | GitHub |

---

## Estructura del proyecto

```
mi-portafolio/
├── api/
│   └── chat.js          # Proxy serverless → Anthropic API
├── src/
│   ├── App.jsx          # Componente principal (todo el portafolio)
│   └── main.jsx         # Entry point
├── public/
├── index.html
├── vite.config.js
└── package.json
```

---

## Cómo funciona el chat

El visitante escribe una pregunta → el frontend llama a `/api/chat` (función serverless en Vercel) → esta función llama a la API de Anthropic con un system prompt que describe mi perfil → la respuesta llega de vuelta al usuario.

La API key nunca se expone al cliente — vive como variable de entorno en Vercel.

```
Visitante → React (fetch /api/chat) → Vercel Function → Anthropic API → respuesta
```

---

## Correr localmente

```bash
# Clonar el repo
git clone https://github.com/JDHiguitaaa/JDHiguitaaa.github.io.git
cd JDHiguitaaa.github.io/mi-portafolio

# Instalar dependencias
npm install

# Crear archivo de variables de entorno
echo "ANTHROPIC_API_KEY=sk-ant-..." > .env.local

# Correr en desarrollo
npm run dev
```

> El chat no funciona en desarrollo sin la API key. Solicítala al autor si eres colaborador.

---

## Despliegue

Conectado a Vercel vía GitHub. Cada `git push` a `main` activa un nuevo deployment automáticamente.

```bash
# Deploy manual (si se necesita)
npm run deploy
```

---

## Proyectos destacados

- **Pharma Inventory** — Sistema de gestión de inventario farmacéutico (Java · Spring Boot · MySQL)
- **Alzalert** — App móvil para monitoreo de pacientes con Alzheimer (Flutter · Dart)
- **Episense** — App de monitoreo de epilepsia con alertas de emergencia (Flutter · Dart)

---

## Contacto

- 📧 juandahiguitaa@hotmail.com
- 💼 [LinkedIn](https://linkedin.com/in/higuitaaa)
- 🐙 [GitHub](https://github.com/JDHiguitaaa)
- 💬 [WhatsApp](https://wa.me/573146919190)