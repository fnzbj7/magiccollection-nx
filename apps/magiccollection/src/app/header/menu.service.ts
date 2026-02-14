import { Injectable } from '@angular/core';
import { faWizardsOfTheCoast } from '@fortawesome/free-brands-svg-icons';
import {
    faHome,
    faCalendarAlt,
    faPlus,
    faMinus,
    faGem,
    faSignInAlt,
} from '@fortawesome/free-solid-svg-icons';
import { MenuElement } from './model/menu-element.model';
import { ShowMenu } from './model/show-menu.enum';
import { AuthenticationService } from '../auth/authentication.service';
import { BehaviorSubject } from 'rxjs';
import { magicSetArray } from '@magiccollection/magic/magic-card-list/magic-cards-list.service';

@Injectable({ providedIn: 'root' })
export class MenuService {
    menus: MenuElement[];
    private loggedInCardsMenu!: MenuElement;
    private menuSubject!: BehaviorSubject<MenuElement[]>;

    constructor(private authenticationService: AuthenticationService) {
        this.menus = [
            new MenuElement('', 'Home', ShowMenu.ALWAYS, true, faHome),
            new MenuElement('cards/list', 'Cards', ShowMenu.LOGOUT, false, faWizardsOfTheCoast),
            new MenuElement('cards/list', 'My Cards', ShowMenu.LOGIN, false, faWizardsOfTheCoast),
            new MenuElement('calendar', 'Calendar', ShowMenu.ALWAYS, false, faCalendarAlt),
            new MenuElement('cards/addcards', 'Add Cards', ShowMenu.LOGIN, false, faPlus),
            new MenuElement('cards/removecards', 'Remove Cards', ShowMenu.LOGIN, false, faMinus),
            new MenuElement('draft-viewer', 'Draft viewer', ShowMenu.ALWAYS, false, faMinus),
            new MenuElement('animation', 'Animation', ShowMenu.ALWAYS, false, faGem),
            new MenuElement('auth/login', 'Log in', ShowMenu.LOGOUT, false, faSignInAlt),
        ];

        this.menuSubject = new BehaviorSubject<MenuElement[]>(this.menus);

        this.loggedInCardsMenu = this.menus[2]; // 'My Cards'

        // Subscribe to user login state changes to update routes
        this.authenticationService.currentUserSubject.subscribe(user => {
            if (user) {
                this.loggedInCardsMenu.link = `cards/list/user/${user.id}/${magicSetArray[0].name}`;
            }
        });
    }

    getMenusSub() {
        return this.menuSubject.asObservable();
    }
}
