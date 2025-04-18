import { Injectable, Type } from '@angular/core';
import { DomService } from './dom.service';

@Injectable({ providedIn: 'root' })
export class ModalService {
    private modalContainer = 'modal-container';
    private modalContent = 'modal-content';
    private overlayElementId = 'overlay';

    constructor(private domService: DomService) {}

    init<T, S, Z>(component: Type<T>, inputs: S, outputs: Z) {
        const componentConfig = {
            inputs,
            outputs,
        };
        this.domService.appendComponentTo<T, S, Z>(this.modalContent, component, componentConfig);
        document.getElementsByTagName('BODY')[0].classList.add('modal-open');
        const modalElement = document.getElementById(this.modalContainer);
        if (modalElement !== null) {
            modalElement.className = 'show';
        }
        const overlayElemen = document.getElementById(this.overlayElementId);
        if (overlayElemen !== null) {
            overlayElemen.className = 'show';
        }
    }

    destroy() {
        this.domService.removeComponent();
        const modalElement = document.getElementById(this.modalContainer);
        if (modalElement !== null) {
            modalElement.classList.add('modal-hidden');
            modalElement.classList.remove('show');
        }
        const overlayElement = document.getElementById(this.overlayElementId);
        if (overlayElement !== null) {
            overlayElement.classList.add('modal-hidden');
            overlayElement.classList.remove('show');
        }
        document.getElementsByTagName('BODY')[0].classList.remove('modal-open');
    }
}
