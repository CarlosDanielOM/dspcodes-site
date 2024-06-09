import { Component } from '@angular/core';
import { CodesService } from '../codes.service';
import { CommonModule, Location } from '@angular/common';
import { CodesViewerComponent } from '../codes-viewer/codes-viewer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-access-codes',
  standalone: true,
  imports: [CommonModule, CodesViewerComponent],
  templateUrl: './access-codes.component.html',
  styleUrl: './access-codes.component.scss'
})
export class AccessCodesComponent {
  codes: any[] = [];
  combinedAddress: any = new Map();
  
  previousSearch: string = ""
  accessType = true;

  searching: boolean = false;
  emptyOnce: boolean = false;
  
  constructor(
    private codesService: CodesService,
    private router: Router,
    private location: Location
  ) {
    location.onUrlChange((url) => {
      let params = url.split('/')
      if(params[3]) {
        let findAddress = params[3];
        let queryAddress = findAddress;
        findAddress = findAddress.split('%20').join(' ');
        this.getCodesForAddress(queryAddress);
      }
    });
  }

  ngOnInit() {
    this.getCodes();
  }

  resetSearch() {
    let combinedCodes = [];
      for (const [address, code] of this.combinedAddress.entries()) {
        combinedCodes.push({_id: code[0].id, address: address, code: code[0].code, submitter: code[0].submitter, succeeds: code[0].success, failures: code[0].fails});
      }
      this.codes = combinedCodes;
  }
  
  getCodes() {
    this.codesService.getAccessCodes().subscribe(codes => {
      this.combinedAddressFun(codes);
    });
  }

  getCodesForAddress(address: string) {
    this.codesService.getAccessCodesForAddress(address).subscribe(codes => {
      this.indivitualAddressCodes(codes);
    })
  }
  
  deletedCode(code: any) {
    this.codesService.deleteAccessCode(code._id).subscribe(deleted => {
      this.codes = this.codes.filter(code => code._id !== deleted._id)
    })
  }

  modifiedCode(code: any) {
    let id = code._id;
    delete code._id;
    this.codesService.updateAccessCode(code, id).subscribe(modefied => {
      this.codes = this.codes.map(code => code._id === modefied._id ? modefied : code);
    })
  }

  searchAddress(address: string) {
    if(address == '' || address.length == 0) {
      if(this.emptyOnce) return;
      this.searching = false
      this.emptyOnce = true;
      this.resetSearch();
    }

    this.emptyOnce = false;

    if(this.previousSearch > address) {
      this.searching = true;
      this.resetSearch();
    }

    this.previousSearch = address;

    this.searching = true;

    this.codes = this.codes.filter(code => {
      return code.address.toLowerCase().includes(address.toLowerCase());
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
    let combinedCodes = [];
    for (const [address, code] of this.combinedAddress.entries()) {
      combinedCodes.push({_id: code[0].id, address: address, code: code[0].code, submitter: code[0].submitter, succeeds: code[0].success, failures: code[0].fails});
    }
    this.codes = combinedCodes;
    if(this.searching) {
      this.searchAddress(this.previousSearch);
    };
    this.codesService.accessCodeFailed(code._id, code.failures + 1).subscribe();
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
    let combinedCodes = [];
    for (const [address, code] of this.combinedAddress.entries()) {
      combinedCodes.push({_id: code[0].id, address: address, code: code[0].code, submitter: code[0].submitter, succeeds: code[0].success, failures: code[0].fails});
    }
    this.codes = combinedCodes;
  }

  private indivitualAddressCodes(codes: any) {
    let addressCodes: any[] = []
    codes.forEach((code: any) => {
      addressCodes.push({address: code.address, code: code.code, submitter: code.submitter, succeeds: code.succeeds, failures: code.rejects, _id: code._id});
    });

    this.codes = addressCodes;


  }
  
}