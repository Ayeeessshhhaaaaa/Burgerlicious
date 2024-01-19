import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminOrderServiceService } from 'src/app/Services/admin-order-service/admin-order-service.service';
import * as pdfMake from "pdfmake/build/pdfMake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { TDocumentDefinitions } from 'pdfmake/interfaces';

(pdfMake as any).vfs=pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent {

  adminUser:any;

  myScriptElement: HTMLScriptElement;
  allOrders: any;

  orderDetails:any;
  allOrderItems:any;

  loaderFixScriptElement: HTMLScriptElement;

  constructor(private service: AdminOrderServiceService ,private router: Router) {
    this.myScriptElement = document.createElement("script");
    this.myScriptElement.src = "assets/scripts/datatable.js";
    document.body.appendChild(this.myScriptElement);

    this.loaderFixScriptElement = document.createElement("script");
    this.loaderFixScriptElement.src = "assets/scripts/preLoaderFix.js";
    document.body.appendChild(this.loaderFixScriptElement);
  }

  ngOnInit(): void {

    this.adminUser = localStorage.getItem('Username')==="admin";

    this.service.getAllOrders().subscribe((res) => {
      // console.log(res.data);
      this.allOrders = res.data;
    });

  }

  delete(orderID: number) {
    if (confirm('Are you sure you want to delete this order?')) {
      console.log(orderID);
      this.service.deleteOrder(orderID).subscribe((res) => {
        if (res) {
          console.log('Order deleted successfully:', res);

          location.reload(); //Reload the page

        }
        else {
          console.error('Error deleting order');

        }
      });
    }
  }

  updateOrderStatus(orderID: number) {
    this.router.navigateByUrl("admin/orders/updateOrderStatus/"+orderID);
  }
  downloadInvoice(orderID: number) {

    this.service.getOrderForViewById(orderID).subscribe((res)=>{
      this.orderDetails=res.data;
      //console.log(this.orderDetails);
    });

    this.service.getAllOrderItemsByOrderID(orderID).subscribe((res)=>{
      this.allOrderItems=res.data;
    });

    
      let arrayOfItem: { text: any; border: boolean[]; margin: number[]; alignment: string; fillColor?: string; }[]=[];
      let finalArrayOfItems=[];
      let bodySection =[
        {
          text: 'ITEM DESCRIPTION',
          fillColor: '#e6994c',
          border: [false, true, false, true],
          margin: [0, 5, 0, 5],
          textTransform: 'uppercase',
        },
        {
          text: 'ITEM TOTAL',
          border: [false, true, false, true],
          alignment: 'right',
          fillColor: '#e6994c',
          margin: [0, 5, 0, 5],
          textTransform: 'uppercase',
        },
      ];
      finalArrayOfItems.push(bodySection);
      for(let item of this.allOrderItems){
        let singleItem={
          text: item.ProductName,
          border: [false, false, false, true],
          margin: [0, 5, 0, 5],
          alignment: 'left',
        };
        let singleSubtotal= {
          border: [false, false, false, true],
          text: 'Rs.'+item.Subtotal,
          fillColor: '#f5f5f5',
          alignment: 'right',
          margin: [0, 5, 0, 5],
        };
        arrayOfItem.push(singleItem);
        arrayOfItem.push(singleSubtotal);
        finalArrayOfItems.push(arrayOfItem);
        arrayOfItem=[];
      }
      console.log(arrayOfItem);
      console.log(finalArrayOfItems);
  
      var dd : TDocumentDefinitions  = {
        content: [
          {
            columns: [
              {
                image:
                  'data:image/png;base64,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',
                width: 150,
              },
              [
                {
                  text: 'Order Receipt',
                  color: '#333333',
                  // width: '*',
                  fontSize: 28,
                  bold: true,
                  alignment: 'right',
                  margin: [0, 0, 0, 15],
                },
                {
                  stack: [
                    {
                      columns: [
                        {
                          text: 'Order Receipt No.',
                          color: '#aaaaab',
                          bold: true,
                          width: '*',
                          fontSize: 12,
                          alignment: 'right',
                        },
                        {
                          text: orderID,
                          bold: true,
                          color: '#333333',
                          fontSize: 12,
                          alignment: 'right',
                          width: 100,
                        },
                      ],
                    },
                    {
                      columns: [
                        {
                          text: 'Order Date',
                          color: '#aaaaab',
                          bold: true,
                          width: '*',
                          fontSize: 12,
                          alignment: 'right',
                        },
                        {
                          text: this.orderDetails[0].OrderDate,
                          bold: true,
                          color: '#333333',
                          fontSize: 12,
                          alignment: 'right',
                          width: 100,
                        },
                      ],
                    },
                  ],
                },
              ],
            ],
          },
          {
            columns: [
              {
                text: 'From',
                color: '#aaaaab',
                bold: true,
                fontSize: 14,
                alignment: 'left',
                margin: [0, 20, 0, 5],
              },
              {
                text: 'To',
                color: '#aaaaab',
                bold: true,
                fontSize: 14,
                alignment: 'left',
                margin: [0, 20, 0, 5],
              },
            ],
          },
          {
            columns: [
              {
                text: 'Burgerlicious',
                bold: true,
                color: '#333333',
                alignment: 'left',
              },
              {
                text: this.orderDetails[0].Username + " ("+this.orderDetails[0].Email+")",
                bold: true,
                color: '#333333',
                alignment: 'left',
              },
            ],
          },
          {
            columns: [
              {
                text: 'Address',
                color: '#aaaaab',
                bold: true,
                margin: [0, 7, 0, 3],
              },
              {
                text: 'Phone Number',
                color: '#aaaaab',
                bold: true,
                margin: [0, 7, 0, 3],
              },
            ],
          },
          {
            columns: [
              {
                text: 'Burgerlicious \n Head Office \n   Sri Lanka',
                style: 'invoiceBillingAddress',
              },
              {
                text: this.orderDetails[0].Contact,
                style: 'invoiceBillingAddress',
              },
            ],
          },
          '\n\n',
          {
            // width: '100%',
            alignment: 'center',
            text: 'Order Items',
            bold: true,
            margin: [0, 10, 0, 10],
            fontSize: 15,
          },
          {
            layout: {
              defaultBorder: false,
              hLineWidth: function() {
                return 1;
              },
              vLineWidth: function() {
                return 1;
              },
              hLineColor: function() {
                // if () {
                //   return '#bfdde8';
                // }
                return '#eaeaea';
              },
              vLineColor: function() {
                return '#eaeaea';
              },
              hLineStyle: function() {
                // if (i === 0 || i === node.table.body.length) {
                return null;
                //}
              },
              // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
              paddingLeft: function() {
                return 10;
              },
              paddingRight: function() {
                return 10;
              },
              paddingTop: function() {
                return 2;
              },
              paddingBottom: function() {
                return 2;
              },
              fillColor: function() {
                return '#fff';
              },
            },
            table: {
              headerRows: 1,
              widths: ['*', 80],
              body: finalArrayOfItems
            },
          },
          '\n',
          '\n\n',
          {
            layout: {
              defaultBorder: false,
              hLineWidth: function() {
                return 1;
              },
              vLineWidth: function() {
                return 1;
              },
              hLineColor: function() {
                return '#8f4f0b';
              },
              vLineColor: function() {
                return '#8f4f0b';
              },
              hLineStyle: function() {
                // if (i === 0 || i === node.table.body.length) {
                return null;
                //}
              },
              // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
              paddingLeft: function() {
                return 10;
              },
              paddingRight: function() {
                return 10;
              },
              paddingTop: function() {
                return 3;
              },
              paddingBottom: function() {
                return 3;
              },
              fillColor: function() {
                return '#fff';
              },
            },
            table: {
              headerRows: 1,
              widths: ['*', 'auto'],
              body: [
                [
                  {
                    text: 'Payment Subtotal',
                    border: [false, true, false, true],
                    alignment: 'right',
                    margin: [0, 5, 0, 5],
                  },
                  {
                    border: [false, true, false, true],
                    text: 'Rs. '+this.orderDetails[0].TotalAmount,
                    alignment: 'right',
                    fillColor: '#f5be87',
                    margin: [0, 5, 0, 5],
                  },
                ],
                [
                  {
                    text: 'Total Amount',
                    bold: true,
                    fontSize: 20,
                    alignment: 'right',
                    border: [false, false, false, true],
                    margin: [0, 5, 0, 5],
                  },
                  {
                    text: 'Rs.' + this.orderDetails[0].TotalAmount,
                    bold: true,
                    fontSize: 20,
                    alignment: 'right',
                    border: [false, false, false, true],
                    fillColor: '#f5be87',
                    margin: [0, 5, 0, 5],
                  },
                ],
              ],
            },
          },
          '\n\n',
        ]
      };
  
      pdfMake.createPdf(dd).open();
      pdfMake.createPdf(dd).download('Invoice'+this.orderDetails[0].OrderID+'.pdf');
    
  }

  viewOrder(orderID: number) {
    this.router.navigateByUrl("admin/orders/viewOrder/"+orderID);
  }

  updateOrder(orderID: number) {
    this.router.navigateByUrl("admin/orders/updateOrder/"+orderID);
  }
  
}
