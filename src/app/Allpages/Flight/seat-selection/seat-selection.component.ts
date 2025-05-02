import { Component, Input, OnInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-seat-selection',
  template: `
    <ion-header class="modal-header">
      <ion-toolbar color="primary">
        <ion-title>Select Your Seats</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismissModal($event)">
            <ion-icon name="close"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="seat-map-container">
        <div class="seat-map-header">
          <div class="plane-icon">
            <ion-icon name="airplane"></ion-icon>
          </div>
          <div class="seat-info">
            <div class="legend">
              <div class="legend-item">
                <div class="seat-sample available"></div>
                <span>Available</span>
              </div>
              <div class="legend-item">
                <div class="seat-sample selected"></div>
                <span>Selected</span>
              </div>
            </div>
          </div>
        </div>

        <div class="seat-grid">
          <div class="aisle-label">FRONT</div>
          <div class="seat-container">
            <ol class="cabin">
              <li class="row" *ngFor="let i of rangei">
                <div class="row-number">{{i + 1}}</div>
                <ol class="seats">
                  <li class="seat" *ngFor="let j of rangej">
                    <ng-container *ngIf="isSeatAvailable(i, j); else emptySeat">
                      <button
                        #seatButton
                        [attr.tabindex]="0"
                        [class.selected]="isSeatSelected(i, j)"
                        id="{{ i }}{{ j }}a"
                        class="seat-button"
                        (click)="selectSeat($event, i, j, getSeatCode(i, j))">
                        <div class="seat-label">{{getSeatCode(i, j)}}</div>
                        <div class="seat-price">₹{{getSeatPrice(i, j)}}</div>
                      </button>
                    </ng-container>
                    <ng-template #emptySeat>
                      <div class="empty-seat"></div>
                    </ng-template>
                  </li>
                </ol>
              </li>
            </ol>
          </div>
          <div class="aisle-label">BACK</div>
        </div>
      </div>
    </ion-content>

    <ion-footer>
      <ion-toolbar>
        <ion-button expand="block" class="confirm-button" (click)="dismissModal($event)">
          Confirm Selection
        </ion-button>
      </ion-toolbar>
    </ion-footer>
  `,
  styles: [`
    :host {
      display: block;
    }

    .modal-header ion-toolbar {
      --background: #213d77;
      --color: white;
    }

    .seat-map-container {
      padding: 20px;
      background: #f5f5f5;
    }

    .seat-map-header {
      text-align: center;
      margin-bottom: 20px;
    }

    .plane-icon {
      font-size: 40px;
      color: #213d77;
      margin-bottom: 15px;
    }

    .legend {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-bottom: 20px;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .seat-sample {
      width: 20px;
      height: 20px;
      border-radius: 4px;
    }

    .seat-sample.available {
      background: white;
      border: 1px solid #213d77;
    }

    .seat-sample.selected {
      background: #213d77;
    }

    .seat-grid {
      background: white;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .aisle-label {
      text-align: center;
      color: #666;
      padding: 10px;
      font-weight: 500;
    }

    .seat-container {
      max-width: 600px;
      margin: 0 auto;
    }

    .row {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }

    .row-number {
      width: 30px;
      text-align: center;
      color: #666;
      font-weight: 500;
    }

    .seats {
      display: flex;
      gap: 10px;
      flex: 1;
      justify-content: center;
    }

    .seat {
      list-style: none;
    }

    .empty-seat {
      width: 60px;
      height: 60px;
      visibility: hidden;
    }

    .seat-button {
      width: 60px;
      height: 60px;
      border: none;
      border-radius: 8px;
      background: white;
      border: 1px solid #213d77;
      cursor: pointer;
      padding: 4px;
      transition: all 0.2s;

      &.selected {
        background: #213d77;
        color: white;
      }

      &:hover {
        transform: scale(1.05);
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      }
    }

    .seat-label {
      font-size: 14px;
      font-weight: bold;
    }

    .seat-price {
      font-size: 12px;
      color: inherit;
      opacity: 0.8;
    }

    .confirm-button {
      --background: #213d77;
      --border-radius: 8px;
      margin: 10px 20px;
    }
  `]
})
export class SeatSelectionComponent implements OnInit {
  @Input() seats: any[][] = [];
  @Input() rangei: number[] = [];
  @Input() rangej: number[] = [];
  @Input() Seatsdata1: any = { attr: [], maxReached: false };
  @Input() maxSeats: number = 1;

  selectedSeatsCount = 0;

  @ViewChildren('seatButton') seatButtons!: QueryList<ElementRef>;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    if (!this.Seatsdata1?.attr) {
      this.Seatsdata1 = {
        attr: [],
        maxReached: false
      };
    }
    this.countSelectedSeats();
  }

  countSelectedSeats() {
    this.selectedSeatsCount = [].concat.apply([], this.Seatsdata1.attr.map(row => 
      row ? row.map(seat => seat?.selected || false) : []
    )).filter(status => status).length;
  }

  isSeatAvailable(i: number, j: number): boolean {
    return this.seats?.[i]?.[j]?.Avlt || false;
  }

  isSeatSelected(i: number, j: number): boolean {
    return this.Seatsdata1?.attr?.[i]?.[j]?.selected || false;
  }

  getSeatCode(i: number, j: number): string {
    return this.seats?.[i]?.[j]?.SeatCode || '';
  }

  getSeatPrice(i: number, j: number): number {
    return this.seats?.[i]?.[j]?.Price || 0;
  }

  selectSeat(event: Event, i: number, j: number, seatCode: string) {
    event.preventDefault();
    
    if (!this.Seatsdata1.attr[i]) {
      this.Seatsdata1.attr[i] = [];
    }
    if (!this.Seatsdata1.attr[i][j]) {
      this.Seatsdata1.attr[i][j] = { selected: false };
    }

    if (this.Seatsdata1.attr[i][j].selected) {
      this.Seatsdata1.attr[i][j].selected = false;
      this.selectedSeatsCount--;
    } else if (this.selectedSeatsCount < this.maxSeats) {
      if (this.selectedSeatsCount === 1) {
        this.deselectAllSeats();
      }
      this.Seatsdata1.attr[i][j].selected = true;
      this.selectedSeatsCount++;
    }

    this.counter(seatCode);
    (event.target as HTMLElement).blur();
  }

  deselectAllSeats() {
    for (let i = 0; i < this.Seatsdata1.attr.length; i++) {
      if (this.Seatsdata1.attr[i]) {
        for (let j = 0; j < this.Seatsdata1.attr[i].length; j++) {
          if (this.Seatsdata1.attr[i][j]) {
            this.Seatsdata1.attr[i][j].selected = false;
          }
        }
      }
    }
    this.selectedSeatsCount = 0;
  }

  counter(seatCode: string) {
    this.Seatsdata1.maxReached = this.selectedSeatsCount >= this.maxSeats;
  }

  async dismissModal(event: Event) {
    event.preventDefault();
    
    this.seatButtons?.forEach(button => {
      button.nativeElement.blur();
    });
    
    setTimeout(async () => {
      await this.modalCtrl.dismiss({
        seats: this.Seatsdata1
      });
    }, 50);
  }
} 