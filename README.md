# Thiago Streaming

Proyecto React + Vite estilo Netflix.

## Credenciales ADM

```txt
Usuario: admin
Password: Thiago123
```

El perfil ADM siempre se mantiene primero. Los usuarios registrados desde el login se agregan como perfiles nuevos y no reemplazan al ADM.

## Ejecutar localmente

```bash
npm install
npm run dev
```

## Compilar para despliegue

```bash
npm run build
npm run preview
```

## Rick and Morty API

Se consume la API oficial desde:

```txt
src/features/rick-and-morty/services/rick-and-morty-service.js
```

Recursos implementados:

```txt
/character  -> Personajes
/episode    -> Episodios
/location   -> Ubicaciones
```

Rutas dentro del sistema:

```txt
/app/rick-and-morty
/app/rick-and-morty/episodes
/app/rick-and-morty/locations
```

Nota: La API entrega imágenes solo para personajes. Episodios y ubicaciones no tienen imágenes ni videos.
