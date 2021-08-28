import { Routes } from "@angular/router";
import { PrivateLayoutComponent } from "../layout/private/private-layout/private-layout.component";

export const routes: Routes = [
    {
        path: '', component: PrivateLayoutComponent, children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) }
        ]
    }

    
]