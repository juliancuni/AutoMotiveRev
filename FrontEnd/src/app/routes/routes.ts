import { Routes } from "@angular/router";
import { PrivateLayoutComponent } from "../layout/private/private-layout/private-layout.component";
import { PublicLayoutComponent } from "../layout/public/public-layout/public-layout.component";

export const routes: Routes = [
    {
        path: 'app', component: PrivateLayoutComponent, children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', loadChildren: () => import('./private/home/home.module').then(m => m.HomeModule) }
        ]
    },
    {
        path: '', component: PublicLayoutComponent, children: [
            { path: '', loadChildren: () => import('./public/public-pages.module').then(m => m.PublicPagesModule) },
        ]
    }


]