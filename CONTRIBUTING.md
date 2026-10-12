# Cómo contribuir

Las propuestas son bienvenidas, sobre todo para detectar errores en las escalas.

## Errores y propuestas

Abra una incidencia con la plantilla correspondiente e indique siempre la fuente (artículo de validación, guía o documento oficial). No incluya datos de pacientes.

## Añadir o modificar una escala

1. Cada escala está en `src/scales/` y sigue el tipo `Scale` de `src/scales/types.ts`.
2. Use los textos y puntos de corte de la versión española validada y cite la referencia en el campo `reference`.
3. Compruebe que la escala permite su uso en una aplicación (libre, con registro o con permiso del autor).
4. Añádala a `src/scales/index.ts` y escriba pruebas en `tests/escalas.test.ts`.
5. Antes de enviar los cambios ejecute:

```sh
npm run typecheck
npm test
npm run build
```
