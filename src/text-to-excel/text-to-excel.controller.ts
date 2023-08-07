import {Body, Controller, Post } from '@nestjs/common';
import { GlobalAnyResponse, TextToExcelRequest } from '../models';
import * as fs from 'fs';
import * as excelJs from 'exceljs';
import * as path from 'path';

@Controller('text-to-excel')
export class TextToExcelController {

  /**
   * Convert multiple text file content in to excel
   * @param req
   */
  @Post('/convert')
  async convertTextToExcel(@Body() req: TextToExcelRequest): Promise<GlobalAnyResponse> {
    try {
      const workbook = new excelJs.Workbook();
      const worksheet = workbook.addWorksheet('');

      worksheet.columns = [{ header: req.columnName, key: req.columnName.toLowerCase() }];
      const fileNames = await fs.promises.readdir(req.folderPath);

      for (const fileName of fileNames) {
        if (fileName.endsWith('.txt')) {
          const filePath = path.join(req.folderPath, fileName);
          const content = await fs.promises.readFile(filePath, 'utf-8');
          worksheet.addRow({ content });
        }
      }

      await workbook.xlsx.writeFile(req.excelFilePath);
      console.log(`Excel file "${req.excelFilePath}" saved successfully.`);

      return { status: true, statusCode: 200, data: null, internalMessage: 'Text to Excel conversion is completed and saved' };
    } catch (error) {
      console.log(error);
    }
  }
}
