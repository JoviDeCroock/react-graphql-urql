import { FC } from 'react';

import LayoutPageProperties from '../templates/interfaces/LayoutPageProperties';
import { RouteTypeEnum } from './routeTypes';
import PageProperties from './PageProperties';
import { UserRoute } from 'pages/Admin/Users/User';
import { TranslationRoute } from 'pages/Admin/Translations/Translation';

export interface RouteProperties<RouteParameters> {
  component: FC<PageProperties<RouteParameters>>;
  exact?: boolean;
  params?: {
    [key in keyof RouteParameters]: string;
  };
  path: string;
  template?: FC<LayoutPageProperties>;
}

export type RoutePropertiesParameters = (
  RouteProperties<UserRoute> |
  RouteProperties<TranslationRoute>
);

export interface RouteTemplateProperties {
  routes: RoutePropertiesParameters[];
  template: FC<LayoutPageProperties>;
  type: RouteTypeEnum;
}
