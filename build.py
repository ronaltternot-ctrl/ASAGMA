import pathlib

RAIZ = pathlib.Path(__file__).resolve().parent
SRC = sorted((RAIZ / "src").glob("*.js"))

if not SRC:
    raise SystemExit("ERROR: no encontré archivos .js en la carpeta src/")

partes = [f.read_text(encoding="utf-8").rstrip() + "\n" for f in SRC]
salida = "(function () {\n" + "\n".join(partes) + "})();\n"
(RAIZ / "juego.js").write_text(salida, encoding="utf-8")
print("OK: juego.js construido con " + str(len(SRC)) + " archivos de src/ (" + str(len(salida) // 1024) + " KB)")
