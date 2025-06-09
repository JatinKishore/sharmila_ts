import { Component, ViewChild, ElementRef, QueryList, ViewChildren, Input } from '@angular/core';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { MyServicesService } from '../my-services.service';

@Component({
  selector: 'app-pdf-generate',
  templateUrl: './pdf-generate.component.html',
  styleUrl: './pdf-generate.component.css'
})




//pdf component start

export class PdfGenerateComponent {

  posts: any;
  payslip: any;
  id: any;
  salarydata = [];
  totaldeductions: any

  @Input() payslips: any;
  @Input() user: any;

  constructor(private apiServices: ApiService, private route: ActivatedRoute, public salaryDataService: MyServicesService) { }


  ngOnInit() {
    this.getPayslipData();
  }

  getPayslipData() {
    this.id = this.route.snapshot.paramMap.get('id');

    // Clear the arrays storing the data before making the API call
    this.salaryDataService.clearData();

    this.apiServices.getPdfData(this.id).subscribe(
      (data) => {
        this.payslip = data;
        console.log('Fetched data for pdf:', data);
        // Call calculate method only if data is received successfully
        this.calculate();
      },
      (error) => {
        console.error('Error fetching data:', error);
        // Handle the error here, e.g., display an error message to the user
      }
    );
  }



  convertNumberToWords(num: number): string {
    const singleDigit = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const specialNumbers = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

    if (num < 0) {
      return 'Minus ' + this.convertNumberToWords(Math.abs(num));
    }

    if (num < 10) {
      return singleDigit[num];
    } else if (num < 20) {
      return specialNumbers[num - 10];
    } else if (num < 100) {
      return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? ' ' + singleDigit[num % 10] : '');
    } else if (num < 1000) {
      return singleDigit[Math.floor(num / 100)] + ' Hundred' + (num % 100 !== 0 ? ' and ' + this.convertNumberToWords(num % 100) : '');
    } else if (num < 100000) {
      return this.convertNumberToWords(Math.floor(num / 1000)) + ' Thousand' + (num % 1000 !== 0 ? ' ' + this.convertNumberToWords(num % 1000) : '');
    } else if (num < 10000000) {
      return this.convertNumberToWords(Math.floor(num / 100000)) + ' Lakh' + (num % 100000 !== 0 ? ' ' + this.convertNumberToWords(num % 100000) : '');
    } else if (num < 1000000000) {
      return this.convertNumberToWords(Math.floor(num / 10000000)) + ' Crore' + (num % 10000000 !== 0 ? ' ' + this.convertNumberToWords(num % 10000000) : '');
    } else if (num < 100000000000) {
      return this.convertNumberToWords(Math.floor(num / 1000000000)) + ' Billion' + (num % 1000000000 !== 0 ? ' ' + this.convertNumberToWords(num % 1000000000) : '');
    } else {
      return 'Number too large';
    }
  }


  calculate() {
    //console.log(this.payslip);
    const allPayslipData = this.payslip.data[0];
    //get total days in a month
    const dateString = allPayslipData.salaryMonth;
    const parts = dateString.split('-');


    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);

    function getTotalDaysInMonth(year: number, month: number): number {
      const date = new Date(year, month - 1, 1);
      date.setMonth(date.getMonth() + 1);
      date.setDate(date.getDate() - 1);
      return date.getDate();
    }
    const totalDaysInMonth = getTotalDaysInMonth(year, month);

    //change the date of birth to local date

    const dateofjoin = allPayslipData.dateOfJoin;

    const date = new Date(dateofjoin);

    // Adjust the time zone to Indian Standard Time (IST)
    date.setUTCHours(date.getUTCHours() + 5.5); // UTC offset for IST is +5.5 hours
    date.setDate(date.getDate());

    const indianStandardDate = date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });

    //console.log(indianStandardDate); // Output: "08-05-2023"



    // calculate salary

    const leavedays = allPayslipData.leaveDays;
    const lopday = allPayslipData.lopDays;
    const tds = allPayslipData.tds;
    const loan = allPayslipData.loan;
    const pf = allPayslipData.pf;
    const salary = allPayslipData.salary;
    const workeddays = totalDaysInMonth - (Number(leavedays) + Number(lopday));

    if (lopday > 0) {
      const lopdays = lopday;
      const newworkeddays = totalDaysInMonth - (lopday)

      //calculate basicsalary
      const newbasicsalary = allPayslipData.basicSalary / totalDaysInMonth * newworkeddays;

      const newhoserentallowance = allPayslipData.houseRentAllowance / totalDaysInMonth * newworkeddays;
      //calculate conveyance
      const newconveyance = allPayslipData.conveyance / totalDaysInMonth * newworkeddays;
      //calculate childeduallowance
      const newchildeduallowance = allPayslipData.childEduAllowance / totalDaysInMonth * newworkeddays;
      //calculate mediallowance
      const newmediallowance = allPayslipData.mediAllowance / totalDaysInMonth * newworkeddays;
      //calculate specialallowance 
      const newspecialallowance = allPayslipData.specialAllowance / totalDaysInMonth * newworkeddays;
      //calculate specialallowance 
      const newltaallowance = allPayslipData.lta / totalDaysInMonth * newworkeddays;
      //calculate specialallowance 
      const newtelephonereimburesementallowance = allPayslipData.telephonereimburesement / totalDaysInMonth * newworkeddays;
      //calculate specialallowance 
      const newfuelreimburesementallowance = allPayslipData.fuelreimburesement / totalDaysInMonth * newworkeddays;
      //calculate netsalary
      const netsalary = Math.round(newbasicsalary) + Math.round(newhoserentallowance) + Math.round(newconveyance) + Math.round(newchildeduallowance) + Math.round(newmediallowance) + Math.round(newspecialallowance) + Math.round(newltaallowance) + Math.round(newtelephonereimburesementallowance) + Math.round(newfuelreimburesementallowance);

      const totalEarnings = Math.round(newbasicsalary) + Math.round(newhoserentallowance) + Math.round(newconveyance) + Math.round(newchildeduallowance) + Math.round(newmediallowance) + Math.round(newspecialallowance) + Math.round(newltaallowance) + Math.round(newtelephonereimburesementallowance) + Math.round(newfuelreimburesementallowance);

      if (tds > 0 || loan > 0 || pf > 0) {
        let tdsloan = Number(tds) + Number(loan) + Number(pf)
        const newnetsal = netsalary - tdsloan;
        console.log("tds:", tds, "loan:", loan, "pf:", pf, "net Salary:", tdsloan)
        this.salaryDataService.addNetSalaryData(newnetsal);
      } else if (tds == 0 || loan == 0 || pf == 0) {
        this.salaryDataService.addNetSalaryData(netsalary);
      }


      //send to services
      this.salaryDataService.addLeaveData(leavedays);
      this.salaryDataService.addDateOfJoinData(indianStandardDate);
      this.salaryDataService.addTotalDaysData(totalDaysInMonth);
      this.salaryDataService.addWorkedData(workeddays);
      this.salaryDataService.addLopDaysData(lopdays);
      this.salaryDataService.addBasicSalaryData(Math.round(newbasicsalary));
      this.salaryDataService.addHoseRentAllowanceData(Math.round(newhoserentallowance));
      this.salaryDataService.addConveyanceData(Math.round(newconveyance));
      this.salaryDataService.addChildEduAllowanceData(Math.round(newchildeduallowance));
      this.salaryDataService.addMediAllowanceData(Math.round(newmediallowance));
      this.salaryDataService.addSpecialAllowanceData(Math.round(newspecialallowance));
      this.salaryDataService.addLtaAllowanceData(Math.round(newltaallowance));
      this.salaryDataService.addTelephoneAllowanceData(Math.round(newtelephonereimburesementallowance));
      this.salaryDataService.addFuelAllowanceData(Math.round(newfuelreimburesementallowance));
      this.salaryDataService.addAllPayslipData(allPayslipData);
      this.salaryDataService.addtotalEarningsData(totalEarnings);

    } else if (lopday == 0) {

      const lopdays = lopday;
      const newworkeddays = totalDaysInMonth - (lopday)

      this.salaryDataService.addLeaveData(leavedays);
      this.salaryDataService.addLopDaysData(lopdays);
      this.salaryDataService.addDateOfJoinData(indianStandardDate);
      this.salaryDataService.addTotalDaysData(totalDaysInMonth);
      this.salaryDataService.addWorkedData(workeddays);
      if (tds > 0 || loan > 0 || pf > 0) {
        let tdsloan = Number(tds) + Number(loan) + Number(pf)
        const newnetsal = salary - tdsloan;
        console.log(newnetsal);

        this.salaryDataService.addNetSalaryData(newnetsal);
      } else if (tds == 0 || loan == 0 || pf ==  0) {
        console.log(salary);
        this.salaryDataService.addNetSalaryData(salary);
      }
      //console.log(tds,salary);
      const totalEarnings = allPayslipData.basicSalary + allPayslipData.houseRentAllowance + allPayslipData.conveyance + allPayslipData.childEduAllowance + allPayslipData.mediAllowance + allPayslipData.specialAllowance + allPayslipData.lta + allPayslipData.telephonereimburesement + allPayslipData.fuelreimburesement;

      //this.salaryDataService.addNetSalaryData(netsalary);
      this.salaryDataService.addBasicSalaryData(allPayslipData.basicSalary);
      this.salaryDataService.addHoseRentAllowanceData(allPayslipData.houseRentAllowance);
      this.salaryDataService.addConveyanceData(allPayslipData.conveyance);
      this.salaryDataService.addChildEduAllowanceData(allPayslipData.childEduAllowance);
      this.salaryDataService.addMediAllowanceData(allPayslipData.mediAllowance);
      this.salaryDataService.addSpecialAllowanceData(allPayslipData.specialAllowance);
      this.salaryDataService.addLtaAllowanceData(allPayslipData.lta);
      this.salaryDataService.addTelephoneAllowanceData(allPayslipData.telephonereimburesement);
      this.salaryDataService.addFuelAllowanceData(allPayslipData.fuelreimburesement);
      this.salaryDataService.addtotalEarningsData(totalEarnings);
      this.salaryDataService.addAllPayslipData(allPayslipData);

    }


    this.totaldeductions = Number(this.payslip?.data[0]?.tds) + Number(this.payslip?.data[0]?.loan) + Number(this.payslip?.data[0]?.pf)

    console.log(typeof this.totaldeductions)


  }



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
      pdf.save(this.payslip.data[0].firstName + '.pdf');

    });





  }


  // sendEmail(pdfBase64: string) {
  //   // Example email data
  //   const emailData = {
  //     to: 'rishwanths2298a@gmail.com',
  //     subject: 'Your payslip',
  //     text: 'Please find attached your payslip.',
  //     attachments: [
  //       {
  //         filename: 'payslip.pdf',
  //         content: pdfBase64.split(';base64,').pop(), // Remove the prefix before base64 data
  //         encoding: 'base64'
  //       }
  //     ]
  //   };





}