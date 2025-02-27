import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import type { ICellRendererAngularComp } from 'ag-grid-angular';
import type { ICellRendererParams } from 'ag-grid-community';

@Component({
    selector: 'app-mission-result-renderer',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    template: `
        <span :class="missionSpan">
            @if (value()) {
                <img
                    [src]="value()"
                    [height]="30"
                    :class="missionIcon"
                />
            }
        </span>
    `,
    styles: [
        'img { width: auto; height: auto; } span {display: flex; height: 100%; justify-content: left; align-items: center} ',
    ],
})
export class MissionResultRenderer implements ICellRendererAngularComp {
    value = signal<string | undefined>(undefined);

    agInit(params: ICellRendererParams): void {
        this.refresh(params);
    }

    refresh(params: ICellRendererParams): boolean {
        this.value.set(params.value ? 'https://vietle.blob.core.windows.net/badminton/tick-in-circle.png' : 'https://vietle.blob.core.windows.net/badminton/tick-in-circle.png');
        return true;
    }
}