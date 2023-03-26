import { Component, Input } from "@angular/core";
import { Card } from "../../../../model/card.model";

@Component({
    selector: 'div[app-card-layout-wrapper]',
    templateUrl: 'card-layout-wrapper.component.html'
})
export class CardLayoutWrapperComponent {
    @Input() magicCard!: Card | null;

}
