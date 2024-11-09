package com.example.demo.Classes;

import com.spire.xls.Worksheet;

import com.spire.xls.Workbook;

public class ConvertToPdf {





        public ConvertToPdf(){
            Workbook workbook = new Workbook();
            workbook.loadFromFile("C:\\Users\\Jaybert\\Pogi.xlsx");


            workbook.getConverterSetting().setSheetFitToWidth(true);


            Worksheet worksheet = workbook.getWorksheets().get(0);



            worksheet.saveToPdf("C:\\Users\\Jaybert\\Downloads\\Pogi.pdf");

        }

}
