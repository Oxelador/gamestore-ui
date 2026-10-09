import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'edit-game/:key',
    renderMode: RenderMode.Client,
  },
  {
    path: 'game/:key',
    renderMode: RenderMode.Client,
  },
  {
    path: 'edit-genre/:id',
    renderMode: RenderMode.Client,
  },
  {
    path: 'genres/:id',
    renderMode: RenderMode.Client,
  },
  {
    path: 'edit-platform/:id',
    renderMode: RenderMode.Client,
  },
  {
    path: 'platforms/:id',
    renderMode: RenderMode.Client,
  },
  {
    path: 'edit-publisher/:id',
    renderMode: RenderMode.Client,
  },
  {
    path: 'publishers/:id',
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
