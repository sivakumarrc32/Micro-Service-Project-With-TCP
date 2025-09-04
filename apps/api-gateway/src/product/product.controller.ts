/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { JwtGuard } from '@app/contracts/shared/jwt/jwt.guard';
import { RoleGuard } from '@app/contracts/shared/role-decorator/role.guard';
import { Role } from '@app/contracts/shared/role-decorator/role.enum';
import { Roles } from '@app/contracts/shared/role-decorator/role.decorator';
import { CreateProductDto } from '@app/contracts/product/create-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { lastValueFrom } from 'rxjs';
import { UpdateProductDto } from '@app/contracts/product/update-product.dto';
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  @UseGuards(JwtGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(FileInterceptor('file'))
  async createProduct(
    @Body() data: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const result = await lastValueFrom(
        this.productService.CreateProduct(data, file),
      );
      return result;
    } catch (e: any) {
      if (e.status === 400) {
        throw new BadRequestException(e.message);
      } else if (e.status === 404) {
        throw new NotFoundException(e.message);
      }
    }
  }

  @Get('products')
  @UseGuards(JwtGuard, RoleGuard)
  async getAllProducts() {
    try {
      const result = await lastValueFrom(this.productService.GetAllProducts());
      return result;
    } catch (e: any) {
      if (e.status === 400) {
        throw new BadRequestException(e.message);
      } else if (e.status === 404) {
        throw new NotFoundException(e.message);
      }
    }
  }

  @Get(':id')
  @UseGuards(JwtGuard, RoleGuard)
  async getProductById(@Param('id') id: number) {
    try {
      const result = await lastValueFrom(
        this.productService.GetProductById(id),
      );
      return result;
    } catch (e: any) {
      if (e.status === 400) {
        throw new BadRequestException(e.message);
      } else if (e.status === 404) {
        throw new NotFoundException(e.message);
      }
    }
  }

  @Patch('update-product/:id')
  @UseGuards(JwtGuard, RoleGuard)
  @Roles(Role.ADMIN)
  async updateProduct(@Param('id') id: number, @Body() data: UpdateProductDto) {
    try {
      const result = await lastValueFrom(
        this.productService.UpdateProduct(id, data),
      );
      return result;
    } catch (e: any) {
      if (e.status === 400) {
        throw new BadRequestException(e.message);
      } else if (e.status === 404) {
        throw new NotFoundException(e.message);
      }
    }
  }

  @Delete('delete-product/:id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  async deleteProduct(@Param('id') id: number) {
    try {
      const result = await lastValueFrom(this.productService.DeleteProduct(id));
      return result;
    } catch (e: any) {
      if (e.status === 400) {
        throw new BadRequestException(e.message);
      } else if (e.status === 404) {
        throw new NotFoundException(e.message);
      }
    }
  }
}
