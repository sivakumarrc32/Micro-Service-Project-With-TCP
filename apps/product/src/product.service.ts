import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from '@app/contracts/product/create-product.dto';
import { RpcException } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { UpdateProductDto } from '@app/contracts/product/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    private configService: ConfigService,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async CreateProduct(data: CreateProductDto, file: Express.Multer.File) {
    const existingProduct = await this.productRepo.findOne({
      where: { productName: data.productName },
    });
    if (existingProduct) {
      throw new RpcException({
        status: 400,
        message: 'Product already exists',
      });
    }
    const productImg = `${this.configService.get('BASE_URL')}/uploads/${file.filename}`;
    const product = this.productRepo.create({
      ...data,
      productImg,
    });
    await this.productRepo.save(product);

    return {
      status: 200,
      message: 'Product created successfully',
      product,
    };
  }

  async GetAllProducts() {
    const products = await this.productRepo.find();
    if (products.length === 0) {
      throw new RpcException({
        status: 404,
        message: 'No products found',
      });
    }
    return {
      status: 200,
      message: 'Products fetched successfully',
      products,
    };
  }

  async GetProductById(id: number) {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) {
      throw new RpcException({
        status: 404,
        message: 'Product not found',
      });
    }
    return {
      status: 200,
      message: 'Product fetched successfully',
      product,
    };
  }

  async UpdateProduct(id: number, data: UpdateProductDto) {
    const productId = Number(id);
    const product = await this.productRepo.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new RpcException({
        status: 404,
        message: 'Product not found',
      });
    }
    console.log('product', product);
    console.log('data', data);
    console.log('id', id);
    const updatedProduct = await this.productRepo.preload({
      id: productId,
      ...data,
    });
    console.log('updatedProduct', updatedProduct);
    if (!updatedProduct) {
      throw new RpcException({
        status: 400,
        message: 'Product not updated',
      });
    }
    await this.productRepo.save(updatedProduct);
    return {
      status: 200,
      message: 'Product updated successfully',
      product: updatedProduct,
    };
  }

  async DeleteProduct(id: number) {
    const productId = Number(id);
    const product = await this.productRepo.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new RpcException({
        status: 404,
        message: 'Product not found',
      });
    }
    await this.productRepo.delete({ id: productId });
    return {
      status: 200,
      message: 'Product deleted successfully',
    };
  }
}
