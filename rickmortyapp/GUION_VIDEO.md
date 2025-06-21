# 🎬 GUION PARA VIDEO - Proyecto Rick and Morty Characters

## 📋 **ESTRUCTURA DEL VIDEO (8-10 minutos)**

---

## 🎯 **INTRODUCCIÓN (1 minuto)**

**[Mostrar pantalla en blanco/escritorio]**

> "Hola, soy [Tu nombre] y hoy les voy a presentar mi proyecto de Rick and Morty Characters, desarrollado como parte del curso de JavaScript. Este proyecto no solo cumple con todos los requisitos pedidos, sino que los supera con funcionalidades adicionales y un diseño profesional."

**[Abrir VS Code con el proyecto]**

> "Primero, veamos la estructura del proyecto. Como pueden ver, está construido con Vite y JavaScript vanilla, tal como se requería."

---

## ⚙️ **CONFIGURACIÓN Y TECNOLOGÍAS (1 minuto)**

**[Mostrar package.json]**

> "El proyecto está configurado con Vite como bundler, lo que nos da hot reload y un desarrollo súper rápido. Como ven en el package.json, solo tenemos Vite como dependencia de desarrollo, manteniendo el proyecto liviano y enfocado en JavaScript puro."

**[Mostrar terminal ejecutando npm run dev]**

> "Para ejecutar el proyecto simplemente uso `npm run dev` y tenemos el servidor corriendo en localhost:5173."

---

## 🚀 **DEMOSTRACIÓN PRINCIPAL (3 minutos)**

**[Abrir la aplicación en el navegador]**

### **Carga de Datos (30 seg)**
> "Aquí vemos la aplicación cargando. Una de las características destacadas es que NO solo trae los primeros 20 personajes como haría una implementación básica, sino que hace requests a TODAS las páginas de la API para traer los más de 800 personajes completos."

**[Señalar el contador mientras carga]**

> "Ven que dice 'Cargando todos los personajes...' y después nos muestra el total: 826 personajes encontrados."

### **Diseño y UI (45 seg)**
> "El diseño está inspirado en la serie Rick and Morty. Utilicé los colores característicos: verde neón y amarillo para el título, que tiene un gradiente CSS. Las tarjetas tienen un diseño oscuro con bordes redondeados y..."

**[Hacer hover sobre una tarjeta]**

> "...efectos hover súper fluidos. Miren cómo la tarjeta se eleva con `transform: translateY(-5px)`, cambia la sombra a verde neón con `box-shadow`, y el borde se ilumina. Esto se logra con transiciones CSS de 0.3 segundos para que sea súper suave."

### **Información de Personajes (30 seg)**
> "Cada tarjeta muestra la imagen del personaje en formato circular con borde verde, el nombre en negrita y centrado, la especie, y el estado vital con un indicador de color: verde para vivo, rojo para muerto, y naranja para desconocido."

### **Búsqueda Avanzada (45 seg)**
**[Usar la barra de búsqueda]**

> "Ahora viene una de las funcionalidades estrella: la búsqueda dinámica con soporte para regex. No solo busca por nombre como pedía el requisito, sino también por especie."

**[Escribir "rick" en la búsqueda]**

> "Si escribo 'rick', filtra en tiempo real todos los Rick. Ven cómo el contador cambia a '57 de 826 personajes'."

**[Probar regex: "^rick"]**
> "Pero aquí viene lo bueno: puedo usar expresiones regulares. Si escribo `^rick`, solo me trae los que EMPIEZAN con rick."

**[Probar: "human|alien"]**
> "O puedo buscar `human|alien` para traer todos los humanos O aliens usando el operador OR de regex."

---

## 💻 **CÓDIGO Y IMPLEMENTACIÓN (2.5 minutos)**

**[Cambiar a VS Code - main.js]**

### **Arquitectura del Código (45 seg)**
> "Vamos al código. Está súper bien estructurado en funciones específicas. Tenemos `fetchAllCharacters` que itera por todas las páginas de la API, `filterCharacters` con soporte regex, `createCharacterCard` para generar las tarjetas, y funciones separadas para cada responsabilidad."

### **Paginación Automática (30 seg)**
**[Mostrar fetchAllCharacters]**

> "Esta función es clave: en lugar de traer solo una página, uso un while loop que sigue el `info.next` de la API hasta recorrer todas las páginas y concatenar todos los resultados. Esto garantiza que tenemos TODOS los personajes, no solo los primeros 20."

### **Filtrado con Regex (45 seg)**
**[Mostrar filterCharacters]**

> "El filtrado es inteligente. Primero intenta crear una RegExp con el término de búsqueda. Si es válida, la usa. Si no, hace fallback a búsqueda normal con `includes`. Esto evita errores si el usuario escribe regex inválida."

### **Reactividad y Estados (30 seg)**
**[Mostrar setupSearch y renderCharactersGrid]**

> "La reactividad se maneja con event listeners en el input. Cada vez que escriben, filtra los personajes, actualiza el contador dinámicamente, y re-renderiza solo la grilla sin tocar el resto de la página."

---

## ✨ **FUNCIONALIDADES EXTRA (1.5 minutos)**

### **Modal de Episodios (1 minuto)**
**[Volver al navegador y clickear "Ver Episodios"]**

> "Esta funcionalidad no estaba en los requisitos pero la agregué para mejorar la experiencia. Cuando clickean 'Ver Episodios', hace otra llamada a la API para traer los detalles de cada episodio."

**[Mostrar el modal]**

> "El modal es completamente custom, sin librerías. Muestra el nombre del episodio, el código (S01E01), y la fecha de emisión. Se puede cerrar clickeando la X o fuera del modal."

### **Responsive Design (30 seg)**
**[Redimensionar la ventana]**

> "El diseño es completamente responsive usando CSS Grid con `repeat(auto-fill, minmax(300px, 1fr))`. Las tarjetas se adaptan automáticamente al tamaño de pantalla."

---

## 🎨 **DETALLES DE DISEÑO (1 minuto)**

**[Mostrar style.css]**

### **Tema Rick and Morty (30 seg)**
> "En el CSS pueden ver el tema completo. El título usa `linear-gradient(45deg, #00ff00, #ffff00)` con `-webkit-background-clip: text` para el efecto de texto con gradiente. Los botones tienen gradientes verdes y efectos de escala al hacer hover."

### **Modo Claro/Oscuro (30 seg)**
> "Además incluye soporte automático para modo claro usando `@media (prefers-color-scheme: light)`. Si el sistema está en modo claro, los colores se adaptan automáticamente."

---

## 📊 **CUMPLIMIENTO DE REQUISITOS (1 minuto)**

**[Mostrar checklist en pantalla o papel]**

> "Repasemos los requisitos:
> ✅ Vite con JavaScript vanilla - CUMPLIDO
> ✅ Consumo de API Rick and Morty - CUMPLIDO y SUPERADO (todos los personajes)
> ✅ Búsqueda dinámica por nombre - CUMPLIDO y SUPERADO (nombre + especie + regex)
> ✅ Mostrar imagen, nombre y especie - CUMPLIDO y SUPERADO (+ estado vital + episodios)
> ✅ Diseño organizado - CUMPLIDO y SUPERADO (responsive + tema)
> ✅ Manejo de errores - CUMPLIDO
> ✅ Código bien estructurado - CUMPLIDO"

---

## 🎯 **CONCLUSIÓN (30 segundos)**

> "En resumen, este proyecto no solo cumple con todos los requisitos pedidos, sino que los supera significativamente. Agregué funcionalidades como soporte para regex, modal de episodios, carga de todos los personajes, diseño temático, y una arquitectura de código profesional y escalable."

**[Hacer un último hover sobre las tarjetas]**

> "El resultado es una aplicación fluida, visualmente atractiva, y funcionalmente robusta que demuestra un dominio sólido de JavaScript, APIs, CSS avanzado, y mejores prácticas de desarrollo."

---

## 📝 **NOTAS PARA LA GRABACIÓN:**

### **🎥 Técnicas de Grabación:**
- **Pantalla completa**: Usar OBS o similar para captura limpia
- **Cursor**: Hacer visible y usar para señalar elementos importantes
- **Velocidad**: Hablar pausado y claro
- **Transiciones**: Pausas breves entre secciones

### **💡 Puntos a Enfatizar:**
- **"TODOS los personajes"** (no solo 20)
- **"Regex support"** (funcionalidad avanzada)
- **"Hover effects"** (demostrar fluidez)
- **"Professional architecture"** (código bien estructurado)
- **"Responsive design"** (adaptabilidad)

### **🚀 Demostraciones Clave:**
1. Carga inicial con contador
2. Hover effects en tarjetas
3. Búsqueda simple: "rick"
4. Búsqueda regex: "^rick", "human|alien"
5. Modal de episodios
6. Responsive design
7. Código limpio y comentado

### **⏱️ Timing Sugerido:**
- **Intro**: 1 min
- **Demo principal**: 4 min
- **Código**: 2.5 min
- **Extras**: 1.5 min
- **Conclusión**: 1 min
- **Total**: ~10 minutos

---

## 🎬 **¡LISTO PARA GRABAR!**

**Este guion te dará un video profesional que destaque todas las fortalezas técnicas y visuales del proyecto. ¡Éxito!** 🚀