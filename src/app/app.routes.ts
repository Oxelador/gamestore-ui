import { Routes } from '@angular/router';
import { Games } from './pages/games/games';
import { Home } from './pages/home/home';
import { GameDetails } from './pages/game-details/game-details';
import { Basket } from './pages/basket/basket';
import { Genres } from './pages/genres/genres';
import { Orders } from './pages/orders/orders';
import { Login } from './pages/login/login';
import { Platforms } from './pages/platforms/platforms';
import { Publishers } from './pages/publishers/publishers';
import { Users } from './pages/users/users';
import { Roles } from './pages/roles/roles';
import { GenreDetails } from './pages/genre-details/genre-details';
import { PlatformDetails } from './pages/platform-details/platform-details';
import { PublisherDetails } from './pages/publisher-details/publisher-details';
import { AddGame } from './pages/add-game/add-game';
import { EditGame } from './pages/edit-game/edit-game';
import { AddGenre } from './pages/add-genre/add-genre';
import { AddPlatform } from './pages/add-platform/add-platform';
import { AddPublisher } from './pages/add-publisher/add-publisher';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: Home,
  },
  {
    path: 'games',
    component: Games,
  },
  {
    path: 'add-game',
    component: AddGame,
  },
  {
    path: 'edit-game/:key',
    component: EditGame,
  },
  {
    path: 'game/:key',
    component: GameDetails,
  },
  {
    path: 'genres',
    component: Genres,
  },
  {
    path: 'add-genre',
    component: AddGenre,
  },
  {
    path: 'genres/:id',
    component: GenreDetails,
  },
  {
    path: 'platforms',
    component: Platforms,
  },
  {
    path: 'add-platform',
    component: AddPlatform,
  },
  {
    path: 'platforms/:id',
    component: PlatformDetails,
  },
  {
    path: 'publishers',
    component: Publishers,
  },
  {
    path: 'add-publisher',
    component: AddPublisher,
  },
  {
    path: 'publishers/:id',
    component: PublisherDetails,
  },
  {
    path: 'basket',
    component: Basket,
  },
  {
    path: 'orders',
    component: Orders,
  },
  {
    path: 'users',
    component: Users,
  },
  {
    path: 'roles',
    component: Roles,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: '**',
    redirectTo: 'games',
  },
];
