# ASAGMBA (V0.21)

Juego de plataformas en pixel art de Samara, en el antiguo Mulukukú.

## Abrir en VS Code
Abre **ASAGMBA.code-workspace** (doble clic, o `File → Open Workspace from File`). Trae la tarea de construir y los ajustes del proyecto.

## Cómo jugar
Haz doble clic en **index.html** (o, en VS Code, `Terminal → Run Task → Abrir el juego en el navegador`).
No hace falta servidor ni instalar nada.

## Carpetas
| Carpeta / archivo | Qué es |
|---|---|
| `index.html` | La página del juego |
| `css/estilo.css` | Estilos de la página |
| `src/` | **El código del juego, separado por partes** (aquí es donde se edita) |
| `assets/` | Sprites, cinemáticas y la ópera de Arlos (en base64, no hace falta tocarlos) |
| `juego.js` | Archivo generado a partir de `src/` (no se edita a mano) |
| `build.py` | Une `src/` en `juego.js` y lo protege |

### Partes de `src/`
- `01` datos, tabla de vida de enemigos (`ET`), comidas y carga de imágenes
- `02` controles · `03` jugador y bucle principal · `04` jefe Arlos
- `06`–`08` audio, ópera de Arlos y música por zona
- `09` Duskclaw · `10` pulido de Samara (impactos, polvo, estelas)
- `11`–`19` intro, cuarto, la gran puerta, niveles, campamentos, portal y arena del jefe
- `20`–`22` animaciones y personalización del personaje
- `24`–`26` enemigos, cinemáticas y mundo
- `21c` **inventario interactivo** (objetos + equipo)
- `27`–`28c` **área 6, el Bosque de la Niebla**: fondo con parallax y brillo, plataformas, espíritus animales, Samara Espíritu, cofres y tesoros
- `29`–`31` después de Arlos, el espacio en blanco (cinemática del Errante) y NPC
- `32` HUD, menú y guardado · `33` dibujo principal · `34` **protección de stats**
- `35`–`42` opciones, dificultad, RTX, consejos, mapas, jefe final, epílogo, Llano y Flamerita
- `43` **mejoras**: arreglos de guardado y reinicio, ataques nuevos de Arlos y luces dinámicas

## Cómo hacer cambios
1. Edita los archivos de `src/`.
2. Pulsa **Ctrl+Shift+B** en VS Code (o ejecuta `python build.py`). Se regenera `juego.js`.
3. Recarga `index.html` en el navegador.

Si no construyes, el juego sigue usando el `juego.js` anterior.

## Protección de stats
- Todo el código va dentro de un cierre privado: desde la consola del navegador no existen `p`, `B`, `enemies`, `ET`...
- Las tablas de stats (vida de enemigos, ataques, comidas) se congelan al cargar.
- Un vigilante revisa cada cuadro que vida, stamina, escudo, invulnerabilidad, comidas, vida de enemigos y del jefe estén dentro de los límites legales.
- La partida guardada va firmada: si alguien la edita, se rechaza.

Los límites están en `src/34-proteccion.js` (`LIM`). Si cambias la vida máxima o agregas un jefe, ajústalos ahí.
En un juego de navegador nada es 100 % imposible de trampear para un experto con el depurador, pero esto bloquea los trucos normales.

## El Bosque de la Niebla (área 6, después de la cinemática del Errante)
- Fondo "Dark Forest" (Val_DeMar, CC0) con parallax y bioluminiscencia hecha a mano; plataformas de "Dark Forest Platform Pack" (Atari Boy, CC0) recoloreadas.
- 8 espíritus animales con globos de texto; cada uno da una reliquia. La Oveja Negra transforma a Samara en **Samara Espíritu** (clic: detener el tiempo 2.5 s, recarga 10 s; ataques nuevos: corte ascendente, picada y estocada).
- 7 cofres con tesoros equipables (íconos de ssugmi, rediseñados con nombres de Mulukukú y Nicaragua).
- El avance de la fase (reliquias, espíritus, tesoros, transformación) se guarda en la partida.

## Inventario interactivo (I o Tab)
- OBJETOS: bolsa 10x5 + barra rápida de 5 (teclas 1-5). EQUIPO: bolsa 4x5 + 3 puestos.

## Créditos de recursos externos
- Dark Forest – Val_DeMar (CC0) · Dark Forest Platform Pack – Atari Boy (CC0)
- 16x16 RPG Asset Pack (muestra gratis) – ssugmi: uso comercial y modificación permitidos, no se puede revender ni redistribuir como asset
- Rata – WilliamQM "Dark Enemies Pack" (incluida en los recursos, todavía sin usar)
