import { Controller, Get, Res } from '@nestjs/common';
import { ReportsService } from './reports.service';
import type { Response } from 'express';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('products')
  async getProductsReport(@Res() res: Response) {
    const pdfBuffer = await this.reportsService.generateProductsReport();
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=reporte-productos.pdf',
    });
    res.send(pdfBuffer);
  }

  @Get('statistics')
  async getStatistics() {
    return this.reportsService.getStatistics();
  }
}