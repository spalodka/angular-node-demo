import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserActionComponent } from '../users/user-action.component';
import { AuthGuard } from '../auth.guard';


const routes: Routes = [{  path: '',
                        // { path: 'userAction', component: UserActionComponent}
                        children: [
                          { path: '', component: UsersComponent},
                          { path: 'userAction', component: UserActionComponent },
                        ] }
                      ];

@NgModule({
  imports: [RouterModule.forChild(routes)
            ],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
