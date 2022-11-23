import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { EStore } from '@fireflysemantics/slice';
import { Observable } from 'rxjs';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { DatePipe } from '@angular/common';
import { invalid } from '@angular/compiler/src/render3/view/util';
import { FormControl } from '@angular/forms';

/**
 * The Slice Keys
 */
const enum TodoSliceEnum {
  COMPLETE = 'Complete',
  INCOMPLETE = 'Incomplete',
}

class Todo {
  id: string;
  description: string;
  completed: boolean;
}

const todos: Todo[] = [
  { id: '123', description: 'Complete me!', completed: false },
];
const todos2: Todo[] = [{ id: '321', description: 'Done!', completed: true }];

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DatePipe],
})
export class AppComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'fromDate',
    'tillDate',
    'country',
    'city',
    'xyz',
  ];
  dataSource: MatTableDataSource<any>;
  dataSource1: MatTableDataSource<any>;
  xyz: FormControl;
  constructor(private datePipe: DatePipe) {
    this.xyz = new FormControl(123);
  }
  addressHistory: any = [
    {
      fromDate: new Date('2000-01-01'),
      tillDate: new Date('2000-12-31'),
      address: 'sdfsdf',
      city: 'Ambala',
      state: 'Haryana',
      country: 'India',
      pinCode: 'sdfsd',
      statusInCountry: 'sdfsdf',
      x: 1,
    },
    {
      fromDate: new Date('2001-01-01'),
      tillDate: new Date('2001-12-31'),
      address: 'sdfdsf',
      city: 'Barwala',
      state: 'Haryana',
      country: 'Canada',
      pinCode: 'sfsd',
      statusInCountry: 'sdfsd',
      x: 2,
    },
    {
      fromDate: new Date('2002-01-01'),
      tillDate: new Date('2002-12-31'),
      address: 'sdfsd',
      city: 'Narayangarh',
      state: 'Haryana',
      country: 'India',
      pinCode: 'sdfsd',
      statusInCountry: 'sdfsd',
      x: 3,
    },
    {
      fromDate: new Date('2003-01-01'),
      tillDate: new Date('2003-12-31'),
      address: 'sdfsd',
      city: 'Narayangarh',
      state: 'Haryana',
      country: 'Canada',
      pinCode: 'sdfsd',
      statusInCountry: 'sdfsd',
      x: 4,
    },
    {
      fromDate: new Date('2004-01-01'),
      tillDate: new Date('2004-12-31'),
      address: 'sdfsd',
      city: 'Narayangarh',
      state: 'Haryana',
      country: 'India',
      pinCode: 'sdfsd',
      statusInCountry: 'sdfsd',
      x: 5,
    },
    {
      fromDate: new Date('2005-01-01'),
      tillDate: new Date('2005-12-31'),
      address: 'sdfsd',
      city: 'Narayangarh',
      state: 'Haryana',
      country: 'India',
      pinCode: 'sdfsd',
      statusInCountry: 'sdfsd',
      x: 6,
    },
  ];
  personalHistory: any = [
    {
      fromDate: new Date('2000-06-01'),
      tillDate: new Date('2001-06-02'),
      address: 'sdfsdf',
      city: 'xyz',
      state: 'Haryana',
      country: 'India',
      pinCode: 'sdfsd',
      statusInCountry: 'sdfsdf',
    },
    // {
    //   fromDate: '2004-06-01',
    //   tillDate: '2004-06-02',
    //   address: 'sdfsdf',
    //   city: 'xyz',
    //   state: 'Haryana',
    //   country: 'Canada',
    //   pinCode: 'sdfsd',
    //   statusInCountry: 'sdfsdf',
    // },
  ];
  indexChange: any = [
    { x: 1, y: 2 },
    { x: 2, y: 4 },
    { x: 3, y: 2 },
    { x: 4, y: 2 },
    { x: 5, y: 2 },
    { x: 6, y: 2 },
    { x: 7, y: 2 },
    { x: 8, y: 2 },
    { x: 9, y: 2 },
  ];
  sortedAddressData: any;
  validDataFlag: boolean = false;
  filterAddressGap = [];
  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.addressHistory);
    this.dataSource1 = new MatTableDataSource(this.personalHistory);

    this.dataSource.data = this.sortDataPersonalHistory;
    this.dataSource1.data = this.personalHistory;
    this.CompareDta();
  }
  ngOnDestroy() {}

  get sortDataPersonalHistory() {
    return this.addressHistory.sort((a, b) => {
      return <any>new Date(a.fromDate) - <any>new Date(b.tillDate);
    });
  }
  personlHistorySortByASC(value) {
    this.sortedAddressData = this.sortDataPersonalHistory.filter(
      (x) => x.country == value.country
    );
    return this.sortedAddressData;
  }

  validateAddressData() {
    debugger;
    for (let i = 0; i < this.personalHistory.length; i++) {
      this.validDataFlag = true;
      let spaceFlag = false;
      let noSpaceFlag = false;
      let spaceStartIndex = [];
      this.filterAddressGap = [];
      spaceStartIndex.push(0);
      this.personlHistorySortByASC(this.personalHistory[i]);
      if (this.sortedAddressData.length < 1) {
        this.validDataFlag = false;
        break;
      }
      for (let j = 0; j < this.sortedAddressData.length; j++) {
        let toDate = new Date(this.sortedAddressData[j]?.tillDate);
        let nextFromDate: any = new Date(
          this.sortedAddressData[j + 1]?.fromDate
        );
        let daysDifference =
          Math.ceil(nextFromDate.getTime() - toDate.getTime()) /
          (1000 * 3600 * 24);
        let filterGapData = {
          index: j,
          isGap: false,
        };
        if (nextFromDate == 'Invalid Date') {
          this.filterAddressGap.push(filterGapData);
          if (this.sortedAddressData.length <= 1) {
            noSpaceFlag = true;
          }
        }

        if (daysDifference > 1) {
          filterGapData.isGap = true;

          spaceFlag = true;
          this.filterAddressGap.push(filterGapData);
        } else if (daysDifference <= 1) {
          noSpaceFlag = true;
          this.filterAddressGap.push(filterGapData);
        }
      }
      if (noSpaceFlag == true && spaceFlag == false) {
        let length = this.sortedAddressData.filter(
          (x) => x.country == this.personalHistory[i].country
        ).length;
        let addressStartDate = this.sortedAddressData[0].fromDate;
        let addressTillDate = this.sortedAddressData[length - 1]?.tillDate;
        if (
          addressStartDate <= this.personalHistory[i].fromDate &&
          addressTillDate >= this.personalHistory[i].tillDate
        ) {
          this.validDataFlag = true;
          break;
        } else {
          this.validDataFlag = false;
          break;
        }
      } else if (spaceFlag == true) {
        for (let k = 0; k < this.filterAddressGap.length; k++) {
          let addressStartDate =
            this.sortedAddressData[spaceStartIndex[0]].fromDate;
          let addressTillDate =
            this.sortedAddressData[this.filterAddressGap[k].index].tillDate;
          if (
            new Date(addressStartDate) <=
              new Date(this.personalHistory[i].fromDate) &&
            new Date(addressTillDate) >=
              new Date(this.personalHistory[i].tillDate)
          ) {
            this.validDataFlag = true;
            break;
          } else {
            this.validDataFlag = false;
          }
          if (this.filterAddressGap[k].isGap == true) {
            spaceStartIndex = [];
            spaceStartIndex.push(this.filterAddressGap[k + 1]?.index);
          }
        }
      }
    }
    console.log(this.validDataFlag);
  }
  indexof() {
    console.log(this.addressHistory.indexOf(0));
  }

  CompareDta() {
    let data1 = {
      rowId: null,
      isRelativeInCanada: true,
      relativeRelationInCanada: '                     Adopted Sister',
      relativeNameInCanada: '     ssa',
      relativeAddressInCanada: 'df',
      relativeStatusInCanada: 'Permanent Resident',
      isSpouseRelativeInCanada: null,
      spouseRelativeRelationInCanada: null,
      spouseRelativeNameInCanada: null,
      spouseRelativeAddressInCanada: null,
      spouseRelativeStatusInCanada: null,
    };

    let data2 = {
      rowId: null,
      isRelativeInCanada: true,
      relativeRelationInCanada: 'ghjg',
      relativeNameInCanada: 'ssa',
      relativeAddressInCanada: 'df',
      relativeStatusInCanada: 'Permanent Resident',
      isSpouseRelativeInCanada: null,
      spouseRelativeRelationInCanada: null,
      spouseRelativeNameInCanada: null,
      spouseRelativeAddressInCanada: null,
      spouseRelativeStatusInCanada: null,
    };
    debugger;

    let c = 'dfgdfg        ';
    let x = JSON.parse(JSON.stringify(data1).replace(/"\s+|\s+"/g, '"'));
    let y = JSON.parse(JSON.stringify(data2).replace(/"\s+|\s+"/g, '"'));
    let result = this.CompareData(x, y);
    // alert(result);
  }

  CompareData(x, y) {
    if (x === y) return true;
    if (!(x instanceof Object) || !(y instanceof Object)) return false;
    if (x.constructor !== y.constructor) return false;
    for (var p in x) {
      if (!x.hasOwnProperty(p)) continue;
      if (!y.hasOwnProperty(p)) return false;
      if (x[p] === y[p]) continue;

      if (typeof x[p] !== 'object') return false;

      if (!this.CompareData(x[p], y[p])) return false;
    }

    for (p in y) if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) return false;

    return true;
  }

  public toggleSelection(item, i) {
    debugger;
    item.selected = !item.selected;
    if (item.selected == true) {
      item.index = i;
    } else {
      item.index = null;
    }
  }
  up() {
    debugger;
    this.indexChange.forEach((item) => {
      if (item.selected) {
        if (item.index - 1 != -1) {
          this.indexChange.splice(item.index, 1);
          this.indexChange.splice(item.index - 1, 0, item);
          item.selected = !item.selected;
        }
      }
    });
  }
  down() {
    debugger;
    this.indexChange.forEach((item) => {
      if (item.selected) {
        if (!(this.indexChange.length - 1) < item.index + 1) {
          this.indexChange.splice(item.index, 1);
          this.indexChange.splice(item.index + 1, 0, item);
          item.selected = !item.selected;
        }
      }
    });
  }
  moveTop() {
    let number = 0;
    this.indexChange.forEach((item) => {
      if (item.selected) {
        this.indexChange.splice(item.index, 1);
        this.indexChange.splice(number, 0, item);
        item.selected = !item.selected;
        number++;
      }
    });
  }
  moveDown() {
    debugger;
    // let number = this.indexChange.length;
    // this.indexChange.forEach((item) => {
    //   if (item.selected) {
    //     this.indexChange.splice(item.index, 1);
    //     this.indexChange.splice(number, 0, item);
    //     item.selected = !item.selected;
    //     number--;
    //   }
    // });
    for (let i = this.indexChange.length - 1; i >= 0; i--) {
      if (this.indexChange[i].selected) {
        this.indexChange.splice(this.indexChange[i].index, 1);
        this.indexChange.splice(i, 0, this.indexChange[i]);
        this.indexChange[i].selected = !this.indexChange[i].selected;
      }
    }
  }
}
