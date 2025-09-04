/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from '@app/contracts/shared/jwt/jwt.guard';
import { UpdateUserDto } from '@app/contracts/users/update-user.dto';
import { RoleGuard } from '@app/contracts/shared/role-decorator/role.guard';
import { Roles } from '@app/contracts/shared/role-decorator/role.decorator';
import { Role } from '@app/contracts/shared/role-decorator/role.enum';
import { lastValueFrom } from 'rxjs';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @Roles(Role.USER)
  @UseGuards(JwtGuard, RoleGuard)
  /**
   * @description Get a user's profile
   * @param req The request with the user's id
   * @returns The user's profile
   * @throws {NotFoundException} If the user is not found
   * @throws {Error} If something else goes wrong
   */
  async getProfile(@Req() req: { user: { id: string } }) {
    const userId = req.user.id;
    try {
      const result = await lastValueFrom(this.usersService.getProfile(userId));
      return result;
    } catch (e: any) {
      if (e.status === 404) {
        throw new NotFoundException(e.message);
      }
    }
  }

  @Patch('update-profile')
  @UseGuards(JwtGuard)
  /**
   * @description Update a user's profile
   * @param data The data to be updated
   * @param req The request with the user's id
   * @returns The updated user's profile
   * @throws {NotFoundException} If the user is not found
   * @throws {Error} If something else goes wrong
   */
  async updateProfile(
    @Body() data: UpdateUserDto,
    @Req() req: { user: { id: string } },
  ) {
    const userId = req.user.id;
    try {
      const result = await lastValueFrom(
        this.usersService.updateProfile(data, userId),
      );
      return result;
    } catch (e: any) {
      if (e.status === 404) {
        throw new NotFoundException(e.message);
      }
    }
  }
}
