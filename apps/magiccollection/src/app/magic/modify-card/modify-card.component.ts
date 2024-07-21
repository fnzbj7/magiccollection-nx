import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModifyCardDto } from './dto/modify-card.dto';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModifyCardService } from '../modify-card.service';
import { ModifyQtyEnum } from '../../model/modify-qty.enum';
import { Card, CardLayout } from '../../model/card.model';
import { CardWithFoil } from './dto/foil.dto';
import { AfterFinishForm } from './modify-form/model/after-finish-form.model';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

enum PageStep {
    FORM = 'from',
    PREVIEW = 'preview',
    UPLOADED = 'uploaded',
}

export enum ModifyMode {
    ADD,
    REMOVE,
}

@Component({
    selector: 'app-modify-card',
    templateUrl: './modify-card.component.html',
    styleUrls: ['./modify-card.component.css'],
})
export class ModifyCardComponent implements OnInit, OnDestroy {
    modifyQty: ModifyQtyEnum = ModifyQtyEnum.ADD;
    inProgress = false;
    isFinished = false;
    pageStep = PageStep;
    actualPageStep = PageStep.FORM;
    isError = false;
    cardSet!: string;

    param$!: Subscription;

    reducedArr!: ModifyCardDto;
    rawCardNumbers!: CardWithFoil[];
    cardLanguage!: string;

    mode!: ModifyMode;

    constructor(private modifyCardService: ModifyCardService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.param$ = this.route.params.subscribe(() => {
            this.modifyQty = +this.route.snapshot.data['modifyQty'];
            this.mode = this.modifyQty > 0 ? ModifyMode.ADD : ModifyMode.REMOVE;
            this.resetPage();
        });
    }

    onFormFinish(event: AfterFinishForm) {
        this.reducedArr = event.reducedArr;
        this.rawCardNumbers = event.rawCardNumbers;
        this.actualPageStep = PageStep.PREVIEW;
        this.cardSet = event.cardSet;
        this.cardLanguage = event.cardLanguage;
    }

    startUploading() {
        this.actualPageStep = PageStep.UPLOADED;
        this.modifyCardService.addCard(this.reducedArr).subscribe(
            () => {
                console.log('Finished adding card');
                this.inProgress = false;
                this.isFinished = true;
                this.modifyCardService.clearModifyCard(this.modifyQty);
            },
            err => {
                console.log(err);
                this.inProgress = false;
                this.isError = true;
            },
        );
    }

    resetPage() {
        this.isFinished = false;
        this.actualPageStep = PageStep.FORM;
    }

    ngOnDestroy() {
        if (this.param$) {
            this.param$.unsubscribe();
        }
    }
}
