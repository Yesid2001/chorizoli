import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import * as PDFDocument from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async generateProductsReport(): Promise<Buffer> {
    const products = await this.productRepository.find({ where: { isActive: true } });
    
    (PDFDocument as any).vfs = pdfFonts.pdfMake.vfs;
    const printer = new (PDFDocument as any)();
    
    const tableBody = [
      ['ID', 'Nombre', 'Precio', 'Categoría'],
      ...products.map(p => [p.id.toString(), p.name, `$${p.price}`, p.category]),
    ];
    
    const docDefinition = {
      content: [
        { text: 'Chorizoli - Reporte de Productos', style: 'header' },
        { text: `Generado: ${new Date().toLocaleString()}`, style: 'subheader' },
        {
          table: {
            headerRows: 1,
            widths: ['auto', '*', 'auto', 'auto'],
            body: tableBody,
          },
        },
      ],
      styles: {
        header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] },
        subheader: { fontSize: 12, margin: [0, 0, 0, 20] },
      },
    };
    
    return new Promise((resolve) => {
      const pdfDoc = printer.createPdfKitDocument(docDefinition);
      const chunks: Buffer[] = [];
      pdfDoc.on('data', (chunk) => chunks.push(chunk));
      pdfDoc.on('end', () => resolve(Buffer.concat(chunks)));
      pdfDoc.end();
    });
  }

  async getStatistics() {
    const products = await this.productRepository.find({ where: { isActive: true } });
    const totalProducts = products.length;
    const avgPrice = totalProducts > 0 
      ? products.reduce((sum, p) => sum + Number(p.price), 0) / totalProducts 
      : 0;
    const categories = [...new Set(products.map(p => p.category))];
    const productsByCategory = categories.map(cat => ({
      category: cat,
      count: products.filter(p => p.category === cat).length,
    }));
    
    return { totalProducts, avgPrice, productsByCategory };
  }
}