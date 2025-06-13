import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-kitchen-items',
  templateUrl: './kitchen-items.component.html',
  styleUrl: './kitchen-items.component.css',
})
export class KitchenItemsComponent implements OnInit {
  addKitchenItems!: FormGroup;
  id: any;
  isSubmit = false;
  element: any ;
 
  constructor(
    private kitchenform: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
     
  ngOnInit(): void {

    this.addKitchenItems = this.kitchenform.group({
      fruits: [''],
      newItems: this.kitchenform.array([]),
    });

    this.getKitchenItem()
  }


  getKitchenItem(){
    this.id = this.route.snapshot.paramMap.get('id');   
    if (this.id) {
      this.apiService.getKitchenForm(this.id).subscribe({
        next: (data) => {
          //console.log(data[0].fruit_name);
          this.addKitchenItems.get('fruits')?.setValue(data[0].fruit_type);
          this.newItems.push(
            this.kitchenform.group({
              fruitName: [`${data[0].fruit_name}`],
              fruitWeight: [`${data[0].fruit_weight}`],
            })
          );
        },
      });
    }
  }

  hideElement() {
    // document.getElementById("edithide")?.style.display = 'none'
  }


  get formControls() {
    return this.addKitchenItems.controls;
  }

  get newItems(): FormArray {
    return <FormArray>this.addKitchenItems.get('newItems');
  }

  addNewItem() {
    this.newItems.push(
      this.kitchenform.group({
        fruitName: [''],
        fruitWeight: [''],
      })
    );
  }

  viewAllData() {
    this.router.navigate(['/post-kitchen-result'])
  }



  // formSubmit() {
  //   //console.log(this.addKitchenItems.value);
  //   this.apiService
  //     .postKitchenForm(this.addKitchenItems)
  //     .subscribe((data) => //console.log(data));
  //   this.addKitchenItems.reset();
  //   this.router.navigate(['/post-kitchen-result']);
  // }


  formSubmit() {
    if (!this.isSubmit) {
      //console.log(this.addKitchenItems.value);
      if (this.id) {
        this.apiService
          .updateKitchenData(this.addKitchenItems.value, this.id)
          .subscribe((data) => {
            
          });
         this.addKitchenItems.reset();
        this.router.navigate(['/post-kitchen-result']);
      } else {
        this.isSubmit = true;
        this.apiService
          .postKitchenForm(this.addKitchenItems)
          .subscribe((data) => {

          });
        this.addKitchenItems.reset();
        this.router.navigate(['/post-kitchen-result']);
      }
    }
    //console.log(this.addKitchenItems.value);
  }

}