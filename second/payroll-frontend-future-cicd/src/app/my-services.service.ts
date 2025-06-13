
import { ViewChild, ElementRef,Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';


@Injectable({
  providedIn: 'root'
})
export class MyServicesService {
  
 
  getPdfData(){
    //console.log("Clicked From Services")
  }


  //This is for full data pdf generate

  @ViewChild('contentToConvert')
  contentToConvert!: ElementRef;
  generatePDF() {

    const element = this.contentToConvert.nativeElement;

    const options = {
      scale: 5, // Adjust the scale if necessary
      useCORS: true, // Enable CORS if required
      logging: true, // Enable logging for debugging
      width: 595, // A4 paper width in pixels (595px)
      height: 842, // A4 paper height in pixels (842px)
    };

    html2canvas(element, options).then((canvas) => {
      // Convert the canvas to a data URL
      const imgData = canvas.toDataURL('image/png');

      // Initialize jsPDF with A4 dimensions
      const pdf = new jspdf.jsPDF('p', 'pt', 'a4');

       // Calculate the width and height of the PDF
       const pdfWidth = pdf.internal.pageSize.getWidth();
       const pdfHeight = pdf.internal.pageSize.getHeight();

      // Initialize jsPDF
      // const doc = new jspdf.jsPDF('p', 'px', [pdfWidth, pdfHeight]);

      // Add image to PDF
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, '', 'FAST');

      // Save PDF
      pdf.save('document.pdf');
    
    });
    

    
  }



  salarydata: number[] = [];
  totaldaysdata: number[] = [];
  dateofjoindata: any = [];
  workeddata: number[] = [];
  leavedata: number[] = [0];
  lopdays: number[] = [0];
  basicsalarydata: number[] = [];
  houserentallowancedata: number[] = [];
  conveyancedata: number[] = [];
  childeduallowance: number[] = [];
  mediallowance: number[] = [];
  specialallowance: number[] = [];
  ltaallowance: number[] = [];
  telephoneallowance: number[] = [];
  fuelallowance: number[] = [];
  allsalarydata:any = [];
  totalEarningsdata: any = [];


  addTotalDaysData(days: number) {
    this.totaldaysdata.push(days);
  }

  addDateOfJoinData(doj: any) {
    this.dateofjoindata.push(doj);
  }

  addNetSalaryData(salary: number) {
    this.salarydata.push(salary);
  }

  addWorkedData(salary: number) {
    this.workeddata.push(salary);
  }

  addLeaveData(leave: number) {
    this.leavedata.shift();
    this.leavedata.push(leave);
  }

  addLopDaysData(lopdays: number){
    this.lopdays.shift();
    this.lopdays.push(lopdays)
  }
  addBasicSalaryData(salary: number) {
    this.basicsalarydata.push(salary);
  }

  addHoseRentAllowanceData(houserent: number){
    this.houserentallowancedata.push(houserent)
  }

  addConveyanceData(conveyance:number){
    this.conveyancedata.push(conveyance)
  }

  addChildEduAllowanceData(childeduallow:number){
    this.childeduallowance.push(childeduallow)
  }

  addMediAllowanceData(mediallow:number){
    this.mediallowance.push(mediallow)
  }
  addSpecialAllowanceData(specialallow:number){
    this.specialallowance.push(specialallow)
  }

  addLtaAllowanceData(ltaallow:number){
    this.ltaallowance.push(ltaallow)
  }

  addTelephoneAllowanceData(telephoneallow:number){
    this.telephoneallowance.push(telephoneallow)
  }

  addFuelAllowanceData(fuellallow:number){
    this.fuelallowance.push(fuellallow)
  }

  addAllPayslipData(data:any){
    this.allsalarydata.push(data);
  }

  addtotalEarningsData(data:any){
    this.totalEarningsdata.push(data);
  }

  clearData() {
    this.salarydata = [];
    this.totaldaysdata = [];
    this.dateofjoindata = [];
    this.workeddata = [];
    this.leavedata = [0];
    this.lopdays = [0];
    this.basicsalarydata = [];
    this.houserentallowancedata = [];
    this.conveyancedata = [];
    this.childeduallowance = [];
    this.mediallowance = [];
    this.specialallowance = [];
    this.ltaallowance = [];
    this.telephoneallowance = [];
    this.fuelallowance = [];
    this.allsalarydata = [];
    this.totalEarningsdata = [];
}



}
