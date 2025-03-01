import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class DateEntity {
  @CreateDateColumn({ type: 'timestamp', default: new Date(), comment: '생성일' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: new Date(), comment: '수정일' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', default: new Date(), comment: '삭제일' })
  deletedAt: Date;
}
