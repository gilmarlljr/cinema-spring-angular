import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chairs',
  templateUrl: './chairs.component.html',
  styleUrls: ['./chairs.component.css']
})
export class ChairsComponent implements OnInit {

  chairs: Array<ChairInteface> = []
  size: number
  selectedColor: string = '#479dc5b4'
  emptyColor: string = '#47c58ab4'
  occupiedColor: string = '#c54747b4'
  constructor() { }


  selectChair(chair: ChairInteface): void {
    if (chair.status === this.emptyColor) {
      chair.status = this.selectedColor
    } else if (chair.status === this.selectedColor) {
      chair.status = this.emptyColor
    }
  }
  ngOnInit(): void {
    var totalSits = 25
    var rows = Math.ceil(Math.sqrt(totalSits));
    var chairCount = 1
    var rowCount = 1
    while (this.chairs.length < totalSits) {
      this.chairs.push({
        number: chairCount++,
        row: rowCount,
        status: this.randomStatus()
      })
      if (chairCount === rows + 1) {
        rowCount++
        chairCount = 1
      }
    }
    this.size = Math.ceil(Math.sqrt(this.chairs.length))
  }

  randomStatus(): string {
    var result = '';
    var colors = [this.occupiedColor, this.emptyColor];
    return colors[Math.floor(Math.random() * colors.length)];
  }

}


export interface ChairInteface {
  number: number;
  row: number;
  status: string;
}
