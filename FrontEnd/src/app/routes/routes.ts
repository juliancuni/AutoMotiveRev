import { Routes } from "@angular/router";
import { PrivateLayoutComponent } from "../layout/private/private-layout/private-layout.component";
import { PublicLayoutComponent } from "../layout/public/public-layout/public-layout.component";
import { AuthGuard } from "../shared/guards/auth.guard";
import { UnAuthGuard } from "../shared/guards/un-auth.guard";

export const routes: Routes = [
    {
        path: 'app', component: PrivateLayoutComponent, canActivate: [AuthGuard], children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', loadChildren: () => import('./private/home/home.module').then(m => m.HomeModule) },
            { path: 'users', loadChildren: () => import('./private/users/users.module').then(m => m.UsersModule) },
            { path: 'roles', loadChildren: () => import('./private/roles/roles.module').then(m => m.RolesModule) },
        ]
    },
    {
        path: '', component: PublicLayoutComponent, children: [
            { path: '', canActivate: [UnAuthGuard], loadChildren: () => import('./public/public-pages.module').then(m => m.PublicPagesModule) },
        ]
    }


]