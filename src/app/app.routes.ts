import { Routes } from '@angular/router';
import { Games } from './pages/game/games/games';
import { Home } from './pages/home/home';
import { GameDetails } from './pages/game/game-details/game-details';
import { Basket } from './pages/basket/basket';
import { Genres } from './pages/genre/genres/genres';
import { Orders } from './pages/orders/orders';
import { Login } from './pages/login/login';
import { Platforms } from './pages/platform/platforms/platforms';
import { Publishers } from './pages/publisher/publishers/publishers';
import { Users } from './pages/users/users';
import { Roles } from './pages/roles/roles';
import { GenreDetails } from './pages/genre/genre-details/genre-details';
import { PlatformDetails } from './pages/platform/platform-details/platform-details';
import { PublisherDetails } from './pages/publisher/publisher-details/publisher-details';
import { AddGame } from './pages/game/add-game/add-game';
import { EditGame } from './pages/game/edit-game/edit-game';
import { AddGenre } from './pages/genre/add-genre/add-genre';
import { EditGenre } from './pages/genre/edit-genre/edit-genre';
import { AddPlatform } from './pages/platform/add-platform/add-platform';
import { AddPublisher } from './pages/publisher/add-publisher/add-publisher';
import { EditPlatform } from './pages/platform/edit-platform/edit-platform';
import { EditPublisher } from './pages/publisher/edit-publisher/edit-publisher';

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
    path: 'edit-genre/:id',
    component: EditGenre,
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
    path: 'edit-platform/:id',
    component: EditPlatform,
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
    path: 'edit-publisher/:companyName',
    component: EditPublisher,
  },
  {
    path: 'publishers/:companyName',
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
