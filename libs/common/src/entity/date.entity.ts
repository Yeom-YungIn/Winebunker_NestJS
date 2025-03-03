import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class DateEntity {
  @CreateDateColumn({ type: 'timestamp', comment: '생성일' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정일' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', comment: '삭제일' })
  deletedAt: Date;
}
