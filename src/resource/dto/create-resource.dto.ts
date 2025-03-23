import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateResourceDto {
  @IsNumber()
  @ApiProperty(
    {
      description: '와인명',
      type: 'string',
      example: '',
    })
  vinName: string;

  @IsNumber()
  @ApiProperty(
    {
      description: '빈티지',
      type: 'number',
      example: 2000,
    },
  )
  vintage: number;

  @IsNumber()
  @ApiProperty(
    {
      description: '가격',
      type: 'number',
      example: 10000,
    },
  )
  price: number;

  @IsString()
  @ApiProperty(
    {
      description: '용량',
      type: 'number',
      example: 2000,
    },
  )
  capacity: string;

  @IsString()
  @ApiProperty(
    {
      description: '설명',
      type: 'string',
      example: '',
    },
  )
  description: string;

  @IsString()
  @ApiProperty(
    {
      description: '구매일',
      type: 'string',
      example: '2000-01-01',
    },
  )
  purchaseDate: string;
}
