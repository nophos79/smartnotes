# Feature Specification: Gestor de Tareas y Notas Inteligente (v5.3 - Armonización Modo Claro & Contraste)

**Feature Branch**: `001-task-notes-manager`  
**Created**: 2026-11-20 | **Updated**: 2026-11-21  
**Status**: Completed (v5.3 Light Mode Contrast & Vector Icons)  
**Input**:
1. El signo `+` en el botón de nueva nota no se ve nítido en modo claro.
2. La lupa del buscador se solapa con la palabra "Buscar".
3. Mejorar los contrastes y paleta en modo claro para asemejarse al estándar de alta claridad y legibilidad de *Gastos Compartidos (Equigasto)*: fondo slate-50, tarjetas blancas nítidas con sombras sutiles, tipografía slate-900 / slate-600 y acento indigo profesional.

---

## 1. User Story 21 - Modo Claro Nítido y de Alto Contraste (Estilo Equigasto)
Como usuario que prefiere el modo claro, quiero una interfaz luminosa, limpia y nítida donde los textos se lean con total contraste, las tarjetas resalten sobre el fondo y ningún icono tape el texto del buscador ni se vea borroso.

* **Acceptance Criteria**:
  - **Paleta Modo Claro**:
    - Fondo de página: `#f8fafc` (slate-50).
    - Tarjetas y Sidebar: `#ffffff` blanco puro con borde suave `#e2e8f0` y sombra sutil `shadow-sm`.
    - Tipografía: Títulos en `#0f172a` (slate-900) y textos secundarios en `#475569` (slate-600), eliminando tonos lavados.
    - Botón primario: Azul índigo vibrante `#4f46e5` con texto blanco nítido y un icono vectorial `+` ultra definido.
  - **Buscador**:
    - Icono de lupa en SVG vectorial nítido.
    - `padding-left: 2.85rem` garantizando que nunca se solape con el texto ni con el placeholder.
  - **Insignias y Badges**:
    - Fondos pastel suaves con texto en tono saturado y borde fino a juego (estilo Tailwind/Equigasto).

---

## 2. Requisitos Funcionales

* **FR-028**: Paleta CSS variables para modo claro inspirada en Tailwind Slate/Indigo.
* **FR-029**: Separación geométrica estricta en el input de búsqueda para evitar solapamientos.
* **FR-030**: Reemplazo de emojis borrosos por iconos SVG vectoriales nítidos.
