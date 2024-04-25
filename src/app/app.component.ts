import { Component, OnInit, inject } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
 import { MatomoTracker } from 'ngx-matomo';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
     private readonly matomoTracker = inject(MatomoTracker);
    constructor(private primengConfig: PrimeNGConfig) { }

    ngOnInit() {
        this.primengConfig.ripple = true;
    }
    ngAfterViewInit(): void {
     this.matomoTracker.getMatomoUrl().then((url: string) => console.log('Matomo URL:', url));
      }
}
