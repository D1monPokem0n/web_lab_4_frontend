import { Component, ElementRef } from '@angular/core';
import { UserInputService } from '../user-input.service';
import { RestClientService } from '../rest-client.service';
import { PointsContainerService } from '../points-container.service';

@Component({
  selector: 'app-user-inputs',
  templateUrl: './user-inputs.component.html',
  styleUrls: ['./user-inputs.component.scss'],
})
export class UserInputsComponent {
  x?: any;
  y?: any;
  r?: any;
  sendButtonIsHover = false;
  constructor(
    private userInput: UserInputService,
    private pointsContainer: PointsContainerService
  ) {}

  updateUserInput(): void {
    this.userInput.r = this.r >= 0 ? this.r : '0';
  }

  parseNum(value: string): number {
    return +value.replace(',', '.');
  }

  checkIfStringIsNum(value: string): boolean {
    return !isNaN(this.parseNum(value));
  }

  checkRangeY(value: string): boolean {
    const num = this.parseNum(value);
    return -3 < num && num < 3;
  }

  checkRangeR(value: any): boolean {
    return +value > 0;
  }

  checkInputs(x?: number, y?: string, r?: number) {
    return !(x && y && this.checkRangeY(y) && r && this.checkRangeR(r));
  }

  sendRequest(x: number, y: number, r: number): void {
    console.log(x, y, r);
    this.pointsContainer.addPoint(x, y, r);
    this.x = 0;
    this.y = '';
    this.r = 0;
    this.updateUserInput();
  }

  clearRequest() {
    console.log('clear');
    this.pointsContainer.clearPoints()
  }
}
