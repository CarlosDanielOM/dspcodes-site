import { Component } from '@angular/core';
import { CodesService } from '../codes.service';
import { Location, NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CodesViewerComponent } from '../codes-viewer/codes-viewer.component';

@Component({
  selector: 'app-locker-codes',
  standalone: true,
  imports: [NgFor, HttpClientModule, CodesViewerComponent],
  templateUrl: './locker-codes.component.html',
  styleUrl: './locker-codes.component.scss'
})
export class LockerCodesComponent {
  codes: any[] = [];
  combinedAddress: any = new Map();

  previousSearch: string = ''
  lockerType = true;

  searching: boolean = false;
  emptyOnce: boolean = false;
  
  constructor(
    private codesService: CodesService,
    private location: Location
  ) {
    this.location.onUrlChange(url => {
      let queryAddress = url.split('/');
      if(queryAddress[3]) {
        this.getCodesForAddress(queryAddress[3]);
      }
    });
  }

  ngOnInit() {
    this.getCodes();
  }

  resetSearch() {
    this.getCombinedCodes();
  }
  
  getCodes() {
    this.codesService.getLockerCodes().subscribe(codes => {
      this.combinedAddressFun(codes);
    });
  }

  getCodesForAddress(address: string) {
    this.codesService.getLockerCodesForAddress(address).subscribe(codes => {
      this.individualAddressCodes(codes);
    })
  }

  deletedCode(code: any) {
    this.codesService.deleteLockerCode(code._id).subscribe(deleted => {
      this.codes = this.codes.filter(code => code._id !== deleted._id);
    });
  }

  modefiedCode(code: any) {
    let id = code._id;
    delete code._id;
    this.codesService.updateLockerCode(code, id).subscribe(modefied => {
      this.codes = this.codes.map(code => code._id === modefied._id ? modefied : code);
    })
  }

  searchAddress(address: string) {
    if(address == '' || address.length == 0) {
      if(this.emptyOnce) return;
      this.searching = false;
      this.emptyOnce = true;
      this.resetSearch();
    }

    this.emptyOnce = false
    
    if(this.previousSearch.length > address.length) {
      this.searching = true;
      this.resetSearch();
    }
    
    this.previousSearch = address;
    this.searching = true;

    this.codes = this.codes.filter(code => {
      return code.address.includes(address);
    })
    
  }

  codeFailed(code:any) {
    let oldAddress = this.combinedAddress.get(code.address);
    let placeholder = this.combinedAddress.get(code.address)[0];
    oldAddress.shift()
    this.combinedAddress.set(code.address, oldAddress);
    if(oldAddress.length == 0) {
      // this.combinedAddress.delete(code.address);
      this.combinedAddress.set(code.address, [{code: 'N/A', success: placeholder.success, fails: placeholder.fails + 1, submitter: 'N/A', id: null}]);
    }
    this.getCombinedCodes();
    if(this.searching) {
      this.searchAddress(this.previousSearch);
    };
    this.codesService.lockerCodeFailed(code._id, code.failures + 1).subscribe();
  }

  private combinedAddressFun(codes: any) {
    codes.forEach((code: any) => {
      if(this.combinedAddress.has(code.address)) {
        let address = this.combinedAddress.get(code.address);
        address.push({code: code.code, success: code.succeeds, fails: code.rejects, submitter: code.submitter, id: code._id});
        this.combinedAddress.set(code.address, address);
      } else {
        this.combinedAddress.set(code.address, [{code: code.code, success: code.succeeds, fails: code.rejects, submitter: code.submitter, id: code._id}]);
      }
    });
    this.getCombinedCodes();
  }

  private individualAddressCodes(codes: any) {
    let addressCodes: any[] = [];
    codes.forEach((code: any) => {
      addressCodes.push({address: code.address, code: code.code, submitter: code.submitter, succeeds: code.succeeds, failures: code.rejects, _id: code._id});
    });
    this.codes = addressCodes;
  } 
  
  getCombinedCodes() {
    let combinedCodes = [];
    for(const [address, code] of this.combinedAddress.entries()) {
      combinedCodes.push({_id: code[0].id, address: address, code: code[0].code, submitter: code[0].submitter, succeeds: code[0].success, failures: code[0].fails});
    }
    this.codes = combinedCodes;
  }
  
}
